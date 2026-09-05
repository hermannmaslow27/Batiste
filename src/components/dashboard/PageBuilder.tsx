"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronDown,
  Copy,
  Eye,
  EyeOff,
  Globe2,
  Laptop,
  Maximize2,
  Plus,
  RefreshCw,
  Save,
  Settings,
  Smartphone,
  Sparkles,
  Tablet,
  Trash2,
} from "lucide-react";
import {
  addBlockAction,
  deleteBlockAction,
  duplicateBlockAction,
  reorderBlocksAction,
  toggleBlockVisibilityAction,
  updateBlockContentAction,
  updatePageAction,
} from "@/actions/content";
import { Badge, Button, Card, EmptyState, Select } from "@/components/ui";
import BlockView, { type PublicProduct } from "@/components/site/BlockView";
import { useI18n } from "@/i18n/client";
import type { Locale } from "@/i18n/messages";
import { themeStyle } from "@/lib/themes";
import { cn } from "@/lib/utils";
import BlockInspector from "./BlockInspector";
import BlockList from "./BlockList";
import { BlockLibrary } from "./PageBuilderLibrary";
import { NewPageModal, PageSettingsModal } from "./PageBuilderModals";
import CommandPalette from "./CommandPalette";

export interface BuilderBlock {
  id: string;
  type: string;
  position: number;
  isVisible: boolean;
  content: Record<string, unknown>;
}

export interface BuilderPage {
  id: string;
  title: string;
  slug: string;
  language: string;
  status: string;
  isHomepage: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  blocks: BuilderBlock[];
}

interface Props {
  siteId: string;
  pages: BuilderPage[];
  languages: string[];
  defaultLanguage: string;
  theme: { colors: unknown; fonts: unknown; borderRadius: string | null };
  products: PublicProduct[];
  features: Record<string, boolean>;
}

type DeviceMode = "desktop" | "tablet" | "mobile";

