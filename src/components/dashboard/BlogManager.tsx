"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { upsertPostAction } from "@/actions/catalog";
import { Button, EmptyState, PageHeader } from "@/components/ui";
import { useI18n } from "@/i18n/client";
import type { Locale } from "@/i18n/messages";
import BlogPostList from "./BlogPostList";
import BlogPostEditor, { type PostDraft } from "./BlogPostEditor";
import { useRouter } from "next/navigation";

export interface ManagedPost {
  id: string;
  title: string;
  slug: string;
  language: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  coverImage: string | null;
  status: string;
  publishedAt: Date | string | null;
}

export default function BlogManager({
  siteId,
  posts,
  languages,
  defaultLanguage,
}: {
  siteId: string;
  posts: ManagedPost[];
  languages: string[];
  defaultLanguage: string;
}) {
  const { locale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [draft, setDraft] = useState<PostDraft>({
    postId: undefined as string | undefined,
    title: "",
    excerpt: "",
    content: "",
    category: "",
    coverImage: "",
    language: defaultLanguage,
    status: "draft" as "draft" | "published",
  });
    const router = useRouter();

  const openCreate = () => {
    setDraft({
      postId: undefined,
      title: "",
      excerpt: "",
      content: "",
      category: "",
      coverImage: "",
      language: defaultLanguage,
      status: "draft",
    });
    setOpen(true);
  };

  const openEdit = (post: ManagedPost) => {
    setDraft({
      postId: post.id,
      title: post.title,
      excerpt: post.excerpt ?? "",
      content: post.content,
      category: post.category ?? "",
      coverImage: post.coverImage ?? "",
      language: post.language,
      status: post.status === "published" ? "published" : "draft",
    });
    setOpen(true);
  };

  const save = (status: "draft" | "published") =>
    startTransition(async () => {
      const result = await upsertPostAction({
        postId: draft.postId,
        siteId,
        title: draft.title.trim(),
        excerpt: draft.excerpt.trim() || undefined,
        content: draft.content,
        category: draft.category.trim() || undefined,
        coverImage: draft.coverImage.trim() || undefined,
        language: draft.language as Locale,
        status,
      });
      if (result.ok) {
        toast.success(draft.postId ? t.blog.postUpdated : t.blog.postCreated);
        setOpen(false);
        router.refresh();
      } else toast.error(t.common.genericError);
    });

  return (
    <div className="mx-auto w-full max-w-6xl animate-rise">
      <PageHeader
        title={t.blog.title}
        description={t.blog.subtitle}
        action={<Button onClick={openCreate}>+ {t.blog.newPost}</Button>}
      />

      {posts.length === 0 ? (
        <EmptyState
          icon="¶"
          title={t.blog.noPosts}
          action={<Button onClick={openCreate}>{t.blog.newPost}</Button>}
        />
      ) : (
        <BlogPostList posts={posts} locale={locale} t={t} onEdit={openEdit} />
      )}

      <BlogPostEditor
        open={open}
        draft={draft}
        languages={languages}
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
