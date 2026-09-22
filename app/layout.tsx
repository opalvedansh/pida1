/**
 * Page shell. SEO copy from A8, metadata rules from 0.4.
 *
 * Hard rule 0.1: no third-party software name or maker appears in visible
 * text, alt text, meta tags or comments anywhere in this file or its output.
 */
import type { Metadata, Viewport } from "next";
import "./globals.css";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Motion from "@/components/motion/Motion";
import Cursor from "@/components/motion/Cursor";

export const metadata: Metadata = {
  // A8.1, 51 characters.
  title: "PIDA | Pharma process design automation, reimagined",
  // A8.2, 158 characters.
  description:
    "PIDA automates early pharma process design: a P&ID in 30 seconds, a hydraulic model in under a minute, every value traceable to its source. Sign up for trial.",
  // A8.3. "Reimagined" is not used here: 0.4 limits it to headings and the
  // title tag. og:image is made from M2, which is not in the folder yet (0.3).
  openGraph: {
    siteName: "PIDA",
    type: "website",
    title: "PIDA: pharma process design automation",
    description:
      "A P&ID in 30 seconds. A hydraulic model in under a minute. Every line, value and answer traceable to its source.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PIDA: pharma process design automation",
    description:
      "A P&ID in 30 seconds. A hydraulic model in under a minute. Every line, value and answer traceable to its source.",
  },
  // Interim favicon: the letter P on a cobalt square (0.3), until the founders
  // supply a logo (0.6, D7).
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // The page is one dark theme and does not invert, so the browser chrome
  // is told once rather than given a light and a dark value to choose from.
  colorScheme: "dark",
  themeColor: "#0f0f0f",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* First in the body, so it is painted with the first frame rather
            than after the header has already appeared under it. It takes
            itself off screen on a timer of its own; see Preloader.tsx. */}
        <Preloader />
        <Header />
        <main>{children}</main>
        <Footer />
        {/* The motion layer. It renders nothing and mounts last, so the page
            is complete and readable before it runs at all. Every section
            above stays a Server Component; this reads their data-pida-*
            attributes and drives GSAP from one place. See the head of
            components/motion/Motion.tsx. */}
        <Motion />
        <Cursor />
      </body>
    </html>
  );
}
