import Image from "next/image";
import type { CSSProperties } from "react";
import sprout from "@/assets/story/stage-04-sprout.png";
import { CHAPTER_SPANS, TOTAL, stepsFor } from "./beats";
import { SPROUT, stages } from "./stages";
import { StoryPlayer } from "./StoryPlayer";

/**
 * Static layout (reduced motion, no JavaScript): two thirds of the page on desktop, full width below.
 * Film: the photographs sit in a window beside the drawing (about 40% of a landscape screen, the
 * full width of a portrait one); the last one opens out to fill the stage.
 */
const STATIC_SIZES = ["(prefers-reduced-motion: reduce) and (min-width: 1200px) 66vw", "(prefers-reduced-motion: reduce) 100vw"];
const SIZES = [...STATIC_SIZES, "(orientation: portrait) 100vw", "50vw"].join(", ");
const SIZES_FULL = [...STATIC_SIZES, "100vw"].join(", ");

/**
 * "From one seed to an entire ecosystem": eight stages between the hero and the services sequence.
 *
 * Rendered as an ordered list of stages, each with its photograph(s), caption and the steps that
 * happen in it, readable as is. When motion is allowed (STORY_MOTION_QUERY), the root gets
 * data-story="on" and the story plays in a pinned stage: a drawing (plate.ts) shows each of the 82
 * steps in beats.ts happen, the photographs sit in a window beside it, and the caption names the
 * current step (StoryPlayer). Scrolling is never intercepted. See docs/olive-story.md.
 */
export function Story() {
  let shotIndex = 0;
  return (
    <section
      id="story"
      className="story"
      aria-labelledby="story-title"
      data-story-root
      style={{ "--story-length": TOTAL } as CSSProperties}
    >
      <div className="container-calix story__intro">
        <p className="type-label text-secondary">How a brand grows</p>
        <h2 id="story-title" className="mt-4">
          From one seed to an entire ecosystem.
        </h2>
        <p className="type-lead measure mt-6">
          Eight stages, from a single decision to a business that keeps growing from its own roots.
        </p>
        <p className="story__meta type-small text-secondary">
          <span>Illustrative sequence. Generated imagery, not client work.</span>
          <a href="#services" className="link">
            Skip to our services
          </a>
        </p>
      </div>

      <div className="story__track">
        <div className="story__stage">
          <div className="story__window" aria-hidden="true" />
          <div className="story__band" aria-hidden="true" />
          <ol className="story__stages">
            {stages.map((stage, si) => (
              <li key={stage.id} className="story__beat" data-beat={si} aria-labelledby={`story-${stage.id}`}>
                <div className="story__shots">
                  {stage.shots.map((shot) => {
                    const index = shotIndex++;
                    return (
                      <figure key={index} className="story__shot" data-shot={index}>
                        <div className="story__frame">
                          <Image
                            src={shot.image}
                            alt={shot.alt}
                            sizes={index === stages.flatMap((st) => st.shots).length - 1 ? SIZES_FULL : SIZES}
                            className="story__image"
                          />
                          {shot.sprout ? (
                            <Image
                              src={sprout}
                              alt=""
                              unoptimized
                              className="story__sprout"
                              style={{ left: `${SPROUT.left}%`, top: `${SPROUT.top}%`, width: `${SPROUT.width}%`, transformOrigin: SPROUT.origin }}
                            />
                          ) : null}
                        </div>
                      </figure>
                    );
                  })}
                </div>

                <div className="story__caption" data-caption={si}>
                  <p className="story__label">
                    <span className="story__num" aria-hidden="true">
                      {String(si + 1).padStart(2, "0")}
                    </span>
                    <span className="type-label">{stage.label}</span>
                  </p>
                  <h3 id={`story-${stage.id}`} className="story__title">
                    {stage.title}
                  </h3>
                  <p className="type-small">{stage.body}</p>
                  <p className="story__now type-small" aria-hidden="true" />
                  {stage.disciplines ? (
                    <ul className="story__disciplines type-small">
                      {stage.disciplines.map((d) => (
                        <li key={d} data-discipline>
                          {d}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {stage.systems ? (
                    <dl className="story__systems type-small">
                      {stage.systems.map((s) => (
                        <div key={s.term}>
                          <dt>
                            <abbr title={s.name}>{s.term}</abbr>
                            <span className="text-secondary"> · {s.name}</span>
                          </dt>
                          <dd>{s.text}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                  <ol className="story__steps type-small" aria-label={`What happens: ${stage.label}`}>
                    {stepsFor(si).map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </div>
              </li>
            ))}
          </ol>

          <div className="story__progress" aria-hidden="true">
            <span className="story__progress-rule" />
            {CHAPTER_SPANS.slice(1).map(([start]) => (
              <span key={start} className="story__tick" style={{ left: `${(start / TOTAL) * 100}%` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Bridge into S1: the idea grown here is what the services sequence carries through every piece. */}
      <div className="container-calix story__bridge">
        <p className="font-display text-[26px] leading-snug measure">
          One idea, planted once. What follows is how we carry it through every piece.
        </p>
      </div>

      <StoryPlayer />
    </section>
  );
}
