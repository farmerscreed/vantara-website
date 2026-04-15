import { FadeIn } from "@/components/animations/FadeIn";
import { FeatureCard } from "@/components/features/FeatureCard";
import { SMART_LIVING } from "@/lib/constants";

export function SmartLivingSection() {
  return (
    <section id="smart-living" className="bg-navy py-24 md:py-32">
      <div className="wrap max-w-4xl">
        <FadeIn>
          <p className="font-sans text-xs font-medium uppercase tracking-widest text-teal">
            {SMART_LIVING.eyebrow}
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mt-4 h-section italic font-light text-white/90">
            {SMART_LIVING.heading}
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-8 font-sans text-base leading-relaxed text-white/75 md:text-lg">
            {SMART_LIVING.body}
          </p>
        </FadeIn>
      </div>

      <div className="wrap mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SMART_LIVING.features.map((feature, idx) => (
          <FadeIn key={feature.title} delay={idx * 0.08}>
            <FeatureCard {...feature} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
