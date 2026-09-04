"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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

  // ✅ FIX: resynchronise activePageId/blocks quand `pages` change (nouveau
  // fetch serveur après revalidatePath), sans quoi le builder reste figé sur
  // les données du premier rendu tant qu'on ne clique pas ailleurs.
  useEffect(() => {
    const stillExists = pages.some((p) => p.id === activePageId);
    const nextPage = stillExists
      ? pages.find((p) => p.id === activePageId)!
      : (pages.find((p) => p.language === language) ?? null);
    setActivePageId(nextPage?.id ?? null);
    setBlocks(nextPage?.blocks ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages]);

  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [view, setView] = useState<"structure" | "preview">("structure");
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [newPageOpen, setNewPageOpen] = useState(false);
  const [pageSettingsOpen, setPageSettingsOpen] = useState(false);
  const dragIndex = useRef<number | null>(null);
  const selectedBlock =
    blocks.find((block) => block.id === selectedBlockId) ?? null;

  const run = (
    fn: () => Promise<{ ok: boolean; error?: string }>,
    message?: string,
  ) =>
    startTransition(async () => {
      const result = await fn();
      if (result.ok) {
        if (message) toast.success(message);
        router.refresh(); // ✅ force le refetch du Server Component parent
      } else toast.error(t.common.genericError);
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
  const patchContent = (id: string, content: Record<string, unknown>) => {
    setBlocks((current) =>
      current.map((block) => (block.id === id ? { ...block, content } : block)),
    );
    void updateBlockContentAction(id, content).then((result) => {
      if (!result.ok) toast.error(t.common.genericError);
      else router.refresh();
    });
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
    <div className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-zinc-900">
            {t.pages.title}
          </h1>
          <p className="mt-1 text-sm text-zinc-500">{t.pages.subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {languages.length > 1 && (
            <Select
              className="h-10 w-auto py-0"
              value={language}
              onChange={(event) => selectLanguage(event.target.value)}
            >
              {languages.map((code) => (
                <option key={code} value={code}>
                  {code.toUpperCase()}
                </option>
              ))}
            </Select>
          )}
          <Button variant="outline" onClick={() => setNewPageOpen(true)}>
            + {t.pages.newPage}
          </Button>
          {activePage && (
            <Button
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
                ? t.common.unpublish
                : t.common.publish}
            </Button>
          )}
        </div>
      </header>
      <div className="grid gap-4 xl:grid-cols-[210px_minmax(0,1fr)_320px]">
        <Card className="h-fit p-2">
          {visiblePages.length === 0 ? (
            <p className="px-2 py-6 text-center text-[13px] text-zinc-400">
              {t.pages.noPages}
            </p>
          ) : (
            <ul className="space-y-0.5">
              {visiblePages.map((page) => (
                <li key={page.id}>
                  <button
                    onClick={() => selectPage(page)}
                    className={cn(
                      "w-full rounded-lg px-3 py-2 text-left transition-colors",
                      page.id === activePage?.id
                        ? "bg-zinc-900 text-white"
                        : "hover:bg-zinc-100",
                    )}
                  >
                    <span className="block truncate text-[13px] font-medium">
                      {page.title}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 block truncate font-mono text-[11px]",
                        page.id === activePage?.id
                          ? "text-white/60"
                          : "text-zinc-400",
                      )}
                    >
                      /{page.slug}
                      {page.status === "published" ? " · ●" : ""}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <main className="min-w-0 space-y-3">
          {activePage ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex rounded-xl border border-zinc-200 bg-white p-0.5">
                  {(["structure", "preview"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setView(mode)}
                      className={cn(
                        "rounded-lg px-3 py-1.5 text-[13px] font-medium transition",
                        view === mode
                          ? "bg-zinc-900 text-white"
                          : "text-zinc-500 hover:text-zinc-900",
                      )}
                    >
                      {mode === "structure"
                        ? t.pages.blocks
                        : t.pages.livePreview}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    tone={
                      activePage.status === "published" ? "success" : "neutral"
                    }
                  >
                    {activePage.status === "published"
                      ? t.common.published
                      : t.common.draft}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setPageSettingsOpen(true)}
                  >
                    {t.common.edit}
                  </Button>
                </div>
              </div>
              {view === "structure" ? (
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
              ) : (
                <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                  <div className="flex items-center gap-1.5 border-b border-zinc-200 bg-zinc-50 px-4 py-2">
                    <span className="size-2.5 rounded-full bg-zinc-300" />
                    <span className="size-2.5 rounded-full bg-zinc-300" />
                    <span className="size-2.5 rounded-full bg-zinc-300" />
                  </div>
                  <div
                    className="scroll-slim max-h-[70vh] overflow-y-auto"
                    style={themeStyle(theme)}
                  >
                    {blocks
                      .filter((block) => block.isVisible)
                      .map((block) => (
                        <BlockView
                          key={block.id}
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
                      ))}
                  </div>
                </div>
              )}
            </>
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
        <Card className="h-fit p-4 xl:sticky xl:top-6">
          {selectedBlock ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold tracking-tight">
                  {t.pages.properties}
                </h3>
                <Badge>
                  {t.blocks[selectedBlock.type as keyof typeof t.blocks] ??
                    selectedBlock.type}
                </Badge>
              </div>
              <BlockInspector
                block={selectedBlock}
                siteId={siteId}
                t={t}
                onChange={(content) => patchContent(selectedBlock.id, content)}
              />
            </div>
          ) : (
            <p className="py-10 text-center text-[13px] text-zinc-400">
              {t.pages.selectBlock}
            </p>
          )}
        </Card>
      </div>
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