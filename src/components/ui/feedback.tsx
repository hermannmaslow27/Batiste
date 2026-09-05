import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block size-5 animate-spin rounded-full border-2 border-current border-t-transparent",
        className,
      )}
    />
  );
}
export function Badge({
  tone = "neutral",
  dot = false,
  children,
  className,
}: {
  tone?: "neutral" | "success" | "warning" | "info" | "danger" | "purple";
  dot?: boolean;
  children: ReactNode;
  className?: string;
}) {
  const tones = {
    neutral: "bg-zinc-100 text-zinc-700 ring-zinc-200/80",
    success: "bg-emerald-50 text-emerald-700 ring-emerald-200/80",
    warning: "bg-amber-50 text-amber-700 ring-amber-200/80",
    info: "bg-sky-50 text-sky-700 ring-sky-200/80",
    danger: "bg-rose-50 text-rose-700 ring-rose-200/80",
    purple: "bg-purple-50 text-purple-700 ring-purple-200/80",
  };
  const dotColors = {
    neutral: "bg-zinc-400",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    info: "bg-sky-500",
    danger: "bg-rose-500",
    purple: "bg-purple-500",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ring-inset transition-colors",
        tones[tone],
        className,
      )}
    >
      {dot && <span className={cn("size-1.5 rounded-full", dotColors[tone])} />}
      {children}
    </span>
  );
}
export function EmptyState({
  icon = "◇",
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300/80 bg-zinc-50/60 px-6 py-14 text-center">
      <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-white text-xl text-zinc-500 shadow-xs ring-1 ring-zinc-200/80">
        {icon}
      </div>
      <p className="text-sm font-semibold text-zinc-900">{title}</p>
      {description && (
        <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-zinc-500">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-zinc-900">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-zinc-500">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
export function StatTile({
  label,
  value,
  trend,
}: {
  label: string;
  value: ReactNode;
  trend?: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all hover:border-zinc-300 hover:shadow-xs">
      <p className="text-[12.5px] font-medium text-zinc-500">{label}</p>
      <div className="mt-2 flex items-baseline justify-between">
        <p className="text-2xl font-bold tracking-tight text-zinc-950">{value}</p>
        {trend && (
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
