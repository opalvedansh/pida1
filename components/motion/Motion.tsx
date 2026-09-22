"use client";

/**
 * The motion layer.
 *
 * WHY THIS IS ONE COMPONENT AND NOT FIFTY
 *
 * Every section on this page is a Server Component. Animating them by turning
 * each one into a Client Component would move the whole page into the client
 * bundle to buy some decoration, which is the opposite of what C14's budgets
 * ask for. So the sections stay on the server and simply annotate themselves:
 *
 *   data-pida-reveal="text"     join the shared reveal
 *   data-pida-reveal="media"    the slower media variant
 *   data-pida-parallax="0.18"   opt in to parallax, at that strength
 *
 * This component mounts once, in app/layout.tsx, reads those attributes off the
 * server-rendered DOM and drives everything from here. C7.2 already asks for
 * exactly this convention: "Select elements by data-pida='...' attributes."
 *
 * WHAT IS SPEC AND WHAT IS A DEVIATION
 *
 * The bootstrap below, the custom ease, the reveal values and the pinned
 * sequence are C7's, quoted rather than invented. GSAP is the handoff's own
 * mandated motion stack (C7, "Motion specification (GSAP and ScrollTrigger)"),
 * and this file is the phase 2 of 0.7 that had not been built yet.
 *
 * Parallax and the cursor are deviations from A6.10, which says "No parallax,
 * no scroll-jacking, no cursor effects". They are here by an explicit decision
 * and are recorded as deviations. Everything else stays inside the rules:
 *
 *   C7.1  only transform, opacity, clip-path and stroke-dashoffset are
 *         animated, and will-change is added and removed around each tween;
 *   C7.1  no smooth-scroll library, and body/html overflow is left alone
 *         because base.css notes that touching it breaks the sticky header;
 *   C7.4  under reduced motion no ScrollTrigger is created at all;
 *   US-13 with JavaScript off nothing is hidden waiting for a script.
 */

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { initReveals } from "./reveals";
import { initParallax } from "./parallax";
import { initPinnedSteps } from "./pinnedSteps";
import { initHeroStage } from "./heroStage";
import { initValueChart } from "./valueChart";
import { initFormatSplit } from "./formatSplit";

export default function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, CustomEase);
    CustomEase.create("pida", "0.22, 1, 0.36, 1");
    gsap.defaults({ ease: "pida", duration: 0.7 });

    /* base.css sets scroll-behavior: smooth for anchor jumps. Against a
       scrubbed trigger that fights the scrubber all the way down, so the
       motion layer takes it off while it is running and puts it back on
       teardown. C7.4 already requires auto under reduced motion. */
    const root = document.documentElement;
    const priorBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        pin: "(min-width: 1024px) and (min-height: 640px) and (hover: hover) and (pointer: fine)",
        /* The hero's pane composes the copy into the top left and gives the
           rest of the width to the drawing, so it wants a landscape pane. On
           a phone, and on a tablet held upright, the same markup stays the
           stacked hero, which fills a tall screen properly instead of
           leaving two thirds of it dark. */
        stage:
          "(min-width: 900px) and (min-height: 600px) and (min-aspect-ratio: 5/4)",
      },
      (ctx) => {
        const { motion, pin, stage } = ctx.conditions as {
          motion: boolean;
          pin: boolean;
          stage: boolean;
        };
        if (motion === false) return; // C7.4: nothing is created at all.

        /* ORDER MATTERS, AND IT IS NOT COSMETIC
         *
         * The first two change the height of the document as they start. The
         * hero turns its section into a 220vh runway. The pinned steps
         * collapse a 2,150px list into a one-viewport frame and insert a
         * 2,700px pin spacer, which moves everything below #pid-making down
         * by about 1,450px.
         *
         * Anything constructed before those ran measured its own start
         * against a layout that no longer exists, and `once: true` means a
         * reveal that fired on a wrong measurement cannot be put back by a
         * later refresh. That is what used to happen to every reveal below
         * the product rail: they had all fired about 1,500px before the
         * reader could see them, so most of the page's scroll motion was
         * being spent off screen.
         *
         * So the two that resize the page go first, and everything that only
         * reads positions goes after them. */
        const teardowns = [initHeroStage(stage)];
        if (pin) teardowns.push(initPinnedSteps());

        /* Re-measure between the two groups, not just after them. A reveal
           is `once: true`: if it fires on a wrong measurement it is spent,
           and no later refresh can put it back. So the page has to be at its
           final height before any of them is constructed. */
        ScrollTrigger.refresh();

        teardowns.push(
          initReveals(),
          initParallax(),
          initValueChart(),
          initFormatSplit()
        );

        /* One refresh, after every trigger exists.
         *
         * Two of these change the height of the document as they start: the
         * hero turns its section into a 220vh runway, and the pinned steps
         * collapse a 2,150px list into a one-viewport frame. Anything
         * created before those ran measured its start and end against a
         * layout that no longer exists, which is not a small error: the
         * value chart's trigger was computed about 1,250px lower than the
         * chart ends up, so it had already run to completion by the time the
         * reader could see it, and the plate was simply always full.
         *
         * Order alone cannot fix this, because the pinned steps have to size
         * their own frame before constructing their own trigger. Re-measuring
         * everything once at the end can, and does. */
        ScrollTrigger.refresh();

        return () => teardowns.forEach((fn) => fn());
      }
    );

    /* C7.2: refresh after the fonts land and after each media box decodes,
       because both change the height of everything below them. */
    const refresh = () => ScrollTrigger.refresh();

    if (document.fonts?.status === "loaded") {
      refresh();
    } else {
      document.fonts?.ready.then(refresh).catch(() => {});
    }

    const images = Array.from(document.images);
    images.forEach((img) => {
      if (img.complete) return;
      img.addEventListener("load", refresh, { once: true });
      img.addEventListener("error", refresh, { once: true });
    });

    return () => {
      mm.revert();
      images.forEach((img) => {
        img.removeEventListener("load", refresh);
        img.removeEventListener("error", refresh);
      });
      root.style.scrollBehavior = priorBehavior;
    };
  }, []);

  return null;
}
