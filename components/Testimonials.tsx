import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="border-y hairline py-16">
      <p className="label mb-10 text-taupe">What People Say</p>
      <div className="grid gap-10 sm:grid-cols-2">
        {testimonials.map((t) => (
          <figure key={t.id}>
            <blockquote className="font-serif text-xl italic leading-snug text-ivory text-balance">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="label mt-4 text-taupe">
              {t.author} — {t.title}
              {t.company ? `, ${t.company}` : ""}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
