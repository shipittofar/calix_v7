import type { ReactNode } from "react";

/**
 * A plate presents one piece of work or one idea (docs/art-direction.md §3).
 * Illustrative plates are marked as such in the caption and hidden from
 * assistive technology; the surrounding text carries the meaning.
 */
export function Plate({
  caption,
  fact,
  illustrative = true,
  size = "lead",
  children,
}: {
  caption: string;
  fact?: string;
  illustrative?: boolean;
  size?: "lead" | "support";
  children: ReactNode;
}) {
  return (
    <figure className={`plate plate--${size}`}>
      <div
        className="plate__field"
        aria-hidden={illustrative ? true : undefined}
        data-nosnippet={illustrative ? true : undefined}
      >
        {children}
      </div>
      <figcaption className="plate__caption">
        <span className="type-label">{caption}</span>
        <span className="type-annotation text-secondary">
          {[fact, illustrative ? "Illustration, not client work" : null].filter(Boolean).join(". ")}
        </span>
      </figcaption>
    </figure>
  );
}

export function Annotation({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`annotation type-annotation ${className}`}>
      <span className="annotation__leader" />
      <span className="annotation__text">{children}</span>
    </span>
  );
}
