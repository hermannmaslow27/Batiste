"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Check,
  Copy,
  Edit3,
  Eye,
  EyeOff,
  Layers,
  Sparkles,
  Tag,
  Trash2,
} from "lucide-react";
import { Badge, Button, Modal } from "@/components/ui";
import { getBlockDef } from "@/lib/blocks";
import type { Messages } from "@/i18n/messages";
import type { BuilderBlock } from "../PageBuilder";

const BLOCK_CATEGORY_MAP: Record<string, string> = {
  hero: "Essentiels",
  rich_text: "Essentiels",
  cta: "Essentiels",
  banner: "Essentiels",
  card_grid: "Grilles & Vitrines",
  bento_grid: "Grilles & Vitrines",
  product_grid: "Grilles & Vitrines",
  pricing_table: "Tarifs & Chiffres",
  stats: "Tarifs & Chiffres",
  testimonials: "Preuve Sociale",
  logo_cloud: "Preuve Sociale",
  contact_form: "Formulaires & Contact",
  booking_form: "Formulaires & Contact",
  form: "Formulaires & Contact",
  faq: "Formulaires & Contact",
  carousel: "Formulaires & Contact",
};

export default function BlockDetailsModal({
  block,
  index,
  totalBlocks,
  open,
  onClose,
  onSelectInspector,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onToggle,
  onDelete,
  t,
}: {
  block: BuilderBlock | null;
  index: number;
  totalBlocks: number;
  open: boolean;
  onClose: () => void;
  onSelectInspector: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onDuplicate: () => void;
  onToggle: () => void;
  onDelete: () => void;
  t: Messages;
}) {
  const [copiedId, setCopiedId] = useState(false);

  if (!block || !open) return null;

  const def = getBlockDef(block.type);
  const blockName =
    t.blocks[block.type as keyof typeof t.blocks] ?? block.type;
  const blockDesc =
    t.blocks[`${block.type}Desc` as keyof typeof t.blocks] ??
    "Composant modulaire pour structurer votre page web.";
  const category = BLOCK_CATEGORY_MAP[block.type] ?? "Général";

  const handleCopyId = () => {
    navigator.clipboard.writeText(block.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  // Extract brief content highlights
  const content = block.content;
  const title = String(content.title ?? "").trim();
  const subtitle = String(content.subtitle ?? content.description ?? "").trim();
  const listItemsCount = Array.isArray(content.cards)
    ? content.cards.length
    : Array.isArray(content.items)
    ? content.items.length
    : Array.isArray(content.plans)
    ? content.plans.length
    : Array.isArray(content.questions)
    ? content.questions.length
    : Array.isArray(content.stats)
    ? content.stats.length
    : Array.isArray(content.slides)
    ? content.slides.length
    : null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Détails du composant"
      size="md"
    >
      <div className="space-y-4">
        {/* ─── Hero Block Header ─── */}
        <div className="flex items-start gap-3.5 rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-lg text-white shadow-sm">
            {def?.icon ?? "▪"}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="rounded-md bg-zinc-200/80 px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wider text-zinc-700">
                {category}
              </span>
              <span className="font-mono text-[11px] font-semibold text-zinc-500 bg-white border border-zinc-200 rounded-md px-1.5 py-0.5">
                type: {block.type}
              </span>
            </div>
            <h3 className="mt-1 text-base font-bold text-zinc-900">
              {blockName}
            </h3>
            <p className="mt-1 text-xs text-zinc-600 leading-relaxed">
              {blockDesc}
            </p>
          </div>
        </div>

        {/* ─── Metadata & Current Values ─── */}
        <div className="rounded-xl border border-zinc-200/80 bg-white p-3.5 space-y-2.5">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-zinc-100">
            <span className="font-semibold text-zinc-500 flex items-center gap-1.5">
              <Layers className="size-3.5 text-zinc-400" />
              Position dans la page
            </span>
            <span className="font-bold text-zinc-900">
              Bloc #{index + 1} sur {totalBlocks}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pb-2 border-b border-zinc-100">
            <span className="font-semibold text-zinc-500 flex items-center gap-1.5">
              <Eye className="size-3.5 text-zinc-400" />
              Visibilité publique
            </span>
            <Badge tone={block.isVisible ? "success" : "neutral"}>
              {block.isVisible ? "Visible en ligne" : "Masqué (Brouillon)"}
            </Badge>
          </div>

          {title && (
            <div className="flex items-start justify-between text-xs pb-2 border-b border-zinc-100 gap-4">
              <span className="font-semibold text-zinc-500 shrink-0">
                Titre configuré
              </span>
              <span className="font-medium text-zinc-900 text-right truncate max-w-[240px]">
                {title}
              </span>
            </div>
          )}

          {subtitle && (
            <div className="flex items-start justify-between text-xs pb-2 border-b border-zinc-100 gap-4">
              <span className="font-semibold text-zinc-500 shrink-0">
                Accroche
              </span>
              <span className="text-zinc-600 text-right line-clamp-2 max-w-[240px]">
                {subtitle}
              </span>
            </div>
          )}

          {listItemsCount !== null && (
            <div className="flex items-center justify-between text-xs pb-2 border-b border-zinc-100">
              <span className="font-semibold text-zinc-500">
                Éléments de contenu
              </span>
              <span className="font-semibold text-zinc-900">
                {listItemsCount} éléments
              </span>
            </div>
          )}

          <div className="flex items-center justify-between text-xs pt-0.5">
            <span className="font-semibold text-zinc-500">ID technique</span>
            <button
              type="button"
              onClick={handleCopyId}
              className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-500 hover:text-zinc-900 transition"
              title="Copier l'identifiant"
            >
              {block.id.slice(0, 12)}…
              {copiedId ? (
                <Check className="size-3 text-emerald-600" />
              ) : (
                <Copy className="size-3 text-zinc-400" />
              )}
            </button>
          </div>
        </div>

        {/* ─── Actions Grid ─── */}
        <div className="space-y-1.5 pt-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 px-1">
            Actions rapides
          </p>

          <div className="grid grid-cols-2 gap-2">
            {/* Open in Inspector */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onSelectInspector();
              }}
              className="flex items-center gap-2 rounded-xl border border-zinc-900 bg-zinc-900 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-zinc-800"
            >
              <Edit3 className="size-3.5" />
              <span>Personnaliser</span>
            </button>

            {/* Toggle visibility */}
            <button
              type="button"
              onClick={onToggle}
              className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-800 transition hover:bg-zinc-50"
            >
              {block.isVisible ? (
                <>
                  <EyeOff className="size-3.5 text-zinc-500" />
                  <span>Masquer</span>
                </>
              ) : (
                <>
                  <Eye className="size-3.5 text-emerald-600" />
                  <span>Rendre visible</span>
                </>
              )}
            </button>

            {/* Move Up */}
            <button
              type="button"
              disabled={index === 0 || !onMoveUp}
              onClick={onMoveUp}
              className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowUp className="size-3.5 text-zinc-500" />
              <span>Monter d'un rang</span>
            </button>

            {/* Move Down */}
            <button
              type="button"
              disabled={index === totalBlocks - 1 || !onMoveDown}
              onClick={onMoveDown}
              className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowDown className="size-3.5 text-zinc-500" />
              <span>Descendre d'un rang</span>
            </button>

            {/* Duplicate */}
            <button
              type="button"
              onClick={() => {
                onDuplicate();
                onClose();
              }}
              className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50"
            >
              <Copy className="size-3.5 text-zinc-500" />
              <span>Dupliquer ce bloc</span>
            </button>

            {/* Delete */}
            <button
              type="button"
              onClick={() => {
                onDelete();
                onClose();
              }}
              className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50/50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100/70"
            >
              <Trash2 className="size-3.5 text-red-500" />
              <span>Supprimer le bloc</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
