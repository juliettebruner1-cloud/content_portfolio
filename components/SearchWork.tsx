"use client";

import { track } from "@/lib/analytics";

export function SearchWork({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => value && track({ name: "search_used", query: value })}
        placeholder="Search the work — “beauty,” “viral,” “strategy”…"
        aria-label="Search portfolio"
        className="w-full border-b hairline bg-transparent py-3 text-sm text-ivory placeholder:text-taupe focus:outline-none"
      />
    </div>
  );
}
