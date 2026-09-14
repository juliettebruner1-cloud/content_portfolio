import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { writing, getWritingBySlug } from "@/data/writing";
import { formatFullDate } from "@/lib/utils";

export function generateStaticParams() {
  return writing.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const piece = getWritingBySlug(slug);
  if (!piece) return {};
  return {
    title: piece.title,
    description: piece.excerpt,
    openGraph: { title: piece.title, description: piece.excerpt, type: "article" },
  };
}

export default async function WritingPiecePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const piece = getWritingBySlug(slug);
  if (!piece) notFound();

  return (
    <article className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
      <Link href="/writing" className="label text-taupe hover:text-ivory">
        ← All Writing
      </Link>

      <p className="label mt-8 text-taupe">
        {piece.publication} &middot; {formatFullDate(piece.date)} &middot; {piece.category}
        {piece.isPlaceholder && " · Sample"}
      </p>
      <h1 className="mt-3 font-serif text-display-2 text-ivory">{piece.title}</h1>
      <p className="mt-6 font-serif text-xl italic text-stone">{piece.excerpt}</p>

      {piece.body && (
        <div className="prose-editorial mt-12 space-y-6">
          {piece.body.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-stone">
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {piece.url && (
        <a
          href={piece.url}
          target="_blank"
          rel="noreferrer noopener"
          className="label mt-12 inline-block border hairline px-5 py-3 text-taupe hover:text-ivory"
        >
          Read on {piece.publication} →
        </a>
      )}
    </article>
  );
}
