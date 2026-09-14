import { Project } from "@/types";

/**
 * EDIT ME — this is the entire portfolio database. Every video, reel, and
 * campaign on the site is one object in this array. To add a new piece:
 *
 *   1. Copy an existing object.
 *   2. Give it a unique `id` and `slug`.
 *   3. Paste the TikTok/Instagram URL into `url` (and `embedUrl` if you
 *      have the platform's embed link).
 *   4. Fill in whatever metrics you actually have — leave the rest out.
 *   5. Set the four *Score fields honestly (0-100): how well does this
 *      piece serve a brand, a recruiter, a strategist, a fellow creator,
 *      or a reader? These numbers — not raw views — drive how content
 *      re-sorts itself for each visitor. See lib/scoring.ts.
 *
 * The nine projects below are SAMPLE CONTENT (`isPlaceholder: true`) so
 * the site has something to render and demonstrate its filtering,
 * ranking, and "Why It Worked" features. Replace them with real work —
 * delete the `isPlaceholder` flag once you do. No metric, brand, or
 * result below should be read as a real claim about Juliette's work.
 */
export const projects: Project[] = [
  {
    id: "p1",
    slug: "reformation-try-on-diary",
    title: "Try-On Diary, Reformation SS24",
    description:
      "A single-take try-on story shot in available light, structured around a rejection-then-reveal pattern instead of a straight lookbook.",
    platform: "TikTok",
    date: "2024-03-14",
    metrics: {
      views: 1240000,
      likes: 98000,
      comments: 2100,
      shares: 14200,
      saves: 21000,
      engagementRate: 10.6,
      completionRate: 71,
    },
    contentType: "short-form-video",
    categories: ["Fashion", "Branded", "Viral"],
    skills: ["Creative Direction", "Copywriting", "On-Camera Presence", "Trend Fluency"],
    industries: ["Fashion"],
    brand: "PLACEHOLDER BRAND — Reformation",
    campaign: "SS24 Try-On Series",
    objective: "Drive product page traffic while keeping the read organic, not like an ad.",
    audienceInsight:
      "Viewers scroll past styled lookbooks but stop for the second a person almost doesn't like something on camera.",
    strategy:
      "Front-load a near-miss (an outfit that doesn't work) before the hero piece, so the reveal reads as a real reaction, not a script.",
    execution:
      "Shot handheld, single continuous take, natural dressing-room light, minimal cuts, captions added in post for silent viewing.",
    results: "Sample metrics — replace with verified performance once available.",
    lessons: "Imperfection earlier in a video buys trust for the payoff later.",
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
    featured: true,
    brandScore: 92,
    recruiterScore: 58,
    strategyScore: 70,
    creatorScore: 88,
    editorialScore: 40,
    lastUpdated: "2024-03-20",
    caseStudySlug: "reformation-try-on-diary",
    isPlaceholder: true,
  },
  {
    id: "p2",
    slug: "5am-skincare-talk",
    title: "The 5AM Skincare Talk",
    description:
      "A slow, unglamorous morning routine video that intentionally rejects the polished 'get ready with me' format.",
    platform: "TikTok",
    date: "2024-01-08",
    metrics: {
      views: 3400000,
      likes: 410000,
      comments: 8700,
      shares: 61000,
      saves: 152000,
      engagementRate: 13.9,
      completionRate: 64,
    },
    contentType: "short-form-video",
    categories: ["Beauty", "Wellness", "Viral"],
    skills: ["Trend Fluency", "Storytelling", "Editing", "Audience Psychology"],
    industries: ["Beauty", "Wellness"],
    objective: "Organic reach and community trust-building ahead of future brand work.",
    audienceInsight:
      "The 'get ready with me' format had saturated to the point of fatigue; viewers wanted proof of a real routine, not a performance of one.",
    strategy:
      "Strip the format down: no music swell, no product close-ups, half-lit bathroom, deadpan narration.",
    execution:
      "Shot on a tripod, single room, full routine in real time condensed with jump cuts, voiceover recorded after the fact.",
    results: "Sample metrics — replace with verified performance once available.",
    lessons: "The anti-aesthetic is its own aesthetic once a format has been oversaturated.",
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
    featured: true,
    brandScore: 74,
    recruiterScore: 65,
    strategyScore: 88,
    creatorScore: 90,
    editorialScore: 45,
    lastUpdated: "2024-01-15",
    caseStudySlug: "5am-skincare-talk",
    isPlaceholder: true,
  },
  {
    id: "p3",
    slug: "nyc-apartment-rebuild",
    title: "Rebuilding a 400-Square-Foot Apartment on Camera",
    description:
      "A multi-part renovation series shot across six weeks, structured like a magazine serial rather than a single reveal video.",
    platform: "Instagram",
    date: "2023-11-02",
    metrics: {
      views: 890000,
      likes: 62000,
      comments: 1400,
      shares: 5200,
      saves: 33000,
      followersGained: 4100,
      engagementRate: 11.3,
    },
    contentType: "reel",
    categories: ["NYC", "Lifestyle", "Storytelling"],
    skills: ["Long-Form Planning", "Community Development", "Editing", "Creative Direction"],
    industries: ["Lifestyle", "Hospitality"],
    objective: "Build a returning audience across a multi-week arc rather than a single viral moment.",
    audienceInsight:
      "Renovation content performs best as anticipation, not resolution — viewers return for a series the way they'd return for a show.",
    strategy:
      "Release in six parts with a cliffhanger structure; each part answers one question and raises the next.",
    execution:
      "Planned a content calendar before demolition began; shot b-roll throughout instead of recreating moments after the fact.",
    results: "Sample metrics — replace with verified performance once available.",
    lessons: "A content series needs a plot, not just a project.",
    featured: false,
    brandScore: 66,
    recruiterScore: 72,
    strategyScore: 80,
    creatorScore: 75,
    editorialScore: 50,
    lastUpdated: "2023-12-01",
    isPlaceholder: true,
  },
  {
    id: "p4",
    slug: "girl-dinner-editorial",
    title: "\"Girl Dinner,\" But Make It Editorial",
    description:
      "A trend translation: took the viral 'girl dinner' format and reframed it as a commentary on solo domesticity rather than a joke format.",
    platform: "TikTok",
    date: "2023-06-19",
    metrics: {
      views: 2100000,
      likes: 245000,
      comments: 5400,
      shares: 38000,
      saves: 44000,
      engagementRate: 15.1,
    },
    contentType: "short-form-video",
    categories: ["Storytelling", "Viral", "Lifestyle"],
    skills: ["Trend Translation", "Cultural Analysis", "Copywriting", "Audience Psychology"],
    industries: ["Lifestyle"],
    audienceInsight:
      "The 'girl dinner' trend was already ubiquitous — a straight participation entry would have been invisible. The opportunity was in the reframe.",
    strategy:
      "Use the trend's audio and format as a Trojan horse for a more specific, personal observation about eating alone in a city.",
    execution:
      "Kept the visual grammar of the trend intact (overhead shot, plate, trend audio) but rewrote the voiceover as a short essay.",
    results: "Sample metrics — replace with verified performance once available.",
    lessons: "The biggest opportunity inside a saturated trend is subtext, not participation.",
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
    featured: true,
    brandScore: 60,
    recruiterScore: 84,
    strategyScore: 95,
    creatorScore: 85,
    editorialScore: 78,
    lastUpdated: "2023-07-02",
    caseStudySlug: "girl-dinner-editorial",
    isPlaceholder: true,
  },
  {
    id: "p5",
    slug: "backstage-fashion-week",
    title: "Backstage, Not Front Row",
    description:
      "Fashion Week coverage shot entirely backstage — steamers, pins, and dressers — instead of the standard front-row outfit content.",
    platform: "Instagram",
    date: "2023-09-11",
    metrics: {
      views: 540000,
      likes: 41000,
      comments: 900,
      shares: 3100,
      saves: 6800,
      engagementRate: 9.8,
    },
    contentType: "photo-story",
    categories: ["NYC", "Fashion", "Storytelling"],
    skills: ["Event Coverage", "Photo Editing", "Access Negotiation", "Visual Storytelling"],
    industries: ["Fashion", "NYC / Events"],
    objective: "Differentiate event coverage in a feed saturated with identical front-row content.",
    audienceInsight:
      "Every account covers the show; almost none show the hour before it, which is where the real texture is.",
    strategy: "Trade guaranteed front-row access for backstage access, betting the novelty outweighs the prestige.",
    execution: "Shot on a compact camera to stay unobtrusive; edited as a sequential carousel rather than single images.",
    results: "Sample metrics — replace with verified performance once available.",
    lessons: "Access is a content decision, not just a logistics one.",
    featured: false,
    brandScore: 80,
    recruiterScore: 55,
    strategyScore: 62,
    creatorScore: 79,
    editorialScore: 60,
    lastUpdated: "2023-09-20",
    isPlaceholder: true,
  },
  {
    id: "p6",
    slug: "cost-of-that-girl",
    title: "The Cost of Being \"That Girl\"",
    description:
      "A cultural-commentary video breaking down the literal financial cost of the 'that girl' aesthetic as a critique of aspirational content.",
    platform: "TikTok",
    date: "2023-04-03",
    metrics: {
      views: 4800000,
      likes: 512000,
      comments: 14200,
      shares: 89000,
      saves: 61000,
      followersGained: 22000,
      engagementRate: 14.0,
    },
    contentType: "short-form-video",
    categories: ["Wellness", "Storytelling", "Viral"],
    skills: ["Cultural Analysis", "Scriptwriting", "Research", "Audience Psychology"],
    industries: ["Wellness", "Lifestyle"],
    audienceInsight:
      "Aspirational wellness content was starting to generate resentment, not motivation — an opening for a piece that named the tension directly.",
    strategy:
      "Use a listicle structure (a device the audience already trusts) to deliver a critique rather than a tutorial.",
    execution:
      "Scripted tightly, itemized costs on-screen as text overlays, deadpan delivery to avoid tipping into either judgment or endorsement.",
    results: "Sample metrics — replace with verified performance once available.",
    lessons: "Naming a tension the audience already feels earns more trust than resolving it for them.",
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
    featured: true,
    brandScore: 55,
    recruiterScore: 90,
    strategyScore: 93,
    creatorScore: 92,
    editorialScore: 85,
    lastUpdated: "2023-04-10",
    caseStudySlug: "cost-of-that-girl",
    isPlaceholder: true,
  },
  {
    id: "p7",
    slug: "hotel-bar-diaries",
    title: "Hotel Bar Diaries",
    description:
      "A recurring format profiling one NYC hotel bar per episode — part travel content, part mood piece, part quiet product placement.",
    platform: "Instagram",
    date: "2024-02-20",
    metrics: {
      views: 610000,
      likes: 38000,
      comments: 1100,
      shares: 4400,
      saves: 15000,
      engagementRate: 9.4,
    },
    contentType: "reel",
    categories: ["NYC", "Lifestyle", "Branded"],
    skills: ["Format Development", "Creative Direction", "Partnership Development"],
    industries: ["Hospitality", "NYC / Events"],
    objective: "Build a recognizable recurring format that hospitality partners could sponsor individual episodes of.",
    audienceInsight:
      "A single hotel bar video is forgettable; a series with a consistent visual identity becomes appointment content.",
    strategy: "Establish the format unsponsored first, then open individual episodes to paid partnership once the audience expected it.",
    execution: "Consistent typography, music cue, and shot list across every episode so the format reads instantly.",
    results: "Sample metrics — replace with verified performance once available.",
    lessons: "A format is a more durable asset than any single piece of content inside it.",
    featured: false,
    brandScore: 88,
    recruiterScore: 60,
    strategyScore: 75,
    creatorScore: 82,
    editorialScore: 55,
    lastUpdated: "2024-03-01",
    isPlaceholder: true,
  },
  {
    id: "p8",
    slug: "wellness-brand-morning-routine",
    title: "Morning Routine, Sponsored Integration",
    description:
      "An organically-paced sponsored integration for a wellness brand, structured to avoid the tonal break most sponsored content has.",
    platform: "TikTok",
    date: "2023-08-14",
    metrics: {
      views: 980000,
      likes: 71000,
      comments: 1600,
      shares: 8200,
      saves: 19000,
      engagementRate: 10.1,
    },
    contentType: "campaign",
    categories: ["Wellness", "Branded"],
    skills: ["Brand Integration", "Copywriting", "Negotiation", "Performance Reporting"],
    industries: ["Wellness"],
    brand: "PLACEHOLDER BRAND — Wellness Co.",
    campaign: "Morning Routine Integration",
    objective: "Introduce a new product inside an existing, trusted content format instead of a standalone ad read.",
    audienceInsight: "Viewers disengage the moment a video's tone shifts into 'ad voice' — the product needed to enter mid-routine, not as a separate segment.",
    strategy: "Write the product mention into the middle of the routine, not the front or the caption, so it reads as inclusion rather than interruption.",
    execution: "One script draft reviewed with the brand for claims accuracy; filmed in the same visual style as unsponsored routine content.",
    results: "Sample metrics — replace with verified performance once available.",
    lessons: "The best-performing branded content is often indistinguishable in craft from unsponsored work.",
    featured: false,
    brandScore: 95,
    recruiterScore: 70,
    strategyScore: 72,
    creatorScore: 68,
    editorialScore: 35,
    lastUpdated: "2023-08-20",
    isPlaceholder: true,
  },
  {
    id: "p9",
    slug: "algorithm-fatigue-essay",
    title: "On Algorithm Fatigue",
    description:
      "A written-first piece (adapted into a short video) arguing that audiences are optimizing their own behavior around the algorithm, not the reverse.",
    platform: "TikTok",
    date: "2024-05-30",
    metrics: {
      views: 420000,
      likes: 51000,
      comments: 3200,
      shares: 9800,
      saves: 24000,
      engagementRate: 20.7,
    },
    contentType: "short-form-video",
    categories: ["Strategy", "Editorial", "Storytelling"],
    skills: ["Essay Writing", "Cultural Analysis", "Scriptwriting"],
    industries: ["Lifestyle"],
    audienceInsight: "A meta-commentary on platform behavior resonates specifically with an audience that already thinks about content professionally.",
    strategy: "Write it as an essay first, then cut the essay down to video — preserving argument structure instead of writing for a hook first.",
    execution: "Text-on-screen delivery, minimal editing, treated the visual as secondary to the writing.",
    results: "Sample metrics — replace with verified performance once available.",
    lessons: "A smaller, sharper audience can out-perform a broad one on saves and shares when the content rewards re-reading.",
    featured: false,
    brandScore: 30,
    recruiterScore: 82,
    strategyScore: 90,
    creatorScore: 65,
    editorialScore: 96,
    lastUpdated: "2024-06-02",
    isPlaceholder: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const allCategories = [
  "Viral",
  "Fashion",
  "Beauty",
  "Wellness",
  "NYC",
  "Lifestyle",
  "Storytelling",
  "Branded",
  "Strategy",
  "Editorial",
] as const;
