"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { addBlockAction, updatePageAction } from "@/actions/content";
import { Card, EmptyState, Button } from "@/components/ui";
import type { PublicProduct } from "@/components/site/BlockView";
import { useI18n } from "@/i18n/client";
import BlockInspector from "./BlockInspector";
import BlockList from "./BlockList";
import { BlockLibrary } from "./PageBuilderLibrary";
import { NewPageModal, PageSettingsModal } from "./PageBuilderModals";
import { usePageBuilderState } from "./builder/usePageBuilderState";
import StudioTopBar from "./builder/StudioTopBar";
import StudioCanvas from "./builder/StudioCanvas";

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
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [newPageOpen, setNewPageOpen] = useState(false);
  const [pageSettingsOpen, setPageSettingsOpen] = useState(false);

  const {
    language,
    visiblePages,
    activePage,
    blocks,
    selectedBlockId,
    selectedBlock,
    device,
    saveStatus,
    pending,
    dragIndex,
    setSelectedBlockId,
    setDevice,
    selectPage,
    selectLanguage,
    patchContent,
    drop,
    moveBlock,
    toggle,
    remove,
    duplicate,
    run,
  } = usePageBuilderState({
    pages,
    languages,
    defaultLanguage,
  });

  return (
    <div className="space-y-4">
      {/* ───────────────── STUDIO TOP CONTROL BAR ───────────────── */}
      <StudioTopBar
        activePage={activePage}
        pages={pages}
        visiblePages={visiblePages}
        languages={languages}
        language={language}
        device={device}
        saveStatus={saveStatus}
        pending={pending}
        onSelectPage={selectPage}
        onSelectLanguage={selectLanguage}
        onSetDevice={setDevice}
        onOpenSettings={() => setPageSettingsOpen(true)}
        onOpenLibrary={() => setLibraryOpen(true)}
        onNewPage={() => setNewPageOpen(true)}
        onTogglePublish={() => {
          if (!activePage) return;
          run(
            () =>
              updatePageAction({
                pageId: activePage.id,
                status:
                  activePage.status === "published" ? "draft" : "published",
              }),
            activePage.status === "published"
              ? t.pages.pageUnpublished
              : t.pages.pagePublished,
          );
        }}
      />

      {/* ───────────────── STUDIO WORKSPACE GRID ───────────────── */}
      <div className="grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)_340px]">
        {/* LEFT COLUMN: Block Outline Hierarchy */}
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
              onDuplicate={duplicate}
              onDelete={remove}
            />
          </Card>
        </div>

        {/* CENTER COLUMN: Responsive Canvas */}
        <main className="min-w-0">
          {activePage ? (
            <StudioCanvas
              activePage={activePage}
              blocks={blocks}
              selectedBlockId={selectedBlockId}
              device={device}
              theme={theme}
              siteId={siteId}
              locale={locale}
              products={products}
              t={t}
              onSelectBlock={setSelectedBlockId}
              onMoveBlock={moveBlock}
              onDuplicateBlock={duplicate}
              onToggleBlock={toggle}
              onRemoveBlock={remove}
              onOpenLibrary={() => setLibraryOpen(true)}
            />
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

      {/* ───────────────── MODALS ───────────────── */}
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