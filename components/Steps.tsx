/**
 * The four steps.
 *
 * THE LAYOUT, AND WHY IT IS NO LONGER A ZIG-ZAG
 *
 * The reference in /hoplite alternates its blocks right, left, right, left
 * around a centred chip rail, with a spine that bows 28px past each block in
 * turn. That buys movement and costs three things. The panel can only be
 * half the rail wide, so every figure in it is small. The reader's eye
 * restarts on the other side of the page at each step, which is the opposite
 * of what a numbered sequence wants. And the ordinals sit in the middle,
 * where they are furthest from the margin a reader scans down.
 *
 * So the rail is now two columns, not three:
 *
 *   an index column on the left, holding a large ordinal and a continuous
 *   hairline running down through every step, with a node where each step's
 *   leader departs;
 *
 *   one column of panels on the right, every one of them aligned to the same
 *   left edge and about twice the old width, so the figures have room;
 *
 *   a level leader from the rail node to the panel's near corner, the same
 *   figure the sheets section uses to tie words to a drawing;
 *
 *   a well panel holding the figure, with a text card nested in its foot at
 *   a 6px inset, carrying the title, a four-bar step meter and the body;
 *
 *   faint circuit traces down both margins.
 *
 * WHAT GOES IN THE PANELS
 *
 * The reference builds its panels out of divs styled to look like
 * screenshots of its product: file trees, sandbox tiles, chat threads. That
 * is the frame, not the content. The frame is copied exactly; the content is
 * PIDA's own and real. Step 02 is the screenshot slot and still carries a
 * placeholder, because the file is not in the folder yet.
 *
 * The chips are aria-hidden. The ordinals are decoration over an <ol>, which
 * already carries the sequence for anything that is not looking at it.
 */
import { CrosshairSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import MediaPlaceholder from "./MediaPlaceholder";
import styles from "./Steps.module.css";

const wizard = [
  "Equipment",
  "Spark filter",
  "Inlets",
  "Outlets",
  "Solids & cleaning",
  "Utilities",
  "Instrumentation",
  "Controlled streams",
  "Review",
];

const deliverables = [
  "Independent check report",
  "Redline drawing",
  "Line list",
  "Valve list",
  "Instrument index",
  "HAZOP starter",
  "Isolation plan",
  "Flow paths as PDF layers",
  "Hashed revision chain",
  "DEXPI export",
];

/**
 * Four segments, n of them lit. It used to sit in the corner of the text
 * card, where it was a decoration next to a title that already said what the
 * step was. In the index column it is doing the one job it is good at:
 * saying how far down a four-step sequence this step is.
 */
function Meter({ step }: { step: number }) {
  return (
    <span className={styles.meter} aria-hidden="true">
      {[1, 2, 3, 4].map((i) => (
        <span key={i} data-lit={i <= step ? "true" : undefined} />
      ))}
    </span>
  );
}

/** The faint trace bundle that runs down a margin. */
function Traces({ side }: { side: "left" | "right" }) {
  return (
    <svg
      className={`${styles.traces} ${styles[side]}`}
      /* Parallax, a deviation from A6.10. These are the one thing in the
         section with nothing aligned to them, so they can drift without
         pulling anything out of register. */
      data-pida-parallax="40"
      viewBox="0 0 160 1600"
      width="160"
      height="1600"
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeLinejoin="round">
        <path d="M24 0 V420 L64 460 V975" />
        <path d="M56 0 V300 L96 340 V755" />
        <path d="M88 0 V180 L128 220 V535" />
        <path d="M40 1600 V1300 L80 1260 V1085" />
      </g>
      <g fill="currentColor">
        <rect x="61" y="975" width="6" height="6" rx="1" />
        <rect x="93" y="755" width="6" height="6" rx="1" />
        <rect x="125" y="535" width="6" height="6" rx="1" />
        <rect x="77" y="1079" width="6" height="6" rx="1" />
        <rect x="22.5" y="598" width="3" height="3" rx="0.5" />
        <rect x="62.5" y="640" width="3" height="3" rx="0.5" />
        <rect x="94.5" y="470" width="3" height="3" rx="0.5" />
        <rect x="126.5" y="330" width="3" height="3" rx="0.5" />
        <rect x="38.5" y="1420" width="3" height="3" rx="0.5" />
      </g>
    </svg>
  );
}

function Step({
  n,
  title,
  body,
  children,
}: {
  n: number;
  title: string;
  body: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className={styles.step} data-pida="step">
      {/* The index column. The ordinal is decoration over an <ol>, which
          already carries the sequence for anything not looking at it. The
          rule runs on into the gap below, so the four steps read as one
          continuous datum rather than four detached blocks.

          data-active on the first ordinal is the state with no JavaScript:
          step 01 is lit and the rest are quiet. Once the pinned sequence is
          running it sets data-pida-active on the <li> instead, and the
          stylesheet prefers that. */}
      <div className={styles.index} aria-hidden="true">
        <span className={styles.ordinal} data-active={n === 1 ? "true" : undefined}>
          {String(n).padStart(2, "0")}
        </span>
        <Meter step={n} />
        {n < 4 && <span className={styles.indexRule} />}
      </div>

      <div className={styles.content}>
        <span className={styles.connector} aria-hidden="true">
          <span className={styles.connectorLine} />
          <span className={styles.connectorNode} />
        </span>

        <div className={styles.panel} data-first={n === 1 ? "true" : undefined}>
          {/* Three overlays, as the reference stacks them: a radial wash in
              the near corner, a half-pixel accent edge masked to the same
              corner, and a wider wash behind both. Only the first step
              lights them; the rest stay neutral. */}
          <span className={styles.panelWash} aria-hidden="true" />
          <span className={styles.panelEdge} aria-hidden="true" />

          <div className={styles.stage}>{children}</div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardBody}>{body}</p>
            <span className={styles.cardSheen} aria-hidden="true" />
          </div>
        </div>
      </div>
    </li>
  );
}

