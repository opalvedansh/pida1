/**
 * The sheet, exploded. A framework-free Three.js scene.
 *
 * Three plates of one generated sheet, stacked into a single slab at
 * progress 0 and separated along Y at progress 1. Each one stands for one of
 * the three things PIDA does not do yet, so the picture is the section's
 * argument rather than decoration beside it:
 *
 *   model    the lines and equipment routed into a piping model
 *   relief   a relief case: vessel, safety valve, riser, header
 *   docs     the document set: sheet border, title block, rows
 *
 * Top to bottom they read model, then relief, then documents, which is the
 * order Anatomy.tsx lists them in. A fourth plate needs an entry in PLATES,
 * a drawing in plateArt, and a fourth label there.
 *
 * EVERYTHING IS CUT, NOTHING IS PLACED
 *
 * There is one mesh per plate and nothing sits on top of any of them. The
 * drawing is cut into the plate's top face and the wordmark is cut into its
 * side wall, both as a bump map and a roughness map on the plate's own
 * material and in no colour channel at all. So they are grooves in the same
 * steel as the face around them: they catch the light on one wall, fall into
 * shadow on the other, and travel as the scene turns. A texture with ink on
 * it, or a plate laid on top, reads as a label stuck to the metal, because
 * that is what it is.
 *
 * A cut is also rougher than the polished face it is cut into, which is why
 * the same canvas is the roughness map. Without that the engraving vanishes
 * wherever the reflection on the face happens to be bright.
 *
 * BoxGeometry draws its six faces as six groups, so the top, the four walls
 * and the underside take three different materials off one mesh. That is why
 * the plates are boxes and not rounded boxes: a rounded box is one group and
 * the wordmark would run over the top.
 *
 * This file knows nothing about React or about scrolling. It exposes
 * setProgress(0..1) and renders on its own frame loop, easing toward the
 * value it was last given, so a scrubbed scroll never looks stepped.
 *
 * ACCENT LOCK. One colour, --pida-action, passed in rather than written here
 * so that recolouring the site recolours the scene. It appears in exactly one
 * place: the engraving cut into each plate, quiet at rest and lit when the
 * plate or its label is hovered. Nothing else in the scene has a hue.
 *
 * WHY ORTHOGRAPHIC. A perspective camera at this distance bends the square,
 * and the whole point is that the three plates are the same square seen at
 * the same angle. Orthographic at (1,1,1) is that isometric, at every
 * progress value.
 */
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/** What Anatomy.tsx is told about the plate currently lit. */
export type PlateFocus = {
  /** Index into PLATES, which is also the index of the label naming it. */
  layer: number;
  /* THE TWO POINTS A LEADER CAN LAND ON.
     The widest point of the plate's silhouette on each side, in canvas CSS
     pixels: the midpoint of the vertical edge that is furthest left, and the
     one furthest right. A leader is drawn to the edge nearest the label that
     owns it, so the scene reports both and the label picks. Pointing at the
     centre, which is what this used to report, put the arrow down in the
     middle of the drawing with the engraving underneath it. */
  lx: number;
  ly: number;
  rx: number;
  ry: number;
  /** True once a press has latched it, so the leader stays after the pointer goes. */
  held: boolean;
};

export type Anatomy = {
  /** 0 is one fused slab, 1 is three fully separated plates. */
  setProgress: (t: number) => void;
  /** Pointer position in canvas CSS pixels, or null when it has left. */
  point: (p: { x: number; y: number } | null) => void;
  /** A press at the last pointer position. True if it landed on a plate. */
  press: () => boolean;
  /** Light a plate from outside, which is what hovering its label does. */
  focus: (layer: number | null) => void;
  /** Run the frame loop, or stop it. Stopped costs nothing at all. */
  setRunning: (on: boolean) => void;
  /** Called on every frame the lit plate moves, and once with null when none is. */
  onFocus: (cb: (focus: PlateFocus | null) => void) => void;
  resize: () => void;
  dispose: () => void;
};

/** Plate side, in drawing units. */
const S = 4;

/* Thick enough to engrave the wall of, which is the whole reason the
   wordmark can live there rather than on the face. */
/* Closed, the three sit with a small gap between them. They used to meet
   exactly: the underside of one plate and the top face of the next were at
   the same y, which is two coplanar faces fighting for the same pixels, and
   it is what made the shut slab flicker and show stripes down its edge. */
