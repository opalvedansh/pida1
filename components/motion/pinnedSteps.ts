/**
 * The one pinned sequence of the site.
 *
 * A6.10 and C7.1 both allow exactly one, and both name the section: "One
 * pinned sequence on the whole site, in section 01, at 1024 px and wider,
 * never on touch devices." Section 01 is `#pid-making`, the product rail.
 * Nothing else on this page may pin, and nothing else does.
 *
 * HOW IT WORKS
 *
 * The list of four steps is about 2,150 px tall, so pinning it as-is would
 * fix an element twice the height of the window and put its lower half out of
 * reach. Instead the frame around the list is made exactly one viewport tall
 * and pinned, and the list is translated through it, so each step comes to
 * rest in the middle in turn while the section holds still.
 *
 * ORDER MATTERS HERE
 *
 * The frame is sized *before* the ScrollTrigger is created. ScrollTrigger
 * measures its pinned element and builds a spacer at construction time, so
 * sizing it afterwards leaves the spacer wrong and the frame keeps its full
 * 2,150 px. The sizing is done by setting data-pida-pinned on the section and
 * letting the stylesheet own the rule, which also means the un-pinned layout
 * and every layout below 1024 px is untouched by the existence of the pin.
 *
 * The end distance is in pixels, not `+=300%`. A percentage there is relative
 * to the scroller, which reads as the same thing until the window is an
 * unusual shape and then quietly is not.
 *
 * WHERE THIS DEPARTS FROM C7.3
 *
 * C7.3 specifies `+=200%` for a three-beat sequence whose beats were M1, the
 * nine chips filling, and an M1-to-M2 crossfade. The section has since been
 * rebuilt as four steps, so the distance is one viewport per transition and
 * the snap has four points rather than three. Scrub, pin gating and
 * anticipatePin are unchanged.
 *
 * The lighting is done by toggling data attributes, not by tweening colour,
 * because C7.1 allows only transform, opacity, clip-path and stroke-dashoffset
 * to be animated. A colour change driven by a CSS transition on a state
 * attribute is an interface state change, which A6.10 allows at 120 to 200 ms.
 *
 * ACCESSIBILITY
 *
 * C15: "The pinned sequence must not trap keyboard users. All of its content
 * is in the DOM in reading order, and tabbing moves through it. While focus
 * is inside section 01, the pin is disabled and the section shows its stacked
 * layout." The focusin handler below does exactly that, permanently for the
 * rest of the session once a keyboard user has been inside the section.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SECTION = "#pid-making";

export function initPinnedSteps(): () => void {
  const section = document.querySelector<HTMLElement>(SECTION);
  const frame = section?.querySelector<HTMLElement>('[data-pida="step-frame"]');
  const list = section?.querySelector<HTMLElement>('[data-pida="step-list"]');
  if (!section || !frame || !list) return () => {};

  const steps = Array.from(
    list.querySelectorAll<HTMLElement>('[data-pida="step"]')
  );
  if (steps.length < 2) return () => {};

  const last = steps.length - 1;

  /* Size the frame first. See "ORDER MATTERS HERE" above. */
  section.dataset.pidaPinned = "true";

  /**
   * Where the list must sit for step i to come to rest in the frame.
   *
   * Dead centre, but with a ceiling on how far down the frame a short step is
   * pushed. The frame is a viewport tall from the moment this runs, and the
   * pin does not engage until the frame's own top reaches the viewport top,
   * so for the length of the header there is a stretch where the frame is on
   * screen and unpinned. Centring a 388px step in a 900px frame put 256px of
   * nothing between the heading and step 01 for that whole stretch, which
   * read as a hole in the layout rather than as space.
   */
  const restFor = (i: number) => {
    const step = steps[i];
    const centred = Math.max(0, (frame.clientHeight - step.offsetHeight) / 2);
    const slack = Math.min(centred, frame.clientHeight * 0.14);
    return -(step.offsetTop - slack);
  };

  let current = -1;
  const light = (i: number) => {
    if (i === current) return;
    current = i;
    steps.forEach((step, n) => {
      step.dataset.pidaActive = n === i ? "true" : "false";
      step.dataset.pidaPassed = n <= i ? "true" : "false";
    });
  };

  gsap.set(list, { y: restFor(0) });
  light(0);

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: frame,
      start: "top top",
      end: () => `+=${last * window.innerHeight}`,
      pin: frame,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 0.6,
      invalidateOnRefresh: true,
      snap: { snapTo: steps.map((_, i) => i / last), duration: 0.3 },
      onUpdate: (self) => light(Math.round(self.progress * last)),
      onToggle: (self) =>
        gsap.set(list, { willChange: self.isActive ? "transform" : "auto" }),
    },
  });

  for (let i = 1; i <= last; i += 1) {
    tl.to(list, { y: () => restFor(i), duration: 1 }, i - 1);
  }

  const restore = () => {
    tl.scrollTrigger?.kill(true);
    tl.kill();
    delete section.dataset.pidaPinned;
    gsap.set(list, { clearProps: "transform,willChange" });
  };

  /* C15: the moment a keyboard user lands anywhere inside the section, the
     pin goes away and the section returns to its stacked layout, with every
     step lit so nothing is left dimmed behind them. */
  const release = () => {
    restore();
    steps.forEach((step) => {
      step.dataset.pidaActive = "true";
      step.dataset.pidaPassed = "true";
    });
    section.removeEventListener("focusin", release);
    ScrollTrigger.refresh();
  };
  section.addEventListener("focusin", release);

  return () => {
    section.removeEventListener("focusin", release);
    restore();
    steps.forEach((step) => {
      delete step.dataset.pidaActive;
      delete step.dataset.pidaPassed;
    });
  };
}
