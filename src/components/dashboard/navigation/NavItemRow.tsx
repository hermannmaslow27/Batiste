import { ArrowDown, ArrowUp, ExternalLink, Trash2 } from "lucide-react";
import { IconButton, Input } from "@/components/ui";
import type { NavItemConfig } from "@/actions/navigation";

interface NavItemRowProps {
  item: NavItemConfig;
  index: number;
  total: number;
  onUpdate: (id: string, updates: Partial<NavItemConfig>) => void;
  onRemove: (id: string) => void;
  onMove: (index: number, direction: "up" | "down") => void;
}

export default function NavItemRow({
  item,
  index,
  total,
  onUpdate,
  onRemove,
  onMove,
}: NavItemRowProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-zinc-200 bg-white p-3 shadow-xs">
      <div className="flex items-center gap-1">
        <IconButton
          label="Monter"
          disabled={index === 0}
          onClick={() => onMove(index, "up")}
          className="size-7"
        >
          <ArrowUp className="size-3.5" />
        </IconButton>
        <IconButton
          label="Descendre"
          disabled={index === total - 1}
          onClick={() => onMove(index, "down")}
          className="size-7"
        >
          <ArrowDown className="size-3.5" />
        </IconButton>
      </div>

      <div className="flex-1 min-w-[140px]">
        <Input
          placeholder="Titre du lien (ex: Accueil)"
          value={item.label}
          onChange={(e) => onUpdate(item.id, { label: e.target.value })}
          className="h-8 text-xs font-medium"
        />
      </div>

      <div className="flex-1 min-w-[160px]">
        <Input
          placeholder="URL ou /slug ou #ancre"
          value={item.url}
          onChange={(e) => onUpdate(item.id, { url: e.target.value })}
          className="h-8 text-xs font-mono"
        />
      </div>

      <button
        type="button"
        title="Lien externe"
        onClick={() => onUpdate(item.id, { isExternal: !item.isExternal })}
        className={`flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium transition ${
          item.isExternal
            ? "bg-zinc-900 text-white"
            : "border border-zinc-200 text-zinc-500 hover:bg-zinc-100"
        }`}
      >
        <ExternalLink className="size-3" />
        {item.isExternal ? "Externe" : "Interne"}
      </button>

      <IconButton
        label="Supprimer"
        onClick={() => onRemove(item.id)}
        className="size-7 text-rose-500 hover:bg-rose-50"
      >
        <Trash2 className="size-3.5" />
      </IconButton>
    </div>
  );
}
