import type { ReactNode } from "react";
import { isPending, type Pending as PendingValue } from "@/content/site";
import { showInternalPlaceholders } from "@/lib/display";

/** Inline marker for a fact CALIX has not supplied yet. Listed in docs/content-gaps.md. */
export function Pending({ value }: { value: PendingValue }) {
  return (
    <span className="pending" data-pending={value.label} title="Content placeholder: to be supplied by CALIX">
      [{value.label.toLowerCase()} to be confirmed]
    </span>
  );
}

/**
 * Renders a supplied fact, an internal marker while it is missing (development
 * and previews), or the public fallback (production). The fallback must be true
 * without the missing fact; it never invents one.
 */
export function Fact({
  value,
  render,
  fallback = null,
}: {
  value: PendingValue | string;
  render: (value: ReactNode) => ReactNode;
  fallback?: ReactNode;
}) {
  if (!isPending(value)) return <>{render(value)}</>;
  return <>{showInternalPlaceholders ? render(<Pending value={value} />) : fallback}</>;
}

/** Block-level, clearly labelled placeholder for missing content. In production, `publicFallback` is shown instead. */
export function ContentPlaceholder({
  title,
  needed,
  children,
  publicFallback = null,
  alwaysShow = false,
}: {
  title: string;
  needed: string[];
  children?: ReactNode;
  publicFallback?: ReactNode;
  /** For gaps that must stay visible even in production (for example the legal privacy notice). */
  alwaysShow?: boolean;
}) {
  if (!showInternalPlaceholders && !alwaysShow) return <>{publicFallback}</>;
  return (
    <div className="placeholder-block" data-placeholder={title}>
      <p className="type-label text-secondary">Content placeholder</p>
      <p className="mt-3 font-display text-[26px] leading-tight">{title}</p>
      {children ? <div className="mt-3 type-small measure">{children}</div> : null}
      <p className="mt-5 type-small font-medium">To be supplied:</p>
      <ul className="mt-2 type-small list-disc pl-5">
        {needed.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
