import type { Metadata } from "next";
import { ContactPanel } from "@/components/ContactPanel";
import { socialLinks } from "@/data/social";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a partnership, marketing conversation, or creative project.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-editorial px-5 py-16 sm:px-8 sm:py-24">
      <p className="label mb-4 text-taupe">Contact</p>
      <h1 className="font-serif text-display-2 text-ivory text-balance">
        Let&rsquo;s make something people remember.
      </h1>

      <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="label mb-4 text-taupe">Elsewhere</p>
          <ul className="space-y-2">
            {socialLinks.map((link) => (
              <li key={link.platform}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-stone hover:text-ivory"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="label mt-10 mb-2 text-taupe">Email</p>
          <p className="text-sm text-stone">{profile.email}</p>
        </div>

        <ContactPanel />
      </div>
    </div>
  );
}
