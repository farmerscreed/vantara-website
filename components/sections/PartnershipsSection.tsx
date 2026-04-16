import { FadeIn } from "@/components/animations/FadeIn";
import { PartnershipForm } from "@/components/features/PartnershipForm";
import { PARTNERSHIPS } from "@/lib/constants";

export function PartnershipsSection() {
  return (
    <section id="partnerships" className="bg-navy py-24 md:py-32">
      <div className="wrap max-w-3xl text-center">
        <FadeIn>
          <p className="eyebrow">{PARTNERSHIPS.eyebrow}</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mt-4 h-section italic font-light text-white/90">
            {PARTNERSHIPS.heading}
          </h2>
        </FadeIn>
        <div className="mt-8 space-y-5 text-white/75">
          {PARTNERSHIPS.body.map((para, idx) => (
            <FadeIn key={idx} delay={0.2 + idx * 0.1}>
              <p className="font-sans text-base leading-relaxed md:text-lg">{para}</p>
            </FadeIn>
          ))}
        </div>
      </div>

      <div className="wrap mt-16 max-w-3xl">
        <FadeIn delay={0.3}>
          <PartnershipForm />
        </FadeIn>
      </div>
    </section>
  );
}
