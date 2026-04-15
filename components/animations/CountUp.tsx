"use client";

import { useEffect, useRef, useState } from "react";
import { formatNumber } from "@/lib/utils";

type CountUpProps = {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

/**
 * Animates an integer from 0 to `to` once the element enters the viewport.
 * Uses requestAnimationFrame with an ease-out curve.
 */
export function CountUp({ to, suffix = "", duration = 1600, className }: CountUpProps) {
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = nodeRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const start = () => {
      if (hasRun.current) return;
      hasRun.current = true;

      if (prefersReduced) {
        setValue(to);
        return;
      }

      const t0 = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - t0) / duration);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(to * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && start());
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration]);

  return (
    <span ref={nodeRef} className={className}>
      {formatNumber(value)}
      {suffix}
    </span>
  );
}
