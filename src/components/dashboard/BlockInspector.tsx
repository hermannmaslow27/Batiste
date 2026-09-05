"use client";

import { useState } from "react";
import {
  AlignCenter,
  AlignLeft,
  BadgeAlert,
  Layers,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import {
  Badge,
  Button,
  Field,
  IconButton,
  ImageUpload,
  Input,
  Select,
  Switch,
  Textarea,
} from "@/components/ui";
import { getBlockDef, type FieldDef } from "@/lib/blocks";
import type { Messages } from "@/i18n/messages";
import type { BuilderBlock } from "./PageBuilder";

const STYLE_FIELD_KEYS = [
  "alignment",
  "styleVariant",
  "overlay",
  "columns",
  "colSpan",
  "showRating",
  "ratingText",
  "billingPeriod",
];

export default function BlockInspector({
  block,
  siteId,
  t,
  onChange,
  onDelete,
}: {
  block: BuilderBlock;
  siteId: string;
  t: Messages;
  onChange: (content: Record<string, unknown>) => void;
  onDelete?: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"content" | "style">("content");

  const renderField = (
    field: FieldDef,
    value: unknown,
    update: (next: unknown) => void,
    prefix = "",
  ): React.ReactNode => {
    const label = t.fields[field.labelKey] ?? field.key;

    // Special alignment control: segmented button
    if (field.key === "alignment") {
      const currentVal = String(value ?? "center");
      return (
        <div key={prefix + field.key} className="space-y-1.5 py-1">
          <label className="block text-[12px] font-semibold text-zinc-700">
            {label}
          </label>
          <div className="inline-flex rounded-xl border border-zinc-200 bg-zinc-50 p-1 w-full">
            <button
              type="button"
              onClick={() => update("left")}
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
              onClick={() => update("center")}
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

    // Special styleVariant control
    if (field.key === "styleVariant") {
      return (
        <Field key={prefix + field.key} label={label}>
          <Select
            value={String(value ?? "default")}
            onChange={(e) => update(e.target.value)}
          >
            <option value="default">Défaut (clair épuré)</option>
            <option value="surface">Surface contrastée</option>
            <option value="dark">Sombre avec lueur (Dark Glow)</option>
            <option value="gradient">Dégradé subtil</option>
          </Select>
        </Field>
      );
    }

    if (field.type === "boolean") {
      return (
        <div
          key={prefix + field.key}
          className="flex items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50/60 px-3 py-2"
        >
          <span className="text-[13px] font-medium text-zinc-700">{label}</span>
          <Switch checked={Boolean(value)} onChange={update} label={label} />
        </div>
      );
    }

    if (field.type === "select") {
      return (
        <Field key={prefix + field.key} label={label}>
          <Select
            value={String(value ?? field.options?.[0] ?? "")}
            onChange={(event) => update(event.target.value)}
          >
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Field>
      );
    }

    if (field.type === "number") {
      return (
        <Field key={prefix + field.key} label={label}>
          <Input
            type="number"
            value={value == null ? "" : String(value)}
            onChange={(event) =>
              update(
                event.target.value === "" ? null : Number(event.target.value),
              )
            }
          />
        </Field>
      );
    }

    if (field.type === "textarea") {
      return (
        <Field key={prefix + field.key} label={label}>
          <Textarea
            rows={field.key === "featuresList" ? 5 : 3}
            value={String(value ?? "")}
            onChange={(event) => update(event.target.value)}
          />
        </Field>
      );
    }

    if (field.type === "url") {
      return (
        <Field key={prefix + field.key} label={label}>
          <ImageUpload
            siteId={siteId}
            value={String(value ?? "")}
            onChange={update}
          />
        </Field>
      );
    }

    if (field.type === "list") {
      const items = Array.isArray(value)
        ? (value as Record<string, unknown>[])
        : [];
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
                update([
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
                        update(next);
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
                        update(next);
                      }}
                    >
                      ↓
                    </IconButton>
                    <IconButton
                      label={t.common.delete}
                      onClick={() =>
                        update(items.filter((_, current) => current !== index))
                      }
                    >
                      ✕
                    </IconButton>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {(field.itemFields ?? []).map((sub) =>
                    renderField(
                      sub,
                      item[sub.key],
                      (next) =>
                        update(
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

    return (
      <Field key={prefix + field.key} label={label}>
        <Input
          value={String(value ?? "")}
          onChange={(event) => update(event.target.value)}
        />
      </Field>
    );
  };

  const allFields = getBlockDef(block.type)?.fields ?? [];
  const contentFields = allFields.filter((f) => !STYLE_FIELD_KEYS.includes(f.key));
  const styleFields = allFields.filter((f) => STYLE_FIELD_KEYS.includes(f.key));

  const fieldsToRender =
    styleFields.length > 0 && activeTab === "style" ? styleFields : contentFields;

  return (
    <div className="space-y-3.5">
      {/* Block title and badge */}
      <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            {t.pages.properties}
          </span>
          <h3 className="text-sm font-bold text-zinc-900">
            {t.blocks[block.type as keyof typeof t.blocks] ?? block.type}
          </h3>
        </div>
        <Badge>Actif</Badge>
      </div>

      {/* Tabs if style fields exist */}
      {styleFields.length > 0 && (
        <div className="flex rounded-xl border border-zinc-200/80 bg-zinc-100 p-1">
          <button
            type="button"
            onClick={() => setActiveTab("content")}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold transition ${
              activeTab === "content"
                ? "bg-white text-zinc-900 shadow-xs"
                : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            <Layers className="size-3.5" />
            Contenu ({contentFields.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("style")}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold transition ${
              activeTab === "style"
                ? "bg-white text-zinc-900 shadow-xs"
                : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            <SlidersHorizontal className="size-3.5" />
            Style & Options ({styleFields.length})
          </button>
        </div>
      )}

      {/* Scrollable fields container */}
      <div className="scroll-slim max-h-[60vh] space-y-3.5 overflow-y-auto pr-1">
        {fieldsToRender.map((field) =>
          renderField(field, block.content[field.key], (next) =>
            onChange({ ...block.content, [field.key]: next }),
          ),
        )}
      </div>

      {onDelete && (
        <div className="border-t border-zinc-100 pt-3">
          <button
            type="button"
            onClick={onDelete}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-red-200 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
          >
            <Trash2 className="size-3.5" />
            Supprimer ce bloc
          </button>
        </div>
      )}
    </div>
  );
}
