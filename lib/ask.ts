/**
 * Where a question asked from the FAQ goes.
 *
 * Into public.questions, through PostgREST. supabase/schema.sql is the other
 * half of this file: it creates the table and grants the anonymous role
 * insert and nothing else. A visitor can ask a question and cannot read one
 * back, which is the only arrangement that works on a site whose API key is
 * downloaded by everyone who visits it.
 *
 * WHAT THE REQUEST LOOKS LIKE
 *
 * A POST of one JSON object to /rest/v1/questions with these fields:
 *
 *   question   the visitor's question, required
 *   email      where they want the reply, required
 *   source     which surface it came from, currently always "faq"
 *
 * `Prefer: return=minimal` matters and is not a nicety. PostgREST returns the
 * inserted row by default, and returning it requires select, which the
 * anonymous role does not have and must not be given. Without this header
 * every insert would succeed in the table and then answer 401 on the way
 * out, and the visitor would be told their question failed.
 *
 * WHAT HAPPENS WITH NO JAVASCRIPT
 *
 * The form keeps a real action and method and the browser posts it itself.
 * That post is form-encoded and PostgREST wants JSON, so it fails. It failed
 * before this change too, into an address that did not resolve. Worth a
 * serverless function if the no-script path turns out to matter; on a page
 * whose main sections are WebGL it does not.
 *
 * Nothing secret is here. Every value ships to the browser, by design.
 */
import { supabaseUrl } from "./supabase";

/** The address the question form posts to. */
export const askEndpoint = `${supabaseUrl}/rest/v1/questions`;

/** Headers for an insert that asks for nothing back. */
export const askHeaders = {
  "Content-Type": "application/json",
  Prefer: "return=minimal",
} as const;
