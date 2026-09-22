/**
 * The sheet stack, as a scene.
 *
 * DEVIATION. C8 scopes the site's one 3D scene to section 02 and writes the
 * whole of it around a particular authoring tool. This is a different
 * renderer in a different section, so C8's *caps* are what carry over, and
 * they are honoured below: no post-processing, no bloom, no depth of field,
 * no skybox, no floor grid beyond the one the drawing already has, a
 * transparent background so the band shows through, one light, no shadows,
 * device pixel ratio capped at 1.5, and the render loop paused whenever the
 * section is off screen or the tab is hidden.
 *
 * WHY IT LINES UP WITH THE SVG EXACTLY
 *
 * The drawing is an axonometric, and an axonometric is an orthographic
 * projection, so the two renderers can be made to agree by construction
 * instead of by eye. Rather than guess a camera position and tune it, the
 * projection matrix is written directly from the same expression the SVG
 * uses:
 *
 *   screenX = CX + (x - y) * A
 *   screenY = CY + (x + y) * B - lift
 *
 * with plan x as world X, plan y as world Z and lift as world Y. That matters
 * for more than neatness: the margin notes are positioned from the SVG's own
 * leader coordinates, so a camera that was even slightly off would slide
 * every leader off its words. The leaders and the notes stay in the SVG,
 * overlaid on the canvas, and only the plates and their linework are drawn
 * here.
 *
 * Colours are read from the stylesheet at mount, so the scene recolours with
 * the token exactly as the SVG does.
 */
import * as THREE from "three";
import {
  Art,
  artworkPlan,
  A,
  B,
  CX,
  CY,
  GROUND_THICK,
  groundGridPlan,
  OVERHANG,
  PLATES,
  REST,
  S,
  Shape,
  THICK,
  VB,
} from "../sheets/plan";

export type SheetsScene = {
  setExplode(t: number): void;
  setActive(id: string | null): void;
  onPick(fn: (id: string | null) => void): void;
  resize(): void;
  dispose(): void;
};

/**
 * A token, as a number Three can use.
 *
 * The palette is authored in oklch, and getComputedStyle hands it back in
 * whatever model the browser prefers, which here is lab(). Three's colour
 * parser knows neither. Painting the value into a 1x1 canvas makes the
 * browser do the conversion, so any CSS colour the stylesheet can express
 * arrives as plain RGB and the scene keeps recolouring with the token.
 */
function token(
  styles: CSSStyleDeclaration,
  name: string,
  fallback: string
): number {
  const value = (styles.getPropertyValue(name) || fallback).trim();
  const probe = document.createElement("canvas");
  probe.width = 1;
  probe.height = 1;
  const ctx = probe.getContext("2d");
  if (!ctx) return 0x888888;
  ctx.fillStyle = fallback; // an unparseable value leaves this in place
  ctx.fillStyle = value;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return (r << 16) | (g << 8) | b;
}

/**
 * The SVG's projection, written as a 4x4. Rows 1 and 2 are the two lines of
 * project() rearranged into normalised device coordinates; row 3 is depth,
 * which the SVG has no use for and the z-buffer does.
 */
function axonometricMatrix() {
  const halfW = VB.w / 2;
  const halfH = VB.h / 2;
  const cx = VB.x + halfW;
  const cy = VB.y + halfH;

  /* Depth increases towards the camera, which sits along (1, 2B, 1). The
     span is generous: the drawing occupies far less than this. */
  const dMid = 340;
  const dSpan = 900;

  return new THREE.Matrix4().set(
    A / halfW, 0, -A / halfW, (CX - cx) / halfW,
    -B / halfH, 1 / halfH, -B / halfH, -(CY - cy) / halfH,
    -1 / dSpan, -(2 * B) / dSpan, -1 / dSpan, dMid / dSpan,
    0, 0, 0, 1
  );
}

/** Plan points lifted into the sheet's plane, as a flat position array. */
function toPoints(shape: Shape, y: number) {
  const pts: number[] = [];
  shape.pts.forEach((p) => pts.push(p[0], y, p[1]));
  if (shape.closed && shape.pts.length) {
    pts.push(shape.pts[0][0], y, shape.pts[0][1]);
  }
  return pts;
}

