import type { LucideIcon } from "lucide-react";

export type IconName = string;

export type ValuePillar = {
  icon: IconName;
  label: string;
  subtext: string;
};

export type SmartFeature = {
  icon: IconName;
  title: string;
  description: string;
};

export type Render = {
  src: string;
  alt: string;
  caption: string;
};

export type Stat = {
  value: number;
  suffix: string;
  label: string;
};

export type { LucideIcon };
