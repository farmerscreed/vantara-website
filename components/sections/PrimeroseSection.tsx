import { FadeIn } from "@/components/animations/FadeIn";
import { StatsBar } from "@/components/features/StatsBar";
import { RenderGallery } from "@/components/features/RenderGallery";
import { PRIMEROSE } from "@/lib/constants";

export function PrimeroseSection() {
  return (
    <section
      id="primerose"
      className="relative bg-gradient-to-b from-slate to-navy py-24 md:py-32"
    >
      {/* 3A. Intro */}
      <div className="wrap max-w-4xl">
        <FadeIn>
          <p className="eyebrow">{PRIMEROSE.eyebrow}</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mt-4 h-section italic font-light text-white/90">
            {PRIMEROSE.heading}
          </h2>
        </FadeIn>
        <div className="mt-10 space-y-6 text-white/75">
          {PRIMEROSE.body.map((para, idx) => (
            <FadeIn key={idx} delay={0.2 + idx * 0.1}>
              <p className="font-sans text-base leading-relaxed md:text-lg">{para}</p>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* 3B. Stats */}
      <div className="wrap mt-24">
        <StatsBar stats={PRIMEROSE.stats} />
      </div>

      {/* 3C. Render gallery */}
      <div className="mt-24">
        <div className="wrap mb-8">
          <FadeIn>
            <p className="eyebrow">Renderings</p>
          </FadeIn>
        </div>
        <div className="mx-auto max-w-[1600px] px-2 md:px-6">
          <FadeIn delay={0.1}>
            <RenderGallery renders={PRIMEROSE.renders} />
          </FadeIn>
        </div>
      </div>

      {/* 3D. New Port City context */}
      <div className="wrap mt-24 border-t border-white/10 pt-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <FadeIn>
              <p className="eyebrow">{PRIMEROSE.context.eyebrow}</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h3 className="mt-4 font-display text-2xl italic text-white/90 md:text-3xl">
                A 1,000-hectare master plan
              </h3>
            </FadeIn>
          </div>
          <div className="space-y-5 text-white/70 lg:col-span-8">
            {PRIMEROSE.context.body.map((para, idx) => (
              <FadeIn key={idx} delay={0.2 + idx * 0.1}>
                <p className="font-sans text-base leading-relaxed">{para}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
