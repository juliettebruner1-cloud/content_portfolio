import { WhyItWorked as WhyItWorkedType } from "@/types";

const ROWS: { key: keyof WhyItWorkedType; label: string; question: string }[] = [
  { key: "hook", label: "The Hook", question: "What stopped the scroll?" },
  { key: "insight", label: "The Insight", question: "What audience behavior informed it?" },
  { key: "creative", label: "The Creative", question: "What decisions shaped it?" },
  { key: "distribution", label: "The Distribution", question: "How was it positioned for the platform?" },
  { key: "takeaway", label: "The Takeaway", question: "What can a brand learn from this?" },
];

export function WhyItWorked({ data }: { data: WhyItWorkedType }) {
  return (
    <div className="border hairline">
      <div className="border-b hairline px-5 py-4">
        <p className="label text-ivory">Why It Worked</p>
      </div>
      <dl>
        {ROWS.map((row, i) => (
          <div
            key={row.key}
            className={i !== ROWS.length - 1 ? "border-b hairline" : ""}
          >
            <div className="grid gap-1 px-5 py-5 sm:grid-cols-[160px_1fr] sm:gap-6">
              <dt>
                <span className="label block text-taupe">{row.label}</span>
                <span className="mt-1 block text-xs italic text-taupe">{row.question}</span>
              </dt>
              <dd className="text-sm leading-relaxed text-stone">{data[row.key]}</dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}
