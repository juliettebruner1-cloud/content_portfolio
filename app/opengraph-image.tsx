import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — Creator, Content, Culture, Strategy`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#000000",
          color: "#F4F1EB",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, letterSpacing: 6 }}>
          <span>{profile.heroKicker}</span>
          <span>{profile.issueNumber}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 118, lineHeight: 1, fontWeight: 600 }}>
          {profile.heroHeadline.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 24, fontSize: 22, letterSpacing: 4 }}>
          {profile.tagline.split("/").map((word) => (
            <span key={word}>{word.trim()}</span>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
