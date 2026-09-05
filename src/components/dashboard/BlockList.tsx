"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { Badge, Button, EmptyState } from "@/components/ui";
import { getBlockDef } from "@/lib/blocks";
import type { Messages } from "@/i18n/messages";
import type { BuilderBlock } from "./PageBuilder";
import BlockDetailsModal from "./builder/BlockDetailsModal";

export default function BlockList({
  blocks,
  selectedBlockId,
  t,
  onSelect,
  onDrop,
  onDragStart,
  onToggle,
  onDuplicate,
  onDelete,
  onAdd,
  onMove,
}: {
  blocks: BuilderBlock[];
  selectedBlockId: string | null;
  t: Messages;
  onSelect: (id: string) => void;
  onDrop: (index: number) => void;
  onDragStart: (index: number) => void;
  onToggle: (block: BuilderBlock) => void;
  onDuplicate: (block: BuilderBlock) => void;
  onDelete: (block: BuilderBlock) => void;
  onAdd: () => void;
  onMove?: (index: number, direction: "up" | "down") => void;
}) {
  const [detailsBlockIndex, setDetailsBlockIndex] = useState<number | null>(
    null,
  );

  const activeModalBlock =
    detailsBlockIndex !== null ? blocks[detailsBlockIndex] ?? null : null;

  return (
    <div className="rounded-2xl border border-zinc-200/80 bg-white p-2.5 shadow-sm">
      {blocks.length === 0 ? (
        <EmptyState
          title={t.pages.noBlocks}
          action={<Button onClick={onAdd}>{t.pages.addBlock}</Button>}
        />
      ) : (
        <ul className="space-y-1.5">
          {blocks.map((block, index) => {
            const def = getBlockDef(block.type);
            const active = selectedBlockId === block.id;
            const blockName =
              t.blocks[block.type as keyof typeof t.blocks] ?? block.type;
            const title = String(block.content.title ?? "").trim();

            return (
              <li
                key={block.id}
                draggable
                onDragStart={() => onDragStart(index)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => onDrop(index)}
                onClick={() => onSelect(block.id)}
                className={`group flex cursor-grab items-center gap-2.5 rounded-xl border px-2.5 py-2 transition active:cursor-grabbing ${
                  active
                    ? "border-zinc-900 bg-zinc-50 shadow-xs ring-1 ring-zinc-900/10"
                    : "border-zinc-200 hover:border-zinc-300 bg-white"
                }`}
              >
                {/* Drag handle */}
                <span className="text-zinc-300 group-hover:text-zinc-500 transition shrink-0 select-none">
                  ⠿
                </span>

                {/* Index badge */}
                <span className="font-mono text-[10px] text-zinc-400 shrink-0 select-none">
                  #{index + 1}
                </span>

                {/* Block Icon */}
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-[11px] font-bold text-white shadow-xs">
                  {def?.icon ?? "▪"}
                </span>

                {/* Block Name & Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-[12.5px] font-semibold text-zinc-900">
                      {blockName}
                    </p>
                    <span className="shrink-0 font-mono text-[9.5px] text-zinc-400 bg-zinc-100 rounded px-1">
                      {block.type}
                    </span>
                  </div>
                  <p className="truncate text-[11px] text-zinc-500">
                    {title || "Sans titre personnalisé"}
                  </p>
                </div>

                {/* Status */}
                {!block.isVisible && (
                  <Badge tone="neutral">
                    <span className="text-[10px]">Masqué</span>
                  </Badge>
                )}

                {/* 3 Points Button (Always accessible) */}
                <button
                  type="button"
                  title="Détails & actions du bloc"
                  onClick={(event) => {
                    event.stopPropagation();
                    setDetailsBlockIndex(index);
                  }}
                  className="flex size-7 shrink-0 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 transition"
                >
                  <MoreVertical className="size-4" />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {blocks.length > 0 && (
        <button
          type="button"
          onClick={onAdd}
          className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-zinc-300 py-2.5 text-xs font-semibold text-zinc-600 transition hover:border-zinc-400 hover:bg-zinc-50 hover:text-zinc-950"
        >
          <span>+</span>
          <span>{t.pages.addBlock}</span>
        </button>
      )}

      {/* Block Details Modal triggered by the 3 dots */}
      {activeModalBlock && detailsBlockIndex !== null && (
        <BlockDetailsModal
          block={activeModalBlock}
          index={detailsBlockIndex}
          totalBlocks={blocks.length}
          open={detailsBlockIndex !== null}
          onClose={() => setDetailsBlockIndex(null)}
          onSelectInspector={() => onSelect(activeModalBlock.id)}
          onMoveUp={
            onMove && detailsBlockIndex > 0
              ? () => onMove(detailsBlockIndex, "up")
              : undefined
          }
          onMoveDown={
            onMove && detailsBlockIndex < blocks.length - 1
              ? () => onMove(detailsBlockIndex, "down")
              : undefined
          }
          onDuplicate={() => onDuplicate(activeModalBlock)}
          onToggle={() => onToggle(activeModalBlock)}
          onDelete={() => onDelete(activeModalBlock)}
          t={t}
        />
      )}
    </div>
  );
}
