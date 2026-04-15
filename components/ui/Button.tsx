import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "gold" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-none px-7 py-3.5 font-sans text-sm uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-navy hover:bg-gold-400 hover:-translate-y-0.5",
  ghost:
    "border border-white/30 text-white hover:border-gold hover:text-gold",
};

type ButtonAsButton = ComponentPropsWithoutRef<"button"> & {
  href?: undefined;
  variant?: Variant;
  children: ReactNode;
};

type ButtonAsLink = ComponentPropsWithoutRef<"a"> & {
  href: string;
  variant?: Variant;
  children: ReactNode;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "gold", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], className);

  if ("href" in rest && rest.href) {
    // Use Link for internal anchors so Next handles smooth scroll behavior correctly.
    const isInternal = rest.href.startsWith("#") || rest.href.startsWith("/");
    if (isInternal) {
      return (
        <Link href={rest.href} className={classes}>
          {children}
        </Link>
      );
    }
    return (
      <a className={classes} {...(rest as ComponentPropsWithoutRef<"a">)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}