const PLATES = [
  { thick: 0.22, y0: 0.2, y1: 1.85 },
  /* The middle plate holds its place: with three, the outer two part around
     it, which is what makes the stack read as opening rather than sliding. */
  { thick: 0.26, y0: -0.06, y1: 0.02 },
  { thick: 0.3, y0: -0.36, y1: -1.85 },
] as const;

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

/** A canvas filled flat, ready to be cut into. */
function ground(w: number, h: number, fill: string) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d");
  if (!g) return null;
  g.fillStyle = fill;
  g.fillRect(0, 0, w, h);
  g.lineJoin = "round";
  g.lineCap = "round";
  return { c, g };
}

function texture(c: HTMLCanvasElement, srgb: boolean) {
  const t = new THREE.CanvasTexture(c);
  t.anisotropy = 8;
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  return t;
}

/** The design space every path below is drawn in. */
const D = 1024;

/**
 * THE THREE SYMBOLS, TRACED FROM THE FOUNDERS' OWN DRAWINGS.
 *
 * A packed column, a twin pump set on its baseplate, and an agitated
 * reactor. They are drawn the way the symbols on a real sheet are drawn:
 * orthogonal runs, square corners on the vessels and swept corners on the
 * pipe, one line weight for equipment and a lighter one for its internals.
 * Nothing here is a sketch of a plant, it is three pieces of equipment.
 *
 * No inlet or outlet runs. The plate carries the equipment and nothing else.
 *
 * `cut` is passed in rather than chosen here, so the identical paths are
 * drawn three times, once for colour, once for height and once for
 * metalness. One set of paths, and no chance of the maps drifting apart.
 */
type Symbol = "column" | "pumps" | "reactor";

/** A pipe run with swept corners, as pipe is drawn. Pairs of x,y. */
function run(
  g: CanvasRenderingContext2D,
  pts: number[][],
  r: number
) {
  g.beginPath();
  g.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length - 1; i += 1) {
    g.arcTo(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], r);
  }
  g.lineTo(pts[pts.length - 1][0], pts[pts.length - 1][1]);
  g.stroke();
}

