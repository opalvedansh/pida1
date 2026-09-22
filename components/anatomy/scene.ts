/**
 * The sheet, exploded. A framework-free Three.js scene.
 *
 * Four layers of one generated sheet, stacked into a single slab at
 * progress 0 and separated along Y at progress 1:
 *
 *   cover   the sheet as it prints: border, title block, revision
 *   nodes   the routed model, as a node and edge network
 *   maze    the flow paths, as milled channels
 *   base    the P&ID itself, its linework lit
 *
 * This file knows nothing about React or about scrolling. It exposes
 * setProgress(0..1) and renders on its own frame loop, easing toward the
 * value it was last given, so a scrubbed scroll never looks stepped.
 *
 * ACCENT LOCK
 *
 * One colour, --pida-action, and it is passed in rather than written here so
 * that recolouring the site recolours the scene. Nothing in this file emits
 * a second hue: the metal is neutral and takes its colour from the
 * environment, and every glow is the accent at a different intensity.
 *
 * WHY ORTHOGRAPHIC
 *
 * A perspective camera at this distance bends the square, and the whole
 * point of the picture is that the four layers are the same square seen at
 * the same angle. Orthographic at (1,1,1) is the isometric the reference
 * asks for, and it stays isometric at every progress value.
 */
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export type Anatomy = {
  /** 0 is one fused slab, 1 is four fully separated layers. */
  setProgress: (t: number) => void;
  resize: () => void;
  dispose: () => void;
};

/** Sheet side and slab thickness, in drawing units. */
const S = 4;
const T = 0.12;

/** Where each layer sits when the slab is closed, and when it is open. */
const LAYERS = [
  { key: "cover", y0: 0.19, y1: 2.05 },
  { key: "nodes", y0: 0.06, y1: 0.68 },
  { key: "maze", y0: -0.07, y1: -0.68 },
  { key: "base", y0: -0.2, y1: -2.05 },
] as const;

/* The routed model. Junctions on a half-unit grid, and the runs between
   them. Hand placed rather than generated, so the network is the same
   picture on every load and in every screenshot. */
const NODES: [number, number][] = [
  [-1.2, -1.2], [-0.4, -1.2], [0.8, -1.2],
  [-1.2, -0.4], [0.0, -0.4], [0.8, -0.4], [1.4, -0.4],
  [-0.6, 0.4], [0.2, 0.4], [1.0, 0.4],
  [-1.4, 1.0], [-0.2, 1.0], [0.6, 1.2], [1.4, 1.0],
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [3, 4], [4, 5], [5, 6],
  [3, 7], [4, 8], [5, 9], [7, 8], [8, 9], [7, 10], [8, 11], [9, 12],
  [12, 13], [11, 12], [10, 11], [6, 9],
];

/* The flow paths, as orthogonal channels: x1, z1, x2, z2. */
const CHANNELS: [number, number, number, number][] = [
  [-1.6, -1.6, 1.6, -1.6],
  [1.6, -1.6, 1.6, -0.8],
  [1.6, -0.8, 0.4, -0.8],
  [0.4, -0.8, 0.4, 0.0],
  [0.4, 0.0, 1.6, 0.0],
  [1.6, 0.0, 1.6, 1.6],
  [-1.6, -1.6, -1.6, 0.8],
  [-1.6, 0.8, -0.4, 0.8],
  [-0.4, 0.8, -0.4, 1.6],
  [-0.8, -0.8, -0.8, 0.0],
  [-0.8, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.8],
  [0.8, 0.8, 1.2, 0.8],
  [0.8, 0.8, 0.8, 1.6],
];

/** A closed rectangle as four segments, for the base linework. */
function rect(x1: number, z1: number, x2: number, z2: number) {
  return [
    [x1, z1, x2, z1],
    [x2, z1, x2, z2],
    [x2, z2, x1, z2],
    [x1, z2, x1, z1],
  ] as [number, number, number, number][];
}

/** A small diamond, standing in for an instrument bubble. */
function bubble(x: number, z: number, r = 0.11) {
  return [
    [x - r, z, x, z - r],
    [x, z - r, x + r, z],
    [x + r, z, x, z + r],
    [x, z + r, x - r, z],
  ] as [number, number, number, number][];
}

/* The drawing on the base: two pieces of equipment, the runs between them,
   and three instruments. Quiet linework. */
const BASE_INK: [number, number, number, number][] = [
  ...rect(-1.35, -1.05, -0.45, -0.15),
  ...rect(0.5, 0.2, 1.4, 1.0),
  [-1.7, -0.6, -1.35, -0.6],
  [1.4, 0.6, 1.75, 0.6],
  ...bubble(0.05, 0.75),
  ...bubble(-0.9, 1.3),
];

