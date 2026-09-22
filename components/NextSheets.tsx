"use client";

/**
 * The sheets above the line.
 *
 * ONE ARRAY AND TWO NUMBERS DRAW THE WHOLE THING
 *
 * Nothing in this file is exported artwork. Every plate, leader, node and
 * label is an SVG path computed at run time from PLATES and from project(),
 * so the copy can be retyped, a fourth item added, or the projection changed,
 * without reopening a design file. The page weight is a few hundred bytes of
 * path data and it recolours by changing a token.
 *
 * 1. THE ARRAY. Each entry is one plate, one leader and one block of words.
 *    `lift` is how far it rises, in drawing units. `side` is which margin its
 *    words sit in. A fourth entry needs no other change here or in the CSS.
 *
 * 2. THE PROJECTION. A spreads the plates across the page, B decides how
 *    steeply they lie. Raise B and the view tips towards plan; lower it and
 *    the sheets flatten out. A plate is project() run over four corners; the
 *    drawing on each sheet is the same function run over a few more points,
 *    so the linework always lies in the plane of its own sheet.
 *
 * 3. SCROLL OPENS IT. One value runs 0 to 1 and multiplies every lift. At 0
 *    the sheets are one closed stack resting on the ground plane; at 1 they
 *    are apart. Because lift only shifts screen y, "part way open" is exactly
 *    "fully open, translated down by lift x (1 - t)". So the geometry is
 *    computed once at full lift and the opening is a CSS transform on three
 *    groups. No per-frame JavaScript, no scroll listener, nothing animated
 *    but transform and opacity. It opens when the section comes into view and
 *    stays open; never on hover, because a section that needs a pointer is
 *    invisible on a phone and to anyone who scrolls straight past.
 *
 *    The server renders it open. The client closes it before first paint and
 *    lets the observer open it, so with JavaScript off, or under reduced
 *    motion, the reader gets the finished drawing and no movement at all.
 *
 * 4. COMING SOON, DRAWN NOT STATED. The ground plane is solid and labelled
 *    with what the generator writes today. The three sheets above it are
 *    dashed, because none of them is drawn yet. That contrast is the whole
 *    argument of the section, so keep it: solid ground, dashed sheets. As
 *    each one ships it moves out of here into its own section and its edge
 *    turns solid. There is deliberately no date, no stage and no count
 *    anywhere in the copy: the edges carry it, the words do not claim it.
 *
 * 5. HOVER, FOCUS, KEYBOARD. Two states, not one. The pointer over a sheet or
 *    its words previews it; a click latches it, so it stays lit after the
 *    pointer leaves, and clicking the same one again lets it go. The words
 *    are real buttons, so Tab moves 01, 02, 03, focus previews and Enter
 *    latches. The SVG is one image to a screen reader and the buttons carry
 *    the meaning, so the faces inside it are pointer targets only.
 *
 * WHAT THIS DEVIATES FROM, AND WHY
 *
 *  - Palette and type come from tokens.css, not from the board this was drawn
 *    on. The accent lock allows one accent per page and the type lock allows
 *    four faces, and the board's own argument is that a drawing like this
 *    recolours by changing a token. So it does.
 *  - This is the one Client Component on the home page. The opening is CSS,
 *    but the latch is state and the observer is an observer. Everything else
 *    on the page still ships as a Server Component.
 */

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import styles from "./NextSheets.module.css";
import { useSheets3d } from "./sheets3d/useSheets3d";
import {
  A,
  Art,
  artworkPlan,
  B,
  GROUND_THICK,
  groundGridPlan,
  OVERHANG,
  PLATES,
  project,
  REST,
  S,
  Shape,
  Side,
  STUB,
  THICK,
  VB,
  Vec,
} from "./sheets/plan";

/* The array, the two numbers and the drawings now live in ./sheets/plan so
   the 3D renderer reads exactly the same source. Everything below is the
   SVG-specific half: turning plan points into path strings. */

/* ------------------------------------------------------------------ 2 */

