import {
  Check,
  ChevronDown,
  Laptop,
  Plus,
  RefreshCw,
  Settings,
  Smartphone,
  Tablet,
} from "lucide-react";
import { Badge, Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { BuilderPage } from "../PageBuilder";
import type { DeviceMode, SaveStatus } from "./usePageBuilderState";

export default function StudioTopBar({
  activePage,
  pages,
  visiblePages,
  languages,
  language,
  device,
  saveStatus,
  pending,
  onSelectPage,
  onSelectLanguage,
  onSetDevice,
  onOpenSettings,
  onOpenLibrary,
  onNewPage,
  onTogglePublish,
}: {
  activePage: BuilderPage | null;
  pages: BuilderPage[];
  visiblePages: BuilderPage[];
  languages: string[];
  language: string;
  device: DeviceMode;
  saveStatus: SaveStatus;
  pending: boolean;
  onSelectPage: (page: BuilderPage) => void;
  onSelectLanguage: (lang: string) => void;
  onSetDevice: (mode: DeviceMode) => void;
  onOpenSettings: () => void;
  onOpenLibrary: () => void;
  onNewPage: () => void;
  onTogglePublish: () => void;
}) {
  return (
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
                  if (p) onSelectPage(p);
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
              onClick={onOpenSettings}
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
            onChange={(e) => onSelectLanguage(e.target.value)}
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
          onClick={() => onSetDevice("desktop")}
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
          onClick={() => onSetDevice("tablet")}
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
          onClick={() => onSetDevice("mobile")}
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

      {/* Right: Actions & Autosave status */}
      <div className="flex items-center gap-2">
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

        <Button size="sm" onClick={onOpenLibrary} className="gap-1.5">
          <Plus className="size-3.5" />
          <span>Ajouter un bloc</span>
        </Button>

        {activePage && (
          <Button
            size="sm"
            variant={activePage.status === "published" ? "outline" : "primary"}
            loading={pending}
            onClick={onTogglePublish}
          >
            {activePage.status === "published" ? "Dépublier" : "Publier"}
          </Button>
        )}

        <Button size="sm" variant="ghost" onClick={onNewPage}>
          + Page
        </Button>
      </div>
    </header>
  );
}