export default function PageBuilder({
  siteId,
  pages,
  languages,
  defaultLanguage,
  theme,
  products,
  features,
}: Props) {
  const { locale, t } = useI18n();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [language, setLanguage] = useState(
    languages.includes(defaultLanguage)
      ? defaultLanguage
      : (languages[0] ?? "fr"),
  );

  const visiblePages = useMemo(
    () => pages.filter((page) => page.language === language),
    [pages, language],
  );

  const [activePageId, setActivePageId] = useState<string | null>(
    visiblePages[0]?.id ?? null,
  );

  const activePage =
    pages.find((page) => page.id === activePageId) ?? visiblePages[0] ?? null;

  const [blocks, setBlocks] = useState<BuilderBlock[]>(
    activePage?.blocks ?? [],
  );

  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [device, setDevice] = useState<DeviceMode>("desktop");
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");

  const [libraryOpen, setLibraryOpen] = useState(false);
  const [newPageOpen, setNewPageOpen] = useState(false);
  const [pageSettingsOpen, setPageSettingsOpen] = useState(false);

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dragIndex = useRef<number | null>(null);

  const selectedBlock =
    blocks.find((block) => block.id === selectedBlockId) ?? null;

  // Resync when page selection changes externally
  useEffect(() => {
    const stillExists = pages.some((p) => p.id === activePageId);
    const nextPage = stillExists
      ? pages.find((p) => p.id === activePageId)!
      : (pages.find((p) => p.language === language) ?? null);
    setActivePageId(nextPage?.id ?? null);
    setBlocks(nextPage?.blocks ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages]);

  // Keyboard shortcut: Cmd+S / Ctrl+S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        toast.success("Modifications synchronisées");
        setSaveStatus("saved");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const run = (
    fn: () => Promise<{ ok: boolean; error?: string }>,
    message?: string,
  ) =>
    startTransition(async () => {
      const result = await fn();
      if (result.ok) {
        if (message) toast.success(message);
        router.refresh();
      } else {
        toast.error(t.common.genericError);
      }
    });

  const selectPage = (page: BuilderPage) => {
    setActivePageId(page.id);
    setBlocks(page.blocks);
    setSelectedBlockId(null);
  };

  const selectLanguage = (next: string) => {
    setLanguage(next);
    const page = pages.find((item) => item.language === next);
    setActivePageId(page?.id ?? null);
    setBlocks(page?.blocks ?? []);
    setSelectedBlockId(null);
  };

  // ✅ DEBOUNCED LOCAL AUTOSAVE: zero typing latency, zero full-page flickering
  const patchContent = (id: string, content: Record<string, unknown>) => {
    setBlocks((current) =>
      current.map((block) => (block.id === id ? { ...block, content } : block)),
    );
    setSaveStatus("saving");

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(async () => {
      const result = await updateBlockContentAction(id, content);
      if (result.ok) {
        setSaveStatus("saved");
      } else {
        setSaveStatus("unsaved");
        toast.error(t.common.genericError);
      }
    }, 600);
  };

  const drop = (target: number) => {
    const from = dragIndex.current;
    dragIndex.current = null;
    if (from === null || from === target || !activePage) return;
    const next = [...blocks];
    const [moved] = next.splice(from, 1);
    next.splice(target, 0, moved);
    setBlocks(next.map((block, position) => ({ ...block, position })));
    run(() =>
      reorderBlocksAction(
        activePage.id,
        next.map((block) => block.id),
      ),
    );
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    if (!activePage) return;
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    const [moved] = next.splice(index, 1);
    next.splice(target, 0, moved);
    setBlocks(next.map((block, position) => ({ ...block, position })));
    run(() =>
      reorderBlocksAction(
        activePage.id,
        next.map((block) => block.id),
      ),
    );
  };

  const toggle = (block: BuilderBlock) => {
    setBlocks((current) =>
      current.map((item) =>
        item.id === block.id ? { ...item, isVisible: !item.isVisible } : item,
      ),
    );
    run(() => toggleBlockVisibilityAction(block.id));
  };

  const remove = (block: BuilderBlock) => {
    setBlocks((current) => current.filter((item) => item.id !== block.id));
    if (selectedBlockId === block.id) setSelectedBlockId(null);
    run(() => deleteBlockAction(block.id), t.pages.blockDeleted);
  };

  return (
    <div className="space-y-4">
      {/* ───────────────── STUDIO TOP CONTROL BAR ───────────────── */}
      <header className="sticky top-14 z-20 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-zinc-200/90 bg-white/95 px-4 py-2.5 shadow-sm backdrop-blur-md">
        {/* Left: Page selector & info */}
        <div className="flex items-center gap-3">
          {activePage ? (
            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={activePage.id}
                  onChange={(e) => {
                    const p = pages.find((item) => item.id === e.target.value);
                    if (p) selectPage(p);
                  }}
                  className="appearance-none rounded-xl border border-zinc-200 bg-zinc-50 py-1.5 pl-3 pr-8 text-xs font-bold text-zinc-900 transition hover:bg-zinc-100 focus:outline-hidden cursor-pointer"
                >
                  {visiblePages.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} (/{p.slug || "accueil"})
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 size-3.5 text-zinc-400" />
              </div>

              <Badge
                tone={activePage.status === "published" ? "success" : "neutral"}
              >
                {activePage.status === "published" ? "Publié" : "Brouillon"}
              </Badge>

              <button
                type="button"
                onClick={() => setPageSettingsOpen(true)}
                title="Paramètres de la page (SEO & Slug)"
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition"
              >
                <Settings className="size-4" />
              </button>
            </div>
          ) : (
            <span className="text-xs text-zinc-500">Aucune page active</span>
          )}

          {languages.length > 1 && (
            <select
              value={language}
              onChange={(e) => selectLanguage(e.target.value)}
              className="rounded-lg border border-zinc-200 bg-white px-2 py-1 text-xs font-semibold text-zinc-600"
            >
              {languages.map((code) => (
                <option key={code} value={code}>
                  {code.toUpperCase()}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Center: Device Viewport Switcher */}
        <div className="flex items-center rounded-xl border border-zinc-200/80 bg-zinc-100 p-1">
          <button
            type="button"
            onClick={() => setDevice("desktop")}
            title="Aperçu Desktop (100%)"
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition",
              device === "desktop"
                ? "bg-white text-zinc-900 shadow-xs"
                : "text-zinc-500 hover:text-zinc-900",
            )}
          >
            <Laptop className="size-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setDevice("tablet")}
            title="Aperçu Tablette (768px)"
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition",
              device === "tablet"
                ? "bg-white text-zinc-900 shadow-xs"
                : "text-zinc-500 hover:text-zinc-900",
            )}
          >
            <Tablet className="size-3.5" />
            <span className="hidden sm:inline">Tablette</span>
          </button>
          <button
            type="button"
            onClick={() => setDevice("mobile")}
            title="Aperçu Smartphone (390px)"
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition",
              device === "mobile"
                ? "bg-white text-zinc-900 shadow-xs"
                : "text-zinc-500 hover:text-zinc-900",
            )}
          >
            <Smartphone className="size-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* Right: Actions & Status */}
        <div className="flex items-center gap-2">
          {/* Autosave status indicator */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-medium text-zinc-400 mr-1">
            {saveStatus === "saving" ? (
              <>
                <RefreshCw className="size-3 animate-spin text-amber-500" />
                <span>Sauvegarde…</span>
              </>
            ) : saveStatus === "saved" ? (
              <>
                <Check className="size-3 text-emerald-500" />
                <span className="text-zinc-500">Enregistré</span>
              </>
            ) : (
              <>
                <span className="size-2 rounded-full bg-amber-400" />
                <span>Non enregistré</span>
              </>
            )}
          </div>

          <Button
            size="sm"
            onClick={() => setLibraryOpen(true)}
            className="gap-1.5"
          >
            <Plus className="size-3.5" />
            <span>Ajouter un bloc</span>
          </Button>

          {activePage && (
            <Button
              size="sm"
              variant={activePage.status === "published" ? "outline" : "primary"}
              loading={pending}
              onClick={() =>
                run(
                  () =>
                    updatePageAction({
                      pageId: activePage.id,
                      status:
                        activePage.status === "published"
                          ? "draft"
                          : "published",
                    }),
                  activePage.status === "published"
                    ? t.pages.pageUnpublished
                    : t.pages.pagePublished,
                )
              }
            >
              {activePage.status === "published"
                ? "Dépublier"
                : "Publier la page"}
            </Button>
          )}

          <Button
            size="sm"
            variant="ghost"
            onClick={() => setNewPageOpen(true)}
            title="Créer une nouvelle page"
          >
            + Page
          </Button>
        </div>
      </header>

      {/* ───────────────── STUDIO WORKSPACE GRID ───────────────── */}
      <div className="grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)_340px]">
        {/* LEFT COLUMN: Page Tree & Block Hierarchy */}
        <div className="space-y-4">
          <Card className="p-3">
            <div className="mb-2.5 flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Arborescence ({blocks.length})
              </span>
              <button
                type="button"
                onClick={() => setLibraryOpen(true)}
                className="text-[11px] font-semibold text-zinc-600 hover:text-zinc-950 transition"
              >
                + Ajouter
              </button>
            </div>

            <BlockList
              blocks={blocks}
              selectedBlockId={selectedBlockId}
              t={t}
              onSelect={setSelectedBlockId}
              onDragStart={(index) => {
                dragIndex.current = index;
              }}
              onDrop={drop}
              onAdd={() => setLibraryOpen(true)}
              onToggle={toggle}
              onDuplicate={(block) =>
                run(() => duplicateBlockAction(block.id))
              }
              onDelete={remove}
            />
          </Card>
        </div>

        {/* CENTER COLUMN: Interactive Responsive Canvas */}
        <main className="min-w-0">
          {activePage ? (
            <div className="flex justify-center">
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  device === "desktop" && "w-full rounded-2xl border border-zinc-200/90 bg-white shadow-sm",
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
                      <Button
                        className="mt-6 gap-2"
                        onClick={() => setLibraryOpen(true)}
                      >
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
                          onClick={() => setSelectedBlockId(block.id)}
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
                              onClick={() => moveBlock(index, "up")}
                              className="rounded-md p-1 hover:bg-white/20 disabled:opacity-30"
                            >
                              <ArrowUp className="size-3.5" />
                            </button>
                            <button
                              type="button"
                              title="Descendre ce bloc"
                              disabled={index === blocks.length - 1}
                              onClick={() => moveBlock(index, "down")}
                              className="rounded-md p-1 hover:bg-white/20 disabled:opacity-30"
                            >
                              <ArrowDown className="size-3.5" />
                            </button>
                            <button
                              type="button"
                              title="Dupliquer"
                              onClick={() => run(() => duplicateBlockAction(block.id))}
                              className="rounded-md p-1 hover:bg-white/20"
                            >
                              <Copy className="size-3.5" />
                            </button>
                            <button
                              type="button"
                              title={block.isVisible ? "Masquer" : "Afficher"}
                              onClick={() => toggle(block)}
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
                              onClick={() => remove(block)}
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
          ) : (
            <EmptyState
              title={t.pages.selectPage}
              action={
                <Button onClick={() => setNewPageOpen(true)}>
                  {t.pages.newPage}
                </Button>
              }
            />
          )}
        </main>

        {/* RIGHT COLUMN: Tabbed Block Inspector */}
        <div className="space-y-4">
          <Card className="p-4 lg:sticky lg:top-28">
            {selectedBlock ? (
              <BlockInspector
                key={selectedBlock.id}
                block={selectedBlock}
                siteId={siteId}
                t={t}
                onChange={(content) => patchContent(selectedBlock.id, content)}
                onDelete={() => remove(selectedBlock)}
              />
            ) : (
              <div className="py-16 text-center">
                <Sparkles className="mx-auto size-7 text-zinc-300 mb-3" />
                <p className="text-xs font-semibold text-zinc-700">
                  Sélectionnez un bloc
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-zinc-400 px-4">
                  Cliquez sur n'importe quel bloc dans la page pour modifier ses textes, ses images ou son style.
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* ───────────────── MODALS & COMMAND PALETTE ───────────────── */}
      <BlockLibrary
        open={libraryOpen}
        onClose={() => setLibraryOpen(false)}
        features={features}
        onAdd={(type) => {
          if (!activePage) return;
          setLibraryOpen(false);
          run(
            () => addBlockAction({ pageId: activePage.id, type }),
            t.pages.blockAdded,
          );
        }}
      />

      <NewPageModal
        open={newPageOpen}
        onClose={() => setNewPageOpen(false)}
        siteId={siteId}
        language={language}
      />

      {activePage && (
        <PageSettingsModal
          key={activePage.id}
          open={pageSettingsOpen}
          onClose={() => setPageSettingsOpen(false)}
          page={activePage}
        />
      )}
    </div>
  );
}