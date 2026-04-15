"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_SECTIONS, SITE } from "@/lib/constants";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";

const sectionIds = NAV_SECTIONS.map((s) => s.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useScrollSpy(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled || mobileOpen
            ? "bg-navy/95 backdrop-blur-md shadow-lg shadow-black/20"
            : "bg-transparent",
        )}
      >
        <nav className="wrap flex h-20 items-center justify-between">
          <Link
            href="#top"
            aria-label={`${SITE.name} home`}
            className="flex items-center gap-3"
          >
            <Image
              src="/images/logo-light.png"
              alt={SITE.name}
              width={160}
              height={40}
              priority
              className="h-8 w-auto md:h-9"
            />
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV_SECTIONS.map((section) => {
              const isActive = activeId === section.id;
              return (
                <li key={section.id}>
                  <Link
                    href={`#${section.id}`}
                    className={cn(
                      "relative py-1 font-sans text-sm uppercase tracking-wider transition-colors",
                      isActive ? "text-gold" : "text-white/80 hover:text-white",
                    )}
                  >
                    {section.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 h-px w-full bg-gold" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            className="md:hidden text-white"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-navy transition-opacity duration-300 md:hidden",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8">
          {NAV_SECTIONS.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              onClick={closeMenu}
              className="font-display text-3xl text-white hover:text-gold"
            >
              {section.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
