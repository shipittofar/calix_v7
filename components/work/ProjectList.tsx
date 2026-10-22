import Link from "next/link";
import type { Project } from "@/content/work";
import { serviceByKey } from "@/content/services";

const publicationLabel = (p: Project) => (p.publication === "C" ? "Concept" : null);

/** Hairline list of projects. Text only until approved project imagery exists. */
export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ul className="rule-list">
      {projects.map((p) => (
        <li key={p.slug} className="py-8">
          <article className="grid gap-3 md:grid-cols-[minmax(0,1fr)_16rem] md:gap-x-10">
            <div>
              {publicationLabel(p) ? <p className="type-label text-secondary">{publicationLabel(p)}</p> : null}
              <h3 className="mt-1">
                <Link href={`/work/${p.slug}`} className="no-underline hover:underline">
                  {p.publication === "P1" && p.client ? p.client.name : p.title}
                </Link>
              </h3>
              <p className="mt-2 measure">{p.summary}</p>
              <p className="mt-4">
                <Link href={`/work/${p.slug}`} className="link font-medium">
                  See the project
                </Link>
              </p>
            </div>
            <dl className="type-small grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 self-start text-secondary">
              <dt>Industry</dt>
              <dd>{p.industry}</dd>
              <dt>Services</dt>
              <dd>{p.services.map((k) => serviceByKey(k).name).join(", ")}</dd>
              <dt>Year</dt>
              <dd>{p.year}</dd>
            </dl>
          </article>
        </li>
      ))}
    </ul>
  );
}
