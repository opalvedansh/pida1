"use client";

/**
 * The sheet, exploded. The scroll-bound half of the piece.
 *
 * A tall runway with a pinned pane inside it. The scrollbar drives one
 * value: the scene's separation from a single slab to three layers, one for
 * each thing PIDA does not do yet. The margin labels arrive as the layers
 * reach their places, which is the only thing on the page that is not the
 * drawing.
 *
 * The copy is the three plates of components/sheets/plan.ts said again: that
 * board named the same three and is left unused in the tree. If the two ever
 * disagree, plan.ts is the older one.
 *
 * WHAT HAPPENS WHEN IT CANNOT RUN
 *
 * The runway is only tall because this file makes it tall, and the labels
 * are only hidden because this file hides them. So under reduced motion,
 * with JavaScript off, or on a machine with no WebGL, the page is one
 * screen: the heading, the three labels, and no dead scrolling through a
 * pinned pane that never moves. C7.4 asks for exactly this.
 *
 * The scene itself is loaded on demand. Three.js is large and nothing else
 * on the site needs it at this route, so it is imported only once the pane
 * is about to be looked at.
 */
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Anatomy as Scene, PlateFocus } from "./scene";
import { explain, hasWebGL2 } from "../motion/webgl";
import styles from "./Anatomy.module.css";

/** Which margin each label sits in, top to bottom down the stack. */
export const LABELS = [
  {
    side: "left",
    tag: "Geometry",
    title: "3D model automation.",
  },
  {
    side: "right",
    tag: "Overpressure",
    title:
      "Automated relief scenario analysis, PSV calculation and package generation.",
  },
  {
    side: "left",
    tag: "Documents",
    title:
      "Assisted generation of the design basis, design criteria, material requisition and take-off.",
  },
] as const;

/* The separation finishes before the runway does, so the stack is held open
   while the labels arrive and for a beat after. */
const OPEN_AT = 0.7;

/**
 * The same gate the sheets board uses (C8.4), plus reduced motion. Any no
 * keeps the reader on the static layout: the heading and the three labels,
 * one screen, no runway and no WebGL context. A scrubbed 3D scene is not
 * something to hand a phone, and this component now sits on the home page
 * rather than only on a route someone chose to open.
 */
function capable(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  /* any-pointer, not pointer. A laptop with a touchscreen reports its
     PRIMARY pointer as coarse even with a mouse plugged in, so `pointer:
     fine` threw away a large share of real desktops: the scene simply never
     appeared for them. This asks whether a fine pointer exists at all. */
  /* 768, which is the breakpoint the rest of this site already turns on.
     It used to be 1024, and 1024 is a number a great many ordinary browser
     windows sit just under: a half-screen split, a laptop with a dock, a
     window nudged in from the edge. Every one of those got no scene at all
     and no way to know why. */
  if (!window.matchMedia("(min-width: 768px)").matches) return false;
  if (!window.matchMedia("(any-pointer: fine)").matches) return false;

  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
  };
  if (nav.connection?.saveData) return false;

  /* The memory and core-count checks that used to be here are gone. Chrome
     caps deviceMemory at 8 and rounds it down, and plenty of machines that
     run this comfortably report 4, so the checks were rejecting hardware on
     a number that does not mean what it looks like it means. */
  return hasWebGL2();
}

