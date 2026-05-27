import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function InteractiveHoverButton({ text = "Button", icon, className, type = "button", ...props }) {
  return (
    <button
      type={type}
      className={cn(
        "group relative w-32 cursor-pointer overflow-hidden rounded-full border bg-background px-6 py-2 text-center font-semibold transition-transform duration-200 active:scale-[0.98]",
        className,
      )}
      {...props}
    >
      <span className="inline-block whitespace-nowrap transition-all duration-300 group-hover:translate-x-full group-hover:opacity-0">
        {text}
      </span>
      <div className="absolute inset-0 z-10 flex translate-x-[-12%] items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        <span className="whitespace-nowrap">{text}</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          {icon || <ArrowRight className="h-4 w-4" />}
        </span>
      </div>
    </button>
  );
}
