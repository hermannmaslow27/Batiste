import { AlignCenter, AlignLeft } from "lucide-react";

export default function AlignmentControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: unknown;
  onChange: (val: "left" | "center") => void;
}) {
  const currentVal = String(value ?? "center");

  return (
    <div className="space-y-1.5 py-1">
      <label className="block text-[12px] font-semibold text-zinc-700">
        {label}
      </label>
      <div className="inline-flex rounded-xl border border-zinc-200 bg-zinc-50 p-1 w-full">
        <button
          type="button"
          onClick={() => onChange("left")}
          className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold transition ${
            currentVal === "left"
              ? "bg-white text-zinc-900 shadow-xs"
              : "text-zinc-500 hover:text-zinc-900"
          }`}
        >
          <AlignLeft className="size-3.5" />
          Gauche
        </button>
        <button
          type="button"
          onClick={() => onChange("center")}
          className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold transition ${
            currentVal === "center"
              ? "bg-white text-zinc-900 shadow-xs"
              : "text-zinc-500 hover:text-zinc-900"
          }`}
        >
          <AlignCenter className="size-3.5" />
          Centré
        </button>
      </div>
    </div>
  );
}
