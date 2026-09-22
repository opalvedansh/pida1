/**
 * Staging placeholder for a still or recording that is not in the folder
 * (A6.15). A frame of the right column span, dashed border, centred mono
 * text: "STILL TO COME" and the file name on a second line.
 *
 * This never goes live. Sections 04 and 06 do not launch without M9 and M8
 * (0.3). Every media file M1 to M10 is currently absent, so every frame on
 * the page is a placeholder until the founders deliver them (0.6, D7).
 *
 * The alt text of A8.7 is carried here so that it is already in place when
 * the file arrives. It is rendered as visually hidden text meanwhile, so the
 * frame still describes itself to a screen reader.
 *
 * Aspect ratios below are provisional. Measure the real pixel size of every
 * file before laying out its frame; nothing in the handoff assumes an aspect
 * ratio (0.3).
 */
import styles from "./MediaPlaceholder.module.css";

export default function MediaPlaceholder({
  file,
  id,
  caption,
  alt,
  strip,
  video = false,
  ratio = "16 / 10",
}: {
  /** Canonical file name from 0.3, e.g. "pida-generated-pid-r101.png" */
  file: string;
  /** Media id from 0.3, e.g. "M2" */
  id: string;
  caption: string;
  /** Alt text row from A8.7. */
  alt: string;
  /** Optional mono label for the frame's top strip (A6.7). */
  strip?: string;
  /** Recording rather than still: the label changes wording. */
  video?: boolean;
  ratio?: string;
}) {
  return (
    <figure data-pida="media">
      <div className="frame">
        {strip && (
          <div className="frame-strip mono-label">
            <span>{strip}</span>
            <span className="frame-strip-square" />
          </div>
        )}
        <div
          className={`placeholder ${styles.placeholder}`}
          style={{ aspectRatio: ratio }}
        >
          <span className="mono-label">
            {video ? "Recording to come" : "Still to come"}
          </span>
          <span className="mono-data">{file}</span>
          <span className={`mono-data ${styles.id}`}>{id}</span>
        </div>
      </div>
      {caption && <figcaption className="caption">{caption}</figcaption>}
      <p className="visually-hidden">{alt}</p>
    </figure>
  );
}
