/**
 * The shared reveal.
 *
 * Values are C7.3's, not invented here:
 *
 *   trigger is the element, start `top 82%`, plays once, no scrub;
 *   text blocks move from y: 24, opacity: 0 to rest in 0.6 s, staggered 0.08 s;
 *   media frames move from y: 40, opacity: 0 to rest in 0.8 s.
 *
 * C7.4 is the reason the hidden state is set here in JavaScript rather than in
 * the stylesheet: "Initial hidden states are applied by the script (gsap.set)
 * after it has confirmed it is running, never by CSS alone." So with the script
 * absent or failed, every one of these elements is simply visible, and US-13's
 * no-JavaScript requirement holds without a second code path.
 *
 * ScrollTrigger.batch is what produces the stagger. Elements that cross the
 * start line in the same frame are collected into one tween, so a row of cards
 * enters as a row rather than as four unrelated animations that happen to be
 * near each other.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TEXT = '[data-pida-reveal="text"]';
const MEDIA = '[data-pida-reveal="media"]';

/** Returns a teardown that restores every element it touched. */
export function initReveals(): () => void {
  const text = gsap.utils.toArray<HTMLElement>(TEXT);
  const media = gsap.utils.toArray<HTMLElement>(MEDIA);
  const all = [...text, ...media];
  if (!all.length) return () => {};

  gsap.set(text, { y: 24, opacity: 0 });
  gsap.set(media, { y: 40, opacity: 0 });

  const batches = [
    ScrollTrigger.batch(text, {
      start: "top 82%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          overwrite: true,
          /* C7.1: will-change goes on immediately before the tween and comes
             off afterwards, never as a standing declaration. */
          onStart: () => gsap.set(batch, { willChange: "transform, opacity" }),
          onComplete: () => gsap.set(batch, { willChange: "auto" }),
        }),
    }),
    ScrollTrigger.batch(media, {
      start: "top 82%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          overwrite: true,
          onStart: () => gsap.set(batch, { willChange: "transform, opacity" }),
          onComplete: () => gsap.set(batch, { willChange: "auto" }),
        }),
    }),
  ].flat();

  return () => {
    batches.forEach((t) => t.kill());
    /* Leave nothing hidden behind us: matchMedia can revert this context when
       the user flips reduced motion on mid-session. */
    gsap.set(all, { clearProps: "transform,opacity,willChange" });
  };
}
