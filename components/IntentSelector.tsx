"use client";

import { motion } from "framer-motion";
import { VISITOR_INTENTS } from "@/types";
import { useIntent } from "@/context/IntentContext";

export function IntentSelector() {
  const { intent, setIntent } = useIntent();

  return (
    <section className="border-y hairline">
      <div className="mx-auto max-w-editorial px-5 py-20 sm:px-8 sm:py-28">
        <p className="label mb-3 text-taupe">The signature question</p>
        <h2 className="font-serif text-display-2 text-ivory text-balance">
          What are you here for?
        </h2>

        <div className="mt-12 grid gap-px overflow-hidden border hairline sm:grid-cols-2 lg:grid-cols-3">
          {VISITOR_INTENTS.map((option, i) => {
            const isActive = intent === option.value;
            return (
              <motion.button
                key={option.value}
                type="button"
                data-cursor="nav"
                onClick={() => setIntent(option.value)}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className={`group relative flex flex-col justify-between gap-6 border-b border-r hairline bg-ink p-6 text-left transition-colors hover:bg-charcoal sm:p-8 ${
                  isActive ? "bg-charcoal" : ""
                }`}
              >
                <span className="label text-taupe">0{i + 1}</span>
                <div>
                  <p className="font-serif text-xl text-ivory sm:text-2xl">{option.label}</p>
                  <p className="mt-2 text-sm text-taupe">{option.description}</p>
                </div>
                <span
                  className={`label transition-transform group-hover:translate-x-1 ${
                    isActive ? "text-ivory" : "text-taupe"
                  }`}
                >
                  {isActive ? "Curating your view →" : "Select →"}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
