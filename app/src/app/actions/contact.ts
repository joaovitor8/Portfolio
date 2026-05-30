"use server";

import { Resend } from "resend";
import { PROFILE } from "@/lib/config";

export type ContactErrorKey =
  | "fill_all"
  | "invalid_email"
  | "message_long"
  | "not_configured"
  | "generic";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; errorKey: ContactErrorKey };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot
  if (formData.get("website")) {
    return { status: "success" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const locale = String(formData.get("locale") ?? "pt");

  if (!name || !email || !message) {
    return { status: "error", errorKey: "fill_all" };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { status: "error", errorKey: "invalid_email" };
  }
  if (message.length > 5000) {
    return { status: "error", errorKey: "message_long" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { status: "error", errorKey: "not_configured" };
  }

  try {
    const resend = new Resend(apiKey);
    const fromAddress =
      process.env.RESEND_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

    await resend.emails.send({
      from: fromAddress,
      to: PROFILE.email,
      replyTo: email,
      subject: `[Portfolio · ${locale}] ${name}`,
      text: `De: ${name} <${email}>\n\n${message}`,
    });
    return { status: "success" };
  } catch (err) {
    console.error("[contact] resend error:", err);
    return { status: "error", errorKey: "generic" };
  }
}
