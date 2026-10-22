import Link from "next/link";
import type { ReactNode } from "react";
import { primaryCta } from "@/content/site";
import { services, type PlateKind } from "@/content/services";
import { Plate } from "@/components/plate/Plate";
import {
  AnswerDrawing,
  DeviceDrawing,
  FormatsDrawing,
  IdentityDrawing,
  JourneyDrawing,
  ProblemDrawing,
  SystemDrawing,
} from "@/components/plate/drawings";
import { SequenceController } from "./SequenceController";

const drawings: Record<PlateKind | "problem", () => React.JSX.Element> = {
  problem: ProblemDrawing,
  identity: IdentityDrawing,
  device: DeviceDrawing,
  formats: FormatsDrawing,
  answer: AnswerDrawing,
  journey: JourneyDrawing,
};

type Stage = {
  id: string;
  label?: string;
  heading: string;
  body: string;
  included?: string[];
  cta?: { label: string; href: string };
  servicePage?: { label: string; href: string };
  plate: { kind: PlateKind | "problem"; caption: string; fact: string };
  railLabel?: string;
};

const railLabels: Record<string, string> = {
  brand: "Brand",
  web: "Digital",
  marketing: "Marketing",
  seo: "Discoverability",
  growth: "Growth",
};

const stages: Stage[] = [
  {
    id: "services",
    heading: "Most brands are built in pieces.",
    body: "A logo from one studio, a website from another, campaigns and search from someone else. Each piece drifts further from the last. We plan them as one line of thought.",
    plate: { kind: "problem", caption: "Built in pieces", fact: "Five suppliers, five versions of one brand" },
  },
  ...services.map((s) => ({
    id: s.anchor,
    label: s.name,
    heading: s.heading,
    body: s.body,
    included: s.included,
    cta: s.cta,
    servicePage: { label: `See ${s.name}`, href: `/services/${s.slug}` },
    plate: s.plate,
    railLabel: railLabels[s.key],
  })),
];

/**
 * Scroll narrative S1, "One brand, carried through" (docs/scroll-narrative.md §4.1).
 *
 * Rendered as a static layout: every stage has its own plate. When motion is
 * allowed (wide, tall viewport; no reduced-motion preference; JavaScript), the
 * root gets data-motion="on" before first paint: static plates hide, and one
 * sticky plate shows the stage being read, with the specimen mark travelling
 * between drawings. Scrolling itself is never intercepted.
 */
export function Sequence() {
  return (
    <div className="sequence container-calix" data-sequence>
      {/* First in DOM order so the stage navigation precedes the stages for keyboard users. */}
      <div className="sequence__plate" data-stage="0" data-nosnippet>
        <nav aria-label="Disciplines in this sequence">
          <ol className="sequence__rail">
            {stages.map((stage, i) =>
              stage.railLabel ? (
                <li key={stage.id}>
                  <a href={`#${stage.id}`} data-rail={i}>
                    {stage.railLabel}
                  </a>
                </li>
              ) : null,
            )}
          </ol>
        </nav>
        <div className="sequence__field" aria-hidden="true">
          {stages.map((stage, i) => {
            const Drawing = drawings[stage.plate.kind];
            return (
              <div key={stage.id} className={`sequence__layer${i === 0 ? " is-active" : ""}`} data-layer={i}>
                <Drawing />
              </div>
            );
          })}
          <span className="sequence__traveller specimen">Your brand</span>
        </div>
        <div className="sequence__caption" aria-hidden="true">
          {stages.map((stage, i) => (
            <p key={stage.id} className={`sequence__caption-item${i === 0 ? " is-active" : ""}`} data-caption={i}>
              <span className="type-label">{stage.plate.caption}</span>
              <span className="type-annotation text-secondary">
                {stage.plate.fact}. Illustration, not client work
              </span>
            </p>
          ))}
        </div>
      </div>

      <div className="sequence__stages">
        {stages.map((stage, i) => (
          <StageBlock key={stage.id} stage={stage} index={i} />
        ))}
        {/* Bridge from GROWTH to PROOF: the journey just drawn runs through proof. */}
        <div className="sequence__close">
          <p className="font-display text-[26px] leading-snug">Every enquiry journey runs through proof.</p>
          <p className="sequence__close-links">
            <Link href="/#work" className="link">
              See selected work
            </Link>
            <Link href={primaryCta.href} className="link">
              {primaryCta.label}
            </Link>
          </p>
        </div>
      </div>

      <SequenceController />
    </div>
  );
}

function StageBlock({ stage, index }: { stage: Stage; index: number }) {
  const Drawing = drawings[stage.plate.kind];
  const titleId = `${stage.id}-title`;
  return (
    <section id={stage.id} aria-labelledby={titleId} className="stage" data-stage-index={index}>
      <div className="stage__text">
        {stage.label ? <p className="type-label text-secondary">{stage.label}</p> : null}
        <h2 id={titleId} className={stage.label ? "mt-4" : undefined}>
          {stage.heading}
        </h2>
        <p className={index === 0 ? "type-lead mt-6 measure" : "mt-6 measure"}>{stage.body}</p>
        {stage.included ? (
          <ul className="rule-list mt-8 type-small">
            {stage.included.map((item) => (
              <li key={item} className="py-3">
                {item}
              </li>
            ))}
          </ul>
        ) : null}
        {stage.cta ? (
          <p className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <Link href={stage.cta.href} className="link font-medium" data-cta="sequence">
              {stage.cta.label}
            </Link>
            {stage.servicePage ? (
              <Link href={stage.servicePage.href} className="link">
                {stage.servicePage.label}
              </Link>
            ) : null}
          </p>
        ) : null}
        {stage.plate.kind === "device" ? (
          // Shown here only in the sticky layout, where the plate column holds one drawing at a time.
          <div className="stage__support">
            <Plate caption="System structure" fact="How a custom build is organised" size="support">
              <SystemDrawing />
            </Plate>
          </div>
        ) : null}
      </div>

      <StaticPlates stage={stage}>
        <Drawing />
      </StaticPlates>
    </section>
  );
}

function StaticPlates({ stage, children }: { stage: Stage; children: ReactNode }) {
  return (
    <div className="stage__plate-static">
      <Plate caption={stage.plate.caption} fact={stage.plate.fact}>
        {children}
      </Plate>
      {stage.plate.kind === "device" ? (
        <div className="mt-10">
          <Plate caption="System structure" fact="How a custom build is organised" size="support">
            <SystemDrawing />
          </Plate>
        </div>
      ) : null}
    </div>
  );
}
