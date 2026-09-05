"use client";
import { useRouter } from "next/navigation";
import {
  Compass,
  FileText,
  Globe2,
  Inbox,
  LayoutDashboard,
  Palette,
  Plus,
  Settings,
  Sparkles,
} from "lucide-react";
import { BLOCK_REGISTRY, BLOCK_TYPES, type BlockType } from "@/lib/blocks";
import type { Messages } from "@/i18n/messages";

export interface CommandItem {
  id: string;
  label: string;
  category: "pages" | "navigation" | "blocks" | "actions";
  icon: React.ReactNode;
  hint?: string;
  onSelect: () => void;
}

export function useCommandItems({
  siteId,
  locale,
  subdomain,
  pages = [],
  t,
  onClose,
  onAddBlock,
  onNewPage,
}: {
  siteId: string;
  locale: string;
  subdomain: string;
  pages?: { id: string; title: string; slug: string }[];
  t: Messages;
  onClose: () => void;
  onAddBlock?: (type: BlockType) => void;
  onNewPage?: () => void;
}): CommandItem[] {
  const router = useRouter();
  const base = `/${locale}/dashboard/${siteId}`;

  return [
    // Pages
    ...pages.map((p) => ({
      id: `page-${p.id}`,
      label: p.title,
      category: "pages" as const,
      icon: <FileText className="size-4 text-zinc-500" />, // JSX component
      hint: `/${p.slug}`,
      onSelect: () => {
        router.push(`${base}/pages`);
        onClose();
      },
    })),
    // Navigation
    {
      id: "nav-overview",
      label: "Tableau de bord (Vue d'ensemble)",
      category: "navigation" as const,
      icon: <LayoutDashboard className="size-4 text-zinc-500" />, // JSX
      onSelect: () => {
        router.push(base);
        onClose();
      },
    },
    {
      id: "nav-pages",
      label: "Pages \u0026 Éditeur",
      category: "navigation" as const,
      icon: <FileText className="size-4 text-zinc-500" />, // JSX
      onSelect: () => {
        router.push(`${base}/pages`);
        onClose();
      },
    },
    {
      id: "nav-theme",
      label: "Thème \u0026 Design visuel",
      category: "navigation" as const,
      icon: <Palette className="size-4 text-zinc-500" />, // JSX
      onSelect: () => {
        router.push(`${base}/theme`);
        onClose();
      },
    },
    {
      id: "nav-navigation",
      label: "Navigation \u0026 Menus du site",
      category: "navigation" as const,
      icon: <Compass className="size-4 text-zinc-500" />, // JSX
      onSelect: () => {
        router.push(`${base}/navigation`);
        onClose();
      },
    },
    {
      id: "nav‑inbox",
      label: "Boîte de réception \u0026 Messages",
      category: "navigation" as const,
      icon: <Inbox className="size-4 text-zinc-500" />, // JSX
      onSelect: () => {
        router.push(`${base}/inbox`);
        onClose();
      },
    },
    {
      id: "nav-settings",
      label: "Paramètres du site",
      category: "navigation" as const,
      icon: <Settings className="size-4 text-zinc-500" />, // JSX
      onSelect: () => {
        router.push(`${base}/settings`);
        onClose();
      },
    },
    // Blocks
    ...(onAddBlock
      ? BLOCK_TYPES.map((type) => ({
          id: `block-${type}`,
          label: `Insérer bloc : ${t.blocks[type] ?? type}`,
          category: "blocks" as const,
          icon: <Sparkles className="size-4 text-zinc-500" />, // JSX
          hint: BLOCK_REGISTRY[type]?.icon,
          onSelect: () => {
            onAddBlock(type);
            onClose();
          },
        }))
      : []),
    // Quick Actions
    ...(onNewPage
      ? [
          {
            id: "action-new-page",
            label: "Créer une nouvelle page",
            category: "actions" as const,
            icon: <Plus className="size-4 text-emerald-600" />, // JSX
            onSelect: () => {
              onNewPage();
              onClose();
            },
          },
        ]
      : []),
    {
      id: "action-view-site",
      label: "Voir le site public en direct",
      category: "actions" as const,
      icon: <Globe2 className="size-4 text-blue-600" />, // JSX
      hint: `${subdomain}.batiste.app`,
      onSelect: () => {
        window.open(`/s/${subdomain}`, "_blank");
        onClose();
      },
    },
  ];
}
