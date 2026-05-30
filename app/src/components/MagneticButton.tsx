"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

interface MagneticButtonProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  strength?: number;
}

export function MagneticButton({
  href,
  className,
  children,
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.3 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.a>
  );
}
