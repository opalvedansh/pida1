import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

/** @type {import('next').NextConfig} */

// Static generation for all pages (C1.1, Route C). A static export keeps the
// response headers of C16 fully controllable at the host and makes the C14
// budgets reachable: phase 1 ships no client JavaScript at all.
const nextConfig = {
  output: "export",
  // Pin the workspace root to this project, so a lockfile above it in the
  // home directory is never treated as the root.
  turbopack: {
    root: dirname(fileURLToPath(import.meta.url)),
  },
  trailingSlash: false,
  images: {
    // Stills are served as AVIF or WebP with a PNG fallback through the media
    // pipeline of C9.6, not through a runtime optimiser.
    unoptimized: true,
  },
};

export default nextConfig;
