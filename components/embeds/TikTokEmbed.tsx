"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    tiktokEmbed?: { lib?: { render?: (root?: HTMLElement | Document | null) => void } };
  }
}

const SCRIPT_SRC = "https://www.tiktok.com/embed.js";

/** Extracts the numeric video id TikTok's embed widget needs. Only
 * works for full share links (tiktok.com/@user/video/1234...) — a
 * shortened vm.tiktok.com link doesn't contain it, so callers should
 * fall back to a plain link in that case. */
export function extractTikTokVideoId(url: string): string | null {
  const match = url.match(/\/video\/(\d+)/);
  return match ? match[1] : null;
}

export function TikTokEmbed({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoId = extractTikTokVideoId(url);

  useEffect(() => {
    if (!videoId) return;
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      // Script already loaded from a previous embed — ask it to scan for this one.
      window.tiktokEmbed?.lib?.render?.(containerRef.current);
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, [videoId]);

  if (!videoId) return null;

  return (
    <div ref={containerRef} className="flex justify-center overflow-hidden">
      <blockquote
        className="tiktok-embed"
        cite={url}
        data-video-id={videoId}
        style={{ maxWidth: "605px", minWidth: "325px", width: "100%" }}
      >
        <section />
      </blockquote>
    </div>
  );
}
