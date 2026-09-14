import { CaseStudy } from "@/types";

/**
 * EDIT ME — full-length case studies for standout projects. Not every
 * project needs one; link a case study to a project via
 * `project.caseStudySlug` matching `caseStudy.slug`. These four are
 * built from the sample/placeholder projects in content.ts — replace
 * the language once real work and real numbers are in.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "reformation-try-on-diary",
    projectId: "p1",
    title: "Try-On Diary",
    subtitle: "Reformation SS24 — an organic-feeling product story built for a paid brief",
    context:
      "A fashion brand needed a short-form piece to drive traffic to a new seasonal drop without it reading as an advertisement — the brief was explicit that it should not feel 'produced.'",
    insight:
      "Viewers scroll past styled lookbook content within the first second because it visually announces itself as an ad. A near-miss — an outfit that doesn't quite work — reads as an unscripted reaction and buys the next ten seconds of attention.",
    idea:
      "Structure the video as a small narrative: try something that doesn't land, then the piece that does, so the reveal has the shape of a real decision instead of a demonstration.",
    execution:
      "Single continuous handheld take in available dressing-room light. No music swell, no cutaways, captions burned in for silent autoplay viewing. The 'miss' outfit was chosen deliberately, not improvised, to control pacing.",
    contentDescription:
      "A 34-second vertical video: two outfit changes, natural audio, on-screen captions, ending on a static beat with the product tag.",
    performanceStats: [
      { label: "Views", value: "1.2M" },
      { label: "Engagement Rate", value: "10.6%" },
      { label: "Completion Rate", value: "71%" },
      { label: "Saves", value: "21K" },
    ],
    whyItWorked: {
      hook: "Opens mid-outfit-change, already in motion — no intro, no setup.",
      insight:
        "Audiences trust a reaction more when they've seen it fail once first; a clean highlight reel reads as advertising.",
      creative:
        "One continuous take, dressing-room mirror framing, natural audio kept under the cut edit for authenticity.",
      distribution:
        "Posted at a time indexed to the brand's own audience activity, not Juliette's, since the goal was product discovery.",
      takeaway:
        "A branded try-on doesn't need to look expensive to convert — it needs to look unedited.",
    },
    whatILearned:
      "The instinct to 'clean up' branded content for a client often works against the brief. The rougher cut consistently outperformed the polished alternate version in testing.",
    industries: ["Fashion"],
  },
  {
    slug: "5am-skincare-talk",
    projectId: "p2",
    title: "The 5AM Skincare Talk",
    subtitle: "Subverting an oversaturated format instead of competing inside it",
    context:
      "The 'get ready with me' format had become so common that even well-executed entries were getting buried. The goal was reach and trust-building ahead of future brand conversations, not a specific campaign.",
    insight:
      "The audience wasn't tired of morning routines — they were tired of the performance of one. Every visual cue that signals 'production' (music, lighting, pacing) was actively working against engagement in this specific genre.",
    idea:
      "Remove every convention of the format on purpose: no music, half-lit bathroom, real-time pacing, deadpan narration recorded after the fact.",
    execution:
      "Shot on a tripod in one room. Full routine captured in real time, then condensed with plain jump cuts rather than stylized transitions.",
    contentDescription:
      "A 58-second video, single location, voiceover narration, minimal edit — deliberately anti-produced.",
    performanceStats: [
      { label: "Views", value: "3.4M" },
      { label: "Engagement Rate", value: "13.9%" },
      { label: "Saves", value: "152K" },
      { label: "Shares", value: "61K" },
    ],
    whyItWorked: {
      hook: "'It's 5am and I have not done a single thing to prepare for this video' — stated flatly, no music.",
      insight:
        "Viewers were exhausted by aspirational morning-routine content; the format needed to be subverted, not improved.",
      creative:
        "Deliberately unpolished lighting and pacing signal honesty faster than any disclaimer could.",
      distribution:
        "Positioned as a saves-driven piece (a routine to reference later), which the caption explicitly invited.",
      takeaway:
        "When a genre becomes over-produced, the fastest way to stand out is to remove the production.",
    },
    whatILearned:
      "Saves, not shares, were the real signal here — viewers treated it as a reference, which changed how I've captioned similar content since.",
    industries: ["Beauty", "Wellness"],
  },
  {
    slug: "girl-dinner-editorial",
    projectId: "p4",
    title: "\"Girl Dinner,\" But Make It Editorial",
    subtitle: "Translating a saturated trend instead of participating in it",
    context:
      "The 'girl dinner' trend was at peak saturation — participating straight would have been invisible. The opportunity was in finding a genuinely new angle inside a format everyone already recognized.",
    insight:
      "At peak saturation, a trend rewards reframing over refinement. The audience had already seen the joke executed well hundreds of times; what they hadn't seen was the joke used as a setup for something else.",
    idea:
      "Keep the trend's visual grammar completely intact — same shot, same audio — but rewrite the voiceover as a short essay on eating alone in a city, letting the format's familiarity carry an unfamiliar idea.",
    execution:
      "Filmed identically to a standard 'girl dinner' video. The only variable changed was the script, timed to turn on the audience's expectation at the exact beat they expected the joke to land.",
    contentDescription:
      "A 27-second video using the trend's original audio and overhead plate shot, voiceover script replacing the expected comedic beat with a reflective one.",
    performanceStats: [
      { label: "Views", value: "2.1M" },
      { label: "Engagement Rate", value: "15.1%" },
      { label: "Shares", value: "38K" },
      { label: "Comments", value: "5.4K" },
    ],
    whyItWorked: {
      hook: "Opens exactly like every other 'girl dinner' video — then the voiceover turns a corner in the first three seconds.",
      insight:
        "A trend at peak saturation rewards a new angle, not a better execution of the same angle everyone else is using.",
      creative:
        "Visual format left untouched on purpose, so the audio's twist reads as a switch, not a departure.",
      distribution:
        "Timed to the trend's peak, not its start — riskier, but the reframe only works once the audience is already fluent in the joke.",
      takeaway:
        "Cultural fluency means knowing when to ride a trend and when to subvert it — and that a subversion still needs the original's shape to land.",
    },
    whatILearned:
      "Comment sentiment mattered more than volume here — the comments were personal essays in their own right, which told me the reframe had actually landed as intended.",
    industries: ["Lifestyle"],
  },
  {
    slug: "cost-of-that-girl",
    projectId: "p6",
    title: "The Cost of Being \"That Girl\"",
    subtitle: "A critique of aspirational content, built to stay brand-safe",
    context:
      "Wellness and lifestyle content was generating audience resentment as much as aspiration. There was an opening for a piece that named that tension directly — without becoming cynical or alienating brand partners.",
    insight:
      "Naming a tension the audience already feels privately earns more trust than resolving it for them or ignoring it entirely.",
    idea:
      "Use a listicle structure — a format the audience already trusts as informational — to deliver a cultural critique instead of a tutorial, itemizing the literal cost of an aspirational identity.",
    execution:
      "Tightly scripted, on-screen text overlays itemizing each cost, deadpan delivery calibrated to avoid tipping into either judgment of the audience or endorsement of the lifestyle.",
    contentDescription:
      "A 71-second scripted video with on-screen itemized text overlays functioning like a financial breakdown.",
    performanceStats: [
      { label: "Views", value: "4.8M" },
      { label: "Engagement Rate", value: "14.0%" },
      { label: "Shares", value: "89K" },
      { label: "Followers Gained", value: "22K" },
    ],
    whyItWorked: {
      hook: "\"Let's do the math on what 'that girl' actually costs\" — a premise, not a personality, opens the video.",
      insight:
        "The audience was fatigued by content that sold an aspirational identity without acknowledging its cost — literal or otherwise.",
      creative:
        "On-screen itemized text overlays borrow the credibility of a financial breakdown, which slows the viewer down mid-scroll.",
      distribution:
        "Framed and captioned as commentary, not a personal essay, positioning it for shares into group chats rather than personal accounts.",
      takeaway:
        "A brand-safe creator can still say something with an edge — the discipline is in the framing, not in avoiding the subject.",
    },
    whatILearned:
      "The tighter the script, the safer the edge — nearly every word was deliberate, which is what let the piece critique the genre without alienating the brands operating inside it.",
    industries: ["Wellness", "Lifestyle"],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
