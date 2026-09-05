import { cn } from "@/lib/utils";

interface BillingToggleProps {
  yearly: boolean;
  onToggle: (yearly: boolean) => void;
}

export default function BillingToggle({ yearly, onToggle }: BillingToggleProps) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-zinc-200 bg-zinc-50 p-1">
      <button
        type="button"
        onClick={() => onToggle(false)}
        className={cn(
          "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
          !yearly
            ? "bg-white text-zinc-900 shadow-sm"
            : "text-zinc-500 hover:text-zinc-700",
        )}
      >
        Mensuel
      </button>
      <button
        type="button"
        onClick={() => onToggle(true)}
        className={cn(
          "flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all",
          yearly
            ? "bg-white text-zinc-900 shadow-sm"
            : "text-zinc-500 hover:text-zinc-700",
        )}
      >
        Annuel
        <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">
          -35%
        </span>
      </button>
    </div>
  );
}
