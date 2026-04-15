import { Building2, Cpu, Leaf, Globe, type LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Building2,
  Cpu,
  Leaf,
  Globe,
};

type ValuePillarProps = {
  icon: string;
  label: string;
  subtext: string;
};

export function ValuePillar({ icon, label, subtext }: ValuePillarProps) {
  const Icon = ICONS[icon];
  return (
    <div className="group flex flex-col items-start gap-4 border-t border-white/10 pt-8">
      <div className="flex h-12 w-12 items-center justify-center border border-gold/40 text-gold transition-colors duration-300 group-hover:bg-gold/10">
        {Icon ? <Icon className="h-6 w-6" strokeWidth={1.5} /> : null}
      </div>
      <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-white">
        {label}
      </h3>
      <p className="font-sans text-sm leading-relaxed text-white/60">{subtext}</p>
    </div>
  );
}
