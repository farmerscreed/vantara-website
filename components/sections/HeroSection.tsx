"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HERO, SITE } from "@/lib/constants";

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      aria-label="Intro"
      className="relative flex h-screen min-h-[640px] w-full items-center justify-center overflow-hidden"
    >
      {/* Background: still image (default) or video (opt-in) */}
      {HERO.useVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={HERO.stillSrc}
          aria-hidden
        >
          <source src={HERO.videoSrc} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={HERO.stillSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}

      {/* Overlay for legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(rgba(10,22,40,0.55) 0%, rgba(10,22,40,0.75) 60%, rgba(10,22,40,0.9) 100%)",
        }}
      />

      {/* Centered content */}
      <div className="wrap relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/logo-light.png"
            alt={SITE.name}
            width={440}
            height={110}
            priority
            className="mx-auto h-auto w-[180px] md:w-[220px]"
          />
        </motion.div>

        <motion.h1
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-3xl font-display text-balance text-3xl font-light leading-tight text-white md:text-5xl lg:text-6xl"
        >
          {SITE.tagline}
        </motion.h1>

        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <Button href={HERO.cta.href} variant="gold">
            {HERO.cta.label}
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/60"
        aria-hidden
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </motion.div>
    </section>
  );
}