export default function Steps() {
  return (
    <section id="pid-making" className={`${styles.steps} band`}>
      <div className="container">
        {/* The reveal is on each line rather than on the header, so the three
            cross the trigger in the same frame and ScrollTrigger.batch gives
            them one staggered rise. That is the hero's entrance, and a header
            that fades in as a single block next to it reads as a different
            page. */}
        <header className={styles.head}>
          <p className="eyebrow" data-pida-reveal="text">
            <CrosshairSimpleIcon size={14} weight="bold" aria-hidden="true" />
            Product
          </p>

          <h2 className="display-l wash" data-pida-reveal="text">
            From a blank sheet to a
            <br />
            checked package in{" "}
            <span className="accent-word">four steps</span>.
          </h2>

          <p
            className={`sub-headline ${styles.headSub}`}
            data-pida-reveal="text"
          >
            We take nine short answers, draw the sheet, check it against
            itself, and write the whole deliverables package beside it.
          </p>
        </header>

        <div className={styles.rail} data-pida="rail">
          <Traces side="left" />
          <Traces side="right" />

          {/* The frame is the window the pinned sequence scrolls the list
              through. It is an ordinary wrapper with no height of its own;
              only while the section is pinned does the motion layer give it
              a viewport height and an overflow, so the layout here and the
              layout below 1024px are untouched by any of this. The traces
              sit outside it, in the margins, so they are never clipped. */}
            <div className={styles.frame} data-pida="step-frame">
              <ol className={styles.list} data-pida="step-list">
              <Step
                n={1}
                title="Answer nine short steps"
                body="Equipment, spark filter, inlets, outlets, solids and cleaning, utilities, instrumentation, controlled streams, review. Short answers, in the words an engineer already uses. No symbol library and no drafting."
              >
                <ul className={styles.chips}>
                  {wizard.map((c) => (
                    <li key={c} className={styles.wizardChip} data-pida="chip">
                      {c}
                    </li>
                  ))}
                </ul>
              </Step>

              <Step
                n={2}
                title="Watch the schematic build"
                body={
                  <>
                    The drawing assembles beside you as you answer, under one
                    sentence: &ldquo;This is exactly what will be drawn.&rdquo;
                    There is no gap between what you reviewed and what arrives.
                  </>
                }
              >
                {/* No ratio override, so this takes the component's 16/10.
                    The 4/3 it used to carry was sized for a 22rem panel; in a
                    panel twice that wide it stands 600px tall and swamps the
                    other three steps. The handoff marks every ratio here
                    provisional and to be measured off the real file (0.3), and
                    what this frame shows, a step list beside a live schematic,
                    is a wide picture. */}
                <MediaPlaceholder
                  id="M1"
                  file="pida-generator-review.png"
                  caption=""
                  alt="The P&ID Generator at its review step. A nine-step list on the left, a live schematic of the reactor and spark filter train on the right, under the sentence: This is exactly what will be drawn. The independent check reads PASS."
                />
              </Step>

              <Step
                n={3}
                title="Generate, and it checks itself"
                body="Press Generate and PIDA draws the P&ID as a DXF, then checks it independently and writes a redline. The same specification always produces the same drawing, byte for byte."
              >
                {/* The verdict as the run report writes it, set as type. A
                    quotation of a result, not a picture of one. */}
                <div className={styles.verdict}>
                  <span className={`mono-label ${styles.verdictLabel}`}>
                    Independent check
                  </span>
                  <p className={`${styles.verdictFigure} tabular`}>
                    PASS
                  </p>
                  <p className={`${styles.verdictDetail} tabular`}>
                    0 error, 0 warning
                  </p>
                  <p className={styles.verdictNote}>
                    From one real run. It describes that run, not every project.
                  </p>
                </div>
              </Step>

              <Step
                n={4}
                title="Take the whole package"
                body="The line list, valve list and instrument index are written from the same model as the drawing, so the copies cannot drift apart. One real run listed 12 lines, 28 valves and 23 instruments."
              >
                <ul className={styles.deliverables}>
                  {deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </Step>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
