import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { caseStudies, getCaseStudyBySlug } from "@/data/caseStudies";
import { getProjectBySlug, projects } from "@/data/content";
import { WhyItWorked } from "@/components/WhyItWorked";
import { EditorialDivider } from "@/components/EditorialDivider";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { resolveCampaignSlug } from "@/lib/campaignLinks";
import { rankProjects } from "@/lib/scoring";

export function generateStaticParams() {
  const slugs = new Set<string>();
  caseStudies.forEach((c) => slugs.add(c.slug));
  projects.forEach((p) => slugs.add(p.slug));
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  const project = getProjectBySlug(slug);
  const campaign = resolveCampaignSlug(slug);
  if (campaign) {
    const label = campaign.type === "industry" ? campaign.industry : campaign.intent;
    return { title: `Work — ${label}`, description: `Selected work curated for ${label}.` };
  }
  const title = caseStudy?.title ?? project?.title ?? "Case Study";
  const description = caseStudy?.subtitle ?? project?.description ?? "";
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Clean campaign links (/work/beauty, /work/nyc, /work/social-strategy) pull
  // straight from the shared portfolio database — no duplicated content.
  const campaign = resolveCampaignSlug(slug);
  if (campaign) {
    const options =
      campaign.type === "industry"
        ? { intent: "brand" as const, industry: campaign.industry }
        : { intent: campaign.intent };
    const ranked = rankProjects(projects, options);
    const label = campaign.type === "industry" ? campaign.industry : campaign.intent;
    return (
      <div className="mx-auto max-w-editorial px-5 py-16 sm:px-8 sm:py-24">
        <Link href="/work" className="label text-taupe hover:text-ivory">
          ← All Work
        </Link>
        <p className="label mt-8 text-taupe">Curated Link</p>
        <h1 className="font-serif text-display-2 text-ivory">{label}</h1>
        <div className="mt-10">
          <PortfolioGrid projects={ranked} />
        </div>
      </div>
    );
  }

  const caseStudy = getCaseStudyBySlug(slug);
  const project = getProjectBySlug(caseStudy?.projectId ?? slug) ?? getProjectBySlug(slug);

  if (!project) notFound();

  if (!caseStudy) {
    // Graceful fallback — a project without a full case study still gets a
    // clean detail page instead of a broken link.
    return (
      <div className="mx-auto max-w-editorial px-5 py-24 sm:px-8">
        <Link href="/work" className="label text-taupe hover:text-ivory">
          ← All Work
        </Link>
        <p className="label mt-8 text-taupe">{project.platform}</p>
        <h1 className="font-serif text-display-2 text-ivory">{project.title}</h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-stone">{project.description}</p>
        {project.whyItWorked && (
          <div className="mt-12">
            <WhyItWorked data={project.whyItWorked} />
          </div>
        )}
        <p className="label mt-10 text-taupe">
          A full case study hasn&rsquo;t been written for this piece yet — add one in{" "}
          <code className="text-stone">data/caseStudies.ts</code>.
        </p>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-editorial px-5 py-16 sm:px-8 sm:py-24">
      <Link href="/work" className="label text-taupe hover:text-ivory">
        ← All Work
      </Link>

      <header className="mt-8">
        <p className="label text-taupe">
          {project.industries.join(" / ")} &middot; {project.platform}
          {project.isPlaceholder && " · Sample"}
        </p>
        <h1 className="mt-3 font-serif text-display-1 text-ivory">{caseStudy.title}</h1>
        <p className="mt-4 max-w-2xl font-serif text-xl italic text-stone">{caseStudy.subtitle}</p>
      </header>

      <div className="mt-20 space-y-20">
        <Section num="01" heading="Context" body={caseStudy.context} />
        <Section num="02" heading="The Insight" body={caseStudy.insight} />
        <Section num="03" heading="The Idea" body={caseStudy.idea} />
        <Section num="04" heading="Execution" body={caseStudy.execution} />

        <div>
          <EditorialDivider index="05" label="Content" />
          <p className="text-sm leading-relaxed text-stone">{caseStudy.contentDescription}</p>
        </div>

        <div>
          <EditorialDivider index="06" label="Performance" />
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {caseStudy.performanceStats.map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-display-2 text-ivory">{stat.value}</p>
                <p className="label mt-2 text-taupe">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <EditorialDivider index="07" label="Why It Worked" />
          <WhyItWorked data={caseStudy.whyItWorked} />
        </div>

        <div>
          <EditorialDivider index="08" label="What I Learned" />
          <p className="font-serif text-xl italic leading-snug text-ivory text-balance sm:text-2xl">
            {caseStudy.whatILearned}
          </p>
        </div>
      </div>
    </article>
  );
}

function Section({ num, heading, body }: { num: string; heading: string; body: string }) {
  return (
    <div className="grid gap-4 sm:grid-cols-[100px_1fr]">
      <span className="label text-taupe">{num}</span>
      <div>
        <h2 className="font-serif text-2xl text-ivory sm:text-3xl">{heading}</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone">{body}</p>
      </div>
    </div>
  );
}
