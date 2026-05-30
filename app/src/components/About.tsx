import { User, MapPin, GraduationCap, Mail } from "lucide-react";
import { PROFILE } from "@/lib/config";
import type { Dictionary } from "@/lib/i18n";
import { Section } from "./Section";

export function About({ dict }: { dict: Dictionary["about"] }) {
  return (
    <Section id="sobre" eyebrow={dict.eyebrow} title={dict.title}>
      <div className="grid gap-10 md:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5 text-base leading-relaxed text-stardust md:text-lg">
          {dict.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <div className="space-y-3">
          <InfoCard
            icon={<User size={18} />}
            label={dict.nameLabel}
            value={PROFILE.fullName}
          />
          <InfoCard
            icon={<MapPin size={18} />}
            label={dict.locationLabel}
            value={dict.locationValue}
          />
          <InfoCard
            icon={<GraduationCap size={18} />}
            label={dict.educationLabel}
            value={dict.educationValue}
          />
          <InfoCard
            icon={<Mail size={18} />}
            label={dict.emailLabel}
            value={PROFILE.email}
          />
        </div>
      </div>
    </Section>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/3 p-4 backdrop-blur">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-nebula-500/30 to-cyan-glow/20 text-nebula-300">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-wider text-stardust">
          {label}
        </div>
        <div className="truncate text-sm font-medium text-white">{value}</div>
      </div>
    </div>
  );
}