function drawSymbol(
  sym: Symbol,
  g: CanvasRenderingContext2D,
  cut: (draw: () => void, width: number) => void
) {
  /* Heavy for equipment, light for what is inside it. Both are wide: the
     plate is seen at an isometric angle, so a drawing on it is read at about
     a third of the width it was drawn at. */
  const HEAVY = 11;
  const LIGHT = 6;

  if (sym === "column") {
    /* A packed column: the shell, five beds of packing, the nozzles down its
       side, the loop of pipe around it and the two supports it stands on. */
    const x1 = 330;
    const x2 = 694;
    const yTop = 140;
    const yBot = 790;

    cut(() => {
      g.strokeRect(x1, yTop, x2 - x1, yBot - yTop);
      // the shell's own centre line, as the drawing carries
      g.beginPath();
      g.moveTo((x1 + x2) / 2, yTop);
      g.lineTo((x1 + x2) / 2, yBot);
      g.stroke();
    }, HEAVY);

    /* Five beds, hatched. The hatch is the packing: close, even, and it
       stops at the bed, which is what tells a reader it is packing and not
       a shaded box. */
    cut(() => {
      const beds = 4;
      const h = 124;
      const gap = ((yBot - yTop) - beds * h) / (beds + 1);
      for (let b = 0; b < beds; b += 1) {
        const y = yTop + gap + b * (h + gap);
        g.beginPath();
        g.moveTo(x1, y);
        g.lineTo(x2, y);
        g.moveTo(x1, y + h);
        g.lineTo(x2, y + h);
        g.stroke();
        g.beginPath();
        for (let x = x1 + 14; x < x2 - 6; x += 20) {
          g.moveTo(x, y + 6);
          g.lineTo(x, y + h - 6);
        }
        g.stroke();
      }
    }, LIGHT - 1);

    // the nozzles down the left face
    cut(() => {
      for (const y of [200, 340, 480, 620, 750]) {
        g.strokeRect(x1 - 30, y - 15, 30, 30);
      }
    }, LIGHT);

    // the loop of pipe around it
    cut(() => {
      run(
        g,
        [
          [x1 - 30, 200],
          [150, 200],
          [150, 856],
          [430, 856],
        ],
        26
      );
      run(
        g,
        [
          [x2, 340],
          [890, 340],
          [890, 856],
          [620, 856],
        ],
        26
      );
    }, LIGHT + 1);

    // the two supports and their base plates
    cut(() => {
      g.strokeRect(372, 856, 56, 72);
      g.strokeRect(344, 928, 112, 22);
      g.strokeRect(596, 856, 56, 72);
      g.strokeRect(568, 928, 112, 22);
    }, LIGHT + 1);
  } else if (sym === "pumps") {
    /* Two pump casings on one baseplate, driven from between them, with the
       suction and discharge running over and under to their flanges. */
    const lx = 300;
    const rx = 724;
    const cy = 486;
    const ry = 212;
    const rxL = 124;

    cut(() => {
      g.beginPath();
      g.ellipse(lx, cy, rxL, ry, 0, 0, Math.PI * 2);
      g.stroke();
      g.beginPath();
      g.ellipse(rx, cy, rxL, ry, 0, 0, Math.PI * 2);
      g.stroke();
    }, HEAVY);

    // the drive between them, and the shafts into each casing
    cut(() => {
      g.strokeRect(464, 430, 96, 112);
      g.beginPath();
      g.moveTo(lx + rxL, 458);
      g.lineTo(464, 458);
      g.moveTo(lx + rxL, 514);
      g.lineTo(464, 514);
      g.moveTo(560, 458);
      g.lineTo(rx - rxL, 458);
      g.moveTo(560, 514);
      g.lineTo(rx - rxL, 514);
      g.stroke();
    }, LIGHT + 1);

    // the plinth and the baseplate it is bolted to
    cut(() => {
      g.strokeRect(482, 542, 60, 52);
      g.strokeRect(452, 594, 120, 26);
      g.beginPath();
      g.moveTo(436, 650);
      g.lineTo(588, 650);
      g.moveTo(436, 674);
      g.lineTo(588, 674);
      g.stroke();
    }, LIGHT + 1);

    // discharge, over the top to its flange
    cut(() => {
      run(
        g,
        [
          [lx, cy - ry],
          [lx, 168],
          [896, 168],
          [896, 214],
        ],
        30
      );
      run(
        g,
        [
          [rx, cy - ry],
          [rx, 244],
          [820, 244],
          [820, 168],
        ],
        30
      );
      g.strokeRect(878, 214, 36, 92);
    }, LIGHT + 1);

    // suction, under the bottom to its flange
    cut(() => {
      run(
        g,
        [
          [rx, cy + ry],
          [rx, 804],
          [128, 804],
          [128, 758],
        ],
        30
      );
      run(
        g,
        [
          [lx, cy + ry],
          [lx, 728],
          [204, 728],
          [204, 804],
        ],
        30
      );
      g.strokeRect(110, 666, 36, 92);
    }, LIGHT + 1);
  } else {
    /* An agitated reactor: dished ends, a jacket on the shell, the shaft and
       two impellers, and the safety valve on the top nozzle. */
    cut(() => {
      g.beginPath();
      g.moveTo(352, 356);
      g.lineTo(352, 716);
      g.quadraticCurveTo(512, 840, 672, 716);
      g.lineTo(672, 356);
      g.quadraticCurveTo(512, 232, 352, 356);
      g.closePath();
      g.stroke();
    }, HEAVY);

    cut(() => {
      // the jacket, standing off the shell
      g.beginPath();
      g.moveTo(316, 386);
      g.lineTo(316, 690);
      g.moveTo(708, 386);
      g.lineTo(708, 690);
      g.stroke();
      // the shaft and its two impellers
      g.beginPath();
      g.moveTo(512, 268);
      g.lineTo(512, 690);
      g.moveTo(444, 690);
      g.lineTo(580, 690);
      g.moveTo(450, 560);
      g.lineTo(574, 560);
      g.stroke();
    }, LIGHT);

    // the safety valve on the top nozzle, into the header
    cut(() => {
      g.beginPath();
      g.moveTo(512, 250);
      g.lineTo(512, 186);
      g.stroke();
      // the bowtie body, on its side
      g.beginPath();
      g.moveTo(462, 138);
      g.lineTo(512, 186);
      g.lineTo(462, 234);
      g.closePath();
      g.moveTo(562, 138);
      g.lineTo(512, 186);
      g.lineTo(562, 234);
      g.closePath();
      g.stroke();
      // the spring bonnet
      g.beginPath();
      g.moveTo(462, 186);
      g.lineTo(378, 186);
      g.moveTo(378, 142);
      g.lineTo(378, 230);
      g.stroke();
      // out into the header
      g.beginPath();
      g.moveTo(562, 186);
      g.lineTo(834, 186);
      g.moveTo(834, 120);
      g.lineTo(834, 856);
      g.stroke();
    }, LIGHT + 2);

    // the two support feet
    cut(() => {
      g.strokeRect(390, 800, 52, 76);
      g.strokeRect(362, 876, 108, 22);
      g.strokeRect(582, 800, 52, 76);
      g.strokeRect(554, 876, 108, 22);
    }, LIGHT + 1);
  }
}

