import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPrivateLinkBySlug } from "@/data/privateLinks";
import { projects } from "@/data/content";
import { rankProjects } from "@/lib/scoring";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { SmartCTA } from "@/components/SmartCTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const link = getPrivateLinkBySlug(slug);
  return { title: link ? `For ${link.recipientName}` : "Private View", robots: { index: false, follow: false } };
}

export default async function PrivateOpportunityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const link = getPrivateLinkBySlug(slug);
  if (!link) notFound();

  const selected = link.projectIds
    ? projects.filter((p) => link.projectIds!.includes(p.id))
    : rankProjects(projects, { intent: link.intent, industry: link.industry });

  return (
    <div className="mx-auto max-w-editorial px-5 py-16 sm:px-8 sm:py-24">
      <p className="label mb-4 text-taupe">Prepared For</p>
      <h1 className="font-serif text-display-2 text-ivory">{link.recipientName}</h1>
      <p className="mt-6 max-w-xl text-sm leading-relaxed text-stone">{link.intro}</p>

      <div className="mt-14">
        <PortfolioGrid projects={selected} />
      </div>

      <div className="mt-16">
        <SmartCTA />
      </div>
    </div>
  );
}
