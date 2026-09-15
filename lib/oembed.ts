/**
 * TikTok's public oEmbed endpoint — no API key needed, official and
 * documented (https://www.tiktok.com/oembed). Used only to grab the
 * real video thumbnail so grid cards show an actual photo instead of a
 * flat placeholder. Never used to scrape view/like/comment counts —
 * oEmbed doesn't return those, which is exactly why the live embed
 * widget (components/embeds/TikTokEmbed.tsx) exists for that instead.
 */
export async function fetchTikTokThumbnail(videoUrl: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(videoUrl)}`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const data = (await res.json()) as { thumbnail_url?: string };
    return data.thumbnail_url ?? null;
  } catch {
    return null;
  }
}
