/**
 * Illustrative plate drawings for the home page. They follow one specimen
 * brand ("Your brand") through each discipline. They are diagrams of method,
 * not client work, and contain no real results.
 */

import { Annotation } from "./Plate";

/**
 * The specimen mark. `anchor` marks the spot the travelling mark lands on in the
 * scroll sequence (components/home/SequenceController.tsx); elsewhere it is ignored.
 */
const Specimen = ({ className = "", anchor = false }: { className?: string; anchor?: boolean }) => (
  <span className={`specimen ${className}`} data-specimen-anchor={anchor ? "" : undefined}>
    Your brand
  </span>
);

/**
 * Stage 0: the problem. Five pieces made by different suppliers, each setting the
 * brand differently and sitting off the grid.
 */
export function ProblemDrawing() {
  const pieces = [
    { label: "Identity sheet", variant: "canonical", anchor: true },
    { label: "Website", variant: "caps" },
    { label: "Advert", variant: "light" },
    { label: "Search listing", variant: "plain" },
    { label: "Enquiry form", variant: "spaced" },
  ];
  return (
    <div className="drawing drawing--problem">
      {pieces.map((p, i) => (
        <div key={p.label} className={`fragment fragment--${i + 1}`}>
          <Specimen className={`specimen--variant-${p.variant}`} anchor={p.anchor} />
          <span className="type-annotation text-secondary">{p.label}</span>
        </div>
      ))}
    </div>
  );
}

export function IdentityDrawing() {
  return (
    <div className="drawing drawing--identity">
      <div className="identity__dimension type-annotation">
        <span>Clear space = cap height</span>
      </div>
      <div className="identity__mark">
        <Specimen className="specimen--large" anchor />
      </div>
      <div className="identity__swatches">
        <span className="swatch bg-espresso" />
        <span className="swatch bg-olive" />
        <span className="swatch bg-gold" />
        <span className="swatch bg-ivory" />
      </div>
      <Annotation className="identity__note">Minimum size 24 px</Annotation>
    </div>
  );
}

function PageSketch({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`page-sketch ${compact ? "page-sketch--compact" : ""}`}>
      <div className="page-sketch__nav">
        <Specimen className="specimen--small" anchor={!compact} />
        {!compact && (
          <span className="page-sketch__links">
            <i />
            <i />
            <i />
          </span>
        )}
      </div>
      <div className="page-sketch__hero">
        <i className="bar bar--heading" />
        <i className="bar bar--heading bar--short" />
        <i className="bar bar--text" />
        <i className="bar bar--cta" />
      </div>
      <div className="page-sketch__media">
        <i />
        {!compact && <i />}
      </div>
    </div>
  );
}

export function DeviceDrawing() {
  return (
    <div className="drawing drawing--device">
      <div className="browser">
        <div className="browser__bar">
          <i />
          <i />
          <i />
          <span className="browser__address" />
        </div>
        <PageSketch />
      </div>
      <div className="phone">
        <PageSketch compact />
      </div>
      <Annotation className="device__note hidden md:inline-flex">Desktop 1440 and mobile 390, same content order</Annotation>
    </div>
  );
}

export function SystemDrawing() {
  const nodes = [
    { title: "Interface", note: "Accessible, responsive front end" },
    { title: "Application", note: "Server rendering, forms, integrations" },
    { title: "Content and data", note: "Structured, validated content" },
  ];
  return (
    <div className="drawing drawing--system">
      <ol className="system__row">
        {nodes.map((n) => (
          <li key={n.title} className="system__node">
            <span className="system__title">{n.title}</span>
            <span className="type-annotation">{n.note}</span>
          </li>
        ))}
      </ol>
      <div className="system__base">
        <span className="type-annotation">Measured: performance, accessibility, search structure</span>
      </div>
    </div>
  );
}

export function FormatsDrawing() {
  const formats = [
    { ratio: "1:1", className: "format--square" },
    { ratio: "4:5", className: "format--portrait" },
    { ratio: "9:16", className: "format--story" },
  ];
  return (
    <div className="drawing drawing--formats">
      <div className="formats__row">
        {formats.map((f, i) => (
          <div key={f.ratio} className="format-cell">
            <div className={`format ${f.className}`}>
              <Specimen className="specimen--small" anchor={i === 0} />
              <i className="bar bar--heading" />
              <i className="bar bar--cta" />
            </div>
            <span className="type-annotation">{f.ratio}</span>
          </div>
        ))}
      </div>
      <div className="format-cell">
        <div className="format format--banner">
          <Specimen className="specimen--small" />
          <i className="bar bar--heading" />
          <i className="bar bar--cta" />
        </div>
        <span className="type-annotation">728 × 90 banner</span>
      </div>
    </div>
  );
}

export function AnswerDrawing() {
  return (
    <div className="drawing drawing--answer">
      <div className="answer__query">Who designs brand identities and websites for growing businesses?</div>
      <div className="answer__result">
        <Specimen className="specimen--small" anchor />
        <p className="answer__title">Page title that states what the page answers</p>
        <p className="type-annotation text-secondary">domain / services / brand-strategy-identity</p>
        <p className="answer__definition">
          Opening definition: who you are, what you do and who it is for, in the first lines.
        </p>
        <p className="answer__tags">
          <span>Structured data</span>
          <span>Entity: Organization</span>
          <span>Named author</span>
        </p>
      </div>
    </div>
  );
}

export function JourneyDrawing() {
  const steps = [
    { title: "Search or AI answer", measure: "Visibility" },
    { title: "Service page", measure: "Engagement" },
    { title: "Proof", measure: "Case-study views" },
  ];
  return (
    <div className="drawing drawing--journey">
      <ol className="journey__row">
        {steps.map((s) => (
          <li key={s.title} className="journey__step">
            <span className="journey__title">{s.title}</span>
            <span className="type-annotation">Measured: {s.measure}</span>
          </li>
        ))}
        <li className="journey__step journey__step--goal">
          <span className="journey__title">Enquiry</span>
          <Specimen className="specimen--small" anchor />
          <span className="journey__form">
            <i className="bar bar--field" />
            <i className="bar bar--field" />
            <i className="bar bar--cta" />
          </span>
          <span className="type-annotation">Measured: qualified enquiries</span>
        </li>
      </ol>
    </div>
  );
}
