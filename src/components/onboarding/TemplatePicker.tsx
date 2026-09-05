"use client";

import Image from "next/image";
import { SITE_TEMPLATES, type SiteTemplate } from "@/lib/templates";
import { cn } from "@/lib/utils";

function TemplateBadge({ text }: { text: string }) {
  return (
    <span className="absolute top-2.5 left-2.5 rounded-full bg-zinc-900/80 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
      {text}
    </span>
  );
}

export default function TemplatePicker({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (id: string | null) => void;
}) {
  return (
    <div className="space-y-4">
      {/* Blank option */}
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={cn(
          "flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all duration-200",
          selected === null
            ? "border-zinc-900 bg-zinc-50 shadow-sm ring-2 ring-zinc-900/10"
            : "border-zinc-200 hover:border-zinc-300 bg-white",
        )}
      >
        <div className="flex size-14 shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 text-2xl text-zinc-400">
          ＋
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-900">Site vierge</p>
          <p className="mt-0.5 text-[12.5px] text-zinc-500">
            Partez d'une page blanche et construisez votre site librement.
          </p>
        </div>
        {selected === null && (
          <div className="ml-auto flex size-5 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-[10px] text-white">
            ✓
          </div>
        )}
      </button>

      {/* Template grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {SITE_TEMPLATES.map((template: SiteTemplate) => {
          const isSelected = selected === template.id;
          return (
            <button
              key={template.id}
              type="button"
              onClick={() => onSelect(template.id)}
              className={cn(
                "group relative overflow-hidden rounded-xl border-2 text-left transition-all duration-200",
                isSelected
                  ? "border-zinc-900 shadow-md ring-2 ring-zinc-900/10"
                  : "border-zinc-200 hover:border-zinc-300",
              )}
            >
              {/* Preview image */}
              <div className="relative h-36 overflow-hidden bg-zinc-100">
                <img
                  src={template.previewImage}
                  alt={template.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {template.badge && <TemplateBadge text={template.badge} />}
                {isSelected && (
                  <div className="absolute inset-0 bg-zinc-900/20 flex items-center justify-center">
                    <div className="flex size-8 items-center justify-center rounded-full bg-white text-zinc-900 text-sm font-bold shadow-lg">
                      ✓
                    </div>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-3.5">
                <p className="text-[13px] font-semibold text-zinc-900">
                  {template.name}
                </p>
                <p className="mt-0.5 text-[12px] leading-snug text-zinc-500 line-clamp-2">
                  {template.tagline}
                </p>
                {/* Pages included */}
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center rounded-md bg-zinc-900 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    {template.pages.length} pages incluses
                  </span>
                  <span className="text-[11px] text-zinc-500 truncate max-w-[200px]">
                    {template.pages.map((p) => p.title).join(" · ")}
                  </span>
                </div>

                {/* Tags */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {template.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10.5px] font-medium text-zinc-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