/**
 * The plate's face: the symbol, and the wordmark cut into its bottom left.
 *
 * The wordmark is cut deeper than the drawing. It is a maker's mark stamped
 * into the plate, not part of the drawing on it, and a stamp is deeper than
 * a scribe. That is the whole of the difference between the two here.
 */
function drawFace(
  sym: Symbol,
  g: CanvasRenderingContext2D,
  cut: (draw: () => void, width: number) => void,
  deep: (draw: () => void, width: number) => void
) {
  cut(() => g.strokeRect(64, 64, D - 128, D - 128), 3);
  drawSymbol(sym, g, cut);

  deep(() => {
    g.textAlign = "left";
    g.textBaseline = "alphabetic";
    g.font = "700 76px ui-monospace, monospace";
    g.letterSpacing = "10px";
    g.fillText("PIDA", 110, 930);
  }, 0);
}

/**
 * THE ACCENT, TAKEN APART SO A PASS CAN RAMP IT.
 *
 * Flat --pida-action on all three plates is what made the stack read as
 * three photocopies of one sheet: every line on every plate the same value,
 * so nothing was nearer than anything else and the drawing had no depth in
 * it at all.
 *
 * tokens.css allows exactly one hue and says so, so the ramp is built out of
 * that one colour rather than borrowed from a second. The far corner is the
 * accent held back to a deep oxide, the middle is the accent at full, and
 * the near corner is the accent lifted a sixth of the way to white, which
 * lands on --pida-action-soft to within a point or two. Derived rather than
 * pasted, so the token stays the only place the colour is decided.
 *
 * It runs bottom-left to top-right of the face. The wordmark is cut into the
 * bottom-left corner, so it sits at the quiet end and the drawing gets the
 * hot one, which is the hierarchy those two things should have anyway.
 */
function inkRamp(g: CanvasRenderingContext2D, colour: string) {
  const hex = /^#?([0-9a-f]{6})$/i.exec(colour.trim());
  const n = parseInt(hex ? hex[1] : "ff3616", 16);
  const r = (n >> 16) & 255;
  const b2 = (n >> 8) & 255;
  const b = n & 255;
  const lift = (c: number) => Math.round(c + (255 - c) * 0.16);
  const grad = g.createLinearGradient(0, D, D, 0);
  grad.addColorStop(0, `rgba(${r},${b2},${b},0.62)`);
  grad.addColorStop(0.52, `rgba(${r},${b2},${b},1)`);
  grad.addColorStop(1, `rgb(${lift(r)},${lift(b2)},${lift(b)})`);
  return grad;
}

/**
 * THE THREE MAPS A PLATE NEEDS, from the one set of paths.
 *
 *   colour     charcoal ground, accent in the cut. Red paint in the groove
 *              of a marked part: the plate stays the page's own charcoal and
 *              only the engraving carries the accent.
 *   height     white ground, dark in the cut, with a soft shoulder either
 *              side so the light has a wall to find. Drives the bump.
 *   metalness  black ground, white in the cut. This is what makes the
 *              engraving metallic red paint sitting in a plate that is not
 *              metallic: three reads metalness per texel, so the face comes
 *              out a matte dielectric and only the grooves take a specular
 *              metal response.
 *
 * The colour map is also the emissive map, so hovering lifts the accent in
 * the grooves and leaves the plate alone.
 */
