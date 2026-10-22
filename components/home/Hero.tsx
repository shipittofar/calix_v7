import Link from "next/link";
import { primaryCta, site } from "@/content/site";
import { services } from "@/content/services";
import { Fact } from "@/components/ui/Pending";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="container-calix grid-calix pt-12 pb-16 lg:pt-20 lg:pb-24">
      <h1 id="hero-title" className="type-display col-span-4 md:col-span-8 lg:col-span-8">
        Make Your Brand Impossible to Ignore.
      </h1>

      <div className="col-span-4 mt-8 md:col-span-6 lg:col-span-5 lg:mt-10">
        <p className="type-lead measure">
          Strategy, design, technology and marketing — connected to build stronger brands and better digital
          outcomes.
        </p>
        <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
          <Link href={primaryCta.href} className="btn btn-primary" data-cta="hero">
            {primaryCta.label}
          </Link>
          <a href="#work" className="btn btn-secondary">
            Explore Our Work
          </a>
        </div>
        <Fact
          value={site.replyTime}
          render={(v) => <p className="type-small mt-4 text-secondary">We reply within {v}.</p>}
        />
      </div>

      <nav
        aria-label="Services on this page"
        className="col-span-4 mt-12 md:col-span-8 lg:col-span-5 lg:col-start-8 lg:mt-10"
      >
        <p className="type-small mb-4 text-secondary">
          CALIX is a digital branding and growth studio. Five services, planned together:
        </p>
        <ul className="service-index rule-list">
          {services.map((s) => (
            <li key={s.key}>
              <a href={`#${s.anchor}`}>
                <span className="service-index__name">{s.name}</span>
                <span className="type-small text-secondary">{s.descriptor}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
