import { Button, IconButton } from "@/components/ui";
import type { FieldDef } from "@/lib/blocks";
import type { Messages } from "@/i18n/messages";

export default function ListFieldManager({
  field,
  items,
  label,
  prefix,
  t,
  onUpdate,
  renderSubField,
}: {
  field: FieldDef;
  items: Record<string, unknown>[];
  label: string;
  prefix: string;
  t: Messages;
  onUpdate: (items: Record<string, unknown>[]) => void;
  renderSubField: (
    subField: FieldDef,
    value: unknown,
    update: (next: unknown) => void,
    prefix: string,
  ) => React.ReactNode;
}) {
  return (
    <div key={prefix + field.key} className="space-y-2 pt-1">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-1.5">
        <span className="text-[13px] font-semibold text-zinc-800">
          {label} ({items.length})
        </span>
        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            onUpdate([
              ...items,
              Object.fromEntries(
                (field.itemFields ?? []).map((item) => [item.key, ""]),
              ),
            ])
          }
        >
          + {t.pages.addItem}
        </Button>
      </div>
      <div className="space-y-2.5">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-zinc-200/90 bg-zinc-50/80 p-3.5 transition hover:border-zinc-300"
          >
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                {t.pages.item} {index + 1}
              </span>
              <div className="flex items-center gap-1">
                <IconButton
                  label={t.pages.moveUp}
                  disabled={index === 0}
                  onClick={() => {
                    const next = [...items];
                    [next[index - 1], next[index]] = [
                      next[index],
                      next[index - 1],
                    ];
                    onUpdate(next);
                  }}
                >
                  ↑
                </IconButton>
                <IconButton
                  label={t.pages.moveDown}
                  disabled={index === items.length - 1}
                  onClick={() => {
                    const next = [...items];
                    [next[index + 1], next[index]] = [
                      next[index],
                      next[index + 1],
                    ];
                    onUpdate(next);
                  }}
                >
                  ↓
                </IconButton>
                <IconButton
                  label={t.common.delete}
                  onClick={() =>
                    onUpdate(items.filter((_, current) => current !== index))
                  }
                >
                  ✕
                </IconButton>
              </div>
            </div>
            <div className="space-y-2.5">
              {(field.itemFields ?? []).map((sub) =>
                renderSubField(
                  sub,
                  item[sub.key],
                  (next) =>
                    onUpdate(
                      items.map((current, currentIndex) =>
                        currentIndex === index
                          ? { ...current, [sub.key]: next }
                          : current,
                      ),
                    ),
                  `${prefix}${field.key}-${index}-`,
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
