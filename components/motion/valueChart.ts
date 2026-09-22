/**
 * The value plate counts itself in.
 *
 * WHY THIS ONE ANIMATES AND NOTHING ELSE IN THE SECTION DOES
 *
 * The heading above it says every value is accounted for. The plate below it
 * is 46 squares, one per value, from one real run. Filling them in order as
 * the plate arrives is the claim happening rather than the claim asserted,
 * and it is the only thing in the section with a reason to move. The rest of
 * the plates take the page's shared reveal and nothing more.
 *
 * It is scrubbed rather than played, so the reader controls the count and can
 * stop halfway through it. The squares are already in document order by
 * state, 33 given then 5 sourced then 8 assumed, so the fill also reads out
 * the composition: a long accent run, a short outlined one, a grey tail.
 *
 * C7.1: only transform and opacity, and will-change goes on when the trigger
 * is entered and comes off when it is left.
 *
 * C7.4: the hidden state is set here, after this has confirmed it is
 * running. With the script absent, with JavaScript off, or under reduced
 * motion, the stylesheet draws all 46 squares and nothing waits on a tween.
 */
import { gsap } from "gsap";

const CHART = "[data-pida-chart]";

/** Returns a teardown that restores every square it touched. */
export function initValueChart(): () => void {
  const chart = document.querySelector<HTMLElement>(CHART);
  if (!chart) return () => {};

  const squares = gsap.utils.toArray<HTMLElement>(":scope > *", chart);
  if (!squares.length) return () => {};

  gsap.set(squares, { opacity: 0, scale: 0.55, transformOrigin: "50% 50%" });

  const tween = gsap.to(squares, {
    opacity: 1,
    scale: 1,
    duration: 0.5,
    ease: "none",
    /* 46 squares over the scrub: the stagger is what makes it a count rather
       than a fade. `amount` rather than `each`, so the run always takes the
       same share of the scroll however many values the plate carries. */
    stagger: { amount: 1.6 },
    scrollTrigger: {
      trigger: chart,
      /* The plate is one band, so it is counted in over the stretch between
         it entering the lower third and settling in the upper third. */
      start: "top 88%",
      end: "top 38%",
      scrub: 0.5,
      invalidateOnRefresh: true,
      onToggle: ({ isActive }) =>
        gsap.set(chart, {
          willChange: isActive ? "transform, opacity" : "auto",
        }),
    },
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
    gsap.set(squares, { clearProps: "opacity,transform,willChange" });
    gsap.set(chart, { clearProps: "willChange" });
  };
}