function lineObject(shapes: Shape[], y: number, material: THREE.Material) {
  const group = new THREE.Group();
  shapes.forEach((shape) => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(toPoints(shape, y), 3)
    );
    group.add(new THREE.Line(g, material));
  });
  return group;
}

export function mountScene(
  canvas: HTMLCanvasElement,
  host: HTMLElement,
  onFirstFrame: () => void
): SheetsScene {
  const css = getComputedStyle(document.documentElement);
  const C = {
    face: token(css, "--pida-bg-raised", "#232323"),
    ground: token(css, "--pida-bg", "#1a1a1a"),
    edge: token(css, "--pida-edge-strong", "#3a3a3a"),
    ink: token(css, "--pida-fg", "#e5e5e5"),
    accent: token(css, "--pida-action", "#ff3616"),
  };

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true, // transparent, so the band shows through (C8.2)
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setClearAlpha(0);

  const scene = new THREE.Scene();

  /* One key and an ambient fill, no shadows (C8.5).
  
     The surfaces here are very dark by design: the sheet face resolves to
     about #181818 against a #121212 band, so at unit intensity the plates
     disappear into the page. The key is pitched high enough to separate the
     top face from the four sides, which is the whole job of lighting in a
     drawing like this: it is what makes a plate read as a solid sheet with
     a thickness rather than as a flat quadrilateral. */
  const key = new THREE.DirectionalLight(0xffffff, 2.1);
  key.position.set(0.6, 2, 0.35);
  scene.add(key, new THREE.AmbientLight(0xffffff, 1.15));

  const camera = new THREE.Camera();
  camera.projectionMatrix.copy(axonometricMatrix());
  camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
  /* The matrix above already contains the whole view, so the camera itself
     stays at the origin and must not have its projection recomputed. */
  (camera as unknown as { isOrthographicCamera: boolean }).isOrthographicCamera = true;

  /* The projection matrix above has a negative determinant, because the
     drawing's y runs down the screen while world Y runs up. That reverses
     triangle winding, so front faces would be culled and every plate would
     render as its own dark underside. The plates are closed boxes, so
     drawing both sides costs nothing and removes the handedness question
     entirely. */
  const solid = (color: number) =>
    new THREE.MeshLambertMaterial({ color, side: THREE.DoubleSide });

  const inkMat = new THREE.LineBasicMaterial({
    color: C.ink,
    transparent: true,
    opacity: 0.56,
  });
  const gridMat = new THREE.LineBasicMaterial({
    color: C.ink,
    transparent: true,
    opacity: 0.05,
  });

  /* ------------------------------------------------------------ ground */

  const gSide = S + OVERHANG * 2;
  const ground = new THREE.Mesh(
    new THREE.BoxGeometry(gSide, GROUND_THICK, gSide),
    solid(C.ground)
  );
  ground.position.set(S / 2, -GROUND_THICK / 2, S / 2);
  scene.add(ground);
  scene.add(lineObject(groundGridPlan(), 0.4, gridMat));

  /* ------------------------------------------------------------ plates */

  type Plate = {
    id: string;
    lift: number;
    group: THREE.Group;
    face: THREE.Mesh;
    faceMat: THREE.MeshLambertMaterial;
    ink: THREE.Group;
    inkMat: THREE.LineBasicMaterial;
    nodeMat: THREE.MeshBasicMaterial;
    dashMat: THREE.LineDashedMaterial;
  };

  const plates: Plate[] = PLATES.map((p) => {
    const group = new THREE.Group();

    const faceMat = solid(C.face);
    const face = new THREE.Mesh(
      new THREE.BoxGeometry(S, THICK, S),
      faceMat
    );
    face.position.set(S / 2, -THICK / 2, S / 2);
    face.userData.plateId = p.id;
    group.add(face);

    const { lines, marks, nodes } = artworkPlan(p.art as Art);
    const plateInk = inkMat.clone();
    const nodeMat = new THREE.MeshBasicMaterial({ color: C.ink, transparent: true });
    const ink = new THREE.Group();
    ink.add(lineObject([...lines, ...marks], 0.6, plateInk));
    nodes.forEach((n) => {
      const g = new THREE.Mesh(new THREE.BoxGeometry(n.size, 1.2, n.size), nodeMat);
      g.position.set(n.p[0], 0.8, n.p[1]);
      ink.add(g);
    });
    group.add(ink);

    /* The edge stays dashed, because that is the whole argument of the
       section: solid ground, dashed sheets. */
    const outline = new THREE.BufferGeometry().setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        toPoints(
          {
            pts: [
              [0, 0],
              [S, 0],
              [S, S],
              [0, S],
            ],
            closed: true,
          },
          0.9
        ),
        3
      )
    );
    const dashMat = new THREE.LineDashedMaterial({
      color: C.edge,
      dashSize: 7,
      gapSize: 5,
      transparent: true,
    });
    const dashed = new THREE.Line(outline, dashMat);
    dashed.computeLineDistances();
    const edges = new THREE.Group();
    edges.add(dashed);
    group.add(edges);

    scene.add(group);
    return { id: p.id, lift: p.lift, group, face, faceMat, ink, inkMat: plateInk, nodeMat, dashMat };
  });

  /* ---------------------------------------------------------- behaviour */

  let explode = 1;
  let active: string | null = null;
  let dirty = true;
  let running = true;
  let firstFrame = true;
  let raf = 0;

  const applyLifts = () => {
    plates.forEach((p) => {
      p.group.position.y = REST + p.lift * explode;
    });
  };

  /* rest, lit and dim, the same three states the SVG has. Only the edge
     takes the accent; the linework comes up to full ink, because accent on
     both turns the sheet into one red mass and the drawing stops reading. */
  const applyActive = () => {
    plates.forEach((p) => {
      const lit = active === p.id;
      const dim = active !== null && !lit;

      p.faceMat.opacity = dim ? 0.34 : 1;
      p.faceMat.transparent = dim;

      const inkOpacity = dim ? 0.18 : lit ? 1 : 0.56;
      p.inkMat.opacity = inkOpacity;
      p.nodeMat.opacity = inkOpacity;

      p.dashMat.color.set(lit ? C.accent : C.edge);
      p.dashMat.opacity = dim ? 0.34 : 1;
    });
  };

  applyLifts();
  applyActive();

  const resize = () => {
    const w = host.clientWidth;
    const h = Math.round((w * VB.h) / VB.w);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // C8.5
    renderer.setSize(w, h, false);
    dirty = true;
  };
  resize();

  /* ------------------------------------------------------------ picking */

  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let pickFn: (id: string | null) => void = () => {};
  const faces = plates.map((p) => p.face);

  const onMove = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(faces, false)[0];
    pickFn((hit?.object.userData.plateId as string) ?? null);
  };
  const onLeave = () => pickFn(null);
  canvas.addEventListener("pointermove", onMove, { passive: true });
  canvas.addEventListener("pointerleave", onLeave);

  /* -------------------------------------------------------- render loop */

  const tick = () => {
    if (!running) return;
    if (dirty) {
      renderer.render(scene, camera);
      dirty = false;
      if (firstFrame) {
        firstFrame = false;
        onFirstFrame();
      }
    }
    raf = requestAnimationFrame(tick);
  };

  /* Render on demand, and never while off screen or in a hidden tab. */
  const io = new IntersectionObserver(
    (entries) => {
      running = entries.some((e) => e.isIntersecting);
      if (running) {
        dirty = true;
        raf = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(raf);
      }
    },
    { rootMargin: "200px" }
  );
  io.observe(host);

  const onVisibility = () => {
    if (document.hidden) {
      running = false;
      cancelAnimationFrame(raf);
    } else {
      running = true;
      dirty = true;
      raf = requestAnimationFrame(tick);
    }
  };
  document.addEventListener("visibilitychange", onVisibility);

  raf = requestAnimationFrame(tick);

  return {
    setExplode(t) {
      explode = t;
      applyLifts();
      dirty = true;
    },
    setActive(id) {
      if (id === active) return;
      active = id;
      applyActive();
      dirty = true;
    },
    onPick(fn) {
      pickFn = fn;
    },
    resize() {
      resize();
    },
    dispose() {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      scene.traverse((o) => {
        const any = o as THREE.Mesh;
        any.geometry?.dispose?.();
        const m = any.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(m)) m.forEach((x) => x.dispose());
        else m?.dispose?.();
      });
      renderer.dispose();
    },
  };
}
