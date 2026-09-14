import { Hero } from "@/components/Hero";
import { IntentSelector } from "@/components/IntentSelector";
import { FeaturedWork } from "@/components/FeaturedWork";
import { MetricsStrip } from "@/components/MetricsStrip";
import { ContentSignals } from "@/components/ContentSignals";
import { WhyItWorked } from "@/components/WhyItWorked";
import { BrandFitExplorer } from "@/components/BrandFitExplorer";
import { CuratedView } from "@/components/CuratedView";
import { EditorialDivider } from "@/components/EditorialDivider";
import { BrandStrip } from "@/components/BrandStrip";
import { Testimonials } from "@/components/Testimonials";
import { projects } from "@/data/content";
import { profile } from "@/data/profile";

const signatureProject = [...projects]
  .filter((p) => p.whyItWorked)
  .sort((a, b) => b.strategyScore - a.strategyScore)[0];

export default function HomePage() {
  return (
    <>
      <Hero />

      <IntentSelector />

      <FeaturedWork />

      <div className="mx-auto max-w-editorial px-5 sm:px-8">
        <MetricsStrip />
      </div>

      <div className="mx-auto max-w-editorial px-5 py-20 sm:px-8">
        <ContentSignals projects={projects} />
      </div>

      {signatureProject && (
        <section className="mx-auto max-w-editorial px-5 py-20 sm:px-8">
          <EditorialDivider label="The Signature Feature" />
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="label mb-3 text-taupe">Why It Worked</p>
              <h2 className="font-serif text-3xl text-ivory sm:text-4xl">
                {signatureProject.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-stone">
                {signatureProject.description}
              </p>
            </div>
            <WhyItWorked data={signatureProject.whyItWorked!} />
          </div>
        </section>
      )}

      <div className="mx-auto max-w-editorial px-5 py-20 sm:px-8">
        <BrandFitExplorer />
      </div>

      <section className="border-y hairline">
        <div className="mx-auto max-w-editorial px-5 py-20 text-center sm:px-8">
          <p className="label mb-4 text-taupe">A Signature Feature</p>
          <h2 className="font-serif text-display-2 text-ivory text-balance">
            Build a portfolio for me.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm text-stone">
            Answer two quick questions and the work re-sorts itself around what actually
            matters to you — deterministically, privately, in your browser.
          </p>
          <div className="mt-10 flex justify-center">
            <CuratedView />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-editorial px-5 py-20 sm:px-8">
        <BrandStrip />
      </div>

      <Testimonials />

      <section className="mx-auto max-w-editorial px-5 py-24 sm:px-8">
        <p className="label mb-4 text-taupe">About</p>
        <p className="font-serif text-editorial text-ivory text-balance">
          {profile.shortBio}
        </p>
      </section>
    </>
  );
}