const r = (n: number) => Math.round(n * 100) / 100;
const xy = (p: Vec) => `${r(p[0])} ${r(p[1])}`;

/** A polyline through plan points, all of it in the plane of one sheet. */
function poly(points: readonly Vec[], lift: number, close = false) {
  return (
    points.map((p, i) => `${i ? "L" : "M"}${xy(project(p[0], p[1], lift))}`).join("") +
    (close ? "Z" : "")
  );
}

const shapePath = (sh: Shape, lift: number) => poly(sh.pts, lift, sh.closed);

/** The four corners of a square plate, or of the ground plane. */
function face(lift: number, from = 0, to = S) {
  return poly(
    [
      [from, from],
      [to, from],
      [to, to],
      [from, to],
    ],
    lift,
    true
  );
}

/**
 * The thickness under a sheet: the two lower edges of the rhombus, dropped.
 * (S,S) is always the bottom corner, because screen y rises with x + y.
 */
function edge(lift: number, depth: number, from = 0, to = S) {
  const l = project(from, to, lift);
  const b = project(to, to, lift);
  const e = project(to, from, lift);
  const down = (p: Vec): Vec => [p[0], p[1] + depth];
  return `M${xy(l)}L${xy(b)}L${xy(e)}L${xy(down(e))}L${xy(down(b))}L${xy(down(l))}Z`;
}

/**
 * The leader out of a plate and into its margin: a stub at the sheet's own
 * angle, then a level run to the frame edge. Outward is a fall in plan x on
 * the left and in plan y on the right, which rises on screen either way.
 */
function leader(side: Side, lift: number) {
  const anchor = side === "left" ? project(0, S, lift) : project(S, 0, lift);
  const knee: Vec = [
    anchor[0] + (side === "left" ? -A * STUB : A * STUB),
    anchor[1] - B * STUB,
  ];
  const end: Vec = [side === "left" ? VB.x + 5 : VB.x + VB.w - 5, knee[1]];
  return {
    d: `M${xy(anchor)}L${xy(knee)}L${xy(end)}`,
    anchor,
    end,
    /** Where the words start, as a share of the frame height. */
    top: ((knee[1] - VB.y) / VB.h) * 100,
  };
}

/** A square, centred on a point already in frame coordinates. */
function square(p: Vec, size: number) {
  const h = size / 2;
  return `M${r(p[0] - h)} ${r(p[1] - h)}h${size}v${size}h${-size}Z`;
}

/** A square node, centred on a plan point, in the plane of its sheet. */
function node(p: Vec, lift: number, size = 4.6) {
  return square(project(p[0], p[1], lift), size);
}

/** A valve, as the bowtie a P&ID draws, sheared into the plane of its sheet. */
function bowtie(p: Vec, lift: number, w = 16, h = 11) {
  return poly(
    [
      [p[0] - w / 2, p[1] - h / 2],
      [p[0] + w / 2, p[1] + h / 2],
      [p[0] + w / 2, p[1] - h / 2],
      [p[0] - w / 2, p[1] + h / 2],
    ],
    lift,
    true
  );
}

function rect(a: Vec, b: Vec, lift: number) {
  return poly(
    [
      [a[0], a[1]],
      [b[0], a[1]],
      [b[0], b[1]],
      [a[0], b[1]],
    ],
    lift,
    true
  );
}

/** Thin linework and solid marks, as two path strings for two strokes. */
function artwork(art: Art, lift: number): [string, string] {
  const { lines, marks, nodes } = artworkPlan(art);
  return [
    lines.map((sh) => shapePath(sh, lift)).join(""),
    [
      ...marks.map((sh) => shapePath(sh, lift)),
      ...nodes.map((n) => node(n.p, lift, n.size)),
    ].join(""),
  ];
}

/** The lattice on the ground plane. Ruled, because the ground is real. */
function groundGrid(lift: number) {
  return groundGridPlan().map((sh) => shapePath(sh, lift)).join("");
}

/* ------------------------------------------------------------------ 3-5 */

