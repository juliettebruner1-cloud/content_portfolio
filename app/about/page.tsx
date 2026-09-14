import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/data/profile";
import { currently } from "@/data/currently";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { SkillEvidence } from "@/components/SkillEvidence";
import { PressGrid } from "@/components/PressGrid";
import { EditorialDivider } from "@/components/EditorialDivider";

export const metadata: Metadata = {
  title: "About",
  description: profile.shortBio,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-editorial px-5 py-16 sm:px-8 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div className="aspect-[4/5] border hairline bg-charcoal">
          <div className="flex h-full w-full flex-col justify-between p-6">
            <span className="label text-taupe">Editorial Portrait — add photo</span>
            <span className="text-taupe">✦</span>
          </div>
        </div>

        <div>
          <p className="label mb-4 text-taupe">About</p>
          <h1 className="font-serif text-editorial text-ivory text-balance">
            {profile.shortBio}
          </h1>

          <div className="mt-10 space-y-4">
            {profile.longBio.map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-stone">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {profile.intersections.map((item) => (
              <span key={item} className="label border hairline px-3 py-2 text-taupe">
                {item}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/resume"
              className="label border hairline px-6 py-3 text-ivory hover:bg-ivory hover:text-ink"
            >
              View Résumé →
            </Link>
            <Link href="/contact" className="label border hairline px-6 py-3 text-taupe hover:text-ivory">
              Get In Touch →
            </Link>
          </div>

          {currently.length > 0 && (
            <div className="mt-14 border-t hairline pt-8">
              <p className="label mb-4 text-taupe">Currently</p>
              <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {currently.map((item) => (
                  <div key={item.label}>
                    <dt className="label text-taupe">{item.label}</dt>
                    <dd className="mt-1 text-sm text-stone">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>

      <section className="mt-24">
        <EditorialDivider label="Experience" />
        <ExperienceTimeline />
      </section>

      <section className="mt-24">
        <EditorialDivider label="Skills, Shown Not Told" />
        <SkillEvidence />
      </section>

      <div className="mt-24">
        <PressGrid />
      </div>
    </div>
  );
}
