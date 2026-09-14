"use client";

import { useState } from "react";
import { useIntent } from "@/context/IntentContext";
import { track } from "@/lib/analytics";

type InquiryType = "brand" | "recruiter" | "creative" | "editorial" | "general";

const INQUIRY_OPTIONS: { value: InquiryType; label: string }[] = [
  { value: "brand", label: "Brand Partnership" },
  { value: "recruiter", label: "Marketing Opportunity" },
  { value: "creative", label: "Creative Project" },
  { value: "editorial", label: "Editorial" },
  { value: "general", label: "General" },
];

function defaultInquiryFor(intent: string | null): InquiryType {
  if (intent === "brand") return "brand";
  if (intent === "recruiter") return "recruiter";
  if (intent === "editorial") return "editorial";
  if (intent === "creator" || intent === "strategy") return "creative";
  return "general";
}

export function ContactPanel() {
  const { intent } = useIntent();
  const [inquiry, setInquiry] = useState<InquiryType>(defaultInquiryFor(intent));
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = { inquiry, ...Object.fromEntries(formData.entries()) };
    track({ name: "contact_form_submitted", intent: inquiry });
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // form still confirms — the stub handler logs server-side; a real
      // provider should surface failures here once one is connected.
    }
    setStatus("sent");
  };

  if (status === "sent") {
    return (
      <div className="border hairline p-10 text-center">
        <p className="font-serif text-2xl text-ivory">Received.</p>
        <p className="mt-2 text-sm text-stone">
          Thank you — this is a demo submission handler. Wire{" "}
          <code className="text-taupe">app/api/contact/route.ts</code> to your email or CRM of
          choice to receive these for real.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <fieldset>
        <legend className="label mb-3 text-taupe">I&rsquo;m reaching out about</legend>
        <div className="flex flex-wrap gap-2">
          {INQUIRY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setInquiry(opt.value)}
              aria-pressed={inquiry === opt.value}
              className={`label border hairline px-4 py-2 ${
                inquiry === opt.value ? "bg-ivory text-ink" : "text-taupe hover:text-ivory"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      {inquiry === "brand" && (
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Company" name="company" required />
          <Field label="Campaign" name="campaign" />
          <Field label="Deliverables" name="deliverables" placeholder="e.g. 2 TikToks, 1 Reel" />
          <Field label="Timeline" name="timeline" />
          <Field label="Budget Range" name="budget" />
          <Field label="Your Email" name="email" type="email" required />
        </div>
      )}

      {inquiry === "recruiter" && (
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Company" name="company" required />
          <Field label="Role" name="role" required />
          <Field label="Job Posting URL" name="jobUrl" type="url" />
          <Field label="Your Email" name="email" type="email" required />
        </div>
      )}

      {(inquiry === "creative" || inquiry === "editorial" || inquiry === "general") && (
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Name" name="name" required />
          <Field label="Email" name="email" type="email" required />
        </div>
      )}

      <TextArea
        label="Message"
        name="message"
        placeholder={
          inquiry === "brand"
            ? "Tell me about the campaign and what you're hoping this content does."
            : inquiry === "recruiter"
            ? "Tell me about the role and the team."
            : "Tell me what you have in mind."
        }
      />

      <button
        type="submit"
        className="label border hairline bg-ivory px-8 py-4 text-ink hover:bg-stone"
      >
        Send →
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="label mb-2 block text-taupe">
        {label}
        {required && " *"}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full border-b hairline bg-transparent py-2 text-ivory placeholder:text-taupe focus:outline-none"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="label mb-2 block text-taupe">{label}</span>
      <textarea
        name={name}
        rows={5}
        placeholder={placeholder}
        className="w-full border-b hairline bg-transparent py-2 text-ivory placeholder:text-taupe focus:outline-none"
      />
    </label>
  );
}
