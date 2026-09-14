import Link from "next/link";
import { WritingPiece } from "@/types";
import { formatDate } from "@/lib/utils";

export function WritingGrid({ pieces }: { pieces: WritingPiece[] }) {
  if (pieces.length === 0) {
    return (
      <p className="label border-y hairline py-10 text-taupe">
        Writing — development placeholder. Add published pieces in{" "}
        <code className="text-stone">data/writing.ts</code>.
      </p>
    );
  }

  return (
    <div className="divide-y hairline border-y hairline">
      {pieces.map((piece) => (
        <Link
          key={piece.id}
          href={`/writing/${piece.slug}`}
          data-cursor="view"
          className="group flex flex-col gap-2 py-8 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
        >
          <div className="sm:max-w-2xl">
            <p className="label text-taupe">
              {piece.publication} &middot; {formatDate(piece.date)} &middot; {piece.category}
              {piece.isPlaceholder && " · Sample"}
            </p>
            <h3 className="mt-2 font-serif text-2xl text-ivory group-hover:italic">
              {piece.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-stone">{piece.excerpt}</p>
          </div>
          <span className="label whitespace-nowrap text-taupe group-hover:text-ivory">
            Read →
          </span>
        </Link>
      ))}
    </div>
  );
}
