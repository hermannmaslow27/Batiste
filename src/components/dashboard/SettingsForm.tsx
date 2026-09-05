"use client";
import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteSiteAction, updateSiteSettingsAction } from "@/actions/sites";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Field,
  Input,
  Modal,
  PageHeader,
  Switch,
  Textarea,
} from "@/components/ui";
import { useI18n } from "@/i18n/client";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/i18n/messages";
import { DEFAULT_THEMES } from "@/lib/themes";
import { cn, FEATURES } from "@/lib/utils";
export interface SettingsSite {
  id: string;
  name: string;
  subdomain: string;
  themeId: string;
  defaultLanguage: string;
  supportedLanguages: string[];
  seoTitle: string | null;
  seoDescription: string | null;
  status: string;
}
export default function SettingsForm({
  site,
  features,
  canDelete,
}: {
  site: SettingsSite;
  features: Record<string, boolean>;
  canDelete: boolean;
}) {
  const { locale, t } = useI18n();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [confirmName, setConfirmName] = useState("");
  const [form, setForm] = useState({
    name: site.name,
    themeId: site.themeId,
    defaultLanguage: site.defaultLanguage as Locale,
    supportedLanguages: site.supportedLanguages as Locale[],
    seoTitle: site.seoTitle ?? "",
    seoDescription: site.seoDescription ?? "",
    status: site.status as "draft" | "published",
  });
  const [flags, setFlags] = useState<Record<string, boolean>>(features);

  useEffect(() => {
  setForm({
    name: site.name,
    themeId: site.themeId,
    defaultLanguage: site.defaultLanguage as Locale,
    supportedLanguages: site.supportedLanguages as Locale[],
    seoTitle: site.seoTitle ?? "",
    seoDescription: site.seoDescription ?? "",
    status: site.status as "draft" | "published",
  });
  setFlags(features);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [site, features]);

  const save = () =>
    startTransition(async () => {
      const result = await updateSiteSettingsAction({
        siteId: site.id,
        name: form.name.trim(),
        themeId: form.themeId,
        defaultLanguage: form.defaultLanguage,
        supportedLanguages: form.supportedLanguages,
        seoTitle: form.seoTitle || null,
        seoDescription: form.seoDescription || null,
        status: form.status,
        features: flags,
      });
      if (result.ok) {
        toast.success(t.common.savedToast);
        router.refresh();
      } else {
        toast.error(t.common.genericError);
      }
    });
  const featureLabels: Record<string, { name: string; desc: string }> = {
    blog: { name: t.features.blog, desc: t.features.blogDesc },
    catalog: { name: t.features.catalog, desc: t.features.catalogDesc },
    quote: { name: t.features.quote, desc: t.features.quoteDesc },
    booking: { name: t.features.booking, desc: t.features.bookingDesc },
  };
  return (
    <div className="max-w-3xl">
      <PageHeader
        title={t.settings.title}
        description={t.settings.subtitle}
        action={
          <Button loading={pending} onClick={save}>
            {" "}
            {pending ? t.common.saving : t.common.save}
          </Button>
        }
      />
      <div className="space-y-5">
        {" "}
        <Card>
          {" "}
          <CardHeader title={t.settings.general} />
          <CardBody className="space-y-4">
            {" "}
            <Field label={t.settings.siteName} required>
              {" "}
              <Input
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
              />
            </Field>{" "}
            <Field label={t.settings.subdomain} hint={t.settings.subdomainHelp}>
              {" "}
              <div className="flex items-center gap-2 rounded-xl bg-zinc-50 px-3.5 py-2.5 text-sm">
                <span className="font-mono text-zinc-900">
                  {site.subdomain}
                </span>{" "}
                <span className="text-zinc-400">.batiste.app</span>{" "}
                <a
                  href={`/s/${site.subdomain}`}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto text-[13px] font-medium text-zinc-900 underline underline-offset-4"
                >
                  {" "}
                  {t.common.visit} â†—
                </a>{" "}
              </div>{" "}
            </Field>
          </CardBody>{" "}
        </Card>{" "}
        <Card>
          <CardHeader title={t.settings.theme} />{" "}
          <CardBody>
            {" "}
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {DEFAULT_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setForm({ ...form, themeId: theme.id })}
                  className={cn(
                    "relative overflow-hidden rounded-xl border-2 text-left transition-all",
                    form.themeId === theme.id
                      ? "border-zinc-900 shadow-md ring-2 ring-zinc-900/10"
                      : "border-zinc-200 hover:border-zinc-300",
                  )}
                >
                  {" "}
                  <div
                    className="relative flex h-14 items-end gap-1 p-2"
                    style={{ backgroundColor: theme.colors.background }}
                  >
                    <div className="absolute top-1.5 left-2 right-2 h-1.5 rounded-full opacity-50" style={{ backgroundColor: theme.colors.surface }} />
                    <div className="absolute top-4 left-2 h-1 w-1/2 rounded-full opacity-40" style={{ backgroundColor: theme.colors.text }} />
                    {theme.swatch.map((color) => (
                      <span
                        key={color}
                        className="size-3.5 rounded-full ring-1 ring-black/5"
                        style={{ backgroundColor: color }}
                      />
                    ))}{" "}
                    {form.themeId === theme.id && (
                      <div className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-zinc-900 text-[9px] text-white">
                        ✓
                      </div>
                    )}
                  </div>{" "}
                  <p className="px-2.5 py-1.5 text-[11.5px] font-semibold text-zinc-900 truncate">
                    {theme.name}
                  </p>
                </button>
              ))}{" "}
            </div>
          </CardBody>{" "}
        </Card>{" "}
        <Card>
          <CardHeader title={t.settings.languages} />{" "}
          <CardBody className="space-y-4">
            {" "}
            <Field label={t.settings.supportedLanguages}>
              <div className="flex flex-wrap gap-2">
                {" "}
                {LOCALES.map((code) => {
                  const active = form.supportedLanguages.includes(code);
                  const isDefault = form.defaultLanguage === code;
                  return (
                    <button
                      key={code}
                      onClick={() => {
                        if (isDefault) return;
                        setForm({
                          ...form,
                          supportedLanguages: active
                            ? form.supportedLanguages.filter(
                                (value) => value !== code,
                              )
                            : [...form.supportedLanguages, code],
                        });
                      }}
                      className={cn(
                        "rounded-xl border-2 px-4 py-2 text-[13px] font-medium transition",
                        active
                          ? "border-zinc-900 bg-zinc-50"
                          : "border-zinc-200 text-zinc-500",
                        isDefault && "cursor-default opacity-70",
                      )}
                    >
                      {" "}
                      {LOCALE_LABELS[code]}{" "}
                      {isDefault && (
                        <span className="ml-1.5 text-[11px]">â˜…</span>
                      )}
                    </button>
                  );
                })}
              </div>{" "}
            </Field>{" "}
            <Field label={t.settings.defaultLanguage}>
              <div className="flex gap-2">
                {" "}
                {form.supportedLanguages.map((code) => (
                  <button
                    key={code}
                    onClick={() => setForm({ ...form, defaultLanguage: code })}
                    className={cn(
                      "rounded-xl border-2 px-4 py-2 text-[13px] font-medium transition",
                      form.defaultLanguage === code
                        ? "border-zinc-900 bg-zinc-50"
                        : "border-zinc-200 text-zinc-500",
                    )}
                  >
                    {LOCALE_LABELS[code]}{" "}
                  </button>
                ))}
              </div>{" "}
            </Field>{" "}
          </CardBody>
        </Card>{" "}
        <Card>
          {" "}
          <CardHeader
            title={t.settings.modules}
            description={t.settings.modulesHelp}
          />
          <CardBody className="divide-y divide-zinc-100">
            {" "}
            {FEATURES.map((feature) => (
              <div
                key={feature}
                className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
              >
                <div>
                  {" "}
                  <p className="text-[13.5px] font-medium text-zinc-900">
                    {" "}
                    {featureLabels[feature].name}
                  </p>{" "}
                  <p className="text-[12.5px] text-zinc-500">
                    {featureLabels[feature].desc}
                  </p>{" "}
                </div>
                <Switch
                  checked={Boolean(flags[feature])}
                  onChange={(value) => setFlags({ ...flags, [feature]: value })}
                  label={featureLabels[feature].name}
                />{" "}
              </div>
            ))}{" "}
          </CardBody>{" "}
        </Card>
        <Card>
          {" "}
          <CardHeader title={t.settings.seo} />{" "}
          <CardBody className="space-y-4">
            <Field label={t.settings.seoTitle}>
              {" "}
              <Input
                value={form.seoTitle}
                onChange={(event) =>
                  setForm({ ...form, seoTitle: event.target.value })
                }
              />{" "}
            </Field>
            <Field label={t.settings.seoDescription}>
              {" "}
              <Textarea
                rows={3}
                value={form.seoDescription}
                onChange={(event) =>
                  setForm({ ...form, seoDescription: event.target.value })
                }
              />
            </Field>{" "}
          </CardBody>{" "}
        </Card>
        <Card>
          {" "}
          <CardHeader
            title={t.settings.visibility}
            description={t.settings.visibilityHelp}
          />{" "}
          <CardBody>
            <div className="flex gap-2">
              {" "}
              {(["draft", "published"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setForm({ ...form, status })}
                  className={cn(
                    "rounded-xl border-2 px-4 py-2 text-[13px] font-medium transition",
                    form.status === status
                      ? status === "published"
                        ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                        : "border-zinc-900 bg-zinc-50"
                      : "border-zinc-200 text-zinc-500",
                  )}
                >
                  {" "}
                  {status === "draft" ? t.common.draft : t.common.published}
                </button>
              ))}{" "}
            </div>
          </CardBody>{" "}
        </Card>{" "}
        {canDelete && (
          <Card className="border-red-200">
            {" "}
            <CardHeader
              title={t.settings.dangerZone}
              description={t.settings.deleteSiteHelp}
            />{" "}
            <CardBody>
              <Button variant="danger" onClick={() => setDeleteOpen(true)}>
                {" "}
                {t.settings.deleteSite}{" "}
              </Button>
            </CardBody>{" "}
          </Card>
        )}
      </div>{" "}
      <Modal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title={t.settings.deleteSite}
        description={t.settings.deleteSiteHelp}
        footer={
          <>
            {" "}
            <Button variant="ghost" onClick={() => setDeleteOpen(false)}>
              {t.common.cancel}{" "}
            </Button>{" "}
            <Button
              variant="danger"
              disabled={confirmName !== site.name}
              loading={pending}
              onClick={() =>
                startTransition(async () => {
                  const result = await deleteSiteAction(site.id);
                  if (result.ok) {
                    toast.success(t.settings.siteDeleted);
                    router.push(`/${locale}/dashboard`);
                  } else toast.error(t.common.genericError);
                })
              }
            >
              {" "}
              {t.common.delete}{" "}
            </Button>
          </>
        }
      >
        <Field label={t.settings.deleteConfirm}>
          {" "}
          <Input
            value={confirmName}
            onChange={(event) => setConfirmName(event.target.value)}
            placeholder={site.name}
          />
        </Field>{" "}
      </Modal>{" "}
    </div>
  );
}
