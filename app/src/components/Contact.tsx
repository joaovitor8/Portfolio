import { Mail, Download } from "lucide-react";
import { PROFILE } from "@/lib/config";
import type { Dictionary, Locale } from "@/lib/i18n";
import { Section } from "./Section";
import { Github, Linkedin } from "./icons";
import { ContactForm } from "./ContactForm";

export function Contact({
  dict,
  formDict,
  locale,
}: {
  dict: Dictionary["contact"];
  formDict: Dictionary["contactForm"];
  locale: Locale;
}) {
  return (
    <Section id="contato" eyebrow={dict.eyebrow} title={dict.title}>
      <div className="mx-auto max-w-3xl">
        <p className="mb-10 text-center text-base text-stardust md:text-lg">
          {dict.intro}
        </p>

        <address className="grid gap-4 not-italic sm:grid-cols-3">
          <ContactLink
            href={`mailto:${PROFILE.email}`}
            icon={<Mail size={22} />}
            label={dict.emailLabel}
            value={PROFILE.email}
          />
          <ContactLink
            href={`https://www.linkedin.com/in/${PROFILE.linkedin}/`}
            icon={<Linkedin size={22} />}
            label={dict.linkedinLabel}
            value={`/in/${PROFILE.linkedin}`}
          />
          <ContactLink
            href={`https://github.com/${PROFILE.github}`}
            icon={<Github size={22} />}
            label={dict.githubLabel}
            value={`@${PROFILE.github}`}
          />
        </address>

        <div className="mt-12">
          <h3 className="mb-6 text-center font-display text-sm font-semibold uppercase tracking-widest text-cyan-soft">
            {dict.formHeading}
          </h3>
          <ContactForm dict={formDict} locale={locale} />
        </div>

        {PROFILE.resumeUrl && (
          <div className="mt-10 flex justify-center">
            <a
              href={PROFILE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              <Download size={16} aria-hidden="true" />
              {dict.downloadResume}
            </a>
          </div>
        )}
      </div>
    </Section>
  );
}

function ContactLink({
  href,
  icon,
  label,
  value,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={`${label}: ${value}`}
      className="card-glow group flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/3 p-6 text-center backdrop-blur transition-colors hover:bg-white/6"
    >
      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-nebula-500/30 to-cyan-glow/20 text-nebula-300 transition-transform group-hover:scale-110">
        {icon}
      </div>
      <div className="text-xs uppercase tracking-widest text-stardust">
        {label}
      </div>
      <div className="truncate text-sm font-medium text-white">{value}</div>
    </a>
  );
}
