"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createSiteAction } from "@/actions/sites";
import { useI18n } from "@/i18n/client";
import type { Locale } from "@/i18n/messages";

interface SubmitSitePayload {
  name: string;
  themeId: string;
  templateId?: string | null;
  language: Locale;
}

export function useOnboardingSubmit() {
  const { locale, t } = useI18n();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const submit = ({ name, themeId, templateId, language }: SubmitSitePayload) => {
    startTransition(async () => {
      const result = await createSiteAction({
        name: name.trim(),
        themeId,
        templateId: templateId ?? undefined,
        defaultLanguage: language,
      });

      if (!result.ok) {
        toast.error(
          result.error === "subdomain_taken"
            ? t.onboarding.subdomainTaken
            : t.common.genericError,
        );
        return;
      }

      toast.success(t.onboarding.siteCreated);
      router.push(`/${locale}/dashboard/${result.data.siteId}`);
      router.refresh();
    });
  };

  return { submit, pending };
}
