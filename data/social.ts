/** EDIT ME — social handles used in the footer and contact page. */

export interface SocialLink {
  platform: "TikTok" | "Instagram" | "LinkedIn" | "Email";
  label: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  { platform: "TikTok", label: "TikTok", href: "https://www.tiktok.com/@juliettebruner" },
  { platform: "Instagram", label: "Instagram", href: "https://www.instagram.com/juliettebruner" },
  {
    platform: "LinkedIn",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/juliette-bruner-b27867202",
  },
];
