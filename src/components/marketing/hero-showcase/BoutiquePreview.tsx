import { ShoppingBag } from "lucide-react";
import type { ColorTheme } from "./showcaseData";

export default function BoutiquePreview({ activeTheme }: { activeTheme: ColorTheme }) {
  const items = [
    { name: "Veste en Lin Sauvage", price: "185€", cat: "Prêt-à-porter" },
    { name: "Sac Besace Cuir Noir", price: "240€", cat: "Maroquinerie" },
    { name: "Écharpe Cachemire Pur", price: "110€", cat: "Accessoires" },
  ];

  return (
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
        {items.map((item, i) => (
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
  );
}
