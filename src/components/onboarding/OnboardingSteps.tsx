"use client";

import { Button, Field, Input } from "@/components/ui";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/i18n/messages";
import { DEFAULT_THEMES } from "@/lib/themes";
import ThemePicker from "./ThemePicker";
import { cn } from "@/lib/utils";

export function NameStep({
  name,
  setName,
  onContinue,
  help,
  placeholder,
}: {
  name: string;
  setName: (value: string) => void;
  onContinue: () => void;
  help: string;
  placeholder: string;
}) {
  const subdomain =
    name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") || "votre-site";
  return (
    <div className="space-y-5">
      <h2 className="text-base font-semibold tracking-tight">Nom du site</h2>
      <Field hint={help}>
        <Input
          autoFocus
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={placeholder}
          onKeyDown={(event) => {
            if (event.key === "Enter" && name.trim().length >= 2) onContinue();
          }}
        />
      </Field>
      <div className="rounded-xl bg-zinc-50 px-4 py-3 text-[13px] text-zinc-500">
        <span className="font-mono text-zinc-900">{subdomain}</span>.batiste.app
      </div>
    </div>
  );
}

export function ThemeStep({
  themeId,
  setThemeId,
  title,
  help,
}: {
  themeId: string;
  setThemeId: (id: string) => void;
  title: string;
  help: string;
}) {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-semibold tracking-tight">{title}</h2>
      <ThemePicker selected={themeId} onSelect={setThemeId} />
      <p className="text-xs text-zinc-500">{help}</p>
    </div>
  );
}

export function LanguageStep({
  language,
  setLanguage,
  title,
  help,
  name,
  themeId,
  themeLabel,
  languageLabel,
}: {
  language: Locale;
  setLanguage: (value: Locale) => void;
  title: string;
  help: string;
  name: string;
  themeId: string;
  themeLabel: string;
  languageLabel: string;
}) {
  return (
    <div className="space-y-5">
      <h2 className="text-base font-semibold tracking-tight">{title}</h2>
      <div className="grid gap-2 sm:grid-cols-2">
        {LOCALES.map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => setLanguage(code)}
            className={cn(
              "flex items-center justify-between rounded-xl border-2 px-4 py-3 text-sm transition",
              language === code
                ? "border-zinc-900 bg-zinc-50"
                : "border-zinc-200 hover:border-zinc-300",
            )}
          >
            <span className="font-medium">{LOCALE_LABELS[code]}</span>
            <span className="text-xs uppercase text-zinc-400">{code}</span>
          </button>
        ))}
      </div>
      <p className="text-xs text-zinc-500">{help}</p>
      <dl className="space-y-1.5 rounded-xl bg-zinc-50 px-4 py-3 text-[13px]">
        <div className="flex justify-between">
          <dt className="text-zinc-500">Nom du site</dt>
          <dd className="font-medium">{name}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-zinc-500">{themeLabel}</dt>
          <dd className="font-medium">
            {DEFAULT_THEMES.find((theme) => theme.id === themeId)?.name}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-zinc-500">{languageLabel}</dt>
          <dd className="font-medium">{LOCALE_LABELS[language]}</dd>
        </div>
      </dl>
    </div>
  );
}

export function WizardActions({
  step,
  pending,
  onBack,
  onNext,
  onSubmit,
  back,
  next,
  create,
  creating,
  canContinue,
}: {
  step: number;
  pending: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  back: string;
  next: string;
  create: string;
  creating: string;
  canContinue: boolean;
}) {
  return (
    <div className="mt-8 flex items-center justify-between gap-3">
      <Button variant="ghost" onClick={onBack} disabled={step === 1 || pending}>
        {back}
      </Button>
      {step < 4 ? (
        <Button onClick={onNext} disabled={!canContinue}>
          {next}
        </Button>
      ) : (
        <Button onClick={onSubmit} loading={pending}>
          {pending ? creating : create}
        </Button>
      )}
    </div>
  );
}
