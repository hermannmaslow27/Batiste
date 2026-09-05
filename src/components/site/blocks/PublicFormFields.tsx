"use client";

import { usePublicForm } from "./usePublicForm";
import type { BlockViewContext } from "./types";

interface FormFieldItem {
  label: string;
  type: string;
  options?: string;
  required?: boolean;
}

interface PublicFormFieldsProps {
  fields: FormFieldItem[];
  submitText: string;
  successMessage: string;
  formType: "contact" | "quote" | "booking";
  ctx: BlockViewContext;
}

export default function PublicFormFields({
  fields,
  submitText,
  successMessage,
  formType,
  ctx,
}: PublicFormFieldsProps) {
  const { pending, done, handleSubmit, t } = usePublicForm({
    formType,
    successMessage,
    ctx,
  });

  if (done) {
    return (
      <div className="site-card px-5 py-6 text-center text-sm">
        {successMessage || t.publicSite.messageSent}
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {fields.map((field, index) => {
        const name = field.label || `field-${index + 1}`;
        return (
          <div key={`${name}-${index}`} className="space-y-1.5">
            <label className="block text-[13px] font-medium">
              {field.label}{" "}
              {field.required && <span className="ml-0.5 opacity-60">*</span>}
            </label>
            {field.type === "textarea" ? (
              <textarea
                name={name}
                required={field.required}
                rows={4}
                className="site-input w-full px-3.5 py-2.5 text-sm"
              />
            ) : field.type === "select" ? (
              <select
                name={name}
                required={field.required}
                className="site-input w-full px-3.5 py-2.5 text-sm"
              >
                {String(field.options ?? "")
                  .split("|")
                  .filter(Boolean)
                  .map((option) => (
                    <option key={option}>{option.trim()}</option>
                  ))}
              </select>
            ) : (
              <input
                name={name}
                type={field.type || "text"}
                required={field.required}
                className="site-input w-full px-3.5 py-2.5 text-sm"
              />
            )}
          </div>
        );
      })}
      <button
        type="submit"
        disabled={pending}
        className="site-button w-full px-5 py-3 text-sm font-medium transition hover:opacity-90 disabled:opacity-60"
      >
        {pending ? t.publicSite.sending : submitText || t.publicSite.send}
      </button>
    </form>
  );
}
