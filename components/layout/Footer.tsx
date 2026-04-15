import Image from "next/image";
import { SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy">
      <div className="wrap flex flex-col items-center gap-6 py-12 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex flex-col items-center gap-3 md:items-start">
          <Image
            src="/images/logo-light.png"
            alt={SITE.name}
            width={140}
            height={36}
            className="h-7 w-auto"
          />
          <p className="font-display text-sm italic text-white/60">{SITE.tagline}</p>
        </div>
        <p className="font-sans text-xs uppercase tracking-wider text-white/40">
          © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
