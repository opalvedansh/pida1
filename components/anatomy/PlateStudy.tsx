"use client";

/**
 * ONE PLATE, ON ITS OWN, SO THE ENGRAVING CAN BE LOOKED AT.
 *
 * The landing page shows three plates on a scroll runway, which is the right
 * way to show that they are one stack and the wrong way to judge how a single
 * one is drawn: the thing you want to look at is a third of a screen tall,
 * turning, and halfway through a timeline.
 *
 * So this is the same plate out of the same builder, printed large and held
 * still. Nothing here redraws anything. It asks createAnatomy for one plate
 * instead of three and for a resting ink; the symbols, the cut, the wordmark
 * and the lighting all come out of the file the landing page uses, so
 * whatever is changed there shows up here on the next reload.
 *
 * COLD TO HOT
 *
 * The plates on the landing page are cut in the accent and stay there. Here
 * the engraving is cut in --pida-ink-cold and heats to --pida-action under
 * the pointer: the albedo is tinted the whole way across and the emissive
 * comes up underneath it, so the drawing goes from a cold white print to a
 * lit red one rather than only gaining a glow on top of itself. Hovering the
 * words does the same thing, because a label and the plate it names are one
 * target.
 */
import { useEffect, useRef, useState } from "react";
import { LABELS } from "./Anatomy";
import { explain, hasWebGL2 } from "@/components/motion/webgl";
import type { Anatomy as Scene } from "./scene";
import styles from "./PlateStudy.module.css";

export default function PlateStudy() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const scene = useRef<Scene | null>(null);
  const [i, setI] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;

    if (!hasWebGL2()) {
      explain("the plate study");
      return;
    }

    let seen: ResizeObserver | null = null;
    let cancelled = false;

    const token = (name: string, fallback: string) =>
      getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim() || fallback;

    (async () => {
      const { createAnatomy } = await import("./scene");
      if (cancelled) return;

      const s = createAnatomy(el, token("--pida-action", "#ff3616"), {
        only: i,
        ink: token("--pida-ink-cold", "#dce3e8"),
      });
      if (!s) return;
      scene.current = s;

      /* No runway on this page, so the one input the scene still wants is
         pinned at the open end and left there. */
      s.setProgress(1);
      s.setRunning(true);
      setReady(true);

      seen = new ResizeObserver(() => s.resize());
      seen.observe(el);
    })();

    return () => {
      cancelled = true;
      seen?.disconnect();
      scene.current?.dispose();
      scene.current = null;
      setReady(false);
    };
  }, [i]);

  const label = LABELS[i];

  return (
    <main className={styles.page}>
      <div className={styles.stage}>
        <canvas
          ref={canvas}
          className={styles.canvas}
          data-ready={ready || undefined}
          aria-hidden="true"
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            scene.current?.point({
              x: e.clientX - r.left,
              y: e.clientY - r.top,
            });
          }}
          onPointerLeave={() => scene.current?.point(null)}
        />
      </div>

      <div className={styles.side}>
        <p className={`mono-label ${styles.eyebrow}`}>Plate study</p>

        <div
          className={styles.label}
          onPointerEnter={() => scene.current?.focus(0)}
          onPointerLeave={() => scene.current?.focus(null)}
        >
          <p className={`mono-label ${styles.tag}`}>{label.tag}</p>
          <p className={styles.title}>{label.title}</p>
        </div>

        <div className={styles.switcher} role="group" aria-label="Plate">
          {LABELS.map((l, n) => (
            <button
              key={l.tag}
              type="button"
              className={styles.pick}
              data-on={n === i || undefined}
              onClick={() => setI(n)}
            >
              {l.tag}
            </button>
          ))}
        </div>

        <p className={styles.note}>
          Cut in <span className={styles.cold}>cold ink</span> at rest, heated
          to <span className="accent-word">the accent</span> under the pointer.
        </p>
      </div>
    </main>
  );
}
