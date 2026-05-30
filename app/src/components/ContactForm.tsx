"use client";

import { useActionState } from "react";
import { Send, Loader2, Check, AlertCircle } from "lucide-react";
import {
  sendContactMessage,
  type ContactState,
} from "@/app/actions/contact";
import type { Dictionary, Locale } from "@/lib/i18n";

const INITIAL: ContactState = { status: "idle" };

export function ContactForm({
  dict,
  locale,
}: {
  dict: Dictionary["contactForm"];
  locale: Locale;
}) {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    INITIAL
  );

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-8 text-center backdrop-blur"
      >
        <Check
          size={32}
          aria-hidden="true"
          className="mx-auto mb-3 text-emerald-300"
        />
        <p className="text-base font-semibold text-white">
          {dict.successTitle}
        </p>
        <p className="mt-1 text-sm text-stardust">{dict.successMessage}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {/* honeypot: invisível para humanos, atraente para bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <input type="hidden" name="locale" value={locale} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          name="name"
          label={dict.nameLabel}
          type="text"
          placeholder={dict.namePlaceholder}
          required
        />
        <Field
          name="email"
          label={dict.emailLabel}
          type="email"
          placeholder={dict.emailPlaceholder}
          required
        />
      </div>
      <Field
        name="message"
        label={dict.messageLabel}
        placeholder={dict.messagePlaceholder}
        required
        textarea
      />

      {state.status === "error" && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-lg border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-sm text-rose-300"
        >
          <AlertCircle size={16} aria-hidden="true" />
          {translateError(state.errorKey, dict)}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-nebula-500 to-cyan-glow px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 glow-cyan"
      >
        {pending ? (
          <Loader2 size={16} aria-hidden="true" className="animate-spin" />
        ) : (
          <Send size={16} aria-hidden="true" />
        )}
        {pending ? dict.submitting : dict.submit}
      </button>
    </form>
  );
}

function translateError(
  key: string | undefined,
  dict: Dictionary["contactForm"]
): string {
  switch (key) {
    case "fill_all":
      return dict.errorFillAll;
    case "invalid_email":
      return dict.errorInvalidEmail;
    case "message_long":
      return dict.errorMessageLong;
    case "not_configured":
      return dict.errorNotConfigured;
    default:
      return dict.errorGeneric;
  }
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  required,
  textarea,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const baseClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-stardust/50 backdrop-blur transition-colors focus:border-cyan-glow/50 focus:outline-none focus-visible:outline-none";

  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-stardust">
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          required={required}
          rows={5}
          className={`${baseClass} resize-none`}
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={baseClass}
        />
      )}
    </label>
  );
}
