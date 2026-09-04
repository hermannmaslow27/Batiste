"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { upsertProductAction } from "@/actions/catalog";
import { Button, EmptyState, PageHeader } from "@/components/ui";
import { useI18n } from "@/i18n/client";
import ProductEditor, { type ProductDraft } from "./ProductEditor";
import ProductTable from "./ProductTable";
import { useRouter } from "next/navigation";

export interface ManagedProduct {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  currency: string | null;
  category: string | null;
  images: unknown;
  customAttributes: unknown;
  status: string;
}

const emptyDraft: ProductDraft = {
  productId: undefined as string | undefined,
  name: "",
  description: "",
  price: "",
  category: "",
  imageUrl: "",
  attributes: [] as { key: string; value: string }[],
  status: "draft" as "draft" | "published",
};

export default function CatalogManager({
  siteId,
  products,
}: {
  siteId: string;
  products: ManagedProduct[];
}) {
  const { locale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<ProductDraft>(emptyDraft);
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const openCreate = () => {
    setDraft(emptyDraft);
    setOpen(true);
  };

  const openEdit = (product: ManagedProduct) => {
    const attributes = Object.entries(
      (product.customAttributes as Record<string, string>) ?? {},
    ).map(([key, value]) => ({ key, value: String(value) }));
    setDraft({
      productId: product.id,
      name: product.name,
      description: product.description ?? "",
      price: product.price !== null ? String(product.price / 100) : "",
      category: product.category ?? "",
      imageUrl: Array.isArray(product.images)
        ? String(product.images[0] ?? "")
        : "",
      attributes,
      status: product.status === "published" ? "published" : "draft",
    });
    setOpen(true);
  };

  const save = () =>
    startTransition(async () => {
      const result = await upsertProductAction({
        productId: draft.productId,
        siteId,
        name: draft.name.trim(),
        description: draft.description.trim() || undefined,
        price: draft.price ? Math.round(Number(draft.price) * 100) : null,
        currency: "EUR",
        category: draft.category.trim() || undefined,
        imageUrl: draft.imageUrl.trim() || undefined,
        customAttributes: Object.fromEntries(
          draft.attributes
            .filter((entry) => entry.key.trim())
            .map((entry) => [entry.key.trim(), entry.value]),
        ),
        status: draft.status,
      });

      if (result.ok) {
        toast.success(
          draft.productId ? t.catalog.productUpdated : t.catalog.productCreated,
        );
        setOpen(false);
        router.refresh();
      } else {
        toast.error(t.common.genericError);
      }
    });

  return (
    <div>
      <PageHeader
        title={t.catalog.title}
        description={t.catalog.subtitle}
        action={<Button onClick={openCreate}>+ {t.catalog.newProduct}</Button>}
      />

      {products.length === 0 ? (
        <EmptyState
          icon="▩"
          title={t.catalog.noProducts}
          action={<Button onClick={openCreate}>{t.catalog.newProduct}</Button>}
        />
      ) : (
        <ProductTable
          products={products}
          locale={locale}
          t={t}
          onEdit={openEdit}
        />
      )}

      <ProductEditor
        open={open}
        draft={draft}
        pending={pending}
        siteId={siteId}
        t={t}
        onClose={() => setOpen(false)}
        onChange={setDraft}
        onSave={save}
      />
    </div>
  );
}
