"use client";

/**
 * A real still or recording, in the same frame the placeholders use.
 *
 * MediaPlaceholder.tsx stays for the files that are still missing. This is
 * its opposite number: same frame, same top strip, same visually hidden
 * description, but with the file in it.
 *
 * THE RATIO IS THE FILE'S OWN
 *
 * 0.3 is explicit that nothing assumes an aspect ratio and that every file
 * is to be measured before its frame is laid out. So `ratio` is passed per
 * call from the measured pixel size, and the frame reserves exactly that
 * box before the file arrives. Nothing on the page moves as media loads.
 *
 * WHY THE RECORDINGS ARE NOT LEFT TO AUTOPLAY ON THEIR OWN
 *
 * There are four of them on the home page and about 20 MB between them. An
 * `autoplay` attribute starts every one of them at load, which is four
 * decoders running for three recordings nobody is looking at. So they start
 * when they come into view and stop when they leave, which is one decoder
 * at a time on the way down the page.
 *
 * They are silent, looping and short, so they are shown with no controls,
 * the way an animated figure is shown. A control bar is a player chrome for
 * something the reader chose to watch; these are figures on a page.
 *
 * Under reduced motion none of that happens: the recording does not play,
 * and it is given its own controls so a reader who wants it can start it
 * (C7.4). That is the only case that ever shows a bar.
 */
import { useEffect, useRef, useState } from "react";
import styles from "./Media.module.css";

export default function Media({
  src,
  alt,
  ratio,
  strip,
  caption = "",
  poster,
}: {
  /** Path under /public, e.g. "/media/pida-manager.mp4". */
  src: string;
  /** The description of A8.7, carried whether or not the file is visible. */
  alt: string;
  /** The file's measured ratio, e.g. "1454 / 930". */
  ratio: string;
  /** Mono label for the frame's top strip (A6.7). */
  strip?: string;
  caption?: string;
  poster?: string;
}) {
  const video = src.endsWith(".mp4");
  const ref = useRef<HTMLVideoElement>(null);
  const [calm, setCalm] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const quiet = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (quiet.matches) {
      setCalm(true);
      return;
    }

    /* A quarter of the frame is enough to count as being looked at, and it
       means the recording is already running by the time it is properly on
       screen rather than starting once it is. */
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) {
          el.pause();
          return;
        }
        /* A refused autoplay is not worth a control bar. This used to put
           one on any recording that was not running a beat after it was
           asked to, which caught every browser that simply had not started
           yet, and a progress bar across the bottom of a silent looping
           figure is worse than the thing it was trying to rescue. The only
           reader who gets controls is the one who asked for reduced motion,
           because for them the recording genuinely never starts. */
        el.play().catch(() => {});
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure data-pida="media" className={styles.figure}>
      <div className="frame">
        {strip && (
          <div className="frame-strip mono-label">
            <span>{strip}</span>
            <span className="frame-strip-square" />
          </div>
        )}

        <div className={styles.well} style={{ aspectRatio: ratio }}>
          {video ? (
            <video
              ref={ref}
              className={styles.media}
              src={src}
              poster={poster}
              muted
              loop
              playsInline
              preload="metadata"
              controls={calm}
              aria-hidden={calm ? undefined : true}
              aria-label={calm ? alt : undefined}
            />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              className={styles.media}
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
      </div>

      {caption && <figcaption className="caption">{caption}</figcaption>}
      <p className="visually-hidden">{alt}</p>
    </figure>
  );
}
