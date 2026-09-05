import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs",
        className,
      )}
    >
      <Sparkles className="size-3" />
      Pro
    </span>
  );
}
