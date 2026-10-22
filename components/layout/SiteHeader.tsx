import Link from "next/link";
import { primaryCta, primaryNav } from "@/content/site";
import { MobileMenu } from "./MobileMenu";
import { Wordmark } from "./Wordmark";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container-calix flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link href="/" className="flex min-h-11 items-center no-underline">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex gap-10 text-[15px]">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="nav-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Outline style: the solid primary button stays unique in each viewport. */}
          <Link href={primaryCta.href} className="btn btn-secondary btn-compact" data-cta="header">
            {primaryCta.label}
          </Link>
          <MobileMenu items={primaryNav} />
        </div>
      </div>
    </header>
  );
}
