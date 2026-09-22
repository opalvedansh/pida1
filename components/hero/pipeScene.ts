/**
 * Pipes, growing. The hero's background.
 *
 * The old screensaver, rebuilt: pipes walk a lattice a cell at a time, turn
 * at random, and put an elbow in wherever they turn. When the lattice has
 * had enough of them the whole run fades and starts again.
 *
 * WHY IT IS HERE AT ALL
 *
 * It is the one piece of decoration on this site that is also the subject.
 * Everything below the hero is about pipe: what it runs between, what it is
 * sized to, what closes to isolate it. A hero that grows pipe says that
 * before a word is read, and it costs nothing to look at because it is
 * behind the copy rather than beside it.
 *
 * HOW IT IS KEPT CHEAP
 *
 *   - Two instanced meshes carry every run and every elbow, so the whole
 *     lattice is four draw calls however many segments are in it.
 *   - Nothing is allocated per frame. The lattice is a flat Uint8Array and
 *     the walk writes into pre-sized instance buffers.
 *   - The frame loop stops the moment the hero leaves the screen, which
 *     Pipes.tsx drives from an observer.
 *   - The pixel ratio is clamped, as every other scene on this site clamps
 *     it (C8.5).
 *
 * ACCENT LOCK. The metal is neutral and takes its colour from the
 * environment. One run in five is painted in --pida-action, which is passed
 * in rather than written here, so recolouring the site recolours the pipes.
 */
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export type Pipes = {
  /** Run the frame loop, or stop it. Stopped costs nothing at all. */
  setRunning: (on: boolean) => void;
  resize: () => void;
  dispose: () => void;
};

/** Cells a side. The lattice is this cubed. */
const G = 13;
/** Drawing units between one cell and the next. */
const STEP = 1;
/** How many segments are laid before the run is considered finished. */
const BUDGET = 320;
/** Frames between one segment and the next. */
const EVERY = 2;
/* How much of the lattice is already laid when a run begins. A run that
   starts from one elbow leaves the hero empty for the first several seconds,
   which is exactly the time a reader is looking at it. So it opens part
   built and grows from there. */
const PREFILL = 150;

const DIRS: [number, number, number][] = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];

const idx = (x: number, y: number, z: number) => (x * G + y) * G + z;
const inside = (x: number, y: number, z: number) =>
  x >= 0 && y >= 0 && z >= 0 && x < G && y < G && z < G;

