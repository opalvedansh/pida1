"use client";

/**
 * The fallback ladder for the sheet stack.
 *
 * C8.4 is written for a different scene in a different section, but its
 * ladder is the right shape for any 3D on this site and is followed here:
 *
 *   1. the SVG is always rendered first, and is the result without
 *      JavaScript, on a phone, on a tired laptop and under reduced motion;
 *   2. the scene mounts only on a capable desktop, when the section is
 *      within 300 px of the viewport and the main thread has gone idle;
 *   3. the SVG stays visible until the scene reports its first rendered
 *      frame, and only then do the two crossfade;
 *   4. if the scene has not rendered within six seconds, or throws, the SVG
 *      stays and nothing about the failure is shown to the reader.
 *
 * Three.js is behind a dynamic import, so it is in its own chunk and never
 * enters the first load. C14 excludes the 3D scene from the JavaScript gate
 * on exactly that condition.
 */

import { useEffect, useState, type RefObject } from "react";
import type { SheetsScene } from "./Scene";

/** C8.4's gate, plus reduced motion. Any no keeps the reader on the SVG. */
function capable(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (!window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches) return false;

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  if ((nav.deviceMemory ?? 8) <= 4) return false;
  if ((nav.hardwareConcurrency ?? 8) <= 4) return false;
  if (nav.connection?.saveData) return false;
  if (nav.connection?.effectiveType && !/4g/.test(nav.connection.effectiveType)) {
    return false;
  }

  try {
    const probe = document.createElement("canvas");
    if (!probe.getContext("webgl2")) return false;
  } catch {
    return false;
  }
  return true;
}

function idle(fn: () => void, timeout: number) {
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
  };
  if (typeof w.requestIdleCallback === "function") {
    w.requestIdleCallback(fn, { timeout });
  } else {
    window.setTimeout(fn, 1);
  }
}

export function useSheets3d(
  hostRef: RefObject<HTMLDivElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  explode: number,
  active: string | null,
  onPick: (id: string | null) => void
) {
  const [scene, setScene] = useState<SheetsScene | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas || !capable()) return;

    let cancelled = false;
    let made: SheetsScene | null = null;
    let timeout = 0;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        idle(() => {
          if (cancelled) return;
          /* Six seconds, then give up quietly and stay on the SVG. */
          timeout = window.setTimeout(() => {
            if (!ready) made?.dispose();
          }, 6000);

          import("./Scene")
            .then(({ mountScene }) => {
              if (cancelled) return;
              try {
                made = mountScene(canvas, host, () => {
                  window.clearTimeout(timeout);
                  if (!cancelled) setReady(true);
                });
                setScene(made);
              } catch (err) {
                console.warn("[sheets] scene threw on mount:", err);
              }
            })
            .catch((err) => {
              /* Nothing is shown to the visitor (A6.15), but C8.4 asks for
                 the reason on the console so a failure is diagnosable in
                 staging rather than silent everywhere. */
              console.warn("[sheets] scene did not mount:", err);
            });
        }, 2000);
      },
      { rootMargin: "300px" }
    );
    io.observe(host);

    const onResize = () => made?.resize();
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      made?.dispose();
      setScene(null);
      setReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scene?.onPick(onPick);
  }, [scene, onPick]);

  useEffect(() => {
    scene?.setExplode(explode);
  }, [scene, explode]);

  useEffect(() => {
    scene?.setActive(active);
  }, [scene, active]);

  return ready;
}
