"use client";

import { useState, useMemo } from "react";
import { Search, Sparkles } from "lucide-react";
import { BLOCK_REGISTRY, BLOCK_TYPES, type BlockType } from "@/lib/blocks";
import { Modal } from "@/components/ui";
import { useI18n } from "@/i18n/client";

const CATEGORIES: { id: string; label: string; types: BlockType[] }[] = [
  {
    id: "all",
    label: "Tous",
    types: [...BLOCK_TYPES],
  },
  {
    id: "essentials",
    label: "Essentiels",
    types: ["hero", "rich_text", "cta", "banner"],
  },
  {
    id: "showcase",
    label: "Grilles & Vitrines",
    types: ["bento_grid", "card_grid", "product_grid"],
  },
  {
    id: "business",
    label: "Tarifs & Chiffres",
    types: ["pricing_table", "stats"],
  },
  {
    id: "social",
    label: "Preuve Sociale",
    types: ["testimonials", "logo_cloud"],
  },
  {
    id: "forms",
    label: "Formulaires & Contact",
    types: ["form", "contact_form", "booking_form", "faq", "carousel"],
  },
];

export function BlockLibrary({
  open,
  onClose,
  features,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  features: Record<string, boolean>;
  onAdd: (type: BlockType) => void;
}) {
  const { t } = useI18n();
  const [selectedCat, setSelectedCat] = useState("all");
  const [search, setSearch] = useState("");

  const available = useMemo(() => {
    return BLOCK_TYPES.filter(
      (type) => type !== "product_grid" || features.catalog,
    ).filter((type) => type !== "booking_form" || features.booking);
  }, [features]);

  const filtered = useMemo(() => {
    const activeCategory = CATEGORIES.find((c) => c.id === selectedCat);
    const categoryTypes = activeCategory ? activeCategory.types : available;
    const baseList = available.filter((type) => categoryTypes.includes(type));

    if (!search.trim()) return baseList;
    const s = search.toLowerCase();
    return baseList.filter((type) => {
      const name = (t.blocks[type] ?? type).toLowerCase();
      const desc = (t.blocks[`${type}Desc` as keyof typeof t.blocks] ?? "").toLowerCase();
      return name.includes(s) || desc.includes(s);
    });
  }, [selectedCat, search, available, t]);

  return (
    <Modal open={open} onClose={onClose} title="Bibliothèque de blocs universels" size="lg">
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 size-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Rechercher un bloc (ex: tarifs, bento, hero, devis)…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 py-2 pl-9 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-hidden"
          />
        </div>

        {/* Categories pills */}
        <div className="flex flex-wrap gap-1.5 border-b border-zinc-100 pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCat(cat.id)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                selectedCat === cat.id
                  ? "bg-zinc-900 text-white shadow-xs"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Blocks grid */}
        <div className="grid gap-3 sm:grid-cols-2 max-h-[420px] overflow-y-auto pr-1">
          {filtered.length === 0 ? (
            <div className="col-span-2 py-10 text-center text-xs text-zinc-400">
              Aucun bloc ne correspond à votre recherche.
            </div>
          ) : (
            filtered.map((type) => {
              const def = BLOCK_REGISTRY[type];
              return (
                <button
                  key={type}
                  onClick={() => onAdd(type)}
                  className="group flex items-start gap-3.5 rounded-2xl border border-zinc-200/90 p-4 text-left transition hover:border-zinc-900 hover:bg-zinc-50/80 hover:shadow-md"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-base text-white shadow-sm transition-transform group-hover:scale-105 group-hover:bg-zinc-800">
                    {def?.icon ?? <Sparkles className="size-4" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold tracking-tight text-zinc-900">
                      {t.blocks[type] ?? type}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-zinc-500 line-clamp-2">
                      {t.blocks[`${type}Desc` as keyof typeof t.blocks] ?? ""}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </Modal>
  );
}
