import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { skills } from "@/data/skills";
import { socialLinks } from "@/data/social";
import { formatDate } from "@/lib/utils";
import { PrintButton } from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Professional résumé for ${profile.name}.`,
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="no-print mb-10 flex flex-wrap items-center justify-between gap-4">
        <p className="label text-taupe">Résumé</p>
        <div className="flex gap-3">
          <PrintButton />
          {profile.resumeAvailable ? (
            <a
              href="/resume.pdf"
              className="label border hairline px-6 py-3 text-ivory hover:bg-ivory hover:text-ink"
            >
              Download PDF →
            </a>
          ) : (
            <span className="label border hairline px-6 py-3 text-taupe">
              PDF coming soon — add /public/resume.pdf
            </span>
          )}
        </div>
      </div>

      <header className="border-b hairline pb-8">
        <h1 className="font-serif text-4xl text-ivory sm:text-5xl">{profile.name}</h1>
        <p className="label mt-2 text-taupe">{profile.location}</p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-stone">
          {socialLinks.map((link) => (
            <a key={link.platform} href={link.href} className="hover:text-ivory">
              {link.label}
            </a>
          ))}
        </div>
      </header>

      <section className="mt-10">
        <p className="text-sm leading-relaxed text-stone">{profile.shortBio}</p>
      </section>

      <section className="mt-12">
        <h2 className="label mb-6 text-taupe">Experience</h2>
        {experience.length === 0 ? (
          <p className="label text-taupe">
            Add roles in <code className="text-stone">data/experience.ts</code> to populate this
            section.
          </p>
        ) : (
          <div className="space-y-8">
            {experience.map((role) => (
              <div key={role.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-serif text-xl text-ivory">
                    {role.role} <span className="text-stone">— {role.company}</span>
                  </h3>
                  <span className="label text-taupe">
                    {formatDate(role.startDate)} – {role.endDate ? formatDate(role.endDate) : "Present"}
                  </span>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-stone">
                  {[...role.owned, ...role.impact].map((item, i) => (
                    <li key={i}>— {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-12">
        <h2 className="label mb-6 text-taupe">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill.id} className="label border hairline px-3 py-2 text-taupe">
              {skill.name}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
