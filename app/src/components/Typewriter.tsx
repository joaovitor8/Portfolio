"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface TypewriterProps {
  text: string;
  speed?: number;
}

export function Typewriter({ text, speed = 70 }: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplayed(reduceMotion ? text : "");
    if (reduceMotion) return;
    let i = 0;
    const interval = window.setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) window.clearInterval(interval);
    }, speed);
    return () => window.clearInterval(interval);
  }, [text, speed, reduceMotion, mounted]);

  return (
    // Reserva espaço para o texto completo via cópia invisível, evitando layout shift.
    <span className="relative inline-block">
      <span aria-hidden="true" className="invisible">
        {text}
      </span>
      <span className="absolute left-0 top-0 whitespace-nowrap">
        {displayed}
        {mounted && !reduceMotion && (
          <span
            aria-hidden="true"
            className="ml-1 inline-block h-[0.9em] w-0.5 translate-y-[-0.05em] bg-current align-middle animate-pulse"
          />
        )}
      </span>
    </span>
  );
}
