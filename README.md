# Juliette Bruner — Portfolio

An interactive creator, marketing, and editorial portfolio built with
Next.js, TypeScript, Tailwind CSS, and Framer Motion. The site re-sorts
its own content depending on who's viewing it — a brand, a recruiter, a
fellow strategist, or someone here for the writing — using a
deterministic scoring engine (no AI calls, nothing sent off-device).

This README has two audiences: **skip to [For Juliette](#for-juliette---no-coding-required)**
if you just want to edit content and publish. The sections above that
are for whoever maintains the code.

---

## What's real vs. placeholder right now

Nothing in this codebase invents facts about Juliette. Where real
content wasn't supplied, the site ships with either:

- **Sample content**, clearly tagged `isPlaceholder: true` in the data
  and shown with a small "Sample" badge on the site (the nine projects
  in `data/content.ts`, two essays in `data/writing.ts`) — these exist
  so the design, filtering, and ranking features have something to
  demonstrate with. Replace them with real work.
- **Empty sections that hide themselves** until real data is added:
  Experience, Collaborations/Brands, Testimonials, and Press all render
  nothing at all while their data files are empty arrays. This is
  intentional — see `data/experience.ts`, `data/brands.ts`,
  `data/testimonials.ts`, `data/press.ts`.
- **Development placeholders** for numbers that shouldn't be guessed at
  — the big stats strip (`data/metrics.ts`) shows a plain notice instead
  of a number until you set `visible: true` with a real value.

## Architecture

```
app/            Next.js App Router pages (one folder per route)
components/     Reusable UI — presentational + a few with local state
context/        IntentContext — visitor-mode state (localStorage + URL)
data/           EVERY editable fact on the site lives here (see below)
lib/            scoring.ts (ranking engine), analytics.ts, utils.ts
types/          Shared TypeScript interfaces for all content
hooks/          useReducedMotion, useIsTouchDevice
```

### The personalization engine

1. A visitor picks (or a link sets) a **visitor intent** — `brand`,
   `recruiter`, `creator`, `strategy`, `editorial`, or `explore` —
   stored via `context/IntentContext.tsx` in `localStorage` and mirrored
   in the URL (`?view=brand`).
2. `lib/scoring.ts` ranks every project in `data/content.ts` using a
   weighted formula: how well it serves that intent, whether it matches
   an industry filter, whether it's `featured`, a log-scaled view count
   (so one viral outlier can't dominate), and recency. Weights are
   editable at the top of that file.
3. Every page that lists work (`/work`, the homepage, campaign links,
   private `/for/[slug]` links) calls the same `rankProjects()` function
   — there is exactly one ranking algorithm, not one per page.

### Shareable curated links

- `/work?view=brand&industry=Beauty` — sets intent + industry from the
  URL, persisted for the rest of the session.
- `/work/beauty`, `/work/fashion`, `/work/nyc`, `/work/social-strategy`
  — clean campaign links that map to the same filters. Add more by
  editing `lib/campaignLinks.ts` — no new pages or duplicated content
  required.
- `/for/a-company-slug` — a private, tailored view for one recipient.
  Add entries in `data/privateLinks.ts`; it's excluded from
  `robots.txt` and sitemap by default.

### Contact form

`components/ContactPanel.tsx` posts to `app/api/contact/route.ts`,
which currently validates and logs the submission server-side. To
receive these for real, wire in an email provider (Resend, Postmark,
SendGrid) inside that route handler using an API key from `.env.local`
(see `.env.example`) — never commit that key.

---

## For developers

### Requirements

- Node.js 18.18+ (the repo's dev container has Node 22)
- npm

### Run it locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

### Before pushing changes

```bash
npm run lint
npm run typecheck
npm run build
```

All three must pass clean — the project ships with zero lint errors,
zero type errors, and zero `npm audit` vulnerabilities as of this
writing. Keep it that way.

### Deploying

The app is a standard Next.js 16 (App Router) project — deploy it to
[Vercel](https://vercel.com) by importing this repo (no special root
directory setting needed). Set `NEXT_PUBLIC_SITE_URL` as an environment
variable in Vercel to your real domain once you have one.

---

## For Juliette — no coding required

Everything you'd ever want to change lives in plain text files inside
the `data/` folder. You never need to touch anything in `app/`,
`components/`, or `lib/` to update content.

### 1. Opening the project

Someone (a developer, or Claude Code) has this project open for you.
You don't need to install anything yourself to make text edits — just
open the file mentioned below, and ask for the specific change in
plain English if you're not comfortable editing the code directly.

### 2 & 3. Running it / seeing the website

- **On the web (claude.ai/code or similar):** ask to see the site — it
  runs `npm run dev` and gives you a preview link.
- **On your own computer**, open a terminal in the `portfolio` folder
  and run:
  ```bash
  npm install
  npm run dev
  ```
  Then open `http://localhost:3000` in your browser.

### 4. Where to add photos

Photos aren't required for the site to look good on purpose — the
design leans on typography instead of stock imagery. When you have a
real editorial portrait, drop the image file into `public/` (e.g.
`public/portrait.jpg`) and ask for it to be wired into
`app/about/page.tsx` in place of the "Editorial Portrait — add photo"
placeholder box.

### 5. Where to paste TikTok / Instagram URLs

Open **`data/content.ts`**. Each piece of content is one block that
looks like this:

```ts
{
  id: "p10",
  slug: "my-new-video",
  title: "Video Title",
  description: "One or two sentences about it.",
  platform: "TikTok",
  url: "https://www.tiktok.com/@you/video/123...",   // ← paste the real link here
  date: "2024-08-01",
  metrics: { views: 500000, likes: 40000 },            // only include numbers you actually have
  contentType: "short-form-video",
  categories: ["Beauty"],
  skills: ["Copywriting"],
  industries: ["Beauty"],
  featured: false,
  brandScore: 70, recruiterScore: 60, strategyScore: 65, creatorScore: 80, editorialScore: 30,
  lastUpdated: "2024-08-01",
}
```

Copy an existing block, give it a new `id` and `slug`, and fill in the
real details. Delete `isPlaceholder: true` if it's on the block you
copied — that flag is only for the sample content.

The five `*Score` fields (0–100) are what make the personalization
work — they say how well this piece serves a brand, a recruiter, a
strategist, a fellow creator, or a reader. Set them honestly.

### 6. Where to change statistics

Open **`data/metrics.ts`**. Change `value` to the real number and set
`visible: true`. Leave `visible: false` on anything you don't have a
confirmed number for yet — the site will simply not show it, rather
than showing a fake number.

### 7. Where to add case studies

Open **`data/caseStudies.ts`** for the full "Context → Insight → Idea →
Execution → Performance → Why It Worked → What I Learned" writeup, and
link it to a project by matching `caseStudy.slug` to
`project.caseStudySlug` in `data/content.ts`.

### 8. Where to update your résumé

- **Experience:** `data/experience.ts` — one block per role.
- **Skills:** `data/skills.ts`.
- **A downloadable PDF:** drop a file named `resume.pdf` into
  `public/`, then open `data/profile.ts` and change
  `resumeAvailable: false` to `resumeAvailable: true`.

### 9. How to change any other text

- Homepage headline, tagline, positioning statements, bio: **`data/profile.ts`**
- Social links: **`data/social.ts`**
- Navigation labels: **`data/navigation.ts`**
- Brand collaborations: **`data/brands.ts`**
- Testimonials: **`data/testimonials.ts`**
- Press/features: **`data/press.ts`**
- Writing/essays: **`data/writing.ts`**
- "Currently" section: **`data/currently.ts`**

### 10. How to push changes to GitHub

If you're editing through Claude Code, just ask: "commit and push these
changes." If you're doing it yourself in a terminal:

```bash
git add .
git commit -m "Update content"
git push
```

### 11. How to deploy through Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (GitHub login is
   easiest).
2. Click **Add New → Project** and select this GitHub repository.
3. Click **Deploy** — no settings need to change.
4. Vercel will give you a live `.vercel.app` URL.
5. Every time you push to the main branch afterward, Vercel
   automatically redeploys.

### 12. How to connect your own domain

In the Vercel project, go to **Settings → Domains**, add your domain
(e.g. `juliettebruner.com`), and follow Vercel's instructions to point
your domain's DNS at Vercel. Then update `NEXT_PUBLIC_SITE_URL` in the
project's **Settings → Environment Variables** to match.

### 13. How to update the site later

Come back to this same README any time — nothing above changes. Edit
the relevant file in `data/`, then follow step 10 to push and step 11
handles the rest automatically.
