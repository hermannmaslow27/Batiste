import { getMessages } from "@/i18n/messages";
import { type BlockProps, str, list } from "./types";
import { Section, Heading } from "./wrappers";
import PublicFormFields from "./PublicFormFields";

export default function FormBlock({ content, ctx, type }: BlockProps & { type: string }) {
  const t = getMessages(ctx.locale);
  const isBooking = type === "booking_form";

  const fields =
    type === "form"
      ? (list(content.fields) as unknown as {
          label: string;
          type: string;
          options?: string;
          required?: boolean;
        }[])
      : isBooking
        ? [
            { label: "Nom", type: "text", required: true },
            { label: "Email", type: "email", required: true },
            { label: "Date", type: "text", required: true },
            { label: "Message", type: "textarea", required: false },
          ]
        : [
            { label: "Nom", type: "text", required: true },
            { label: "Email", type: "email", required: true },
            { label: "Message", type: "textarea", required: true },
          ];

  return (
    <Section surface>
      <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-2">
        <div data-anim="left">
          <Heading>{str(content.title, t.publicSite.send)}</Heading>
          {str(content.description) && (
            <p className="site-muted mt-3 text-[15px] leading-relaxed">
              {str(content.description)}
            </p>
          )}
          <ul className="mt-6 space-y-2 text-[14px]">
            {str(content.email) && <li>✉ {str(content.email)}</li>}
            {str(content.phone) && <li>☎ {str(content.phone)}</li>}
            {str(content.address) && <li>⌖ {str(content.address)}</li>}
            {isBooking && Number(content.duration) > 0 && (
              <li>◷ {String(content.duration)} min</li>
            )}
          </ul>
        </div>
        <PublicFormFields
          fields={fields}
          submitText={str(content.submitText, isBooking ? t.publicSite.bookNow : t.publicSite.send)}
          successMessage={str(content.successMessage, t.publicSite.messageSent)}
          formType={type === "form" ? "quote" : isBooking ? "booking" : "contact"}
          ctx={ctx}
        />
      </div>
    </Section>
  );
}