export default function Anatomy({
  id = "anatomy",
  headingLevel: H = "h1",
}: {
  id?: string;
  /** h1 on its own route, h2 where it sits inside the landing page. */
  headingLevel?: "h1" | "h2";
} = {}) {
  /* Bumped whenever the width question changes its answer, which re-runs the
     setup below. The gate is asked once at mount, and a window that is narrow
     at that moment, or that reports no width at all while it is still
     opening, would otherwise never be asked again. */
  const [gate, setGate] = useState(0);
  const runway = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const leader = useRef<SVGSVGElement>(null);
  const leaderLine = useRef<SVGPathElement>(null);
  const leaderHead = useRef<SVGPolygonElement>(null);

  useEffect(() => {
    const q = window.matchMedia("(min-width: 768px)");
    let was = q.matches;
    const ask = () => {
      if (q.matches === was) return;
      was = q.matches;
      setGate((n) => n + 1);
    };
    /* Both, and not just the first. A media query fires when the document
       crosses the boundary, which is the normal case, but a document that
       mounts inside a container with no size yet answers the width question
       with 0 and in some embedders never reports crossing anything
       afterwards: the section is gated off for the life of the page and the
       console says the window is 0px wide. The resize listener is the one
       that catches that, and it is cheap because it only bumps the gate on
       the frames where the answer actually changed. */
    q.addEventListener("change", ask);
    window.addEventListener("resize", ask);
    return () => {
      q.removeEventListener("change", ask);
      window.removeEventListener("resize", ask);
    };
  }, []);

  useEffect(() => {
    const runwayEl = runway.current;
    const canvasEl = canvas.current;
    const introEl = intro.current;
    if (!runwayEl || !canvasEl || !introEl) return;

    if (!capable()) {
      explain("the exploded stack");
      return;
    }

    let scene: Scene | null = null;
    let trigger: ScrollTrigger | null = null;
    let observer: ResizeObserver | null = null;
    let seen: IntersectionObserver | null = null;
    let tl: gsap.core.Timeline | null = null;
    let detach: (() => void) | null = null;
    let cancelled = false;

    const token = (name: string, fallback: string) =>
      getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim() || fallback;

    (async () => {
      const { createAnatomy } = await import("./scene");
      if (cancelled) return;

      /* COLD TO HOT, and nothing else different.
         `ink` is the only option passed. The plates are cut in
         --pida-ink-cold and heat to --pida-action under the pointer, which
         is what /plate was built to try out. `only` is deliberately absent,
         so this is still three plates on the runway with the same explode,
         the same leader, the same labels and the same timeline.

         What it buys is that the accent now means something here. Three
         plates sitting permanently in it made it the section's background
         colour; cold at rest, the only red in the drawing is the plate the
         reader is actually on. */
      scene = createAnatomy(canvasEl, token("--pida-action", "#ff3616"), {
        ink: token("--pida-ink-cold", "#dce3e8"),
      });
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

      /* THE LEADER, FROM THE WORDS TO THE CHIP
       *
       * The plate under the pointer is drawn to from the label that names
       * it: a stub out of the words, then a straight run to an arrow head on
       * the plate, which is how a leader is drawn on a real sheet. The scene
       * reports the plate's position every frame it moves, because the stack
       * is scroll-driven and the plate does not hold still, and this writes
       * it into two attributes. Nothing here touches React state: at
       * 60 frames a second that difference is the whole cost.
       *
       * The plates are decoration over labels that already say everything,
       * so they are not in the tab order and the canvas stays aria-hidden. A
       * reader who never finds them has missed no content. */
      const svg = leader.current;
      const line = leaderLine.current;
      const head = leaderHead.current;

      const draw = (f: PlateFocus | null) => {
        if (!svg || !line || !head) return;

        /* NO LEADER UNTIL THE WORDS ARE THERE.
           A leader joins a label to a plate, so it is meaningless while the
           label is still invisible, and that is exactly what it used to do:
           an arrow pointing out of blank space a third of the way through
           the stack opening. Gating on the scene's own progress did not work
           because the scene's progress and the timeline that fades the
           labels in are two different scales. This reads the one thing that
           actually matters. GSAP writes the opacity inline, so it is a
           property read and not a layout one. */
        const shown =
          f !== null && parseFloat(labels[f.layer]?.style.opacity || "1") > 0.9;

        labels.forEach((l, i) =>
          l.toggleAttribute("data-lit", shown && f !== null && f.layer === i)
        );
        if (!f || !shown) {
          svg.dataset.on = "off";
          return;
        }

        const pane = canvasEl.getBoundingClientRect();
        const box = labels[f.layer].getBoundingClientRect();
        const left = LABELS[f.layer].side === "left";
        const ax = (left ? box.right : box.left) - pane.left;
        const ay = box.top + box.height / 2 - pane.top;
        const sx = ax + (left ? 20 : -20);

        /* A LEADER, DRAWN THE WAY A DRAWING STANDARD DRAWS ONE.
           ISO 128 and ASME Y14.2 both describe the same figure and it is
           not the stepped path this used to draw. A leader is a short
           horizontal landing attached to the text, then ONE straight
           oblique line to the feature. The landing is horizontal, the
           oblique is at a set slope, and neither is ever vertical or
           horizontal on its own, because a leader parallel to the geometry
           reads as part of the geometry.

           The terminator is the other half of the convention: an arrow head
           where a leader lands on an edge or a line, a dot where it lands on
           a face. It ends on the edge of the plate, so it ends in an arrow.

           WHY THE EDGE AND NOT THE MIDDLE
           The scene used to report the plate's centre and this backed off a
           flat ninety-six pixels from it, which is not a rule, it is a
           number that happened to look right once. It put the arrow down in
           the middle of the face with the engraving underneath it, pointing
           at nothing in particular and covering the drawing it was meant to
           be introducing. The scene now reports the two sides of the plate's
           silhouette and the leader lands on the one facing its own label,
           so the arrow touches the edge and the face stays clear. */
        const dir = left ? 1 : -1;
        const tipX = left ? f.lx : f.rx;
        const tipY = left ? f.ly : f.ry;

        /* The oblique runs at 45 degrees, which is one of the three slopes
           the standards name, and the one that reads cleanest against an
           isometric. The landing takes up whatever is left. */
        const rise = tipY - ay;
        const oblique = Math.max(
          0,
          Math.min(Math.abs(rise), Math.abs(tipX - sx) - 24)
        );
        const kneeX = tipX - dir * oblique;
        const kneeY = tipY - Math.sign(rise) * oblique;

        line.setAttribute("d", `M${ax} ${ay}L${kneeX} ${kneeY}L${tipX} ${tipY}`);

        /* The head points along the segment it arrived on, which is the
           oblique whenever there is one and the landing when the label
           happens to sit level with the plate. */
        const flat = oblique < 0.5;
        const vx = tipX - (flat ? ax : kneeX);
        const vy = tipY - (flat ? ay : kneeY);
        const len = Math.hypot(vx, vy) || 1;
        const ux = vx / len;
        const uy = vy / len;
        const L = 13;
        const W = 4.2;
        const bx = tipX - ux * L;
        const by = tipY - uy * L;
        head.setAttribute(
          "points",
          `${tipX},${tipY} ${bx - uy * W},${by + ux * W} ${bx + uy * W},${
            by - ux * W
          }`
        );

        svg.dataset.on = f.held ? "held" : "on";
      };

      scene.onFocus(draw);

      const at = (e: PointerEvent) => {
        const r = canvasEl.getBoundingClientRect();
        return { x: e.clientX - r.left, y: e.clientY - r.top };
      };
      const onMove = (e: PointerEvent) => scene?.point(at(e));
      const onOut = () => scene?.point(null);
      const onPress = () => scene?.press();

      canvasEl.addEventListener("pointermove", onMove, { passive: true });
      canvasEl.addEventListener("pointerleave", onOut);
      canvasEl.addEventListener("click", onPress);

      /* The words are the other end of the leader, so hovering them lights
         the plate they name. Without this the reader has to find a plate
         with the pointer to discover that the two are connected at all. */
      const enters: Array<() => void> = [];
      labels.forEach((label, i) => {
        const on = () => scene?.focus(i);
        const off = () => scene?.focus(null);
        label.addEventListener("pointerenter", on);
        label.addEventListener("pointerleave", off);
        enters.push(() => {
          label.removeEventListener("pointerenter", on);
          label.removeEventListener("pointerleave", off);
        });
      });

      detach = () => {
        canvasEl.removeEventListener("pointermove", onMove);
        canvasEl.removeEventListener("pointerleave", onOut);
        canvasEl.removeEventListener("click", onPress);
        enters.forEach((off) => off());
        labels.forEach((l) => l.removeAttribute("data-lit"));
        if (svg) svg.dataset.on = "off";
      };

      observer = new ResizeObserver(() => scene?.resize());
      observer.observe(canvasEl);

      /* THE LOOP RUNS ONLY WHILE THE SECTION IS ON SCREEN.
         It used to run from the moment it mounted until the page was closed,
         so a reader sitting at the top of the page was driving a WebGL
         render every frame for a section they had not reached. On an
         integrated GPU, next to the hero's own context, that is enough to
         take the graphics driver down: Chrome cannot reset the device inside
         its sandbox, so it kills the GPU process instead, and after a few of
         those it turns acceleration off for good. */
      seen = new IntersectionObserver(
        ([e]) => scene?.setRunning(e.isIntersecting),
        { threshold: 0 }
      );
      seen.observe(canvasEl);

      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      detach?.();
      seen?.disconnect();
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
  }, [gate]);

  return (
    <section ref={runway} id={id} className={styles.runway}>
      <div className={styles.pane}>
        <canvas
          ref={canvas}
          className={styles.canvas}
          aria-hidden="true"
          /* The picture is decoration over text that already says all of
             this, so it is hidden from assistive technology rather than
             given a description that repeats the three labels. */
        />

        <div ref={intro} className={styles.intro}>
          <H className={`display-l wash ${styles.heading}`}>
            Coming
            <br />
            <span className="accent-word">soon</span>.
          </H>
        </div>

        {/* The leader. One path and one head, moved by the scene rather
            than re-rendered, and hidden until a chip is lit. */}
        <svg
          ref={leader}
          className={styles.leader}
          data-on="off"
          aria-hidden="true"
        >
          <path ref={leaderLine} className={styles.leaderLine} d="" />
          <polygon ref={leaderHead} className={styles.leaderHead} points="" />
        </svg>

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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
