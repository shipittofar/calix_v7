import Link from "next/link";

/**
 * Public copy shown while no case studies are published (gate G1). Honest about
 * why, and turns the gap into a next step instead of an empty section.
 */
export function WorkGapNotice({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "" : "border-t border-espresso pt-6"}>
      <p className="measure">
        Our client case studies are being prepared with each client&apos;s approval, so we only show what they have
        confirmed. If you would like to see work relevant to your project, ask us when you get in touch.
      </p>
      <p className="mt-4">
        <Link href="/contact" className="link font-medium" data-cta="work-gap">
          Ask about relevant work
        </Link>
      </p>
    </div>
  );
}
