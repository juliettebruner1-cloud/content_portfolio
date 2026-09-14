import { brands } from "@/data/brands";

export function BrandStrip() {
  if (brands.length === 0) return null;

  return (
    <section>
      <p className="label mb-6 text-center text-taupe">Selected Collaborations</p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-80 grayscale">
        {brands.map((brand) => (
          <span key={brand.id} className="text-sm tracking-wide text-stone">
            {brand.name}
          </span>
        ))}
      </div>
    </section>
  );
}
