"use client";

/**
 * The cursor.
 *
 * DEVIATION. A6.10 says "No parallax, no scroll-jacking, no cursor effects",
 * and the anti-slop guidance this project is built against calls custom
 * cursors "accessibility-hostile, perf-hostile". Both are right often enough
 * that the shape of this one matters. It is here by an explicit decision.
 *
 * WHAT IT IS, AND WHY THIS SHAPE
 *
 * A drafting crosshair, not a blob that trails the pointer. Four short arms
 * and a square node, in the same vocabulary as the leaders and registration
 * marks already drawn on this page, so it reads as the instrument the rest of
 * the page is drawn with rather than as an ornament stuck on top. Over
 * anything interactive it opens into a registration frame around the target,
 * which is the one job a custom cursor can actually do better than the
 * native one: it says precisely what is about to be clicked.
 *
 * There is no coordinate readout and no trail. A readout would be decoration
 * dressed as instrumentation, and a trail is the thing that makes these feel
 * cheap.
 *
 * WHAT KEEPS IT FROM BEING HOSTILE
 *
 *   - It never mounts on a coarse pointer or under reduced motion.
 *   - The first Tab press removes it for the rest of the session and gives
 *     the native cursor back. Someone driving by keyboard has said, by
 *     driving with a keyboard, that they do not want this.
 *   - It is pointer-events: none throughout, so it can never eat a click.
 *   - The crosshair never leaves the pointer. The frame that opens around a
 *     target is a second element, because one element cannot be in both
 *     places and the reader needs the one under their hand.
 *   - The native cursor is restored over text selections and form fields,
 *     where the system cursor carries real information about what will
 *     happen and a crosshair would take that away. Restoring it means taking
 *     the attribute off the body, not just hiding this element: `cursor:
 *     none` is inherited, so hiding alone leaves no cursor at all.
 *   - Position is written straight to a transform inside one rAF loop. No
 *     React state is touched per frame, so it costs one composited layer and
 *     no re-render.
 */

import { useEffect, useRef } from "react";
import styles from "./Cursor.module.css";

/** Everything a click can land on, and so everything worth framing. */
const TARGETS = 'a[href], button, summary, [role="button"]';

/* A form label is clickable, but framing one puts an accent box round a
   584px by 18px strip of text, which reads as a validation error rather than
   as a target. It belongs with the running text instead. */
/** Where the system cursor says more than a crosshair can. */
const NATIVE =
  "input, textarea, select, label, p, li, h1, h2, h3, figcaption";

/* A frame says "this precise thing is about to be clicked". Past a certain
   size it stops saying that: a band the width of the page with a box round
   it is not precision, it is noise. Anything bigger keeps the crosshair,
   which is the part that matters, and loses the frame. */
const FRAME_MAX_W = 420;
const FRAME_MAX_H = 200;

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || calm.matches) return;

    const root = ref.current;
    const mark = markRef.current;
    const box = frameRef.current;
    if (!root || !mark || !box) return;

    const body = document.body;
    body.dataset.pidaCursor = "on";

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let frame = 0;
    let seen = false;
    /* The element being framed, not the rectangle it had when the pointer
       last moved. A cached rect is in viewport coordinates, so on a page
       that is mostly scrolling it slides off its target the moment the
       reader scrolls without moving the pointer. */
    let framed: Element | null = null;

    /* Hiding the crosshair is not enough to give the system cursor back:
       `cursor: none` sits on the body and every element inherits it, so over
       running text the reader was left with no cursor at all. The attribute
       has to come off, which is the same switch teardown throws. */
    const native = (hidden: boolean) => {
      if (hidden) body.dataset.pidaCursor = "on";
      else delete body.dataset.pidaCursor;
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      /* The first sighting snaps. Easing in from the middle of the window is
         a crosshair flying across the page at every page load. */
      if (!seen) {
        seen = true;
        x = tx;
        y = ty;
      }

      const el = e.target as Element | null;
      framed = el?.closest?.(TARGETS) ?? null;
      if (framed) {
        const box = framed.getBoundingClientRect();
        if (box.width > FRAME_MAX_W || box.height > FRAME_MAX_H) framed = null;
      }
      const quiet = !framed && !!el?.closest?.(NATIVE);
      root.dataset.state = framed ? "framed" : quiet ? "quiet" : "idle";
      native(!quiet);
    };

    const tick = () => {
      /* A small lag reads as weight. Any more and it stops feeling like an
         instrument and starts feeling like a toy chasing the pointer. */
      x += (tx - x) * 0.35;
      y += (ty - y) * 0.35;

      /* THE CROSSHAIR IS ON THE POINTER, ALWAYS.
         It used to be the same element as the registration frame, so over a
         link it flew off to sit on the link's middle and the reader was left
         with an outline round a button and no cursor anywhere. They are two
         elements now and only the frame ever leaves the pointer. */
      mark.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      if (framed && !framed.isConnected) {
        framed = null;
        root.dataset.state = "idle";
        native(true);
      }

      /* Read here rather than at pointermove, so the frame stays on its
         target while the page scrolls under a still pointer. It is one rect
         on one element, and only while something clickable is under the
         pointer. */
      const r = framed?.getBoundingClientRect();
      if (r) {
        box.style.transform = `translate3d(${r.left + r.width / 2}px, ${
          r.top + r.height / 2
        }px, 0) translate(-50%, -50%)`;
        box.style.setProperty("--w", `${r.width + 12}px`);
        box.style.setProperty("--h", `${r.height + 12}px`);
      }
      frame = requestAnimationFrame(tick);
    };

    /* Someone reaching for Tab is not using this. Give the native cursor
       back and stop the loop for good. */
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      teardown();
    };

    const onLeave = () => {
      root.dataset.state = "away";
    };
    const onEnter = () => {
      if (root.dataset.state === "away") root.dataset.state = "idle";
    };

    /* An arrow, not a hoisted declaration: a declaration could in principle
       run before the null guard above, so the compiler will not carry the
       guard's narrowing of `root` into its body. */
    let live = true;
    const teardown = () => {
      if (!live) return;
      live = false;
      cancelAnimationFrame(frame);
      /* Without this the crosshair is left painted where it last stopped,
         frozen, for the rest of the session. */
      root.dataset.state = "away";
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      delete body.dataset.pidaCursor;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    frame = requestAnimationFrame(tick);

    return teardown;
  }, []);

  return (
    <div ref={ref} className={styles.cursor} data-state="away" aria-hidden="true">
      {/* The crosshair. It is on the pointer in every state. */}
      <span ref={markRef} className={styles.mark} />
      {/* The registration frame. It is on the target, and only when there
          is one, so it adds a cue rather than taking the cursor away. */}
      <span ref={frameRef} className={styles.frame} />
    </div>
  );
}