export function createPipes(
  canvas: HTMLCanvasElement,
  accent: string
): Pipes | null {
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

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  renderer.setClearAlpha(0);

  const scene = new THREE.Scene();

  /* Metal is its reflections: with no environment, metalness 1 renders
     black. The room is generated once and thrown away immediately. */
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const envRT = pmrem.fromScene(room, 0.04);
  scene.environment = envRT.texture;
  room.dispose?.();

  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 200);

  const ACCENT = new THREE.Color(accent);
  const R = 0.19;

  const runGeo = new THREE.CylinderGeometry(R, R, STEP, 12, 1, true);
  const elbowGeo = new THREE.SphereGeometry(R * 1.32, 14, 10);

  const steel = new THREE.MeshStandardMaterial({
    color: 0xc2c2c8,
    metalness: 1,
    roughness: 0.22,
    envMapIntensity: 1.25,
  });

  /* The painted runs. Emissive at a low intensity rather than a flat colour,
     because on a near-black page an unlit red pipe reads as a brown one. */
  const painted = new THREE.MeshStandardMaterial({
    color: ACCENT,
    emissive: ACCENT,
    emissiveIntensity: 0.5,
    metalness: 0.7,
    roughness: 0.38,
  });

  const runs = new THREE.InstancedMesh(runGeo, steel, BUDGET);
  const runsHot = new THREE.InstancedMesh(runGeo, painted, BUDGET);
  const elbows = new THREE.InstancedMesh(elbowGeo, steel, BUDGET);
  const elbowsHot = new THREE.InstancedMesh(elbowGeo, painted, BUDGET);

  const all = [runs, runsHot, elbows, elbowsHot];
  for (const m of all) {
    m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    m.count = 0;
    m.frustumCulled = false;
  }

  const root = new THREE.Group();
  root.position.set((-(G - 1) * STEP) / 2, (-(G - 1) * STEP) / 2, (-(G - 1) * STEP) / 2);
  root.add(...all);

  const world = new THREE.Group();
  world.add(root);
  scene.add(world);

  const ambient = new THREE.AmbientLight(0xffffff, 0.6);
  const key = new THREE.DirectionalLight(0xffffff, 3.1);
  key.position.set(6, 10, 7);
  const rim = new THREE.DirectionalLight(0xffffff, 1.1);
  rim.position.set(-8, -3, -6);
  scene.add(ambient, key, rim);

  // ------------------------------------------------------------- the walk

  const cells = new Uint8Array(G * G * G);
  const m4 = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const up = new THREE.Vector3(0, 1, 0);
  const dirV = new THREE.Vector3();
  const pos = new THREE.Vector3();
  const scl = new THREE.Vector3(1, 1, 1);

  let head: [number, number, number] = [0, 0, 0];
  let dir = 0;
  let hot = false;
  let laid = 0;
  let nRun = 0;
  let nRunHot = 0;
  let nElbow = 0;
  let nElbowHot = 0;

  const rnd = (n: number) => Math.floor(Math.random() * n);

  function seed() {
    let tries = 60;
    while (tries--) {
      const x = rnd(G);
      const y = rnd(G);
      const z = rnd(G);
      if (!cells[idx(x, y, z)]) {
        cells[idx(x, y, z)] = 1;
        head = [x, y, z];
        dir = rnd(6);
        /* One run in five is painted. Decided per pipe, not per segment, so
           a pipe is one colour end to end. */
        hot = Math.random() < 0.2;
        return true;
      }
    }
    return false;
  }

  function place(
    mesh: THREE.InstancedMesh,
    n: number,
    x: number,
    y: number,
    z: number,
    d: [number, number, number] | null
  ) {
    pos.set(x * STEP, y * STEP, z * STEP);
    if (d) {
      dirV.set(d[0], d[1], d[2]);
      q.setFromUnitVectors(up, dirV);
    } else {
      q.identity();
    }
    m4.compose(pos, q, scl);
    mesh.setMatrixAt(n, m4);
    mesh.count = n + 1;
    mesh.instanceMatrix.needsUpdate = true;
  }

  /** Lay one segment. Returns false when the lattice has no room left. */
  function grow() {
    /* Mostly carry straight on. A pipe that turned every cell would be a
       ball of elbows rather than a run of pipe. */
    let d = DIRS[dir];
    let nx = head[0] + d[0];
    let ny = head[1] + d[1];
    let nz = head[2] + d[2];
    const turning = Math.random() < 0.32;

    if (turning || !inside(nx, ny, nz) || cells[idx(nx, ny, nz)]) {
      const options: number[] = [];
      for (let i = 0; i < 6; i++) {
        const o = DIRS[i];
        const ox = head[0] + o[0];
        const oy = head[1] + o[1];
        const oz = head[2] + o[2];
        if (inside(ox, oy, oz) && !cells[idx(ox, oy, oz)]) options.push(i);
      }
      if (!options.length) return seed();
      const next = options[rnd(options.length)];
      if (next !== dir) {
        /* An elbow goes wherever the run changes direction, which is the
           only place the joint is visible. */
        if (hot) place(elbowsHot, nElbowHot++, head[0], head[1], head[2], null);
        else place(elbows, nElbow++, head[0], head[1], head[2], null);
      }
      dir = next;
      d = DIRS[dir];
      nx = head[0] + d[0];
      ny = head[1] + d[1];
      nz = head[2] + d[2];
    }

    cells[idx(nx, ny, nz)] = 1;
    /* The run is placed at the midpoint of the two cells and turned to face
       along the step, which is what the cylinder's own axis expects. */
    if (hot)
      place(runsHot, nRunHot++, (head[0] + nx) / 2, (head[1] + ny) / 2, (head[2] + nz) / 2, d);
    else
      place(runs, nRun++, (head[0] + nx) / 2, (head[1] + ny) / 2, (head[2] + nz) / 2, d);

    head = [nx, ny, nz];
    laid++;
    return true;
  }

  function reset() {
    cells.fill(0);
    laid = 0;
    nRun = nRunHot = nElbow = nElbowHot = 0;
    for (const m of all) m.count = 0;
    seed();
    for (let i = 0; i < PREFILL; i++) {
      if (!grow()) break;
    }
  }

  // ------------------------------------------------------------ the frame

  let raf = 0;
  let frame = 0;
  let running = false;
  let disposed = false;
  let fade = 1;
  let winding = false;
  const started = performance.now();

  function resize() {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    /* Pull back on a narrow viewport, so the lattice still reads as a cube
       of pipe rather than as three pipes filling the frame. */
    camera.position.set(0, 0, w / h < 1 ? 30 : 23);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }

  function tick() {
    if (disposed) return;
    const t = (performance.now() - started) / 1000;

    if (!winding && ++frame % EVERY === 0) {
      if (!grow() || laid > BUDGET - 8) winding = true;
    }

    if (winding) {
      fade -= 0.012;
      if (fade <= 0) {
        fade = 1;
        winding = false;
        reset();
      }
    }

    steel.opacity = fade;
    painted.opacity = fade;
    steel.transparent = fade < 1;
    painted.transparent = fade < 1;

    /* One slow turn. The lattice is a cube, so any faster and the reader is
       watching it spin instead of reading the heading over it. */
    world.rotation.y = t * 0.075;
    world.rotation.x = Math.sin(t * 0.11) * 0.16;

    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  }

  resize();
  reset();
  renderer.render(scene, camera);

  return {
    setRunning: (on: boolean) => {
      if (on === running || disposed) return;
      running = on;
      if (on) raf = requestAnimationFrame(tick);
      else cancelAnimationFrame(raf);
    },
    resize,
    dispose: () => {
      disposed = true;
      cancelAnimationFrame(raf);
      runGeo.dispose();
      elbowGeo.dispose();
      steel.dispose();
      painted.dispose();
      for (const m of all) m.dispose();
      envRT.texture.dispose();
      pmrem.dispose();
      renderer.dispose();
      /* dispose() frees three's own objects but leaves the context attached
         to the canvas, so a second scene mounted on the same element gets
         the dead one back and renders nothing. React mounts effects twice in
         development and Fast Refresh remounts them again on every edit, so
         "nothing renders after a while" is the normal outcome without this. */
      renderer.forceContextLoss();
    },
  };
}
