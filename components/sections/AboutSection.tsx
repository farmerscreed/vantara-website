import { FadeIn } from "@/components/animations/FadeIn";
import { ValuePillar } from "@/components/features/ValuePillar";
import { ABOUT } from "@/lib/constants";

export function AboutSection() {
  return (
    <section id="about" className="relative bg-navy py-24 md:py-32">
      {/* Subtle geometric pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(#C8963E 1px, transparent 1px), linear-gradient(90deg, #C8963E 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="wrap relative grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <FadeIn>
            <p className="eyebrow">{ABOUT.eyebrow}</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-4 h-section text-balance text-white">
              {ABOUT.heading}
            </h2>
          </FadeIn>
          <div className="mt-10 space-y-6 text-white/75">
            {ABOUT.body.map((para, idx) => (
              <FadeIn key={idx} delay={0.2 + idx * 0.1}>
                <p className="font-sans text-base leading-relaxed md:text-lg">{para}</p>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Architectural accent on the right */}
        <div className="hidden lg:col-span-5 lg:block">
          <FadeIn delay={0.3}>
            <svg
              viewBox="0 0 400 500"
              className="h-full w-full text-gold/30"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              aria-hidden
            >
              <rect x="40" y="40" width="320" height="420" />
              <rect x="80" y="80" width="240" height="340" />
              <rect x="120" y="120" width="160" height="260" />
              <line x1="40" y1="250" x2="360" y2="250" />
              <line x1="200" y1="40" x2="200" y2="460" />
              <circle cx="200" cy="250" r="60" />
              <circle cx="200" cy="250" r="20" className="fill-gold/20" />
            </svg>
          </FadeIn>
        </div>
      </div>

      <div className="wrap relative mt-20 grid grid-cols-2 gap-10 lg:grid-cols-4">
        {ABOUT.pillars.map((pillar, idx) => (
          <FadeIn key={pillar.label} delay={idx * 0.1}>
            <ValuePillar {...pillar} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
