import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Content, campaigns, and case studies — ranked by what matters to you.",
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
