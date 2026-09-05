"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui";
import { useI18n } from "@/i18n/client";
import { type Locale } from "@/i18n/messages";
import { SITE_TEMPLATES } from "@/lib/templates";
import { NameStep, ThemeStep, LanguageStep } from "./OnboardingSteps";
import TemplatePicker from "./TemplatePicker";
import WizardProgress from "./WizardProgress";
import { useOnboardingSubmit } from "./useOnboardingSubmit";
import { cn } from "@/lib/utils";

const STEPS = 4;
const STEP_LABELS = ["Nom", "Template", "Thème", "Langue"];

export default function OnboardingWizard() {
  const { locale, t } = useI18n();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [themeId, setThemeId] = useState("minimal");
  const [language, setLanguage] = useState<Locale>(locale);
  const { submit, pending } = useOnboardingSubmit();

  const containerRef = useRef<HTMLDivElement>(null);
  const stepContentRef = useRef<HTMLDivElement>(null);

  const handleTemplateSelect = (id: string | null) => {
    setTemplateId(id);
    if (id) {
      const tpl = SITE_TEMPLATES.find((item) => item.id === id);
      if (tpl?.themeId) setThemeId(tpl.themeId);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline({ delay: 0.1 });
    gsap.set(containerRef.current, { opacity: 0, y: 30 });
    tl.to(containerRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    if (!stepContentRef.current) return;
    gsap.fromTo(
      stepContentRef.current,
      { opacity: 0, x: 16 },
      { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" },
    );
  }, [step]);

  const canContinue = step === 1 ? name.trim().length >= 2 : true;
  const selectedTemplate = templateId
    ? SITE_TEMPLATES.find((item) => item.id === templateId)
    : null;

  return (
    <div className="mx-auto w-full max-w-2xl py-4 sm:py-8">
      <div ref={containerRef}>
        <p className="text-[13px] font-medium text-zinc-400">
          Étape {step} sur {STEPS}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
          {t.onboarding.title}
        </h1>
        <p className="mt-1.5 text-sm text-zinc-500">{t.onboarding.subtitle}</p>

        <WizardProgress step={step} totalSteps={STEPS} labels={STEP_LABELS} />

        <div
          ref={stepContentRef}
          className={cn(
            "mt-6 rounded-2xl border border-zinc-200/80 bg-white shadow-[0_12px_40px_-28px_rgba(24,24,27,0.4)]",
            step === 2 ? "p-5 sm:p-6" : "p-6 sm:p-7",
          )}
        >
          {step === 1 && (
            <NameStep
              name={name}
              setName={setName}
              onContinue={() => setStep(2)}
              help={t.onboarding.stepNameHelp}
              placeholder={t.onboarding.namePlaceholder}
            />
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-base font-semibold tracking-tight">Choisissez un template</h2>
                <p className="mt-1 text-xs text-zinc-500">
                  Chaque template est pré-rempli avec des textes et blocs adaptés à votre secteur.
                </p>
              </div>
              <div className="max-h-[420px] overflow-y-auto pr-1 -mr-1">
                <TemplatePicker selected={templateId} onSelect={handleTemplateSelect} />
              </div>
            </div>
          )}

          {step === 3 && (
            <ThemeStep
              themeId={themeId}
              setThemeId={setThemeId}
              title={t.onboarding.stepTheme}
              help={t.onboarding.stepThemeHelp}
            />
          )}

          {step === 4 && (
            <div className="space-y-5">
              <LanguageStep
                language={language}
                setLanguage={setLanguage}
                title={t.onboarding.stepLanguage}
                help={t.onboarding.stepLanguageHelp}
                name={name}
                themeId={themeId}
                themeLabel={t.settings.theme}
                languageLabel={t.settings.defaultLanguage}
              />
              {selectedTemplate && (
                <div className="rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-[13px] flex items-center gap-3">
                  <img
                    src={selectedTemplate.previewImage}
                    alt={selectedTemplate.name}
                    className="size-10 rounded-lg object-cover shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-zinc-900">{selectedTemplate.name}</p>
                    <p className="text-zinc-500 text-[11.5px]">{selectedTemplate.tagline}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              onClick={() => setStep((v) => Math.max(1, v - 1))}
              disabled={step === 1 || pending}
            >
              {t.common.back}
            </Button>
            {step < STEPS ? (
              <Button onClick={() => setStep((v) => v + 1)} disabled={!canContinue}>
                {t.common.next}
              </Button>
            ) : (
              <Button
                onClick={() => submit({ name, themeId, templateId, language })}
                loading={pending}
              >
                {pending ? t.onboarding.creating : t.onboarding.createSite}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
