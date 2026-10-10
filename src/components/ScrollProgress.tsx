"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { usePathname } from "next/navigation";

export default function ScrollProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [thumbSize, setThumbSize] = useState(20);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const getScrollBounds = useCallback(() => {
    const hero = document.getElementById("hero-section");
    const start = hero ? hero.getBoundingClientRect().top + window.scrollY : 0;
    const maxScroll = Math.max(start, document.documentElement.scrollHeight - window.innerHeight);
    return { start, range: Math.max(1, maxScroll - start) };
  }, []);

  const updateProgress = useCallback(() => {
    const { start, range } = getScrollBounds();
    setProgress(Math.min(1, Math.max(0, (window.scrollY - start) / range)));
    const contentHeight = Math.max(1, document.documentElement.scrollHeight - start);
    setThumbSize(Math.min(42, Math.max(16, (window.innerHeight / contentHeight) * 100)));
  }, [getScrollBounds]);

  const scrollToPointer = useCallback((clientY: number) => {
    const track = trackRef.current;
    if (!track) return;
    const bounds = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientY - bounds.top) / bounds.height));
    const { start, range } = getScrollBounds();
    window.scrollTo({ top: start + ratio * range, behavior: "auto" });
  }, [getScrollBounds]);

  useEffect(() => {
    let frame = 0;
    const handleScrollOrResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateProgress);
    };
    handleScrollOrResize();
    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [pathname, updateProgress]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const { start, range } = getScrollBounds();
    let nextProgress = progress;
    if (event.key === "ArrowDown" || event.key === "PageDown") nextProgress += 0.08;
    else if (event.key === "ArrowUp" || event.key === "PageUp") nextProgress -= 0.08;
    else if (event.key === "Home") nextProgress = 0;
    else if (event.key === "End") nextProgress = 1;
    else return;
    event.preventDefault();
    window.scrollTo({ top: start + Math.min(1, Math.max(0, nextProgress)) * range, behavior: "smooth" });
  };

  return (
    <div
      ref={trackRef}
      className="fixed right-1.5 top-1/2 z-50 h-28 w-2 -translate-y-1/2 cursor-pointer touch-none select-none rounded-full bg-emerald-950/10 shadow-inner outline-none sm:right-2.5 sm:h-40 sm:w-2.5"
      role="scrollbar"
      aria-label="পাতার scrollbar"
      aria-controls="page-content"
      aria-orientation="vertical"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={(event) => {
        dragging.current = true;
        event.currentTarget.setPointerCapture(event.pointerId);
        scrollToPointer(event.clientY);
      }}
      onPointerMove={(event) => {
        if (dragging.current) scrollToPointer(event.clientY);
      }}
      onPointerUp={() => { dragging.current = false; }}
      onPointerCancel={() => { dragging.current = false; }}
    >
      <div
        className="absolute inset-x-0 top-0 rounded-full bg-gradient-to-b from-emerald-400 via-emerald-600 to-teal-700 shadow-[0_0_10px_rgba(5,150,105,0.45)]"
        style={{
          height: `${thumbSize}%`,
          top: `${Math.min(100 - thumbSize, Math.max(0, progress * 100 - thumbSize / 2))}%`,
        }}
      />
      <span
        className={`pointer-events-none absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-emerald-700/40 bg-white shadow-[0_0_7px_rgba(255,255,255,0.95)] sm:h-3 sm:w-3 ${progress === 0 ? "translate-y-0" : progress === 1 ? "-translate-y-full" : "-translate-y-1/2"}`}
        style={{ top: `${progress * 100}%` }}
      />
    </div>
  );
}
