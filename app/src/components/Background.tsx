"use client";

import { useEffect, useState } from "react";

interface Star {
  id: number;
  top: string;
  left: string;
  size: number;
  opacity: number;
  duration: string;
  delay: string;
}

export function Background() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Math.random() precisa rodar só no client para evitar mismatch de hidratação.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStars(
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.7 + 0.2,
        duration: `${Math.random() * 3 + 2}s`,
        delay: `${Math.random() * 3}s`,
      }))
    );
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(139,92,246,0.25),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_85%_30%,rgba(6,182,212,0.18),transparent_60%)] aurora" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_15%_70%,rgba(139,92,246,0.15),transparent_60%)] aurora"
        style={{ animationDelay: "-7s" }}
      />
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            ["--twinkle-duration" as string]: star.duration,
            animationDelay: star.delay,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  );
}
