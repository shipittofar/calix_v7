import Link from "next/link";
import type { ReactNode } from "react";
import { primaryCta, site } from "@/content/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { Fact } from "@/components/ui/Pending";
import { siteUrl } from "@/lib/site-url";

export type Crumb = { label: string; href: string };

/** Visible breadcrumbs with matching BreadcrumbList structured data. */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const all = [{ label: "Home", href: "/" }, ...trail];
  return (
    <>
      <nav aria-label="Breadcrumb" className="type-small text-secondary">
        <ol className="flex flex-wrap gap-x-2">
          {all.map((c, i) => (
            <li key={c.href} className="flex gap-x-2">
              {i < all.length - 1 ? (
                <>
                  <Link href={c.href} className="link">
                    {c.label}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              ) : (
                <span aria-current="page">{c.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: `${siteUrl}${c.href === "/" ? "" : c.href}`,
          })),
        }}
      />
    </>
  );
}

/** Primary CTA with the reply promise, for page headers. */
export function HeaderCta({ cta = primaryCta }: { cta?: { label: string; href: string } }) {
  return (
    <div>
      <Link href={cta.href} className="btn btn-primary w-full md:w-auto" data-cta="page-header">
        {cta.label}
      </Link>
      <Fact
        value={site.replyTime}
        render={(v) => <p className="type-small mt-3 text-secondary">We reply within {v}.</p>}
      />
    </div>
  );
}

export function PageHeader({
  trail,
  label,
  title,
  intro,
  aside = <HeaderCta />,
}: {
  trail: Crumb[];
  label?: string;
  title: string;
  intro: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="container-calix grid-calix gap-y-10 pt-10 pb-16 lg:pt-14 lg:pb-24">
      <div className="col-span-4 md:col-span-8 lg:col-span-12">
        <Breadcrumbs trail={trail} />
      </div>
      <div className="col-span-4 md:col-span-8 lg:col-span-7">
        {label ? <p className="type-label text-secondary">{label}</p> : null}
        <h1 className={label ? "mt-4" : undefined}>{title}</h1>
        <div className="type-lead mt-6 measure">{intro}</div>
      </div>
      {aside ? <div className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9 self-end">{aside}</div> : null}
    </header>
  );
}

/** Closing conversion band (Olive), used at the end of every marketing page. */
export function CtaBand({
  title = "Tell us what you are building.",
  body,
  cta = primaryCta,
}: {
  title?: string;
  body?: ReactNode;
  cta?: { label: string; href: string };
}) {
  return (
    <section aria-labelledby="cta-band-title" className="surface-action section-pad">
      <div className="container-calix grid-calix gap-y-8">
        <div className="col-span-4 md:col-span-8 lg:col-span-7">
          <h2 id="cta-band-title">{title}</h2>
          <p className="type-lead mt-6 measure">
            {body ?? (
              <Fact
                value={site.replyTime}
                render={(v) => <>Send a short brief. We reply within {v} with next steps.</>}
                fallback="Send a short brief and we will reply with next steps."
              />
            )}
          </p>
        </div>
        <div className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9 self-end">
          <Link href={cta.href} className="btn btn-primary" data-cta="cta-band">
            {cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}

/** FAQ as native disclosures, so it works without JavaScript. */
export function Faq({ items, id = "faq" }: { items: { q: string; a: string }[]; id?: string }) {
  return (
    <ul className="rule-list">
      {items.map((item, i) => (
        <li key={item.q}>
          <details className="faq" id={`${id}-${i}`}>
            <summary className="faq__q">{item.q}</summary>
            <p className="faq__a measure">{item.a}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}

export function SectionTitle({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  return (
    <h2 id={id} className={`text-[34px] lg:text-[44px] ${className}`}>
      {children}
    </h2>
  );
}

export function FixtureBanner() {
  return (
    <div className="placeholder-block container-calix mt-6" role="note">
      <p className="type-label">Test fixture</p>
      <p className="type-small mt-2">
        Fictional content used only to test this template. It is not a real project or article and is never published.
      </p>
    </div>
  );
}
