import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type TextareaProps = ComponentPropsWithoutRef<"textarea"> & {
  label: string;
  error?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, id, className, ...rest },
  ref,
) {
  const inputId = id ?? rest.name;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="font-sans text-xs uppercase tracking-wider text-white/70">
        {label}
      </label>
      <textarea
        ref={ref}
        id={inputId}
        rows={5}
        className={cn(
          "resize-y border-b border-white/20 bg-transparent py-3 font-sans text-base text-white placeholder-white/40 transition-colors focus:border-gold focus:outline-none",
          error && "border-red-400/80",
          className,
        )}
        {...rest}
      />
      {error && <span className="text-xs text-red-300">{error}</span>}
    </div>
  );
});
