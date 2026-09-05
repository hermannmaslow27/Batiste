"use client";

import { useState } from "react";
import {
  Globe2,
  Laptop,
  Layers,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";
import {
  COLOR_THEMES,
  type ColorTheme,
  type TemplateKey,
} from "./hero-showcase/showcaseData";
import SaasPreview from "./hero-showcase/SaasPreview";
import StudioPreview from "./hero-showcase/StudioPreview";
import BoutiquePreview from "./hero-showcase/BoutiquePreview";
import ArtisanPreview from "./hero-showcase/ArtisanPreview";

export default function MarketingHeroShowcase({ locale }: { locale: string }) {
  const [activeTemplate, setActiveTemplate] = useState<TemplateKey>("saas");
  const [activeTheme, setActiveTheme] = useState<ColorTheme>(COLOR_THEMES[0]);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  return (
    <div className="mx-auto mt-12 max-w-5xl">
      {/* Interactive Studio Sandbox Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-zinc-200/80 bg-white/90 p-2.5 shadow-sm backdrop-blur-md">
        {/* Templates switcher */}
        <div className="flex flex-wrap items-center gap-1">
          {(
            [
              { key: "saas", label: "SaaS & Tech", icon: Zap },
              { key: "studio", label: "Studio Créatif", icon: Sparkles },
              { key: "boutique", label: "Boutique & E-Com", icon: ShoppingBag },
              { key: "artisan", label: "Artisan & Service", icon: Layers },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTemplate === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTemplate(tab.key)}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-zinc-900 text-white shadow-xs"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
                }`}
              >
                <Icon className="size-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right controls: Color theme picker & Device toggle */}
        <div className="flex items-center gap-3">
          {/* Color swatches */}
          <div className="flex items-center gap-1.5 border-r border-zinc-200 pr-3">
            <span className="text-[11px] font-medium text-zinc-400 hidden sm:inline">
              Thème :
            </span>
            {COLOR_THEMES.map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => setActiveTheme(theme)}
                title={theme.name}
                className={`size-5 rounded-full transition-transform ${
                  activeTheme.id === theme.id
                    ? "scale-125 ring-2 ring-zinc-900 ring-offset-2"
                    : "hover:scale-110 opacity-80"
                }`}
                style={{ backgroundColor: theme.primary }}
              />
            ))}
          </div>

          {/* Device viewport toggle */}
          <div className="flex items-center rounded-lg border border-zinc-200 bg-zinc-50 p-0.5">
            <button
              type="button"
              onClick={() => setDevice("desktop")}
              title="Vue Desktop"
              className={`rounded-md p-1.5 transition ${
                device === "desktop"
                  ? "bg-white text-zinc-900 shadow-xs"
                  : "text-zinc-400 hover:text-zinc-700"
              }`}
            >
              <Laptop className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setDevice("mobile")}
              title="Vue Mobile"
              className={`rounded-md p-1.5 transition ${
                device === "mobile"
                  ? "bg-white text-zinc-900 shadow-xs"
                  : "text-zinc-400 hover:text-zinc-700"
              }`}
            >
              <Smartphone className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Browser Sandbox Frame */}
      <div
        className={`mx-auto mt-4 overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-2xl transition-all duration-300 ${
          device === "mobile"
            ? "max-w-[390px] rounded-[36px] border-[6px] border-zinc-900 my-4 ring-1 ring-zinc-800"
            : "w-full"
        }`}
      >
        {/* Browser Top Bar */}
        <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/90 px-4 py-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-red-400" />
            <span className="size-2.5 rounded-full bg-amber-400" />
            <span className="size-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-0.5 font-mono text-[11px] text-zinc-500 shadow-2xs">
            <Globe2 className="size-3 text-zinc-400" />
            <span>
              {activeTemplate === "saas"
                ? "novatech.batiste.app"
                : activeTemplate === "studio"
                ? "pulse-studio.batiste.app"
                : activeTemplate === "boutique"
                ? "maison-chloe.batiste.app"
                : "atelier-no17.batiste.app"}
            </span>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
            En ligne
          </span>
        </div>

        {/* Dynamic Sandbox Site Content */}
        <div
          className="p-6 sm:p-10 transition-colors duration-300 min-h-[380px]"
          style={{ backgroundColor: activeTheme.surface }}
        >
          {activeTemplate === "saas" && <SaasPreview activeTheme={activeTheme} />}
          {activeTemplate === "studio" && <StudioPreview activeTheme={activeTheme} />}
          {activeTemplate === "boutique" && <BoutiquePreview activeTheme={activeTheme} />}
          {activeTemplate === "artisan" && <ArtisanPreview activeTheme={activeTheme} />}
        </div>
      </div>
    </div>
  );
}
