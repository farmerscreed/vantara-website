import { CountUp } from "@/components/animations/CountUp";
import { FadeIn } from "@/components/animations/FadeIn";
import type { Stat } from "@/types";

type StatsBarProps = {
  stats: readonly Stat[];
};

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-12 border-y border-white/10 py-16 md:grid-cols-3 lg:grid-cols-5">
      {stats.map((stat, idx) => (
        <FadeIn key={stat.label} delay={idx * 0.1} className="text-center lg:text-left">
          <div className="font-stat text-6xl leading-none tracking-wide text-gold md:text-7xl lg:text-[5.5rem]">
            <CountUp to={stat.value} suffix={stat.suffix} />
          </div>
          <p className="mt-3 font-sans text-[11px] font-medium uppercase tracking-widest text-white/60">
            {stat.label}
          </p>
        </FadeIn>
      ))}
    </div>
  );
}