function plateMaps(sym: Symbol, ink: string) {
  /* One texel per design unit. Two used to be four times the memory for a
     plate that is never drawn larger than about 400 pixels on screen. */
  /* Near-black and neutral, which is the ramp tokens.css sets for the rest
     of the page. It was four points lighter and a touch blue, and against a
     page that sits at about #030303 that read as a pale grey object rather
     than a dark one: the plates were the brightest thing on the screen and
     the engraving had to compete with the surface it is cut into. */
  const colour = ground(D, D, "#090909");
  const height = ground(D, D, "#ffffff");
  const metal = ground(D, D, "#000000");
  if (!colour || !height || !metal) return null;

  /* Only the colour pass ramps. The other two are geometry, not colour: a
     gradient in the height map would tilt the groove and a gradient in the
     metalness map would make the paint metallic at one end of the plate and
     not the other. */
  const gradient = inkRamp(colour.g, ink);

  const passes: Array<{
    g: CanvasRenderingContext2D;
    ink: string | CanvasGradient;
    deepInk: string | CanvasGradient;
    shoulder: string | null;
    /* The colour pass is laid down under full strength, so the engraving is
       quiet until something hovers it. The height and metalness passes are
       geometry rather than colour and stay at full. */
    alpha?: number;
  }> = [
    {
      g: colour.g,
      ink: gradient,
      deepInk: gradient,
      shoulder: null,
      alpha: 0.94,
    },
    { g: height.g, ink: "#1e1e1e", deepInk: "#000000", shoulder: "#b4b4b4" },
    { g: metal.g, ink: "#ffffff", deepInk: "#ffffff", shoulder: null },
  ];

  for (const pass of passes) {
    const g = pass.g;
    g.globalAlpha = pass.alpha ?? 1;
    const stroke = (ink: string | CanvasGradient, extra: number) =>
      (draw: () => void, width: number) => {
        if (pass.shoulder) {
          g.save();
          g.filter = "blur(1.5px)";
          g.strokeStyle = pass.shoulder;
          g.fillStyle = pass.shoulder;
          g.lineWidth = width + 3 + extra;
          draw();
          g.restore();
        }
        g.strokeStyle = ink;
        g.fillStyle = ink;
        g.lineWidth = width;
        draw();
      };
    drawFace(sym, g, stroke(pass.ink, 0), stroke(pass.deepInk, 3));
  }

  return {
    map: texture(colour.c, true),
    height: texture(height.c, false),
    metal: texture(metal.c, false),
  };
}

