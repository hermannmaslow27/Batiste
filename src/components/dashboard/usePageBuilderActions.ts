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
import { useI18n } from "@/i18n/client";
import type { BuilderBlock, BuilderPage } from "./PageBuilder";

export function usePageBuilderActions(
  siteId: string,
  pages: BuilderPage[],
  languages: string[],
  defaultLanguage: string,
) {
  const { t } = useI18n();
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
  const [blocks, setBlocks] = useState<BuilderBlock[]>(activePage?.blocks ?? []);

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
  const selectedBlock = blocks.find((b) => b.id === selectedBlockId) ?? null;

  const run = (fn: () => Promise<{ ok: boolean; error?: string }>, message?: string) =>
    startTransition(async () => {
      const result = await fn();
      if (result.ok) {
        if (message) toast.success(message);
        router.refresh();
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
    run(() => reorderBlocksAction(activePage.id, next.map((b) => b.id)));
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

  const addBlock = (type: any) => {
    if (!activePage) return;
    setLibraryOpen(false);
    run(() => addBlockAction({ pageId: activePage.id, type }), t.pages.blockAdded);
  };

  const togglePublish = () => {
    if (!activePage) return;
    run(
      () =>
        updatePageAction({
          pageId: activePage.id,
          status: activePage.status === "published" ? "draft" : "published",
        }),
      activePage.status === "published" ? t.pages.pageUnpublished : t.pages.pagePublished,
    );
  };

  return {
    language,
    visiblePages,
    activePage,
    blocks,
    selectedBlock,
    selectedBlockId,
    setSelectedBlockId,
    view,
    setView,
    libraryOpen,
    setLibraryOpen,
    newPageOpen,
    setNewPageOpen,
    pageSettingsOpen,
    setPageSettingsOpen,
    dragIndex,
    pending,
    selectPage,
    selectLanguage,
    patchContent,
    drop,
    toggle,
    remove,
    addBlock,
    togglePublish,
  };
}
