"use client";

/**
 * The sheet, exploded. The scroll-bound half of the piece.
 *
 * A tall runway with a pinned pane inside it. The scrollbar drives one
 * value: the scene's separation from a single slab to four layers. The
 * margin labels arrive as the layers reach their places, which is the only
 * thing on the page that is not the drawing.
 *
 * WHAT HAPPENS WHEN IT CANNOT RUN
 *
 * The runway is only tall because this file makes it tall, and the labels
 * are only hidden because this file hides them. So under reduced motion,
 * with JavaScript off, or on a machine with no WebGL, the page is one
 * screen: the heading, the four labels, and no dead scrolling through a
 * pinned pane that never moves. C7.4 asks for exactly this.
 *
 * The scene itself is loaded on demand. Three.js is large and nothing else
 * on the site needs it at this route, so it is imported only once the pane
 * is about to be looked at.
 */
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Anatomy as Scene } from "./scene";
import styles from "./Anatomy.module.css";

/** Which margin each label sits in, top to bottom down the stack. */
const LABELS = [
  {
    side: "left",
    tag: "Cover",
    title: "The sheet as it prints.",
    body: "Border, title block and revision. What a drawing office receives, and the only layer anyone ever sees on paper.",
  },
  {
    side: "right",
    tag: "Routed model",
    title: "Every line, sized and tagged.",
    body: "Lines, valves and instruments carry their sizes and tags into a routed model, so the model and the drawing cannot describe two different plants.",
  },
  {
    side: "left",
    tag: "Flow paths",
    title: "Where the fluid can go.",
    body: "Every route through the plant, traced from the same connectivity the drawing was drawn from. A path that closes on nothing is flagged.",
  },
  {
    side: "right",
    tag: "Sheet base",
    title: "The drawing underneath.",
    body: "The P&ID itself. Every layer above it is derived from this one, which is why none of them can drift out of step with it.",
  },
] as const;

/* The separation finishes before the runway does, so the stack is held open
   while the labels arrive and for a beat after. */
const OPEN_AT = 0.7;

/**
 * The same gate the sheets board uses (C8.4), plus reduced motion. Any no
 * keeps the reader on the static layout: the heading and the four labels,
 * one screen, no runway and no WebGL context. A scrubbed 3D scene is not
 * something to hand a phone, and this component now sits on the home page
 * rather than only on a route someone chose to open.
 */
function capable(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (!window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches) {
    return false;
  }

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  if ((nav.deviceMemory ?? 8) <= 4) return false;
  if ((nav.hardwareConcurrency ?? 8) <= 4) return false;
  if (nav.connection?.saveData) return false;

  try {
    if (!document.createElement("canvas").getContext("webgl2")) return false;
  } catch {
    return false;
  }
  return true;
}

export default function Anatomy({
  id = "anatomy",
  headingLevel: H = "h1",
}: {
  id?: string;
  /** h1 on its own route, h2 where it sits inside the landing page. */
  headingLevel?: "h1" | "h2";
} = {}) {
  const runway = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const intro = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const runwayEl = runway.current;
    const canvasEl = canvas.current;
    const introEl = intro.current;
    if (!runwayEl || !canvasEl || !introEl) return;

    if (!capable()) return;

    let scene: Scene | null = null;
    let trigger: ScrollTrigger | null = null;
    let observer: ResizeObserver | null = null;
    let tl: gsap.core.Timeline | null = null;
    let cancelled = false;

    const accent =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--pida-action")
        .trim() || "#ff3616";

    (async () => {
      const { createAnatomy } = await import("./scene");
      if (cancelled) return;

      scene = createAnatomy(canvasEl, accent);
      /* No WebGL: leave the page exactly as the stylesheet rendered it. */
      if (!scene) return;

      gsap.registerPlugin(ScrollTrigger);

      /* Only now does the section become a runway, and only now is anything
         hidden. Both are undone by the teardown below. */
      runwayEl.dataset.anatomy = "on";
      canvasEl.dataset.ready = "true";

      const labels = gsap.utils.toArray<HTMLElement>(
        "[data-anatomy-label]",
        runwayEl
      );
      gsap.set(labels, {
        autoAlpha: 0,
        x: (i: number) => (LABELS[i].side === "left" ? -24 : 24),
      });

      tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: runwayEl,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
          invalidateOnRefresh: true,
          onUpdate: (self) =>
            scene?.setProgress(Math.min(1, self.progress / OPEN_AT)),
        },
      });

      tl
        /* The heading leaves as the slab starts to part, so the words and
           the drawing never compete for the same moment. */
        .to(introEl, { autoAlpha: 0, y: -24, duration: 0.16 }, 0.05)
        /* The labels arrive as the layers reach their places. */
        .to(
          labels,
          { autoAlpha: 1, x: 0, duration: 0.16, stagger: 0.05 },
          OPEN_AT - 0.12
        )
        /* A beat at the end, so the open stack is held rather than
           unpinning the instant it arrives. */
        .to({}, { duration: 0.12 }, 0.98);

      trigger = tl.scrollTrigger ?? null;

      observer = new ResizeObserver(() => scene?.resize());
      observer.observe(canvasEl);

      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      observer?.disconnect();
      trigger?.kill();
      tl?.kill();
      scene?.dispose();
      delete runwayEl.dataset.anatomy;
      delete canvasEl.dataset.ready;
      gsap.set([introEl, ...runwayEl.querySelectorAll("[data-anatomy-label]")], {
        clearProps: "opacity,visibility,transform",
      });
    };
  }, []);

  return (
    <section ref={runway} id={id} className={styles.runway}>
      <div className={styles.pane}>
        <canvas
          ref={canvas}
          className={styles.canvas}
          aria-hidden="true"
          /* The picture is decoration over text that already says all of
             this, so it is hidden from assistive technology rather than
             given a description that repeats the four labels. */
        />

        <div ref={intro} className={styles.intro}>
          <H className={`display-l wash ${styles.heading}`}>
            One sheet,
            <br />
            <span className="accent-word">four</span> layers.
          </H>
          <p className={`sub-headline ${styles.introSub}`}>
            Everything PIDA writes for a drawing comes out of one model. This
            is that model, taken apart.
          </p>
        </div>

        <div className={styles.margins}>
          {LABELS.map((l) => (
            <div
              key={l.tag}
              className={styles.label}
              data-side={l.side}
              data-anatomy-label
            >
              <p className={`mono-label ${styles.labelTag}`}>{l.tag}</p>
              <p className={styles.labelTitle}>{l.title}</p>
              <p className={styles.labelBody}>{l.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
