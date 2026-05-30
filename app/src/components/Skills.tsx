"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";
import { Section } from "./Section";

export function Skills({ dict }: { dict: Dictionary["skills"] }) {
  return (
    <Section id="skills" eyebrow={dict.eyebrow} title={dict.title}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {dict.categories.map((category) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="card-glow rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur"
          >
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-cyan-soft">
              {category.name}
            </h3>
            <ul className="space-y-2">
              {category.items.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center gap-2 text-sm text-starlight"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-linear-to-r from-nebula-400 to-cyan-glow" />
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
