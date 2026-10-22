import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { primaryCta } from "@/content/site";
import { serviceByKey } from "@/content/services";
import { projectBySlug, projects, type Project } from "@/content/work";
import { Breadcrumbs, CtaBand, FixtureBanner } from "@/components/ui/PageParts";
import { ContentPlaceholder } from "@/components/ui/Pending";
import { JsonLd } from "@/components/seo/JsonLd";
import { TrackView } from "@/components/analytics/TrackView";
import { orgId, pageUrl, ref, serviceId } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

const displayName = (p: Project) => (p.publication === "P1" && p.client ? p.client.name : p.title);

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const p = projectBySlug((await params).slug);
  if (!p) return {};
  return pageMetadata({
    title: displayName(p),
    description: p.summary,
    path: `/work/${p.slug}`,
    noindex: Boolean(p.fixture),
    follow: !p.fixture,
  });
}

/**
 * Case-study template (Phase 6C). Section order:
 * 1 context, 2 challenge, 3 objectives, 4 strategy, 5 execution and deliverables,
 * 6 verified results, 7 visual evidence, 8 lessons or next steps.
 * Results appear only when approved figures exist; nothing is filled in to complete the layout.
 */
export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const p = projectBySlug((await params).slug);
  if (!p) notFound();
  const name = displayName(p);
  const similarHref = `/contact?service=${p.services[0]}&ref=${p.slug}`;

  return (
    <article>
      <TrackView event="case_study_opened" props={{ slug: p.slug }} />
      {p.fixture ? <FixtureBanner /> : null}

      <header className="container-calix grid-calix gap-y-10 pt-10 pb-16 lg:pt-14 lg:pb-20">
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          <Breadcrumbs
            trail={[
              { label: "Work", href: "/work" },
              { label: name, href: `/work/${p.slug}` },
            ]}
          />
        </div>
        <div className="col-span-4 md:col-span-8 lg:col-span-8">
          {p.publication === "C" ? <p className="type-label text-secondary">Concept, not client work</p> : null}
          <h1 className={p.publication === "C" ? "mt-4" : undefined}>{name}</h1>
          <p className="type-lead mt-6 measure">{p.summary}</p>
        </div>
        {/* 1. Client and project context: summary bar */}
        <dl className="col-span-4 md:col-span-8 lg:col-span-12 grid gap-x-10 gap-y-4 border-t border-espresso pt-6 md:grid-cols-4">
          <div>
            <dt className="type-label text-secondary">Client</dt>
            <dd className="mt-1">
              {p.publication === "P1" && p.client
                ? p.client.url
                  ? (
                      <a href={p.client.url} className="link" rel="noopener">
                        {p.client.name}
                      </a>
                    )
                  : p.client.name
                : p.publication === "C"
                  ? "Self-initiated"
                  : "Name withheld at the client's request"}
            </dd>
          </div>
          <div>
            <dt className="type-label text-secondary">Industry</dt>
            <dd className="mt-1">{p.industry}</dd>
          </div>
          <div>
            <dt className="type-label text-secondary">Services</dt>
            <dd className="mt-1">
              {p.services.map((k, i) => (
                <span key={k}>
                  {i > 0 ? ", " : null}
                  <Link href={`/services/${serviceByKey(k).slug}`} className="link">
                    {serviceByKey(k).name}
                  </Link>
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="type-label text-secondary">Year and role</dt>
            <dd className="mt-1">
              {p.year}, {p.role === "lead" ? "lead agency" : p.role}
            </dd>
          </div>
        </dl>
      </header>

      <div className="container-calix grid-calix gap-y-16 pb-24">
        <CaseSection id="context" title="Context">
          <p>{p.context}</p>
        </CaseSection>
        <CaseSection id="challenge" title="Challenge">
          <p>{p.challenge}</p>
        </CaseSection>
        <CaseSection id="objectives" title="Objectives">
          <ul className="rule-list">
            {p.objectives.map((o) => (
              <li key={o} className="py-3">
                {o}
              </li>
            ))}
          </ul>
        </CaseSection>
        <CaseSection id="strategy" title="Strategy">
          <p>{p.strategy}</p>
        </CaseSection>
        <CaseSection id="execution" title="Execution and deliverables">
          <p>{p.execution}</p>
          <ul className="rule-list mt-6">
            {p.deliverables.map((d) => (
              <li key={d} className="py-3">
                {d}
              </li>
            ))}
          </ul>
        </CaseSection>
        <CaseSection id="results" title="Results">
          {p.results?.length ? (
            <ul className="grid gap-8 md:grid-cols-2">
              {p.results.map((r) => (
                <li key={r.label} className="border-t border-espresso pt-4">
                  <p className="font-display text-[56px] leading-none">{r.value}</p>
                  <p className="mt-2 font-medium">{r.label}</p>
                  <p className="type-annotation mt-2 text-secondary">
                    Baseline: {r.baseline}. Period: {r.period}. Source: {r.source}.
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-secondary">
              No results are published for this project. We only publish figures the client has approved, with a
              baseline, time period and source.
            </p>
          )}
        </CaseSection>
        <CaseSection id="visuals" title="Visual evidence">
          {p.visuals.length ? (
            <div className="grid gap-12">
              {p.visuals.map((v) => (
                <figure key={v.src}>
                  <div className="plate__field">
                    <Image src={v.src} width={v.width} height={v.height} alt={v.alt} sizes="(min-width: 1200px) 60vw, 100vw" />
                  </div>
                  <figcaption className="plate__caption">
                    <span className="type-label">{v.caption}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <ContentPlaceholder
              title="Project visuals"
              needed={["Approved screenshots, identity files or campaign assets", "Image rights confirmation"]}
            />
          )}
        </CaseSection>
        {p.quote ? (
          <figure className="col-span-4 md:col-span-8 lg:col-span-9 lg:col-start-3 border-t border-gold pt-8">
            <blockquote className="font-display text-[28px] leading-snug lg:text-[40px]">{p.quote.text}</blockquote>
            <figcaption className="type-small mt-4">
              {p.quote.name}, {p.quote.role}
              {p.quote.company ? `, ${p.quote.company}` : ""}
            </figcaption>
          </figure>
        ) : null}
        {p.lessons ? (
          <CaseSection id="lessons" title="Lessons and next steps">
            <p>{p.lessons}</p>
          </CaseSection>
        ) : null}
      </div>

      <CtaBand
        title="Start a similar project."
        cta={{ label: primaryCta.label, href: similarHref }}
      />

      {/* Emitted for fixtures too (noindex, never deployed) so the template can be tested. */}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "@id": `${pageUrl(`/work/${p.slug}`)}#casestudy`,
            name,
            description: p.summary,
            url: pageUrl(`/work/${p.slug}`),
            dateCreated: String(p.year),
            creator: ref(orgId),
            publisher: ref(orgId),
            about: p.services.map((k) => ref(serviceId(`/services/${serviceByKey(k).slug}`))),
          }}
        />

    </article>
  );
}

function CaseSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="col-span-4 md:col-span-8 lg:col-span-12 grid-calix gap-y-4 border-t border-travertine pt-8">
      <div className="col-span-4 md:col-span-8 lg:col-span-4">
        <h2 id={id} className="text-[30px]">
          {title}
        </h2>
      </div>
      <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6 measure">{children}</div>
    </section>
  );
}
