"use client";

/**
 * The hero background: pipes growing through a lattice.
 *
 * This file is the gate and the mount. Everything about what is drawn is in
 * ./pipes.ts, which knows nothing about React.
 *
 * WHAT KEEPS IT FROM BEING A COST
 *
 *   - It never mounts under reduced motion, on a coarse pointer, on a narrow
 *     viewport, on a machine reporting little memory or few cores, on a
 *     metered connection, or without WebGL 2. That is the same gate the
 *     exploded stack uses, for the same reasons.
 *   - Three.js is imported from inside the effect, so it is fetched only
 *     once the gate has been passed.
 *   - The frame loop runs only while the hero is on screen. Scroll past it
 *     and it stops completely.
 *
 * With any of those no, this renders nothing at all and the hero is the
 * plain dark pane it was designed as. Nothing below it depends on this.
 */
import { useEffect, useRef, useState } from "react";
import type { Pipes as Scene } from "./pipeScene";
import { explain, hasWebGL2 } from "../motion/webgl";
import styles from "./Pipes.module.css";

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

export default function Pipes() {
  const host = useRef<HTMLDivElement>(null);
  /* Bumped whenever the size-and-pointer question changes its answer, which
     re-runs the setup below. The gate is asked once at mount, and a window
     that is narrow at that moment, or that reports no width at all while it
     is still opening, would otherwise never be asked again. */
  const [gate, setGate] = useState(0);

  useEffect(() => {
    const q = window.matchMedia("(min-width: 768px)");
    const onChange = () => setGate((n) => n + 1);
    q.addEventListener("change", onChange);
    return () => q.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const mount = host.current;
    if (!mount) return;
    if (!capable()) {
      explain("the hero pipes");
      return;
    }

    /* A NEW CANVAS EVERY MOUNT, not one written in the markup.
       Releasing a WebGL context leaves the canvas holding a dead one, and
       the next getContext on that same element hands the dead one back, so
       the second scene renders nothing at all. React mounts effects twice in
       development and Fast Refresh remounts them on every edit, so a canvas
       that outlives its context is a scene that works once. This one is
       created here and thrown away with the context it belongs to. */
    const el = document.createElement("canvas");
    el.className = styles.canvas;
    mount.appendChild(el);

    let scene: Scene | null = null;
    let io: IntersectionObserver | null = null;
    let ro: ResizeObserver | null = null;
    let cancelled = false;

    const accent =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--pida-action")
        .trim() || "#ff3616";

    (async () => {
      const { createPipes } = await import("./pipeScene");
      if (cancelled) return;

      scene = createPipes(el, accent);
      if (!scene) return;

      el.dataset.ready = "true";

      io = new IntersectionObserver(
        ([e]) => scene?.setRunning(e.isIntersecting),
        { threshold: 0 }
      );
      io.observe(el);

      ro = new ResizeObserver(() => scene?.resize());
      ro.observe(el);
    })();

    return () => {
      cancelled = true;
      io?.disconnect();
      ro?.disconnect();
      scene?.dispose();
      el.remove();
    };
  }, [gate]);

  return (
    <div className={styles.field} aria-hidden="true">
      <div ref={host} className={styles.host} />
      {/* The wash. The copy sits over this, and unmasked pipe behind a
          headline is the fastest way to make a hero unreadable. */}
      <span className={styles.veil} />
    </div>
  );
}
