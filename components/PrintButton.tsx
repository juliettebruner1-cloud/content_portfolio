"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print label border hairline px-6 py-3 text-ivory hover:bg-ivory hover:text-ink"
    >
      Print / Save as PDF →
    </button>
  );
}
