import { Input } from "@/components/ui";

interface ColorSwatchProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

export default function ColorSwatch({ label, value, onChange }: ColorSwatchProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[13px] text-zinc-600 font-medium min-w-0 flex-1 truncate">
        {label}
      </span>
      <div className="flex items-center gap-2 shrink-0">
        <div
          className="size-7 rounded-lg border border-zinc-200 shadow-xs cursor-pointer overflow-hidden relative"
          style={{ backgroundColor: value }}
        >
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
        </div>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-24 px-2 font-mono text-[12px]"
          maxLength={9}
        />
      </div>
    </div>
  );
}
