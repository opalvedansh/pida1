/**
 * Use cases. The capabilities that are not the generator.
 *
 * WHY THIS IS NO LONGER A BENTO
 *
 * It was three cells on one fill: connectivity at seven columns, hydraulics
 * at five beside it, answers full width underneath. Two things were wrong
 * with it. The two cells in the first row were 658px and 327px tall against
 * `align-items: start`, so a third of the row was a hole with nothing in it
 * and nothing that could fill it. And the file's own note said "cell
 * backgrounds vary on purpose", which was true of the intention and not of
 * the stylesheet: all three were --pida-bg-raised, so the section read as
 * three identical boxes.
 *
 * So the boxes are gone. Each capability is a full-width plate, divided from
 * the next by a hairline rather than boxed away from it, which is how the
 * rest of the page separates things. No cell can now be short next to a tall
 * one, because no two cells share a row.
 *
 * WHERE THE SECTION GETS ITS SCALE
 *
 * From the one figure in it that is real. The hydraulics plate carries 46
 * values from a real run, 33 of them given, 5 sourced, 8 assumed. That was
 * previously a 470 by 10 pixel strip in the corner of the smaller card. It
 * is now the width of the page, one square per value, and it counts itself
 * in as the plate arrives. It is the only animated thing in the section, and
 * what it animates is the claim in the heading above it.
 *
 * The three plates deliberately do not share a shape: text beside a figure,
 * then a full-width chart, then text beside a quotation. The product rail
 * above already owns the numbered-index-and-panel layout, so nothing here
 * repeats it.
 *
 * The anchor ids of the sections that existed before the restructure are
 * kept, so /#connectivity, /#hydraulics and /#answers still land.
 */
import { SquaresFourIcon } from "@phosphor-icons/react/dist/ssr";
import MediaPlaceholder from "./MediaPlaceholder";
import ValueLegend from "./ValueLegend";
import styles from "./UseCases.module.css";

/**
 * 46 values on the screen shown: 33 given, 5 sourced, 8 assumed, 0 empty.
 * The figure is static and nothing in it counts. These are the numbers the
 * caption states; do not change one without the other.
 */
const squares: Array<"given" | "sourced" | "assumed"> = [
  ...Array<"given">(33).fill("given"),
  ...Array<"sourced">(5).fill("sourced"),
  ...Array<"assumed">(8).fill("assumed"),
];

const squareClass = {
  given: styles.sqGiven,
  sourced: styles.sqSourced,
  assumed: styles.sqAssumed,
};

export default function UseCases() {
  return (
    <section id="use-cases" className={`${styles.section} band`}>
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow" data-pida-reveal="text">
            <SquaresFourIcon size={14} weight="bold" aria-hidden="true" />
            Use cases
          </p>

          <h2 className="display-l wash" data-pida-reveal="text">
            Carry it through the rest of
            <br />
            the <span className="accent-word">project</span>.
          </h2>

          <p
            className={`sub-headline ${styles.headSub}`}
            data-pida-reveal="text"
          >
            The drawing is where it starts. Connectivity and hydraulics both
            read from the same model.
          </p>
        </header>

        {/* ------------------------------------------------- connectivity */}
        <article id="connectivity" className={styles.plate} data-pida="card">
          <div className={`${styles.split} ${styles.splitFigure}`}>
            <div className={styles.copy} data-pida-reveal="text">
              <h3 className={`display-m ${styles.plateTitle}`}>
                See the whole project as one graph
              </h3>
              <p className={styles.body}>
                Every P&amp;ID of a project is a node, every sheet-to-sheet
                connection an edge. A sheet joined to nothing is flagged.
                Off-page flags come out of the generator already naming the
                sheet at the other end.
              </p>
              <p className={`mono-data ${styles.note}`}>
                The project shown: 6 sheets, 5 joins
              </p>
            </div>

            <div className={styles.figure} data-pida-reveal="media">
              <MediaPlaceholder
                id="M4"
                file="pida-connectivity-graph.mp4"
                video
                strip="PIDA / Project graph"
                ratio="16 / 9"
                caption=""
                alt="Screen recording of the P&ID Manager. The 3D graph of six connected P&ID sheets rotates, showing which sheets connect to which."
              />
            </div>
          </div>
        </article>

        <hr className={styles.divider} />

        {/* --------------------------------------------------- hydraulics */}
        <article id="hydraulics" className={styles.plate} data-pida="card">
          <div className={styles.copy} data-pida-reveal="text">
            <h3 className={`display-m ${styles.plateTitle}`}>
              Every value accounted for
            </h3>
            <p className={styles.body}>
              Seven steps build a hydraulic model over a live schematic. Every
              value is marked given, sourced, assumed or empty, and the
              Engineer fills the usual ones with citations.
            </p>
          </div>

          {/* The plate. One square per value, across the page.
              data-pida-chart is the motion layer's hook: it counts the
              squares in as this arrives, and with the script absent or under
              reduced motion they are simply all drawn. */}
          <div className={styles.chart}>
            <div
              className={styles.squares}
              data-pida-chart
              role="img"
              aria-label="46 values: 33 given, 5 sourced, 8 assumed, 0 empty."
            >
              {squares.map((kind, i) => (
                <span
                  key={i}
                  className={`${styles.sq} ${squareClass[kind]}`}
                  aria-hidden="true"
                />
              ))}
            </div>

            <div className={styles.chartFoot}>
              <ValueLegend />
              <p className={`caption ${styles.chartCaption}`}>
                46 values on the screen shown: 33 given, 5 sourced, 8 assumed,
                0 empty.
              </p>
            </div>
          </div>
        </article>

        <hr className={styles.divider} />

        {/* ------------------------------------------------------ answers */}
        <article id="answers" className={styles.plate} data-pida="card">
          <div className={styles.split}>
            <div className={styles.copy} data-pida-reveal="text">
              <h3 className={`display-m ${styles.plateTitle}`}>
                The clause and the page, or no answer at all
              </h3>
              <p className={styles.body}>
                The Engineer answers only from documents PIDA holds, and cites
                clause and page. It never does arithmetic from memory: a
                number comes from a cited equation through a calculator. A
                number no source contains is flagged &ldquo;Verify before
                use.&rdquo; When the documents are silent it says &ldquo;not in
                the documents we hold&rdquo; instead of guessing.
              </p>
            </div>

            <figure className={styles.example} data-pida-reveal="text">
              <figcaption className={`mono-label ${styles.exampleLabel}`}>
                Example shown
              </figcaption>
              <p className={styles.exampleBody}>
                Asked for the fire-case overpressure of a pressure safety valve
                (PSV) on a vessel under both ASME and PED, it answered{" "}
                <strong className={styles.exampleFigure}>21 %</strong>{" "}
                (relieving at 121 % of the maximum allowable working pressure,
                MAWP) per ASME VIII, with PED&rsquo;s 10 % momentary-surge
                limit.
              </p>
              <p className={`mono-data ${styles.note}`}>
                94 documents / 1,772 design rules in 46 topics / 67 vendor
                datasheets
              </p>
            </figure>
          </div>
        </article>
      </div>
    </section>
  );
}
