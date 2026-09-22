/**
 * The four formats arrive as one pill and separate into four.
 *
 * WHAT IT SAYS
 *
 * The sentence above the chips is that one set of files opens in the CAD and
 * hydraulic tools a team already has. So the chips start as one object and
 * come apart into DXF, DEXPI, PDF and XLSX: one export, four formats. It is
 * the same argument the copy makes, made once more in the only way a chip
 * can make it.
 *
 * HOW IT IS BUILT
 *
 * Nothing reflows. The chips never change size and the gaps between them are
 * never animated; each chip is translated by exactly the gap it has to close,
 * and the whole run is re-centred by half the gap it swallowed. The outline
 * moves between two layers rather than being redrawn: a single .fused pill
 * around the closed run, and a .skin on each chip, crossfading as the run
 * opens. So this is transform and opacity only, which is what C7.1 allows.
 *
 * WHERE IT DOES NOT RUN
 *
 * If the chips have wrapped onto more than one line the arithmetic below is
 * meaningless, so it does not run at all and the row stays as it is. Under
 * reduced motion the motion layer never reaches this file, and with no
 * JavaScript the stylesheet's rest state is already the open row.
 */
import { gsap } from "gsap";

const WRAP = "[data-pida-formats]";
const FUSED = "[data-pida-formats-fused]";
const CHIP = "[data-pida-formats-chip]";

/** Returns a teardown that restores everything it touched. */
export function initFormatSplit(): () => void {
  const wrap = document.querySelector<HTMLElement>(WRAP);
  const fused = wrap?.querySelector<HTMLElement>(FUSED);
  if (!wrap || !fused) return () => {};

  const chips = gsap.utils.toArray<HTMLElement>(CHIP, wrap);
  if (chips.length < 2) return () => {};

  /* One line only. A wrapped run has no single closed shape to open out of. */
  const firstTop = chips[0].offsetTop;
  if (chips.some((c) => c.offsetTop !== firstTop)) return () => {};

  const list = chips[0].parentElement as HTMLElement;
  const gap = parseFloat(getComputedStyle(list).columnGap || "0") || 0;
  if (!gap) return () => {};

  /* Closing the run means chip i gives up the i gaps to its left. Shifting
     the whole run right by half the gaps it swallowed keeps it centred on
     the same axis it rests on, so nothing slides sideways overall. */
  const closed = chips.map((_, i) => (gap * (chips.length - 1)) / 2 - gap * i);

  const skins = chips.map((c) => c.firstElementChild as HTMLElement);
  const seams = chips.map((c) => c.children[1] as HTMLElement);

  /* The closed run is the four chips with every gap taken out of it. Set on
     the element rather than in the stylesheet, which cannot add up four
     widths it has never measured. */
  const width = chips.reduce((sum, c) => sum + c.offsetWidth, 0);
  const prevWidth = fused.style.width;
  const prevHeight = fused.style.height;
  fused.style.width = `${width}px`;
  fused.style.height = `${chips[0].offsetHeight}px`;

  gsap.set(chips, { x: (i: number) => closed[i] });
  gsap.set(skins, { opacity: 0 });
  /* The first chip has nothing to its left to be divided from. */
  gsap.set(seams, { opacity: (i: number) => (i === 0 ? 0 : 1) });
  gsap.set(fused, { opacity: 1 });

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: wrap,
      start: "top 86%",
      end: "top 48%",
      scrub: 0.5,
      invalidateOnRefresh: true,
      onToggle: ({ isActive }) =>
        gsap.set([...chips, fused], {
          willChange: isActive ? "transform, opacity" : "auto",
        }),
    },
  });

  tl
    /* The seams go first, so the run is already divided before it opens.
       The single outline goes with them. */
    .to(seams, { opacity: 0, duration: 0.3 }, 0)
    .to(fused, { opacity: 0, duration: 0.3 }, 0)
    /* Each chip closes its own outline as it leaves. Staggered from the
       left, so the run unzips rather than jumping apart in one frame. */
    .to(skins, { opacity: 1, duration: 0.3, stagger: 0.06 }, 0.12)
    .to(chips, { x: 0, duration: 0.7, stagger: 0.06 }, 0.12);

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
    gsap.set([...chips, ...skins, ...seams, fused], {
      clearProps: "transform,opacity,willChange",
    });
    fused.style.width = prevWidth;
    fused.style.height = prevHeight;
  };
}
