"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useI18n } from "@/i18n/client";
import {
  Badge, Button, Card, CardBody, CardHeader, EmptyState,
  Field, Input, Modal, PageHeader, Textarea,
} from "@/components/ui";
import {
  createTestimonialAction, deleteTestimonialAction,
  moderateTestimonialAction, updateTestimonialAction,
} from "@/actions/testimonials";
import type { Testimonial } from "@/db/schema";
import { formatDate } from "@/lib/utils";

type Filter = "all" | "pending" | "approved" | "rejected";

const STATUS_TONE: Record<string, "warning" | "success" | "danger"> = {
  pending: "warning", approved: "success", rejected: "danger",
};

function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} type="button" onClick={() => onChange?.(star)}
          className={`text-lg leading-none transition ${star <= value ? "text-amber-400" : "text-zinc-200"} ${onChange ? "hover:text-amber-300" : "cursor-default"}`}>
          ★
        </button>
      ))}
    </div>
  );
}

interface FormState { authorName: string; role: string; quote: string; rating: number }
const EMPTY_FORM: FormState = { authorName: "", role: "", quote: "", rating: 5 };

export default function TestimonialsManager({
  siteId, initial,
}: { siteId: string; initial: Testimonial[] }) {
  const { t, locale } = useI18n();
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [filter, setFilter] = useState<Filter>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [pending, startTransition] = useTransition();

  // ✅ FIX: resynchronise avec les props à chaque nouveau fetch serveur
  useEffect(() => {
    setItems(initial);
  }, [initial]);

  const filtered = filter === "all" ? items : items.filter((i) => i.status === filter);

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }

  function openEdit(item: Testimonial) {
    setEditing(item);
    setForm({
      authorName: item.authorName,
      role: item.role ?? "",
      quote: item.quote,
      rating: item.rating,
    });
    setModalOpen(true);
  }

  function save() {
    startTransition(async () => {
      if (editing) {
        const result = await updateTestimonialAction(editing.id, siteId, {
          authorName: form.authorName,
          role: form.role || undefined,
          quote: form.quote,
          rating: form.rating,
        });
        if (!result.ok) {
          toast.error(t.common.genericError);
          return;
        }
        setItems((prev) =>
          prev.map((i) => (i.id === editing.id ? { ...i, ...form, role: form.role || null } : i)),
        );
        toast.success(t.testimonials.updated);
      } else {
        const result = await createTestimonialAction({ siteId, ...form, role: form.role || undefined });
        if (!result.ok) {
          toast.error(t.common.genericError);
          return;
        }
        setItems((prev) => [
          {
            id: result.data!.id, siteId, ...form, role: form.role || null,
            status: "approved", source: "dashboard",
            createdAt: new Date(), updatedAt: new Date(),
          },
          ...prev,
        ]);
        toast.success(t.testimonials.created);
      }
      setModalOpen(false);
      router.refresh(); // ✅
    });
  }

  function moderate(id: string, status: "approved" | "rejected") {
    startTransition(async () => {
      const result = await moderateTestimonialAction(id, siteId, status);
      if (!result.ok) {
        toast.error(t.common.genericError);
        return;
      }
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
      toast.success(t.testimonials.moderated);
      router.refresh(); // ✅
    });
  }

  function remove(id: string) {
    startTransition(async () => {
      const result = await deleteTestimonialAction(id, siteId);
      if (!result.ok) {
        toast.error(t.common.genericError);
        return;
      }
      setItems((prev) => prev.filter((i) => i.id !== id));
      toast.success(t.testimonials.deleted);
      router.refresh(); // ✅
    });
  }

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t.testimonials.filterAll },
    { key: "pending", label: t.testimonials.statusPending },
    { key: "approved", label: t.testimonials.statusApproved },
    { key: "rejected", label: t.testimonials.statusRejected },
  ];

  return (
    <div>
      <PageHeader
        title={t.testimonials.title}
        description={t.testimonials.subtitle}
        action={<Button onClick={openCreate}>{t.testimonials.newTestimonial}</Button>}
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map(({ key, label }) => (
          <button key={key} onClick={() => setFilter(key)}
            className={`rounded-xl border-2 px-3 py-1.5 text-[12.5px] font-medium transition ${filter === key ? "border-zinc-900 bg-zinc-50" : "border-zinc-200 text-zinc-500 hover:border-zinc-300"}`}>
            {label}
            {key !== "all" && (
              <span className="ml-1.5 text-zinc-400">
                {items.filter((i) => i.status === key).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title={t.testimonials.noTestimonials} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((item) => (
            <Card key={item.id}>
              <CardHeader
                title={item.authorName}
                description={item.role ?? undefined}
                action={
                  <Badge tone={STATUS_TONE[item.status] ?? "neutral"}>
                    {
                      t.testimonials[
                        `status${item.status.charAt(0).toUpperCase()}${item.status.slice(1)}` as keyof typeof t.testimonials
                      ] as string
                    }
                  </Badge>
                }
              />
              <CardBody className="space-y-3">
                <StarRating value={item.rating} />
                <p className="text-[13.5px] leading-relaxed text-zinc-700">"{item.quote}"</p>
                <p className="text-[11.5px] text-zinc-400">
                  {formatDate(item.createdAt, `${locale}-FR`)}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.status === "pending" && (
                    <>
                      <Button size="sm" onClick={() => moderate(item.id, "approved")} disabled={pending}>
                        {t.testimonials.approve}
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => moderate(item.id, "rejected")} disabled={pending}>
                        {t.testimonials.reject}
                      </Button>
                    </>
                  )}
                  {item.status === "approved" && (
                    <Button size="sm" variant="secondary" onClick={() => moderate(item.id, "rejected")} disabled={pending}>
                      {t.testimonials.reject}
                    </Button>
                  )}
                  {item.status === "rejected" && (
                    <Button size="sm" variant="secondary" onClick={() => moderate(item.id, "approved")} disabled={pending}>
                      {t.testimonials.approve}
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" onClick={() => openEdit(item)}>
                    {t.common.edit}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => remove(item.id)} disabled={pending}>
                    {t.common.delete}
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? t.testimonials.editTestimonial : t.testimonials.newTestimonial}
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>{t.common.cancel}</Button>
            <Button loading={pending} onClick={save}>{pending ? t.common.saving : t.common.save}</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label={t.testimonials.authorName} required>
            <Input value={form.authorName} onChange={(e) => setForm({ ...form, authorName: e.target.value })} />
          </Field>
          <Field label={t.testimonials.role}>
            <Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          </Field>
          <Field label={t.testimonials.quote} required>
            <Textarea rows={3} value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} />
          </Field>
          <Field label={t.testimonials.rating}>
            <StarRating value={form.rating} onChange={(v) => setForm({ ...form, rating: v })} />
          </Field>
        </div>
      </Modal>
    </div>
  );
}