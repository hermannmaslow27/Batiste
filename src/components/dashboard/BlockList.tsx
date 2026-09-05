"use client";

import { Badge, Button, EmptyState, IconButton } from "@/components/ui";
import { getBlockDef } from "@/lib/blocks";
import type { Messages } from "@/i18n/messages";
import type { BuilderBlock } from "./PageBuilder";

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
}) {
  return (
    <div className="rounded-2xl border border-zinc-200/80 bg-white p-3 shadow-sm">
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
            return (
              <li
                key={block.id}
                draggable
                onDragStart={() => onDragStart(index)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => onDrop(index)}
                onClick={() => onSelect(block.id)}
                className={`group flex cursor-grab items-center gap-3 rounded-xl border px-3 py-2.5 transition active:cursor-grabbing ${active ? "border-zinc-900 bg-zinc-50" : "border-zinc-200 hover:border-zinc-300"}`}
              >
                <span className="text-zinc-300">⠿</span>
                <span className="flex size-7 items-center justify-center rounded-lg bg-zinc-900 text-[12px] text-white">
                  {def?.icon ?? "▪"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-zinc-900">
                    {t.blocks[block.type as keyof typeof t.blocks] ??
                      block.type}
                  </p>
                  <p className="truncate text-[12px] text-zinc-400">
                    {String(block.content.title ?? "—")}
                  </p>
                </div>
                {!block.isVisible && <Badge>{t.pages.hidden}</Badge>}
                <div className="flex items-center opacity-0 transition group-hover:opacity-100">
                  <IconButton
                    label={t.pages.visible}
                    onClick={(event) => {
                      event.stopPropagation();
                      onToggle(block);
                    }}
                  >
                    {block.isVisible ? "◉" : "◌"}
                  </IconButton>
                  <IconButton
                    label={t.pages.duplicate}
                    onClick={(event) => {
                      event.stopPropagation();
                      onDuplicate(block);
                    }}
                  >
                    ⧉
                  </IconButton>
                  <IconButton
                    label={t.common.delete}
                    onClick={(event) => {
                      event.stopPropagation();
                      onDelete(block);
                    }}
                  >
                    ✕
                  </IconButton>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {blocks.length > 0 && (
        <button
          onClick={onAdd}
          className="mt-2 w-full rounded-xl border border-dashed border-zinc-300 py-3 text-[13px] font-medium text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-900"
        >
          + {t.pages.addBlock}
        </button>
      )}
    </div>
  );
}
