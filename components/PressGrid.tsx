import { press } from "@/data/press";
import { formatDate } from "@/lib/utils";

export function PressGrid() {
  if (press.length === 0) return null;

  return (
    <section className="border-y hairline py-16">
      <p className="label mb-10 text-taupe">Press &amp; Features</p>
      <div className="grid gap-6 sm:grid-cols-2">
        {press.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target={item.url ? "_blank" : undefined}
            rel="noreferrer noopener"
            className="block border hairline p-5 hover:border-ivory"
          >
            <p className="label text-taupe">
              {item.type} &middot; {formatDate(item.date)}
            </p>
            <p className="mt-2 font-serif text-lg text-ivory">{item.title}</p>
            <p className="text-sm text-stone">{item.outlet}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
