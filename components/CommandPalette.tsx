"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useIntent } from "@/context/IntentContext";

interface Command {
  label: string;
  action: () => void;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { setIntent } = useIntent();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const commands: Command[] = [
    { label: "View Brand Portfolio", action: () => { setIntent("brand"); router.push("/work"); } },
    { label: "View Recruiter Portfolio", action: () => { setIntent("recruiter"); router.push("/work"); } },
    { label: "View Creator Portfolio", action: () => { setIntent("creator"); router.push("/work"); } },
    { label: "View Strategy Portfolio", action: () => { setIntent("strategy"); router.push("/work"); } },
    { label: "Read Editorial / Writing", action: () => { setIntent("editorial"); router.push("/writing"); } },
    { label: "View Résumé", action: () => router.push("/resume") },
    { label: "Contact", action: () => router.push("/contact") },
    { label: "Change View", action: () => router.push("/") },
  ];

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/80 pt-24 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg border hairline bg-ink"
          >
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command…"
              aria-label="Command search"
              className="w-full border-b hairline bg-transparent px-5 py-4 text-ivory placeholder:text-taupe focus:outline-none"
            />
            <ul className="max-h-80 overflow-y-auto py-2">
              {filtered.map((c) => (
                <li key={c.label}>
                  <button
                    type="button"
                    onClick={() => {
                      c.action();
                      setOpen(false);
                      setQuery("");
                    }}
                    className="label block w-full px-5 py-3 text-left text-taupe hover:bg-charcoal hover:text-ivory"
                  >
                    {c.label}
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="px-5 py-3 text-sm text-taupe">No matching command.</li>
              )}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
