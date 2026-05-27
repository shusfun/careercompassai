import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Checkbox({ checked = false, onCheckedChange, id, required, className }) {
  return (
    <button
      id={id}
      type="button"
      role="checkbox"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className,
      )}
      onClick={() => onCheckedChange?.(!checked)}
    >
      {checked && <Check className="h-4 w-4" />}
      {required && <input aria-hidden="true" tabIndex="-1" required className="sr-only" checked={checked} readOnly />}
    </button>
  );
}
