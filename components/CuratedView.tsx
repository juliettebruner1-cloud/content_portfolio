"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { VISITOR_INTENTS, VisitorIntent, Industry } from "@/types";
import { useIntent } from "@/context/IntentContext";
import { track } from "@/lib/analytics";

const INDUSTRIES: Industry[] = ["Fashion", "Beauty", "Wellness", "Lifestyle", "Hospitality", "NYC / Events"];

const WHO_OPTIONS = VISITOR_INTENTS.filter((i) => i.value !== "explore");

export function CuratedView() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [who, setWho] = useState<VisitorIntent | null>(null);
  const [industry, setIndustryChoice] = useState<Industry | "none" | null>(null);
  const router = useRouter();
  const { setIntent, setIndustry } = useIntent();

  const finish = () => {
    if (!who) return;
    setIntent(who);
    const finalIndustry = industry && industry !== "none" ? industry : null;
    setIndustry(finalIndustry);
    track({
      name: "curated_view_generated",
      audience: who,
      industry: finalIndustry ?? undefined,
    });
    const params = new URLSearchParams({ view: who });
    if (finalIndustry) params.set("industry", finalIndustry);
    setOpen(false);
    setStep(0);
    router.push(`/work?${params.toString()}`);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="label border hairline px-6 py-4 text-ivory transition-colors hover:bg-ivory hover:text-ink"
      >
        Curate My View →
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Curate my view"
            className="fixed inset-0 z-[85] flex items-center justify-center bg-black/90 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl border hairline bg-ink p-8"
            >
              {step === 0 && (
                <fieldset>
                  <legend className="label mb-6 text-taupe">Step 1 — Who are you?</legend>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {WHO_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setWho(opt.value);
                          setStep(1);
                        }}
                        className="label border hairline px-4 py-4 text-left text-taupe hover:bg-charcoal hover:text-ivory"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              {step === 1 && (
                <fieldset>
                  <legend className="label mb-6 text-taupe">Step 2 — Which industry matters?</legend>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {[...INDUSTRIES, "none" as const].map((ind) => (
                      <button
                        key={ind}
                        type="button"
                        onClick={() => {
                          setIndustryChoice(ind);
                          setStep(2);
                        }}
                        className="label border hairline px-4 py-4 text-left text-taupe hover:bg-charcoal hover:text-ivory"
                      >
                        {ind === "none" ? "No preference" : ind}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="label mt-6 text-taupe hover:text-ivory"
                  >
                    ← Back
                  </button>
                </fieldset>
              )}

              {step === 2 && (
                <div>
                  <p className="label mb-4 text-taupe">Ready</p>
                  <p className="font-serif text-2xl text-ivory">
                    Curating for {WHO_OPTIONS.find((o) => o.value === who)?.label}
                    {industry && industry !== "none" ? ` / ${industry}` : ""}.
                  </p>
                  <div className="mt-8 flex gap-3">
                    <button
                      type="button"
                      onClick={finish}
                      className="label border hairline bg-ivory px-6 py-3 text-ink"
                    >
                      View My Curated Portfolio →
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="label border hairline px-6 py-3 text-taupe hover:text-ivory"
                    >
                      ← Back
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
