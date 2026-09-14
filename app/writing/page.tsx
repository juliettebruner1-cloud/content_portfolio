import type { Metadata } from "next";
import { writing } from "@/data/writing";
import { WritingGrid } from "@/components/WritingGrid";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays, cultural commentary, and editorial work.",
};

export default function WritingPage() {
  return (
    <div className="mx-auto max-w-editorial px-5 py-16 sm:px-8 sm:py-24">
      <p className="label mb-3 text-taupe">Editorial</p>
      <h1 className="font-serif text-display-2 text-ivory">Writing</h1>
      <p className="mt-6 max-w-xl text-sm leading-relaxed text-stone">
        Essays and cultural commentary — the thinking behind the content, written down.
      </p>

      <div className="mt-14">
        <WritingGrid pieces={writing} />
      </div>
    </div>
  );
}
