import { Mail, MapPin, Phone } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { CONTACT, SITE } from "@/lib/constants";

export function ContactSection() {
  return (
    <section id="contact" className="bg-slate py-24 md:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <FadeIn>
            <p className="eyebrow">{CONTACT.eyebrow}</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-4 h-section italic font-light text-white/90">
              {CONTACT.heading}
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 font-sans text-base leading-relaxed text-white/70 md:text-lg">
              {CONTACT.body}
            </p>
          </FadeIn>

          <ul className="mt-10 space-y-6">
            <FadeIn delay={0.3} as="li">
              <a
                href={`mailto:${SITE.email}`}
                className="group flex items-start gap-4 transition-colors hover:text-gold"
              >
                <Mail className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                <div>
                  <span className="block text-xs uppercase tracking-widest text-white/50">Email</span>
                  <span className="font-sans text-base text-white group-hover:text-gold md:text-lg">
                    {SITE.email}
                  </span>
                </div>
              </a>
            </FadeIn>
            <FadeIn delay={0.35} as="li">
              <a
                href={`tel:${SITE.phoneRaw}`}
                className="group flex items-start gap-4 transition-colors hover:text-gold"
              >
                <Phone className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                <div>
                  <span className="block text-xs uppercase tracking-widest text-white/50">Phone</span>
                  <span className="font-sans text-base text-white group-hover:text-gold md:text-lg">
                    {SITE.phone}
                  </span>
                </div>
              </a>
            </FadeIn>
            <FadeIn delay={0.4} as="li">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                <div>
                  <span className="block text-xs uppercase tracking-widest text-white/50">
                    Location
                  </span>
                  <span className="font-sans text-base text-white md:text-lg">{SITE.location}</span>
                </div>
              </div>
            </FadeIn>
          </ul>
        </div>

        <FadeIn delay={0.2}>
          <div className="aspect-[4/3] w-full overflow-hidden border border-white/10 lg:aspect-auto lg:h-full">
            <iframe
              src={CONTACT.mapEmbed}
              title="Port Harcourt, Rivers State, Nigeria"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full grayscale"
              allowFullScreen
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
