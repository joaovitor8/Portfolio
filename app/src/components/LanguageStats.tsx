import type { LanguageStat } from "@/lib/types";

interface LanguageStatsProps {
  languages: LanguageStat[];
  heading: string;
  repoUnit: { one: string; many: string };
}

export function LanguageStats({
  languages,
  heading,
  repoUnit,
}: LanguageStatsProps) {
  if (languages.length === 0) return null;

  return (
    <div className="mb-10 rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur">
      <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-cyan-soft">
        {heading}
      </h3>
      <ul className="grid gap-3 sm:grid-cols-2">
        {languages.map((lang) => (
          <li key={lang.name}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-medium text-white">{lang.name}</span>
              <span className="text-stardust">
                {lang.count} {lang.count === 1 ? repoUnit.one : repoUnit.many} ·{" "}
                {lang.percentage}%
              </span>
            </div>
            <div
              className="h-1.5 overflow-hidden rounded-full bg-white/5"
              role="progressbar"
              aria-valuenow={lang.percentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${lang.name}: ${lang.percentage}%`}
            >
              <div
                className="h-full rounded-full bg-linear-to-r from-nebula-500 to-cyan-glow"
                style={{ width: `${Math.max(lang.percentage, 4)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
