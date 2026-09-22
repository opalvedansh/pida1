/**
 * Parallax.
 *
 * DEVIATION. A6.10 says "No parallax, no scroll-jacking, no cursor effects."
 * This is here by an explicit decision and is recorded as a deviation from
 * that rule. The rules it does not get to ignore still apply, so:
 *
 *   C7.1  transform only, and nothing else;
 *   C7.1  driven by ScrollTrigger's scrub, never a scroll listener;
 *   C7.4  never created at all under reduced motion, which is enforced one
 *         level up in Motion.tsx rather than repeated here.
 *
 * Usage: data-pida-parallax="36" travels from +36px to -36px across the
 * element's pass through the viewport. The value is plain pixels of travel
 * each way, because a fraction of something invisible is impossible to tune.
 *
 * Keep the numbers small. Parallax reads as depth at 20 to 60 px and as a
 * layout bug past that, and several sections here sit inside containers with
 * overflow: clip (Steps) or overflow: hidden (Hero), which will crop anything
 * that travels far. Prefer targets where being clipped is the intent.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initParallax(): () => void {
  const els = gsap.utils.toArray<HTMLElement>("[data-pida-parallax]");
  if (!els.length) return () => {};

  const tweens = els.map((el) => {
    const travel = Number.parseFloat(el.dataset.pidaParallax || "") || 32;

    return gsap.fromTo(
      el,
      { y: travel },
      {
        y: -travel,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          /* A scrubbed tween is live for the whole pass, so will-change goes
             on when the element enters and comes off when it leaves, rather
             than sitting on the element permanently. */
          onToggle: (self) =>
            gsap.set(el, {
              willChange: self.isActive ? "transform" : "auto",
            }),
        },
      }
    );
  });

  return () => {
    tweens.forEach((t) => {
      t.scrollTrigger?.kill();
      t.kill();
    });
    gsap.set(els, { clearProps: "transform,willChange" });
  };
}
