import {
  ArrowDown,
  ArrowUp,
  Copy,
  Eye,
  EyeOff,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui";
import BlockView, { type PublicProduct } from "@/components/site/BlockView";
import type { Locale, Messages } from "@/i18n/messages";
import { themeStyle } from "@/lib/themes";
import { cn } from "@/lib/utils";
import type { BuilderBlock, BuilderPage } from "../PageBuilder";
import type { DeviceMode } from "./usePageBuilderState";

export default function StudioCanvas({
  activePage,
  blocks,
  selectedBlockId,
  device,
  theme,
  siteId,
  locale,
  products,
  t,
  onSelectBlock,
  onMoveBlock,
  onDuplicateBlock,
  onToggleBlock,
  onRemoveBlock,
  onOpenLibrary,
}: {
  activePage: BuilderPage;
  blocks: BuilderBlock[];
  selectedBlockId: string | null;
  device: DeviceMode;
  theme: { colors: unknown; fonts: unknown; borderRadius: string | null };
  siteId: string;
  locale: string;
  products: PublicProduct[];
  t: Messages;
  onSelectBlock: (id: string) => void;
  onMoveBlock: (index: number, direction: "up" | "down") => void;
  onDuplicateBlock: (block: BuilderBlock) => void;
  onToggleBlock: (block: BuilderBlock) => void;
  onRemoveBlock: (block: BuilderBlock) => void;
  onOpenLibrary: () => void;
}) {
  return (
    <div className="flex justify-center">
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          device === "desktop" &&
            "w-full rounded-2xl border border-zinc-200/90 bg-white shadow-sm",
          device === "tablet" &&
            "w-full max-w-[768px] rounded-3xl border-4 border-zinc-300 bg-white shadow-2xl my-4 ring-1 ring-zinc-400/20",
          device === "mobile" &&
            "w-full max-w-[390px] rounded-[44px] border-[8px] border-zinc-900 bg-white shadow-2xl my-4 relative ring-1 ring-zinc-800",
        )}
      >
        {/* Mobile top simulated bar / dynamic notch */}
        {device === "mobile" && (
          <div className="sticky top-0 z-30 flex items-center justify-center bg-white/95 pt-2 pb-1">
            <div className="h-4 w-28 rounded-full bg-zinc-900" />
          </div>
        )}

        {/* Canvas Block Render */}
        <div
          className="scroll-slim max-h-[82vh] overflow-y-auto"
          style={themeStyle(theme)}
        >
          {blocks.length === 0 ? (
            <div className="p-16 text-center">
              <p className="text-sm font-semibold text-zinc-800">
                Cette page ne contient encore aucun bloc.
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                Cliquez sur le bouton ci-dessous pour choisir votre premier composant.
              </p>
              <Button className="mt-6 gap-2" onClick={onOpenLibrary}>
                <Plus className="size-4" />
                Choisir un bloc
              </Button>
            </div>
          ) : (
            blocks.map((block, index) => {
              const isSelected = selectedBlockId === block.id;
              const isHidden = !block.isVisible;

              return (
                <div
                  key={block.id}
                  onClick={() => onSelectBlock(block.id)}
                  className={cn(
                    "group relative transition-all duration-200 cursor-pointer",
                    isSelected
                      ? "ring-3 ring-zinc-950 ring-inset shadow-md z-10"
                      : "hover:ring-2 hover:ring-zinc-400/70 hover:ring-inset",
                    isHidden && "opacity-40 grayscale",
                  )}
                >
                  {/* Floating block control toolbar on hover / select */}
                  <div
                    className={cn(
                      "absolute right-3 top-3 z-30 items-center gap-1 rounded-xl bg-zinc-900/90 px-2 py-1 text-white shadow-xl backdrop-blur-md transition-opacity duration-150",
                      isSelected
                        ? "flex opacity-100"
                        : "hidden group-hover:flex opacity-90",
                    )}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-[11px] font-bold px-1.5 text-zinc-300">
                      {t.blocks[block.type as keyof typeof t.blocks] ?? block.type}
                    </span>
                    <button
                      type="button"
                      title="Monter ce bloc"
                      disabled={index === 0}
                      onClick={() => onMoveBlock(index, "up")}
                      className="rounded-md p-1 hover:bg-white/20 disabled:opacity-30"
                    >
                      <ArrowUp className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      title="Descendre ce bloc"
                      disabled={index === blocks.length - 1}
                      onClick={() => onMoveBlock(index, "down")}
                      className="rounded-md p-1 hover:bg-white/20 disabled:opacity-30"
                    >
                      <ArrowDown className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      title="Dupliquer"
                      onClick={() => onDuplicateBlock(block)}
                      className="rounded-md p-1 hover:bg-white/20"
                    >
                      <Copy className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      title={block.isVisible ? "Masquer" : "Afficher"}
                      onClick={() => onToggleBlock(block)}
                      className="rounded-md p-1 hover:bg-white/20"
                    >
                      {block.isVisible ? (
                        <Eye className="size-3.5" />
                      ) : (
                        <EyeOff className="size-3.5 text-amber-300" />
                      )}
                    </button>
                    <button
                      type="button"
                      title="Supprimer"
                      onClick={() => onRemoveBlock(block)}
                      className="rounded-md p-1 hover:bg-red-500/80 text-red-300"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>

                  {/* Block Renderer */}
                  <div className="pointer-events-none select-none">
                    <BlockView
                      type={block.type}
                      content={block.content}
                      ctx={{
                        siteId,
                        pageId: activePage.id,
                        locale: locale as Locale,
                        products,
                        preview: true,
                      }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
