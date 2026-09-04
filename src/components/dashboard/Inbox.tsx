"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateSubmissionStatusAction } from "@/actions/catalog";
import { Badge, Button, Card, EmptyState, PageHeader } from "@/components/ui";
import { useI18n } from "@/i18n/client";
import { cn, formatDateTime } from "@/lib/utils";
import { useRouter } from "next/navigation";

export interface InboxItem {
  id: string;
  formType: string;
  status: string;
  data: unknown;
  createdAt: Date | string;
}

const FILTERS = ["all", "new", "read", "archived"] as const;

export default function Inbox({ submissions }: { submissions: InboxItem[] }) {
  const { locale, t } = useI18n();
  const router = useRouter();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const [pending, startTransition] = useTransition();

  const labels: Record<string, string> = {
    all: t.inbox.filterAll,
    new: t.inbox.statusNew,
    read: t.inbox.statusRead,
    archived: t.inbox.statusArchived,
  };

  const visible = submissions.filter(
    (item) => filter === "all" || item.status === filter,
  );

   const update = (id: string, status: "new" | "read" | "archived") =>
    startTransition(async () => {
      const result = await updateSubmissionStatusAction(id, status);
      if (result.ok) {
        toast.success(t.inbox.statusUpdated);
        router.refresh(); // ✅
      } else toast.error(t.common.genericError);
    });

  return (
    <div>
      <PageHeader title={t.inbox.title} description={t.inbox.subtitle} />

      <div className="mb-4 inline-flex rounded-xl border border-zinc-200 bg-white p-0.5">
        {FILTERS.map((value) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-[13px] font-medium transition",
              filter === value
                ? "bg-zinc-900 text-white"
                : "text-zinc-500 hover:text-zinc-900",
            )}
          >
            {labels[value]}
            {value !== "all" && (
              <span className="ml-1.5 text-[11px] opacity-60">
                {submissions.filter((item) => item.status === value).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <EmptyState icon="✉" title={t.inbox.noMessages} />
      ) : (
        <div className="space-y-2.5">
          {visible.map((item) => {
            const payload = (item.data as Record<string, string>) ?? {};
            return (
              <Card key={item.id} className="px-5 py-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={item.formType === "quote" ? "info" : "neutral"}>
                    {item.formType}
                  </Badge>
                  <Badge
                    tone={
                      item.status === "new"
                        ? "warning"
                        : item.status === "read"
                          ? "success"
                          : "neutral"
                    }
                  >
                    {item.status === "new"
                      ? t.inbox.statusNew
                      : item.status === "read"
                        ? t.inbox.statusRead
                        : t.inbox.statusArchived}
                  </Badge>
                  <span className="text-[12px] text-zinc-400">
                    {t.inbox.receivedOn}{" "}
                    {formatDateTime(item.createdAt, `${locale}-FR`)}
                  </span>

                  <div className="ml-auto flex gap-2">
                    {item.status === "new" && (
                      <Button
                        size="sm"
                        variant="outline"
                        loading={pending}
                        onClick={() => update(item.id, "read")}
                      >
                        {t.inbox.markRead}
                      </Button>
                    )}
                    {item.status !== "archived" ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        loading={pending}
                        onClick={() => update(item.id, "archived")}
                      >
                        {t.inbox.archive}
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        loading={pending}
                        onClick={() => update(item.id, "read")}
                      >
                        {t.inbox.restore}
                      </Button>
                    )}
                  </div>
                </div>

                <dl className="mt-3 grid gap-x-6 gap-y-1.5 rounded-xl bg-zinc-50 px-4 py-3 text-[13px] sm:grid-cols-2">
                  {Object.entries(payload).map(([key, value]) => (
                    <div key={key} className="flex gap-2">
                      <dt className="shrink-0 font-medium text-zinc-500">
                        {key}
                      </dt>
                      <dd className="min-w-0 wrap-break-word text-zinc-900">
                        {String(value)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