/** useLayoutEffect, without the server warning. The close must beat paint. */
const useBeforePaint = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function NextSheets() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(true);
  const [hot, setHot] = useState<string | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const active = hot ?? picked;

  /* The scene, if this machine can have one. It reads the same PLATES array
     and the same projection as the SVG beside it, so the two agree exactly
     and the crossfade has nothing to line up. Returns false until the scene
     has rendered a frame, which is what keeps the SVG on screen meanwhile. */
  const dimensional = useSheets3d(
    stageRef,
    canvasRef,
    open ? 1 : 0,
    active,
    setHot
  );

  /**
   * Close the stack before the first paint, but only when there is something
   * to open. Two cases leave it open:
   *
   *   reduced motion, where the reader has asked for none of this;
   *   already on screen, where the reader is looking at the finished drawing
   *   and snapping it shut in front of them is worse than not animating.
   *
   * The second case also removes the race: nothing depends on an observer
   * callback arriving for a section the reader has already reached.
   */
  useBeforePaint(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return;
    setOpen(false);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setOpen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setOpen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    /* If the observer never reports, the reader would be left with a closed
       stack and no words at all. Six seconds, then open it regardless. */
    const failsafe = window.setTimeout(() => {
      setOpen(true);
      io.disconnect();
    }, 6000);
    return () => {
      window.clearTimeout(failsafe);
      io.disconnect();
    };
  }, []);

  const toggle = useCallback(
    (id: string) => setPicked((prev) => (prev === id ? null : id)),
    []
  );

  const stateOf = (id: string) => (!active ? "rest" : active === id ? "lit" : "dim");

  // Bottom sheet leads, so the stack peels upward from the ground.
  const order = [...PLATES].sort((a, b) => a.lift - b.lift);
  const stagger = (id: string) => order.findIndex((p) => p.id === id);

  const glow = `${uid}-glow`;

  return (
    <section id="next-sheets" className={`${styles.section} band`} data-theme="sunken">
      <div className="container">
        <header className={styles.head}>
          <h2 className="display-l wash" data-pida-reveal="text">
            Three sheets above the <span className="accent-word">line</span>.
          </h2>
          <p
            className={`sub-headline ${styles.headSub}`}
            data-pida-reveal="text"
          >
            The solid plane is what the generator writes today. Each sheet above it reads
            the same specification. None of them is drawn yet, and the edges say so.
          </p>
        </header>

        <div
          ref={rootRef}
          className={styles.board}
          data-phase={open ? "open" : "closed"}
          data-picked={picked ?? undefined}
        >
          {/* The stage is exactly as tall as the drawing, so a note placed at
              a share of its height lands on its own leader node. */}
          {/* Parallax, a deviation from A6.10. It is applied to the stage
              rather than to the drawing inside it, because the margin notes
              are positioned from the leader nodes' own coordinates: moving
              the SVG on its own would slide every leader off its words. The
              stage carries both, so they travel together and stay in
              register. */}
          <div className={styles.stage} data-pida-parallax="20">
            {/* The figure is the drawing's own cell in the stage grid, and
                the scene's box is that cell exactly. Both are built from the
                same plan coordinates, so the crossfade has nothing to line
                up. The leaders and the words stay in the SVG on top and are
                never redrawn in 3D, which is also what keeps them sharp,
                selectable and readable by assistive technology (C8.2). */}
            <div
              className={styles.figure}
              ref={stageRef}
              data-dimensional={dimensional ? "true" : undefined}
            >
              <canvas className={styles.canvas} ref={canvasRef} aria-hidden="true" />
            {/* The picture. It carries the alt text; the words are never inside
                it, so they stay selectable, translatable and reflowable. */}
            <svg
              className={styles.plan}
              viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
              role="img"
              aria-label="An axonometric drawing. A solid ruled ground plane carries the package the generator writes today. Three dashed sheets float above it, none of them drawn yet: a routed model, a relief case and a document set."
            >
              <defs>
                <filter id={glow} x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="24" />
                </filter>
              </defs>

              {/* The ground plane: solid, ruled, and labelled with what ships. */}
              <g className={styles.ground}>
                <path className={styles.groundEdge} d={edge(0, GROUND_THICK, -OVERHANG, S + OVERHANG)} />
                <path className={styles.groundFace} d={face(0, -OVERHANG, S + OVERHANG)} />
                <path className={styles.groundGrid} d={groundGrid(0)} />
                <path className={styles.groundLine} d={face(0, -OVERHANG, S + OVERHANG)} />
              </g>

              {/* Drawn bottom first, so the top of the closed stack is the sheet
                  that rises highest. */}
              {order.map((p) => {
                const lift = REST + p.lift;
                const [lines, marks] = artwork(p.art, lift);
                const lead = leader(p.side, lift);
                return (
                  <g
                    key={p.id}
                    className={styles.plate}
                    data-state={stateOf(p.id)}
                    style={
                      {
                        "--lift": `${r(p.lift)}px`,
                        "--i": stagger(p.id),
                      } as React.CSSProperties
                    }
                  >
                    {/* The sheet. This is the only thing that moves: closing
                        the stack is translateY(lift), because lift enters the
                        projection as nothing but a shift in screen y. */}
                    <g className={styles.sheet}>
                      <path className={styles.glow} d={face(lift)} filter={`url(#${glow})`} />
                      <path className={styles.thickness} d={edge(lift, THICK)} />
                      <path className={styles.sheetFace} d={face(lift)} />
                      <path className={styles.warm} d={face(lift)} />
                      <path className={styles.ink} d={lines} />
                      <path className={`${styles.ink} ${styles.inkSolid}`} d={marks} />
                      <path className={styles.sheetEdge} d={face(lift)} />
                      {/* The only pointer target in the drawing, so the sheet
                          on top never swallows the ones below it. */}
                      <path
                        className={styles.hit}
                        d={face(lift)}
                        onPointerEnter={() => setHot(p.id)}
                        onPointerLeave={() => setHot((h) => (h === p.id ? null : h))}
                        onClick={() => toggle(p.id)}
                      />
                    </g>

                    {/* The leader stays put and fades in behind its own sheet.
                        Its far end is fixed to the words, which are HTML, so
                        it must not ride the sheet up. */}
                    <path className={styles.leader} d={lead.d} />
                    <path className={styles.leaderNode} d={square(lead.end, 5)} />
                  </g>
                );
              })}
            </svg>
            </div>

            {/* The words. Real buttons, in the margins, one per sheet. */}
            {PLATES.map((p) => {
              const lead = leader(p.side, REST + p.lift);
              return (
                <button
                  key={p.id}
                  type="button"
                  className={styles.note}
                  data-side={p.side}
                  data-state={stateOf(p.id)}
                  aria-pressed={picked === p.id}
                  style={
                    {
                      "--top": `${r(lead.top)}%`,
                      "--i": stagger(p.id),
                    } as React.CSSProperties
                  }
                  onPointerEnter={() => setHot(p.id)}
                  onPointerLeave={() => setHot((h) => (h === p.id ? null : h))}
                  onFocus={() => setHot(p.id)}
                  onBlur={() => setHot((h) => (h === p.id ? null : h))}
                  onClick={() => toggle(p.id)}
                >
                  {/* The 01/02/03 ordinals are gone. Geometry, overpressure
                      and documents are not a sequence, so numbering them was
                      decoration, and the product rail above already owns the
                      numbered index on this page. The topic name is the
                      label; the leader says which sheet it belongs to. */}
                  <span className={styles.noteHead}>
                    <span className={`mono-label ${styles.noteTag}`}>{p.tag}</span>
                  </span>
                  <span className={styles.noteTitle}>{p.title}</span>
                  <span className={styles.noteBody}>{p.body}</span>
                </button>
              );
            })}
          </div>

          <p className={`mono-label ${styles.groundLabel}`}>
            Drawn today: the P&amp;ID, its independent check and the package beside it
          </p>
        </div>
      </div>
    </section>
  );
}