export function createAnatomy(
  canvas: HTMLCanvasElement,
  accent: string,
  /**
   * `only`  one plate rather than the stack of three, at the index of the
   *         symbol wanted. The runway and the explode go with it: the plate
   *         sits at the origin and the progress input stops mattering.
   * `ink`   the colour the engraving is cut in. Left out, it is the accent
   *         and nothing moves, which is the stack on the landing page. Given
   *         a colour, the engraving sits in THAT at rest and heats to the
   *         accent under the pointer, which is what the study page uses.
   */
  opts: { only?: number; ink?: string } = {}
): Anatomy | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      /* Multisampling back on. It was off to take load off an integrated
         GPU, and the saving was not worth what it cost: three hard-edged
         solids turning slowly, sampled a different way each frame, crawl
         along every rim. The load was never really here anyway, it was the
         frame loop running for a section nobody had scrolled to. */
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
  } catch {
    return null;
  }

  /* C8.5: the pixel ratio is clamped, as every other scene here clamps it.
     1.5, which is where it was. The buffer size was never what took the
     driver down: an idle render loop running for a section nobody had
     scrolled to was. If a weak GPU does start struggling, this is the first
     number to drop, and 1.25 is a quarter less work per frame. */
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  /* EXPOSED DOWN, BECAUSE THE PLATE BODY ANSWERS TO NOTHING ELSE.
     The plates were rendering at about #343434 on a page whose own ground is
     near #030303, which is what "greyish and bright" means: they were the
     lightest thing on the screen. Every local knob was tried against a
     measurement of the live canvas and none of them moved it. Darkening the
     colour map moved the ENGRAVING (52 to 49 on the body, 170 to 106 in the
     grooves) because the map is what the accent is drawn into. Cutting the
     lights by two thirds took the body from 52 to 45. Dropping the
     environment did nothing at all. Exposure took it from 52 to 27 on its
     own, which is the knob a photographer would have reached for first: the
     scene is lit correctly, it was just printed too bright.

     The engraving pays for this too, so the accent pass below is laid down
     at close to full strength to buy it back. That is the trade this number
     is making, and it is the right way round: the drawing is the thing that
     should carry the light here, not the slab it is cut into. */
  renderer.toneMappingExposure = 0.58;
  renderer.setClearAlpha(0);

  const scene = new THREE.Scene();

  /* Metal is its reflections. With no environment a metalness of 1 renders
     black, so the room is generated once, read into a PMREM, and the source
     scene thrown away immediately. */
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const envRT = pmrem.fromScene(room, 0.04);
  scene.environment = envRT.texture;
  room.dispose?.();

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
  camera.position.set(9, 9, 9);
  camera.lookAt(0, 0, 0);

  /* Everything thrown away on dispose. */
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const textures: THREE.Texture[] = [];

  // ---------------------------------------------------------------- plates

  const root = new THREE.Group();
  scene.add(root);

  type Plate = {
    mesh: THREE.Mesh;
    /** The face material, which is what lights up on hover. */
    face: THREE.MeshStandardMaterial;
    y0: number;
    y1: number;
    /** 0 to 1, how far the press pulse has run. 1 is finished. */
    pulse: number;
    /** 0 at rest, 1 fully lit. Eased, so the engraving comes up rather than
        switching on. */
    glow: number;
  };

  /* One symbol per plate, in the order the labels list them. */
  const SYMBOLS: Symbol[] = ["column", "pumps", "reactor"];

  const lone = opts.only !== undefined;
  /* A lone plate has nowhere to travel to, so both ends of its range are the
     origin and every scroll-driven term in apply() collapses to nothing. */
  const spec = lone ? [{ thick: 0.3, y0: 0, y1: 0 }] : PLATES;
  const syms = lone ? [SYMBOLS[opts.only ?? 0]] : SYMBOLS;

  /* Where the engraving goes when the pointer is on the plate. Null unless
     a resting ink was named, because heating an engraving that is already
     the accent only makes it darker. */
  const heat = opts.ink ? new THREE.Color(accent) : null;

  /**
   * The wall: the plate's own charcoal, matte, and nothing written on it.
   * The wordmark used to run along here; it is on the face now, which is the
   * only side of a plate anyone reads at this angle.
   */
  const wall = new THREE.MeshStandardMaterial({
    color: 0x0a0a0a,
    metalness: 0.1,
    roughness: 0.82,
    envMapIntensity: 0.12,
  });
  materials.push(wall);

  const plates: Plate[] = spec.map((p, i) => {
    const geo = new THREE.BoxGeometry(S, p.thick, S);
    geometries.push(geo);

    const maps = plateMaps(syms[i], opts.ink ?? accent);
    for (const t of [maps?.map, maps?.height, maps?.metal]) {
      if (t) textures.push(t);
    }

    /**
     * The face. The plate itself is a matte dielectric charcoal and only the
     * grooves take a metal response, which is what the metalness map is for:
     * metallic red paint sitting in a plate that is not metallic. A mirror
     * plate on a near-black page reflects the whole environment and shimmers
     * as it turns, which is what it used to do.
     */
    const face = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: maps?.map ?? null,
      metalness: 1,
      metalnessMap: maps?.metal ?? null,
      /* Matte. A polished face on a near-black page picks the whole room up
         and turns grey, which is what these were doing: the engraving had to
         fight the surface it was cut into instead of sitting on it. */
      roughness: 0.74,
      envMapIntensity: 0.14,
      bumpMap: maps?.height ?? null,
      bumpScale: 2.1,
      emissiveMap: maps?.map ?? null,
      /* White when the engraving is already the accent: the map carries the
         hue and this only has to let it through. The accent when it is not,
         because the map is then a cold white drawing and a white emissive
         would make it glow white. */
      emissive: heat ? heat.clone() : new THREE.Color(0xffffff),
      emissiveIntensity: 0,
    });
    materials.push(face);

    /* BoxGeometry's group order: +x, -x, +y, -y, +z, -z. */
    const mesh = new THREE.Mesh(geo, [wall, wall, face, wall, wall, wall]);
    mesh.position.y = p.y0;
    root.add(mesh);

    return { mesh, face, y0: p.y0, y1: p.y1, pulse: 1, glow: 0 };
  });

  // -------------------------------------------------------------- lighting

  const ambient = new THREE.AmbientLight(0xffffff, 0.24);
  const key = new THREE.DirectionalLight(0xffffff, 1.15);
  key.position.set(6, 11, 4);
  const fill = new THREE.DirectionalLight(0xffffff, 0.3);
  fill.position.set(-7, 4, -5);
  scene.add(ambient, key, fill);

  // ----------------------------------------------------------------- frame

  let target = 0;
  let current = 0;
  let raf = 0;
  let disposed = false;
  /* Seconds since the scene opened. Everything idle runs off this rather
     than off the scroll, so the picture is alive when the reader stops. */
  let clock = 0;
  const started = performance.now();

  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const world = new THREE.Vector3();
  let pointer: { x: number; y: number } | null = null;
  let hovered: Plate | null = null;
  let held: Plate | null = null;
  /* Set from outside when the reader is over a plate's label rather than
     over the plate. The leader has to answer both, or the words and the
     drawing are two separate things on one screen. */
  let forced: Plate | null = null;
  let focusCb: ((f: PlateFocus | null) => void) | null = null;
  let sent: PlateFocus | null = null;

  function resize() {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    const aspect = w / h;
    /* One frustum height for every viewport, so the sheet is the same size
       relative to the screen on a laptop and on a monitor. Narrow screens
       get more room, because the separated stack is taller than it is wide
       once it is projected. */
    const d = aspect < 1 ? 4.4 / aspect / 1.6 : 4.4;
    camera.left = -d * aspect;
    camera.right = d * aspect;
    camera.top = d;
    camera.bottom = -d;
    camera.updateProjectionMatrix();
  }

  function apply(e: number) {
    plates.forEach((p, i) => {
      const lit = p === hovered || p === held;
      /* The press: one quick rise and fall, over about half a second. */
      const pulse = p.pulse < 1 ? Math.sin(p.pulse * Math.PI) : 0;

      p.mesh.position.y =
        lerp(p.y0, p.y1, e) +
        /* A slow, shallow drift per plate, out of phase with the others, so
           the open stack breathes instead of hanging still. Scaled by the
           separation, so the closed slab stays one solid block. */
        Math.sin(clock * 0.5 + i * 2.1) * 0.035 * e +
        p.glow * 0.09 * e +
        pulse * 0.16 * e;

      /* Only the grooves light: the emissive map is the drawing, so the
         plate around it stays charcoal while the engraving comes up.
         Rest is dark. Hover is the only time it lights, which is the whole
         of the affordance: the reader has found the plate.

         Eased rather than switched, and taken well past where it was. At
         1.5 the change was about as much as the plate's own lift and read
         as a flicker; the engraving has to be unmistakably the brightest
         thing in the frame for the leader pointing at it to mean anything. */
      p.glow += ((lit ? 1 : 0) - p.glow) * 0.16;
      p.face.emissiveIntensity = p.glow * 4.8 + pulse * 2.2;

      /* Cold to hot. The map is a white drawing and this tints it, so the
         engraving travels the whole way from the ink it was cut in to the
         accent rather than only gaining a glow on top of itself. The ground
         around it is near-black, so tinting the whole map leaves the plate
         alone and moves only the lines. */
      if (heat) p.face.color.setRGB(1, 1, 1).lerp(heat, p.glow);
    });

    /* The camera pulls back as the stack opens, so the closed slab is large
       and the open one still fits. */
    /* The open stack has to leave the margins clear. At 1.1 the widest
       corner of the middle plate came out past the inside edge of the label
       that names it: the words sat on the drawing, and the leader between
       them had about twenty pixels to run in, which is not a leader, it is a
       tick. This is the number that buys the gap back. */
    /* A lone plate is the only thing on its page, so it is printed large
       and held there. The stack has to shrink as it opens or it reaches the
       labels. */
    camera.zoom = lone ? 1.5 : lerp(1.34, 0.98, e);
    camera.updateProjectionMatrix();

    /* A quarter turn's worth of travel across the scroll, no more: the
       picture has to stay the same square at the same angle. On top of it a
       slow idle sway, which is what keeps the metal reading as metal, since
       a still render of a reflective surface shows none of its reflections
       moving. */
    root.rotation.y = lerp(-0.24, 0.1, e) + Math.sin(clock * 0.24) * 0.05;
    root.rotation.x = Math.sin(clock * 0.19 + 1.1) * 0.016;
  }

  /** Which plate is under the pointer, if the pointer is over the canvas. */
  function pick(): Plate | null {
    if (!pointer) return null;
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    ndc.set((pointer.x / w) * 2 - 1, -(pointer.y / h) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(
      plates.map((p) => p.mesh),
      false
    )[0];
    if (!hit) return null;
    return plates.find((p) => p.mesh === hit.object) ?? null;
  }

  /**
   * The two sides of a plate's silhouette, in canvas CSS pixels.
   *
   * A plate is a box turning slowly about y, so its outline on screen is a
   * hexagon and the leftmost and rightmost points of it are always two of
   * the four vertical edges. Projecting each of those edges at half height
   * gives the point an arrow should touch. Taking the extreme in x is what
   * makes it the silhouette rather than whichever corner happens to be
   * nearest the camera, so the arrow never lands inside the drawing.
   */
  function edges(p: Plate) {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    const half = S / 2;
    let lx = Infinity;
    let ly = 0;
    let rx = -Infinity;
    let ry = 0;
    for (const sx of [-half, half]) {
      for (const sz of [-half, half]) {
        world.set(sx, 0, sz).applyMatrix4(p.mesh.matrixWorld).project(camera);
        const x = ((world.x + 1) / 2) * w;
        const y = ((1 - world.y) / 2) * h;
        if (x < lx) {
          lx = x;
          ly = y;
        }
        if (x > rx) {
          rx = x;
          ry = y;
        }
      }
    }
    return { lx, ly, rx, ry };
  }

  /** Tell Anatomy.tsx where to draw the leader, but only when it moved. */
  function report() {
    const p = held ?? hovered;
    if (!p) {
      if (sent) {
        sent = null;
        focusCb?.(null);
      }
      return;
    }
    const e = edges(p);
    const layer = plates.indexOf(p);
    const next: PlateFocus = { layer, ...e, held: p === held };
    if (
      sent &&
      sent.layer === next.layer &&
      sent.held === next.held &&
      Math.abs(sent.lx - next.lx) < 0.5 &&
      Math.abs(sent.ly - next.ly) < 0.5
    ) {
      return;
    }
    sent = next;
    focusCb?.(next);
  }

  function tick() {
    if (disposed) return;
    clock = (performance.now() - started) / 1000;

    /* Ease toward the scrubbed value rather than snapping to it. A scroll
       wheel arrives in steps; this is what gives the stack weight. */
    current += (target - current) * 0.12;

    for (const p of plates) {
      if (p.pulse < 1) p.pulse = Math.min(1, p.pulse + 0.045);
    }

    const e = easeInOut(clamp01(current));
    /* Nothing is pickable until the stack is properly open. At 0.3 the slab
       has barely parted and the labels have not arrived, so a leader drawn
       then points from words nobody can read to a plate that is still inside
       another one. 0.62 is where the labels land. */
    /* Nothing to wait for when there is one plate at the origin: it is
       never inside another one. */
    const live = lone || e > 0.62;
    hovered = live ? pick() ?? forced : null;
    if (!live) held = null;

    apply(e);
    scene.updateMatrixWorld();

    report();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  }

  resize();
  apply(0);
  renderer.render(scene, camera);

  let running = false;

  return {
    setProgress: (t: number) => {
      target = clamp01(t);
    },
    point: (p) => {
      pointer = p;
      if (!p) hovered = null;
    },
    press: () => {
      const p = pick();
      if (!p) {
        /* A press on nothing lets go of whatever was held, which is the only
           way back out on a device with no hover. */
        held = null;
        return false;
      }
      held = held === p ? null : p;
      p.pulse = 0;
      return true;
    },
    focus: (layer) => {
      forced = layer === null ? null : plates[layer] ?? null;
    },
    setRunning: (on) => {
      if (on === running || disposed) return;
      running = on;
      if (on) raf = requestAnimationFrame(tick);
      else cancelAnimationFrame(raf);
    },
    onFocus: (cb) => {
      focusCb = cb;
    },
    resize,
    dispose: () => {
      disposed = true;
      focusCb = null;
      cancelAnimationFrame(raf);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      envRT.texture.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
