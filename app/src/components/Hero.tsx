"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Rocket, ArrowRight } from "lucide-react";
import { PROFILE } from "@/lib/config";
import type { Dictionary } from "@/lib/i18n";
import { Typewriter } from "./Typewriter";
import { MagneticButton } from "./MagneticButton";

export function Hero({ dict }: { dict: Dictionary["hero"] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-screen items-center justify-center px-6 pt-24"
    >
      <motion.div style={{ opacity, y }} className="text-center">
        {PROFILE.available && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-medium text-emerald-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {dict.available}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          aria-hidden="true"
          className="relative mx-auto mb-6 inline-block"
        >
          <div className="absolute -inset-6 rounded-full bg-nebula-500/30 blur-2xl" />
          <Rocket size={56} className="relative text-nebula-400" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-3 text-sm uppercase tracking-[0.3em] text-stardust"
        >
          {dict.greeting}
        </motion.p>

        {/* h1 sem motion: garante LCP imediato (texto principal visível no primeiro paint). */}
        <h1 className="font-display text-5xl font-bold leading-tight tracking-tight md:text-7xl lg:text-8xl">
          <span className="text-gradient">{PROFILE.name}</span>
        </h1>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-4 text-xl font-medium text-white md:text-2xl"
        >
          <Typewriter text={dict.role} />
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-6 max-w-xl text-base text-stardust md:text-lg"
        >
          {dict.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton
            href="#projetos"
            className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-nebula-500 to-cyan-glow px-6 py-3 text-sm font-semibold text-white glow-purple"
          >
            {dict.ctaProjects}
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </MagneticButton>
          <a
            href="#contato"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
          >
            <Mail size={16} />
            {dict.ctaContact}
          </a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-stardust">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-1 text-xs uppercase tracking-widest"
        >
          <span>{dict.scrollHint}</span>
          <div className="h-8 w-px bg-linear-to-b from-stardust to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
