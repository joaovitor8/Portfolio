"use client";

import { motion } from "framer-motion";
import type { SectionId } from "@/lib/types";

export function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: SectionId;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-cyan-soft">
            {eyebrow}
          </p>
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <div className="mt-4 h-px w-24 bg-linear-to-r from-nebula-500 to-transparent" />
        </motion.div>
        {children}
      </div>
    </section>
  );
}
