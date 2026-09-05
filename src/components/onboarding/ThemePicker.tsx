"use client";

import { DEFAULT_THEMES } from "@/lib/themes";
import { cn } from "@/lib/utils";

export default function ThemePicker({
  selected,
  onSelect,
  compact = false,
}: {
  selected: string;
  onSelect: (id: string) => void;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid gap-3",
        compact
          ? "grid-cols-3 sm:grid-cols-5"
          : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
      )}
    >
      {DEFAULT_THEMES.map((theme) => {
        const isSelected = selected === theme.id;
        return (
          <button
            key={theme.id}
            type="button"
            onClick={() => onSelect(theme.id)}
            title={theme.name}
            className={cn(
              "group relative overflow-hidden rounded-xl border-2 text-left transition-all duration-200",
              isSelected
                ? "border-zinc-900 shadow-md ring-2 ring-zinc-900/10 ring-offset-1"
                : "border-zinc-200 hover:border-zinc-400",
            )}
          >
            {/* Swatch preview */}
            <div
              className={cn(
                "relative flex items-end gap-1 p-3",
                compact ? "h-12" : "h-20",
              )}
              style={{ backgroundColor: theme.colors.background }}
            >
              {/* Simulated layout mini-preview */}
              <div
                className="absolute top-2 left-3 right-3 h-2 rounded-full opacity-60"
                style={{ backgroundColor: theme.colors.surface }}
              />
              <div className="absolute top-6 left-3 h-1.5 w-1/2 rounded-full opacity-40" style={{ backgroundColor: theme.colors.text }} />
              <div className="absolute top-9 left-3 h-1 w-1/3 rounded-full opacity-30" style={{ backgroundColor: theme.colors.muted }} />
              <div
                className="absolute bottom-2 right-2 h-4 rounded-full px-2 text-[8px] font-bold flex items-center"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.onPrimary,
                }}
              >
                CTA
              </div>
              {/* Swatch dots */}
              <div className="absolute bottom-2 left-3 flex gap-1">
                {theme.swatch.map((color) => (
                  <span
                    key={color}
                    className="size-3 rounded-full ring-1 ring-black/5"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {!compact && (
              <div
                className="px-2.5 py-2 border-t"
                style={{ borderColor: `${theme.colors.border}80` }}
              >
                <p className="text-[12px] font-semibold text-zinc-900 truncate">
                  {theme.name}
                </p>
                <p className="mt-0.5 text-[10.5px] leading-tight text-zinc-500 truncate">
                  {theme.description}
                </p>
              </div>
            )}

            {isSelected && (
              <div className="absolute top-1.5 right-1.5 flex size-5 items-center justify-center rounded-full bg-zinc-900 text-white text-[10px]">
                ✓
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
