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
 *   - The native cursor is restored over text selections and form fields,
 *     where the system cursor carries real information about what will
 *     happen and a crosshair would take that away.
 *   - Position is written straight to a transform inside one rAF loop. No
 *     React state is touched per frame, so it costs one composited layer and
 *     no re-render.
 */

import { useEffect, useRef } from "react";
import styles from "./Cursor.module.css";

/** Everything a click can land on, and so everything worth framing. */
const TARGETS = 'a[href], button, summary, [role="button"], label[for]';
/** Where the system cursor says more than a crosshair can. */
const NATIVE = "input, textarea, select, p, li, h1, h2, h3, figcaption";

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || calm.matches) return;

    const root = ref.current;
    if (!root) return;

    const body = document.body;
    body.dataset.pidaCursor = "on";

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let frame = 0;
    let framed: DOMRect | null = null;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;

      const el = e.target as Element | null;
      const hit = el?.closest?.(TARGETS) ?? null;
      framed = hit ? hit.getBoundingClientRect() : null;
      root.dataset.state = hit
        ? "framed"
        : el?.closest?.(NATIVE)
          ? "quiet"
          : "idle";
    };

    const tick = () => {
      /* A small lag reads as weight. Any more and it stops feeling like an
         instrument and starts feeling like a toy chasing the pointer. */
      x += (tx - x) * 0.35;
      y += (ty - y) * 0.35;

      if (framed) {
        root.style.transform = `translate3d(${framed.left + framed.width / 2}px, ${
          framed.top + framed.height / 2
        }px, 0)`;
        root.style.setProperty("--w", `${framed.width + 12}px`);
        root.style.setProperty("--h", `${framed.height + 12}px`);
      } else {
        root.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        root.style.removeProperty("--w");
        root.style.removeProperty("--h");
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

    let live = true;
    function teardown() {
      if (!live) return;
      live = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      delete body.dataset.pidaCursor;
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    frame = requestAnimationFrame(tick);

    return teardown;
  }, []);

  return <div ref={ref} className={styles.cursor} data-state="away" aria-hidden="true" />;
}
