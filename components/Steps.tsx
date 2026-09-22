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
import Media from "./Media";
import styles from "./Steps.module.css";

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

function Step({
  n,
  title,
  body,
  note,
  children,
}: {
  n: number;
  title: string;
  body: React.ReactNode;
  /** One line of real figures under the body, where the tool has any. */
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <li className={styles.step} data-pida="step">
      {/* The index column. The ordinal is decoration over an <ol>, which
          already carries the sequence for anything not looking at it. The
          rule runs on into the gap below, so the four steps read as one
          continuous datum rather than four detached blocks.

          The ordinal and its meter live inside a square box, and the box is
          what the rail runs into. See .box in the stylesheet for why that
          one background is the whole of the splitting effect.

          data-active is the state with no JavaScript: step 01 is lit and the
          rest are quiet. Once the pinned sequence is running it sets
          data-pida-passed on the <li> instead, and the stylesheet prefers
          that. */}
      <div className={styles.index} aria-hidden="true">
        <span
          className={styles.box}
          data-pida="step-box"
          data-active={n === 1 ? "true" : undefined}
        >
          <span
            className={styles.ordinal}
            data-active={n === 1 ? "true" : undefined}
          >
            {String(n).padStart(2, "0")}
          </span>
          <Meter step={n} />
        </span>
        {/* On every step, including the last. The run carries on past box 04
            to the foot of the section, and without a rule under that box it
            was tracing over nothing: a lit line and a spark hanging in the
            dark. The stylesheet stops the last one at the foot of its own
            step rather than in the gap to a step that is not there. */}
        <span className={styles.indexRule} />
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
            {note && <p className={`mono-data ${styles.cardNote}`}>{note}</p>}
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
            Built and working
          </p>

          <h2 className="display-l wash" data-pida-reveal="text">
            Our <span className="accent-word">tools</span>.
          </h2>

          <p
            className={`sub-headline ${styles.headSub}`}
            data-pida-reveal="text"
          >
            Four of them, working today, over one record. Each reads from
            the same design data, so the whole project is internally
            consistent.
          </p>
        </header>

        <div className={styles.rail} data-pida="rail">
          {/* The rail. One continuous line down the index column, filled to
              wherever the reader has got to. While the pinned sequence is
              running it reads that sequence's own progress, so the fill and
              the ordinals lighting are the same measurement; with no script
              it fills against its own passage through the viewport. */}
          <span
            className={styles.rail_}
            data-pida="rail-run"
            aria-hidden="true"
          >
            <span className={styles.railFill} />
          </span>

          {/* The frame is the window the pinned sequence scrolls the list
              through. It is an ordinary wrapper with no height of its own;
              only while the section is pinned does the motion layer give it
              a viewport height and an overflow, so the layout here and the
              layout below 1024px are untouched by any of this. */}
            <div className={styles.frame} data-pida="step-frame">
              <ol className={styles.list} data-pida="step-list">
              <Step
                n={1}
                title="The generator"
                body="A process specification goes in and a valid, standards-compliant P&ID comes out in under thirty seconds."
              >
                <Media
                  src="/media/pida-input-output.mp4"
                  ratio="1920 / 1080"
                  strip="PIDA / Generator"
                  alt="A process specification going into the generator and a finished P&ID sheet coming out, with the deliverables written beside it."
                />
              </Step>

              <Step
                n={2}
                title="The manager"
                body="A new way to understand P&ID workflow and connectivity, to develop new workflows and improve efficiency."
              >
                <Media
                  src="/media/pida-manager.mp4"
                  ratio="1920 / 1080"
                  strip="PIDA / Manager"
                  alt="The manager holding a project's drawings, each with its specification, checks, deliverables and revision history."
                />
              </Step>

              <Step
                n={3}
                title="The workspace"
                body="Flow paths automated, and compatible with the industrial software already in use, Bluebeam Revu among them."
                note="Ask about the drawing in front of you and it answers in plain words, on the sheet."
              >
                <Media
                  src="/media/pida-flow-paths.mp4"
                  ratio="1314 / 872"
                  strip="PIDA / Workspace, flow path"
                  alt="A line picked on the drawing and its flow path traced across the sheet, listing what it runs between, the equipment it serves and the valves along it."
                />

                {/* Isolation is the workspace's other tab, not another tool,
                    so it sits in this step rather than in one of its own. */}
                <Media
                  src="/media/pida-isolation.png"
                  ratio="1914 / 960"
                  strip="PIDA / Workspace, isolation"
                  alt="The isolation view of the same workspace: the valves that close to take Reactor 1 out of service, listed and ringed on the drawing, with the lines that leave the sheet first called out."
                />
              </Step>

              <Step
                n={4}
                title="The Engineer"
                body="The PIDA engineering assistant answers from standards, guidelines, collected vendor data and PIDA’s own rules. Every number is cited to its source, which is what separates it from a general assistant."
              >
                <Media
                  src="/media/pida-engineer.mp4"
                  ratio="1920 / 1080"
                  strip="PIDA / Engineer"
                  alt="The Engineer answering a process design question from the documents it holds, with the clause and page of each source shown beside the answer."
                />
              </Step>

            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
