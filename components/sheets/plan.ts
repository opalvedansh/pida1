/**
 * The sheets, in plan.
 *
 * This is the single source the section is built on, and the reason the
 * argument in NextSheets.tsx survives the arrival of a 3D renderer: the array
 * and the two numbers did not move. Both renderers read this file.
 *
 *   the SVG renderer  projects these points with project() and writes paths;
 *   the 3D renderer   lifts the same points into a scene and lets an
 *                     orthographic camera do the projecting.
 *
 * Axonometric *is* orthographic, so the two agree by construction rather than
 * by being tuned against each other. Change a lift here, or add a fourth
 * plate, and both pictures change together.
 *
 * Node marks are deliberately not here. In the SVG they are screen-aligned
 * squares a few pixels across; in the scene they are small plates lying in
 * the sheet. Each renderer draws its own, because a plan-space square that
 * looks right in one looks wrong in the other.
 */

export type Vec = readonly [number, number];
export type Side = "left" | "right";
export type Art = "model" | "relief" | "docs";

/** A run of plan-space points. `closed` joins the last point back to the first. */
export type Shape = { pts: Vec[]; closed?: boolean };

/* ------------------------------------------------------------- the array */

export const PLATES: {
  id: string;
  lift: number;
  side: Side;
  n: string;
  tag: string;
  art: Art;
  title: string;
  body: string;
}[] = [
  {
    id: "model",
    lift: 230,
    side: "left",
    n: "01",
    tag: "Geometry",
    art: "model",
    title: "The routed model, from the same sheet.",
    body: "Lines, valves and instruments carry their sizes and tags into a routed model, so the model and the drawing cannot describe two different plants.",
  },
  {
    id: "relief",
    lift: 115,
    side: "right",
    n: "02",
    tag: "Overpressure",
    art: "relief",
    title: "Relief cases, on the sheet's own facts.",
    body: "The vessel, the fluid and the case are already on the drawing. The sizing is worked against the standards PIDA holds, with the clause and page beside each number.",
  },
  {
    id: "docs",
    lift: 0,
    side: "left",
    n: "03",
    tag: "Documents",
    art: "docs",
    title: "The document set, out of the same model.",
    body: "Datasheets, the sheet index and the cause and effect matrix, all written from the model the drawing came from. No number is kept in step by hand.",
  },
];

/* --------------------------------------------------------- the two numbers */

export const A = 0.95; // spread across the page
export const B = 0.3; // how steeply the sheets lie
export const S = 250; // plate side, in drawing units
export const CX = 640; // where it sits
export const CY = 300;

/** The stack rests on its own thickness, so lift 0 is not inside the ground. */
export const REST = 34;
/** The visible edge thickness under a sheet, and under the ground plane. */
export const THICK = 13;
export const GROUND_THICK = 7;
/** How far the ground plane runs past the sheets, in plan units. */
export const OVERHANG = 50;
/** How far a leader's first run travels along its own axis, in plan units. */
export const STUB = 46;

/** The frame the drawing is cut to. */
export const VB = { x: 285, y: 18, w: 710, h: 490 };

export function project(x: number, y: number, lift: number): Vec {
  return [CX + (x - y) * A, CY + (x + y) * B - lift];
}

/* ------------------------------------------------------------ the drawings */

const rect = (a: Vec, b: Vec): Shape => ({
  pts: [
    [a[0], a[1]],
    [b[0], a[1]],
    [b[0], b[1]],
    [a[0], b[1]],
  ],
  closed: true,
});

const line = (...pts: Vec[]): Shape => ({ pts });

/** A valve, as a P&ID draws it: the bowtie, lying in the plane of its sheet. */
const bowtie = (p: Vec, w = 16, h = 11): Shape => ({
  pts: [
    [p[0] - w / 2, p[1] - h / 2],
    [p[0] + w / 2, p[1] + h / 2],
    [p[0] + w / 2, p[1] - h / 2],
    [p[0] - w / 2, p[1] + h / 2],
  ],
  closed: true,
});

/** Thin linework and solid marks, kept apart so each takes its own stroke. */
export function artworkPlan(art: Art): {
  lines: Shape[];
  marks: Shape[];
  nodes: { p: Vec; size: number }[];
} {
  if (art === "model") {
    // A route between two equipment footprints, with a branch off the elbow.
    return {
      lines: [
        rect([28, 96], [72, 140]),
        rect([150, 26], [206, 66]),
        line([72, 118], [118, 118], [118, 46], [150, 46]),
        line([118, 118], [118, 190], [206, 190]),
      ],
      marks: [],
      /* The elbows are the bigger squares, the nozzles the smaller ones. */
      nodes: [
        { p: [118, 118], size: 4.6 },
        { p: [118, 46], size: 4.6 },
        { p: [118, 190], size: 4.6 },
        { p: [72, 118], size: 3.4 },
        { p: [206, 190], size: 3.4 },
      ],
    };
  }

  if (art === "relief") {
    // A vessel, its relief header, two valves and the line off the sheet.
    return {
      lines: [
        rect([40, 150], [104, 214]),
        line([72, 150], [72, 64], [212, 64]),
        line([196, 50], [212, 64], [196, 78]),
      ],
      marks: [bowtie([72, 104]), bowtie([140, 64])],
      nodes: [{ p: [72, 150], size: 3.4 }],
    };
  }

  // A ruled document: a header band, one column split, four rows of entries.
  const rows = [96, 126, 156, 186];
  return {
    lines: [
      rect([30, 34], [220, 216]),
      line([30, 66], [220, 66]),
      line([118, 66], [118, 216]),
      ...rows.map((y) => line([30, y], [220, y])),
      /* The entries. These used to sit in the filled group, where they drew
         nothing at all: a two-point open path with a fill and no stroke has
         no area. They are stroked linework and belong here. */
      ...rows.map((y) => line([42, y - 15], [104, y - 15])),
    ],
    marks: [],
    nodes: [],
  };
}

/** The lattice on the ground plane. Ruled, because the ground is real. */
export function groundGridPlan(): Shape[] {
  const from = -OVERHANG;
  const to = S + OVERHANG;
  const step = (to - from) / 8;
  const out: Shape[] = [];
  for (let i = 1; i < 8; i += 1) {
    const v = from + step * i;
    out.push(line([v, from], [v, to]));
    out.push(line([from, v], [to, v]));
  }
  return out;
}
