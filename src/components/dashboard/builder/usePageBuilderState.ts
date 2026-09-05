"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  deleteBlockAction,
  duplicateBlockAction,
  reorderBlocksAction,
  toggleBlockVisibilityAction,
  updateBlockContentAction,
} from "@/actions/content";
import { useI18n } from "@/i18n/client";
import type { BuilderBlock, BuilderPage } from "../PageBuilder";

export type DeviceMode = "desktop" | "tablet" | "mobile";
export type SaveStatus = "saved" | "saving" | "unsaved";

export function usePageBuilderState({
  pages,
  languages,
  defaultLanguage,
}: {
  pages: BuilderPage[];
  languages: string[];
  defaultLanguage: string;
}) {
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

  const [blocks, setBlocks] = useState<BuilderBlock[]>(
    activePage?.blocks ?? [],
  );

  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [device, setDevice] = useState<DeviceMode>("desktop");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");

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

  // Debounced autosave
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

  const duplicate = (block: BuilderBlock) => {
    run(() => duplicateBlockAction(block.id));
  };

  return {
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
  };
}
