"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  Globe2,
  Laptop,
  Layers,
  Palette,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";

type TemplateKey = "saas" | "studio" | "boutique" | "artisan";

interface ColorTheme {
  id: string;
  name: string;
  primary: string;
  surface: string;
  accent: string;
}

const COLOR_THEMES: ColorTheme[] = [
  {
    id: "obsidian",
    name: "Obsidian",
    primary: "#18181b",
    surface: "#f4f4f5",
    accent: "#6366f1",
  },
  {
    id: "indigo",
    name: "Indigo",
    primary: "#4f46e5",
    surface: "#eef2ff",
    accent: "#818cf8",
  },
  {
    id: "emerald",
    name: "Émeraude",
    primary: "#059669",
    surface: "#ecfdf5",
    accent: "#34d399",
  },
  {
    id: "coral",
    name: "Terre Cuite",
    primary: "#ea580c",
    surface: "#fff7ed",
    accent: "#fb923c",
  },
];

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
          {/* SAAS & TECH TEMPLATE */}
          {activeTemplate === "saas" && (
            <div className="space-y-6">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold text-white shadow-xs"
                  style={{ backgroundColor: activeTheme.primary }}
                >
                  <Sparkles className="size-3" />
                  SaaS V2.0 est disponible
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 leading-tight">
                  La plateforme analytique nouvelle génération
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Automatisez vos flux de travail et pilotez votre croissance avec des données temps réel.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-bold text-white shadow-md cursor-pointer hover:opacity-90"
                    style={{ backgroundColor: activeTheme.primary }}
                  >
                    Démarrer gratuitement
                    <ArrowRight className="size-3.5" />
                  </span>
                  <span className="inline-flex items-center rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-xs font-semibold text-zinc-800 shadow-xs">
                    Voir la démo
                  </span>
                </div>
              </div>

              {/* Bento cards preview */}
              <div className="grid gap-3 sm:grid-cols-3 pt-4">
                <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                    <span className="font-semibold">Temps de réponse</span>
                    <Zap className="size-3.5 text-emerald-500" />
                  </div>
                  <div className="text-2xl font-bold text-zinc-900">18ms</div>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Optimisé sur le réseau Edge mondial.
                  </p>
                </div>
                <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                    <span className="font-semibold">Score Lighthouse</span>
                    <BarChart3 className="size-3.5 text-blue-500" />
                  </div>
                  <div className="text-2xl font-bold text-zinc-900">100 / 100</div>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    SEO, accessibilité et performance max.
                  </p>
                </div>
                <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                    <span className="font-semibold">Conversion</span>
                    <Check className="size-3.5 text-indigo-500" />
                  </div>
                  <div className="text-2xl font-bold text-zinc-900">+42%</div>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Formulaires et tunnels optimisés.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STUDIO CRÉATIF */}
          {activeTemplate === "studio" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-zinc-200/80 pb-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Studio Design & Direction Artistique
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 mt-1">
                    Nous façonnons des marques inoubliables
                  </h2>
                </div>
                <span
                  className="rounded-xl px-4 py-2 text-xs font-bold text-white shadow-xs"
                  style={{ backgroundColor: activeTheme.primary }}
                >
                  Discuter d'un projet
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm space-y-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">
                    Branding & UI/UX
                  </span>
                  <h3 className="text-sm font-bold text-zinc-900">
                    Refonte d'identité pour la FinTech Kora
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Stratégie de marque complète, design system et landing page à forte conversion.
                  </p>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm space-y-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">
                    Campagne Digitale
                  </span>
                  <h3 className="text-sm font-bold text-zinc-900">
                    Lancement de collection pour Maison Noire
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Expérience immersive 3D, typographie de caractère et direction photo.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* BOUTIQUE & E-COMMERCE */}
          {activeTemplate === "boutique" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">
                    Nouveautés de la saison
                  </h2>
                  <p className="text-xs text-zinc-500">
                    Pièces confectionnées à la main en séries limitées.
                  </p>
                </div>
                <span className="text-xs font-bold text-zinc-900 underline">
                  Tout voir →
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { name: "Veste en Lin Sauvage", price: "185€", cat: "Prêt-à-porter" },
                  { name: "Sac Besace Cuir Noir", price: "240€", cat: "Maroquinerie" },
                  { name: "Écharpe Cachemire Pur", price: "110€", cat: "Accessoires" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-24 rounded-xl bg-zinc-100 mb-3 flex items-center justify-center text-zinc-300">
                        <ShoppingBag className="size-6" />
                      </div>
                      <span className="text-[10px] text-zinc-400 uppercase font-semibold">
                        {item.cat}
                      </span>
                      <h3 className="text-xs font-bold text-zinc-900 mt-0.5">
                        {item.name}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between pt-3 mt-2 border-t border-zinc-100">
                      <span className="font-bold text-sm text-zinc-900">
                        {item.price}
                      </span>
                      <button
                        type="button"
                        className="rounded-lg px-2.5 py-1 text-[11px] font-semibold text-white"
                        style={{ backgroundColor: activeTheme.primary }}
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ARTISAN & SERVICE */}
          {activeTemplate === "artisan" && (
            <div className="space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
                  Savoir-faire d'excellence depuis 2014
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
                  L'Atelier No17 — Créations sur-mesure
                </h2>
                <p className="text-xs text-zinc-600">
                  Restauration de meubles anciens et aménagement d'intérieurs personnalisés.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">
                    Prendre un rendez-vous à l'atelier
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Consultation de 45 minutes pour étudier votre projet et vos plans.
                  </p>
                </div>
                <span
                  className="rounded-xl px-5 py-2.5 text-xs font-bold text-white shadow-xs cursor-pointer"
                  style={{ backgroundColor: activeTheme.primary }}
                >
                  Choisir un créneau
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
