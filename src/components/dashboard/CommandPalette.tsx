"use client";

import { useEffect, useState, useRef } from "react";
import { Search, X } from "lucide-react";
import type { BlockType } from "@/lib/blocks";
import { useI18n } from "@/i18n/client";
import { useCommandItems } from "@/hooks/useCommandItems";

export default function CommandPalette({
  siteId,
  locale,
  subdomain,
  pages = [],
  onAddBlock,
  onNewPage,
}: {
  siteId: string;
  locale: string;
  subdomain: string;
  pages?: { id: string; title: string; slug: string }[];
  onAddBlock?: (type: BlockType) => void;
  onNewPage?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useI18n();

  const items = useCommandItems({
    siteId,
    locale,
    subdomain,
    pages,
    t,
    onClose: () => setOpen(false),
    onAddBlock,
    onNewPage,
  });

  // Keyboard shortcut listener: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const filtered = query.trim()
    ? items.filter(
        (i) =>
          i.label.toLowerCase().includes(query.toLowerCase()) ||
          (i.hint && i.hint.toLowerCase().includes(query.toLowerCase())),
      )
    : items;

  const handleKeyInDialog = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].onSelect();
    }
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-xl border border-zinc-200/80 bg-zinc-50/80 px-3 py-1.5 text-xs text-zinc-500 transition hover:border-zinc-300 hover:bg-zinc-100 sm:flex"
      >
        <Search className="size-3.5 text-zinc-400" />
        <span>Rechercher ou commande…</span>
        <kbd className="rounded bg-white px-1.5 py-0.5 font-mono text-[10px] font-semibold text-zinc-400 shadow-2xs border border-zinc-200">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 backdrop-blur-sm bg-black/40 animate-fade-in">
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl"
        onKeyDown={handleKeyInDialog}
      >
        <div className="flex items-center border-b border-zinc-200/80 px-4 py-3">
          <Search className="size-4 text-zinc-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Rechercher une page, un paramètre ou insérer un bloc…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="flex-1 bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="max-h-[380px] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-xs text-zinc-400">
              Aucun résultat pour « {query} »
            </p>
          ) : (
            <div className="space-y-0.5">
              {filtered.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={item.onSelect}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-medium transition ${
                      isSelected
                        ? "bg-zinc-900 text-white"
                        : "text-zinc-700 hover:bg-zinc-100"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={isSelected ? "text-white" : ""}>
                        {item.icon}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.hint && (
                      <span
                        className={`text-[11px] font-mono shrink-0 ${
                          isSelected ? "text-white/70" : "text-zinc-400"
                        }`}
                      >
                        {item.hint}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-zinc-100 bg-zinc-50 px-4 py-2 text-[11px] text-zinc-400">
          <span>Utilisez ↑ ↓ pour naviguer, Entrée pour valider</span>
          <span>Échap pour fermer</span>
        </div>
      </div>
    </div>
  );
}
