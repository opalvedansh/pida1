/**
 * Is WebGL 2 available?
 *
 * WHY THIS IS NOT A ONE-LINE CHECK WRITTEN TWICE
 *
 * `document.createElement("canvas").getContext("webgl2")` creates a real
 * context. Chrome allows a page about sixteen live WebGL contexts and, past
 * that, silently drops the OLDEST ones to make room. Both scenes on this page
 * used to run that line inline in their capability gate, and the gate runs
 * more than once: React mounts effects twice in development, Fast Refresh
 * remounts them on every edit, and each gate re-asks itself whenever the
 * window crosses its width breakpoint. Every one of those calls burned a
 * context and never gave it back, so after enough of them Chrome started
 * dropping the two contexts that were actually drawing something, and both
 * the hero and the plates went blank.
 *
 * So the probe runs at most once per page, hands its context straight back
 * through WEBGL_lose_context, and the answer is cached. Nothing here holds a
 * context open after it returns.
 */
let answer: boolean | null = null;

export function hasWebGL2(): boolean {
  if (answer !== null) return answer;
  if (typeof document === "undefined") return false;

  try {
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2");
    answer = !!gl;
    /* Give it back immediately. Without this the probe's context stays live
       for the life of the page and counts against the browser's budget. */
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    answer = false;
  }

  return answer;
}

/**
 * Why a scene declined to run, in one line in the console.
 *
 * Both scenes are gated, and every reason to decline is a legitimate one, so
 * a blank section looks identical whether the browser cannot do it or the
 * page is broken. This says which, in a form that can be read off a console
 * and repeated back, and it says it once per scene.
 */
export function explain(scene: string): void {
  if (typeof window === "undefined") return;
  const why: string[] = [];
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    why.push("reduced motion is on");
  }
  if (!window.matchMedia("(min-width: 768px)").matches) {
    why.push(`window is ${window.innerWidth}px, under 768`);
  }
  if (!window.matchMedia("(any-pointer: fine)").matches) {
    why.push("no fine pointer");
  }
  if (!hasWebGL2()) why.push("no WebGL 2");
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) why.push("data saver is on");

  if (why.length) {
    // eslint-disable-next-line no-console
    console.info(`[pida] ${scene} not shown: ${why.join(", ")}.`);
  }
}