/* The one run that carries the accent: out of the vessel, through the
   junction, into the filter. It is the path the other layers describe. */
const BASE_FLOW: [number, number, number, number][] = [
  [-0.45, -0.6, 0.95, -0.6],
  [0.95, -0.6, 0.95, 0.6],
  [0.95, 0.6, 0.5, 0.6],
  ...bubble(0.95, -0.6, 0.13),
];

function lineGeometry(segs: [number, number, number, number][], y: number) {
  const pts = new Float32Array(segs.length * 6);
  segs.forEach(([x1, z1, x2, z2], i) => {
    pts.set([x1, y, z1, x2, y, z2], i * 6);
  });
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(pts, 3));
  return g;
}

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function createAnatomy(
  canvas: HTMLCanvasElement,
  accent: string
): Anatomy | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
  } catch {
    return null;
  }

  const ACCENT = new THREE.Color(accent);

  /* C8.5: the pixel ratio is clamped, as the sheets scene already clamps it.
     A 3x buffer on a retina laptop costs more than it shows. */
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setClearAlpha(0);

  const scene = new THREE.Scene();

  /* Metal is its reflections. With no environment a metalness of 1 renders
     black, so the room is generated once, read into a PMREM, and the source
     scene is thrown away immediately. */
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const envRT = pmrem.fromScene(room, 0.04);
  scene.environment = envRT.texture;
  room.dispose?.();

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
  camera.position.set(9, 9, 9);
  camera.lookAt(0, 0, 0);

  /* Everything that is thrown away on dispose. */
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const keep = <G extends THREE.BufferGeometry>(g: G) => (geometries.push(g), g);
  const mat = <M extends THREE.Material>(m: M) => (materials.push(m), m);

  // ------------------------------------------------------------ materials

  const steel = mat(
    new THREE.MeshStandardMaterial({
      color: 0x8e8e8e,
      metalness: 1,
      roughness: 0.3,
      envMapIntensity: 0.85,
    })
  );

  const steelDark = mat(
    new THREE.MeshStandardMaterial({
      color: 0x4a4a4a,
      metalness: 1,
      roughness: 0.42,
      envMapIntensity: 0.6,
    })
  );

  const carbon = mat(
    new THREE.MeshStandardMaterial({
      color: 0x0b0b0b,
      metalness: 0.15,
      roughness: 0.88,
    })
  );

  const glowSolid = mat(
    new THREE.MeshStandardMaterial({
      color: ACCENT,
      emissive: ACCENT,
      emissiveIntensity: 1.6,
      metalness: 0.2,
      roughness: 0.45,
    })
  );

  /* Additive on a black page is what makes a line read as lit without
     paying for a bloom pass. */
  const glowLine = mat(
    new THREE.LineBasicMaterial({
      color: ACCENT,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );

  const inkLine = mat(
    new THREE.LineBasicMaterial({
      color: 0xe5e5e5,
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
    })
  );

  const rimLine = mat(
    new THREE.LineBasicMaterial({
      color: 0x9a9a9a,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    })
  );

  // --------------------------------------------------------------- layers

  const root = new THREE.Group();
  scene.add(root);

  const groups: Record<string, THREE.Group> = {};
  for (const l of LAYERS) {
    const g = new THREE.Group();
    g.position.y = l.y0;
    root.add(g);
    groups[l.key] = g;
  }

  // cover: the printed sheet
  {
    const slab = new THREE.Mesh(keep(new THREE.BoxGeometry(S, T, S)), steel);
    groups.cover.add(slab);

    // the drawing border, milled into the face
    groups.cover.add(
      new THREE.LineSegments(
        keep(lineGeometry(rect(-1.7, -1.7, 1.7, 1.7), T / 2 + 0.002)),
        rimLine
      )
    );

    // the title block, standing slightly proud
    const tb = new THREE.Mesh(
      keep(new THREE.BoxGeometry(1.25, 0.035, 0.42)),
      steelDark
    );
    tb.position.set(0.95, T / 2 + 0.017, 1.42);
    groups.cover.add(tb);
  }

  // nodes: the routed model
  const nodeMeshes: THREE.Mesh[] = [];
  {
    const plate = new THREE.Mesh(
      keep(new THREE.BoxGeometry(S, 0.03, S)),
      carbon
    );
    groups.nodes.add(plate);

    const nodeGeo = keep(new THREE.OctahedronGeometry(0.085));
    for (const [x, z] of NODES) {
      const m = new THREE.Mesh(nodeGeo, glowSolid);
      m.position.set(x, 0.1, z);
      groups.nodes.add(m);
      nodeMeshes.push(m);
    }

    const runs = EDGES.map(
      ([a, b]) =>
        [NODES[a][0], NODES[a][1], NODES[b][0], NODES[b][1]] as [
          number,
          number,
          number,
          number
        ]
    );
    groups.nodes.add(
      new THREE.LineSegments(keep(lineGeometry(runs, 0.1)), glowLine)
    );
  }

  // maze: the flow paths, as milled channels
  {
    const plate = new THREE.Mesh(
      keep(new THREE.BoxGeometry(S, 0.07, S)),
      steelDark
    );
    groups.maze.add(plate);

    const W = 0.13;
    for (const [x1, z1, x2, z2] of CHANNELS) {
      const horiz = Math.abs(x2 - x1) > Math.abs(z2 - z1);
      const len = horiz ? Math.abs(x2 - x1) : Math.abs(z2 - z1);
      const geo = keep(
        new THREE.BoxGeometry(horiz ? len + W : W, 0.11, horiz ? W : len + W)
      );
      const m = new THREE.Mesh(geo, steel);
      m.position.set((x1 + x2) / 2, 0.055, (z1 + z2) / 2);
      groups.maze.add(m);
    }
  }

  // base: the drawing itself
  {
    const slab = new THREE.Mesh(keep(new THREE.BoxGeometry(S, T, S)), carbon);
    groups.base.add(slab);

    groups.base.add(
      new THREE.LineSegments(
        keep(lineGeometry(BASE_INK, T / 2 + 0.002)),
        inkLine
      )
    );
    groups.base.add(
      new THREE.LineSegments(
        keep(lineGeometry(BASE_FLOW, T / 2 + 0.004)),
        glowLine
      )
    );
  }

  // -------------------------------------------------------------- lighting

  const ambient = new THREE.AmbientLight(0xffffff, 0.35);
  const key = new THREE.DirectionalLight(0xffffff, 2.1);
  key.position.set(6, 11, 4);
  const fill = new THREE.DirectionalLight(0xffffff, 0.55);
  fill.position.set(-7, 4, -5);
  /* The accent lamp lives on the routed model, so as the layers part it
     throws the model's own colour onto the metal above and the drawing
     below. At progress 0 it is off and the slab is neutral steel. */
  const lamp = new THREE.PointLight(ACCENT, 0, 7, 2);
  groups.nodes.add(lamp);
  scene.add(ambient, key, fill);

  // ---------------------------------------------------------------- frame

  let target = 0;
  let current = 0;
  let raf = 0;
  let disposed = false;

  function resize() {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    const aspect = w / h;
    /* One frustum height for every viewport, so the sheet is the same size
       relative to the screen on a laptop and on a monitor. Narrow screens
       get a little more room, because the separated stack is taller than it
       is wide once it is projected. */
    const d = aspect < 1 ? 4.4 / aspect / 1.6 : 4.4;
    camera.left = -d * aspect;
    camera.right = d * aspect;
    camera.top = d;
    camera.bottom = -d;
    camera.updateProjectionMatrix();
  }

  function apply(e: number) {
    for (const l of LAYERS) groups[l.key].position.y = lerp(l.y0, l.y1, e);

    /* The camera pulls back as the stack opens, so the closed slab is large
       and the open one still fits. */
    camera.zoom = lerp(1.42, 1.0, e);
    camera.updateProjectionMatrix();

    /* A quarter turn's worth of drift, no more. The picture has to stay the
       same square at the same angle. */
    root.rotation.y = lerp(-0.24, 0.1, e);

    lamp.intensity = 3.4 * e;
    glowSolid.emissiveIntensity = lerp(0.35, 1.9, e);
    glowLine.opacity = lerp(0.3, 0.92, e);
    inkLine.opacity = lerp(0.1, 0.36, e);
  }

  function tick() {
    if (disposed) return;
    /* Ease toward the scrubbed value rather than snapping to it. A scroll
       wheel arrives in steps; this is what makes the stack look like it has
       weight. */
    current += (target - current) * 0.12;
    apply(easeInOut(Math.min(1, Math.max(0, current))));
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  }

  resize();
  apply(0);
  renderer.render(scene, camera);
  raf = requestAnimationFrame(tick);

  return {
    setProgress: (t: number) => {
      target = Math.min(1, Math.max(0, t));
    },
    resize,
    dispose: () => {
      disposed = true;
      cancelAnimationFrame(raf);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      envRT.texture.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
