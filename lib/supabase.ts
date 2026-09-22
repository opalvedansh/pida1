/**
 * The Supabase project, as two values and a set of headers.
 *
 * WHY THERE IS NO CLIENT LIBRARY HERE
 *
 * @supabase/supabase-js is about 30 kB gzipped and exists to manage sessions,
 * realtime channels, storage and a query builder. This site needs one insert
 * and one redirect. Both are plain HTTP: PostgREST is a REST API and Auth's
 * authorize route is a URL. A dependency that size, on a static marketing
 * page whose whole budget is about 166 kB, would be most of a megabyte of
 * capability for two calls that are four lines each.
 *
 * WHICH KEY GOES HERE, AND WHICH NEVER CAN
 *
 * The publishable key, and only ever the publishable key. next.config.mjs
 * sets output: "export", so this site has no server of its own: every line
 * of this file is downloaded and read by every visitor. NEXT_PUBLIC_ is not
 * a decoration, it is a statement of fact about where the value ends up.
 *
 * The secret key, the service_role JWT and the database password have no
 * home anywhere in this repository. There is no server to read them from and
 * no build step that could hide them. What protects the data is row level
 * security in the database, not secrecy in the browser: see
 * supabase/schema.sql, where the anonymous role is granted insert on one
 * table and nothing else, and is given no policy that would let it read back
 * what anyone has written.
 */
const FALLBACK_URL = "https://project.supabase.invalid";

/** The project's API origin. Set NEXT_PUBLIC_SUPABASE_URL per environment. */
export const supabaseUrl = (
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? FALLBACK_URL
).replace(/\/+$/, "");

/** The publishable key. Public by design. */
export const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

/**
 * What PostgREST wants on every request.
 *
 * `apikey` identifies the project and `Authorization` is what PostgREST
 * actually reads the role out of. Both carry the same publishable key for an
 * anonymous caller, and both are required: one without the other is a 401.
 */
export const supabaseHeaders = {
  apikey: supabaseKey,
  Authorization: `Bearer ${supabaseKey}`,
} as const;

/** True when the project has been configured for this build. */
export const supabaseReady = supabaseUrl !== FALLBACK_URL && !!supabaseKey;
