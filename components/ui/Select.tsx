import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type SelectProps = ComponentPropsWithoutRef<"select"> & {
  label: string;
  error?: string;
  options: readonly string[];
  placeholder?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, options, placeholder = "Select an option", id, className, ...rest },
  ref,
) {
  const inputId = id ?? rest.name;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="font-sans text-xs uppercase tracking-wider text-white/70">
        {label}
      </label>
      <div className="relative">
        <select
          ref={ref}
          id={inputId}
          defaultValue=""
          className={cn(
            "w-full appearance-none border-b border-white/20 bg-transparent py-3 pr-8 font-sans text-base text-white transition-colors focus:border-gold focus:outline-none",
            error && "border-red-400/80",
            className,
          )}
          {...rest}
        >
          <option value="" disabled className="bg-navy text-white/50">
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-navy text-white">
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50"
        />
      </div>
      {error && <span className="text-xs text-red-300">{error}</span>}
    </div>
  );
});
