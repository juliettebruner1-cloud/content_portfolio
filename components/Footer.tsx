import Link from "next/link";
import { footerNav } from "@/data/navigation";
import { socialLinks } from "@/data/social";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="no-print border-t hairline">
      <div className="mx-auto max-w-editorial px-5 py-16 sm:px-8">
        <p className="font-serif text-editorial italic text-ivory text-balance">
          Let&rsquo;s make something people remember.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div>
            <p className="label mb-4 text-taupe">Site</p>
            <ul className="space-y-2">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-stone hover:text-ivory">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
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
          </div>
          <div className="col-span-2 sm:col-span-2">
            <p className="label mb-4 text-taupe">{profile.location}</p>
            <p className="text-sm text-stone">{profile.coordinates}</p>
            <p className="mt-6 text-sm italic text-taupe">{profile.footerNote}</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-2 border-t hairline pt-6 text-xs text-taupe sm:flex-row sm:items-center">
          <span>
            {profile.issueNumber} &middot; &copy; {new Date().getFullYear()} {profile.name}
          </span>
          <span className="label">✦ New York</span>
        </div>
      </div>
    </footer>
  );
}
