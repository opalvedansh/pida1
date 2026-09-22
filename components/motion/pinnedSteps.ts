/**
 * The rail beside the four tools.
 *
 * WHAT THIS USED TO BE, AND WHY IT IS NOT ANY MORE
 *
 * A pinned sequence: the list was translated through a one-viewport frame so
 * each step came to rest in the middle in turn, and the scroll snapped from
 * one to the next. Two things were wrong with it. One flick of the wheel
 * took the reader a whole step, which is the page reading its own scrollbar
 * rather than the reader doing it. And the frame was exactly one viewport
 * tall, so the fourth step's card was clipped by the bottom of it and its
 * body copy was never visible at all.
 *
 * So there is no pin, no snap and no frame. The section scrolls like every
 * other section on the page. All that is left is what the rail needs: one
 * number for how far down the four the reader has got, and a lit ordinal for
 * the one they are on.
 *
 * `--pida-rail` runs 0 to 1 across the section and the stylesheet grows the
 * lit run to match, so the fill and the ordinals going red are the same
 * measurement and cannot drift apart. data-pida-active and data-pida-passed
 * are unchanged, so every rule already written against them still applies.
 *
 * With the script absent, under reduced motion, or below the width this is
 * built for, none of it exists: the rail is unlit, every ordinal is at rest,
 * and the section is a plain list of four. That is C7.4's requirement and it
 * is also just the markup.
 */
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SECTION = "#pid-making";

/** Returns a teardown that restores everything it touched. */
export function initPinnedSteps(): () => void {
  const section = document.querySelector<HTMLElement>(SECTION);
  const steps = section
    ? Array.from(section.querySelectorAll<HTMLElement>('[data-pida="step"]'))
    : [];
  if (!section || steps.length < 2) return () => {};

  const rail = section.querySelector<HTMLElement>('[data-pida="rail-run"]');

  /* WHERE EACH BOX SITS ON THE RAIL, AS A FRACTION OF IT.
   *
   * A box lights when the run actually arrives at it, so the threshold has
   * to be the box's own position, measured.
   *
   * It used to be Math.round(progress * 3), which is not a position at all:
   * that lit box 02 at 17% of the way down, long before the run was
   * anywhere near it, and box 03 at 50%, which is somewhere else again. The
   * run and the lighting were two different numbers pretending to be one.
   *
   * Measured once per refresh rather than every frame, because the layout
   * only moves when ScrollTrigger says it has. Box 01 sits above the top of
   * the run, so its threshold comes out at or below zero and it is lit from
   * the first frame. It is the only one that should be. */
  let marks: number[] = steps.map(() => 0);

  const measure = () => {
    if (!rail) return;
    const top = rail.getBoundingClientRect().top + window.scrollY;
    const height = rail.offsetHeight || 1;
    marks = steps.map((step) => {
      const box = step.querySelector<HTMLElement>('[data-pida="step-box"]');
      if (!box) return 0;
      /* The head has to reach the box's TOP edge: that is the moment the
         run meets the square and splits around it. */
      const y = box.getBoundingClientRect().top + window.scrollY;
      return (y - top) / height;
    });
  };

  const light = (progress: number) => {
    let reached = 0;
    steps.forEach((step, i) => {
      const passed = progress >= marks[i];
      if (passed) reached = i;
      step.dataset.pidaPassed = passed ? "true" : "false";
    });
    steps.forEach((step, i) => {
      step.dataset.pidaActive = i === reached ? "true" : "false";
    });
  };

  measure();
  light(0);
  /* Claim the variable straight away. The stylesheet lights the whole rail
     when --pida-rail is absent, which is what a reader with no JavaScript
     should see, and it used to be what everyone saw between the page
     loading and the trigger going live: scroll in and the rail was full,
     then emptied the moment it started tracking. Writing 0 here means the
     script owns the rail from the first frame it exists. */
  section.style.setProperty("--pida-rail", "0");

  const trigger = ScrollTrigger.create({
    /* THE RUN KEEPS STATION IN THE MIDDLE OF THE WINDOW.
     *
     * The trigger is the rail itself, not the section, and it runs from its
     * top crossing the middle of the window to its bottom crossing the same
     * line. That makes the progress the exact fraction of the rail above the
     * window's centre, and since the head is drawn at that fraction of the
     * rail, the head sits ON the centre line the whole way down. It cannot
     * run ahead of the reader or trail behind them.
     *
     * The old range was the whole SECTION, from 65% to 55% of the window,
     * which is 4,982 pixels of scroll for 4,370 pixels of rail: the head
     * crept up the screen the whole way and the run finished early, with the
     * last of it somewhere above the fold. Tying the two together is both
     * the slower feel and one fewer number to guess at. */
    trigger: rail ?? section,
    start: "top center",
    end: "bottom center",
    invalidateOnRefresh: true,
    onRefresh: () => {
      measure();
      light(parseFloat(section.style.getPropertyValue("--pida-rail")) || 0);
    },
    onUpdate: (self) => {
      section.style.setProperty("--pida-rail", self.progress.toFixed(4));
      light(self.progress);
    },
  });

  return () => {
    trigger.kill();
    section.style.removeProperty("--pida-rail");
    steps.forEach((step) => {
      delete step.dataset.pidaActive;
      delete step.dataset.pidaPassed;
    });
  };
}
