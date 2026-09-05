import { cn } from "@/lib/utils";

interface WizardProgressProps {
  step: number;
  totalSteps: number;
  labels: string[];
}

export default function WizardProgress({
  step,
  totalSteps,
  labels,
}: WizardProgressProps) {
  return (
    <div className="mt-5 flex items-center gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div key={index} className="flex flex-1 flex-col items-center gap-1">
          <span
            className={cn(
              "h-1 w-full rounded-full transition-all duration-300",
              index < step ? "bg-zinc-900" : "bg-zinc-200",
            )}
          />
          <span
            className={cn(
              "text-[10px] font-medium transition-colors",
              index + 1 === step
                ? "text-zinc-900"
                : index + 1 < step
                  ? "text-zinc-400"
                  : "text-zinc-300",
            )}
          >
            {labels[index]}
          </span>
        </div>
      ))}
    </div>
  );
}
