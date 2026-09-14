"use client";

import { useRouter } from "next/navigation";
import { Industry } from "@/types";
import { useIntent } from "@/context/IntentContext";
import { track } from "@/lib/analytics";

const INDUSTRIES: Industry[] = [
  "Fashion",
  "Beauty",
  "Wellness",
  "Lifestyle",
  "Hospitality",
  "NYC / Events",
];

export function BrandFitExplorer() {
  const router = useRouter();
  const { setIndustry, setIntent } = useIntent();

  const select = (industry: Industry) => {
    setIndustry(industry);
    setIntent("brand");
    track({ name: "brand_fit_selected", industry });
    router.push(`/work?industry=${encodeURIComponent(industry)}`);
  };

  return (
    <section className="border hairline p-6 sm:p-10">
      <p className="label mb-2 text-taupe">Brand-Fit Explorer</p>
      <h2 className="font-serif text-2xl text-ivory sm:text-3xl">What are you building?</h2>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {INDUSTRIES.map((industry) => (
          <button
            key={industry}
            type="button"
            onClick={() => select(industry)}
            className="label border hairline px-4 py-6 text-center text-taupe transition-colors hover:bg-ivory hover:text-ink"
          >
            {industry}
          </button>
        ))}
      </div>
    </section>
  );
}
