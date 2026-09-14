"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { mainNav } from "@/data/navigation";
import { useIntent } from "@/context/IntentContext";
import { VISITOR_INTENTS } from "@/types";
import { cx } from "@/lib/utils";

const VIEW_AS_OPTIONS = VISITOR_INTENTS.filter((i) =>
  ["brand", "recruiter", "creator"].includes(i.value)
);

export function Navigation() {
  const pathname = usePathname();
  const { intent, setIntent } = useIntent();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [viewAsOpen, setViewAsOpen] = useState(false);

  return (
    <header className="no-print fixed top-0 left-0 right-0 z-50 border-b hairline bg-black/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-editorial items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/"
          data-cursor="nav"
          className="font-serif text-sm tracking-widest2 uppercase text-ivory"
        >
          Juliette Bruner
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-cursor="nav"
              className={cx(
                "label transition-colors hover:text-ivory",
                pathname === item.href ? "text-ivory" : "text-taupe"
              )}
            >
              {item.label}
            </Link>
          ))}

          <div className="relative">
            <button
              type="button"
              data-cursor="nav"
              onClick={() => setViewAsOpen((v) => !v)}
              className="label flex items-center gap-2 border hairline px-3 py-2 text-taupe hover:text-ivory"
              aria-haspopup="listbox"
              aria-expanded={viewAsOpen}
            >
              View As {intent ? `— ${intent}` : ""}
            </button>
            <AnimatePresence>
              {viewAsOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  role="listbox"
                  className="absolute right-0 mt-2 w-56 border hairline bg-ink py-2"
                >
                  {VIEW_AS_OPTIONS.map((opt) => (
                    <li key={opt.value}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={intent === opt.value}
                        onClick={() => {
                          setIntent(opt.value);
                          setViewAsOpen(false);
                        }}
                        className="label block w-full px-4 py-2 text-left text-taupe hover:bg-charcoal hover:text-ivory"
                      >
                        {opt.label}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        <button
          type="button"
          className="label border hairline px-3 py-2 text-ivory md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t hairline md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="label py-3 text-taupe hover:text-ivory"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 border-t hairline pt-3">
                <span className="label text-taupe">View As</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {VIEW_AS_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setIntent(opt.value);
                        setMobileOpen(false);
                      }}
                      className={cx(
                        "label border hairline px-3 py-2",
                        intent === opt.value ? "bg-ivory text-ink" : "text-taupe"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
