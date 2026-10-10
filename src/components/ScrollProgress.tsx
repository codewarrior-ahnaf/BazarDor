"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const hero = document.getElementById("hero-section");
        const start = hero ? hero.getBoundingClientRect().top + window.scrollY : 0;
        const range = Math.max(1, document.documentElement.scrollHeight - window.innerHeight - start);
        setProgress(Math.min(1, Math.max(0, (window.scrollY - start) / range)));
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed right-2.5 top-1/2 z-40 hidden h-40 w-1.5 -translate-y-1/2 rounded-full bg-emerald-950/10 shadow-inner sm:block"
      role="progressbar"
      aria-label="পাতার অগ্রগতি"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <div
        className="absolute inset-x-0 top-0 rounded-full bg-gradient-to-b from-emerald-400 via-emerald-600 to-teal-700 shadow-[0_0_10px_rgba(5,150,105,0.45)] transition-[height] duration-150"
        style={{ height: `${progress * 100}%` }}
      />
      <div
        className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-emerald-600 shadow-md transition-[top] duration-150"
        style={{ top: `calc(${progress * 100}% - 6px)` }}
      />
    </div>
  );
}
