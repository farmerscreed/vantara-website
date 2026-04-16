import { Sun, Lock, Camera, Home, Wifi, type LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Sun,
  Lock,
  Camera,
  Home,
  Wifi,
};

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
};

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const Icon = ICONS[icon];
  return (
    <article className="group relative flex h-full flex-col gap-5 border-b-2 border-transparent bg-slate p-8 transition-all duration-300 hover:-translate-y-1 hover:border-teal hover:shadow-xl hover:shadow-black/20">
      <div className="flex h-14 w-14 items-center justify-center bg-teal/10 text-teal transition-colors duration-300 group-hover:bg-teal/20">
        {Icon ? <Icon className="h-7 w-7" strokeWidth={1.5} /> : null}
      </div>
      <h3 className="font-display text-xl font-medium text-white md:text-2xl">{title}</h3>
      <p className="font-sans text-sm leading-relaxed text-white/70">{description}</p>
    </article>
  );
}
