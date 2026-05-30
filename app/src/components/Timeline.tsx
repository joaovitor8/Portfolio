"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Code2 } from "lucide-react";
import type { Dictionary, TimelineEntryI18n } from "@/lib/i18n";
import { Section } from "./Section";

const ICONS = {
  education: GraduationCap,
  experience: Briefcase,
  project: Code2,
};

export function Timeline({ dict }: { dict: Dictionary["timeline"] }) {
  return (
    <Section id="jornada" eyebrow={dict.eyebrow} title={dict.title}>
      <div className="relative mx-auto max-w-3xl">
        <div
          aria-hidden="true"
          className="absolute left-6 top-0 h-full w-px bg-linear-to-b from-nebula-500/40 via-cyan-glow/30 to-transparent"
        />
        <ol className="space-y-8">
          {dict.entries.map((entry, i) => (
            <TimelineItem
              key={i}
              entry={entry}
              currentLabel={dict.current}
              index={i}
            />
          ))}
        </ol>
      </div>
    </Section>
  );
}

function TimelineItem({
  entry,
  currentLabel,
  index,
}: {
  entry: TimelineEntryI18n;
  currentLabel: string;
  index: number;
}) {
  const Icon = ICONS[entry.type];
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-16"
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-space-900/80 backdrop-blur"
      >
        <Icon size={20} className="text-nebula-300" />
      </span>
      <div className="card-glow rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-bold text-white">
            {entry.title}
          </h3>
          {entry.current && (
            <span className="shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
              {currentLabel}
            </span>
          )}
        </div>
        <div className="mb-3 text-sm text-cyan-soft">
          {entry.organization} · {entry.period}
        </div>
        <p className="text-sm leading-relaxed text-stardust">
          {entry.description}
        </p>
      </div>
    </motion.li>
  );
}
