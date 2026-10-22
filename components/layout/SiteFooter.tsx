import Link from "next/link";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { Fact } from "@/components/ui/Pending";
import { Wordmark } from "./Wordmark";

export function SiteFooter() {
  return (
    <footer className="surface-inverse border-t border-gold">
      <div className="container-calix grid-calix gap-y-12 py-20">
        <div className="col-span-4 md:col-span-8 lg:col-span-5">
          <Wordmark tone="ivory" heightClass="h-[40px] lg:h-[44px]" />
          <p className="mt-6 font-display text-[26px] leading-snug">{site.positioning}</p>
        </div>

        <nav aria-label="Services" className="col-span-2 md:col-span-3 lg:col-start-7 lg:col-span-3">
          <h2 className="type-label text-gold">Services</h2>
          <ul className="mt-4 space-y-2 type-small">
            {services.map((s) => (
              <li key={s.key}>
                <Link href={`/services/${s.slug}`} className="text-travertine no-underline hover:underline">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Studio" className="col-span-2 md:col-span-3 lg:col-span-3">
          <h2 className="type-label text-gold">Studio</h2>
          <ul className="mt-4 space-y-2 type-small">
            <li>
              <Link href="/work" className="text-travertine no-underline hover:underline">
                Work
              </Link>
            </li>
            <li>
              <Link href="/studio" className="text-travertine no-underline hover:underline">
                Studio
              </Link>
            </li>
            <li>
              <Link href="/insights" className="text-travertine no-underline hover:underline">
                Insights
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-travertine no-underline hover:underline">
                Start a Project
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-travertine no-underline hover:underline">
                Privacy
              </Link>
            </li>
            {site.profiles.map((url) => (
              <li key={url}>
                <a href={url} rel="noopener" className="text-travertine no-underline hover:underline">
                  Instagram<span className="sr-only"> (CALIX profile, external site)</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-4 md:col-span-8 lg:col-span-12 border-t border-gold pt-6 type-small text-travertine">
          <p>
            © {site.copyrightYear} <Fact value={site.legalName} render={(v) => v} fallback={site.name} />.
            <Fact
              value={site.email}
              render={(v) => (
                <>
                  {" "}
                  Email: {typeof v === "string" ? <a href={`mailto:${v}`}>{v}</a> : v}
                </>
              )}
            />
          </p>
        </div>
      </div>
    </footer>
  );
}
