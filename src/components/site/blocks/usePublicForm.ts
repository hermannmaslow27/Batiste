import { useState, useTransition, type FormEvent } from "react";
import { toast } from "sonner";
import { submitPublicFormAction } from "@/actions/catalog";
import { getMessages } from "@/i18n/messages";
import type { BlockViewContext } from "./types";

interface UsePublicFormOptions {
  formType: "contact" | "quote" | "booking";
  successMessage: string;
  ctx: BlockViewContext;
}

export function usePublicForm({ formType, successMessage, ctx }: UsePublicFormOptions) {
  const t = getMessages(ctx.locale);
  const [pending, startTransition] = useTransition();
  const [done, setDone] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const payload: Record<string, string> = {};

    formData.forEach((value, key) => {
      payload[key] = String(value).slice(0, 5000);
    });

    if (ctx.preview) {
      toast.info(t.common.preview);
      return;
    }

    startTransition(async () => {
      const result = await submitPublicFormAction({
        siteId: ctx.siteId,
        formType,
        pageId: ctx.pageId,
        data: payload,
      });

      if (result.ok) {
        setDone(true);
        toast.success(successMessage || t.publicSite.messageSent);
        formEl.reset();
      } else {
        toast.error(
          result.error === "rate_limited"
            ? t.validation.rateLimited
            : t.common.genericError,
        );
      }
    });
  };

  return {
    pending,
    done,
    handleSubmit,
    t,
  };
}
