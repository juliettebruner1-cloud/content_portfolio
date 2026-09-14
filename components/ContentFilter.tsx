"use client";

import { motion } from "framer-motion";
import { cx } from "@/lib/utils";
import { track } from "@/lib/analytics";

export function ContentFilter({
  categories,
  active,
  onChange,
}: {
  categories: readonly string[];
  active: string;
  onChange: (category: string) => void;
}) {
  const all = ["All", ...categories];

  return (
    <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
      {all.map((category) => {
        const isActive = active === category;
        return (
          <button
            key={category}
            type="button"
            onClick={() => {
              onChange(category);
              track({ name: "portfolio_filter_used", category });
            }}
            className="label relative whitespace-nowrap px-3 py-2 text-taupe transition-colors hover:text-ivory"
            aria-pressed={isActive}
          >
            {isActive && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 border hairline bg-ivory"
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
            <span className={cx("relative z-10", isActive && "text-ink")}>{category}</span>
          </button>
        );
      })}
    </div>
  );
}
