"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Project, Category, Platform } from "@/types";
import { allCategories } from "@/data/content";
import { formatDate } from "@/lib/utils";

const PLATFORMS: Platform[] = ["TikTok", "Instagram", "YouTube", "Other"];

const GOOD_FOR_OPTIONS: { key: keyof GoodFor; label: string }[] = [
  { key: "brand", label: "Pitching to a brand" },
  { key: "recruiter", label: "A recruiter / job application" },
  { key: "creator", label: "Showing off the craft/creativity" },
  { key: "strategy", label: "Showing strategic thinking" },
  { key: "editorial", label: "Writing / ideas" },
];

interface GoodFor {
  brand: boolean;
  recruiter: boolean;
  creator: boolean;
  strategy: boolean;
  editorial: boolean;
}

const emptyGoodFor: GoodFor = {
  brand: false,
  recruiter: false,
  creator: false,
  strategy: false,
  editorial: false,
};

export function AdminDashboard({ initialProjects }: { initialProjects: Project[] }) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [platform, setPlatform] = useState<Platform>("TikTok");
  const [brand, setBrand] = useState("");
  const [featured, setFeatured] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [goodFor, setGoodFor] = useState<GoodFor>(emptyGoodFor);
  const [views, setViews] = useState("");
  const [likes, setLikes] = useState("");
  const [comments, setComments] = useState("");
  const [shares, setShares] = useState("");

  const toggleCategory = (c: Category) => {
    setCategories((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  };

  const resetForm = () => {
    setUrl("");
    setTitle("");
    setDescription("");
    setPlatform("TikTok");
    setBrand("");
    setFeatured(false);
    setCategories([]);
    setGoodFor(emptyGoodFor);
    setViews("");
    setLikes("");
    setComments("");
    setShares("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    const toNumber = (v: string) => (v.trim() ? Number(v) : undefined);

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          title,
          description,
          platform,
          brand,
          featured,
          categories,
          goodFor,
          views: toNumber(views),
          likes: toNumber(likes),
          comments: toNumber(comments),
          shares: toNumber(shares),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setSubmitting(false);
        return;
      }
      setProjects((prev) => [data.project, ...prev]);
      resetForm();
      setSuccess(true);
      setSubmitting(false);
    } catch {
      setError("Something went wrong. Try again.");
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this video from the site?")) return;
    const res = await fetch(`/api/admin/projects?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    if (res.ok) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-editorial px-5 py-16 sm:px-8 sm:py-24">
      <div className="flex items-center justify-between">
        <div>
          <p className="label mb-2 text-taupe">Private</p>
          <h1 className="font-serif text-3xl text-ivory sm:text-4xl">Add a Video</h1>
        </div>
        <button type="button" onClick={handleLogout} className="label text-taupe hover:text-ivory">
          Log out
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 space-y-8 border hairline p-6 sm:p-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block">
            <span className="label mb-2 block text-taupe">Link *</span>
            <input
              required
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.tiktok.com/@juliettebruner/video/..."
              className="w-full border-b hairline bg-transparent py-2 text-ivory placeholder:text-taupe focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="label mb-2 block text-taupe">Platform</span>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Platform)}
              className="w-full border-b hairline bg-transparent py-2 text-ivory focus:outline-none"
            >
              {PLATFORMS.map((p) => (
                <option key={p} value={p} className="bg-ink">
                  {p}
                </option>
              ))}
            </select>
          </label>
          <label className="block sm:col-span-2">
            <span className="label mb-2 block text-taupe">Title *</span>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="A short name for it"
              className="w-full border-b hairline bg-transparent py-2 text-ivory placeholder:text-taupe focus:outline-none"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="label mb-2 block text-taupe">Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="One or two sentences (optional — the title is used if left blank)"
              rows={2}
              className="w-full border-b hairline bg-transparent py-2 text-ivory placeholder:text-taupe focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="label mb-2 block text-taupe">Brand partnership? (optional)</span>
            <input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Brand name, if sponsored"
              className="w-full border-b hairline bg-transparent py-2 text-ivory placeholder:text-taupe focus:outline-none"
            />
          </label>
          <label className="flex items-center gap-2 self-end pb-2">
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
            <span className="label text-taupe">Feature this prominently</span>
          </label>
        </div>

        <fieldset>
          <legend className="label mb-3 text-taupe">Category — pick at least one *</legend>
          <div className="flex flex-wrap gap-2">
            {allCategories.map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => toggleCategory(c)}
                aria-pressed={categories.includes(c)}
                className={`label border hairline px-3 py-2 ${
                  categories.includes(c) ? "bg-ivory text-ink" : "text-taupe hover:text-ivory"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="label mb-3 text-taupe">This is a good example for…</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {GOOD_FOR_OPTIONS.map((opt) => (
              <label key={opt.key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={goodFor[opt.key]}
                  onChange={(e) => setGoodFor((prev) => ({ ...prev, [opt.key]: e.target.checked }))}
                />
                <span className="text-sm text-stone">{opt.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="label mb-3 text-taupe">Numbers (optional — only fill in what you know)</legend>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <NumberField label="Views" value={views} onChange={setViews} />
            <NumberField label="Likes" value={likes} onChange={setLikes} />
            <NumberField label="Comments" value={comments} onChange={setComments} />
            <NumberField label="Shares" value={shares} onChange={setShares} />
          </div>
        </fieldset>

        {error && <p className="text-sm text-stone">{error}</p>}
        {success && <p className="text-sm text-stone">Added — it&rsquo;s live on the site now.</p>}

        <button
          type="submit"
          disabled={submitting || categories.length === 0}
          className="label border hairline bg-ivory px-8 py-4 text-ink disabled:opacity-50"
        >
          {submitting ? "Adding…" : "Add →"}
        </button>
      </form>

      <div className="mt-16">
        <p className="label mb-6 text-taupe">Videos added here ({projects.length})</p>
        {projects.length === 0 ? (
          <p className="text-sm text-taupe">Nothing added yet.</p>
        ) : (
          <div className="divide-y hairline border-y hairline">
            {projects.map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-4 py-4">
                <div>
                  <p className="text-ivory">{p.title}</p>
                  <p className="label mt-1 text-taupe">
                    {p.platform} &middot; {p.categories.join(", ")} &middot; {formatDate(p.date)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(p.id)}
                  className="label whitespace-nowrap text-taupe hover:text-ivory"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="label mb-2 block text-taupe">{label}</span>
      <input
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b hairline bg-transparent py-2 text-ivory focus:outline-none"
      />
    </label>
  );
}
