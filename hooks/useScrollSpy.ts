"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently closest to the top of the viewport.
 * Uses IntersectionObserver so it only updates when active sections change.
 */
export function useScrollSpy(sectionIds: readonly string[], rootMargin = "-40% 0px -55% 0px") {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin, threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds, rootMargin]);

  return activeId;
}
