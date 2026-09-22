/**
 * The hero stage.
 *
 * WHAT IT DOES AND WHY IT EXISTS
 *
 * One move, scrubbed against the scroll: the generated sheet arrives out of a
 * 3D zoom while the copy dollies past the camera and fades. It is the
 * reference hero's device (memorable.sh) and it is here for one reason, which
 * is the test C7 asks of any tween on this page: the reader is shown the
 * claim, and then the same gesture puts the artefact that has to back it up
 * on the whole screen. Nothing else on the hero animates.
 *
 * THE SWITCH IS OWNED HERE
 *
 * Hero.module.css holds a plain stacked hero. This file sets
 * data-pida-hero-stage="on", and only that attribute turns the section into a
 * 220vh runway with a pinned pane. So the tall scroll and the 3D exist only
 * where the tween exists. With the script absent, with JavaScript off, under
 * reduced motion, and below 768px, the reader gets one screen of copy over
 * one drawing and never scrolls through a pinned pane that is not moving.
 *
 * This is also why the hero no longer carries data-pida-reveal: the intro
 * below replaces it, so the shared reveal and this file cannot both claim the
 * opacity of the same element.
 *
 * C7.1 is respected throughout: only transform and opacity are animated, and
 * will-change goes on when the pin is entered and comes off when it is left,
 * never as a standing declaration.
 */
import { gsap } from "gsap";

const STAGE = "[data-pida-hero-stage]";
const COPY = "[data-pida-hero-copy]";
const SHEET = "[data-pida-hero-sheet]";
const INTRO = "[data-pida-hero-intro]";

/**
 * @param stage3d Whether the viewport is big enough to earn the pinned 3D
 *   pane. False collapses to the intro alone, which is the mobile path.
 * @returns a teardown that restores everything it touched.
 */
export function initHeroStage(stage3d: boolean): () => void {
  const stage = document.querySelector<HTMLElement>(STAGE);
  const copy = stage?.querySelector<HTMLElement>(COPY);
  const sheet = stage?.querySelector<HTMLElement>(SHEET);
  if (!stage || !copy || !sheet) return () => {};

  const intro = gsap.utils.toArray<HTMLElement>(INTRO, copy);
  const cleanups: Array<() => void> = [];

  /* The load-in. The reference lifts its eyebrow, heading and buttons in one
     staggered rise; the values are C7.3's for a text block. */
  gsap.set(intro, { y: 20, opacity: 0 });
  const enter = gsap.to(intro, {
    y: 0,
    opacity: 1,
    duration: 0.7,
    stagger: 0.09,
    delay: 0.08,
    overwrite: true,
    onStart: () => gsap.set(intro, { willChange: "transform, opacity" }),
    onComplete: () => gsap.set(intro, { willChange: "auto" }),
  });
  cleanups.push(() => {
    enter.kill();
    gsap.set(intro, { clearProps: "transform,opacity,willChange" });
  });

  if (stage3d) {
    /* Turn the section into the runway before the trigger measures it. */
    stage.dataset.pidaHeroStage = "on";
    cleanups.push(() => {
      stage.dataset.pidaHeroStage = "off";
    });

    /* Frame zero: the sheet oversized and tilted behind the copy.
       z and scale multiply through the perspective divide, so the reference's
       own pair (translateZ 800px, scale 2.8, perspective 950) resolves to
       about thirteen times life size. That is fine over a video, which reads
       as light at any zoom; over a drawing it is a wall of cropped linework.
       420 and 1.55 resolve to 2.8x, which is a dolly you can still read. */
    gsap.set(sheet, { z: 420, scale: 1.55, rotationX: -7, opacity: 0 });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: stage,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        invalidateOnRefresh: true,
        onToggle: ({ isActive }) =>
          gsap.set([copy, sheet], {
            willChange: isActive ? "transform, opacity" : "auto",
          }),
      },
    });

    tl
      /* The sheet settles into its rest size first. */
      .to(sheet, { z: 0, scale: 1, rotationX: 0, duration: 0.62 }, 0)
      /* Opacity resolves well before the transform does, the way the
         reference fades its layer up: the biggest, most cropped part of the
         move happens while there is still nothing to look at. */
      .to(sheet, { opacity: 1, duration: 0.22 }, 0)
      /* The copy leaves through the camera, starting once the sheet is
         legible enough to take over. autoAlpha rather than opacity, so the
         buttons leave the tab order instead of staying focusable under a
         drawing nobody can see them on. */
      .to(copy, { z: 420, autoAlpha: 0, duration: 0.42 }, 0.3)
      /* A beat at the end, so the sheet is held at rest for the last third
         of the runway rather than unpinning the instant it arrives. */
      .to({}, { duration: 0.28 }, 0.72);

    cleanups.push(() => {
      tl.scrollTrigger?.kill();
      tl.kill();
      gsap.set([copy, sheet], {
        clearProps: "transform,opacity,visibility,willChange",
      });
    });

    /* No refresh here. Turning the runway on moves every trigger below it,
       and the pinned steps do the same thing in the other direction, so
       Motion.tsx re-measures everything once after all of them exist. */
  }

  return () => cleanups.forEach((fn) => fn());
}
