"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, User, Briefcase, Sparkles, Code2, Send } from "lucide-react";
import type { SectionId } from "@/lib/types";
import { getOtherLocale, type Dictionary, type Locale } from "@/lib/i18n";

const ICONS: Record<SectionId, React.ReactNode> = {
  home: <Home size={16} />,
  sobre: <User size={16} />,
  jornada: <Briefcase size={16} />,
  skills: <Sparkles size={16} />,
  projetos: <Code2 size={16} />,
  contato: <Send size={16} />,
};

const ORDER: SectionId[] = [
  "home",
  "sobre",
  "jornada",
  "skills",
  "projetos",
  "contato",
];

export function Navigation({
  dict,
  locale,
}: {
  dict: Dictionary["nav"];
  locale: Locale;
}) {
  const [active, setActive] = useState<SectionId>("home");
  const other = getOtherLocale(locale);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id as SectionId);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ORDER.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label={dict.home}
      className="fixed left-1/2 top-6 z-50 -translate-x-1/2"
    >
      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-space-900/70 px-2 py-2 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
        {ORDER.map((id) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-label={dict[id]}
              aria-current={isActive ? "page" : undefined}
              className={`relative flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition-colors sm:text-sm ${
                isActive ? "text-white" : "text-stardust hover:text-white"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-linear-to-r from-nebula-500 to-cyan-glow"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                {ICONS[id]}
                <span className="hidden sm:inline">{dict[id]}</span>
              </span>
            </a>
          );
        })}
        <a
          href={`/${other}`}
          aria-label={dict.switchLanguage}
          title={dict.switchLanguage}
          className="ml-1 rounded-full border border-white/10 px-2.5 py-2 text-[10px] font-bold uppercase tracking-wider text-stardust transition-colors hover:border-cyan-glow/40 hover:text-white sm:text-xs"
        >
          {other}
        </a>
      </div>
    </nav>
  );
}
