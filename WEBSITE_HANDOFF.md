# PIDA website handoff

One file for the person building the PIDA marketing website. It has four parts:

| Part | What it is | Use it for |
|---|---|---|
| **Part 0** (this part) | Read-me-first: the hard rules, every ruling, the asset list, what the founders still owe | Settling any doubt. **Part 0 wins over every other part.** |
| **Part A** | Creative and content brief | The words on every section, the look, the sign-up copy, SEO copy |
| **Part B** | Product requirements (PRD) | What the site must do, acceptance criteria, launch checklist |
| **Part C** | Technical specification | How to build it in Framer or Webflow with Spline and GSAP, or by hand |

Where two parts disagree, the order is: Part 0, then Part A for words and looks, then Part C for build values, then Part B.
Section references carry their part letter (A3.4, B FR-12, C10.4), so they stay unambiguous in this one file.

The product is **PIDA, Pharma Industry Design Automation**. The site has to persuade two sceptical readers: a venture
investor deciding whether to fund it, and a pharma process engineer deciding whether to try it. Both trust evidence over
adjectives, so the site shows real screens and real output and says little.


## Contents

- Part 0: 0.1 hard rules, 0.2 the page in order, 0.3 media, 0.4 rulings, 0.5 additions, 0.6 what the founders owe, 0.7 order of work
- PART A: Creative and content brief
  - A0. Media: where each file is used
  - A1. Positioning
  - A2. Site map and narrative order
  - A3. Home page, block by block
  - A4. Problem statements (manual work is the problem)
  - A5. Voice, tone and the claim register
  - A6. Visual direction and components
  - A7. Sign-up flow copy and small copy
  - A8. SEO copy
  - A9. Open items, by decision id of 0.6
- Part B: Product requirements (PRD) for the PIDA marketing website
  - B1. Background and goal
  - B2. Success metrics (hypotheses, not forecasts)
  - B3. Audiences and their jobs to be done
  - B4. Scope
  - B5. User stories and acceptance criteria
  - B6. Functional requirements
  - B7. Non-functional requirements
  - B8. Content requirements and inventory
  - B9. Analytics requirements
  - B10. Legal pages
  - B11. Launch checklist
  - B12. Risks and mitigations
  - B13. Decisions
  - B14. Components and states a lone builder would otherwise have to guess
  - B15. Interface copy the builder would otherwise have to write alone
- Part C - Technical specification
  - C1. Build routes and recommendation
  - C2. Page inventory
  - C3. Component inventory
  - C4. Design tokens
  - C5. Typography
  - C6. Breakpoints, grid and page layouts
  - C7. Motion specification (GSAP and ScrollTrigger)
  - C8. Spline scene specification: the 3D connectivity graph (optional)
  - C9. Media pipeline
  - C10. Authentication and trial sign-up
  - C11. Forms and contact
  - C12. Analytics and consent
  - C13. SEO technicals
  - C14. Performance budgets
  - C15. Accessibility implementation notes
  - C16. Security headers and Content Security Policy
  - C17. Hosting, domains, environments and CI
  - C18. QA test plan
  - C19. Handoff package: structure and asset names
  - C20. Builder's delivery checklist
  - C21. Fallback copy for places Part A may not cover

---

## 0.1 Hard rules (they apply to the public site, its files and its source code)

1. **Never name third-party software or its makers on the site.** Not AFT, Fathom, AutoCAD, Autodesk, Plant 3D, Bluebeam,
   Revu, nor any AI model or AI provider. Never show or write the `.fth` file extension. Not in copy, alt text, captions,
   file names, meta tags, comments in the page source, or anywhere visible inside a screenshot or video frame.
2. **Open formats and published standards may be named:** DXF, DEXPI, PDF, xlsx; ASME BPE-2026, ASME VIII, the EU Pressure Equipment
   Directive 2014/68/EU, API 520 / 521 / 2000, ISPE Baseline Guides, Crane TP-410, ASME B36.19M.
3. **Compatibility is said once**, in the compatibility band (A3.11) and nowhere else on the page: the generated files
   open in the standard CAD and hydraulic-analysis software engineering teams already use.
4. **Third-party tools are never the villain.** A problem statement describes manual work, never a product.
5. **No client names, no "pilot", no partner names, no traction line at launch.** No founder or team names. No pricing,
   testimonials, customer logos or invented metrics.
6. **Words that must not appear:** "AI-powered", "revolutionary", "seamless", "game-changing", "zero-data-retention",
   exclamation marks, any internal rule identifier, the name or number of any company's design manual.
7. **Only two speed claims exist**, in these words: "a P&ID in 30 seconds" and "a hydraulic model in under a minute".
   They are the founders' claims and are stated plainly. Do not add a stopwatch, a timer or any animation that pretends to
   measure them.
8. **Numbers are copied, never paraphrased.** Every number on the site is in the claim register (A5.4). If a re-shot
   screenshot shows a different number, the screenshot wins and the founders update the register.
9. **No "made in" badge of any site builder and no 3D-tool watermark on the live site.** Buy the plan that removes them.

Two exemptions. (a) The two sign-in buttons are labelled exactly "Continue with Google" and "Continue with LinkedIn", and
the privacy notice names those two companies as sign-in providers. (b) This handoff names build tools (Framer, Webflow,
Spline, GSAP, encoders, test tools); the site never does in visible text, alt text, meta tags or comments. Host names,
element names and file extensions that a build tool forces into the page source are tolerated; self-host the 3D scene and
its runtime where the build route allows. The banned-terms check in C17.3 carries an allow-list for (a).

---

## 0.2 The page, in order (canonical)

| # | Block | Anchor | Band | Accent | Media |
|---|---|---|---|---|---|
| - | Navigation | - | paper | cobalt | wordmark |
| 1 | Hero | `#top` | paper | cobalt | M2 (the generated P&ID) |
| 2 | Proof strip (4 cells, verbatim facts) | `#proof` | navy | on-dark | none |
| 3 | 01 **P&ID Making Reimagined** | `#pid-making` | paper | cobalt | M1, M2 |
| 4 | 02 **Safety and P&ID Connectivity Reimagined** | `#connectivity` | navy | cobalt-on-dark | M4 (video), M3 (poster and fallback) |
| 5 | 03 **Hydraulics Reimagined** | `#hydraulics` | paper-cool | petrol | M5, M6, M7 |
| - | mid-page call to action | - | - | - | - |
| 6 | 04 **Safety Reimagined** | `#safety` | navy | amber | M9 |
| 7 | 05 **Isolation Reimagined** | `#isolation` | navy | amber, coral for isolation only | M10 (video) |
| 8 | 06 **Engineering Answers Reimagined** | `#answers` | reading-room dark `#17141A` | brass | M8 |
| 9 | How it fits together (one SVG diagram) | `#how-it-fits` | paper | cobalt | drawn in SVG |
| 10 | Why believe it (four cards) | `#trust` | paper | cobalt | none |
| 11 | Compatibility band | `#compatibility` | paper-2 | ink | none |
| 12 | Final call to action | `#trial` | navy | paper button | none |
| - | Footer | - | ink | on-dark-2 | wordmark |

The six section names are the founders' wording and are used verbatim. There is **no Status block** and no traction line.
The eyebrows above the six titles are: `01 / P&ID GENERATOR`, `02 / P&ID MANAGER`, `03 / HYDRAULIC MODELER`,
`04 / WORKSPACE + ENGINEER`, `05 / WORKSPACE`, `06 / ENGINEER`.

Pages: `/`, `/trial`, `/trial/welcome`, `/trial/error`, `/privacy`, `/terms`, `/legal` (company details, cookie and storage
statement, accessibility statement), `/404`, and `/.well-known/security.txt`. Nothing else at launch.

---

## 0.3 Media (canonical names; these files are already in the Drive folder "PIDA website 1 / Website handoff")

| ID | File | Shows | State |
|---|---|---|---|
| M1 | `pida-generator-review.png` | Generator, review step, live preview with the spark filter train | Being re-shot after Generate, showing PASS; founders save it over the same name. Until then crop the "Not generated" chip out. |
| M2 | `pida-generated-pid-r101.png` | The generated reactor sheet R-101 | Final. Hero image. |
| M3 | `pida-connectivity-graph.png` | The 3D project graph, 6 sheets and 5 joins | Final |
| M4 | `pida-connectivity-graph.mp4` | Screen recording of the rotating graph (4.7 MB source) | Final; re-encode (C9.2) |
| M5 | `pida-hydraulics-wizard.png` | Hydraulic wizard, live schematic, Engineer panel | Final; crop the browser address bar |
| M6 | `pida-hydraulics-model-opened.png` | The written model opened in the hydraulic solver | Final; crop to the model canvas: no title bar, menu or logo |
| M7 | `pida-hydraulics-results.png` | The solved results table, 22 m³/h | Final; crop to the table only |
| M8 | `pida-engineer-answer.png` | Engineer answer on fire-case relief under ASME and PED | **Not in the folder yet.** Being re-shot. Launch blocker for section 06. |
| M9 | `pida-safety-chat.png` | Workspace with the safety answer visible in the docked chat | **Not in the folder yet.** Being re-shot. Launch blocker for section 04. |
| M10 | `pida-isolation-flowpath.mp4` | Flow path and isolation recording (2.1 MB source) | Final; re-encode |

The builder derives from these: a poster frame per video (`<name>-poster.jpg`), the responsive renditions (C9.6), and the
social image `pida-og-1200x630.png` made from M2. The two source MP4s are the masters; there are no lossless originals, so
never upscale them. Measure the real pixel size of every file before laying out its frame; nothing in this handoff
assumes an aspect ratio.

Before any still or frame goes live, zoom to 200 % and confirm it shows no third-party name, logo or window title, no
browser address bar, no personal name and no internal rule identifier. Crop; never blur or black-bar.

There is **no logo yet**. Until the founders supply one, the wordmark is "PIDA" set in Barlow Condensed 600, letter
spacing 0.04 em, and the favicon is the letter P on a cobalt square.

---

## 0.4 Rulings on everything the parts could disagree about

**Call to action.** The label is "Sign up for trial" everywhere. It appears in the navigation, the hero, once after
section 03 and in the final block. The footer carries a text link only. Every one of them goes to `/trial`.

**Sign-up.**
- A page, not a modal: `/trial` holds the two provider buttons and works without JavaScript (they are plain links).
- Top-level redirect to the provider and back. No pop-up windows.
- One consent line under the buttons, no checkbox: "By continuing you agree to the Trial terms and the Privacy notice."
- `/trial/welcome` is generic and static. It never shows the person's name or email. It offers one optional form:
  company, role, and an unticked "Send me product updates" box. Skipping it is fine.
- Someone who signs up twice lands on the same page with `?state=returning` and a line saying the email was sent again.
- A LinkedIn account without a verified email is refused with the error `email_unverified`.
- Stored per sign-up: provider, the provider's subject id, email, email-verified flag, given name, family name, company,
  role, product-updates opt-in, consent version and time, created time, UTM source / medium / campaign, locale.
  No profile picture, no IP address or hash.
- No CAPTCHA. The provider sign-in is the bot gate; rate-limit by IP at the edge without storing it.
- Error codes are those of C10.9; the words shown are those of A7.6, with a small "Reference: {id}" line beneath.
- One confirmation email to the person (with a withdraw link and the company's legal details in its footer) and one
  internal notice to the founders. There is no second email and no promise of a hosted login.
- **What the trial delivers is an open decision (0.6, D1).** Until it is made, the copy says only: "We will email you with
  the next step." Never write "nothing to install", "no card" or a number of days.
- **Who builds it.** A Framer or Webflow builder cannot hold the provider secrets. Default: a managed auth back end that
  has Google and LinkedIn (OpenID Connect) built in, keeps the sign-ups in a table the founders can open and export as
  CSV, and sends the email from a small hook (C10.2, option A). The hand-written auth service of C10.3 to C10.10 is
  option B and needs a developer for one to two days. The founders name the owner (0.6, D2).

**Proof point 0.265 %.** Off at launch. If the founders switch it on, it goes in the trust block only, in the exact
wording of A5.4. The word "pilot" is never used. The word "partner" is used only in the contact line of 0.5.

**The word "Reimagined".** Headings only: the six section titles, the H1, the final call to action and the title tag.
Never in body copy.

**Look.** One industrial brand on a light paper base, with dark bands for the Workspace and Engineer sections.
- Colour tokens: paper `#F3F0E8`, paper-2 `#FBFAF6`, paper-cool `#E8ECF0`, ink `#18202B`, ink-2 `#4A5565`,
  navy `#0B1524`, navy-2 `#14233A`, reading-room `#17141A`, on-dark `#EEF3FA`, on-dark-2 `#B8C7DB`, cobalt `#1B4B9C`,
  cobalt-hover `#163D80`, cobalt-on-dark `#8FB0FF`, petrol `#0B5F6B`, amber `#FFC857`, coral `#FF6B5E`, brass `#D9B466`,
  rule `#C9C3B4`, rule-dark `rgba(238,243,250,0.16)`, ok `#1E6B45`, error `#A12B1E`.
  Brass, amber and coral are used on dark bands only. Coral means isolation and nothing else. No green on black anywhere.
- Type: Barlow Condensed (display), Barlow (text), IBM Plex Mono (labels and numbers). Two families and one mono; no
  serif pull quotes. H1 `clamp(44px, 7.2vw, 104px)`, H2 `clamp(36px, 5vw, 72px)`, body 18 px desktop and 17 px mobile,
  measure at most 66 characters.
- Grid: 12 columns, container 1240 px, gutter 24 px, side margin `clamp(20px, 5vw, 64px)`, section padding
  `clamp(72px, 10vw, 160px)`. Breakpoints 480 / 768 / 1024 / 1280 / 1440; test also at 360, 390 and 1920.
- Frames: 2 px radius, 1 px rule border. Media frames on paper may carry `0 12px 32px -16px rgba(24,32,43,0.25)`;
  nothing else has a shadow.
- Buttons: cobalt fill with white text on light bands; paper fill with ink text on dark bands. The provider-branded
  buttons appear on `/trial` only and follow each provider's own brand rules (check LinkedIn's permitted label before
  launch; if "Continue with LinkedIn" is not allowed, use their stock wording).

**Motion.** Ease `cubic-bezier(0.22, 1, 0.36, 1)`, 0.6 to 0.9 s, fade-and-rise on entry, SVG strokes draw on.
- One pinned sequence at most, desktop only: section 01, the specification turning into the drawing. Nothing pins on
  touch devices or under 1024 px.
- The hero drawing is revealed once by a mask over 1.2 s; nothing on the hero is tied to scroll.
- Numbers never count up. The question in section 04 is revealed by a clip, not typed letter by letter.
- In section 05 the rule under the title changes from amber to coral when the recording reaches isolation.
- `prefers-reduced-motion`: no pin, no draw-on, no autoplay; everything is simply there.

**Video.** Muted, looped, `playsinline`, starts when half visible, pauses off screen, with a visible pause / play
toggle and an "open larger" control. Under reduced motion: poster and click to play. Encode at the source width (never
above 1600 px), source frame rate, H.264 MP4 plus WebM VP9 (AV1 optional), each rendition under 3 MB.

**The 3D graph (Spline).** Not a launch blocker. Launch with M4 and M3. If the scene is built: six flat plates (not
spheres) and five edges in exactly the topology of M3, no invented node, lazy-loaded, with the fallback ladder
Spline, then M4, then M3.

**Stills.** Every still opens larger in a lightbox. There is no compare slider.

**Budgets.** Still at most 300 KB (AVIF or WebP, PNG fallback), hero image at most 200 KB, JavaScript at most 300 KB
without the lazily loaded 3D scene (itself at most 1.5 MB), first load at most 1.5 MB, LCP 2.5 s, CLS 0.1, INP 200 ms.
Lighthouse performance at least 90 hand-coded and at least 80 on a site builder; accessibility at least 95 on both.

**Copy limits.** Section body 40 to 90 words. A bullet fact is at most 16 words. Abbreviations are expanded at first
use on the page: P&ID (piping and instrumentation diagram), CIP (clean-in-place), HAZOP (hazard and operability study),
PSV (pressure safety valve), MAWP (maximum allowable working pressure), GxP (good practice regulations). Flow is written
"m³/h" with the superscript character.

**Editing.** The site builder's own editor is the content system. Founder-editable copy is a should-have, not a launch
blocker. Email wording and legal text are changed by the builder on request.

**Analytics events (canonical names).** `cta_click {location: header | hero | mid | final | trial-page | 404}`,
`section_view {section_id}` (the anchors of 0.2), `video_view {asset}` (visible for 3 s), `video_toggle {asset, state}`,
`lightbox_open {asset}`, `signup_start {provider}`, `signup_success {provider}` (sent by the server), `signup_error {code}`,
`outbound_click {href}`, `graph3d_interact` (only if the 3D scene ships). The footer text link and the FAQ are not tracked.

**Analytics tool and consent.** Cookieless page analytics by default (C12.1, option 1). Until the founders confirm under
D8 that no banner is needed, the banner of A7.9 ships and nothing is sent before "Accept analytics" (the other button is
"Decline"). After that confirmation the banner and the footer's "Cookie settings" link are removed. The statement lives
at `/legal#cookies`.

**Metadata.** `og:site_name` is "PIDA". JSON-LD type `SoftwareApplication`, `applicationCategory` "DesignApplication",
`featureList` with the six section subjects. Footer line on standards: "Standards named on this site belong to their
respective publishers. PIDA is not affiliated with or endorsed by them."

---

## 0.5 What the site should also have (small, and it answers an investor's first questions)

- **A way to write to the company without a name on it.** In the final block and the footer: "Investor or partner? Write
  to {role address}." The founders supply the address (0.6, D4). This is the only route for someone who will not sign up
  for a trial, and the site's first job is funding.
- **A short FAQ above the final block** (should-have). Questions: what does the trial include; what does PIDA cover
  today; who checks the output; which formats come out; where do my documents go; how are the two speed claims measured.
  The founders answer the first and the last (0.6, D1 and D5); the rest are answered from the claim register.
- **Scope, said honestly** (optional line in the trust block, founders decide, 0.6 D6): "Shown here is what works
  today: reactor sheets, condenser and receiver sheets, and a clean-in-place loop."
- **Sample output to download** (later): one DXF, its deliverables workbook and its check report. It is the strongest
  evidence for both readers. Not at launch.

---

## 0.6 What the founders still owe the builder

| # | Decision or input | Default if nobody answers |
|---|---|---|
| D1 | What "trial" delivers, and how soon a person hears back | Copy says only "We will email you with the next step." |
| D2 | Who builds and owns the sign-up back end | Managed auth back end, set up by the builder with a founder's account |
| D3 | Domain, canonical host, sender address for the confirmation email, legal entity and registered address; also one role-based operations address used as email reply-to, internal-notice and alert mailbox, privacy and accessibility contact, `security.txt` contact and provider-console support email (it may be the same address as D4) | Build on a staging address; do not launch without them |
| D4 | The role-based contact address | Omit the line |
| D5 | How the two speed claims are measured (one sentence each, for the FAQ) | Leave the question out of the FAQ |
| D6 | Whether to show the scope line and the 0.265 % proof point | Both off |
| D7 | The three re-shot stills (M1, M8, M9) and a logo | M8 and M9 block sections 06 and 04; the interim wordmark is used |
| D8 | Privacy notice, trial terms, cookie and storage statement, accessibility statement, company details | The builder assembles drafts from the outlines of B10, C10.7, C12 and C15 on a standard template the founders choose or buy. The builder is not responsible for legal adequacy; a lawyer or the founders approve before launch. With no template chosen by the start of phase 3, the founders supply the text. |
| D9 | Whether the two hydraulic-solver stills (M6, M7) may be shown cropped | Yes, cropped to canvas and table, as the founders have accepted |
| D10 | Accounts and billing: site-builder plan, 3D-tool plan, Google Cloud project, LinkedIn developer app (a company Page admin must approve it), email service, analytics, assets host or CDN proxy, DNS access | A founder creates each account under a company role address in week one and invites the builder as a member. The builder never creates them under a personal account and never holds the billing card. Work on C10 does not start before the Google, LinkedIn and DNS accesses exist. |

## 0.7 Order of work

1. **Structure and words.** All blocks of 0.2 in the builder with the final copy of Part A, the tokens of 0.4, the interim
   wordmark, stills in place. No motion. The founders read it on a phone and a laptop.
2. **Media and motion.** Encoded videos, lightbox, the entry motion, the one pinned sequence, reduced-motion behaviour.
3. **Sign-up, legal, checks.** `/trial` and its back end, the email, the legal pages, analytics with consent, the
   banned-terms check, the launch checklist of B11 and the QA plan of C18.

Anything a founder asks for that contradicts Part 0 is a change to Part 0 first, then to the site.

---

# PART A: Creative and content brief

Audience for this part: the web designer and builder. You have not seen the product. This part gives you the words for every block, the look, the components, the sign-up copy and the SEO copy. Part 0 wins over this part. Where this part and Part C disagree on a build value, read 0.4 first, then Part C.

Copy in this part is final wording unless it is marked "OPTION". Headline options are ranked and option 1 is the recommendation. Do not paraphrase numbers. Do not add facts, customers, prices, dates, names or metrics that are not in this part.

Conventions used below:

- Text in "straight quotes" inside a copy block is on-page copy.
- `MONO` labels are small technical labels set in the monospace face.
- Media are referred to by the IDs M1 to M10 of 0.3. File names are those of 0.3 and are not repeated with other spellings anywhere.
- Rows of the claim register are called CR-1, CR-2 and so on (A5.4). Alt-text rows are called ALT-1, ALT-2 and so on (A8.7). Neither collides with a section number of another part.
- The hard rules are in 0.1 and are not restated here. Where this part says "the hard rules", it means 0.1.
- Where a founder input is missing, this part names the decision of 0.6 (D1 to D9) and gives the default. Do not invent the missing input.

---

## A0. Media: where each file is used

The files, their names and their state are in 0.3. This table adds only where each one appears and which caption and alt text belong to it.

| ID | File (as in 0.3) | Used in | Caption | Alt text |
|---|---|---|---|---|
| M1 | `pida-generator-review.png` | Section 01 (A3.3) | A3.3 | ALT-2 |
| M2 | `pida-generated-pid-r101.png` | Hero (A3.1), section 01 (A3.3), social image (A8.3) | A3.1, A3.3 | ALT-1, ALT-3 |
| M3 | `pida-connectivity-graph.png` | Section 02 (A3.4), as poster and fallback of M4 | A3.4 | ALT-4 |
| M4 | `pida-connectivity-graph.mp4` | Section 02 (A3.4) | A3.4 | ALT-5, text description in A7.10 |
| M5 | `pida-hydraulics-wizard.png` | Section 03 (A3.5) | A3.5 | ALT-6 |
| M6 | `pida-hydraulics-model-opened.png` | Section 03 (A3.5) | A3.5 | ALT-7 |
| M7 | `pida-hydraulics-results.png` | Section 03 (A3.5) | A3.5 | ALT-8 |
| M8 | `pida-engineer-answer.png` | Section 06 (A3.8). Launch blocker for that section (0.3, D7). | A3.8 | ALT-11 |
| M9 | `pida-safety-chat.png` | Section 04 (A3.6). Launch blocker for that section (0.3, D7). | A3.6 | ALT-9 |
| M10 | `pida-isolation-flowpath.mp4` | Section 05 (A3.7) | A3.7 | ALT-10, text description in A7.10 |

Derived files, made by the builder: `pida-connectivity-graph-poster.jpg`, `pida-isolation-flowpath-poster.jpg`, the responsive renditions of C9.6 and the social image `pida-og-1200x630.png` (A8.3).

Rules that apply to every medium:

- The check before publishing (200 % zoom, crop and never blur or black-bar) is in 0.3. Do it for every still and for the first, middle and last frame of each recording.
- Measure the real pixel size of each file before drawing its frame (0.3). This part gives column spans, never aspect ratios.
- M1: until the re-shot file arrives, crop the "Not generated" chip out and use the ALT-2 variant that does not mention PASS.
- M6 and M7 are shown cropped to the canvas and to the table (0.6, D9).
- If a re-shot still shows a number that differs from the claim register, the still wins. Tell the founders, and they update A5.4 (0.1, rule 8). Do not edit the image and do not keep the old number in the copy.

---

## A1. Positioning

### A1.1 One-sentence positioning

PIDA (Pharma Industry Design Automation) automates the early process-design work of a pharma plant and keeps every result traceable to its source. The same specification always gives the same drawing, byte for byte.

Short form, for the footer and the social description: "PIDA, Pharma Industry Design Automation. Early process design, automated and traceable."

### A1.2 "Reimagined" as the organising idea

The founders named every product section "X Reimagined". The site takes that literally. Each section takes one familiar engineering task that is still done by hand and shows the same task done again from first principles.

The word is a structural device and not a slogan. Per 0.4 it appears in headings only: the six section titles, the H1, the heading of the final call to action and the title tag. It never appears in body copy, captions, alt text, social descriptions or the email.

Every "Reimagined" section has the same four beats, in the same order. By the second section a visitor knows how to read the page.

1. `THE TASK TODAY`: two or three sentences on the manual work. No product is named, because the manual work is the problem.
2. The section title, verbatim, with a one-line headline under it.
3. `WHAT PIDA DOES`: body copy and three to five facts taken from a real run or a real screen.
4. The evidence: a real screenshot or recording, framed and captioned. There are no illustrations of imaginary screens.

Design consequence: the six sections share one template (eyebrow, task-today block, title, copy, facts, framed evidence). They differ only in band, accent and media. The repetition is deliberate. It tells a sceptical reader that this is one system and not six demos.

### A1.3 Three messages an investor must leave with

1. **It is a product and not a slide.** Every section shows a real screen, a real recording or a real output. The outputs are engineering deliverables: a DXF drawing with its checked package, a DEXPI export and a native hydraulic model file.
2. **The design fits a regulated industry.** The drawing is deterministic and independently checked. Every value and answer carries its source. Documents stay with their owner.
3. **The parts connect.** The P&ID Generator's drawings feed the P&ID Manager and the Workspace. The Hydraulic Modeler has its own wizard and its own output. The Engineer is connected to the Hydraulic Modeler and to the Workspace, and also stands alone. The site never says that one set of answers produces everything, because it does not.

### A1.4 Three messages an engineer must leave with

1. **You answer short questions, you see exactly what will be drawn, and you get a drawing plus the package you would otherwise type by hand.** The package holds the line list, valve list, instrument index, HAZOP starter and isolation plan.
2. **Nothing is hidden.** Every value is marked given, sourced, assumed or empty. Every Engineer answer cites clause and page. When the documents are silent, PIDA says so instead of guessing.
3. **You keep your tools.** This message is delivered once, by the compatibility band (A3.11), and by nothing else on the page (0.1, rule 3).

---

## A2. Site map and narrative order

### A2.1 Pages

The page list is that of 0.2. This table adds what each page holds and where its words are.

| Path | Page | Words |
|---|---|---|
| `/` | Home, a single long page. All navigation items are anchors on it. | A3 |
| `/trial` | Sign-up page with the two provider buttons. Works without JavaScript. | A7.2 |
| `/trial/welcome` | Generic, static thank-you page with one optional form. Also serves `?state=returning`. | A7.3, A7.4 |
| `/trial/error` | Sign-up error page. | A7.6 |
| `/privacy` | Privacy notice. Text from the founders (0.6, D8). | Layout in A6.16 |
| `/terms` | Trial terms. Text from the founders (0.6, D8). | Layout in A6.16 |
| `/legal` | Company details, cookie and storage statement, accessibility statement (0.6, D3 and D8). | Layout and section headings in A6.16 |
| `/404` | Not found. | A7.9 |
| `/.well-known/security.txt` | Plain text file. No design. | Part C |

Not in this build. Do not design these and do not link to them: per-tool pages, pricing, blog, team, careers, customers, an investor page, a download page for sample output (0.5 lists it as later).

### A2.2 Home page anchors

These are the anchors of 0.2. Use them exactly; the `section_view` event of 0.4 reports them.

| Anchor | Block |
|---|---|
| `#top` | Hero |
| `#proof` | Proof strip |
| `#pid-making` | 01 P&ID Making Reimagined |
| `#connectivity` | 02 Safety and P&ID Connectivity Reimagined |
| `#hydraulics` | 03 Hydraulics Reimagined |
| `#safety` | 04 Safety Reimagined |
| `#isolation` | 05 Isolation Reimagined |
| `#answers` | 06 Engineering Answers Reimagined |
| `#how-it-fits` | How it fits together |
| `#trust` | Why believe it |
| `#compatibility` | Compatibility band |
| `#trial` | Final call to action |

The FAQ (A3.12) is a should-have that 0.2 does not list. Give it the id `faq` for in-page linking. It sends no `section_view` unless Part 0 adds it to the canonical list.

### A2.3 Narrative order of the home page, with the reason for each position

| # | Block | Why it sits here |
|---|---|---|
| - | Navigation | Always offers one action: "Sign up for trial". |
| 1 | Hero | Says what PIDA is and who it is for, makes the two founders' speed claims and states the traceability promise. A visitor who reads only this still gets the pitch. |
| 2 | Proof strip | Sceptics look for numbers straight after a claim. Four cells of verbatim facts sit here so that everything below is read as evidence. |
| 3 | 01 P&ID Making | The P&ID is the source document of process design. It is also the most visual claim and the quickest to understand. |
| 4 | 02 Connectivity | It follows the single sheet naturally: one drawing, then the whole project. |
| 5 | 03 Hydraulics | A second discipline with its own short-answer wizard. It introduces the given / sourced / assumed / empty marking, which is the strongest trust device on the site. |
| - | Mid-page call to action | A reader who has seen both speed claims demonstrated gets the action once, without waiting for the end. |
| 6 | 04 Safety | The page returns to the drawing and asks what the drawing knows. This introduces the Engineer in its most concrete form, docked on a sheet. |
| 7 | 05 Isolation | It uses the same Workspace as section 04, so the two share one continuous navy band. It carries the strongest recording on the site. |
| 8 | 06 Engineering Answers | The Engineer has been seen twice in context, in sections 03 and 04. It is now presented in its own right. The library numbers land harder after the visitor has watched it work. |
| 9 | How it fits together | After six sections the visitor needs the single picture of what feeds what. |
| 10 | Why believe it | The four trust facts, collected for the reader who scrolled fast and for the reviewer who scrolled for exactly this. |
| 11 | Compatibility band | One plain sentence, said once. It sits late because it removes the last objection and should not frame the product. |
| - | FAQ (should-have) | Answers an investor's and an engineer's first questions just before the ask (0.5). |
| 12 | Final call to action | One action, plus the contact line for a reader who will not sign up. |
| - | Footer | Name expansion, anchors, legal links, the standards line. |

There is no Status block and no traction line (0.2).

---

## A3. Home page, block by block

Copy rules for all blocks (0.4, copy limits):

- Section body copy is 40 to 90 words. The counts given below were made by hand; recount if you edit.
- "Facts" are a list of three to five rows in the mono face with a hairline between rows. A fact is at most 16 words.
- Abbreviations are expanded at first use in running copy, as written into the final copy below: P&ID in the hero body, HAZOP in the proof strip, CIP in section 03, PED, PSV and MAWP in section 06, GxP in the trust block. Occurrences that come earlier in the navigation, a heading or a label carry an `<abbr title="...">` with the same expansion.
- Flow is written "m³/h" with the superscript character.
- The call to action is labelled "Sign up for trial", sits in the four places of 0.4 and always goes to `/trial`. The six sections carry no call-to-action link of their own.

### A3.0 Navigation

**Band.** Paper. **Accent:** cobalt.

**Purpose.** Orientation and one persistent action.

**Layout, 1024 px and wider.**

- Left: the interim wordmark "PIDA" of 0.3 (Barlow Condensed 600, letter spacing 0.04 em). From 1280 px the descriptor "Pharma Industry Design Automation" follows it in mono caps, 12 px.
- Centre: seven anchors.
- Right: the primary button.

**Anchor labels** (short forms, because the full section names are too long for a navigation bar): "P&ID", "Connectivity", "Hydraulics", "Safety", "Isolation", "Answers", "How it fits".

**Button:** "Sign up for trial". It goes to `/trial` and sends `cta_click {location: header}`.

**Under 1024 px:** the wordmark is on the left, the button on the right and a menu button after it. The menu is specified in A6.14.

**Behaviour.**

- The bar is 64 px tall (56 px under 768 px) and fixed to the top.
- It is transparent over the hero. After 80 px of scroll it gains a `paper` background at 92 % opacity with a 1 px `rule` hairline at the bottom.
- On dark bands the bar stays paper. It never inverts. One stable bar reads as calmer and more industrial.
- The active anchor gets a 2 px cobalt underline, driven by scroll position.

**Motion.** The underline moves between anchors over 200 ms. There is no other motion in the bar.

**Accessibility.** The first focusable element is a skip link: "Skip to content". The bar is a `<nav aria-label="Main">`.

---

### A3.1 Hero (`#top`)

**Band.** Paper. **Accent:** cobalt. **Media:** M2.

**Purpose.** In five seconds, say what PIDA is, who it is for, the two speed claims and the traceability promise, and show a real drawing.

**Eyebrow (`MONO`):** "PIDA, PHARMA INDUSTRY DESIGN AUTOMATION"

**H1 options**

1. "Pharma process design, reimagined."
2. "The early design of a pharma plant, reimagined."
3. "Process design for pharma plants, reimagined."

**Sub-headline:** "A P&ID in 30 seconds. A hydraulic model in under a minute. Every line, value and answer traceable to its source."

The two speed claims are the founders' claims and are written in exactly these words (0.1, rule 7). Nothing on the page times them.

**Body (60 words):**
"Early process design is still done by hand: piping and instrumentation diagrams (P&IDs) redrawn, lists retyped, hydraulic models rebuilt, standards searched clause by clause. PIDA does that work from short answers and shows where every line, value and answer came from. The same specification always produces the same drawing, byte for byte, so a result can be reproduced and reviewed."

**Three facts**

- "Same specification in, same drawing out, byte-identical"
- "An independent check on every drawing"
- "Every value and answer carries its source"

There is no compatibility fact here. Compatibility is said once, in A3.11.

**Primary button:** "Sign up for trial". It goes to `/trial` and sends `cta_click {location: hero}`.

**Secondary link (text link with a down arrow):** "See what it makes". It scrolls to `#pid-making`. It is not a call to action and sends no `cta_click`.

**Line under the buttons (`MONO`, small):** "BUILT FOR PHARMA PROCESS ENGINEERS AND THE PEOPLE WHO REVIEW THEIR WORK"

**Media.**

- M2 is the only hero image (0.2). It is the generated sheet R-101, shown as a drawing on paper and not as a screenshot of an application.
- 1024 px and wider: copy in columns 1 to 5, M2 in columns 6 to 12. The frame may run past the container to the right edge of the viewport so that the sheet reads as a sheet. 2 px radius, 1 px `rule` border, the media shadow of 0.4.
- 768 to 1023 px: copy full width, then M2 full width under the buttons.
- Under 768 px: the same order. M2 is shown whole, never cropped to a detail. It opens in the lightbox like every still.
- No perspective tilt, no device frame, no glow, no second image overlapping it.
- Caption (`MONO`, small): "The generated sheet R-101: a reactor with a spark filter train. Real output, not a mock-up."
- Alt text: ALT-1.
- The hero image is the largest element above the fold. Its budget is 200 KB (0.4).

**Motion.**

- On load, the drawing is revealed once by a mask that travels left to right over 1.2 s, as a plotter would draw it (0.4).
- Nothing on the hero is tied to scroll. The H1 has no typing effect. It is simply present.
- Reduced motion: everything is visible at once.

---

### A3.2 Proof strip (`#proof`)

**Band.** Navy. **Text:** on-dark, labels in on-dark-2. **Media:** none.

**Purpose.** Four cells of verbatim facts, placed straight after the claims. The strip has no adjectives.

**Layout.**

- Full width. Four cells. From 1024 px the cells sit in one row, separated by `rule-dark` hairlines. From 480 to 1023 px they form a 2 x 2 grid. Under 480 px they stack.
- Small heading above the cells (`MONO`): "FROM A REAL RUN AND THE ENGINEER'S LIBRARY"
- Each cell is a figure in Barlow Condensed 600 with tabular numerals, and a label in mono under it.

**Cells (figure / label)**

1. "PASS, 0 error, 0 warning" / "Independent check on a generated P&ID"
2. "12 / 28 / 23" / "12 lines, 28 valves, 23 instruments, listed by the same run"
3. "38" / "HAZOP (hazard and operability study) deviations from the same run, 21 with no safeguard on the drawing"
4. "1,772" / "design rules in 46 topics. The Engineer holds 94 documents and 67 vendor datasheets."

Cell 1 is copied from the run report, which reads "Independent check: PASS, 0 error, 0 warning". Keep the singular "error" and "warning". Do not correct the grammar.

There is no fifth cell. The 0.265 % proof point is off at launch and, if switched on, lives in the trust block only (0.4; A3.10).

**Heading.** A visually hidden H2 for the outline: "Numbers from a real run".

**Footnote under the strip (on-dark-2, small):** "The first three cells are from one real run. They describe that run, not every project."

**Motion.** The cells fade and rise on entry like any other block. Numbers never count up (0.4). Reduced motion: static.

**Call to action.** None.

---

### A3.3 Section 01: "P&ID Making Reimagined" (`#pid-making`)

**Band.** Paper. **Accent:** cobalt. **Eyebrow (`MONO`):** "01 / P&ID GENERATOR". **Media:** M1, M2.

**Purpose.** Support the first speed claim with a real screen and a real drawing, and show that the output is a checked drawing with its whole package, not a picture.

**`THE TASK TODAY` (final):**
"A P&ID starts as a blank sheet. Every symbol is placed by hand, every tag typed, every line routed and re-routed as the design changes. Then the same information is typed again into a line list, a valve list and an instrument index, and someone checks that the copies still agree. The drafting adds no engineering."

**Title (verbatim, H2):** "P&ID Making Reimagined"

**Headline options (the line directly under the title, H3)**

1. "A P&ID in 30 seconds, checked before you see it."
2. "Answer nine short steps. Get the drawing and everything that hangs off it."
3. "This is exactly what will be drawn."

**Sub-headline:** "A nine-step wizard, a live preview, and a drawing that arrives with its own independent check."

**Body (73 words):**
"Answer nine short steps, from equipment to controlled streams, and watch the schematic build beside you under one sentence: "This is exactly what will be drawn." Press Generate and PIDA draws the P&ID as a DXF, checks it independently, and writes the package beside it: check report and redline, line list, valve list, instrument index, HAZOP starter, isolation plan, flow paths as PDF layers, a hashed revision chain and a DEXPI export."

**Facts**

- "A real run reported: Independent check: PASS, 0 error, 0 warning"
- "The same run listed 12 lines, 28 valves and 23 instruments"
- "38 HAZOP deviations, 21 with no safeguard on the drawing"
- "It also checks drawings made elsewhere, after proving itself on planted defects"

OPTION, a fifth fact: "It imports a specification from xlsx or from a generated DXF"

**Step rail.** A horizontal list of nine chips in mono, placed above M1: "Equipment", "Spark filter", "Inlets", "Outlets", "Solids & cleaning", "Utilities", "Instrumentation", "Controlled streams", "Review". Under 768 px the rail scrolls sideways inside its own container; the page itself never scrolls sideways.

**Package list.** A two-column definition list beside or below the body, titled "Written beside every drawing" (an H3, small).

- "Independent check report and redline drawing"
- "Deliverables workbook: line list, valve list, instrument index, HAZOP starter"
- "Isolation plan"
- "Flow paths as PDF layers"
- "Hashed revision chain"
- "DEXPI export"

**Media.**

- M1 is the main framed screenshot, 7 of 12 columns from 1024 px. Caption: "The review step. The preview on the right is the drawing PIDA is about to make." Alt text: ALT-2.
- M2 follows it as the result, joined to M1 by a thin cobalt arrow labelled "Generate". Caption: "The generated sheet R-101." Alt text: ALT-3. In the unpinned layout M1, the arrow and M2 are stacked in that order in columns 6 to 12.
- Both open in the lightbox at full resolution. Engineers will want to read them.

**Motion: the one pinned sequence of the site (0.4).**

- Only at 1024 px and wider, on a device with a fine pointer, without reduced motion.
- The section pins (distance and scrub values in C7.3). As the visitor scrolls, the nine chips of the step rail fill with cobalt in order and stay filled. When the ninth is filled, the arrow label "Generate" shows and M1 crossfades to M2 in the same frame (columns 6 to 12). Then the section releases.
- The sequence is driven by scroll position, not by a clock. It shows a specification turning into a drawing. It must not look like a measurement of the 30-second claim: no timer, no stopwatch, no progress percentage (0.1, rule 7).
- Under 1024 px, on touch devices and under reduced motion: nothing pins. All chips are filled, the arrow is drawn, and M1 and M2 are stacked with the arrow between them.
- The exact pin distance and the scroll values are build values and belong to Part C.

**Call to action.** None in this section.

---

### A3.4 Section 02: "Safety and P&ID Connectivity Reimagined" (`#connectivity`)

**Band.** Navy. **Accent:** cobalt-on-dark. **Eyebrow:** "02 / P&ID MANAGER". **Media:** M4 (video), M3 (poster and fallback).

**Purpose.** Show that PIDA understands a project as a connected set of sheets, and that a broken connection is a safety finding and not a clerical one.

**`THE TASK TODAY`:**
"A project is drawn on more than one sheet, and every line that leaves one sheet must arrive on another. Those hand-offs are tracked by eye and in lists that someone has to keep current. A flag that points to the wrong sheet, or to no sheet, can sit unnoticed until a review, a HAZOP, or the field."

**Title (H2):** "Safety and P&ID Connectivity Reimagined"

**Headline options**

1. "See the whole project as one connected graph."
2. "Every sheet a node. Every hand-off an edge. Every orphan flagged."
3. "A line that leaves a sheet should arrive somewhere. Now you can see that it does."

**Sub-headline:** "Every P&ID of a project in one rotating 3D graph."

**Body (61 words):**
"A project is more than one sheet. PIDA places every P&ID of a project as a node in a rotating 3D graph and draws every sheet-to-sheet connection as an edge. A sheet joined to nothing is flagged. Off-page flags come out of the generator already naming the sheet at the other end, so each connection starts from the drawing itself."

**Facts**

- "The project shown: 6 sheets, 5 joins"
- "Sheets grouped as reactor, condensers + receivers, utility supply, other"
- "A sheet joined to nothing is flagged"

**Media.**

- M4 is primary. M3 is its poster source and its fallback. The section mirrors the template: evidence in columns 1 to 7, copy in columns 8 to 12.
- Frame: 2 px radius, 1 px `rule-dark` border, no shadow.
- The video follows the video rule of 0.4: muted, looped, inline, starts when half visible, pauses off screen, with a visible pause / play toggle and an "open larger" control. The component is specified in A6.12.
- Caption: "The project graph: six sheets, five joins."
- Under the caption, the collapsed text description of A7.10 ("What this recording shows").
- Alt text: ALT-4 (still) and ALT-5 (video).
- A legend for the four groups is needed only if the 3D scene ships. Take the group colours and the sheet labels from M3, so that the legend matches the still. Do not pick new colours.

**The 3D scene (not a launch blocker, 0.4).** Launch with M4 and M3. If the scene is built in Spline: six flat plates, not spheres, and five edges in exactly the topology of M3. No invented node, no "unjoined" example node, nothing added to make it look busier. Slow rotation that the visitor can drag. It is lazy-loaded. The fallback ladder is the scene, then M4, then M3.

**Motion.** The recording, or the scene's rotation, is the motion. The block enters with the standard fade and rise. Reduced motion: the poster with a "Play recording" control.

**Call to action.** None in this section.

---

### A3.5 Section 03: "Hydraulics Reimagined" (`#hydraulics`)

**Band.** Paper-cool. **Accent:** petrol. **Eyebrow:** "03 / HYDRAULIC MODELER". **Media:** M5, M6, M7.

**Purpose.** Support the second speed claim, show the given / sourced / assumed / empty marking, and show that the result is a native model file that was opened and solved.

**`THE TASK TODAY`:**
"A hydraulic model is rebuilt by hand from the drawing: every pipe, junction and fitting entered one at a time, roughness and diameters looked up in tables, pump and valve data copied out of datasheets. Assumptions end up in someone's head or a side note. Later nobody can say which numbers were given, which were looked up and which were guessed."

**Title (H2):** "Hydraulics Reimagined"

**Headline options**

1. "A hydraulic model in under a minute, with every value accounted for."
2. "Given, sourced, assumed or empty. Every value says which."
3. "Seven short steps to a hydraulic model."

**Sub-headline:** "A seven-step wizard over a live schematic, a built-in Engineer that cites its sources, and a native model file at the end."

**Body (78 words):**
"Seven short steps (fluid, supply, heater and control, users, return, pipes, review) build a hydraulic model over a live schematic. The circuit shown is a clean-in-place (CIP) loop with supply and return pumps, a heater and two flow-control valves. Every value is marked given, sourced, assumed or empty. The built-in Engineer fills usual values with citations, reviews the model against rules and picks from vendor datasheets. The output is a native model file, shown below opened and solved."

**Facts**

- "The circuit shown: a CIP loop with 17 junctions, 16 pipes and two spray balls"
- "46 values on the screen shown: 33 given, 5 sourced, 8 assumed, 0 empty"
- "Roughness from Crane TP-410; inner diameters from ASME B36.19M"
- "The review reports velocities of 1.13 and 2.59 m/s at 22 m³/h"
- "A sample-point dead leg of L/d 12.6, against the L/d 2 that ASME BPE recommends"

**Value legend.** A small component with four chips, built as a real interface element. It also appears in the trust block (A3.10). Amber is not used here, because amber is for dark bands only (0.4). The four states differ by fill and outline, not by hue alone, so they survive greyscale printing.

- "Given": solid petrol fill, white text.
- "Sourced": 1 px petrol outline, petrol text, a small superscript citation mark.
- "Assumed": 1 px ink outline, ink text, a fill of 45-degree hairlines in `rule`.
- "Empty": 1 px dashed ink-2 outline, ink-2 text, no fill.

**The 46 squares (should-have).** Under the legend, one row of 46 small squares in SVG, in the four chip styles and in these counts: 33 given, 5 sourced, 8 assumed, 0 empty. The figure is static. It enters with the standard fade and rise and nothing in it counts. Give it `role="img"` and the label "46 values: 33 given, 5 sourced, 8 assumed, 0 empty."

**Media.** A three-image sequence titled by mono labels "ASK", "BUILD", "SOLVE". It is a full-width evidence row under the copy, because the images are wide. From 1024 px: M5 in columns 1 to 7, M6 and M7 stacked in columns 8 to 12. Under 1024 px: stacked in order.

1. M5, with the browser address bar cropped off so that the top edge is the application's own header (0.3). Caption: "The wizard, the live schematic and the Engineer's review, on one screen." Alt text: ALT-6.
2. M6, cropped to the model canvas (0.3). Caption: "The model file PIDA wrote, opened." Alt text: ALT-7.
3. M7, cropped to the table (0.3). Caption: "Solved: 22 m³/h, with velocities and pressures." Alt text: ALT-8.

Between 1 and 2 place a thin petrol arrow labelled "Native model file". Between 2 and 3 place an arrow labelled "Solve". The captions of M6 and M7 describe what the two stills show. They are not the compatibility statement, and they do not use its wording ("standard", "already use").

**Motion.** Standard fade and rise for the copy, the legend, the squares and the images. The two arrows draw on. Nothing pins (0.4). Reduced motion: the final state.

**Mid-page call to action (after section 03, 0.4).** A slim strip at the foot of this section, inside the same paper-cool band, separated from the evidence row by a `rule` hairline. One row from 768 px, stacked below it.

- Label (`MONO`): "PIDA TRIAL"
- Line: "Sign up, and we will email you with the next step."
- Button: "Sign up for trial". It goes to `/trial` and sends `cta_click {location: mid}`.

---

### A3.6 Section 04: "Safety Reimagined" (`#safety`)

**Band.** Navy, continuous with section 05: no gap between the two, only a `rule-dark` hairline. **Accent:** amber. **Eyebrow:** "04 / WORKSPACE + ENGINEER". **Media:** M9. The section does not launch without M9 (0.3).

**Purpose.** Show that a safety question can be asked of the drawing itself and answered from the drawing's own facts.

**`THE TASK TODAY`:**
"To answer "what happens if this valve fails?", an engineer traces lines by eye across the sheet, looks up the valve's fail position in one list and its control loop in another, and opens a standard to confirm the rule. The answer is only as good as the patience left at the end of the day, and it is rarely written down with its reasons."

**Title (H2):** "Safety Reimagined"

**Headline options**

1. "Ask the drawing a safety question. Get an answer from its own facts."
2. "If this control valve fails, what are the consequences?"
3. "The drawing already knows. Now you can ask it."

**Sub-headline:** "The PIDA Engineer, docked on the sheet you are looking at."

**Body (70 words):**
"Safety questions are asked of a drawing, so PIDA puts the Engineer on the drawing. Ask "If this control valve fails, what are the consequences?" or "Which valves do I close to isolate Condenser 1?" The answer is built from the sheet's own facts: lines, valves with their actuator, duty and control loop, instrument nozzles, isolation envelopes and the generator's warnings. Ask for the standard and it cites it."

**Facts**

- "Answers come from the facts of the drawing on screen"
- "Valve facts include actuator, duty and control loop"
- "The generator's warnings are among the facts the Engineer uses"
- "Asked for a standard, it answers from standards with citations"

**Media.** M9.

- Frame: a full-width evidence row under the copy, 10 of 12 columns from 1024 px, 2 px radius, 1 px `rule-dark` border, no shadow.
- Do not crop the chat panel away from the drawing. The point is that they share one screen.
- Two thin amber callout lines, as an SVG overlay and not baked into the image. One runs from the question text to the label "The question". The other runs from the item the answer refers to on the drawing to the label "The facts it used". Place them after the re-shot M9 arrives. Under 768 px hide the callouts; the caption carries the meaning.
- Caption: "A condenser and receiver sheet in the Workspace, with the Engineer docked beside it."
- Alt text: ALT-9.

**Motion.**

- Above the screenshot, not inside the image, the question "If this control valve fails, what are the consequences?" is revealed by a clip that opens left to right over 0.9 s. It is not typed letter by letter (0.4).
- The two callout lines then draw on.
- The answer is never animated or invented. It is whatever M9 shows.
- Reduced motion: the question is static text and the lines are already drawn.

**Call to action.** None in this section.

---

### A3.7 Section 05: "Isolation Reimagined" (`#isolation`)

**Band.** Navy, continuing from 04. **Accents:** amber for flow, coral for isolation and for nothing else. **Eyebrow:** "05 / WORKSPACE". **Media:** M10 (video).

**Purpose.** Show the flow path and isolation views. This is the site's strongest moving evidence.

**`THE TASK TODAY`:**
"Before anyone opens a vessel, someone has to find every valve that must be closed. That means following each connected line across the sheet with a highlighter, deciding which valves count, and noticing when a line leaves the sheet before it reaches a valve at all. It is slow, it is done under time pressure, and a missed line is a safety event."

**Title (H2):** "Isolation Reimagined"

**Headline options**

1. "Pick a vessel. See every valve you must close."
2. "The flow path lights up on the real drawing."
3. "Isolation, worked out from the drawing and shown on it."

**Sub-headline:** "Flow paths and isolation on the drawing itself, in two scenarios."

**Body (66 words):**
"Pick any line, valve, nozzle or vessel and its flow path lights up on the real drawing, with lines coloured by network: process, secondary process, utility. Ask for isolation and PIDA shows which valves to close for a vessel in two scenarios: manual block valves only, or actuated valves locked out. When a line leaves the sheet before it can be isolated, PIDA says so."

**Facts**

- "Pick from lines, valves, nozzles or vessels; the path is drawn on the actual sheet"
- "Two isolation scenarios: manual block valves only, and actuated valves locked out"
- "It says when a line leaves the sheet first"

**Network legend.** Three small swatches in mono: "Process", "Secondary process", "Utility". Sample the three colours from M10 so that the legend matches the footage. Do not pick new colours. If a sampled colour cannot be told apart from another at swatch size, add a line-style key beside the swatch instead of changing the colour.

**Media.** M10.

- The section mirrors the template: evidence in columns 1 to 7, copy in columns 8 to 12.
- Frame: 2 px radius, 1 px `rule-dark` border, no shadow.
- The video follows the video rule of 0.4 and the component of A6.12. The poster is a frame of the recording in which a flow path is lit, saved as `pida-isolation-flowpath-poster.jpg`.
- Caption: "Screen recording: choosing a vessel, then its flow path and isolation valves."
- Under the caption, the collapsed text description of A7.10.
- Alt text: ALT-10.

**Motion.**

- The recording is the motion.
- The page adds one thing (0.4): the 2 px rule under the section title is amber while the recording shows the flow path and changes to coral when the recording reaches isolation. It is tied to the playback time of M10, not to scroll. The builder watches M10 once, notes the second at which isolation begins, and records it as a build value in Part C. When the loop restarts, the rule returns to amber.
- If the video is paused, the rule keeps the colour of the current time.
- Reduced motion: the poster with a "Play recording" control. The rule is static: its left half amber, its right half coral.

**Call to action.** None in this section.

---

### A3.8 Section 06: "Engineering Answers Reimagined" (`#answers`)

**Band.** Reading-room dark `#17141A`. **Text:** on-dark, secondary text on-dark-2. **Accent:** brass, for rules, the eyebrow, citation marks and the callout. **Eyebrow:** "06 / ENGINEER". **Media:** M8. The section does not launch without M8 (0.3).

**Purpose.** Present the Engineer in its own right, with its discipline: it answers from documents only, cites every answer, never does arithmetic from memory and is honest when the documents are silent.

**`THE TASK TODAY`:**
"An engineering question sends someone into a shelf of standards, guides and vendor datasheets. They search, read around the clause, cross-check a second code, and do the arithmetic by hand. The answer often travels onward as a number in an email, with the clause, the page and the working left behind."

**Title (H2):** "Engineering Answers Reimagined"

**Headline options**

1. "Answers with the clause and the page, or no answer at all."
2. "It says "not in the documents we hold" instead of guessing."
3. "An engineering assistant that shows its sources and its working."

**Sub-headline:** "The PIDA Engineer answers only from documents PIDA holds."

**Body (56 words):**
"The PIDA Engineer answers only from documents PIDA holds and cites the clause and page. It never does arithmetic from memory: a number comes from a cited equation through a calculator. A number no source contains is flagged "Verify before use." When the documents are silent it says "not in the documents we hold" instead of guessing."

**Facts**

- "94 documents, 1,772 design rules in 46 topics, 67 vendor datasheets"
- "Standards include ASME BPE-2026 and the EU Pressure Equipment Directive 2014/68/EU (PED)"
- "Also API 520, 521 and 2000, and the ISPE Baseline Guides"

**Example block.** A bordered note under the facts with the mono label `EXAMPLE SHOWN`. It is a sentence, not a fact row, so the 16-word limit does not apply:
"Asked for the fire-case overpressure of a pressure safety valve (PSV) on a vessel under both ASME and PED, it answered 21 % (relieving at 121 % of the maximum allowable working pressure, MAWP) per ASME VIII, with PED's 10 % momentary-surge limit."

**Three behaviour cards.** A small row under the example, on `navy-2` fills with a `rule-dark` border. Each card has a mono label in brass and one line of text.

- `CITES` "Clause and page on every answer."
- `CALCULATES` "Numbers come from a cited equation through a calculator, never from memory."
- `ADMITS` "Says "not in the documents we hold" when that is the truth."

**Media.** M8.

- Frame: 8 of 12 columns from 1024 px, 2 px radius, 1 px `rule-dark` border, no shadow and no mat. The screenshot is itself dark, and it sits directly on the reading-room band.
- Caption: "A real answer: fire-case overpressure for a vessel that must satisfy both ASME and PED, with its sources."
- A thin brass callout line runs to the citation area of the screenshot, labelled "Clause and page". Place it after the re-shot M8 arrives. Under 768 px hide it.
- Alt text: ALT-11.

**Type note.** The serif face visible inside the Engineer screenshot is not used on the site. There is no serif pull quote (0.4).

**Motion.**

- Standard fade and rise. The brass callout line draws on.
- The library numbers never count up (0.4).
- Hovering a behaviour card underlines its mono label.
- Nothing else. This section should feel like a reading room.

**Call to action.** None in this section.

---

### A3.9 How it fits together (`#how-it-fits`)

**Band.** Paper. **Accent:** cobalt, with petrol for the hydraulics tier. **Media:** one diagram drawn in SVG.

**Purpose.** Give the single picture of what feeds what. It is honest about the structure: two wizards, not one.

**Headline options (H2)**

1. "How it fits together"
2. "What feeds what"

**Sub-headline:** "Six sections, one system, in one picture."

**Body (84 words):**
"Short answers to the nine-step wizard become a specification. The P&ID Generator turns it into a drawing and a package. The P&ID Manager joins the drawings of a project into one graph. The Workspace reads a drawing's facts to show flow paths, isolation and safety answers. The Hydraulic Modeler has its own seven-step wizard and writes a native model file. The Engineer is connected to the Hydraulic Modeler and to the Workspace, and it also stands alone. It answers from the documents PIDA holds."

**Facts**

- "Deterministic: the same specification gives the same drawing, byte for byte"
- "Open formats: DXF, DEXPI, PDF, xlsx"
- "The Engineer answers only from documents PIDA holds, and cites them"

**The diagram.** Built on the page in SVG. It is not an image file.

- Layout from 1024 px: left to right, in three tiers.
  - Top tier, the drawing flow:
    - `Your answers (nine-step wizard, or an imported specification)`
    - then `Specification`
    - then `P&ID Generator`
    - then `Drawing (DXF) + package`
    - then two nodes that both read the drawing: `P&ID Manager (project graph)` and `Workspace (flow path, isolation, safety answers)`.
  - Middle tier, the hydraulics flow:
    - `Your answers (seven-step wizard)`
    - then `Hydraulic Modeler`
    - then `Native model file`.
  - Bottom tier: a full-width bar reading `PIDA Engineer: 94 documents, 1,772 design rules, 67 vendor datasheets`, with a second line `Also used on its own`.
  - Thin vertical connectors rise from the bar to exactly two nodes: the Hydraulic Modeler and the Workspace. There is no connector to the P&ID Generator or to the P&ID Manager. The Engineer is not part of the Generator.
- A small side branch from `Drawing made elsewhere` enters `P&ID Generator`, labelled "independent check only".
- Node style:
  - 1 px ink outlined rectangles with a 2 px radius and mono labels;
  - a 4 px top stripe: cobalt for the Generator, the Manager and the Workspace, petrol for the Hydraulic Modeler;
  - the Engineer bar is filled ink with on-dark text. Brass, amber and coral are not used, because this band is paper (0.4);
  - data nodes (Specification, Drawing, Native model file) are drawn as document shapes with a folded corner.
- Under 1024 px: the same diagram turned vertical and read top to bottom. The Engineer bar sits at the bottom, and its two connections are shown as a small ink square on the two nodes it serves, with the key "Connected to the Engineer".
- Alt text: ALT-12. Provide the same content as an ordered list in visually hidden text.

**Motion.** On entry the strokes draw on: the top tier first, then the middle tier, then the two connectors from the Engineer bar, each within the 0.6 to 0.9 s of 0.4. Nothing pins and nothing is scrubbed. Reduced motion: the diagram is simply there.

**Call to action.** None.

---

### A3.10 Why believe it (`#trust`)

**Band.** Paper. **Accent:** cobalt. **Media:** none.

**Purpose.** Bring the four trust facts together for the reviewer and for the diligence-minded investor.

**Headline options (H2)**

1. "Why believe it"
2. "Built for people who check"
3. "Four things a reviewer can verify"

**Sub-headline:** "In a regulated industry, automation is only useful if it can be checked. PIDA is built to be checked."

**Body (55 words):**
"Engineering for pharma is reviewed, signed and audited under good practice (GxP) regulations. A tool that gives a different answer on a different day cannot be reviewed once and relied on, and a number without a source cannot be signed. PIDA's four rules follow from that. They are properties of how the software works."

Never write that PIDA is compliant, validated or qualified. The body describes the reader's world and then four properties of the software.

**Four cards.** Cards sit on `paper-2` with a 1 px `rule` border. Each has a mono label, a title (H3) and two sentences. Two by two from 768 px, stacked below it.

1. `DETERMINISTIC` **"Same specification in, same drawing out."** "Run the same specification again and the drawing is byte-identical. What was reviewed is what everyone gets."
2. `INDEPENDENTLY CHECKED` **"An independent check on every drawing."** "Every generated drawing arrives with an independent check report and a redline drawing. When PIDA checks a drawing made elsewhere, the checker first proves itself on planted defects, then reports findings with positions."
3. `SOURCED` **"Every value and answer carries its source."** "Values are marked given, sourced, assumed or empty. Answers cite clause and page, and a number no source contains is flagged "Verify before use.""
4. `YOURS` **"Your documents stay yours."** "PIDA works local first. A document that has not been cleared for use never leaves the PC."

Determinism is a statement about the drawing. Do not widen it to "files", "outputs" or "results".

Card 3 reuses the value-legend chips of A3.5.

**OPTION: a crop of the PASS line from the re-shot M1** inside card 2, captioned "From a real run." Alt text: ALT-13. Only after the re-shot M1 exists.

**OPTION, founders decide (0.6, D6), both off by default.** If switched on, each is a bordered note under the four cards, in exactly these words:

- Scope line: "Shown here is what works today: reactor sheets, condenser and receiver sheets, and a clean-in-place loop."
- Proof point: "The same model solved in PIDA's own engine and in an industry-standard solver agreed to 0.265 %."

**Motion.** The cards rise and fade in, staggered by 80 ms. Nothing else.

**Call to action.** None.

---

### A3.11 Compatibility band (`#compatibility`)

**Band.** Paper-2, with a `rule` hairline above and below. **Text:** ink. **Media:** none. About 160 px tall from 1024 px, centred text.

**Purpose.** Remove the fear of having to change tools, in one plain sentence. This is the only place on the whole site where compatibility is stated (0.1, rule 3).

**Copy (final, the only sentence):**
"The files PIDA generates open in the standard CAD and hydraulic-analysis software engineering teams already use."

**Under it (`MONO`, small):** "OPEN FORMATS: DXF / DEXPI / PDF / XLSX"

**Heading.** None visible. For the outline, a visually hidden H2: "Compatibility".

**Do not** place any logo, product icon or file-type icon here or anywhere else.

**Motion.** Standard fade and rise. Nothing else.

**Call to action.** None.

---

### A3.12 FAQ (should-have, 0.5; id `faq`)

**Band.** Paper. **Accent:** cobalt. It sits between the compatibility band and the final call to action. It replaces the Status block of the first draft, which 0.2 removed.

**Heading (H2):** "Questions"

**Component.** Native `<details>` and `<summary>` elements, so it works without JavaScript and with a keyboard. One column, measure at most 66 characters, a `rule` hairline between items. The summary is Barlow 500 at 20 px with a plus sign that turns into a minus sign when open. All items are closed on load. When printing, all items are open (A6.17).

**Questions and answers (final)**

1. **"What does the trial include?"**
   "Sign up with an account you already have. We will email you with the next step."
   This is the default answer until the founders decide D1 (0.6). Do not add a duration, a delivery time, an installation statement or a payment statement.
2. **"What does PIDA cover today?"**
   "What this page shows: P&ID generation with an independent check, the project connectivity graph, hydraulic model automation, safety answers on the drawing, flow path and isolation views, and the PIDA Engineer."
   If the founders switch the scope line on (0.6, D6), append its exact wording from A3.10.
3. **"Who checks the output?"**
   "Every generated drawing arrives with an independent check report and a redline drawing. PIDA can also check a drawing made elsewhere: the checker first proves itself on planted defects, then reports findings with positions and a redline."
   OPTION, founders only: "The drawing, the HAZOP starter and the isolation plan remain yours to review and approve." Use it only if the founders approve it.
4. **"Which formats come out?"**
   "The drawing is a DXF. The package beside it holds a check report and redline, a deliverables workbook, an isolation plan, flow paths as PDF layers, a hashed revision chain and a DEXPI export. The Hydraulic Modeler writes a native model file."
5. **"Where do my documents go?"**
   "Your documents stay yours. PIDA works local first, and a document that has not been cleared for use never leaves the PC."
6. **"How are the two speed claims measured?"**
   One sentence per claim, from the founders (0.6, D5). If they do not answer, leave this question out. Do not write an answer for them.

**Motion.** None beyond the native open and close.

---

### A3.13 Final call to action (`#trial`)

**Band.** Navy, full width, at least 60 vh from 1024 px. **Button:** paper fill with ink text (0.4). **Media:** none. There is no background texture and no parallax.

**Purpose.** One action, plus one route for a reader who will not sign up.

**Headline options (H2)**

1. "Pharma process design, reimagined. See it for yourself."
2. "See PIDA for yourself."
3. "Try PIDA."

The first draft's "Bring one specification. Leave with a drawing." is withdrawn, because what the trial delivers is undecided (0.6, D1).

**Sub-headline:** "A P&ID in 30 seconds. A hydraulic model in under a minute. Every value traceable to its source."

**Body (26 words; this block is exempt from the 40-word floor because it is an action, not a section):**
"Sign up with an account you already have. There is no password to create. We will email you with the next step."

**Line (`MONO`, small):** "NO PASSWORD TO CREATE / YOUR DOCUMENTS STAY YOURS"

**Button:** "Sign up for trial". It goes to `/trial` and sends `cta_click {location: final}`. The two provider-branded buttons are not shown here. They appear on `/trial` only (0.4).

**Contact line (0.5), under the button, on-dark-2:** "Investor or partner? Write to {role address}." The address is a `mailto:` link in cobalt-on-dark. The founders supply it (0.6, D4). If they do not, omit the line. Do not invent an address and do not use a personal one.

**Motion.** Standard fade and rise. The button has a 120 ms background transition on hover. Nothing else moves.

---

### A3.14 Footer

**Band.** Ink. **Text:** on-dark-2, with on-dark for the wordmark and for links on hover. Separated from the final block by a `rule-dark` hairline.

**Purpose.** Name expansion, anchors, legal links, the standards line.

**Left block**

- Wordmark: "PIDA" (the interim wordmark of 0.3, until the founders supply a logo, D7)
- Line: "Pharma Industry Design Automation"
- Line: "Early process design for pharma plants, automated and traceable."

**Middle block (anchors, two columns)**

- "P&ID Making"
- "Connectivity"
- "Hydraulics"
- "Safety"
- "Isolation"
- "Engineering Answers"
- "How it fits together"
- "Why believe it"
- "Questions" (only if the FAQ ships)

**Right block**

- Text link, not a button (0.4): "Sign up for trial". It goes to `/trial`. The `cta_click` locations of 0.4 have no footer value, so this link sends no `cta_click` unless Part 0 adds one.
- Links: "Privacy" (`/privacy`), "Trial terms" (`/terms`), "Legal and accessibility" (`/legal`), "Cookie settings" (reopens the consent banner; only if analytics are used).
- Contact line, the same as in A3.13: "Investor or partner? Write to {role address}." Omit it if D4 is unanswered.

**Bottom lines (`MONO`, small)**

- "© {year} {legal entity}." The legal entity comes from the founders (0.6, D3). Until it is known, the staging site shows "© {year} PIDA."
- "Standards named on this site belong to their respective publishers. PIDA is not affiliated with or endorsed by them." This wording is fixed by 0.4.

Do not include team names, social icons, a newsletter field or badges. No "made in" badge of a site builder (0.1, rule 9). The registered address lives on `/legal`, not in the footer.

**Motion.** None.

---

## A4. Problem statements (manual work is the problem)

The final `THE TASK TODAY` texts are in A3.3 to A3.8. This table gives their one-line forms for reuse in decks and social posts. No product, vendor or vendor file format is named or implied (0.1, rule 4). The enemy is the hand work and the lost reasoning. It is never a tool that the reader's team has chosen and may be fond of.

| # | Section | Full text | One-line form |
|---|---|---|---|
| 1 | P&ID Making | A3.3 | "Drafting and retyping that add no engineering." |
| 2 | Connectivity | A3.4 | "Sheet-to-sheet hand-offs tracked by eye." |
| 3 | Hydraulics | A3.5 | "Models rebuilt by hand, with the assumptions lost." |
| 4 | Safety | A3.6 | "Safety answers assembled by eye from three places." |
| 5 | Isolation | A3.7 | "Isolation worked out with a highlighter, under time pressure." |
| 6 | Engineering Answers | A3.8 | "Numbers that travel without their clause, page or working." |

Rules for anyone extending these:

- Describe an action a person performs: traces, retypes, looks up, copies, checks.
- Name the consequence: a lost assumption, a missed line, a number without its source.
- Give no quantity of time or of sheets. "Days", "weeks", "hours" and "dozens" are not facts anyone has supplied.
- Never write "legacy", "outdated tools" or "old software". Never suggest that the reader's current software is the problem.

---

## A5. Voice, tone and the claim register

### A5.1 Voice in one paragraph

Write like a senior engineer explaining their own work to a reviewer.

- Be specific and calm. Use short declarative sentences.
- Give numbers with units. Put the evidence before any adjective.
- Use present tense and active voice.
- Address the reader as "you". PIDA is "PIDA" or "it", and never "we" in product descriptions. "We" is allowed only in the sign-up copy, the FAQ answer about the trial and the email, where a company is speaking.
- Use British spelling: coloured, programme, licence (noun). Standards are cited the way the standard cites itself.
- Units: SI with a space, as in "22 m³/h", "2.59 m/s" and "0.265 %". Write "L/d 12.6" exactly so.

### A5.2 Rules with do and don't examples

| Rule | Do | Don't |
|---|---|---|
| Lead with the fact | "A real run reported: Independent check: PASS, 0 error, 0 warning" | "Our checking engine ensures flawless drawings." |
| Copy numbers verbatim | "0 error, 0 warning" | "0 errors, 0 warnings", "error-free" |
| Say what it makes | "Generate gives a DXF and a package written beside it." | "Unlock end-to-end design workflows." |
| Quote the product's own words | ""This is exactly what will be drawn."" | "An intuitive, delightful preview experience." |
| Admit limits | "It says "not in the documents we hold" instead of guessing." | "It knows every standard." |
| State the two speed claims in their exact words | "A P&ID in 30 seconds." | "10x faster", "in seconds", "instantly", any other time figure |
| Keep determinism about the drawing | "Same specification in, same drawing out, byte-identical" | "byte-identical files", "identical results every time" |
| Make no status or traction claim | Show the screen and the output. | "running today", "in use with ...", any count of tools |
| Describe the assistant by its discipline | "Answers only from documents PIDA holds and cites clause and page." | Describing the technology underneath it |
| Promise nothing about the trial | "We will email you with the next step." | "nothing to install", "no card", "within two days", "sign in to your workspace" |
| Do not shout | End sentences with full stops. | All-caps sentences, emoji |
| Sentence length | Under 25 words as a rule. One idea per sentence. | Stacked clauses joined by "and" three times |

### A5.3 Words and constructions this part adds to the hard rules

The binding list of forbidden names and words is in 0.1. This section does not repeat it. In addition, this part bans the following from all site copy:

1. **Hype.** disruptive, cutting-edge, next-generation, state-of-the-art, world-class, best-in-class, effortless, frictionless, magic, magical, smart, intelligent, supercharge, turbocharge, unlock, unleash, empower, leverage (as a verb), robust, powerful, blazing, lightning, instantly, 10x, "in seconds", "at scale", "end-to-end", "one-stop", "digital transformation", "paradigm".
2. **Status and traction.** Any statement of how many tools run, any "in use with", any stage, date, version number or roadmap item.
3. **Trial promises.** Anything about installation, payment, duration, delivery time or a hosted login (0.4; 0.6, D1).
4. **Quantities of effort.** Any number or unit of time or volume for manual work.
5. **Compliance language about PIDA.** "GxP compliant", "validated", "qualified", "certified", "approved". The Engineer's answers are never called "advice".
6. **Invented numbers.** Any figure that is not a row of A5.4.

### A5.4 Claim register

Every factual claim on the site is one of these rows, in the allowed wording. A claim that is not in this table does not go on the site. If a re-shot still shows a different number, the still wins and the founders update this table (0.1, rule 8).

| # | Claim | Exact allowed wording | Evidence | Where used |
|---|---|---|---|---|
| CR-1 | P&ID speed (founders' claim) | "a P&ID in 30 seconds" | Founders | Hero, 01, final block, meta, email |
| CR-2 | Hydraulic speed (founders' claim) | "a hydraulic model in under a minute" | Founders | Hero, 03, final block, meta, email |
| CR-3 | Determinism, about the drawing only | "Same specification in, same drawing out, byte-identical" / "the same drawing, byte for byte" | Product statement | Hero, 09 diagram block, trust |
| CR-4 | Independent check | "An independent check on every drawing" | Trust facts | Hero, 01, trust, FAQ |
| CR-5 | Check result of a real run | "Independent check: PASS, 0 error, 0 warning" | Run report, verbatim | Proof strip, 01 |
| CR-6 | Deliverables counts of the same run | "12 lines, 28 valves, 23 instruments" and "38 HAZOP deviations (21 with no safeguard on the drawing)". Always framed as "a real run" or "the same run". | Run report, verbatim | Proof strip, 01 |
| CR-7 | Package contents | "independent check report and redline drawing; deliverables workbook (line list, valve list, instrument index, HAZOP starter); isolation plan; flow paths as PDF layers; hashed revision chain; DEXPI export" | Generator | 01, FAQ |
| CR-8 | Wizard steps, P&ID | "nine steps: equipment, spark filter, inlets, outlets, solids & cleaning, utilities, instrumentation, controlled streams, review" | Generator | 01, diagram |
| CR-9 | Preview sentence | ""This is exactly what will be drawn."" | Generator screen | 01 |
| CR-10 | Checks drawings made elsewhere | "the checker first proves itself on planted defects, then reports findings with positions and a redline" | Generator | 01, trust, FAQ |
| CR-11 | Specification import | "It imports a specification from xlsx or from a generated DXF" | Generator | Optional fact in 01, diagram |
| CR-12 | Project graph | "every P&ID of a project is a node in a rotating 3D graph; every sheet-to-sheet connection is an edge; a sheet joined to nothing is flagged" | Manager | 02 |
| CR-13 | Off-page flags | "Off-page flags come out of the generator already naming the sheet at the other end" | Manager | 02 |
| CR-14 | Graph example | "6 sheets, 5 joins", groups "reactor, condensers + receivers, utility supply, other" | M3 | 02 |
| CR-15 | Wizard steps, hydraulics | "seven steps: fluid, supply, heater and control, users, return, pipes, review" | Hydraulic Modeler | 03, diagram |
| CR-16 | CIP circuit | "17 junctions, 16 pipes, two spray balls, supply and return pumps, a heater and two flow-control valves" | M5 | 03 |
| CR-17 | Value marking | "Every value is marked given, sourced, assumed or empty" and "46 values: 33 given, 5 sourced, 8 assumed, 0 empty". Always framed as "on the screen shown". | M5 | 03, trust |
| CR-18 | Cited usual values | "roughness from Crane TP-410; inner diameters from ASME B36.19M" | M5 | 03 |
| CR-19 | Model review findings | "1.13 and 2.59 m/s at 22 m³/h" and "a sample-point dead leg of L/d 12.6 against the L/d 2 that ASME BPE recommends" | M5 | 03 |
| CR-20 | Model output | "a native model file". The stills show it "opened" and "solved". | M6, M7 | 03, diagram, FAQ |
| CR-21 | Engineer in the Hydraulic Modeler | "fills usual values with citations, reviews the model against rules and picks from vendor datasheets" | M5 | 03 |
| CR-22 | Solver agreement. OFF at launch (0.4; 0.6, D6). | "The same model solved in PIDA's own engine and in an industry-standard solver agreed to 0.265 %." | Founders | Trust block only, if switched on |
| CR-23 | Drawing-based safety answers | "the sheet's own facts: lines, valves with their actuator, duty and control loop, instrument nozzles, isolation envelopes and the generator's warnings" and "when asked, from standards with citations" | Workspace | 04 |
| CR-24 | Example questions | ""If this control valve fails, what are the consequences?"" and ""Which valves do I close to isolate Condenser 1?"" | Workspace | 04 |
| CR-25 | Flow path | "Pick any line, valve, nozzle or vessel; the flow path lights up on the real drawing; lines coloured by network: process, secondary process, utility" | M10 | 05 |
| CR-26 | Isolation scenarios | "two scenarios: manual block valves only; actuated valves locked out" and "says when a line leaves the sheet first" | M10 | 05 |
| CR-27 | Library size | "94 documents, 1,772 design rules in 46 topics, 67 vendor datasheets" | Engineer | Proof strip, 06, diagram |
| CR-28 | Standards included | "ASME BPE-2026, the EU Pressure Equipment Directive 2014/68/EU, API 520, 521 and 2000, the ISPE Baseline Guides" | Engineer | 06 |
| CR-29 | Engineer discipline | "answers only from documents PIDA holds and cites clause and page"; "never does arithmetic from memory: a number comes from a cited equation through a calculator"; "Verify before use"; "not in the documents we hold" | Engineer | 06, trust, diagram block |
| CR-30 | Worked example | "21 % (relieving at 121 % of MAWP) per ASME VIII, with PED's 10 % momentary-surge limit" | M8 | 06 |
| CR-31 | Document custody | "Your documents stay yours. Local first; a document not cleared for use never leaves the PC." | Trust facts | Trust, FAQ, final block |
| CR-32 | Compatibility, said once | "The files PIDA generates open in the standard CAD and hydraulic-analysis software engineering teams already use." | 0.1, rule 3 | A3.11 only |
| CR-33 | Engineer connections | "connected to the Hydraulic Modeler and to the Workspace, and it also stands alone". Never shown or described as part of the Generator. | Product structure | Diagram, 09 body |
| CR-34 | Scope line. OFF at launch (0.6, D6). | "Shown here is what works today: reactor sheets, condenser and receiver sheets, and a clean-in-place loop." | 0.5 | Trust block and FAQ, if switched on |

Wording traps:

- Never say PIDA "replaces" engineers, reviewers, a HAZOP or a relief study.
- The HAZOP output is a "HAZOP starter". The isolation output is an "isolation plan".
- "Independent check" describes the check on the drawing. It is never widened to the hydraulic model or to the Engineer's answers.
- There is no count of tools anywhere. The page has six sections; it never says "six tools" or "four tools".

---

## A6. Visual direction and components

### A6.1 The idea

The site should look like an engineering document that happens to be a website: a drawing sheet, a calculation sheet, a bound standard.

Industrial means ruled lines, title-block labels, monospaced numerals, measured spacing and restraint. It does not mean dark chrome, neon or circuit-board motifs.

The brand acts as a neutral, well-made sheet on which differently coloured product screens can be mounted without clashing. It does this with:

- one paper, one ink and two darks (navy, and the reading-room dark of section 06);
- one primary accent, cobalt;
- each section's own accent (0.2), used for small things only: the eyebrow, rules, stripes, callouts and chips.

### A6.2 Light or dark: the decision

**Decision (0.4): one industrial brand on a light paper base, with dark bands for the Workspace and Engineer sections.**

Reasoning:

1. The first audience is investors and the second is engineers. Both read carefully, and both print or screenshot pages into memos. Ink on paper reads best and survives print.
2. The discipline's heritage is paper: drawing sheets and calculation pads.
3. The founders reject the green-on-black look. A fully dark site drifts towards it whatever the accent colour.
4. The project graph, the Workspace and the Engineer screens are dark. Dark bands give them a native home.
5. Alternating paper and dark gives the long page a rhythm without decoration.

Band sequence (0.2):

1. Hero: paper
2. Proof strip: navy
3. 01: paper
4. 02: navy
5. 03: paper-cool, including the mid-page call to action
6. 04 and 05: navy, continuous
7. 06: reading-room dark
8. How it fits together: paper
9. Why believe it: paper
10. Compatibility band: paper-2
11. FAQ, if it ships: paper
12. Final call to action: navy
13. Footer: ink

Do not offer a theme toggle. The rhythm of light and dark is the design.

### A6.3 Palette

The tokens and values are those of 0.4. This table adds their use. Do not add a token; if a design seems to need a new colour, it needs a simpler design.

| Token | Value | Use |
|---|---|---|
| `paper` | `#F3F0E8` | Main background, navigation background |
| `paper-2` | `#FBFAF6` | Compatibility band, cards and form fields on paper, table stripes |
| `paper-cool` | `#E8ECF0` | Section 03 band only |
| `ink` | `#18202B` | Text on light bands, the footer band, the Engineer bar in the diagram |
| `ink-2` | `#4A5565` | Secondary text on light bands (about 6.6:1 on paper) |
| `navy` | `#0B1524` | Proof strip, sections 02, 04, 05, final block |
| `navy-2` | `#14233A` | Cards on navy and on the reading-room band |
| `reading-room` | `#17141A` | Section 06 band only |
| `on-dark` | `#EEF3FA` | Text on all dark bands |
| `on-dark-2` | `#B8C7DB` | Secondary text on dark bands, footer text |
| `cobalt` | `#1B4B9C` | The brand accent: primary buttons, links, active navigation, diagram strokes (about 7.3:1 on paper) |
| `cobalt-hover` | `#163D80` | Hover of cobalt buttons and links |
| `cobalt-on-dark` | `#8FB0FF` | Links on dark bands, the accent of section 02 |
| `petrol` | `#0B5F6B` | Section 03 accent, value chips, the hydraulics tier of the diagram |
| `amber` | `#FFC857` | Sections 04 and 05: flow, callout lines, eyebrow. Dark bands only. |
| `coral` | `#FF6B5E` | Isolation in section 05 and nothing else. Dark bands only. |
| `brass` | `#D9B466` | Section 06: eyebrow, rules, citation marks, callout. Dark bands only. |
| `rule` | `#C9C3B4` | Hairlines and frame borders on light bands |
| `rule-dark` | `rgba(238,243,250,0.16)` | Hairlines and frame borders on dark bands |
| `ok` | `#1E6B45` | The "Saved" message of the welcome form. Light surfaces only. |
| `error` | `#A12B1E` | Error title icon and field error text. Light surfaces only. |

Accent discipline:

- Cobalt may appear on any light band, cobalt-on-dark on any dark band.
- Every other accent appears only inside its own section.
- No green on black anywhere (0.4). `ok` is never placed on a dark band. The word "PASS" in the proof strip is set in on-dark, not in green.
- Contrast: body text pairs must reach 4.5:1 and large text and interface marks 3:1. The two ratios given above were checked by hand. The builder checks the rest in the QA of C18.

### A6.4 Typography

Two families and one mono (0.4). There is no serif anywhere on the site.

| Role | Face | Weights |
|---|---|---|
| Display: H1, H2, proof figures, the wordmark | Barlow Condensed | 500, 600 |
| Text: body, sub-headlines, H3, buttons, captions | Barlow | 400, 500, 600 |
| Mono: eyebrows, labels, facts, figures in tables, file formats | IBM Plex Mono | 400, 500 |

All three are free, open-licence web fonts. Self-host them as WOFF2 where the builder allows it. The fallback stacks are a build value of Part C; they use generic families only, so that no product name ships in the public style sheet.

Scale:

- H1: `clamp(44px, 7.2vw, 104px)`, line height 0.95 (0.4).
- H2, the section title: `clamp(36px, 5vw, 72px)`, line height 1.0 (0.4).
- H3, the headline under a title: `clamp(24px, 2.4vw, 32px)`, Barlow 500, line height 1.2.
- Sub-headline: `clamp(18px, 1.6vw, 22px)`, Barlow 400, line height 1.4.
- Body: 18 px from 768 px, 17 px below it, line height 1.55, measure at most 66 characters (0.4).
- Task-today note: 16 px.
- Facts, mono: 15 px from 768 px, 14 px below it.
- Labels and eyebrows, mono caps: 12 px, letter spacing 0.08 em.
- Proof figures: Barlow Condensed 600, tabular numerals, `clamp(28px, 3.2vw, 44px)`, line height 1.05. A figure may wrap to two lines and is never split, abbreviated or shrunk per cell. Cells align to the top.
- Captions, mono: 13 px.

Section titles keep the founders' capitalisation exactly, as in "P&ID Making Reimagined". Set "Reimagined" in the same weight and colour as the rest of the title. It is not italic, highlighted or animated.

### A6.5 Grid, spacing and the section template

Values from 0.4: 12 columns, container 1240 px, gutter 24 px, side margin `clamp(20px, 5vw, 64px)`, section padding `clamp(72px, 10vw, 160px)`. Breakpoints 480 / 768 / 1024 / 1280 / 1440. Test also at 360, 390 and 1920. The base unit is 8 px.

**Section template, 1024 px and wider.**

- Row 1: the eyebrow and the `THE TASK TODAY` note span columns 1 to 5. Columns 6 to 12 are empty.
- Row 2: the title spans columns 1 to 12, with the H3 headline under it in columns 1 to 8.
- Row 3: copy and facts in columns 1 to 5, the evidence frame in columns 6 to 12.
- Sections 02 and 05 mirror row 3, with evidence in columns 1 to 7 and copy in columns 8 to 12, to break the rhythm.
- Sections 03 and 04 put copy in columns 1 to 7 and use a full-width evidence row under it, because their images are wide.

**Tablet, 768 to 1023 px.**

- Row 1: the task-today note spans 8 of 12 columns.
- Row 2: the title spans all columns.
- Row 3: copy full width at the 66-character measure, facts in two columns under it, then the evidence frame full width. Nothing is mirrored and nothing pins.
- The hero stacks: copy, buttons, then M2 full width.
- The proof strip and the trust cards are 2 x 2.

**Mobile, under 768 px.**

- One column. Order inside a section: eyebrow, task-today note, title, headline, sub-headline, body, facts, evidence, caption.
- Callout overlays are hidden. The step rail scrolls inside its own container. The page never scrolls sideways at 360 px.
- Tap targets are at least 44 x 44 px.

**The `THE TASK TODAY` note.** A bordered note: 1 px `rule` (or `rule-dark`), 24 px padding, a mono label, body at 16 px in `ink-2` (or `on-dark-2`). It should look like a margin note on a drawing and clearly less important than what follows.

**Title-block motif.** Each section's eyebrow is drawn like the corner of a drawing title block: a thin 1 px rectangle divided into two cells, the number and the name, as in `01` | `P&ID GENERATOR`. The text is exactly the eyebrow of 0.2. There is no third cell. This is the one recurring ornament. Use it for the six sections and nowhere else.

### A6.6 Imagery rules

1. Only real product stills, real recordings and the real generated drawing. No stock photography, plant photographs, people, 3D renders of pipes, abstract gradients, generated illustrations or "brain" or "spark" imagery.
2. Screenshots are never tilted, put in device frames, given glows or floated in perspective. They sit flat, like figures in a report.
3. Every image has a caption in mono that says what it is.
4. Crop tightly to the application window. Crop; never blur or black-bar (0.3).
5. Do not recolour screenshots to match the site. Their own looks are part of the story.
6. M2 is the brand's hero image and the source of the social image. It is not used as a background texture anywhere.

### A6.7 Media frames

- 2 px radius and a 1 px border: `rule` on light bands, `rule-dark` on dark bands (0.4).
- On paper, paper-2 and paper-cool a media frame may carry the shadow `0 12px 32px -16px rgba(24,32,43,0.25)`. Nothing else on the site has a shadow, and nothing on a dark band has one (0.4).
- An optional top strip, 28 px tall, holds a mono label on the left, for example `PIDA / P&ID GENERATOR / REVIEW`, and a small square in the section's accent on the right. No imitation window buttons.
- Reserve the frame's height from the measured pixel size of the file, so that nothing shifts while it loads (CLS budget of 0.4).
- Stills are served as AVIF or WebP with a PNG fallback, at most 300 KB each, the hero at most 200 KB (0.4). Renditions are those of C9.6.
- Every still opens larger in the lightbox (A6.13). There is no compare slider (0.4).

### A6.8 Buttons, links and states

**Primary button (the call to action).**

- Light bands: cobalt fill, white text. Hover and active: cobalt-hover fill. (White on cobalt is about 8:1.)
- Dark bands: paper fill, ink text. Hover: paper-2 fill.
- 48 px tall (44 px under 480 px), 24 px side padding, 2 px radius, Barlow 600 at 16 px, letter spacing 0.02 em, sentence case. The label is always "Sign up for trial".
- State changes take 120 ms.

**Secondary button.** Used for "Back to the home page", "Try again", "Send", "Accept analytics" and "Decline".

- Light surfaces: transparent fill, 1 px ink border, ink text. Hover: ink fill at 6 % opacity.
- Dark bands: 1 px on-dark border, on-dark text. Hover: on-dark fill at 10 % opacity.
- The same size and type as the primary button.

**Text link.**

- Light bands: cobalt text with a 1 px underline set 3 px below the baseline. Hover: cobalt-hover with a 2 px underline. Visited links keep the same colour.
- Dark bands: cobalt-on-dark, the same underline. Hover: on-dark.
- Arrow variant ("See what it makes"): the same, followed by a 16 px arrow icon that moves 2 px on hover.
- Links inside body copy are never bold and never open a new tab, except the `mailto:` of the contact line and the outbound links of the legal pages, which send `outbound_click` (0.4).

**Focus.** Every interactive element shows a visible focus ring on keyboard focus: a 2 px outline with a 2 px offset, cobalt on light bands and on-dark on dark bands. Never remove it. Use `:focus-visible` so that mouse clicks do not show it.

**Disabled and busy.** The only control that can be disabled is "Send" on the welcome form while it is submitting. Disabled look: `rule` fill, ink-2 text, no hover change, `aria-disabled="true"`, and the label changes to "Sending". The provider buttons on `/trial` are plain links and are never disabled.

**Provider buttons.** On `/trial` only. They follow each provider's own brand rules for mark, colours and minimum size (0.4). They are the same width, stacked, "Continue with Google" first and "Continue with LinkedIn" second. Check LinkedIn's permitted label before launch; if that label is not allowed, use their stock wording (0.4).

### A6.9 Iconography

- As few icons as possible. Where one is needed (menu, close, arrow, play, pause, open larger, plus, minus), use one outline set at a 1.5 px stroke, square caps and a 24 px grid, in ink or on-dark. An open-licence outline set is fine; do not mix sets.
- OPTION, should-have: small P&ID symbols as ornaments in the title-block eyebrow and the diagram, drawn by the designer at the same stroke in the style of the symbols visible in M2. Suggested mapping: instrument bubble for 01, off-page connector for 02, pump for 03, control valve for 04, gate valve for 05, relief valve for 06. They are ornaments and not a legend; the site does not claim they follow a named symbol standard. If nobody can draw them well, leave them out.
- No emoji, 3D icons, duotone icons or "sparkle" icons for the Engineer.

### A6.10 Motion principles

All values are those of 0.4.

- Ease `cubic-bezier(0.22, 1, 0.36, 1)`. Entry motion lasts 0.6 to 0.9 s: blocks fade and rise 12 px, SVG strokes draw on. Interface state changes (hover, underline, menu) take 120 to 200 ms.
- Motion explains a process: plotting, filling steps, drawing a callout. It never decorates.
- One pinned sequence on the whole site, in section 01, at 1024 px and wider, never on touch devices (A3.3).
- The hero drawing is revealed once by a mask over 1.2 s. Nothing on the hero is tied to scroll.
- Numbers never count up. The question in section 04 is revealed by a clip. The rule in section 05 changes colour with the recording.
- No parallax, no scroll-jacking, no cursor effects.
- `prefers-reduced-motion`: no pin, no draw-on, no autoplay, no mask. Everything is simply there.

### A6.11 What to avoid

- Green on black, terminal windows, glowing grids, neon outlines and "hacker" styling of any kind.
- Purple-to-blue gradients, glass effects, blurred blobs and aurora backgrounds.
- Isometric factory illustrations, robot or brain imagery, chat-bubble mascots and sparkle icons.
- Logo walls, badge rows, star ratings and quote carousels.
- Imitation screens. Every screen shown must be a real one.
- Any third-party logo or name, including file-type icons, and any site-builder or 3D-tool badge (the hard rules in 0.1).
- Counters or timers that dramatise the two speed claims.
- Pop-ups, modal sign-up, a compare slider, count-ups, a second email (0.4).
- More than one accent colour in a single section, apart from 05, where amber and coral carry meaning.
- Centred body text. Only the compatibility band and the final call to action are centred.

### A6.12 Video component

Behaviour is fixed by 0.4. Encoding is C9.2.

- The frame is that of A6.7. The poster shows until playback starts.
- Two controls sit inside the frame at the bottom right, each 44 x 44 px, on a `navy` plate at 72 % opacity with on-dark icons:
  - pause / play toggle, labelled for screen readers "Pause recording" and "Play recording". It sends `video_toggle`.
  - "Open larger", labelled "Open recording larger". It opens the recording in the lightbox with native controls and sends `lightbox_open`.
- The controls are always visible. They do not wait for hover.
- There is no audio track, so there is no volume control and no captions file. The text description of A7.10 replaces captions.
- Reduced motion, or a data-saver setting: the poster with a centred secondary button "Play recording".
- If the video cannot load: the poster stays, and the caption still reads correctly. In section 02 the poster is M3.

### A6.13 Lightbox

- Opens from any still (click, Enter or Space on the frame, which has the label "Open image larger") and from the "open larger" control of a video.
- A full-viewport layer of `navy` at 96 % opacity. The image is fitted to the viewport with a 24 px margin (8 px under 768 px) and is never upscaled beyond its pixel size. If the image is larger than the viewport, a second click toggles between fit and 100 %, and at 100 % the image pans by drag or by scroll.
- Top right: a 44 x 44 px close button, labelled "Close image". Bottom left: the image's caption in mono, on-dark.
- It is a `role="dialog"` with `aria-modal="true"` and the caption as its label. Focus moves to the close button, is trapped while open and returns to the opening frame on close. Esc closes it. A click on the backdrop closes it. The page behind does not scroll.
- There is no gallery, no next or previous and no zoom slider.
- It opens and closes with a 200 ms fade. Under reduced motion it appears at once.
- Without JavaScript the frame is a plain link to the full-size image file.

### A6.14 Mobile menu (under 1024 px)

- The menu button is 44 x 44 px with a three-line icon and the label "Open menu". When open it shows a close icon and the label "Close menu", with `aria-expanded` set.
- The menu is a full-height sheet on `paper` that slides in from the right over 200 ms (it appears at once under reduced motion). The navigation bar stays visible above it.
- Contents, top to bottom: the seven anchors of A3.0 in Barlow Condensed 500 at 28 px, each a 56 px row with a `rule` hairline; then "Why believe it" and, if it ships, "Questions"; then the primary button "Sign up for trial" at full width; then "Privacy", "Trial terms" and "Legal and accessibility" in mono at 13 px.
- Choosing an anchor closes the sheet and scrolls to the section. Esc closes it. Focus is trapped while it is open and returns to the menu button on close. The page behind does not scroll.
- The button inside the sheet sends `cta_click {location: header}`.

### A6.15 Placeholders for a missing or failed asset

- **During the build (steps 1 and 2 of 0.7), for a still that has not arrived (M8, M9, the re-shot M1).** A frame of the right column span, with a `paper-2` fill on light bands or a `navy-2` fill on dark bands, a 1 px dashed border, and centred mono text: "STILL TO COME" and the file name on a second line. This placeholder is for staging only. It never goes live: sections 04 and 06 do not launch without M9 and M8 (0.3).
- **On the live site, when an image fails to load.** The frame keeps its reserved size, shows its alt text in ink-2 (or on-dark-2) at 14 px, and keeps its caption. No broken-image icon, no retry button.
- **When the 3D scene fails or is not supported.** The fallback ladder of 0.4: M4, then M3. No error message is shown.

### A6.16 Plain pages: legal, sign-up and 404

One template serves `/privacy`, `/terms`, `/legal`, `/trial`, `/trial/welcome`, `/trial/error` and `/404`.

- Band: paper, full height. The navigation bar is the same as on the home page, but its anchors link to `/#anchor`. The footer is the same.
- One column, left-aligned, starting at column 3 from 1024 px and spanning 7 columns; full width below that. Measure at most 66 characters.
- An eyebrow in mono, an H1 at the H2 scale of A6.4, then the content.
- **Legal pages.** Body at 18 px (17 px under 768 px). H2 in Barlow 600 at 24 px, H3 in Barlow 600 at 18 px, 32 px above a heading and 12 px below it. Lists use a plain dash. Tables, if any, have `rule` hairlines and `paper-2` stripes. Under the H1, a mono line: "Last updated: {date}". At the foot, a text link: "Back to the home page".
- **`/legal` has three H2 sections** with their own ids: "Company details" (`#company`), "Cookies and storage" (`#cookies`), "Accessibility" (`#accessibility`). Company details hold the legal entity and the registered address (0.6, D3). The builder supplies template text for all legal pages and the founders or a lawyer approve it before launch (0.6, D8). This part does not write legal text.
- **The privacy notice** names the two sign-in providers, which the hard rules in 0.1 allow as exemption (a). It must agree with the data list of 0.4: what is stored, and that no profile picture and no IP address are kept.
- **Sign-up pages.** The content column is narrower: 5 columns from 1024 px. The words are in A7.
- **404.** The words are in A7.9.

### A6.17 Print styles

Readers print pages into memos (A6.2). Provide one print style sheet.

- Every band prints with a white background and ink text. Accent colours are kept only for rules and chips.
- Hidden in print: the navigation bar, the menu, the cookie banner, video controls, the lightbox, the mid-page call-to-action strip and all buttons.
- Each video prints as its poster with its caption and its text description, opened.
- All FAQ items print open.
- Frames, cards, fact lists and the diagram avoid page breaks inside them. A section title stays with the paragraph that follows it.
- Body prints at 11 pt, captions at 9 pt. Margins 18 mm.
- Link addresses are not printed, except the contact address.
- The footer prints the wordmark, the name expansion, the standards line and the site address.
- All motion end states apply: chips filled, strokes drawn, the hero unmasked.

### A6.18 Builder notes (Framer, Webflow, hand-coded)

- **Framer.** Build the "Reimagined" section as one component with variants (band, accent, mirrored, media type), so that the six sections stay identical in structure. Use native effects for fade and rise. Use GSAP in a code component only for the hero mask, the section 01 pin and the stroke draw-on. If the 3D scene is built, embed it with the Spline component and load it on viewport entry.
- **Webflow.** Make the section a component with a combo class per band. Build the 46 squares and the diagram as SVG embeds. Load GSAP once, site-wide. Use native interactions for the rest.
- **Hand-coded.** A static site with CSS custom properties named exactly as the tokens of A6.3. GSAP and ScrollTrigger are the only motion dependencies. `<video>` with a poster, `IntersectionObserver` for play and pause, `<details>` for the FAQ.
- **Editing.** The site builder's own editor is the content system (0.4). No separate content system is needed.
- **Plans.** Buy the plans that remove the site builder's badge and the 3D tool's watermark (0.1, rule 9).
- **Sign-up wiring** is Part C (C10). This part defines only the screens and the words.

---

## A7. Sign-up flow copy and small copy

The design is fixed by 0.4: a page and not a modal, a top-level redirect and no pop-up windows, one consent line and no checkbox, a generic welcome page, one confirmation email. There is one action everywhere, "Sign up for trial", and sign-up is only through the two providers. There is no email field, no password field and no "or" divider leading to a form.

### A7.1 Entry points

| Place | Control | `cta_click` location |
|---|---|---|
| Navigation, and the button inside the mobile menu | Primary button | `header` |
| Hero | Primary button | `hero` |
| After section 03 | Primary button | `mid` |
| Final block | Primary button (paper on navy) | `final` |
| 404 page | Text link | `404` |
| Footer | Text link | none (A3.14) |

All of them are plain links to `/trial`. The remaining location of 0.4, `trial-page`, belongs to Part C.

### A7.2 `/trial`

- **Eyebrow (`MONO`):** "PIDA TRIAL"
- **H1:** "Sign up for trial"
- **Text:** "Use an account you already have. There is no password to create. We will email you with the next step."
- **Button 1:** "Continue with Google"
- **Button 2:** "Continue with LinkedIn"
- **Consent line (small, under the buttons; fixed by 0.4):** "By continuing you agree to the Trial terms and the Privacy notice."
  - "Trial terms" links to `/terms`. "Privacy notice" links to `/privacy`.
- **Data line (small, ink-2, under the consent line):** "We keep your name and email address from the account you choose, and use them to contact you about the PIDA trial. We do not keep a profile picture."
- **Line (`MONO`, small):** "NO PASSWORD TO CREATE / YOUR DOCUMENTS STAY YOURS"
- **Foot link:** "Back to the home page"

Notes:

- The two buttons are plain links, so the page works without JavaScript. There is no working state, no spinner and no pop-up hint, because the browser leaves the page at once.
- There is no checkbox on this page. The product-updates box lives on the welcome page and is unticked.
- Do not write what the trial delivers, how long it lasts or when the person will hear back (0.6, D1).
- Page title: "Sign up for trial | PIDA". The page is indexable.

### A7.3 `/trial/welcome` (new sign-up)

The page is generic and static. It never shows the person's name or email address (0.4).

- **Eyebrow:** "PIDA TRIAL"
- **H1:** "Thank you. Your sign-up is in."
- **Text:** "We have sent a confirmation email to the address of the account you used. We will email you with the next step."
- **Form heading (H2, small):** "Tell us a little more (optional)"
- **Form text:** "This helps us prepare. You can skip it."
- **Field 1 label:** "Company"
- **Field 2 label:** "Role"
- **Checkbox, unticked:** "Send me product updates"
- **Button (secondary):** "Send"
- **Skip link:** "Skip and go back to the home page"
- **After a successful send (replaces the form):** "Saved. Thank you." in `ok`, then the link "Back to the home page".
- **If the send fails (a bordered note above the button):** "That was not saved. Please try again."
- **If a field is too long (field error, `error` colour, under the field):** "Please keep this under 120 characters."

Form design: labels above the fields, always visible; no placeholder text used as a label. Fields are 48 px tall, `paper-2` fill, 1 px `rule` border, 2 px radius, and a 1 px ink border with the focus ring of A6.8 on focus. Neither field is required, so there is no asterisk and no "optional" tag on each label; the heading says it once. `autocomplete="organization"` and `autocomplete="organization-title"`.

Page title: "Thank you | PIDA". The page is not indexed.

### A7.4 `/trial/welcome?state=returning` (signed up before)

The same page as A7.3, with these differences:

- **H1:** "You had already signed up."
- **Text:** "We have sent the confirmation email again, to the address of the account you used. We will email you with the next step."
- The optional form is shown as in A7.3.

No date is shown, and no email address.

### A7.5 Withdrawal confirmation

The confirmation email carries a withdraw link (0.4). Its landing view is not among the pages of 0.2, so Part C decides where it renders; a state of `/trial/welcome` is the obvious place. The words:

- **H1:** "Your details have been deleted."
- **Text:** "We have removed your sign-up. You will not hear from us again unless you sign up again."
- **Link:** "Back to the home page"

### A7.6 `/trial/error`: the words shown for each error

The codes are those of C10.9. This table gives the words. Match a code to a row by its meaning. A code with no row of its own uses the last row. Under the text of every row sits a small line in mono, ink-2: "Reference: {id}" (0.4).

| Case (code where this part knows it) | H1 | Text | Buttons |
|---|---|---|---|
| The person cancelled at the provider (`cancelled`) | "Sign-up was not completed." | "The sign-in was cancelled before it finished. Nothing was saved." | "Try again" / "Back to the home page" |
| The sign-in took too long or the link was reused (`expired`) | "That sign-in has expired." | "The sign-in took too long or was opened twice. Nothing was saved. Please start again." | "Try again" |
| The provider refused or returned an error | "We could not sign you in." | "The sign-in provider did not confirm your account. You can try again, or use the other option." | "Try again" |
| The provider returned no email address | "We need an email address to reach you." | "The account you chose did not share an email address with us. Allow email sharing and try again, or use the other option." | "Try again" |
| The account's email address is not verified (`email_unverified`) | "That email address is not verified." | "The account you chose has an email address that its provider has not verified. Verify it with the provider, or use the other option." | "Try again" |
| Too many attempts | "Please wait a moment." | "There have been several attempts in a short time. Try again in a few minutes." | "Back to the home page" |
| Anything else, including a server or network failure | "Something went wrong on our side." | "Your sign-up was not saved. Please try again in a minute." | "Try again" / "Back to the home page" |

- "Try again" is a secondary button that links to `/trial`.
- The words never name a provider. The names appear on the two buttons and in the privacy notice only, which is what the allow-list of C17.3 covers.
- Styling: a 24 px `error` icon beside the H1. The text stays ink. Never blame the visitor.
- There is no pop-up-blocked case, because nothing opens in a pop-up.
- Page title: "Sign-up problem | PIDA". The page is not indexed.

### A7.7 There are no inline sign-up states on the home page

The final block of the home page holds a link to `/trial` and nothing else. Success, returning and error states exist only on the pages above.

### A7.8 Emails

There is one email to the person and one internal notice to the founders (0.4). There is no second email to the person, and no email promises a login.

Both are plain and text-first, with the wordmark as text and no product images. The sender name is "PIDA". The sender address comes from the founders (0.6, D3). The sign-off is "The PIDA team". No personal names appear.

**Email 1: confirmation (sent at sign-up, and sent again to a returning person)**

- Subject: "Your PIDA trial sign-up"
- Preheader: "We have your sign-up. We will email you with the next step."
- Body:

"Hello {given name},

Thank you for signing up for the PIDA trial. We have your sign-up under {email}.

What happens next: we will email you with the next step. You do not need to do anything until then.

What PIDA does, in one line: a P&ID in 30 seconds, a hydraulic model in under a minute, and every value traceable to its source.

If you did not sign up, or you have changed your mind, use this link and we will delete your details: {withdraw link}

The PIDA team
PIDA, Pharma Industry Design Automation"

- Footer: "You are receiving this email because you signed up for the PIDA trial at {site domain}. Withdraw at any time: {withdraw link}. {legal entity}, {registered address}."
- If no given name was received, the greeting is "Hello,".
- `{site domain}`, `{legal entity}` and `{registered address}` come from the founders (0.6, D3). Do not send this email from the live site until they are filled.
- When D1 is decided, only the "What happens next" paragraph changes.

**Email 2: internal notice to the founders**

- Subject: "New PIDA trial sign-up"
- Body: "A new trial sign-up was saved. Provider: {provider}. Name: {given name} {family name}. Email: {email}. Verified: {yes or no}. Source: {utm source} / {utm medium} / {utm campaign}. Returning: {yes or no}. Open the sign-up table to see company, role and the product-updates choice."
- It goes to the founders' address only. It is never copied to the person.

### A7.9 Other small copy

- **404.** Eyebrow: "404". H1: "This sheet is not in the project." Text: "The page you asked for does not exist. The rest of the site does." Button (secondary): "Back to the home page". Text link under it: "Sign up for trial" (goes to `/trial`, `cta_click {location: 404}`).
- **Cookie banner, shown only if analytics are used.** Text: "We would like to use analytics to see how this site is used. No advertising, and nothing is set until you choose." Buttons, both in the secondary style and of equal size: "Accept analytics" and "Decline" (0.4). Link: "Cookies and storage" (`/legal#cookies`). The banner is a bar at the foot of the viewport on `paper-2` with a `rule` top border. It does not cover the page, does not trap focus and is not a pop-up. If no analytics are used, there is no banner.
- **Video controls, screen-reader labels:** "Pause recording" / "Play recording" / "Open recording larger"
- **Lightbox, screen-reader labels:** "Open image larger" / "Close image"
- **Menu, screen-reader labels:** "Open menu" / "Close menu"
- **Collapsed description toggle under a video:** "What this recording shows"
- **Skip link:** "Skip to content"
- **No-JavaScript note.** None is needed. The page reads in full without JavaScript: stills are links, videos show native controls, the FAQ uses native elements and `/trial` uses plain links.

### A7.10 Text descriptions of the two recordings

Each sits under its video in a collapsed `<details>` labelled "What this recording shows". The builder watches each recording once and corrects the order of events if it differs. Do not add a number that is not a row of A5.4.

**M4, the connectivity recording:**
"The recording shows the P&ID Manager. Six P&ID sheets appear as nodes in a 3D graph, joined by five connections. The graph rotates so that each connection can be followed from one sheet to the next. The sheets are grouped as reactor, condensers + receivers, utility supply and other. There is no sound."

**M10, the flow path and isolation recording:**
"The recording shows a P&ID in the PIDA Workspace. An item on the drawing is picked and its flow path lights up on the drawing, with lines coloured by network: process, secondary process and utility. Isolation is then shown for a vessel: the valves to close are marked for two scenarios, manual block valves only and actuated valves locked out. Where a line leaves the sheet first, the Workspace says so. There is no sound."

---

## A8. SEO copy

### A8.1 Title tag (51 characters)

"PIDA | Pharma process design automation, reimagined"

OPTION (58 characters): "PIDA: a P&ID in 30 seconds, traceable pharma plant design"

### A8.2 Meta description (158 characters)

"PIDA automates early pharma process design: a P&ID in 30 seconds, a hydraulic model in under a minute, every value traceable to its source. Sign up for trial."

### A8.3 Open Graph and social

- `og:title`: "PIDA: pharma process design automation". The word "reimagined" is not used here, because 0.4 limits it to the headings and the title tag.
- `og:description`: "A P&ID in 30 seconds. A hydraulic model in under a minute. Every line, value and answer traceable to its source."
- `og:site_name`: "PIDA" (0.4)
- `og:type`: "website"
- `og:image`: `pida-og-1200x630.png`, made from M2 (0.3).
  - 1200 x 630 on a `paper` background.
  - On the left: the interim wordmark "PIDA", the line "Pharma Industry Design Automation" in Barlow Condensed, and the two speed claims in mono.
  - On the right: a crop of M2 with a 1 px `rule` border.
  - No dark screenshots, no third-party names, no text under 28 px.
- `og:image:alt`: ALT-14.
- `twitter:card`: "summary_large_image", with the same title, description and image.
- One social image serves every page.
- Favicon: the letter P on a cobalt square (0.3).

### A8.4 Heading outline of the home page

Exactly one H1. Section titles are H2. The headline under each title is an H3.

- H1: Pharma process design, reimagined.
  - H2 (visually hidden): Numbers from a real run
  - H2: P&ID Making Reimagined
    - H3: A P&ID in 30 seconds, checked before you see it.
    - H3 (small): Written beside every drawing
  - H2: Safety and P&ID Connectivity Reimagined
    - H3: See the whole project as one connected graph.
  - H2: Hydraulics Reimagined
    - H3: A hydraulic model in under a minute, with every value accounted for.
  - H2: Safety Reimagined
    - H3: Ask the drawing a safety question. Get an answer from its own facts.
  - H2: Isolation Reimagined
    - H3: Pick a vessel. See every valve you must close.
  - H2: Engineering Answers Reimagined
    - H3: Answers with the clause and the page, or no answer at all.
  - H2: How it fits together
  - H2: Why believe it
    - H3: Same specification in, same drawing out.
    - H3: An independent check on every drawing.
    - H3: Every value and answer carries its source.
    - H3: Your documents stay yours.
  - H2 (visually hidden): Compatibility
  - H2: Questions (if the FAQ ships)
  - H2: Pharma process design, reimagined. See it for yourself.

The `THE TASK TODAY`, `EXAMPLE SHOWN` and mid-page labels are styled paragraphs and not headings. The FAQ questions are `<summary>` elements and not headings.

### A8.5 Twelve target keywords

Work them into the copy only where the final copy above already carries them. Do not stuff the page.

1. pharma process design automation
2. P&ID automation
3. P&ID generator
4. automated P&ID drawing DXF
5. DEXPI export
6. P&ID checking software
7. hydraulic model automation
8. CIP hydraulic model
9. isolation plan from P&ID
10. HAZOP starter from P&ID
11. engineering standards assistant with citations
12. deterministic engineering design software

Secondary phrases to use naturally in captions and alt text: line list, valve list, instrument index, flow path, off-page connector, ASME BPE dead leg, relief valve overpressure, pharma plant engineering.

### A8.6 Structured data

Values fixed by 0.4: JSON-LD type `SoftwareApplication`, `name` "PIDA", `alternateName` "Pharma Industry Design Automation", `applicationCategory` "DesignApplication". `featureList` holds the six section subjects:

1. "P&ID generation with an independent check on every drawing"
2. "Project-wide P&ID connectivity graph"
3. "Hydraulic model automation with every value marked given, sourced, assumed or empty"
4. "Safety questions answered from the drawing's own facts"
5. "Flow path and isolation views on the drawing"
6. "Engineering answers from held documents, with clause and page"

Leave out `operatingSystem`, `offers`, price, ratings, reviews and any person. `url` is the canonical host, which the founders supply (0.6, D3).

### A8.7 Image and video alt texts

| Row | Medium | Alt text |
|---|---|---|
| ALT-1 | M2 in the hero | "A generated P&ID sheet for reactor R-101: a reactor with a spark filter train, instruments, valves and a title block." |
| ALT-2 | M1 in section 01, after the re-shoot | "The P&ID Generator at its review step. A nine-step list on the left, a live schematic of the reactor and spark filter train on the right, under the sentence: This is exactly what will be drawn. The independent check reads PASS." |
| ALT-2, interim | M1 before the re-shoot, with the chip cropped out | The same text without its last sentence. |
| ALT-3 | M2 in section 01 | "The finished P&ID for reactor R-101 as drawn by PIDA, with lines, valves, instruments and off-page connectors." |
| ALT-4 | M3 still | "The P&ID Manager showing a project as a 3D graph: six drawing sheets as nodes joined by five connections, grouped as reactor, condensers + receivers, utility supply and other." |
| ALT-5 | M4 video | "Screen recording of the P&ID Manager. The 3D graph of six connected P&ID sheets rotates, showing which sheets connect to which." |
| ALT-6 | M5 | "The Hydraulic Modeler. A seven-step wizard on the left, a live schematic of a clean-in-place circuit with pumps, a heater, spray balls and control valves in the centre, and the Engineer's review with cited values on the right." |
| ALT-7 | M6 | "The hydraulic model file written by PIDA, opened as a network of pipes and junctions." |
| ALT-8 | M7 | "A solved results table for the clean-in-place circuit at 22 m³/h, listing velocities and pressures." |
| ALT-9 | M9 | "The PIDA Workspace showing a condenser and receiver P&ID with the Engineer chat docked beside it, answering a safety question about a control valve from the drawing's own facts." |
| ALT-10 | M10 video | "Screen recording of the PIDA Workspace. A flow path lights up on the drawing with lines coloured by network, and the valves to close for isolating a vessel are shown in two scenarios." |
| ALT-10, poster | `pida-isolation-flowpath-poster.jpg` | "A P&ID in the PIDA Workspace with one flow path highlighted across the drawing." |
| ALT-11 | M8 | "An answer from the PIDA Engineer on fire-case relief valve overpressure for a vessel under both ASME and PED, giving 21 % (relieving at 121 % of MAWP) per ASME VIII, with PED's 10 % momentary-surge limit, with cited sources." |
| ALT-12 | The diagram | "Diagram of how PIDA fits together. Answers to a nine-step wizard become a specification. The P&ID Generator turns it into a drawing and a package. The P&ID Manager joins drawings into a project graph, and the Workspace shows flow paths, isolation and safety answers on a drawing. Separately, a seven-step wizard feeds the Hydraulic Modeler, which writes a native model file. The PIDA Engineer, with 94 documents, is connected to the Hydraulic Modeler and to the Workspace, and is also used on its own." |
| ALT-13 | PASS crop (option) | "A line from a real check report reading: Independent check: PASS, 0 error, 0 warning." |
| ALT-14 | `pida-og-1200x630.png` | "The PIDA wordmark beside a generated reactor P&ID sheet." |

After M8 and M9 are re-shot, read ALT-9 and ALT-11 against the new stills and correct anything the still does not show.

Rules for alt text:

- Describe what is on the screen in plain words and include the numbers that the image proves.
- Follow the hard rules in 0.1: no third-party product name, even if one was visible in the original capture.
- Do not start with "image of".

---

## A9. Open items, by decision id of 0.6

| What this part needs | Decision | What this part does until it is answered |
|---|---|---|
| What the trial delivers and how soon a person hears back | D1 | Every trial sentence reads "We will email you with the next step." (A3.12 question 1, A3.13, A7.2, A7.3, A7.8) |
| Site domain, canonical host, sender address, legal entity, registered address | D3 | Placeholders in the email footer (A7.8), the footer (A3.14), `/legal` (A6.16) and the structured data (A8.6). No launch without them. |
| The role-based contact address | D4 | The contact line is omitted from A3.13 and A3.14. |
| How the two speed claims are measured | D5 | FAQ question 6 is left out (A3.12). |
| Scope line and the 0.265 % proof point | D6 | Both off (A3.10, CR-22, CR-34). |
| The three re-shot stills and a logo | D7 | M1 cropped with the interim alt text; sections 04 and 06 wait for M9 and M8; the interim wordmark of 0.3 is used. Callouts in A3.6 and A3.8 are placed after the re-shoot. |
| Privacy notice, trial terms and company details text | D8 | Templates by the builder on the layout of A6.16; approval before launch. |
| Showing M6 and M7 cropped | D9 | Shown cropped to canvas and table (A3.5). |

Three things the builder settles alone, because they can only be read off the files: the second at which isolation begins in M10 (A3.7), the three network colours sampled from M10 (A3.7), and the group colours and sheet labels of M3 if the 3D scene is built (A3.4).

One point for the founders that 0.6 does not list: 0.4 says the word "partner" is never used, and 0.5 gives the contact line as "Investor or partner? Write to {role address}." This part uses the 0.5 wording. If the founders prefer, the line becomes "Investor? Write to {role address}."

---

# Part B: Product requirements (PRD) for the PIDA marketing website

This part covers the public marketing website for PIDA (Pharma Industry Design Automation). It does not cover the product. Where a requirement touches the product, it concerns only how the site shows the product.

How to read it with the other parts:

- **Part 0** holds the hard rules (0.1), the canonical page order and anchors (0.2), the media list M1 to M10 (0.3), every ruling on look, motion, sign-up, budgets and events (0.4), the additions of 0.5 and the founders' open decisions D1 to D9 (0.6). Part 0 wins over this part in every case.
- **Part A** holds the words and the look. **Part C** holds the build values. Where this part gives a word, a colour or a build value, it is a default so that nothing is left to guess. If Part A or Part C says otherwise, that part wins (order of precedence: Part 0, Part A for words and looks, Part C for build values, then Part B).
- This part says what the site must do, how we will know it works, and what must be true on launch day.

This part does not repeat the hard rules. Wherever a requirement depends on them it says "the hard rules in 0.1". The builder reads 0.1 before anything else.

Requirement ids (US-1 to US-15, FR-1 onwards, NFR letters) are stable. An id that a ruling removed is kept in its table and marked "Withdrawn", so that a reference from another part never points at the wrong requirement.

---

## B1. Background and goal

### B1.1 Background

PIDA automates the early process-design work of a pharma plant and keeps every result traceable to its source. The same specification in gives the same drawing out, byte-identical. The product has real outputs to show: drawings, check reports, workbooks, model files and cited answers. The site shows them through six named sections (0.2).

There is no public website yet. Two groups need one:

1. **Venture investors.** The site's first job is to help win funding. They arrive from an introduction or a deck link, often on a phone, make a short visit, and decide whether the product is real.
2. **Process and piping engineers and engineering managers** at pharma engineering companies. They arrive sceptical, want to see real output, and want to try it.

Both groups trust evidence over adjectives. The site therefore shows real screens, numbers copied from real runs and real citations, and keeps the prose short.

### B1.2 Goal

One scrolling page, a sign-up page with its two result pages, and the legal pages. Together they let a sceptical visitor do four things:

- see what each of the six capabilities does, using the product's own screens and recordings;
- understand why the output can be trusted: the drawing is deterministic, every drawing is independently checked, every value and answer carries its source, and the user's documents stay theirs;
- take one action, **"Sign up for trial"**, which leads to `/trial` and its two buttons, **"Continue with Google"** and **"Continue with LinkedIn"**;
- or, for a reader who will not sign up, write to the company at a role-based address (0.5; the address is 0.6, D4).

### B1.3 Non-goals

- The site is not the product, a product demo environment or a documentation portal.
- The site carries none of the things the hard rules in 0.1 exclude. In particular it has no Status block, no traction line, no pricing, no team page, no customer logos and no testimonials.
- The site says nothing about third-party software. Compatibility is said once, in the compatibility band (`#compatibility`, A3.11), and nowhere else. No hero line, fact bullet, caption, alt text, FAQ answer, meta description or email repeats it.
- The site makes no statement about what is "running today", about time saved, or about how soon a person gets a trial. None of these is a fact the founders have given.

---

## B2. Success metrics (hypotheses, not forecasts)

No baseline exists. Every target below is a hypothesis to test in the first four full weeks after launch and then reset from measured data. None of these numbers may appear in site copy or investor material.

Client-side events exist only for visitors who chose "Accept analytics" (B9), so client-side counts are a sample, not a census. `signup_success` is sent by the server and counts everyone. Ratios that mix the two are marked.

| # | Hypothesis | Metric | Initial target | How it is measured |
|---|---|---|---|---|
| H1 | Visitors who see real output want to try it | Share of visits with a page view of `/trial` | 5 % or more | Analytics page views |
| H2 | Two-button sign-up without a password loses few people | Completed sign-ups / started sign-ups | 60 % or more | Server-side: sign-up records created / requests to the sign-up start endpoint (a plain counter, no address stored). `signup_success` / `signup_start` is reported beside it but is biased by analytics consent. |
| H3 | Work-identity sign-up gives leads the founders can qualify | Share of sign-ups with a company email domain, or a company name given on `/trial/welcome` | 50 % or more | Sign-up table, reviewed by hand |
| H4 | The recordings are seen | Share of visits with `video_view` for at least one recording; share of those that use "open larger" (`lightbox_open` with a video asset) | 60 % see one; 10 % open one larger | `video_view`, `lightbox_open` |
| H5 | Visitors read past the first sections | Share of visits with `section_view` for `hydraulics` | 50 % or more | `section_view` |
| H6 | Engineers inspect screenshots closely | Share of desktop visits with at least one `lightbox_open` | 20 % or more | `lightbox_open` |
| H7 | The page is fast enough not to lose mobile visitors | Field Core Web Vitals at the 75th percentile, all "good" | LCP 2.5 s or less, INP 200 ms or less, CLS 0.1 or less | Real-user monitoring or the host's report |
| H8 | The confirmation email arrives | Delivered / sent | 98 % or more | Email service logs |
| H9 | Investors can find what they need without help | Five investor-profile readers can each say, after three minutes on the page, what PIDA does, why it can be trusted and what the next step is | 5 of 5 | Moderated test before launch |

Guardrails (must not get worse while chasing the above):

- zero breaches of the hard rules in 0.1 on the live site;
- zero accessibility blockers;
- zero sign-up records without a consent version and time.

---

## B3. Audiences and their jobs to be done

| Audience | Situation | Job to be done | What they need from the site | What makes them leave |
|---|---|---|---|---|
| **Venture investor** (primary) | Opens the link from a deck or an introduction, often on a phone, on a short visit | "Help me decide whether this is a real product in a real market, and whether the people behind it understand their buyer." | A clear one-line statement, six concrete capabilities with real screens, the four trust facts, the two speed claims stated plainly as the founders' claims, a way to write to the company, and an obvious next step | Adjectives without evidence, stock imagery, a machine-generated look, claims that cannot be checked |
| **Engineering manager** at a pharma engineering company | Judging whether the output survives a quality review | "Help me judge whether the output is reviewable, repeatable and usable by my team." | The deterministic drawing and the independent check explained plainly, the package list, the compatibility band, the "your documents stay yours" fact, a trial | Vague compliance language, no sign of an independent check, unclear data handling |
| **Process or piping engineer** | Curious and sceptical, will zoom into every screenshot | "Show me the actual drawing, the actual numbers and the actual citations, so I can tell whether this was built by people who do my job." | High-resolution stills that open larger, recordings that can be paused and opened larger, exact figures copied from the claim register (A5.4) | Blurry screenshots, invented numbers, wrong terminology |
| **Founders** | Will re-shoot stills and change wording | "Let me swap a still or a recording and correct a sentence without breaking layout or a hard rule." | Named text layers and media slots in the site builder's editor, a pre-publish checklist (B11), a builder who changes email and legal text on request | A swap that breaks layout; a rule broken by a quick edit |

---

## B4. Scope

### B4.1 In scope (launch)

- One home page with the blocks of 0.2, in that order: navigation, hero, proof strip, sections 01 to 03, the mid-page call to action, sections 04 to 06, "How it fits together", "Why believe it", the compatibility band, the final call to action, footer.
- A short FAQ above the final call to action (0.5; should-have; B15.6).
- The contact line "Investor or partner? Write to {role address}." in the final block and in the footer (0.5; shown only when the founders have supplied the address, 0.6 D4).
- Two recordings, M4 and M10, each with a poster, a pause / play toggle, an "open larger" control and a text description.
- A lightbox for every still.
- The trial sign-up: `/trial`, the provider round trip, `/trial/welcome`, `/trial/error`, one confirmation email, one internal notice, handling of a repeated sign-up, error handling.
- A sign-up table the founders can open and export as CSV.
- `/privacy`, `/terms`, `/legal`, `/404`, `/.well-known/security.txt`, a favicon set, social share metadata, a sitemap and a robots file.
- Analytics with consent, using only the events of 0.4 (B9).
- Mobile and tablet layouts, reduced-motion behaviour, a no-JavaScript fallback and print styles.

### B4.2 Out of scope

- Everything the rulings removed: a Status block, a traction line, a modal sign-up, pop-up windows, a second email, numbers that count up, a compare slider, a CAPTCHA, a stored profile picture, a stored IP address or hash.
- Any login to the product, a user dashboard, downloads of the product, licence delivery, or any promise of a hosted login.
- Password sign-up, email-link sign-up, or any sign-in provider other than the two named.
- Pricing, a team or founders page, careers, customer logos, testimonials, case studies, a press page, a blog or a resource library.
- Live chat, chat widgets, advertising tags, session replay, screen-recording heatmaps.
- Any route not listed in 0.2.

### B4.3 Later (leave room for it, do not build it)

- Sample output to download: one DXF, its deliverables workbook and its check report (0.5).
- A short recording for the P&ID Generator and one for the Hydraulic Modeler.
- The interactive 3D graph, if it is not built for launch (B FR-21).
- Additional tool sections. The section component should accept a seventh and eighth entry without a redesign.
- Founder-editable copy through a content collection, if the first build uses fixed text layers.
- A second language (NFR-L).
- A long-form page on security and data handling, if engineering managers ask for it during trials.

---

## B5. User stories and acceptance criteria

Unless a story says otherwise it is tested at the breakpoints of 0.4 (480, 768, 1024, 1280, 1440) and at 360, 390 and 1920 px.

### US-1 Browsing the page

*As a first-time visitor, I want to scroll one page and understand the six capabilities in order, so that I can judge the product on a short visit.*

- **Given** I open the home page, **when** it loads, **then** above the fold I see:
  - the product name with its expansion, Pharma Industry Design Automation, in the form Part A gives (A3.1);
  - the H1 and a one-sentence statement of what PIDA does;
  - the button "Sign up for trial";
  - the hero image M2 at 1024 px and wider; under 1024 px the H1, the sub-headline and the button "Sign up for trial" are above the fold and M2 follows the copy.
- **Given** I scroll, **when** each of the six sections enters view, **then** each section has:
  - the eyebrow of 0.2 (for example `01 / P&ID GENERATOR`);
  - the founders' section title, verbatim;
  - one body paragraph of 40 to 90 words;
  - the media of 0.2 for that section;
  - a short list of facts, each at most 16 words, each copied from the claim register (A5.4).
- **Given** I am anywhere on the page, **when** I look at the navigation, **then** "Sign up for trial" is visible and one click or tap away.
- **Given** the navigation has in-page links, **when** I choose one, **then**:
  - the page moves to that block;
  - the URL gains the anchor of 0.2 (for example `#hydraulics`);
  - keyboard focus lands on the block's heading.
- **Given** I paste a URL with an anchor of 0.2, **when** the page loads, **then** I land on that block and the sticky navigation does not cover its heading.
- **Given** any number on the page, **then** it is simply there. It does not count up, tick or animate.

### US-2 Watching the P&ID Manager recording (M4)

*As a visitor, I want to watch the rotating 3D project graph, so that I can see how sheets and their connections are shown.*

- **Given** the section `#connectivity` is far below the viewport, **then** only the poster (M3, or `pida-connectivity-graph-poster.jpg`) has been requested. The video file is requested when the section comes near the viewport.
- **Given** the recording is at least half visible and I have no reduced-motion preference, **then** it starts by itself, muted, looped and inline (`playsinline`), and `video_view {asset}` is sent once it has been visible for 3 s.
- **Given** the recording scrolls off screen, **then** it pauses, and it resumes when half visible again unless I paused it myself.
- **Given** the recording is on screen, **then** I see a pause / play toggle and an "open larger" control, both reachable by keyboard. Using the toggle sends `video_toggle {asset, state}`. My pause is respected until I press play.
- **Given** I choose "open larger", **then** the recording opens in the lightbox (B14.5) with the browser's native controls (play, pause, scrub, full screen), and `lightbox_open {asset}` is sent.
- **Given** the recording has no narration, **when** I look beside or below it, **then** a short text description says what is shown (B15.4).
- **Given** the video fails to load, **then** the poster stays, the line "This recording could not be played." appears under it, and the still M3 can still be opened larger.
- **Given** the optional 3D scene ships and my device qualifies (1024 px or wider, not a touch device, WebGL available, no reduced-motion preference, no data-saver), **when** the section is near view and the browser is idle, **then**:
  - the scene replaces the poster without shifting layout;
  - I can rotate it by drag, by arrow keys or by on-screen buttons, and pause any automatic rotation;
  - my first interaction sends `graph3d_interact`.
- **Given** any of those conditions is not met, or the scene fails, **then** I get M4, and if M4 fails I get M3 (the fallback ladder of 0.4).

### US-3 Watching the flow path and isolation recording (M10)

*As an engineer, I want to watch a flow path light up and an isolation set appear on a real drawing.*

- The loading, autoplay, toggle, "open larger" and failure criteria are those of US-2, with the poster `pida-isolation-flowpath-poster.jpg`.
- **Given** the recording uses colour to carry meaning, **when** I read the text description (B15.4), **then** it states in words what each line colour means (process, secondary process, utility) and names the two isolation scenarios: manual block valves only, and actuated valves locked out.
- **Given** the recording reaches the part that shows isolation, **then** the rule under the section title changes from amber to coral (0.4). Under reduced motion the rule is static: left half amber, right half coral (A3.7).
- **Given** I am on a phone, **then** the recording plays inline, never forced to full screen, and I can enter full screen by choice from the lightbox.

### US-4 Opening a still larger

*As an engineer, I want to open any still larger to read the drawing, the numbers and the citations.*

- **Given** any still on the site (M1, M2, M3, M5, M6, M7, M8, M9), **when** I click, tap, or press Enter or Space on it, **then** the lightbox opens and shows the largest rendition, its caption and a close control, and `lightbox_open {asset}` is sent.
- **Given** the lightbox is open, **then**:
  - focus is trapped inside it;
  - Escape, the close control and a click on the backdrop all close it;
  - focus returns to the still I opened;
  - the page behind does not scroll.
- **Given** I am on a touch device, **then** I can pinch to zoom and drag to pan. On desktop, when the image is larger than the viewport, a second click toggles between fit and 100 %, and at 100 % I can pan by drag, by scroll or by the arrow keys (A6.13). There is no zoom control, no gallery and no next or previous.
- **Given** the large rendition is still loading, **then** I see the rendition already on the page scaled up, with a loading indicator, never an empty panel.
- There is no compare slider anywhere.

### US-5 Trial sign-up with Google

*As a visitor, I want to sign up with my Google account, so that I do not create another password.*

- **Given** I choose "Sign up for trial" anywhere, **then** I go to the page `/trial`. It is a page, not a modal.
- **Given** `/trial`, **then** I see exactly what B15.1 lists: a heading, one line saying what happens next, the button "Continue with Google", the button "Continue with LinkedIn", and the consent line "By continuing you agree to the Trial terms and the Privacy notice." with both documents linked. There is no checkbox, no email field, no password field and no other provider.
- **Given** the two buttons, **then** they are plain links. They work with JavaScript off. Choosing one sends `signup_start {provider}` when analytics is accepted.
- **Given** I choose "Continue with Google", **then** the whole tab goes to Google's own sign-in screen (a top-level redirect). No pop-up window opens. The request asks only for basic identity and email.
- **Given** I approve at Google, **when** I return, **then** within three seconds I see `/trial/welcome`. It is generic and static. It never shows my name or my email address. It says "We will email you with the next step." (0.4; what the trial delivers is 0.6, D1).
- **Given** `/trial/welcome`, **then** it offers one optional form: company, role, and an unticked box "Send me product updates". I can skip it (B15.2).
- **Given** the sign-up is recorded, **then** the table holds exactly the fields of 0.4: provider, the provider's subject id, email, email-verified flag, given name, family name, company, role, product-updates opt-in, consent version and time, created time, UTM source / medium / campaign, locale. It holds no profile picture and no IP address or hash. No access or refresh token is kept after the profile is read.
- **Given** the sign-up is recorded, **then** the server sends `signup_success {provider}`, one confirmation email goes to me (US-8), and one internal notice goes to the founders within five minutes.

### US-6 Trial sign-up with LinkedIn

- The criteria are those of US-5, with "Continue with LinkedIn" and LinkedIn's OpenID Connect sign-in asking only for basic identity and email.
- **Given** LinkedIn does not return a verified email, **then** the sign-up is refused, nothing is stored, and I land on `/trial/error` with the code `email_unverified`, the words of A7.6 for that code, and the option to use Google instead.
- **Given** the same person signs up once with each provider using the same email, **then** one record exists. The second sign-up is treated as a returning sign-up (US-9). Part C (C10) decides how the second provider is noted on the record.
- Before launch the builder checks LinkedIn's brand rules for the button label. If "Continue with LinkedIn" is not permitted, LinkedIn's stock wording is used (0.4).

### US-7 Consent

*As a visitor in the EU or elsewhere, I want to know what I am agreeing to before my data goes anywhere.*

- **Given** `/trial`, **then** the consent line sits directly under the two buttons, in body text of at least 16 px, with "Trial terms" linking to `/terms` and "Privacy notice" linking to `/privacy`. Both open in the same tab as ordinary links; the back button returns to `/trial`.
- **Given** I follow a provider link, **then** the consent version (the version label of the terms and notice then published) and the time are recorded with my sign-up. A record without them is a guardrail failure (B2).
- **Given** the box "Send me product updates" on `/trial/welcome`, **when** I leave it unticked or skip the form, **then** I receive only the confirmation email and messages needed to deliver the trial.
- **Given** I have not yet chosen in the cookie banner, or I chose "Decline", **then** no analytics script is loaded and no client-side event is sent. The banner's two buttons, "Accept analytics" and "Decline", have equal size and weight (B14.9). A footer link "Cookie settings" reopens the banner.
- **Given** the consent line, the terms or the notice change, **then** the version label changes with them, and the builder makes that change on the founders' request (0.4, Editing).

### US-8 Confirmation email

- **Given** a successful sign-up, **when** the record is stored, **then** within two minutes one plain email is sent to my address from the sender address the founders name (0.6, D3). It has:
  - a reply-to that a person reads;
  - the sentence "We will email you with the next step.";
  - a withdraw link (B FR-34);
  - the company's legal details in its footer (0.6, D3).
- **Given** the email, **then** it contains no tracking pixel and no tracked links, follows the hard rules in 0.1, makes no claim beyond the claim register (A5.4), promises no hosted login, names no number of days, and passes SPF, DKIM and DMARC alignment. The words are those of A7.8 (B15.5).
- There is no second email. The only other message is the internal notice to the founders.
- **Given** the email bounces, **then** the bounce shows in the email service's report and the founders are told (should-have).
- **Given** the email service is down, **then** the sign-up still succeeds, the email is retried by the service, and `/trial/welcome` promises nothing it cannot keep: its words are "We will email you with the next step.", not "Check your inbox now".

### US-9 Returning visitor

- **Given** I already signed up, **when** I complete sign-up again with the same email (either provider), **then**:
  - no second record is created;
  - I land on the same page with `?state=returning`, which adds one line saying the email was sent again (B15.2);
  - the confirmation email is sent again, once.
- **Given** I return to the home page later, **then** the page looks the same as for a new visitor. The marketing site keeps no session. The only things it may store on my device are my analytics choice and, for a short time after the provider round trip, the reference that lets the optional form find my record (B FR-29).
- **Given** I previously withdrew, **when** I sign up again, **then** a new record with a new consent version and time is created and I am treated as a new sign-up.

### US-10 Error cases

Error codes are those of C10.9. The words shown for each code are those of A7.6. Every error is shown on `/trial/error?code={code}` with a small line "Reference: {id}" beneath the message, a "Try again" link to `/trial` and, when D4 is answered, the contact address. `signup_error {code}` is sent. This part does not invent code names; where the table says "per C10.9" the builder takes the code from there.

| Case | Given / When | Then |
|---|---|---|
| Provider consent declined | I cancel at Google or LinkedIn | `/trial/error` with the code `cancelled`. Nothing is stored. The page offers both providers again through `/trial`. |
| Attempt expired | I take too long at the provider, or reuse an old link | `/trial/error` with the code `expired`. Nothing is stored. |
| Unverified LinkedIn email | LinkedIn returns no verified email | `/trial/error` with the code `email_unverified` (US-6). Nothing is stored. |
| Provider error or timeout | The provider returns an error, or does not answer in 10 s | `/trial/error` with the code per C10.9. The page suggests the other provider. |
| Failed security check | The callback's state or nonce does not match | The attempt is rejected and nothing is stored. Generic message, code per C10.9. |
| Sign-up table unavailable | Storing the record fails | `/trial/error` with the code per C10.9. The failure raises an alert to the founders. Nothing is half-stored. |
| Third-party cookies blocked, or a private window | Any | The flow still completes, because it uses top-level redirects and first-party server state only. |
| Offline | I lose connection mid-flow | The browser's own offline page, or a plain message. No spinner runs longer than 10 s. |
| Rate limit | More than the allowed attempts from one address | A polite message, code per C10.9. The limit is applied at the edge and the address is not stored. No CAPTCHA is shown. |
| Broken link | I open an unknown URL | `/404` (B14.7). |
| Asset missing | A still or video URL returns an error | The caption and description remain, the placeholder of B14.10 keeps the layout, and no broken-image icon is shown. |

### US-11 Mobile

- **Given** a 360 px wide viewport, **then**:
  - there is no horizontal scroll;
  - body text is 17 px;
  - tap targets are at least 24 by 24 CSS px with adequate spacing, and 44 px for buttons, the menu control and the video controls.
- **Given** wide stills (the drawing M2, the results table M7), **then** they scale to the container width, carry a visible "open larger" affordance, and are legible in the lightbox with pinch zoom.
- **Given** a touch device or a viewport under 1024 px, **then**:
  - nothing pins;
  - the 3D scene is never loaded;
  - the hero image sits below the hero text with no overlap;
  - the navigation collapses to the wordmark, the "Sign up for trial" button and a menu control (B14.6).
- **Given** the sign-up on a phone, **then** it uses the same top-level redirect and returns to `/trial/welcome` in the same tab.

### US-12 Reduced motion

- **Given** my system asks for reduced motion, **then**:
  - nothing pins, no SVG stroke draws on, the hero mask does not run, no graph rotates by itself and no video starts by itself;
  - content is simply there, in place and at full opacity;
  - state changes are instant or a very short fade;
  - each recording shows its poster and a play control, and plays only on my action.
- **Given** any motion that lasts more than five seconds or loops, **then** there is a visible pause control regardless of system settings.
- **Given** reduced motion, **then** no content or information is lost. Everything an animation reveals is present in the static layout.

### US-13 No-JavaScript fallback

- **Given** JavaScript is disabled or fails to load, **then**:
  - all headings, copy, stills and captions are visible;
  - nothing is hidden at zero opacity waiting for a script;
  - each recording shows its poster and the browser's native controls;
  - each still links directly to its largest rendition;
  - in-page links work as plain anchors;
  - the FAQ answers are readable (B14.8).
- **Given** no JavaScript, **when** I choose "Sign up for trial", **then** I reach `/trial`, and its two provider buttons work because they are plain links. The optional form on `/trial/welcome` is an ordinary form post (back-end option B only). With back-end option A (C10.2), the default, `/trial/welcome` needs JavaScript to record the sign-up and shows the `noscript` line of C21.2; this is accepted, and the full no-JavaScript path exists only in option B. The founders weigh this when deciding D2 (0.6).
- **Given** no JavaScript, **then** the cookie banner does not appear, analytics does not run, and nothing else breaks.

### US-14 Editing by the founders (should-have)

The site builder's own editor is the content system (0.4). This story is a should-have and does not block launch.

- **Given** I am a founder with editor access, **when** I open the project, **then** every piece of visible copy is a named text layer or field, grouped by the blocks of 0.2, and every media slot is named by its media ID (M1 to M10).
- **Given** I change a sentence and publish, **then** layout holds for copy within the limits of 0.4 (body 40 to 90 words, a fact at most 16 words).
- **Given** I am about to publish, **then** I run the pre-publish checklist (the "Content and rules" group of B11). In a hand-coded build the banned-terms check of C17.3 runs on every build as well.
- **Given** I want email wording or legal text changed, **then** I ask the builder, who changes it and raises the version label where consent is affected.
- **Given** I want to undo, **then** the editor's own version history is used; this part sets no extra requirement.

### US-15 Swapping a still or a recording later

- **Given** a re-shot still (M1, M8 or M9), **when** it is saved over the same file name in the Drive folder of 0.3 and uploaded to its slot, **then**:
  - the responsive renditions of C9.6 are produced again;
  - the lightbox uses the new file;
  - the frame takes the new file's own width and height, so nothing shifts while loading and nothing is stretched.
- **Given** a layout that needs two stills to share a height, **then** each still is fitted inside its frame on the band colour. A still is never cropped by CSS and never stretched. Cropping, where 0.3 asks for it, is done in the file itself.
- **Given** any new still or frame, **then** before upload it passes the check of 0.3: at 200 % it shows no third-party name, logo or window title, no browser address bar, no personal name and no internal rule identifier. Crop; never blur or black-bar.
- **Given** a re-shot still shows a number that differs from the claim register, **then** the still wins, the founders update the register (A5.4), and the builder updates every place the old number appears.
- **Given** a new recording, **when** I replace the file and its poster, **then** the toggle, the "open larger" control and the description keep working. The limits are those of 0.4: the source width and never above 1600 px, the source frame rate, H.264 MP4 plus WebM VP9 (AV1 optional), each rendition under 3 MB, no audio track needed. The two source MP4s are the masters and are never upscaled.
- **Given** a swap, **then** file names stay the canonical names of 0.3.

---

## B6. Functional requirements

Priority: **M** must (launch blocker), **S** should (launch if at all possible), **C** could (after launch if time is short).

### Page and navigation

| ID | Requirement | Pri |
|---|---|---|
| FR-1 | One home page containing the blocks of 0.2 in the order of 0.2, with the band and accent of 0.2 for each block. The six section titles are the founders' wording, verbatim. | M |
| FR-2 | The hero (`#top`) shows the product name with its expansion, the H1, a one-sentence statement of what PIDA does, the button "Sign up for trial" and the image M2. It carries no compatibility sentence and no fact bullet about what the files open in. | M |
| FR-3 | A sticky navigation on the paper band with the interim wordmark (0.3), in-page links and the button. Under 1024 px it collapses to the menu of B14.6. It never covers a focused element or a heading reached by anchor. | M |
| FR-4 | Every block carries the anchor id of 0.2, exactly as written there. The ids do not change when copy changes. | M |
| FR-5 | The call-to-action label is "Sign up for trial" everywhere. The button appears in the navigation, in the hero, once after section 03 and in the final block (`#trial`). The footer carries a text link with the same label. Every one of them goes to `/trial`. No section carries its own sign-up link. | M |
| FR-6 | Compatibility is said exactly once on the site, in the compatibility band (`#compatibility`), in the wording of A3.11. Nothing else on any page, in any metadata or in the email echoes it. | M |
| FR-7 | "Why believe it" (`#trust`) presents four cards: deterministic output (the same specification gives the same drawing, byte-identical); an independent check on every drawing; every value and answer carries its source; your documents stay yours (local first; a document not cleared for use never leaves the PC). Determinism is always said of the drawing, never of "files". | M |
| FR-8 | The 0.265 % proof point is off at launch. If the founders switch it on (0.6, D6) it appears in the trust block only, in the exact wording of A5.4. | S |
| FR-9 | Withdrawn. There is no traction line and no Status block (0.2). | - |
| FR-10 | The footer (ink band, text in on-dark-2) has: the wordmark; the text link "Sign up for trial"; links to `/privacy`, `/terms` and `/legal`; the contact line when D4 is answered; the link "Cookie settings"; the standards line of 0.4, verbatim; a copyright line with the legal entity (0.6, D3). No social links unless the founders supply them. | M |
| FR-11 | A `/404` page per B14.7. | M |
| FR-46 | The proof strip (`#proof`, navy band) has four cells. Each cell is a fact copied verbatim from the claim register (A5.4). The run report reads "Independent check: PASS, 0 error, 0 warning", in the singular, exactly. No cell adds a derivation or a universal claim to its number, and no number counts up. | M |
| FR-47 | "How it fits together" (`#how-it-fits`) is one SVG diagram. It shows the P&ID Generator fed by its own wizard, and the Hydraulic Modeler fed by its own, separate wizard. The Engineer is connected to the Hydraulic Modeler and to the Workspace and also stands alone. It is not connected to the Generator. The diagram has a text alternative that says the same. | M |
| FR-48 | The contact line "Investor or partner? Write to {role address}." appears in the final block and in the footer. If D4 is unanswered the line is omitted in both places. This is the only place the site uses the word "partner". | M |
| FR-49 | A short FAQ sits above the final block, with the anchor `#faq` (B15.6). | S |
| FR-50 | The optional scope line of 0.5 appears in the trust block only if the founders decide so (0.6, D6), in the wording of 0.5. | C |
| FR-51 | The live site shows no "made in" badge of a site builder and no 3D-tool watermark (hard rule 9 in 0.1). The builder buys the plan that removes them before launch and states its cost to the founders in week one. | M |
| FR-52 | The word "Reimagined" appears in headings only: the six section titles, the H1, the heading of the final block and the title tag. It never appears in body copy, captions, alt text, the FAQ or the email. | M |

### Section component

| ID | Requirement | Pri |
|---|---|---|
| FR-12 | One reusable section component with these slots: eyebrow (0.2), title (verbatim), body paragraph (40 to 90 words), fact list (0 to 6 items, each at most 16 words), media slot (one or more stills, or one recording with its poster), caption, optional claim line. | M |
| FR-13 | The claim line is used only for the two speed claims of hard rule 7 in 0.1, on section 01 and section 03, in those exact words and in the form Part A gives. Nothing near it is a stopwatch, a timer, a progress percentage or an elapsed time. | M |
| FR-14 | Each section uses the band and the accent of 0.2 inside one site-wide brand (the type, grid and tokens of 0.4). Brass, amber and coral appear on dark bands only. Coral means isolation and is used for nothing else. No green on black anywhere. | M |
| FR-15 | The component accepts additional sections without a layout change. | S |
| FR-53 | Abbreviations are expanded at their first use on each page, as listed in 0.4. `/trial`, each legal page and the email each count as a page of their own. Flow is written "m³/h" with the superscript character. | M |

### Media

| ID | Requirement | Pri |
|---|---|---|
| FR-16 | Every still is served responsively (the renditions of C9.6, AVIF or WebP with a PNG fallback), lazy-loaded below the fold, with explicit width and height taken from the measured file. The hero image M2 is not lazy-loaded. | M |
| FR-17 | Every still opens in the lightbox per US-4 and B14.5. | M |
| FR-18 | Every still has meaningful alt text and a visible caption. A still whose numbers matter has those numbers repeated in the text beside it. Alt text follows the hard rules in 0.1. | M |
| FR-19 | Both recordings behave per the video ruling of 0.4 and US-2: poster first, muted, looped, `playsinline`, start when half visible, pause off screen, a visible pause / play toggle, an "open larger" control, a text description, the error fallback. | M |
| FR-20 | Under `prefers-reduced-motion` no recording starts by itself: poster and click to play. | M |
| FR-21 | The 3D scene (Spline) is not a launch blocker. Launch with M4 and M3. If it is built: six flat plates (not spheres) and five edges in exactly the topology of M3, no invented node, lazy-loaded at most 1.5 MB, only on qualifying devices (US-2), with keyboard and button alternatives to drag, a pause control, and the fallback ladder Spline, then M4, then M3. | C |
| FR-22 | Scroll-linked motion (GSAP) is progressive enhancement and follows the motion ruling of 0.4: at most one pinned sequence, in section 01, desktop only (1024 px or wider, not a touch device). The hero drawing is revealed once by a mask over 1.2 s and nothing on the hero is tied to scroll. The question in section 04 is revealed by a clip, not typed letter by letter. Content is complete and readable without any of it. | S |
| FR-23 | Every still and every video frame passes the 200 % check of 0.3 before it goes live. M1: until the re-shot file arrives, the "Not generated" chip is cropped out of the file. M5: the browser address bar is cropped. M6: cropped to the model canvas. M7: cropped to the table only (0.6, D9). Crop; never blur or black-bar. | M |
| FR-54 | Sections 04 and 06 do not go live with the old captures. M9 and M8 are launch blockers for those sections (0.3; 0.6, D7). Because the page is defined as six sections, launch waits for both files unless the founders first change Part 0. | M |
| FR-55 | Media file names are the canonical names of 0.3. Derived files follow the same pattern: `<name>-poster.jpg` for each recording, the renditions of C9.6, and the social image `pida-og-1200x630.png` made from M2. | M |

### Sign-up

| ID | Requirement | Pri |
|---|---|---|
| FR-24 | The sign-up lives at the stable URL `/trial`. It is a page, not a modal, so it works without JavaScript and can be linked from emails and decks. The final block on the home page (`#trial`) holds the call-to-action button, not the provider buttons. | M |
| FR-25 | `/trial` offers exactly two methods, labelled "Continue with Google" and "Continue with LinkedIn", as plain links styled to each provider's own brand rules. The provider-branded buttons appear on `/trial` only. | M |
| FR-26 | Consent is one line under the buttons, with no checkbox: "By continuing you agree to the Trial terms and the Privacy notice." The consent version and the time are stored with the record. The unticked "Send me product updates" box lives on `/trial/welcome` only. | M |
| FR-27 | Authentication is the OAuth 2.0 authorisation code flow with OpenID Connect: a top-level redirect to the provider and back, no pop-up windows, state and nonce, PKCE where supported, minimal scopes (identity and email only), and an exact redirect-URI allow-list. | M |
| FR-28 | After the callback the back end stores exactly the fields of 0.4 and discards the provider's tokens. It stores no profile picture and no IP address or hash. | M |
| FR-29 | `/trial/welcome` is generic and static. It never shows the person's name or email. It offers one optional form (company, role, unticked "Send me product updates"), saved on submit and skippable. The form finds the record through a short-lived, opaque reference set by the callback. The reference carries no personal data, is not readable as a name or an email, and expires within 30 minutes. C10 chooses the mechanism. | M |
| FR-30 | A repeated sign-up is matched on the normalised email across both providers. No second record is created. The person lands on `/trial/welcome?state=returning`, which says the email was sent again, and the email is sent again. | M |
| FR-31 | One confirmation email per US-8, sent through a transactional email service on the founders' domain with SPF, DKIM and DMARC. There is no second email. | M |
| FR-32 | The founders receive one internal notice per new sign-up, within five minutes, by email or to a channel of their choice. It lists provider, name, email, company and role when given, the returning flag, UTM values and the time. It is never public. | M |
| FR-33 | The founders can open the sign-up table and export it as CSV. With the default back end (C10.2, option A) the back end's own table view and export meet this. Access is limited to named founder accounts with two-factor sign-in. | M |
| FR-34 | Withdrawal: a link in the confirmation email, and an address on the privacy notice. A withdrawal removes or anonymises the record within the period stated in the privacy notice (0.6, D8) and is logged. The link is handled by the sign-up back end, which answers with its own plain confirmation. If the chosen back end cannot do that, the link is a `mailto:` to the address of D3 with the subject "Withdraw my trial request". No new site route is added for it (0.2). | M |
| FR-35 | All error cases of US-10 are handled on `/trial/error` with the codes of C10.9, the words of A7.6 and the line "Reference: {id}". | M |
| FR-36 | No CAPTCHA. The provider sign-in is the bot gate. Attempts are rate-limited by IP address at the edge without storing the address. | M |
| FR-56 | Ownership of the sign-up back end is the founders' decision (0.6, D2). Default: a managed auth back end with Google and LinkedIn (OpenID Connect) built in, set up by the builder under a founder's account (C10.2, option A). The hand-written service of C10.3 to C10.10 is option B and needs a developer for one to two days. The choice is confirmed before the visual build starts. | M |

### Editing

| ID | Requirement | Pri |
|---|---|---|
| FR-37 | The site builder's own editor is the content system. Visible copy, alt text, captions and video descriptions are named text layers or fields the founders can change. Email wording and legal text are changed by the builder on request. | S |
| FR-38 | Each field or layer name carries its limit from 0.4 where the editor allows a note. | C |
| FR-39 | Each media slot is named by its media ID and documents the file name of 0.3, the size budget of 0.4 and the pre-upload check of 0.3. | S |
| FR-40 | Publishing uses the editor's own preview and version history. | S |
| FR-41 | The banned-terms check of C17.3 runs before every launch and, in a hand-coded build, on every build. It reads the terms from the hard rules in 0.1, scans copy, alt text, captions, file names, meta tags and page source, and carries the allow-list for exemption (a) of 0.1: the two sign-in button labels and the naming of the two sign-in providers in the privacy notice. It also fails on an exclamation mark in content. | M |

### Analytics, SEO and sharing

| ID | Requirement | Pri |
|---|---|---|
| FR-42 | Analytics runs only after "Accept analytics" and implements exactly the events of 0.4 (B9), with no personal data in any event. | M |
| FR-43 | Every page has a title, a description, a canonical URL (host per 0.6, D3), Open Graph tags with `og:site_name` "PIDA", and the social image. The home page has JSON-LD of type `SoftwareApplication`, `applicationCategory` "DesignApplication", and a `featureList` with the six section subjects. There are no ratings and no prices. A sitemap and a robots file are served. | M |
| FR-44 | The social image is `pida-og-1200x630.png`, made from M2 with the wordmark. It passes the check of 0.3. | S |
| FR-45 | Staging and preview URLs are not indexable and are password-protected. The build happens on a staging address until the founders supply the inputs of D3; the site does not launch without them. | M |

---

## B7. Non-functional requirements

### NFR-P Performance budgets (the values of 0.4)

| Item | Budget |
|---|---|
| Largest Contentful Paint | 2.5 s or less at the 75th percentile on a mid-range phone over 4G |
| Interaction to Next Paint | 200 ms or less |
| Cumulative Layout Shift | 0.1 or less |
| First load (before any lazy asset) | 1.5 MB or less transferred |
| JavaScript | 300 KB or less compressed, without the lazily loaded 3D scene |
| 3D scene, if built | 1.5 MB or less, never on first load, never on a touch device or under 1024 px |
| Hero image (M2 as displayed) | 200 KB or less, preloaded, AVIF or WebP with a PNG fallback |
| Any other still as displayed | 300 KB or less; the lightbox rendition may be larger and loads on demand |
| Recordings | Each rendition under 3 MB; encoded at the source width and never above 1600 px, at the source frame rate; H.264 MP4 plus WebM VP9, AV1 optional; requested only when the section is near view |
| Fonts | Barlow Condensed, Barlow and IBM Plex Mono only; subset; `font-display: swap`; self-hosted or served by the platform; about 150 KB or less on first load (Part C wins if it sets another figure) |
| Third-party requests on first load | Only the platform's own assets. The analytics script loads after "Accept analytics". |
| Lab check | Lighthouse performance at least 90 on a hand-coded build and at least 80 on a site builder; Lighthouse accessibility at least 95 on both. Measured on mobile, home page and `/trial`, with the 3D scene off. |

### NFR-A Accessibility (WCAG 2.2 AA)

Conformance target: WCAG 2.2 level AA for every page and the whole sign-up. Points that are easy to miss on this site:

- **Contrast.** 4.5:1 for text and 3:1 for interface components and meaningful graphics, on every band of 0.2. Amber, brass and coral are for dark bands only and fail as text on paper.
- **Keyboard.** Everything is operable by keyboard: the menu, anchors, the lightbox, the video toggle and "open larger", the FAQ, the 3D alternatives, the cookie banner and the sign-up.
- **Focus.** Focus is visible at all times (2.4.11, 2.4.13) in the style of B14.3 and is never hidden under the sticky navigation.
- **Dragging (2.5.7).** The 3D scene and lightbox panning have non-drag alternatives.
- **Target size (2.5.8).** Targets are at least 24 by 24 CSS px.
- **Accessible authentication (3.3.8).** The flow has no cognitive test, no CAPTCHA and no password.
- **Redundant entry (3.3.7).** The name and email returned by the provider are never asked for again.
- **Consistent help (3.2.6).** The contact line sits in the same place, the footer, on every page.
- **Motion.** `prefers-reduced-motion` is honoured (US-12). The recordings loop, so each has a pause control. Nothing flashes.
- **Media.** Each recording has a text description (B15.4). If narration is ever added, captions are required.
- **Colour.** Colour is never the only carrier of meaning. The descriptions say in words what the flow-path, isolation and network colours mean.
- **Zoom and reflow.** Content is usable at 200 % zoom and reflows at 320 CSS px with no loss of content.
- **Structure.** Semantic landmarks, one `h1` per page, headings nested in order, `lang="en"` set.
- **Verification.** An automated scan finds zero serious issues. One manual keyboard pass and one screen-reader pass are done on a desktop reader and a mobile reader. The accessibility statement is published on `/legal`.

### NFR-B Browser and device support

- The last two major versions of the evergreen desktop browsers (the Chromium family, Firefox, Safari), and the current and previous major versions of the default browsers on iOS and Android.
- Retired browsers receive the no-JavaScript experience, which must be complete.
- WebGL or motion features degrade to stills with no error visible to the visitor.
- Tested widths: 360, 390, 480, 768, 1024, 1280, 1440, 1920, plus the reflow check at 320. Tested with a touch screen, a mouse, a keyboard only, and at 200 % zoom.

### NFR-G Privacy and GDPR

- **Data minimisation.** The sign-up table holds the fields of 0.4 and nothing else. No profile picture, no contact list, no location, no IP address or hash.
- **Lawful basis.** Consent for the trial request, recorded as consent version and time. Separately, consent for product updates, recorded as the opt-in flag.
- **Analytics.** Loaded only after "Accept analytics". No advertising tags, no cross-site tracking, no session replay. The choice is remembered on the device and can be changed from the footer link "Cookie settings". The server-sent `signup_success` carries the provider only and is tied to no browser and no person.
- **Processors.** The privacy notice lists every processor by role: site host, sign-up back end, email service, analytics, and the two sign-in providers, which it names (exemption (a) in 0.1). It states where data is held. An EU region is preferred where the platform offers a choice. Data-processing agreements are in place before launch.
- **Retention.** The period is part of the privacy notice text the founders owe (0.6, D8). Proposal for them to confirm: 12 months after the last contact, then deletion; withdrawals processed within 30 days. Application logs hold no IP address and no email and are kept no longer than 30 days.
- **Rights.** One contact address handles access, correction, deletion and withdrawal. Requests are answered within the legal period and logged.
- **Product data.** The site and the sign-up table never receive or hold any customer engineering document. "Your documents stay yours" is a statement about the product and must not be weakened by anything the site does.
- **Audience.** No sale or sharing of data. No data about children. The site is aimed at professionals.

### NFR-S Security

- HTTPS only, with HSTS and modern TLS. The Content-Security-Policy allows only the origins the site uses. The site sets `X-Content-Type-Options`, `Referrer-Policy` and frame-ancestors restrictions where the platform allows it.
- Sign-in protections: state and nonce verified; PKCE where supported; an exact redirect-URI allow-list; the ID token's signature, audience, issuer and expiry validated; tokens discarded after use; nothing personal in any URL.
- A Framer or Webflow project cannot hold the provider secrets (0.4). Secrets live only in the back end's secret store, never in the front end, the editor or a repository. Staging and production have separate credentials.
- The sign-up table is encrypted at rest. Access is limited to named founder accounts with two-factor sign-in.
- The sign-up endpoints have rate limiting, input validation and output encoding on the company and role fields, and CSRF protection on the form post.
- Third-party scripts are limited to those listed in Part C.
- `/.well-known/security.txt` publishes a contact address for reports (the address is part of D3 or D4).

### NFR-V Availability and operations

- **Pages.** Target 99.9 % monthly availability through the platform's CDN.
- **Sign-up back end.** Target 99.5 % monthly. When it is down, the site still renders, and a person who follows a provider link sees `/trial/error` with the matching code of C10.9.
- **Monitoring.** Uptime checks on the home page, `/trial` and the back end's health address. The founders are alerted on failure and on any table or email error.
- **Backups.** The sign-up table is backed up daily (the managed back end's own backup meets this), and one restore is tried before launch.
- **Release.** Content publishes need no deploy. Anything a founder asks for that contradicts Part 0 is a change to Part 0 first, then to the site (0.7).

### NFR-L Localisation readiness

- English only at launch. No copy is baked into an image other than what the product stills themselves show.
- Layout tolerates 30 % longer text. No fixed-width buttons.
- `lang` is set. The URL structure and metadata can take language prefixes and `hreflang` later.
- Numbers and units are written exactly as in the claim register (for example "22 m³/h") and are never auto-formatted.
- Legal pages are versioned per language when a second language is added.

---

## B8. Content requirements and inventory

### B8.1 Content rules specific to this part

The hard rules in 0.1 and the copy limits of 0.4 govern all content and are not repeated here. In addition:

- Section titles are verbatim and in the order of 0.2, each under its eyebrow of 0.2.
- Every number on the site is in the claim register (A5.4) and matches the still beside it. If a re-shot still shows a different number, the still wins and the founders update the register.
- Determinism is a statement about the drawing: the same specification gives the same drawing, byte-identical. It is never widened to "files", "outputs" or "the package".
- The P&ID Generator and the Hydraulic Modeler each have their own wizard (9 steps and 7 steps). No sentence or diagram says that one set of answers produces both.
- The Engineer is connected to the Hydraulic Modeler and to the Workspace, and stands alone. No sentence or diagram connects it to the Generator.
- A problem statement describes manual work and gives no quantity for it: no days, weeks or hours, no count of drawings in a project.
- No sentence says what is "running today", how many tools exist, that nothing needs installing, that no card is needed, or how soon the trial arrives.
- Standards may be named as sources of the Engineer's citations, within hard rule 2 in 0.1. The footer carries the standards line of 0.4.
- The voice is plain, declarative and specific. No superlatives.

### B8.2 File names

The canonical file names are those of 0.3. The files are already in the Drive folder "PIDA website 1 / Website handoff" under those names. The builder does not rename them and gives every derived file a name built from them (B FR-55).

### B8.3 Content inventory

Copy owner "Part A" means the final words are in Part A and the founders have approved them. "Builder" means the builder takes the default from this part or from Part A and the founders approve it. "Founders" means an input of 0.6 is needed.

| # | Block (anchor) | Eyebrow | Copy owner | Media and text | Treatment | State |
|---|---|---|---|---|---|---|
| 0 | Navigation | - | Builder | Interim wordmark "PIDA" in Barlow Condensed 600, letter spacing 0.04 em (0.3) | Sticky, paper band | Logo owed (0.6, D7). The interim wordmark is used until then. |
| 1 | Hero (`#top`) | Part A | Part A | M2 `pida-generated-pid-r101.png` | Mask reveal once over 1.2 s. Opens larger. | File final. |
| 2 | Proof strip (`#proof`) | - | Part A | Text only: four cells, verbatim facts from A5.4 | Navy band. No count-up. | Words in A3.2. |
| 3 | 01 "P&ID Making Reimagined" (`#pid-making`) | `01 / P&ID GENERATOR` | Part A | M1 `pida-generator-review.png`; M2 | Both open larger. The one pinned sequence of the site lives here (desktop only). | M1 is being re-shot after Generate, showing PASS, and will be saved over the same name. Until then the "Not generated" chip is cropped out of the file. |
| 3 | same, claim line | same | Part A | Text only: "a P&ID in 30 seconds" | Claim line (B FR-13) | Wording fixed by hard rule 7 in 0.1. |
| 3 | same, package list | same | Builder from A5.4 | Text only: independent check report and redline drawing; deliverables workbook (line list, valve list, instrument index, HAZOP starter); isolation plan; flow paths as PDF layers; hashed revision chain; DEXPI export | List | From the claim register. HAZOP (hazard and operability study) is expanded at first use. |
| 3 | same, run facts | same | Builder from A5.4 | Text only, verbatim: "Independent check: PASS, 0 error, 0 warning" and "12 lines, 28 valves, 23 instruments, 38 HAZOP deviations (21 with no safeguard on the drawing)" | Fact list | Must match the re-shot M1. |
| 3 | same, wizard and import facts | same | Builder from A5.4 | Text only: the 9-step short-answer wizard; the live schematic preview with the sentence "This is exactly what will be drawn"; import of a specification (xlsx or a generated DXF); the independent check of a drawing made elsewhere, where the checker first proves itself on planted defects and then reports findings with positions and a redline | Fact list | From the claim register. |
| 4 | 02 "Safety and P&ID Connectivity Reimagined" (`#connectivity`) | `02 / P&ID MANAGER` | Part A | M4 `pida-connectivity-graph.mp4` (4.7 MB source); M3 `pida-connectivity-graph.png` as poster and fallback | Recording per 0.4; re-encode per C9.2; text description B15.4. M3 opens larger. | Files final. |
| 4 | same, facts | same | Builder from A5.4 | Text only: every P&ID of a project is a node and every sheet-to-sheet connection an edge; sheets joined to nothing are flagged; off-page flags come out of the generator already naming the sheet at the other end; the still shows 6 sheets and 5 joins | Fact list | From the claim register. |
| 4 | same, 3D scene | same | Builder | Optional Spline scene traced from M3 | B FR-21 | Not a launch blocker. |
| 5 | 03 "Hydraulics Reimagined" (`#hydraulics`) | `03 / HYDRAULIC MODELER` | Part A | M5 `pida-hydraulics-wizard.png`; M6 `pida-hydraulics-model-opened.png`; M7 `pida-hydraulics-results.png` | All open larger. M5: crop the browser address bar. M6: crop to the model canvas, no title bar, menu or logo. M7: crop to the table only. | Files final after the crops (0.6, D9). |
| 5 | same, claim line | same | Part A | Text only: "a hydraulic model in under a minute" | Claim line | Wording fixed. |
| 5 | same, facts | same | Builder from A5.4 | Text only: its own 7-step wizard over a live schematic of a CIP (clean-in-place) circuit with 17 junctions and 16 pipes; every value marked given / sourced / assumed / empty (in the shot 46 values: 33 given, 5 sourced, 8 assumed, 0 empty); roughness from Crane TP-410 and inner diameters from ASME B36.19M; 1.13 and 2.59 m/s at 22 m³/h; a sample-point dead leg of L/d 12.6 against the L/d 2 that ASME BPE recommends | Fact list | From the claim register. Captions of M6 and M7 describe what is shown and do not say what the file opens in (B FR-6). |
| - | Mid-page call to action | - | Part A | Text and the button | After section 03 | - |
| 6 | 04 "Safety Reimagined" (`#safety`) | `04 / WORKSPACE + ENGINEER` | Part A | M9 `pida-safety-chat.png` | Opens larger. The answer must be readable in the still. The question is revealed by a clip. | **Not in the folder yet. Launch blocker for this section (D7).** |
| 6 | same, facts | same | Builder from A5.4 | Text only: the two example questions; answers come from the drawing's own facts (lines, valves with actuator, duty and control loop, instrument nozzles, isolation envelopes, generator warnings) and, when asked, from standards with citations | Fact list | From the claim register. |
| 7 | 05 "Isolation Reimagined" (`#isolation`) | `05 / WORKSPACE` | Part A | M10 `pida-isolation-flowpath.mp4` (2.1 MB source); poster `pida-isolation-flowpath-poster.jpg` | Recording per 0.4; text description B15.4; the title rule turns from amber to coral when the recording reaches isolation | File final. The builder exports the poster frame and notes the time at which isolation begins. |
| 8 | 06 "Engineering Answers Reimagined" (`#answers`) | `06 / ENGINEER` | Part A | M8 `pida-engineer-answer.png` | Opens larger. Reading-room dark band `#17141A`, brass accent. | **Not in the folder yet. Launch blocker for this section (D7).** |
| 8 | same, facts | same | Builder from A5.4 | Text only: 94 documents, 1,772 design rules in 46 topics, 67 vendor datasheets; answers only from documents PIDA holds and cites clause and page; a number comes from a cited equation through a calculator; a number no source contains is flagged "Verify before use"; "not in the documents we hold" instead of a guess; the example of the fire-case PSV (pressure safety valve): 21 % overpressure, relieving at 121 % of MAWP (maximum allowable working pressure) per ASME VIII, with PED's 10 % momentary-surge limit | Fact list | From the claim register. Must match the re-shot M8. |
| 9 | How it fits together (`#how-it-fits`) | - | Part A | One SVG drawn by the builder (B FR-47) | Strokes draw on; static under reduced motion | To draw. |
| 10 | Why believe it (`#trust`) | - | Part A | Text only: four cards (B FR-7). Optional: proof point, scope line (D6). | Paper band | Words in A3.10. |
| 11 | Compatibility band (`#compatibility`) | - | Part A | Text only, the one compatibility statement | Paper-2 band, ink | Words in A3.11. |
| 12 | FAQ (`#faq`) | - | Part A, founders for two answers | Text only (A3.12; B15.6) | Should-have | D1 and D5 owed. |
| 13 | Final call to action (`#trial`) | - | Part A | Text, the button (paper fill, ink text), the contact line | Navy band | Contact address owed (D4). |
| 14 | Footer | - | Builder | B FR-10 | Ink band | Legal entity owed (D3). |
| 15 | `/trial` | - | Part A | A7.2 (B15.1); provider buttons per each provider's brand rules | Paper band | Words in A7.2. |
| 16 | `/trial/welcome` | - | Part A | A7.3 and A7.4 (B15.2) | Paper band | Depends on D1 only for anything beyond the default sentence. |
| 17 | `/trial/error` | - | Part A | Words of A7.6 by code of C10.9; layout B15.3 | Paper band | - |
| 18 | Confirmation email and internal notice | - | Builder; Part A wins | B15.5 | Plain | Sender and legal details owed (D3). |
| 19 | `/privacy`, `/terms`, `/legal` | - | Founders (D8) | The builder supplies templates; a lawyer or the founders approve the text before launch | Layout B14.7 | Not started. |
| 20 | `/404` | - | Part A | A7.9 (B14.7) | Paper band | Words in A7.9. |
| 21 | Social image | - | Builder | `pida-og-1200x630.png` from M2 | 1200 by 630 | To make. |
| 22 | Favicon | - | Builder | The letter P on a cobalt square (0.3) | - | To make. |

If a re-shot still is late: M1 is used with the chip cropped, and section 01 quotes the run report as text beside M2 rather than beside a still that does not show it. M8 and M9 have no fallback (B FR-54).

---

## B9. Analytics requirements

Principles:

- nothing loads and nothing is sent until the visitor chooses "Accept analytics"; "Decline" is as easy as "Accept analytics";
- no personal data in any event: no name, no email, no address, no free text;
- no session replay and no tool that records the screen;
- the event names and properties are exactly those of 0.4. No other custom event is added at launch. Page views are whatever the analytics tool records by itself, with the path, and with UTM source, medium and campaign when present.

| Event | Trigger | Properties |
|---|---|---|
| `cta_click` | Any "Sign up for trial" button | `location`: one of `header`, `hero`, `mid`, `final`, `trial-page`, `404` |
| `section_view` | A block is at least half in view for 1 s, once per page view | `section_id`: the anchor of 0.2 without the hash (`top`, `proof`, `pid-making`, `connectivity`, `hydraulics`, `safety`, `isolation`, `answers`, `how-it-fits`, `trust`, `compatibility`, `trial`). The FAQ sends none. |
| `video_view` | A recording has been visible for 3 s, once per page view | `asset`: the media ID of 0.3 (`M4` or `M10`), unless Part C fixes another value |
| `video_toggle` | The pause / play toggle is used | `asset`, `state` (`paused` or `playing`) |
| `lightbox_open` | A still or a recording is opened larger | `asset` |
| `signup_start` | A provider button on `/trial` is chosen | `provider` (`google` or `linkedin`) |
| `signup_success` | Sent by the server when a new record is stored | `provider` |
| `signup_error` | `/trial/error` is shown | `code` (a code of C10.9) |
| `outbound_click` | A link that leaves the site is followed | `href`, sent without its query string; a `mailto:` link is sent as `mailto` only, never the address |
| `graph3d_interact` | First rotation or control use; only if the 3D scene ships | - |

Notes:

- `location` values map to the places of 0.4: `header` is the navigation button, `hero` the hero button, `mid` the button after section 03, `final` the button in `#trial`, `404` the text link on the 404 page, and `trial-page` a link on `/trial/welcome` or `/trial/error` that leads back to `/trial` (for example "Try again").
- The footer text link is an ordinary link and sends no `cta_click`, because the list of 0.4 has no footer value. Counting it would be a change to 0.4 first.
- A returning sign-up sends no extra event. It is visible in the sign-up table.

Reporting for the founders: a weekly summary of H1 to H8; the funnel page view of `/trial`, then `signup_start`, then `signup_success`, by provider; section reach; recording reach.

---

## B10. Legal pages

Routes are those of 0.2. The text is a founder input (0.6, D8): the builder supplies templates, and a lawyer or the founders approve the text before launch. The builder does not publish unapproved legal text.

| Route | Holds | Priority | Notes |
|---|---|---|---|
| `/privacy` | What is collected at sign-up (the fields of 0.4) and by analytics, why, the lawful basis, processors by role with the two sign-in providers named, where data is held, retention, rights, the contact address, how to withdraw | M | Must exist before the first sign-up. It carries a version label and a date; the consent record stores the version. |
| `/terms` | The trial terms: what the trial is, who may use it, confidentiality of what the person sees, no warranty, how it ends | M | What the trial is depends on D1. Until then the terms describe a request for a trial, not a delivered product. |
| `/legal` | Three parts on one page: company details (legal entity, registered address, registration number, contact; D3); the cookie and storage statement (what is stored on the device: the analytics choice, the short-lived sign-up reference, and the analytics tool's own storage once accepted); the accessibility statement (target WCAG 2.2 AA, known gaps, how to report a problem) | M | The accessibility statement is completed after the manual audit. The standards line of 0.4 also appears here. |
| `/.well-known/security.txt` | A contact address for security reports and an expiry date | S | Plain text file. |
| Email footer | Sender identity, why the person received the email, how to withdraw, company details | M | Part of the confirmation email (B15.5). |

---

## B11. Launch checklist

The order of work is that of 0.7: structure and words first, then media and motion, then sign-up, legal and checks. This checklist closes step 3, together with the QA plan of C18.

**Content and rules**
- [ ] The blocks, anchors, bands and accents match 0.2. The six titles are verbatim, under the eyebrows of 0.2.
- [ ] The banned-terms check of C17.3 passes on the live site, the editor content, alt text, captions, file names, metadata, page source, the email and the legal pages, with only the allow-list of exemption (a).
- [ ] A person has read every page once against the hard rules in 0.1, because a script cannot judge rules 4, 5 and 7.
- [ ] The compatibility statement appears exactly once, in `#compatibility`. A search for its key words finds no echo in the hero, the facts, captions, alt text, the FAQ, the meta description or the email.
- [ ] The two speed claims appear in their exact words and nowhere is there a stopwatch, timer, elapsed time or progress percentage.
- [ ] Every number matches the claim register (A5.4) and the still beside it. The run report reads "0 error, 0 warning". Flow reads "m³/h".
- [ ] No number counts up. There is no compare slider, no Status block, no traction line.
- [ ] "Reimagined" appears in headings only (B FR-52).
- [ ] Determinism is said of the drawing only. The diagram in `#how-it-fits` does not join the Engineer to the Generator and shows two separate wizards.
- [ ] Abbreviations are expanded at first use on each page (0.4).
- [ ] Body paragraphs are 40 to 90 words and facts are at most 16 words.
- [ ] The proof point and the scope line are off unless D6 says otherwise. The contact line is present only if D4 is answered. FAQ question 6 is present only if D5 is answered.
- [ ] Every still and every poster frame has been checked at 200 % per 0.3. M1 shows PASS or has the chip cropped. M5, M6 and M7 are cropped as 0.3 says.
- [ ] M8 and M9 are the re-shot files.
- [ ] File names are those of 0.3 and B FR-55.
- [ ] No "made in" badge and no 3D-tool watermark on the live site.

**Sign-up**
- [ ] D2 is decided and the owner of the back end is named.
- [ ] Both provider apps are in production mode with verified domains, correct redirect URIs, an approved consent screen and the minimum scopes. The LinkedIn button label has been checked against LinkedIn's brand rules.
- [ ] Staging and production use separate credentials.
- [ ] US-5 to US-10 pass on desktop and phone, in a normal and a private window, with third-party cookies blocked.
- [ ] `/trial` works with JavaScript off. No pop-up window opens anywhere in the flow.
- [ ] `/trial/welcome` shows no name and no email. `?state=returning` shows its line and the email is sent again.
- [ ] A LinkedIn account without a verified email is refused with `email_unverified`.
- [ ] The table holds exactly the fields of 0.4, with consent version and time on every record, and no picture, IP address or hash.
- [ ] The confirmation email reaches the major mailbox providers. SPF, DKIM and DMARC pass. It has a withdraw link and the legal footer, and no tracking pixel. Withdrawal has been tested end to end.
- [ ] The internal notice and the CSV export work. Table access is limited to named accounts with two-factor sign-in.

**Quality**
- [ ] The budgets of NFR-P are met on the home page and `/trial`. Lighthouse performance is at least 90 (hand-coded) or at least 80 (site builder), and accessibility at least 95.
- [ ] The automated WCAG 2.2 AA scan is clean. The keyboard pass and the two screen-reader passes are done. The accessibility statement is published.
- [ ] Reduced-motion, no-JavaScript and print passes are done. (Under back-end option A, the default, `/trial/welcome` needs JavaScript to record the sign-up and shows the `noscript` line of C21.2; this is accepted. The full no-JavaScript sign-up path is tested only in option B.)
- [ ] Nothing pins on a touch device or under 1024 px.
- [ ] The width and browser matrix of NFR-B has been tested.
- [ ] The 404, the favicon and the social image have been checked in link previews.
- [ ] The sitemap and robots file are correct, and staging is not indexable.

**Legal and privacy**
- [ ] The inputs of D3 are in: domain, canonical host, sender address, legal entity and registered address. The site does not launch without them.
- [ ] `/privacy`, `/terms` and `/legal` are approved (D8) and published, each with a version label and date.
- [ ] Data-processing agreements are signed with every processor, and the processor list in the notice matches reality.
- [ ] The cookie banner offers "Accept analytics" and "Decline" with equal weight, and no analytics request is made before acceptance (checked in the browser's network panel).
- [ ] The standards line of 0.4 is in the footer.

**Operations**
- [ ] The domain, TLS, HSTS and security headers have been verified.
- [ ] Uptime checks and alerts are live. One restore of the sign-up table has been tried.
- [ ] Every event of B9 has been seen in the analytics tool with the right properties and no personal data.
- [ ] The founders have been shown how to swap a still, change a sentence and run the "Content and rules" group of this checklist.

---

## B12. Risks and mitigations

| # | Risk | Likelihood / impact | Mitigation |
|---|---|---|---|
| R1 | **A hard rule is broken in copy.** A forbidden name or phrase slips into copy, alt text, metadata, a file name, page source or the email. | Medium / high | - The hard rules in 0.1, read first.<br>- The banned-terms check of C17.3 with its allow-list (B FR-41).<br>- One human read against 0.1 before launch.<br>- Canonical file names (0.3). |
| R2 | **A forbidden name is visible inside a still or a frame.** The two hydraulic-solver stills (M6, M7) and any product still with a window title or a button label are the likely places. | High / high | - The 200 % check of 0.3 on every still and poster.<br>- Crop to the canvas and to the table; never blur or black-bar.<br>- The founders have accepted showing M6 and M7 cropped (0.6, D9). If a clean crop is not possible, the still is dropped and the section keeps its other stills. |
| R3 | **The two speed claims cannot be checked on the site.** No recording or measurement backs them at launch. | High / medium | - They are stated plainly, in their exact words, as the founders' claims (hard rule 7 in 0.1).<br>- Nothing on the site pretends to measure them.<br>- The FAQ says how they are measured once the founders give one sentence each (D5).<br>- An unedited recording for each is the first content task after launch (B4.3). |
| R4 | The three re-shot stills arrive late, or still show something 0.3 forbids. | Medium / high | - M1 has an interim crop. M8 and M9 block their sections (B FR-54), so their delivery date is agreed with the founders in week one (D7).<br>- The swap is one upload under the same name (US-15). |
| R5 | A site builder cannot hold provider secrets or a sign-up table. | Certain / high | - Settled by 0.4: a managed auth back end by default (C10.2, option A), a hand-written service as option B.<br>- The founders name the owner (D2) before the visual build starts.<br>- `/trial` is plain links and works without JavaScript. |
| R6 | A provider app review (consent screen, domain verification, branding) delays launch. LinkedIn's developer app may also need a company page to be tied to. | Medium / high | - Start both provider applications in week one, which needs the domain of D3.<br>- Keep scopes minimal to avoid an extended review.<br>- Ask the founders in week one whether a company page exists. |
| R7 | Sign-up with a personal account gives leads that are hard to qualify. | Medium / medium | - Optional company and role on `/trial/welcome`.<br>- H3 tracks it. |
| R8 | "Trial" promises something the founders cannot deliver at once, because the product is local first. | High / high | - D1 is open. Until it is decided the only sentence is "We will email you with the next step."<br>- No copy names a number of days, an install or a hosted login. |
| R9 | 3D and scroll motion damage performance or accessibility. | Medium / medium | - Both are progressive enhancement, off on touch devices, under 1024 px and under reduced motion.<br>- One pinned sequence at most.<br>- The 3D scene is a could-have and ships only if the budgets hold. |
| R10 | The site reads as machine-generated (a dark "hacker" look, stock gradients, generic copy) and loses both audiences. | Medium / high | - One industrial brand on a light paper base with dark bands only for the Workspace and Engineer sections (0.4).<br>- Real stills as the main imagery.<br>- No green on black.<br>- The H9 test with investor-profile readers before launch. |
| R11 | A standards publisher objects to the use of its name. | Low / medium | - Names are used only to identify sources the Engineer cites, within hard rule 2 in 0.1.<br>- No logos.<br>- The standards line of 0.4 in the footer. |
| R12 | Numbers in copy drift from numbers in re-shot stills. | Medium / medium | - The still wins and the founders update the claim register (A5.4).<br>- A checklist item in B11. |
| R13 | Privacy failure: a record without a consent version, tokens kept, a picture or an address stored, or personal data in analytics. | Low / high | - The field list of 0.4 is the whole table.<br>- Token discard verified in test.<br>- Event payloads reviewed in B11.<br>- The guardrails of B2. |
| R14 | Spam or scripted sign-ups. | Low / low | - The provider sign-in is the bot gate.<br>- Rate limiting at the edge without storing the address.<br>- No CAPTCHA. |
| R15 | A founder's quick edit breaks layout or a rule. | Medium / medium | - Copy limits of 0.4.<br>- Frames sized from the file (US-15).<br>- The "Content and rules" group of B11 before each publish.<br>- The editor's version history. |
| R16 | The 0.265 % proof point is published without a decision, or with a forbidden word. | Low / medium | - Off at launch.<br>- Wording fixed in A5.4.<br>- Switched on only by the founders (D6). |
| R17 | Analytics consent lowers the measured share of visits, so early numbers look small. | High / low | - Server-side counts for the sign-up funnel (H2).<br>- Read client-side metrics as a sample. |
| R18 | The rulings ask for a contact route, but the address is not supplied. The only action left is a sign-up an investor will not make. | Medium / high | - Ask for D4 in week one.<br>- The line is one text change when the address arrives. |

---

## B13. Decisions

The first draft of this part carried sixteen open decisions. Part 0 has settled most of them. This table says where each one went, so that nobody re-opens a settled point. The founders' open inputs are those of 0.6 (D1 to D9); the default in 0.6 applies when nobody answers.

| First-draft decision | Now |
|---|---|
| What "Sign up for trial" delivers | Open: **D1**. Default copy: "We will email you with the next step." |
| Whether the 0.265 % proof point is shown | **D6**. Off at launch; trust block only; wording A5.4. |
| Whether the speed claims carry a qualifier | Settled by hard rule 7 in 0.1: stated plainly. How they are measured is an FAQ answer the founders owe (**D5**). |
| Which still leads the hero | Settled (0.2): M2. |
| Traction wording | Settled (0.2): none. |
| 3D graph at launch | Settled (0.4): not a launch blocker; launch with M4 and M3. |
| Video autoplay | Settled (0.4): starts when half visible, muted, looped, with a toggle; poster and click to play under reduced motion. |
| Legal entity, address, contact address | **D3** (entity, address, domain, sender) and **D4** (role-based contact address). |
| Separate path for investors | Settled (0.5): the contact line in the final block and the footer (**D4**). |
| Company and role fields | Settled (0.4): optional form on `/trial/welcome`. |
| Build route | Settled (Part C): Framer or Webflow with Spline and GSAP, or by hand. Sign-up back end: **D2**. |
| Dark, light or mixed | Settled (0.4): light paper base, dark bands for the Workspace and Engineer sections. |
| Domain and sender address | **D3**. |
| The re-shot stills and the logo | **D7**. |
| Legal text | **D8**. |
| Showing the hydraulic-solver stills cropped | **D9**. Default yes. |

Three inputs the first draft raised have no id in 0.6. They are not invented here. The builder raises them with the founders as additions to 0.6; the defaults keep the build moving.

| Input | Proposed default | Closest decision in 0.6 |
|---|---|---|
| How long sign-up records are kept | 12 months after the last contact, then deletion; withdrawals within 30 days | Part of the privacy notice text, D8 |
| Where sign-up data is held | An EU region where the back end offers a choice, stated in the privacy notice | D2 and D8 |
| Who may publish after launch | Either founder publishes copy edits after the "Content and rules" group of B11. New stills, new claims and legal text need both founders. | None |

The builder also chooses an analytics tool, an email service and a host. None is named on the site. Each must meet NFR-G and NFR-S, and each appears by role in the privacy notice.

---

## B14. Components and states a lone builder would otherwise have to guess

These are requirements with default values built only from the tokens, type and grid of 0.4. If Part A or Part C gives a different value for the same thing, that part wins.

### B14.1 Buttons

- **Primary, on light bands:** cobalt `#1B4B9C` fill, white text. Hover: cobalt-hover `#163D80`. **On dark bands:** paper `#F3F0E8` fill, ink `#18202B` text. Hover: paper-2 `#FBFAF6`.
- **Secondary (for example "Back to the home page", "Skip", "Decline"):** no fill, a 1 px border and text in ink on light bands, in on-dark `#EEF3FA` on dark bands. Hover: border and text in cobalt on light bands, in cobalt-on-dark `#8FB0FF` on dark bands.
- Both: Barlow 600, 16 to 17 px, minimum height 48 px, horizontal padding 24 px, radius 2 px, no shadow, no fixed width. The label never wraps to three lines at 360 px.
- **Pressed:** the hover colour, no movement. **Disabled** (only the form's "Send" while it submits): rule `#C9C3B4` fill, ink-2 `#4A5565` text, `aria-disabled="true"`, no hover, cursor default. Nothing else on the site is ever disabled. The provider buttons are never disabled, because consent has no checkbox.
- **Provider buttons** follow each provider's own brand rules for colour, mark and label, at the same height and width as each other.

### B14.2 Text links

- On light bands: cobalt, underlined (1 px, offset 3 px). Hover: cobalt-hover. Visited links keep the same colour.
- On dark bands: cobalt-on-dark, underlined. In the amber and brass sections a link inside body copy is on-dark with an underline, so the accent stays an accent.
- In the footer (ink band): on-dark-2 `#B8C7DB`, underlined on hover and on focus.
- An underline is never the only thing removed to mark a state; colour or weight changes with it.

### B14.3 Focus

- Every interactive element shows a 2 px solid outline with a 2 px offset on keyboard focus (`:focus-visible`): cobalt on light bands, on-dark on dark bands. Amber, brass and coral are not used for focus, because coral means isolation only.
- Focus is never removed without a replacement. The sticky navigation never covers the focused element (`scroll-margin-top` on anchors, `scroll-padding-top` on the page).
- A "Skip to content" link is the first focusable element on every page.

### B14.4 Section template by width

- **1024 px and wider:** 12 columns, container 1240 px, gutter 24 px. Text takes 5 columns and media 7, alternating sides by section. The body measure is at most 66 characters. Facts sit under the body in one column.
- **768 to 1023 px (tablet):** one column. Eyebrow, title and body first, at a measure of at most 66 characters; then the media at full container width; then the facts in two columns. Nothing pins. The navigation uses the mobile menu.
- **Under 768 px:** one column throughout, facts in one column, stills at full width with the "open larger" affordance. Proof strip cells stack two by two at 480 px and above, and one per row below 480 px. Trust cards: four across at 1280 px and wider, two by two from 768 px, one per row below.
- **Hero:** under 1024 px the image M2 sits below the text with no overlap. Any overlap of text and image exists only at 1024 px and wider, and only as Part A draws it.
- Side margin `clamp(20px, 5vw, 64px)` and section padding `clamp(72px, 10vw, 160px)` at every width.

### B14.5 Lightbox

- A full-viewport dialog (`role="dialog"`, `aria-modal="true"`, labelled by the caption). Backdrop navy `#0B1524` at 96 % opacity (A6.13). The image is fitted inside the viewport with a 24 px margin, keeps its own aspect ratio, has a 1 px rule-dark border and no shadow.
- Controls: close only (top right, at least 44 px, labelled "Close image"). There is no zoom control, no previous / next and no counter; a second click toggles between fit and 100 % (A6.13). The caption sits bottom left in IBM Plex Mono, on-dark.
- Opens with a 0.2 s fade; instant under reduced motion. Behaviour per US-4. A recording opened larger shows the browser's native controls and starts paused under reduced motion.
- Without JavaScript the still is an ordinary link to its largest rendition.

### B14.6 Mobile menu

- The menu is specified in A6.14.
- Without JavaScript the in-page links are listed at the top of the footer instead, so every block stays reachable.

### B14.7 The 404 page, the sign-up pages and the legal pages

- **`/404`:** paper band, navigation and footer as everywhere. Words and controls per A7.9 (the text link "Sign up for trial" sends `cta_click` with `404`); layout per A6.16. The server answers with status 404.
- **`/trial`, `/trial/welcome`, `/trial/error`:** paper band, layout per A6.16, the full footer. The text is in A7 (B15).
- **Legal pages:** paper band, one text column with a measure of at most 66 characters, H1 in the H2 size of 0.4, a line with the version label and the date under it, H2 sub-headings in Barlow 600, a linked table of contents when the page has more than five headings. `/legal` has three H2 parts with the anchors `#company`, `#cookies` and `#accessibility`. No media, no motion.

### B14.8 FAQ

- A list of questions under one H2, each question an H3 inside a native `details` / `summary` element, so it works without JavaScript and by keyboard. All answers are in the HTML from the start. When printed, all answers are open.
- Paper band, one column of at most 66 characters, a 1 px rule between items.

### B14.9 Cookie banner

- A bar fixed to the bottom of the viewport on paper-2 with a 1 px rule border on top, not covering the navigation and not blocking the page. One sentence (default: "We would like to count visits and clicks to improve this site. Nothing is counted unless you accept.") with a link to `/legal#cookies`.
- Two buttons of the same size and style, side by side: "Accept analytics" and "Decline". Neither is pre-selected. The builder confirms the sentence is true for the analytics tool chosen.
- It is reachable by keyboard right after the "Skip to content" link, and it does not trap focus. The choice is remembered on the device and the footer link "Cookie settings" reopens the bar.

### B14.10 Asset-missing placeholder

- A frame with the measured aspect ratio of the missing file, so the layout does not move. Fill paper-2 on light bands and navy-2 `#14233A` on dark bands, a 1 px border in rule or rule-dark, no icon of a broken image.
- Centred in IBM Plex Mono, small, in ink-2 or on-dark-2: "Image unavailable" for a still, "Recording unavailable" for a video. The caption and the text description stay in place.

### B14.11 Print styles

- Readers print this page, so `@media print` is part of the build: white background and ink text on every band, including the dark ones; the navigation, the cookie banner, the menu, the video controls and the lightbox hidden.
- Each recording prints as its poster with its text description. Stills print at the column width and never split across pages (`break-inside: avoid`), and each of the six sections starts without an orphaned title (`break-after: avoid` on headings).
- The FAQ prints with every answer open. Link addresses are printed after link text for the contact line and the legal links only.
- A last line prints the site address and the standards line of 0.4.

---

## B15. Interface copy the builder would otherwise have to write alone

Part A holds the words of the site. Where Part A has final words for a place (B15.1, B15.2, B15.3, B15.5, B15.6), this section points to them and gives no second text; it keeps only what Part A does not cover, so that no page ships with a blank. All of it follows the hard rules in 0.1 and uses no abbreviation that needs expanding.

### B15.1 `/trial`

- The words of this page are final in A7.2: the eyebrow, the H1, the line saying what happens next, the two buttons "Continue with Google" and "Continue with LinkedIn" (or LinkedIn's stock wording, 0.4), the consent line with its two links, the data line, the mono line, the foot link and the title tag. This part gives no second text for them.
- Meta description (A7.2 gives none): "Sign up for a PIDA trial with an account you already have." The page is indexable. Outside the two button labels, nothing on this page and nothing in its metadata names a sign-in provider (exemption (a) in 0.1; A7.6).
- The contact line, when D4 is answered, is in the footer (B FR-48).
- Nothing on this page says what the trial contains, how long it lasts or when it starts (0.6, D1).

### B15.2 `/trial/welcome`

- The words of this page are final in A7.3 (new sign-up) and A7.4 (`?state=returning`): the title tag, the eyebrow, the H1, the text, the optional form with its heading, labels, unticked checkbox, the secondary button "Send", the skip link, and the messages after a send, after a failed send and for a field that is too long. This part gives no second text for them. The page is not indexable.
- What Part A does not cover:
  - "Saved. Thank you." replaces the form and is announced to screen readers.
  - If the 30-minute reference of B FR-29 has expired, a retry cannot succeed, so in place of the form the page says: "We could not save this. Your sign-up is still recorded."
  - The sign-up itself is never undone by a failed save.
- The page never shows a name or an email address, in any state.

### B15.3 `/trial/error`

- The words of this page are final in A7.6: the title tag, and for the code in `?code=` the H1, the text and the buttons ("Try again" is a secondary button to `/trial`). An unknown or missing code uses the last row of A7.6. The words never name a provider. The page is not indexable.
- Beneath the text, small, in IBM Plex Mono: "Reference: {id}"
- "Try again" sends `cta_click` with `trial-page`.
- When D4 is answered: "If this keeps happening, write to {role address} and quote the reference."

### B15.4 Text descriptions of the two recordings

Each sits beside or beneath its recording as visible text, not only as an attribute.

- **M4 (`#connectivity`):** "Screen recording, no sound. The P&ID Manager shows a project as a rotating 3D graph. Each of the six sheets is a node and each of the five sheet-to-sheet connections is an edge. The sheets are grouped as reactor, condensers and receivers, utility supply, and other. A sheet joined to nothing is flagged. Off-page flags come out of the generator already naming the sheet at the other end."
- **M10 (`#isolation`):** "Screen recording, no sound. In the Workspace a line, valve, nozzle or vessel is picked and its flow path lights up on the real drawing. Lines are coloured by network: {colour} for process, {colour} for secondary process and {colour} for utility. The recording then shows which valves to close to isolate a vessel, in two scenarios: manual block valves only, and actuated valves locked out. It also says when a line leaves the sheet first."
  - The builder watches M10, fills in the three colour names from the recording and does not guess them. If a colour cannot be named with confidence, the founders are asked.
- Alt text of each poster: one sentence taken from the first two sentences of its description.
- Video error line: "This recording could not be played."
- Control labels: "Pause recording", "Play recording", "Open larger".

### B15.5 The confirmation email and the internal notice

The words of both messages are final in A7.8: sender name, subject, preheader, body, sign-off and footer of the confirmation email, and the subject and body of the internal notice. This part gives no second text for them. The confirmation email does not name the sign-in provider (C10.8).

What Part A does not cover:

- Format: plain text with a simple HTML twin, no images, no tracking pixel and no tracked links.
- From: the sender address of D3. Reply-to: an address a person reads.
- A returning sign-up receives the same email again. There is no second, different email.
- The internal notice goes only to the founders' own address.

### B15.6 The FAQ (0.5)

The six questions, their order, the H2 "Questions" and the final answers are in A3.12. This part gives no second text for them. What this part requires of them:

- The word "Reimagined" is not used in the FAQ (B FR-52).
- Answers come from the claim register (A5.4), except the two the founders owe: question 1 (0.6, D1; the default answer of A3.12 stands until then) and question 6 (0.6, D5; if it is not supplied, the question is left out).
- No answer mentions what the files open in; that is said once, in the compatibility band (B FR-6).

---

# Part C - Technical specification

This part is for the person who builds the PIDA marketing site. It covers three build routes: Framer, Webflow, and a hand-coded build (Astro or Next.js). All three use GSAP for scroll motion. The 3D graph in Spline is optional and is not a launch blocker (0.4).

How this part relates to the others:

- Part 0 wins over this part. Every name, anchor, asset ID (M1 to M10), colour value, type size, grid value, motion rule, video rule, budget, event name, route and label below is copied from Part 0. If a value here differs from Part 0, Part 0 is right and this part has a mistake.
- The words on the page come from Part A. Where this part prints a string (C21), it is a fallback for a place Part A may not cover. If Part A carries a string for the same place, use Part A's.
- Part B says what the site must do. This part says how. Build values in this part win over Part B (0, order of precedence).
- The hard rules are in 0.1 and are not repeated here. They apply to everything that ships in public: copy, alt text, file names, meta tags, JSON-LD, comments in the page source, CSS and JavaScript, 3D object names, video metadata, caption files, email text and error messages.

Conventions:

- `PIDA_DOMAIN` stands for the production domain. The founders supply it (0.6, D3).
- "The claim register" is A5.4. Every number that appears on the site is in it.
- This part names build tools (site builders, encoders, test tools, a managed auth back end). That is allowed in the handoff by exemption (b) of 0.1. None of these names ever appears on the site.
- The products and makers that 0.1 bans are not named anywhere in this part. Where one is meant, this part says "the hydraulic solver" or "the CAD software".

How this part maps to the order of work in 0.7:

| Phase of 0.7 | Sections of this part |
|---|---|
| 1. Structure and words | C1 to C6, C13, C21 |
| 2. Media and motion | C7, C8 (optional), C9 |
| 3. Sign-up, legal, checks | C10 to C12, C14 to C20 |

---

## C1. Build routes and recommendation

### C1.1 Architecture per route

**Route A - Framer**

- Pages and layout are built on the Framer canvas. Shared components are Framer components with variants.
- GSAP and ScrollTrigger are loaded once from site-level custom code (end of body). Timelines live in one script, `pida-motion.js`. It is hosted as a static file on the assets host (C17.1) or pasted inline.
- Elements are targeted by `data-pida` attributes, never by Framer's generated class names. Those change on publish.
- `MediaFrame`, `Lightbox` and `GraphScene` are Framer Code Components (React). Framer's native video element does not give enough control over sources, posters and lazy loading.
- Spline, if it ships, runs through a code component wrapping `@splinetool/react-spline`. It is lazy-mounted (C8).
- The two sign-up buttons on `/trial` are plain links to the auth back end (C10). No secret ever sits in Framer.
- Hosting is Framer hosting. Response headers cannot be set freely there (verify at build time). If the full header set in C16 is required, place a CDN proxy in front.
- A paid site plan that removes the "made in" badge is required (the hard rules in 0.1, rule 9). This is a must, not an option.

**Route B - Webflow**

- Pages are built in the Designer. Shared components are Webflow Components with properties.
- GSAP is available natively in Webflow. Use the built-in GSAP interactions for simple reveals. Use one custom script, `pida-motion.js`, for the pinned timeline so it is versioned in git.
- `MediaFrame` is an Embed element containing the `<video>` or `<picture>` markup from C9, driven by component properties through attribute bindings.
- Spline, if it ships, runs through the `<spline-viewer>` web component or the runtime in an Embed. Self-host the viewer script (C16).
- The two sign-up buttons on `/trial` are plain links to the auth back end (C10).
- Hosting is Webflow hosting. It has the same limits on response headers as Framer, and the same CDN-proxy remedy.
- A paid site plan that removes the "made in" badge is required (the hard rules in 0.1, rule 9).

**Route C - Hand-coded (Astro recommended, Next.js acceptable)**

- Astro has a static output and ships no JavaScript by default. Interactivity lives in islands (`MediaFrame` controls, `Lightbox`, `GraphScene`). This makes the budgets in C14 easiest to meet.
- For Next.js, use the App Router with static generation for all pages. Choose Next.js only if the team already runs it.
- GSAP is imported as an ES module and code-split per section. Spline, if it ships, is loaded by dynamic import on intersection.
- Host on any static or edge host. Response headers are fully controllable.
- Founder-editable copy needs a developer or a headless content system on this route. That is accepted: editable copy is a should-have, not a launch blocker (0.4, Editing).

### C1.2 Comparison

| Criterion | Framer | Webflow | Hand-coded (Astro / Next.js) |
|---|---|---|---|
| Time to first publish | Fastest | Fast | Slowest |
| Who can edit copy later | Anyone in the canvas | Anyone in the Editor | Developer, or a headless content system if added |
| GSAP ScrollTrigger pin and scrub | Custom code, works, needs care with generated DOM | Native support plus custom code | Full control |
| Video control (multi-source, poster, lazy) | Code component needed | Embed needed | Native markup |
| Spline (optional) | Code component | Embed or web component | Dynamic import |
| Platform runtime weight | Significant and outside our control | Moderate | None |
| Meeting the C14 budgets | Hardest | Achievable | Easiest |
| Response headers and strict CSP | Proxy needed | Proxy needed | Native |
| Holding sign-in secrets | Not possible | Not possible | Possible (functions in the same repo) |
| CI on built HTML | Crawl the staging URL | Crawl the staging URL | Run on `dist/` |
| Badge removal (0.1, rule 9) | Paid plan, required | Paid plan, required | Not applicable |
| Lock-in | High | Medium (export possible, CMS not portable) | None |
| Version control | Platform history only | Platform history only | Git |

### C1.3 Recommendation

1. **Sign-up is the same in all three routes.** The site only links to an auth back end on `auth.PIDA_DOMAIN`. The default is a managed auth back end (C10.2, option A), because a Framer or Webflow builder cannot hold the provider secrets (0.4, Who builds it). This keeps the sign-up logic in one place, so the choice of site builder is reversible.
2. **For launch, build in the tool the builder is fastest in.** If there is no preference, choose Webflow. Reasons:
   - It has native GSAP support.
   - Its DOM is more predictable for ScrollTrigger.
   - Embeds give direct control of the video markup.
   - Its platform runtime is lighter than Framer's.
3. **Keep the hand-coded Astro build as the durable version.** Switch once the copy has settled, or if the C14 budgets cannot be met on the builder platform. The design tokens (C4), the motion script (C7), the media set (C9) and the auth back end (C10) carry over unchanged.

---

## C2. Page inventory

These are the pages of 0.2. Nothing else exists at launch.

| Path | Purpose | Indexed | Notes |
|---|---|---|---|
| `/` | The whole pitch: the blocks of 0.2 in order | Yes | Single long page. Every block has the anchor id of 0.2. |
| `/trial` | Sign-up page with the two provider buttons | Yes | A page, not a modal. Works without JavaScript: the buttons are plain links. Target of every call to action. |
| `/trial/welcome` | Shown after a successful sign-up | No | Generic and static. Never shows the person's name or email. Holds one optional form. Reads `?state=` from a fixed list (C6.4). |
| `/trial/error` | Shown after a failed or cancelled sign-in | No | Reads `?code=` from the fixed list in C10.9 and `?ref=` in a fixed format. |
| `/privacy` | Privacy notice | Yes | Required by both identity providers for app verification. Text: 0.6, D8. |
| `/terms` | Trial terms | Yes | Required for app verification. Text: 0.6, D8. |
| `/legal` | Company details, cookie and storage statement, accessibility statement | Yes | Three parts with the anchors `#company`, `#cookies`, `#accessibility`. Text: 0.6, D3 and D8. |
| `/404` | Not found | No | Secondary button back to `/`, text link to `/trial` (A7.9). |
| `/.well-known/security.txt` | Security contact | n/a | Plain text file (C16.5). |

Blocks and anchors on `/`, in order (copied from 0.2):

| # | Block | Anchor id | Theme | Accent | Media |
|---|---|---|---|---|---|
| - | Navigation | - | paper | cobalt | wordmark |
| 1 | Hero | `#top` | paper | cobalt | M2 |
| 2 | Proof strip, 4 cells | `#proof` | navy | on-dark | none |
| 3 | 01 P&ID Making Reimagined | `#pid-making` | paper | cobalt | M1, M2 |
| 4 | 02 Safety and P&ID Connectivity Reimagined | `#connectivity` | navy | cobalt-on-dark | M4 video, M3 poster and fallback |
| 5 | 03 Hydraulics Reimagined | `#hydraulics` | paper-cool | petrol | M5, M6, M7 |
| - | Mid-page call to action | - | inherits paper-cool | cobalt | none |
| 6 | 04 Safety Reimagined | `#safety` | navy | amber | M9 |
| 7 | 05 Isolation Reimagined | `#isolation` | navy | amber; coral for isolation only | M10 video |
| 8 | 06 Engineering Answers Reimagined | `#answers` | reading-room | brass | M8 |
| 9 | How it fits together | `#how-it-fits` | paper | cobalt | one SVG diagram |
| 10 | Why believe it, four cards | `#trust` | paper | cobalt | none |
| 11 | Compatibility band | `#compatibility` | paper-2 | ink | none |
| - | FAQ (should-have, 0.5) | `faq` (for deep links only; not in the navigation, no `section_view`) | paper | cobalt | none |
| 12 | Final call to action | `#trial` | navy | paper button | none |
| - | Footer | - | ink | on-dark-2 | wordmark |

There is no Status block and no traction line (0.2).

Eyebrows above the six section titles, verbatim from 0.2: `01 / P&ID GENERATOR`, `02 / P&ID MANAGER`, `03 / HYDRAULIC MODELER`, `04 / WORKSPACE + ENGINEER`, `05 / WORKSPACE`, `06 / ENGINEER`.

Where the call to action appears (0.4). The label is "Sign up for trial" everywhere and every instance goes to `/trial`:

| Place | Form | `cta_click` location |
|---|---|---|
| Navigation | Primary button | `header` |
| Hero | Primary button | `hero` |
| After section 03 | Primary button in `MidCta` | `mid` |
| Final block | Paper button on navy | `final` |
| Footer | Text link only | none (the footer is not in the canonical enum of 0.4; the `/trial` page view records it) |
| `/trial/error`, `/trial/welcome` | Link back to `/trial` | `trial-page` |
| `/404` | Text link | `404` |

No product section carries its own button. The `#trial` anchor is the final block on `/`; the path `/trial` is the sign-up page. They are different things with similar names, so link to the path in every call to action.

---

## C3. Component inventory

Names are the same in all three routes. In Framer and Webflow, "props" means component properties or variants. In code it means typed props.

### C3.1 `MediaFrame`

Shows a still or a video inside a consistent frame. It is the most used component.

| Prop | Type | Default | Notes |
|---|---|---|---|
| `kind` | `"image"` or `"video"` | `"image"` | |
| `src` | string (base name, no extension) | required | The canonical base name of 0.3, for example `pida-connectivity-graph`. The component derives all renditions from the base name (C9). |
| `assetId` | string | required | The media ID of 0.3 (`M1` to `M10`). Written to `data-asset` and sent as the `asset` property of the analytics events (C12.3). M3 and M4 share a base name, so the base name cannot serve here. |
| `alt` | string | required for images | From Part A. Describes the evidence on the screen, not "screenshot". |
| `poster` | string | `{src}-poster` | Video only. Section 02 passes the M3 base name instead if M3 and M4 have the same aspect (C9.3). |
| `width`, `height` | integers | required | The measured pixel size of the cropped master (0.3: measure, never assume an aspect). Written to the `width` and `height` attributes and used for CSS `aspect-ratio`, so nothing shifts. |
| `theme` | `"paper"` or `"dark"` | inherits from section | Frame border and caption colour. |
| `caption` | string | none | Short and factual, from Part A. Set in `caption` style (C5), ink-2 on light, on-dark-2 on dark. |
| `priority` | boolean | false | True only for the hero image. Gives eager loading and `fetchpriority="high"`. |
| `autoplay` | boolean | true | Video only. Ignored under reduced motion (C7.4). |
| `controls` | `"toggle"` or `"full"` | `"toggle"` | `toggle` shows the pause / play button and the "open larger" button. `full` is used inside the lightbox. |
| `description` | string | required for video | The text description of the recording (C21.4). Rendered as visible text under the frame or linked with `aria-describedby`. |
| `captionsSrc` | string | none | Optional WebVTT file of on-screen steps (C9.4). |
| `sizes` | string | see C9.6 | Passed to `<img sizes>`. |

Frame style (0.4, Frames): 2 px radius, 1 px border in `rule` on light bands and `rule-dark` on dark bands. On paper, paper-2 and paper-cool the frame may carry the shadow `0 12px 32px -16px rgba(24,32,43,0.25)`. Nothing else on the site has a shadow. Frames on dark bands have no shadow.

Every still opens larger in the lightbox (0.4). The whole frame is a button with the accessible name "Open image larger" (A7.9), described by its caption through `aria-describedby`. Every video has a separate "Open larger" button with the accessible name "Open recording larger".

### C3.2 `SectionReimagined`

The repeating shell for the six product sections.

| Prop | Type | Notes |
|---|---|---|
| `id` | string | Anchor id from C2. |
| `eyebrow` | string | Verbatim from 0.2, for example `02 / P&ID MANAGER`. Set in `mono-label`. |
| `title` | string | The section name, verbatim. It is the `h2`. |
| `taskToday` | string | The `THE TASK TODAY` note, in the note style of A6.5. |
| `headline` | string | The H3 of A3.x under the title, in `h3` style (C5). In sections 01 and 03 it carries the speed claim of 0.1 rule 7, in its exact words, stated plainly as the founders' claim. No stopwatch, timer, progress bar or other device that pretends to measure it. |
| `subHeadline` | string | The sub-headline of A3.x, in `sub-headline` style (C5). |
| `body` | rich text | 40 to 90 words (0.4, Copy limits). |
| `facts` | string[] | The fact rows of Part A, each at most 16 words, in `fact` style (C5; C3.4). |
| `extras` | slot | The per-section extras of Part A: step rail and package list in 01, value legend and the 46 squares in 03, network legend in 05, example block and behaviour cards in 06. |
| `media` | `MediaFrame[]` | One to three items. |
| `layout` | `"media-right"`, `"media-left"`, `"media-full"`, `"media-trio"`, `"pinned-sequence"` | `pinned-sequence` is used by section 01 only (C7). `media-trio` is section 03 (C6.2). |
| `theme` | `"paper"`, `"paper-cool"`, `"navy"`, `"reading-room"` | See C4.3. |
| `accent` | token name | One accent per section (C4.3). |

### C3.3 `ProofStrip`

Block 2. Four cells on a navy band, each a fact copied verbatim from the claim register (A5.4). Part A chooses the four.

| Prop | Type | Notes |
|---|---|---|
| `cells` | `{value: string, label: string}[]`, exactly 4 | `value` is a proof figure of A6.4: Barlow Condensed 600, tabular numerals, `clamp(28px, 3.2vw, 44px)`, line height 1.05, on-dark. It may wrap to two lines and is never shrunk per cell. `label` is in `mono-label` style, on-dark-2. |

- Layout: four columns from 1024 px, two by two from 480 px, one column below 480 px. Cells are divided by 1 px `rule-dark` lines.
- Numbers are copied, never paraphrased. The check line of the real run is written exactly as the product printed it: `Independent check: PASS, 0 error, 0 warning`. Do not correct its grammar.
- Numbers never count up (0.4). The cells fade and rise with the shared reveal and nothing else.
- Each cell is a list item in a `ul`, so a screen reader hears "list, 4 items".

### C3.4 `ProofChip`

ProofChip is only the visual style of a fact row of Part A; it adds no content.

| Prop | Type | Notes |
|---|---|---|
| `text` | string | Verbatim from the claim register. For example `12 lines, 28 valves, 23 instruments, 38 HAZOP deviations (21 with no safeguard on the drawing)`. |
| `kind` | `"result"`, `"count"`, `"source"` | Controls the border style only. There is no icon font. |

- Style: `fact` (C5), 1 px border in the section accent on dark bands and in ink-2 on light bands, 2 px radius, padding 8 px by 12 px. It wraps; it is never truncated.
- A chip never contains a number that is not in the claim register.
- The proof point 0.265 % is off at launch (0.4; 0.6, D6). It is not a chip. If the founders switch it on, it is one line in the trust block, in the exact wording of A5.4, behind the build flag `SHOW_AGREEMENT_FIGURE`. When the flag is off the element is absent from the DOM, not hidden.

### C3.5 `Lightbox`

| Prop | Type | Notes |
|---|---|---|
| `item` | `MediaFrame` | The one still or recording that was opened. There is no gallery (A6.13). |
| `onClose` | callback | |

Behaviour:

- Native `<dialog>` opened with `showModal()`. Focus moves into the dialog, is trapped there, and returns to the opener on close. Escape closes. The page behind is inert and its scroll is locked without a layout shift (`scrollbar-gutter: stable`).
- Images load their largest rendition only when opened.
- Videos get full native controls and the captions track if one exists.
- Pinch zoom is allowed on touch.
- The lightbox script loads on first open, not with the page.

Design:

- Backdrop `rgba(11, 21, 36, 0.96)` (navy at 96 %, A6.13). No blur. A click on the backdrop closes the lightbox.
- The media is fitted with `object-fit: contain` inside the viewport, with a 24 px margin (8 px below 768 px). It keeps the 2 px radius and has no border.
- Top right: a 44 x 44 px close button with the accessible name "Close image". Bottom left: the caption in mono, on-dark. There is no counter, no next or previous and no zoom slider (A6.13).
- The image is never upscaled beyond its pixel size. If it is larger than the viewport, click or Enter on it toggles between fit and 100 % of its pixels. At 100 % the image pans by drag, by scroll or by the arrow keys inside the dialog. The cursor shows zoom-in or zoom-out.
- Open and close are a 200 ms opacity fade (A6.13). Under reduced motion there is no fade.
- Analytics: `lightbox_open {asset}` once per open, with the media ID of 0.3 (`M1` to `M10`).

### C3.6 `TrialPanel`

The content of `/trial` (0.4, Sign-up). There is no sign-up modal and no pop-up window anywhere on the site.

| Prop | Type | Notes |
|---|---|---|
| `googleHref` | string | Option A: the managed back end's authorise URL for Google. Option B: `https://auth.PIDA_DOMAIN/login/google`. |
| `linkedinHref` | string | The same for LinkedIn. |
| `consentLine` | rich text | Exactly: "By continuing you agree to the Trial terms and the Privacy notice." "Trial terms" links to `/terms`, "Privacy notice" links to `/privacy`. |
| `state` | string, optional | The only known value is `withdrawn`. It swaps the panel for the view of A7.5 (C6.4). |

Content, top to bottom:

- `h1` "Sign up for trial".
- The eyebrow, text, data line, mono line and foot link of A7.2. Until decision D1 of 0.6 is made, the only statement about what happens next is "We will email you with the next step."
- Exactly two buttons: "Continue with Google" and "Continue with LinkedIn", in that order, stacked, 12 px apart, each at most 320 px wide and at least 48 px high. They are `<a>` elements marked `data-pida="provider"`, each with a `data-provider` attribute (`google` or `linkedin`), so they work without JavaScript. They follow each provider's brand rules for logo, colours and padding; use each provider's official assets. Before launch, check that LinkedIn's rules permit the label "Continue with LinkedIn". If they do not, use LinkedIn's stock wording (0.4, Buttons).
- The consent line, in `small`. There is no checkbox, no email field and no password field.
- The contact line of 0.5, if D4 has been supplied.

With JavaScript on, a small script copies `utm_source`, `utm_medium` and `utm_campaign` from the page URL onto the two hrefs (option B) or onto their `redirect_to` address (option A, C10.2), and sends `signup_start {provider}` on click. It reads the provider value from `data-provider`, so no provider name is written in the script itself (C17.3). Nothing is written to browser storage.

### C3.7 `Diagram`

Inline SVG drawn with the brand tokens. Never a bitmap.

| Prop | Type | Notes |
|---|---|---|
| `name` | `"how-it-fits"` or `"value-fill"` | See below. |
| `theme` | `"paper"` or `"dark"` | Uses `currentColor` and CSS variables so one SVG serves both. |
| `title`, `desc` | string | Rendered as SVG `<title>` and `<desc>` and referenced by `aria-labelledby`. The `desc` text comes from Part A's alt text for the diagram. |
| `animate` | boolean | Strokes draw on once (C7). Off under reduced motion. |

**`how-it-fits`** (block 9, the one SVG diagram of 0.2). Part A supplies the labels. The boxes and connectors are limited to what is true of the product:

| From | To | Connector label (Part A may shorten) |
|---|---|---|
| Short-answer wizard (9 steps) | P&ID Generator | specification |
| P&ID Generator | The drawing (DXF) and its package | same specification in, same drawing out |
| P&ID Generator | P&ID Manager | every sheet is a node; off-page flags name the sheet at the other end |
| The drawing | Workspace (flow path, isolation) | the real drawing |
| Its own short-answer wizard (7 steps) | Hydraulic Modeler | a separate specification |
| Hydraulic Modeler | Native model file | |
| Engineer | Hydraulic Modeler | fills usual values with citations; reviews the model |
| Engineer | Workspace | answers from the drawing's own facts |
| Engineer | (stands alone) | answers from held documents, cited to clause and page |

- There is no connector between the Engineer and the P&ID Generator. There is no connector between the P&ID Generator's wizard and the Hydraulic Modeler: the two wizards are separate.
- The word "byte-identical" applies to the drawing, not to "files".
- Lines are 1.5 px strokes in `currentColor`, boxes have the 2 px radius and a 1 px stroke, labels are live SVG `<text>` in IBM Plex Mono 12 px (never outlined paths, so they can be selected and read). Arrowheads are simple open chevrons. The accent is cobalt for the Generator path, petrol for the hydraulics path, and ink for the Engineer. Brass, amber and coral are not used here because this block is on paper.
- Under 1024 px the diagram switches to a vertical variant (A3.9) of the same boxes in the same order, drawn as a second SVG. Do not scale the desktop drawing down until the labels are unreadable.
- P&ID symbols, if Part A asks for any in this diagram, are drawn by the builder as plain generic outlines (valve as two triangles, vessel as a capsule, pump as a circle with a tangent). They are decoration and name no symbol standard.

**`value-fill`** (section 03). Forty-six small squares in a grid, one per value of the model in M5, with a legend:

| State | Count | Square on paper-cool (the chip styles of A3.5) |
|---|---|---|
| given | 33 | solid petrol fill |
| sourced | 5 | 1 px petrol outline, no fill |
| assumed | 8 | 1 px ink outline with a fill of 45-degree hairlines in `rule` |
| empty | 0 | 1 px dashed ink-2 outline, no fill (shown in the legend only, with the count 0) |

- The legend text reads the counts in words and figures, so colour and pattern are never the only signal: "46 values: 33 given, 5 sourced, 8 assumed, 0 empty".
- The squares appear together with the shared reveal. They do not fill one by one and nothing counts up.
- If the re-shot M5 shows other counts, the still wins, the founders update the claim register, and this diagram is redrawn from it (0.1, rule 8).

Any further diagram Part A asks for uses the same component and the same rules.

### C3.8 `GraphScene`

Wrapper for the optional Spline scene, with its fallbacks. It is specified in C8. At launch section 02 uses a plain `MediaFrame` with M4 and M3, and this component is not needed.

Props: `sceneUrl`, `fallbackVideo` (`pida-connectivity-graph`), `fallbackImage` (`pida-connectivity-graph`), `interactive` (boolean), `maxDpr` (default 1.5).

### C3.9 `Button` and `Link`: variants and states

Common to all buttons: Barlow 600, 16 px, letter spacing 0.01 em, height 48 px (never below 44 px), padding 0 24 px, 2 px radius, no shadow, no gradient, transition of background and border colour over 160 ms.

| Variant | Where | Rest | Hover | Active | Focus | Disabled |
|---|---|---|---|---|---|---|
| `primary` on light bands | Navigation, hero, `MidCta` | cobalt fill, white text | cobalt-hover fill | cobalt-hover fill, moved down 1 px | 2 px cobalt outline, 2 px offset | not used |
| `primary` on dark bands | Final block | paper fill, ink text | paper-2 fill | paper-2 fill, moved down 1 px | 2 px on-dark outline, 2 px offset | not used |
| `secondary` on light bands | "Back to the home page" on `/404` and `/trial/error`, "Try again" on `/trial/error`, "Send" on the welcome form (A7.3), the two consent banner buttons | transparent, 1 px ink border, ink text | ink fill at 6 % opacity | the same, moved down 1 px | as primary | `rule` fill, ink-2 text, `aria-disabled="true"`, no hover, label "Sending" (A6.8). Used only for "Send" while the welcome form is being sent. |
| `secondary` on dark bands | Lightbox close button | transparent, 1 px on-dark border, on-dark text | on-dark fill at 10 % opacity | the same, moved down 1 px | 2 px on-dark outline, 2 px offset | not used |
| `provider` | `/trial` only (0.4) | Each provider's own brand rules | as the provider specifies | as the provider specifies | the site's focus ring | not used |
| `icon` | Video toggle, "Open larger" | 44 px square, paper fill, ink glyph, 1 px `rule` border | paper-2 fill | moved down 1 px | the site's focus ring | not used |

Text links:

| Band | Rest | Hover | Focus |
|---|---|---|---|
| Light | cobalt text, 1 px underline, 3 px underline offset | cobalt-hover text, 2 px underline | the site's focus ring |
| Dark (navy, reading-room) | cobalt-on-dark text, the same 1 px underline and 3 px offset (A6.8) | on-dark text | 2 px on-dark outline, 2 px offset |
| Footer (ink) | on-dark-2 text, 1 px underline (A3.14) | on-dark text | 2 px on-dark outline, 2 px offset |

Visited links look the same as unvisited links. Links inside body text are always underlined; colour alone never marks a link.

### C3.10 `Header` and the mobile menu

- A fixed bar: 64 px high from 768 px, 56 px below. It is transparent over the hero, and paper at 92 % opacity with a 1 px `rule` line under it after 80 px of scroll (A3.0). On dark bands it stays paper; it never inverts. It does not hide on scroll. Every anchor target has `scroll-margin-top` equal to the bar height plus 16 px.
- Left: the interim wordmark "PIDA" in Barlow Condensed 600 with 0.04 em letter spacing (0.3), linking to `/#top`. When the founders supply a logo (0.6, D7) it replaces the text.
- Centre, from 1024 px: seven anchor links in Barlow 500, 15 px, ink, with the labels of A3.0: "P&ID", "Connectivity", "Hydraulics", "Safety", "Isolation", "Answers", "How it fits". The active link carries `aria-current="true"` and a 2 px cobalt underline.
- Right: the primary button "Sign up for trial". Below 480 px the button stays in the bar at 44 px height with 16 px padding; the text is not shortened.
- Below 1024 px the seven links move into a menu:
  - The menu is that of A6.14: a 44 x 44 px button with a three-line icon and the accessible name "Open menu" ("Close menu" when open), with `aria-expanded` and `aria-controls`; a full-height paper sheet that slides in from the right over 200 ms; the rows, the primary button and the legal links that A6.14 lists; Escape, focus trap, focus return and scroll lock as A6.14 states.
  - Without JavaScript it is a `<details>` element with the same rows, so the links still work.

### C3.11 `Footer`

On the ink band, text in on-dark-2, links as in C3.9. Content, in this order:

1. Left block (A3.14): the wordmark "PIDA", the line "Pharma Industry Design Automation" and the descriptor line of A3.14.
2. Middle block: the anchor links of A3.14, in two columns.
3. Right block: the text link "Sign up for trial" to `/trial` (a link, not a button, 0.4), then the links "Privacy" (`/privacy`), "Trial terms" (`/terms`), "Legal and accessibility" (`/legal`) and "Cookie settings". "Cookie settings" reopens the consent banner and appears only if analytics are used (C12).
4. The contact line of 0.5, in the right block: "Investor or partner? Write to {role address}." The address is a `mailto:` link. It comes from 0.6, D4. If D4 is not supplied, leave the line out here and in the final block.
5. The standards line, verbatim from 0.4: "Standards named on this site belong to their respective publishers. PIDA is not affiliated with or endorsed by them."
6. The legal entity and the year (0.6, D3).

There are no names of people, no social icons and no outbound links other than the legal ones the founders ask for. Layout: the three blocks of A3.14 side by side from 1024 px, two columns from 768 px, one below.

### C3.12 `MidCta` and `FinalCta`

- `MidCta` sits after section 03, inside the paper-cool band, separated from the section by a 1 px `rule` line and 48 px of space. One short line from Part A in `display-m` and the primary button. No media. Location value `mid`.
- `FinalCta` is block 12 on the navy band: an `h2` from Part A (the word "Reimagined" is allowed here), one sentence, the paper button "Sign up for trial" linking to `/trial`, and under it the contact line of 0.5 in `small`, on-dark-2, if D4 is supplied. The provider-branded buttons do not appear here; they exist on `/trial` only (0.4). The button has no looping attention animation. Location value `final`.

### C3.13 `TrustGrid`, `CompatibilityBand` and `Faq`

- `TrustGrid` (block 10): four cards from Part A on the four trust facts. Two by two from 768 px at every width above, one column below 768 px (A3.10). A card is a paper-2 panel with the 1 px `rule` border and 2 px radius, the mono label of A3.10 (`DETERMINISTIC`, `INDEPENDENTLY CHECKED`, `SOURCED`, `YOURS`) in `mono-label`, a `title` and a body of at most 40 words. No icons, no shadow, no media. The first card is about determinism: it speaks about the drawing ("same specification in, same drawing out, byte-identical"), never about "files". Two optional lines live here behind build flags, both off by default (0.6, D6): the scope line of 0.5 (`SHOW_SCOPE_LINE`) and the 0.265 % line (`SHOW_AGREEMENT_FIGURE`).
- `CompatibilityBand` (block 11): one sentence from A3.11 on the paper-2 band, in `display-m`, ink, centred in 8 of 12 columns. This is the only place on the whole site where compatibility is said (the hard rules in 0.1, rule 3). No other component, caption, alt text, FAQ answer, meta tag or email repeats it. C17.3 checks this.
- `Faq` (should-have, 0.5): sits between block 11 and block 12 on paper. Each question is a native `<details>` with the question as `<summary>` in `title` style and the answer in `body`, at most 60 words. A 1 px `rule` line separates the items and a plus or minus glyph shows the state. All items start closed. Questions come from 0.5. Answers come from A3.12 (C21.5 notes what each may and may not say). Question 6 is left out until D5 is answered; question 1 uses the default answer of A3.12.

### C3.14 `Placeholder` (staging only)

When a still has not arrived (M8, M9) or is waiting for its re-shoot (M1), staging shows a placeholder in the frame:

- A paper-2 panel (navy-2 on dark bands) in the measured aspect of the nearest existing still, with the 1 px border, and one centred line in `mono-label`: `STILL TO FOLLOW: M8`.
- It carries `data-pida="placeholder"`. The CI check in C17.3 fails a production build that contains one.
- M8 and M9 are launch blockers for sections 06 and 04 (0.3; 0.6, D7). By default the launch waits for them. Shipping the page without a section is a change to Part 0 first.
- M1, until its re-shoot arrives, is shown with the "Not generated" chip cropped out (0.3). It is not a placeholder case.

### C3.15 Small parts

- `SkipLink`: the first focusable element, "Skip to content", visible on focus, paper fill with ink text.
- `StateLine`: a one-line notice at the top of `/trial/welcome` (C6.4). Paper-2 fill, 1 px border in `ok`, text in ink, `role="status"`.
- `ConsentBanner`: shown whenever analytics are used, under either option of C12.1 (C12.2). Two buttons of equal size and weight: "Accept analytics" and "Decline".
- `AnchorNav` scroll-spy: one IntersectionObserver that sets `aria-current` in the header.

---

## C4. Design tokens

The four in-product looks stay in the product. The site is one industrial brand on a light paper base, with dark bands for the Workspace and Engineer sections (0.4, Look). Each product section takes one accent. There is no green on black anywhere.

### C4.1 Colour tokens

Values are those of 0.4. Do not add a colour that is not in this table.

| Token | Value | Use |
|---|---|---|
| `--pida-paper` | `#F3F0E8` | Default page background; button fill on dark bands |
| `--pida-paper-2` | `#FBFAF6` | Compatibility band, cards, legal pages, hover of the paper button |
| `--pida-paper-cool` | `#E8ECF0` | Section 03 band |
| `--pida-ink` | `#18202B` | Text and headings on light; footer band |
| `--pida-ink-2` | `#4A5565` | Secondary text on light; borders of form fields |
| `--pida-navy` | `#0B1524` | Dark bands: proof strip, sections 02, 04, 05, final block |
| `--pida-navy-2` | `#14233A` | Cards and panels on navy |
| `--pida-reading-room` | `#17141A` | Section 06 band only |
| `--pida-on-dark` | `#EEF3FA` | Text on dark bands |
| `--pida-on-dark-2` | `#B8C7DB` | Secondary text on dark bands; footer text |
| `--pida-cobalt` | `#1B4B9C` | Primary action and links on light; accent of hero, 01, how-it-fits, trust |
| `--pida-cobalt-hover` | `#163D80` | Hover of cobalt |
| `--pida-cobalt-on-dark` | `#8FB0FF` | Accent of section 02; text links on dark bands (A6.8) |
| `--pida-petrol` | `#0B5F6B` | Accent of section 03 (light bands only) |
| `--pida-amber` | `#FFC857` | Accent of sections 04 and 05 (dark bands only). Not used for focus. |
| `--pida-coral` | `#FF6B5E` | Isolation in section 05, and nothing else (dark bands only) |
| `--pida-brass` | `#D9B466` | Accent of section 06 (dark bands only) |
| `--pida-rule` | `#C9C3B4` | Hairlines and frame borders on light |
| `--pida-rule-dark` | `rgba(238, 243, 250, 0.16)` | Hairlines and frame borders on dark |
| `--pida-ok` | `#1E6B45` | Success state line on light bands only. Never on a dark band. |
| `--pida-error` | `#A12B1E` | Error state line and field errors on light bands |

Contrast figures. They were worked out by hand from the hex values; confirm them with a contrast checker before launch:

| Pair | Ratio | Result |
|---|---|---|
| ink on paper | about 14.4:1 | Pass |
| ink on paper-cool | about 13.8:1 | Pass |
| ink on paper-2 | about 15.7:1 | Pass |
| ink-2 on paper | about 6.6:1 | Pass |
| ink-2 on paper-cool | about 6.4:1 | Pass |
| cobalt on paper | about 7.3:1 | Pass |
| white on cobalt (button) | about 8.3:1 | Pass |
| white on cobalt-hover | about 10.4:1 | Pass |
| petrol on paper-cool | about 6.2:1 | Pass |
| ok on paper | about 5.7:1 | Pass |
| error on paper | about 6.4:1 | Pass |
| on-dark on navy | about 16.4:1 | Pass |
| on-dark-2 on navy | about 10.7:1 | Pass |
| on-dark-2 on ink (footer) | about 9.6:1 | Pass |
| cobalt-on-dark on navy | about 8.6:1 | Pass |
| amber on navy | about 11.9:1 | Pass |
| coral on navy | about 6.6:1 | Pass |
| brass on reading-room | about 9.3:1 | Pass |
| amber, coral or brass on any light band | below 3:1 | Fail. Never use these three on light bands. |
| rule on paper | about 1.5:1 | Decorative only. A boundary that carries meaning, such as a form field, uses ink-2. |

### C4.2 Non-colour tokens

| Token | Value |
|---|---|
| `--pida-radius` | `2px` (frames, cards, chips, buttons, inputs) |
| `--pida-border` | `1px solid var(--rule)` |
| `--pida-shadow-frame` | `0 12px 32px -16px rgba(24,32,43,0.25)` (media frames on light bands only) |
| `--pida-space-1` to `--pida-space-9` | `4, 8, 12, 16, 24, 32, 48, 72, 120 px` |
| `--pida-section-pad` | `clamp(72px, 10vw, 160px)` vertical |
| `--pida-container` | `1240px` |
| `--pida-gutter` | `24px` |
| `--pida-margin` | `clamp(20px, 5vw, 64px)` |
| `--pida-measure` | `66ch` |
| `--pida-ease` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--pida-dur-ui` | `160ms` (hover, focus). The lightbox fade and the menu sheet take 200 ms (A6.13, A6.14). |
| `--pida-dur-entry` | `600ms` to `900ms` (entry motion, C7) |
| `--pida-z-header`, `-menu`, `-lightbox` | `100`, `200`, `300` |

### C4.3 Section themes

| Block | `data-theme` | `data-accent` |
|---|---|---|
| Navigation | `paper` | `cobalt` |
| Hero | `paper` | `cobalt` |
| Proof strip | `navy` | none (on-dark text) |
| 01 P&ID Making Reimagined | `paper` | `cobalt` |
| 02 Safety and P&ID Connectivity Reimagined | `navy` | `cobalt-on-dark` |
| 03 Hydraulics Reimagined, and `MidCta` | `paper-cool` | `petrol` (the `MidCta` button stays cobalt) |
| 04 Safety Reimagined | `navy` | `amber` |
| 05 Isolation Reimagined | `navy` | `amber`, with `coral` for isolation only |
| 06 Engineering Answers Reimagined | `reading-room` | `brass` |
| How it fits together | `paper` | `cobalt` |
| Why believe it | `paper` | `cobalt` |
| Compatibility band | `paper-2` | `ink` |
| FAQ | `paper` | `cobalt` |
| Final call to action | `navy` | paper button |
| Footer | `ink` | `on-dark-2` |

Sections 04 and 05 are both navy and sit next to each other. They are separated by a 1 px `rule-dark` line across the container and by the eyebrow of section 05, not by a colour change. Where two paper blocks meet (how-it-fits, trust, FAQ), a 1 px `rule` line across the container separates them.

### C4.4 CSS custom properties

```css
:root {
  --pida-paper: #F3F0E8;
  --pida-paper-2: #FBFAF6;
  --pida-paper-cool: #E8ECF0;
  --pida-ink: #18202B;
  --pida-ink-2: #4A5565;
  --pida-navy: #0B1524;
  --pida-navy-2: #14233A;
  --pida-reading-room: #17141A;
  --pida-on-dark: #EEF3FA;
  --pida-on-dark-2: #B8C7DB;
  --pida-cobalt: #1B4B9C;
  --pida-cobalt-hover: #163D80;
  --pida-cobalt-on-dark: #8FB0FF;
  --pida-petrol: #0B5F6B;
  --pida-amber: #FFC857;
  --pida-coral: #FF6B5E;
  --pida-brass: #D9B466;
  --pida-rule: #C9C3B4;
  --pida-rule-dark: rgba(238, 243, 250, 0.16);
  --pida-ok: #1E6B45;
  --pida-error: #A12B1E;

  --pida-font-display: "Barlow Condensed", sans-serif;
  --pida-font-body: "Barlow", system-ui, sans-serif;
  --pida-font-mono: "IBM Plex Mono", ui-monospace, monospace;

  --pida-radius: 2px;
  --pida-container: 1240px;
  --pida-gutter: 24px;
  --pida-margin: clamp(20px, 5vw, 64px);
  --pida-section-pad: clamp(72px, 10vw, 160px);
  --pida-measure: 66ch;
  --pida-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --pida-dur-ui: 160ms;

  --bg: var(--pida-paper);
  --fg: var(--pida-ink);
  --fg-2: var(--pida-ink-2);
  --accent: var(--pida-cobalt);
  --rule: var(--pida-rule);
  --focus: var(--pida-cobalt);
}

[data-theme="paper-2"]    { --bg: var(--pida-paper-2); }
[data-theme="paper-cool"] { --bg: var(--pida-paper-cool); }

[data-theme="navy"], [data-theme="reading-room"], [data-theme="ink"] {
  --bg: var(--pida-navy);
  --fg: var(--pida-on-dark);
  --fg-2: var(--pida-on-dark-2);
  --rule: var(--pida-rule-dark);
  --focus: var(--pida-on-dark);
}
[data-theme="reading-room"] { --bg: var(--pida-reading-room); }
[data-theme="ink"]          { --bg: var(--pida-ink); --fg: var(--pida-on-dark-2); }

[data-accent="cobalt-on-dark"] { --accent: var(--pida-cobalt-on-dark); }
[data-accent="petrol"]         { --accent: var(--pida-petrol); }
[data-accent="amber"]          { --accent: var(--pida-amber); }
[data-accent="brass"]          { --accent: var(--pida-brass); }
[data-accent="ink"]            { --accent: var(--pida-ink); }

/* Coral is never a section accent. It is set only by the isolation phase of section 05 (C7.3). */
#isolation[data-phase="isolation"] { --phase: var(--pida-coral); }

:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
```

- In Framer, create the same names as colour styles and text styles.
- In Webflow, create them as Variables, with a "Theme" variable mode per `data-theme` value.
- The font stacks name only the three brand families and generic keywords, so the published CSS carries no product name.
- The builder writes the tokens of C4.4 to `tokens/pida-tokens.json` (C19). That file does not exist until the builder makes it.

---

## C5. Typography

Two families and one mono (0.4). All three are open-licence and are self-hosted. There is no serif and no pull-quote face.

| Role | Family | Weights shipped |
|---|---|---|
| Display | Barlow Condensed | 500, 600 |
| Body and UI | Barlow | 400, 500, 600 |
| Labels, numbers, chips, eyebrows | IBM Plex Mono | 400, 500 |

Scale:

| Style | Family | Size | Line height | Tracking | Use |
|---|---|---|---|---|---|
| `display-xl` | Display 600 | `clamp(44px, 7.2vw, 104px)` | 0.95 | -0.01em | The H1 |
| `display-l` | Display 600 | `clamp(36px, 5vw, 72px)` | 1.0 | -0.005em | H2: the section titles, the final block |
| `display-m` | Display 500 | `clamp(28px, 3.2vw, 44px)` | 1.05 | 0 | The `MidCta` line, the compatibility sentence |
| `h3` | Body 500 | `clamp(24px, 2.4vw, 32px)` | 1.2 | 0 | The H3 headline under a section title (A6.4). It carries the speed claim in 01 and 03. |
| `sub-headline` | Body 400 | `clamp(18px, 1.6vw, 22px)` | 1.4 | 0 | The sub-headline under the H3 (A6.4) |
| `title` | Body 600 | `clamp(20px, 1.6vw, 24px)` | 1.3 | 0 | Card titles, FAQ questions |
| `body-l` | Body 400 | `clamp(19px, 1.5vw, 21px)` | 1.55 | 0 | Hero sub-line only |
| `body` | Body 400 | 18 px from 768 px, 17 px below | 1.6 | 0 | Default text |
| `small` | Body 400 | 14 px | 1.5 | 0.005em | Legal, consent line |
| `task-note` | Body 400 | 16 px | 1.5 | 0 | The `THE TASK TODAY` note (A6.5) |
| `mono-label` | Mono 500 | 12 px | 1.3 | 0.08em, uppercase | Eyebrows, card labels, proof strip labels |
| `mono-data` | Mono 400 | 14 px | 1.45 | 0 | Tables, the question in section 04 |
| `fact` | Mono 400 | 15 px from 768 px, 14 px below | 1.45 | 0 | The fact rows of a section (A6.4; C3.4) |
| `caption` | Mono 400 | 13 px | 1.45 | 0 | Captions under media frames and in the lightbox (A6.4) |
| `wordmark` | Display 600 | 24 px in the header, 28 px in the footer | 1 | 0.04em | The interim wordmark "PIDA" |

Rules:

- The measure is at most 66 characters for body text (`max-width: var(--pida-measure)`).
- Numbers in chips and the proof strip use tabular figures (`font-variant-numeric: tabular-nums`).
- Flow is written "m³/h" with the superscript character U+00B3 (0.4). `L/d` stays as written. There is no space before `%` unless Part A writes one.
- Self-host WOFF2 files, subset to Latin plus the symbols used (`&`, `%`, `³`, `/`, `→`, `+`).
- Use `font-display: swap`. Preload only Barlow Condensed 600 and Barlow 400.
- Define a fallback `@font-face` with `size-adjust` and `ascent-override` so the swap does not move the layout.
- Do not load fonts from a third-party font host. It adds an origin, and its host name would fail the banned-terms check (C17.3).

---

## C6. Breakpoints, grid and page layouts

### C6.1 Breakpoints and grid

Breakpoints are those of 0.4: 480, 768, 1024, 1280, 1440. The side margin is `clamp(20px, 5vw, 64px)` at every width, the gutter is 24 px, and the container is 1240 px.

| Name | From | Columns | Framer breakpoint | Webflow breakpoint |
|---|---|---|---|---|
| base | 0 | 4 | Phone (390) | Mobile portrait (up to 478) |
| `sm` | 480 | 4 | Phone | Mobile landscape (up to 767) |
| `md` | 768 | 8 | Tablet (810) | Tablet (up to 991) |
| `lg` | 1024 | 12 | Desktop (1200) | Desktop base (992 and up); add a custom rule at 1024 |
| `xl` | 1280 | 12 | Desktop | 1280 |
| `2xl` | 1440 | 12, container capped at 1240 | add 1440 | 1440 |

Test widths (0.4): every breakpoint, plus 360, 390 and 1920. Also check 320 px for reflow (C15). From 1920 px the page stays centred in the 1240 px container; full-bleed band colours extend to the edges and media never grows past 1600 px.

### C6.2 Layout rules from 1024 px

- Design is mobile first. There is no horizontal scroll at any width from 320 px.
- Column spans, stacking order and component anatomy are looks, so Part A wins (A6.5, A3.3 to A3.8). The layouts:
  - `media-right` (copy in columns 1 to 5, media in 6 to 12): section 01.
  - `media-left` (media in columns 1 to 7, copy in 8 to 12): sections 02 and 05.
  - `media-full` (copy in columns 1 to 7, then an evidence row under it): section 04 with M9 in 10 of 12 columns, section 06 with M8 in 8 of 12 columns.
  - `media-trio` (section 03): copy in columns 1 to 7, then an evidence row with M5 in columns 1 to 7 and M6 and M7 stacked in columns 8 to 12, each with its caption. If the measured aspects of M6 and M7 differ, let their heights differ. Do not crop them to match.
  - Above row 3 every section has the rows of A6.5: eyebrow and task-today note in columns 1 to 5, then the title across 12 columns with the H3 headline under it in columns 1 to 8.
- The hero from 1024 px follows Part A's drawing of it. M2 is the hero image, in a `MediaFrame` with `priority`.
- Below 560 px of column width the full still is shown whole and opens in the lightbox. Focus crops (C9.5 step 6) are a could-have, are never used for M2, and when used keep the full still's alt text and caption with the word "Detail:" in front of the caption.
- The vertical rhythm is `--pida-section-pad` between blocks. Inside a block, use the spacing scale.

### C6.3 Tablet (768 to 1023 px) and phone

- Nothing pins (0.4). Section 01, like every section, is a stack in the order of A6.5: eyebrow, task-today note, title, headline, sub-headline, body, facts, evidence, caption. Its evidence is M1, the "Generate" arrow and M2, in that order, with all nine chips of the step rail filled (A3.3).
- Every section stacks copy first, then the facts in two columns on tablet, then the evidence (A6.5). Nothing is mirrored. Copy keeps the 66-character measure. Media takes all 8 columns.
- Hero: eyebrow, H1, sub-line and button first, then M2 at full container width directly under them with 32 px of space. There is no overlap between text and image below 1024 px, whatever Part A draws for desktop.
- Proof strip: two by two. Trust cards: two by two. Section 03: M5, M6 and M7 stacked in that order, each full width (A3.5).
- How it fits together: the desktop SVG from 1024 px, the vertical variant below (A3.9, C3.7).
- Footer: two columns. Header: the menu of C3.10.
- Below 768 px everything is one column in the 4-column grid. Buttons in the hero, `MidCta`, final block and `/trial` are full width below 480 px.

### C6.4 The small pages

Layout per A6.16: the header and footer of `/` (the header's anchors link to `/#anchor`), the paper band, and one left-aligned column that starts at column 3 and spans 7 columns from 1024 px (5 columns on the three sign-up pages) and is full width below. Each has a `mono-label` eyebrow and exactly one `h1` in `display-l`.

**`/trial`.** `TrialPanel` (C3.6). With `?state=withdrawn` the script hides the `TrialPanel` and shows the H1, text and link of A7.5 in its place (`role="status"` on the text). No other value of `?state=` does anything. Without JavaScript the normal `/trial` is shown; that is accepted.

**`/trial/welcome`.** Generic and static (0.4). It never shows a name or an email address, and it never reads one from the URL. Content: the eyebrow, `h1` and text of A7.3, then the optional form, then the link "Skip and go back to the home page" (A7.3) to `/`. Values of `?state=`:

| Value | Line |
|---|---|
| none | no line |
| `returning` | No line: the `h1` and text of A7.4 replace those of A7.3. They say that the email was sent again (0.4). |
| `saved` | "Saved. Thank you." The form is replaced by this line. |
| `form_expired` | "That form has expired. Your sign-up is safe and nothing else is needed." |

The form (0.4): a `fieldset` whose legend is the form heading of A7.3, "Tell us a little more (optional)", followed by the form text of A7.3, two text inputs labelled "Company" and "Role" (each at most 120 characters, `autocomplete="organization"` and `autocomplete="organization-title"`), one unticked checkbox labelled "Send me product updates", and the secondary button "Send" (A7.3). Nothing is required, so there is no validation message other than the length limit. Inputs: 48 px high, paper-2 fill, 1 px ink-2 border, 2 px radius, label above in Barlow 500, 15 px; the focus state is the site's focus ring; an error state uses a 1 px `error` border with the message in `small`, `error` colour, linked by `aria-describedby`. The form posts to the auth back end (C10.11).

**`/trial/error`.** The `h1` and text of A7.6 for the code (C10.9), a secondary button "Try again" that links to `/trial` (A7.6) and sends `cta_click {location: trial-page}`, the secondary button "Back to the home page" where A7.6 lists it, the contact line if D4 is supplied, and under everything a line in `small`, ink-2: "Reference: {id}". No auto-redirect. An unknown or missing code shows the text of `server`.

**`/404`.** Eyebrow, H1, text, secondary button "Back to the home page" (to `/`) and text link "Sign up for trial" (to `/trial`, `cta_click {location: 404}`), all from A7.9.

**`/privacy`, `/terms`, `/legal`.** The page is plain paper. `h1` in `display-l`, a `mono-label` line "Last updated {date}", then sections with `h2` in `title` style at 28 px, `h3` in `title`. Body in `body` at the 66-character measure. Lists use the default disc. Tables (the storage table of C12.4) use `mono-data` with `rule` lines and scroll inside their own box below 480 px. `/legal` opens with a three-item list of links to its anchors. The builder supplies templates; a lawyer or the founders approve the text before launch (0.6, D8).

### C6.5 Print

Readers of this kind print pages and save them as PDF. One print stylesheet covers every page. Print is the one place where plain black, white and grey are used instead of the tokens of C4.1:

```css
@media print {
  @page { margin: 16mm; }
  html { font-size: 10.5pt; }
  [data-theme] {
    --bg: #fff; --fg: #000; --fg-2: #333; --rule: #999; --accent: #000;
  }
  body, [data-theme] { background: #fff; color: #000; }
  header nav, .menu, [data-pida="cta"], [data-pida="video-controls"],
  [data-pida="consent"], dialog, [data-pida="graph-canvas"] { display: none; }
  [data-pida="section"] { padding-block: 10mm; break-inside: auto; }
  h1, h2, h3 { break-after: avoid; }
  figure, [data-pida="media"], [data-pida="card"], [data-pida="chip"] { break-inside: avoid; }
  [data-pida="media"] img { max-height: 110mm; width: auto; box-shadow: none; }
  video { display: none; }
  [data-pida="video-poster-print"] { display: block; }
  .legal a[href^="http"]::after { content: " (" attr(href) ")"; font-size: 9pt; }
}
```

- Dark bands print as white with black text. Accent rules print black. The amber and coral meaning in section 05 is still carried by its word labels (C7.3).
- A video prints as its poster with its caption and its text description.
- A `beforeprint` handler opens every FAQ item, disables the ScrollTrigger pin of section 01, and sets every reveal to its end state. An `afterprint` handler restores them.
- The footer prints with the domain, the standards line and the legal entity.
- The `/trial` pages print without the provider buttons; that is accepted.

---

## C7. Motion specification (GSAP and ScrollTrigger)

### C7.1 Principles

These are the motion rules of 0.4, turned into build values.

- One ease everywhere: `cubic-bezier(0.22, 1, 0.36, 1)`. Entry motion lasts 0.6 to 0.9 s. The entry is a fade and a rise. SVG strokes draw on.
- One pinned sequence at most, on desktop only: section 01, the specification turning into the drawing. Nothing pins on touch devices or under 1024 px. Sections 02 to 06 never pin.
- The hero drawing is revealed once by a mask over 1.2 s. Nothing on the hero is tied to scroll.
- Numbers never count up. Text is never typed letter by letter.
- There is no scroll hijacking, no smooth-scroll library and no horizontal scroll section.
- Properties that may be animated: `transform`, `opacity`, `clip-path` (the question in section 04), and `stroke-dashoffset` on SVG strokes. Nothing else. Apply `will-change` just before a tween and remove it afterwards.
- Nothing on the page imitates a clock. The two speed claims are stated in words (the hard rules in 0.1, rule 7). The pinned sequence of section 01 moves with the reader's scroll, not with time, and it shows no timer, progress bar or seconds counter.

### C7.2 Global setup

```js
gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("pida", "0.22, 1, 0.36, 1");
gsap.defaults({ ease: "pida", duration: 0.7 });

const mm = gsap.matchMedia();
mm.add(
  {
    motion: "(prefers-reduced-motion: no-preference)",
    pin: "(min-width: 1024px) and (min-height: 640px) and (hover: hover) and (pointer: fine)"
  },
  (ctx) => {
    const { motion, pin } = ctx.conditions;
    if (motion === false) return;      // C7.4
    initReveals();
    if (pin) initPinnedSequence();     // section 01 only
  }
);
```

- Select elements by `data-pida="..."` attributes.
- Call `ScrollTrigger.refresh()` after fonts load and after each `MediaFrame` image has decoded.
- In Framer and Webflow, wait for the platform's own ready event before initialising.
- In Webflow's built-in interactions, where a custom ease cannot be entered, `power3.out` is the accepted stand-in. In `pida-motion.js` and in CSS, use the exact curve.
- The `(hover: hover) and (pointer: fine)` test keeps the pin off phones and tablets, including large tablets in landscape.

### C7.3 Timelines per block

Shared reveal, used wherever "reveal" appears below:

- Trigger is the element. Start is `top 82%`. It plays once and has no scrub.
- Text blocks move from `y: 24, opacity: 0` to rest in 0.6 s, staggered by 0.08 s.
- `MediaFrame` moves from `y: 40, opacity: 0` to rest in 0.8 s.
- Fact rows (C3.4) follow the media by 0.15 s, staggered by 0.06 s, over 0.6 s.

| Block | Trigger and range | Pin | Scrub | Timeline |
|---|---|---|---|---|
| Header | none | no | no | The bar is fixed. It gains its paper background after 80 px of scroll (C3.10). The `aria-current` underline moves with a 200 ms CSS transition (A3.0). Nothing else moves. |
| Hero | on load | no | no | Headline lines rise `y: 32` to 0 over 0.8 s, stagger 0.08 s. The sub-line and the button fade in over 0.6 s after 0.25 s. M2 is revealed once by the plot mask below, over 1.2 s. Nothing on the hero is linked to scroll. |
| Proof strip | block, `top 85%` | no | no | Reveal of the four cells, stagger 0.08 s. The values are static text from the first paint; they do not count up. |
| 01 P&ID Making Reimagined | section, `top top` to `+=200%` | yes, when the `pin` condition of C7.2 holds | `scrub: 0.6` | The look is that of A3.3. Three beats: (a) M1 at rest while the nine chips of the step rail (Equipment, Spark filter, Inlets, Outlets, Solids & cleaning, Utilities, Instrumentation, Controlled streams, Review) fill with cobalt in order and stay filled; (b) when the ninth is filled, the "Generate" arrow and its label show; (c) M1 crossfades to M2 in the same frame (columns 6 to 12), `opacity` 1 to 0 and 0 to 1. Then the section releases. Nothing else in the section moves during the pin. `snap` to the three labels, `duration: 0.3`. `anticipatePin: 1`. When the `pin` condition does not hold, the section is the stack of C6.3 with the shared reveal. |
| 02 Safety and P&ID Connectivity Reimagined | section, `top 75%` | no | no | Reveal. M4 plays under the video rules of C9.3. If the 3D scene ships, `GraphScene` follows C8. |
| 03 Hydraulics Reimagined | section, `top 75%`; then each of M6 and M7 at `top 82%` | no | no | Reveal of the text and M5. The `value-fill` diagram appears whole with the reveal; its outline strokes draw on over 0.9 s. M6 and M7 reveal as they enter. No pin, no crossfade. |
| `MidCta` | `top 85%` | no | no | Reveal. |
| 04 Safety Reimagined | section, `top 75%` | no | no | Reveal. The example question from Part A is one line in `mono-data`. It is revealed by a clip: `clip-path: inset(0 100% 0 0)` to `inset(0 0 0 0)` over 0.7 s. It is not typed letter by letter. The full text is in the DOM from the start, so a screen reader reads it once. M9 follows by 0.15 s. |
| 05 Isolation Reimagined | section, `top 75%` | no | no | Reveal. A 2 px rule under the title draws on from the left over 0.8 s in amber, with the `mono-label` "FLOW PATH" at its end. When M10 reaches the isolation part of the recording, the rule changes to coral and the label to "ISOLATION" (see below). |
| 06 Engineering Answers Reimagined | section, `top 75%` | no | no | Reveal for text, M8 and the fact rows with the counts (94 documents; 1,772 design rules in 46 topics; 67 vendor datasheets). The digits do not count up. |
| How it fits together | diagram, `top 80%` | no | no | The strokes of the diagram draw on once over 0.9 s, boxes first, then connectors, then labels fade in over 0.6 s. |
| Why believe it | each card, `top 85%` | no | no | Reveal, stagger 0.08 s. |
| Compatibility band, FAQ | `top 85%` | no | no | Reveal. |
| Final call to action | section, `top 80%` | no | no | Reveal. The button has no looping attention animation. |

**The hero plot mask.** The image must stay the LCP element and must never start hidden. So the mask is a paper-coloured cover that slides off the image, not an opacity or clip on the image itself. It is CSS only, so it does not wait for GSAP:

```html
<script>
  if (matchMedia("(prefers-reduced-motion: no-preference)").matches)
    document.documentElement.classList.add("js-motion");
</script>
```

```css
[data-pida="hero-media"] { position: relative; overflow: hidden; }
.js-motion [data-pida="hero-media"]::after {
  content: "";
  position: absolute; inset: 0;
  background: var(--pida-paper);
  transform-origin: right center;
  animation: pida-plot 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
}
@keyframes pida-plot { from { transform: scaleX(1); } to { transform: scaleX(0); } }
```

- The inline script goes in the `head`, before the first paint. Without JavaScript, or under reduced motion, the class is never set and the image is simply there.
- Because it is a CSS animation with an end state, the cover can never stay stuck over the image.
- Check in the Lighthouse trace that the LCP element is still the hero image and that its time has not moved. If the cover delays it, apply the reveal to the frame border only.

**The amber to coral change in section 05.** The component takes a prop `isolationAt`, the time in seconds at which the recording moves from the flow path to isolation. The builder reads it off M10. A `timeupdate` listener sets `data-phase="isolation"` on the section while `currentTime >= isolationAt`, and removes it when the loop restarts:

```css
#isolation [data-pida="phase-rule"] {
  background: var(--phase, var(--pida-amber));
  transition: background-color 0.6s var(--pida-ease);
}
```

The word label changes with it ("FLOW PATH", then "ISOLATION"), so colour is never the only signal. Coral is used for this and for nothing else on the site.

### C7.4 Reduced motion

When `prefers-reduced-motion: reduce` is set (0.4): no pin, no draw-on, no autoplay; everything is simply there.

- No ScrollTrigger instances are created. Section 01 is the stack of C6.3.
- The hero cover is never applied.
- Videos do not autoplay. The poster shows with a visible play button and playback starts on a click.
- `GraphScene`, if it exists, does not mount Spline. It shows M3 with a "Play recording" button that loads M4.
- The rule in section 05 is static: left half amber, right half coral, with both word labels visible (A3.7).
- CSS transitions are reduced to opacity changes of 160 ms or less. Anchor scrolling uses `scroll-behavior: auto`.

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  [data-pida-reveal] { opacity: 1; transform: none; clip-path: none; }
  #isolation [data-pida="phase-rule"] { transition: none; }
}
```

Content must be visible without JavaScript. Initial hidden states are applied by the script (`gsap.set`) after it has confirmed it is running, never by CSS alone. The one exception is the hero cover, which is guarded by the `js-motion` class.

---

## C8. Spline scene specification: the 3D connectivity graph (optional)

### C8.1 Status and purpose

The 3D scene is **not a launch blocker** (0.4). Section 02 launches with M4 (the recording) and M3 (the still). Build the scene only after phases 1 to 3 of 0.7 are done.

If it is built, it restates the product's own graph as shown in M3: every P&ID of a project is a node and every sheet-to-sheet connection is an edge. It is not a new invention. If the scene and M3 disagree, M3 is right.

The plan of the 3D tool that removes its watermark is required (the hard rules in 0.1, rule 9). If that plan is not bought, the scene does not ship.

### C8.2 Content

| Element | Specification |
|---|---|
| Nodes | Six, one per sheet, exactly as in M3. Shape: a flat rectangular plate with the proportions of a drawing sheet in landscape, 2 % thickness. Not spheres. Fill navy-2, edge on-dark-2. |
| Node groups | The four of M3: reactor, condensers + receivers, utility supply, other. Each plate carries its group as a `mono-label` tag in words. If M3 shows a colour per group, sample that colour from M3 for the plate edge, and check it reaches 3:1 against navy. If it does not, use on-dark-2 for all and let the tag carry the group. Amber, coral and brass are not used in this section. |
| Edges | Five, one per join, in exactly the topology of M3. Thin lines, on-dark at 55 % opacity. A hovered or selected edge turns cobalt-on-dark. A slow dash may travel along an edge at 8 s per traverse. It is off under reduced motion. |
| Unjoined sheets | The product flags sheets joined to nothing. The scene shows no such node, because M3 shows none. Do not invent a node to make the point (0.4). The copy carries this fact. |
| Labels | Sheet identifiers and names, copied from M3. R-101 is the reactor sheet. Do not invent sheet numbers. Labels are HTML overlays positioned from projected node coordinates, not 3D text, so they stay sharp, selectable and readable by assistive technology. IBM Plex Mono, 12 px, on-dark. |
| Background | Transparent, so the navy band shows through. No skybox, no floor grid, no bloom, no depth of field. |
| Lighting | One soft key light, one rim light and low ambient. Matte materials. No environment-map reflections. |

Before modelling, the builder writes the topology down from M3 in `spline/scene-notes.md`: the six labels, the group of each, and the five pairs that are joined. The founders confirm that list against the product. The scene is built from the list.

Object names inside the scene are public, because the scene file can be downloaded. Name objects `sheet-01` to `sheet-06`, `join-01` to `join-05` and `label-anchor-01` onwards. No object, material or scene name may contain a term banned by 0.1.

### C8.3 Camera and interaction

| Aspect | Specification |
|---|---|
| Camera | Perspective, field of view about 35 degrees, looking slightly down (about 15 degrees). Framed so all six nodes fit with 12 % padding inside the measured aspect of M3. |
| Idle motion | The whole graph rotates about the vertical axis, one revolution per 60 s. It pauses on hover, on focus within, when the tab is hidden, and when the section leaves the viewport. |
| Pointer drag | Orbit about the vertical axis, plus or minus 40 degrees of pitch, with damping. No pan. Zoom is disabled so the page scroll is never captured. |
| Touch | Not reached: touch devices get M4 (C8.4). |
| Hover on a node | The node lifts 4 % toward the camera over 0.3 s. Its edges turn cobalt-on-dark. The label gains the list of joined sheets. |
| Keyboard | A visually hidden list of the six sheets sits beside the canvas as real buttons. Focusing a button triggers the same highlight as hover. This list is also the accessible description of the graph. |
| Entry | One dolly from 1.15 times the distance to 1.0 over 0.9 s with the site ease. |
| Scroll link | None. |
| Analytics | `graph3d_interact`, once per page view, on the first drag or node hover. |

### C8.4 Loading and fallback ladder

The ladder of 0.4 is Spline, then M4, then M3. `GraphScene` decides in this order:

1. **M3** is always rendered first. It is the placeholder and the result without JavaScript.
2. **M4** replaces the still, through `MediaFrame`, if any of the following is true:
   - the viewport is below 1024 px
   - the pointer is coarse
   - `navigator.deviceMemory` is 4 or less
   - `navigator.hardwareConcurrency` is 4 or less
   - the connection reports `saveData` or an effective type slower than 4g
   - WebGL2 is unavailable
3. **The Spline scene** mounts only on capable desktops, when the section is within 300 px of the viewport and the main thread has been idle (`requestIdleCallback` with a 2 s timeout).
   - The still stays visible until the scene reports its first rendered frame. Then it crossfades over 0.4 s.
   - If the scene has not rendered within 6 s, or throws, stay on M4. Log the reason to the console in staging. There is no analytics event for it, because 0.4 defines none.
4. Under reduced motion, stay on M3, with a button that plays M4.

### C8.5 Performance caps

| Cap | Limit |
|---|---|
| Scene file (`.splinecode`), compressed transfer | 1.5 MB at most (0.4, Budgets) |
| Triangles | 40,000 or fewer |
| Materials | 6 or fewer, no image textures larger than 512 px, preferably none |
| Lights | 3 or fewer, no real-time shadows |
| Post-processing | none |
| Device pixel ratio | capped at 1.5 |
| Frame rate | Render on demand where possible. Pause the render loop when off screen or when the tab is hidden. |
| Main-thread cost at mount | No long task over 200 ms on the reference laptop (C14) |
| Runtime script | Loaded only by this component, never in the page's critical path, and not counted in the 300 KB JavaScript budget |

Export and hosting notes:

- Export the scene for the web runtime (code export).
- Self-host the `.splinecode` file and the runtime script where the route allows (Route C always, Routes A and B where possible). Otherwise load from Spline's production host and list that host in the CSP (C16).
- The watermark must be off in the export. Check the rendered canvas at 200 % before publishing.
- Keep the editable Spline project in the handoff (C19).

---

## C9. Media pipeline

### C9.1 General rules

- The source files are the ten of 0.3, under their canonical names, in the Drive folder "PIDA website 1 / Website handoff". Ask the founders for access to it before starting.
- The two MP4s are the masters. There are no lossless originals, so never upscale them and never encode from an already shipped rendition. Always encode from the master.
- Measure every file before laying out its frame: `ffprobe` for the videos (width, height, frame rate, duration, codec), any image tool for the stills. Record the figures in `assets/media-facts.json`. Nothing in this part assumes an aspect ratio, a frame size or a frame rate.
- Never upscale a still. The largest rendition is `min(cropped master width, listed width)`.
- Strip all metadata from every output: EXIF, XMP, encoder tags, original file names, creation software.
- Before any still or frame goes live, zoom to 200 % and confirm that it shows none of the following (0.3):
  - a third-party name, logo or window title
  - a file extension of the hydraulic solver
  - a browser address bar or a local path
  - a personal name
  - an internal rule identifier

  Crop; never blur and never black-bar. If a crop cannot remove it, ask the founders for a re-shoot.
- M6 and M7 need this check most. M6 is cropped to the model canvas: no title bar, no menu, no logo. M7 is cropped to the results table only. The founders have accepted showing them cropped (0.6, D9).
- M5 has a visible browser address bar, which must be cropped.
- M1: until the re-shoot arrives, crop the "Not generated" chip out. When the founders save the new M1 over the same name, re-run the pipeline for it.
- If a re-shot still shows a number that differs from the claim register, the still wins and the founders update the register (the hard rules in 0.1, rule 8). Tell them; do not edit the copy silently.

### C9.2 Video renditions

Sources: M4 `pida-connectivity-graph.mp4` (4.7 MB) and M10 `pida-isolation-flowpath.mp4` (2.1 MB). Both are silent screen recordings.

Rules of 0.4: encode at the source width and never above 1600 px; keep the source frame rate; H.264 MP4 plus WebM VP9; AV1 is optional; every rendition is under 3 MB.

Let `W` be `min(cropped source width, 1600)`, rounded down to an even number.

| Rendition | Container and codec | Width | Frame rate | Rate control | Weight |
|---|---|---|---|---|---|
| `{base}-{W}.mp4` | MP4, H.264 High, yuv420p | `W` | source | CRF 22, `maxrate` set so that the file stays under 3 MB (see below) | under 3 MB |
| `{base}-{W}.webm` | WebM, VP9 | `W` | source | CRF 33, `-b:v 0`, two-pass | under 3 MB, normally 75 % of the H.264 file or less |
| `{base}-960.mp4` and `{base}-960.webm` | as above | 960 (only if `W` is above 960) | source | H.264 CRF 23, VP9 CRF 34 | 1.5 MB or less each |
| `{base}-{W}.av1.mp4` (optional) | MP4, AV1, 8-bit 4:2:0 | `W` | source | CRF 34, preset 6 | under 3 MB |

- `maxrate` in kbit/s is about `(3000 x 8) / duration in seconds x 0.9`. For a 40 s recording that is about 540 kbit/s; screen content with little movement usually sits well below it at CRF 22.
- The CRF values are tuned for screen content, which has thin lines and small text. If text shimmers, lower the CRF by 2. If the file then passes 3 MB, trim the recording rather than blur it. Trimming is the founders' call.
- If a master is already H.264, needs no crop, is at most 1600 px wide and is under 3 MB, a stream copy with the metadata stripped and fast start set is better than a second lossy pass. Make the WebM from the master as usual.
- If a loop is wanted, trim so that the last frame matches the first. Otherwise end with a 0.5 s hold and let the component restart the loop on a short fade.

Reference commands (replace `W`, `CW:CH:CX:CY` and `MAXRATE` with the measured values; leave the `crop` filter out if no crop is needed):

```bash
# Measure first
ffprobe -v error -select_streams v:0 \
  -show_entries stream=width,height,r_frame_rate,codec_name:format=duration \
  -of json masters/pida-connectivity-graph.mp4

# H.264 at the source frame rate, no audio, fast start, metadata stripped
ffmpeg -i masters/pida-connectivity-graph.mp4 -an \
  -vf "crop=CW:CH:CX:CY,scale=W:-2:flags=lanczos" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -preset slow -crf 22 -maxrate MAXRATEk -bufsize 2xMAXRATEk \
  -movflags +faststart -map_metadata -1 -map_chapters -1 \
  video/pida-connectivity-graph-W.mp4

# VP9, two-pass constant quality
ffmpeg -i masters/pida-connectivity-graph.mp4 -an \
  -vf "crop=CW:CH:CX:CY,scale=W:-2:flags=lanczos" \
  -c:v libvpx-vp9 -crf 33 -b:v 0 -row-mt 1 -deadline good -cpu-used 1 \
  -pass 1 -f null NUL
ffmpeg -i masters/pida-connectivity-graph.mp4 -an \
  -vf "crop=CW:CH:CX:CY,scale=W:-2:flags=lanczos" \
  -c:v libvpx-vp9 -crf 33 -b:v 0 -row-mt 1 -deadline good -cpu-used 1 \
  -pass 2 -map_metadata -1 video/pida-connectivity-graph-W.webm

# Optional AV1 in MP4
ffmpeg -i masters/pida-connectivity-graph.mp4 -an \
  -vf "crop=CW:CH:CX:CY,scale=W:-2:flags=lanczos" \
  -c:v libsvtav1 -crf 34 -preset 6 -pix_fmt yuv420p \
  -movflags +faststart -map_metadata -1 video/pida-connectivity-graph-W.av1.mp4

# Poster: a chosen frame, not frame 0 if frame 0 is blank. The canonical name is {base}-poster.jpg (0.3).
ffmpeg -ss 00:00:02 -i masters/pida-connectivity-graph.mp4 \
  -vf "crop=CW:CH:CX:CY" -frames:v 1 -q:v 2 -map_metadata -1 \
  posters/pida-connectivity-graph-poster.jpg
```

Use `/dev/null` instead of `NUL` on macOS and Linux. The crop values come from `assets/crops.json` (C9.5). The same commands serve `pida-isolation-flowpath`.

### C9.3 Video markup and playback rules

`{W}` and `{H}` below are the measured width and height of the encoded rendition.

```html
<video
  muted loop playsinline preload="none"
  width="{W}" height="{H}"
  poster="/media/posters/pida-isolation-flowpath-poster.jpg"
  aria-label="Screen recording: a flow path and an isolation plan shown on the drawing"
  aria-describedby="desc-m10"
  data-pida="video" data-asset="M10">
  <source data-src="/media/video/pida-isolation-flowpath-{W}.webm" type='video/webm; codecs="vp9"'>
  <source data-src="/media/video/pida-isolation-flowpath-{W}.mp4" type='video/mp4; codecs="avc1.640029"'>
</video>
<p id="desc-m10">...the text description of C21.4...</p>
```

If the optional AV1 file exists, its `<source>` goes first. If a captions file exists (C9.4), add a `<track kind="captions" srclang="en" label="On-screen steps">`.

Rules (0.4, Video):

- `muted`, `loop`, `playsinline` and `preload="none"` are always set. The audio track is removed at encode time.
- The `autoplay` attribute is not written in the markup. The component starts playback when half of the video is visible (threshold 0.5) and pauses it when it leaves the screen. This keeps off-screen videos from downloading, and lets the reduced-motion and data-saver checks run first.
- Sources carry `data-src` and are promoted to `src` only when the video comes within 200 px of the viewport. Below 768 px the component promotes the `-960` set if it exists. With data saver on, it stays on the poster until the visitor presses play.
- A visible pause / play toggle is always present (it also meets WCAG 2.2.2). It is a real button with `aria-pressed` and the names "Pause recording" and "Play recording". A pause chosen by the visitor is remembered for the page view.
- A visible "Open larger" button opens the recording in the lightbox with full native controls.
- The poster has exactly the aspect of the video, and `width` and `height` are always set, so nothing shifts. In section 02, M3 serves as the poster only if its cropped aspect equals that of M4 to within one pixel row. Otherwise the derived `pida-connectivity-graph-poster.jpg` is the poster and M3 is the still shown without JavaScript, under reduced motion and in print.
- Under reduced motion: poster and click to play.
- The hero has no video. M2 is a still.
- Analytics (`asset` is the media ID of 0.3, `M4` or `M10`): `video_view {asset}` once per page view when the video has been visible for 3 s; `video_toggle {asset, state}` with `state` of `paused` or `playing` on each press of the toggle.

Lazy loader (framework-neutral):

```js
const userPaused = new WeakSet();
const near = new IntersectionObserver((entries) => {
  for (const { target: v, isIntersecting } of entries) {
    if (isIntersecting && v.dataset.loaded === undefined) {
      for (const s of v.querySelectorAll("[data-src]")) s.src = s.dataset.src;
      v.load();
      v.dataset.loaded = "1";
    }
  }
}, { rootMargin: "200px 0px" });

const half = new IntersectionObserver((entries) => {
  for (const { target: v, isIntersecting } of entries) {
    if (isIntersecting && userPaused.has(v) === false && allowAutoplay()) v.play().catch(() => {});
    else v.pause();
  }
}, { threshold: 0.5 });
```

`allowAutoplay()` returns false under reduced motion and with data saver on.

### C9.4 Captions and text alternatives

The recordings are silent. There is no speech to caption. Accessibility is met as follows:

- Each video has a short visible caption from Part A and a text description (C21.4), linked with `aria-describedby`. The description is required.
- A WebVTT file of on-screen steps (`{base}.en.vtt`, `kind="captions"`, label "On-screen steps") is a should-have. Its cues can only be written while watching the recording, so the builder writes them after encoding, in plain statements of what happens on screen, and the founders check them. It is shown by default in the lightbox.
- Descriptions and cues obey the hard rules in 0.1, and they do not repeat the compatibility statement.

### C9.5 Stills: cropping

1. Open the master at 100 %.
2. Measure in pixels everything that must go: browser tabs, address bar and bookmarks bar; an operating-system task bar; for M6 the title bar, menus and any logo; for M7 everything outside the results table; for M1 the "Not generated" chip.
3. Record the crop rectangle in `assets/crops.json`, keyed by base name, as `{x, y, w, h}` in master pixels.
4. Crop at native resolution first, then resize. Never resize first.
5. Keep the natural aspect that results. Do not pad, and do not force a common aspect. Write the resulting width and height into `assets/media-facts.json` and into the component's `width` and `height` props.
6. Could-have (C6.2), never for M2: for narrow columns, produce one extra focused crop per still (suffix `-focus`). It shows the most telling region at a size that can be read. Examples: the PASS line in M1, the value legend in M5, the rows with 22 m³/h in M7, the cited clause in M8, the answer in M9.
7. Repeat the 200 % check of C9.1 on the cropped result, and log it in `qa/media-review-log.md`.

```bash
# ImageMagick: crop, then resize, metadata stripped
magick masters/pida-hydraulics-wizard.png -crop WxH+X+Y +repage -strip \
  -resize 1920x stills/pida-hydraulics-wizard-1920.png
```

### C9.6 Still formats, renditions and `srcset`

| Format | Settings | Role |
|---|---|---|
| AVIF | quality 55 to 60 for interface screenshots, 4:4:4 chroma so coloured thin lines stay sharp | First choice |
| WebP | quality 82, or lossless if smaller (flat interface shots often are) | Second choice |
| PNG | 8-bit palette by quantisation where banding allows, otherwise 24-bit, optimised | Fallback |

| Attribute | Value |
|---|---|
| Widths | 640, 960, 1280, 1920, and 2560 only where the cropped master is at least that wide |
| Naming | `{base}-{width}.{ext}`, focused crops `{base}-focus-{width}.{ext}` |
| Weight | Every rendition the page can load inline is at most 300 KB. The hero image is at most 200 KB at the width it is served on a laptop (0.4, Budgets). The lightbox rendition may be larger, because it loads only on request; keep it under 600 KB. |
| Social image | `pida-og-1200x630.png`, made from M2 (C13.1) |

```html
<picture>
  <source type="image/avif"
    srcset="/media/stills/pida-generated-pid-r101-640.avif 640w,
            /media/stills/pida-generated-pid-r101-960.avif 960w,
            /media/stills/pida-generated-pid-r101-1280.avif 1280w,
            /media/stills/pida-generated-pid-r101-1920.avif 1920w"
    sizes="(min-width: 1440px) 720px, (min-width: 1024px) 56vw, 92vw">
  <source type="image/webp" srcset="..." sizes="...">
  <img src="/media/stills/pida-generated-pid-r101-1280.png"
       width="{W}" height="{H}" loading="lazy" decoding="async"
       alt="...alt text from Part A...">
</picture>
```

- `sizes` for full-width media: `(min-width: 1600px) 1600px, 100vw`.
- Only the hero image uses `loading="eager"` and `fetchpriority="high"`, and only it is preloaded.
- In Framer and Webflow, the platform image pipeline produces its own renditions. Upload the largest PNG crop, check that the delivered format is AVIF or WebP, and check the weights against C14. If the platform's compression smears thin lines, serve the stills from the assets host and use an Embed or a code component.

---

## C10. Authentication and trial sign-up

### C10.1 Scope

This section builds the sign-up design of 0.4. In short:

- The only action is "Sign up for trial". The only methods are "Continue with Google" and "Continue with LinkedIn".
- It happens on the page `/trial`, by a top-level redirect to the provider and back. There is no modal, no pop-up window, no password form, no email-link form, no CAPTCHA and no account area. The site never promises a hosted product login.
- Consent is the line under the buttons, with no checkbox. Pressing a button is the act of consent; the back end records the consent version and the time.
- The result of a sign-up is one row in `trial_signups` (C10.7), one confirmation email to the person, and one internal notice to the founders (C10.8). There is no second email.
- What the trial delivers is an open decision (0.6, D1). Until it is made, every surface says only "We will email you with the next step."

C10.7 (data), C10.8 (email), C10.9 (error codes), C10.11 (welcome form) and C10.12 (withdrawal, export, bounces) apply to both options below. C10.3 to C10.6 and C10.10 describe option B; option A must behave the same way as seen from the site.

### C10.2 Where it runs, and who builds it

Framer and Webflow sites are static front ends. They cannot hold a client secret or verify a token. The code exchange and the database write must run somewhere the founders control. The founders name the owner (0.6, D2).

| Option | What it is | For | Against |
|---|---|---|---|
| **A. Managed auth back end (default)** | A hosted service with Google and LinkedIn (OpenID Connect) built in, a Postgres table the founders can open and export as CSV, and small server functions for the email hook. Supabase is one such service and is the worked example below. | Token validation, provider setup and the table view come with it. Three server functions (`signup`, `welcome`, `withdraw`), the email retry and the bounce hook must still be written: about 200 lines of TypeScript, half a day to one day for a developer. The builder configures the providers and the table; a developer named by the founders writes the functions (0.6, D2). | One more processor of personal data, to be named in the privacy notice. Some behaviour needs JavaScript (see below). |
| **B. Hand-written auth service** | Serverless functions on `auth.PIDA_DOMAIN`, using a maintained OpenID Connect client library, plus a managed Postgres database (C10.3 to C10.10). | Works fully without JavaScript. No per-user fees. Personal data goes only to systems the founders chose. | Needs a developer for one to two days, and someone must own about 300 lines of security-relevant code and its updates. |

In the hand-coded route, option B's functions may live in the site repo behind the same paths.

**Option A, step by step (worked example; check each step against the service's current documentation at build time):**

1. A founder creates the project under a company account, in an EU region, and invites the builder. Set a custom domain for the project, `auth.PIDA_DOMAIN`, so that the provider's consent screen and the redirect URLs show PIDA's own domain.
2. Enable the two providers: Google, and LinkedIn (OpenID Connect). Paste each provider's client id and secret (C10.5). The redirect URI registered with each provider is the back end's callback URL on `auth.PIDA_DOMAIN`.
3. Set the site URL to `https://PIDA_DOMAIN` and the redirect allow-list to exactly `https://PIDA_DOMAIN/trial/welcome` and the staging equivalent. Switch off email and password sign-up and every other provider.
4. The two buttons on `/trial` are plain links to the back end's authorise URL, with `provider=google` or `provider=linkedin_oidc` and `redirect_to=https://PIDA_DOMAIN/trial/welcome`. They work without JavaScript.
   - UTM values in option A: the managed back end's authorise URL does not carry arbitrary parameters through to the `signup` function. So the `/trial` script appends the three `utm_*` values to the `redirect_to` URL as query parameters. The welcome script reads them, sends them in the body of the `signup` call and removes them with `history.replaceState` together with the fragment. Check that the back end's redirect allow-list pattern (step 3) accepts the query string; if it does not, UTM values are dropped in option A and the UTM columns stay null.
5. Create the table `trial_signups` (C10.7) with row-level security on and no public policy. Only the server functions, which use the service key, can read or write it.
6. Write one server function, `signup`, and call it from the welcome page (below). It does what steps 9 to 12 of C10.4 do: reads the verified claims of the signed-in user, refuses an unverified email, inserts or finds the row, sends the emails (C10.8), sends the `signup_success` event (C12.3), and answers `{"status": "new"}`, `{"status": "returning"}` or `{"error": "<code of C10.9>", "ref": "<id>"}`.
7. Write a second function, `welcome`, for the optional form (C10.11), and a third, `withdraw` (C10.12).
8. The back end's own user record may hold a profile picture URL that the provider sent. 0.4 forbids storing one. The `signup` function removes the `picture` and `avatar_url` keys from the user's metadata on every sign-in. Check in the table view during QA that none remains.
9. The founders open the table in the back end's dashboard, behind multi-factor sign-in, and export it as CSV from there.

What the welcome page does in option A. The back end returns the visitor to `/trial/welcome` with a session token in the URL fragment. A small inline script, placed before any analytics script:

1. reads the token from `location.hash` (and the three `utm_*` values from the query string, step 4 above) into memory and immediately removes the fragment and those parameters with `history.replaceState`, so the token never reaches analytics, the referrer or the history;
2. calls the `signup` function with the token as a bearer header;
3. on `new`, leaves the page as it is; on `returning`, shows the returning words of A7.4 (C6.4); on an error, navigates to `/trial/error?code={code}&ref={ref}`;
4. keeps the token in memory for the optional form, and never writes it to a cookie, `localStorage` or `sessionStorage`.

If the provider returns an error, the back end returns to the site with `error` parameters instead of a token; the script maps them to `cancelled` or `server` and navigates to `/trial/error`. Without JavaScript the sign-in at the provider still succeeds, but the row and the email are created by the `signup` call, so in option A the welcome page needs JavaScript. Put a `<noscript>` line on `/trial/welcome`: "Please switch JavaScript on and open this page again to finish signing up." This limit is the price of option A; option B does not have it.

### C10.3 Endpoints of the hand-written service (option B)

| Method and path | Purpose |
|---|---|
| `GET /login/google` | Starts the Google flow. Accepts `utm_source`, `utm_medium` and `utm_campaign`. |
| `GET /login/linkedin` | Starts the LinkedIn flow. Same parameters. |
| `GET /callback/google` | Google redirect URI |
| `GET /callback/linkedin` | LinkedIn redirect URI |
| `POST /welcome` | Saves the optional form (C10.11) |
| `GET /withdraw`, `POST /withdraw` | Withdrawal (C10.12) |
| `POST /hooks/email` | Bounce and failure webhook of the email service, signature verified (C10.12) |
| `GET /healthz` | Uptime check, no data |

There is no `return` parameter and no other way to steer the redirect. The service redirects only to fixed URLs on `PIDA_DOMAIN`, so there is no open redirect.

### C10.4 Flow (authorisation code flow, confidential client)

1. The visitor presses a provider button on `/trial`. The browser navigates (top level) to `/login/{provider}`.
2. The service creates `state` (32 random bytes), `nonce` (32 random bytes) and a PKCE `code_verifier` with its S256 `code_challenge`.
3. The service stores these values, plus the UTM values (each cut to 100 characters and stripped of control characters), the current consent version and a timestamp, in an encrypted and signed cookie `__Host-pida_oidc`:
   - attributes `Secure`, `HttpOnly`, `SameSite=Lax`, `Path=/`, 10-minute lifetime
   - `SameSite=Lax` is required, because the provider returns by a top-level GET
4. The service redirects to the provider's authorisation endpoint with `response_type=code`, `client_id`, `redirect_uri`, `scope`, `state` and `nonce`. For Google it also sends `code_challenge` and `code_challenge_method=S256`.
5. The provider redirects to `/callback/{provider}` with `code` and `state`, or with `error`.
6. The service compares `state` with the cookie in constant time, deletes the cookie, and rejects on mismatch or expiry.
7. The service exchanges the code server to server at the token endpoint. It sends `client_id`, `client_secret`, `redirect_uri` and `code`, and the `code_verifier` where PKCE was used.
8. The service validates the ID token against the provider's JWKS. It checks the signature, `iss`, `aud` (equals our `client_id`), `exp`, `iat` (with up to 60 s of skew), and `nonce` where the token carries one.
9. The service reads the claims `sub`, `email`, `email_verified`, `given_name`, `family_name` and `locale`. For LinkedIn it calls the userinfo endpoint with the access token if a claim is missing from the ID token. It ignores `picture` and every other claim.
10. If there is no email, reject with `no_email`. If `email_verified` is not true, reject with `email_unverified`. This is how a LinkedIn account without a verified email is refused (0.4).
11. Look the person up by normalised email.
    - New: insert the row with the consent version from the cookie and the current time as consent time. Queue the confirmation email and the internal notice. Send `signup_success {provider}` to analytics from the server (C12.3).
    - Returning (the same person, with either provider): change nothing in the row. Queue the confirmation email again, unless one was sent in the last two minutes.
12. Discard the access token and the ID token. Nothing from the provider is kept except the columns of C10.7.
13. Set the cookie `__Host-pida_welcome` (the signed row id; `Secure`, `HttpOnly`, `SameSite=Lax`, 30 minutes) for the optional form. Redirect with `303` to `https://PIDA_DOMAIN/trial/welcome`, or to `https://PIDA_DOMAIN/trial/welcome?state=returning`. There are no personal data in the URL.

On any rejection the service redirects with `303` to `https://PIDA_DOMAIN/trial/error?code={code}&ref={id}`, where `{id}` is an 8-character correlation id of capital letters and digits that also appears in the log.

### C10.5 Provider configuration (both options)

**Google (OpenID Connect)**

| Item | Value |
|---|---|
| Discovery | `https://accounts.google.com/.well-known/openid-configuration` |
| Issuer | `https://accounts.google.com` |
| Scopes | `openid email profile` |
| PKCE | Yes, S256, in addition to the client secret |
| Extra parameters | `prompt=select_account`. Do not request offline access. No refresh token is needed. |
| Console setup | Consent screen with the app name "PIDA", a support email (0.6, D3 or D4), home page `https://PIDA_DOMAIN`, and the privacy and terms URLs. The domain must be verified. These three scopes are non-sensitive, so no security assessment is required. Brand verification is needed for the name and logo to show; until a logo exists (0.6, D7) submit the interim wordmark on a cobalt square. |
| Authorised redirect URIs | Exactly the URIs in C10.6. No wildcards. |

**LinkedIn ("Sign In with LinkedIn using OpenID Connect")**

| Item | Value |
|---|---|
| Discovery | `https://www.linkedin.com/oauth/.well-known/openid-configuration` |
| Issuer | `https://www.linkedin.com/oauth` |
| Authorisation endpoint | `https://www.linkedin.com/oauth/v2/authorization` |
| Token endpoint | `https://www.linkedin.com/oauth/v2/accessToken` |
| Userinfo endpoint | `https://api.linkedin.com/v2/userinfo` |
| JWKS | `https://www.linkedin.com/oauth/openid/jwks` |
| Scopes | `openid profile email` |
| PKCE | LinkedIn's standard web flow is a confidential-client flow with a client secret. Its PKCE variant is meant for native apps. Send `state` always. Send `nonce` and validate it if the ID token returns it. Do not fail the sign-in only because the claim is absent. Protection in this flow comes from the server-side exchange with the secret, the exact redirect URI and `state`. Re-check LinkedIn's documentation at build time. |
| Developer portal setup | Create the app, associate it with the company's LinkedIn Page, add the product "Sign In with LinkedIn using OpenID Connect", and set the redirect URLs from C10.6. LinkedIn requires a company Page for this. If none exists, a founder must create one first; this input is not in the list of 0.6 and the builder should ask for it on day one. |
| Button label | Check LinkedIn's brand rules for the permitted button wording before launch (0.4). |

### C10.6 Redirect URIs and environments

| Environment | Site origin | Redirect URIs | Sign-in clients |
|---|---|---|---|
| Local (option B only) | `http://localhost:4321` (or the builder's preview) | `http://localhost:8787/callback/google`, `http://localhost:8787/callback/linkedin` | Separate "dev" client per provider |
| Staging | `https://staging.PIDA_DOMAIN` | Option B: `https://auth-staging.PIDA_DOMAIN/callback/google` and `.../callback/linkedin`. Option A: the callback URL of the staging project. | Separate "staging" client per provider |
| Production | `https://PIDA_DOMAIN` | Option B: `https://auth.PIDA_DOMAIN/callback/google`, `https://auth.PIDA_DOMAIN/callback/linkedin`. Option A: the callback URL on `auth.PIDA_DOMAIN`. | Production client per provider |

- Secrets live only in the secret store of the function host or of the managed back end: `GOOGLE_CLIENT_SECRET`, `LINKEDIN_CLIENT_SECRET`, `COOKIE_KEY`, `WITHDRAW_KEY`, `DATABASE_URL`, `EMAIL_API_KEY`, `EMAIL_WEBHOOK_SECRET`, `ANALYTICS_SERVER_KEY`.
- Secrets never go in the site builder, in git, or in client-side code.
- Rotate them on any change of staff, and at least yearly.
- The production domain, the sender address and the legal entity come from 0.6, D3. Build against the staging addresses until they arrive; do not launch without them.

### C10.7 Data model (both options)

One table, one row per person. The personal columns are exactly the list of 0.4; nothing else about the person is kept.

`trial_signups`

| Column | Type | Null | Notes |
|---|---|---|---|
| `id` | uuid, primary key | no | Generated server side |
| `provider` | text (`google` or `linkedin`) | no | The provider of the first sign-up |
| `provider_sub` | text | no | The provider's subject id. Unique together with `provider`. |
| `email` | text | no | As returned by the provider |
| `email_verified` | boolean | no | Must be true to insert |
| `given_name` | text | yes | |
| `family_name` | text | yes | |
| `company` | text | yes | From the optional form, at most 120 characters |
| `role` | text | yes | From the optional form, at most 120 characters |
| `product_updates_opt_in` | boolean | no | Default false. True only if the person ticked the box. |
| `consent_version` | text | no | The version of the Trial terms and Privacy notice in force when the button was pressed, for example `2026-10-01`. It is a configuration value that the builder changes whenever either text changes. |
| `consented_at` | timestamptz | no | The time the button was pressed and the sign-in completed |
| `created_at` | timestamptz | no | |
| `utm_source`, `utm_medium`, `utm_campaign` | text | yes | At most 100 characters each, stripped of control characters |
| `locale` | text | yes | The provider's `locale` claim |

Operational columns. They hold nothing new about the person and exist so that the rules of 0.4 can be carried out:

| Column | Type | Notes |
|---|---|---|
| `email_normalised` | text, unique | `email`, trimmed and lower-cased. It makes the same person with the second provider a returning sign-up. |
| `confirmation_sent_at` | timestamptz | The last successful send. Used for the two-minute guard and for retries. |
| `email_status` | text | `queued`, `sent`, `bounced` or `failed` (C10.12) |

Not stored: access tokens, ID tokens and refresh tokens; the profile picture or its URL; any profile data beyond the claims above; the IP address, in raw or hashed form; the user agent string; the button location.

Data protection notes for the privacy notice (the text itself is 0.6, D8):

- Purpose: handling the trial request and writing to the person about it. Product updates only if they opted in.
- The two sign-in providers are named in the notice as sign-in providers (0.1, exemption a). The email service, the host and, in option A, the managed back end are listed as processors.
- Retention: a period the founders set in the notice. After it, rows with no trial are deleted.
- Withdrawal deletes the row (C10.12). Access and erasure requests also go to the contact address (0.6, D4).
- The database and the functions run in an EU region. The database accepts connections from the functions only. The founders reach it through a console with multi-factor sign-in.

### C10.8 Confirmation email and internal notice

- Sent through a transactional email service from the sender address of 0.6, D3. SPF, DKIM and DMARC are configured on the domain (DMARC policy at least `quarantine`).
- Plain text plus simple HTML, in ink on white, with the wordmark as text. There are no tracking pixels and no link rewriting; switch both off in the email service.
- The wording of both messages is that of A7.8: subject, preheader, body, footer and sign-off. This part gives no fallback text. The builder changes the wording on request (0.4, Editing).
- If `given_name` is missing, the greeting is "Hello,".
- The email states no delivery time, no install step, no payment detail and no login (0.4). It does not name the sign-in provider, so it needs no allow-list entry in the banned-terms check.
- The footer carries the company's legal details from 0.6, D3. Without them the email cannot go live.
- The internal notice goes to a founders' mailbox only. It contains the given name, family name, email, provider, UTM source, and later the company and role if the form was saved. A bounce adds a second notice (C10.12).
- A returning sign-up gets the same email again (0.4), guarded to one send per two minutes.

### C10.9 Error codes (both options)

The callback, or in option A the welcome script, sends the visitor to `/trial/error?code=...&ref=...`. The page maps the code to fixed text. It shows `ref` only if it matches `^[A-Z0-9]{8}$`. It never echoes any other query parameter.

These are the canonical codes (0.4). The words shown are those of A7.6. Where A7.6 has no line for a code, use the fallback in the last column.

| Code | Cause | Fallback text |
|---|---|---|
| `cancelled` | The provider returned `access_denied`, or the visitor closed the consent screen | "Sign-in was cancelled. Nothing was saved. You can try again." |
| `expired` | `state` missing, mismatched, or older than 10 minutes | "That sign-in took too long or was opened in another tab. Please start again." |
| `email_unverified` | The provider says the email is not verified | "The email address of that account is not verified with the provider. Verify it there, or use the other option." |
| `no_email` | No email claim | "We could not read an email address from that account. Please use the other option." |
| `provider_down` | Token or JWKS endpoint failed or timed out (5 s timeout, one retry) | "The sign-in provider did not respond. Please try again in a few minutes." |
| `rate_limited` | The edge rate limit was hit | "Too many attempts. Please wait a few minutes and try again." |
| `server` | Anything else, and any unknown code | "Something went wrong on our side. Please try again." |

- Every error page carries the small line "Reference: {id}" under the message (0.4).
- The provider buttons exist on `/trial` only (0.4). Every error page offers a secondary button "Try again" that links to `/trial` (A7.6) and sends `cta_click {location: trial-page}`, the button "Back to the home page" where A7.6 lists it, and the contact line if D4 is supplied.
- If pop-ups or third-party cookies are blocked, nothing breaks. The flow uses top-level redirects and first-party cookies on the auth host only.
- The page sends `signup_error {code}`.

### C10.10 Abuse protection

- There is no CAPTCHA (0.4). The provider sign-in is the bot gate.
- Rate limits are applied by IP at the edge, in the edge provider's own short-lived counters. The IP address is never written to the database or to the logs, neither raw nor hashed.
  - `/login/*`: 10 per minute and 50 per hour per IP
  - `/callback/*`: 20 per minute per IP
  - `/welcome`, `/withdraw`: 10 per minute per IP
  - an alarm on a global ceiling
- `state` is single-use. Callbacks without the cookie are rejected before any provider call.
- The two-minute guard stops a loop of sign-ins from sending a stream of emails.
- The only free-text inputs are Company and Role. They are cut to 120 characters, stripped of control characters and of angle brackets, stored as text, and always escaped when shown.
- Alerts are raised for a callback error rate above 5 % over 15 minutes, for any `server` error, and for sign-ups per hour above an agreed ceiling.
- Logs contain the correlation id, provider, outcome code and timing. They contain no tokens, no emails, no names and no IP addresses.
- In option A these limits are the managed back end's own rate limits; set them to the nearest values it offers.

### C10.11 The optional welcome form

- Fields and labels are in C6.4. Nothing is required. The skip link and simply leaving the page are both fine.
- Option B: a plain HTML form that posts to `https://auth.PIDA_DOMAIN/welcome`. It works without JavaScript. The service reads the row id from the `__Host-pida_welcome` cookie, checks that the `Origin` header is the site's origin, saves `company`, `role` and `product_updates_opt_in`, deletes the cookie, and redirects with `303` to `/trial/welcome?state=saved`. With no valid cookie it saves nothing and redirects to `/trial/welcome?state=form_expired`. `auth.PIDA_DOMAIN` and `PIDA_DOMAIN` are the same site, so the `SameSite=Lax` cookie travels with the post.
- Option A: the script of C10.2 sends the same three values to the `welcome` function with the in-memory token, then shows the saved line. If the token is gone (the page was reloaded), it shows the expired line.
- The form never shows or pre-fills the person's name or email.
- A saved form triggers an update of the internal notice (C10.8).

### C10.12 Withdrawal, the founders' view, bounces and retries

**Withdrawal (B FR-34).** The confirmation email carries `{withdraw_link}`: `https://auth.PIDA_DOMAIN/withdraw?t={token}`, where the token is the row id signed with `WITHDRAW_KEY`. It does not expire while the row exists.

- `GET /withdraw` shows a minimal page on the auth host: the line "Delete the details you gave us when you signed up for a PIDA trial?" and one button, "Delete my details". A GET never deletes, because mail scanners follow links.
- `POST /withdraw` deletes the row for good, sends the founders a notice that contains no personal data beyond the date, and redirects with `303` to `https://PIDA_DOMAIN/trial?state=withdrawn`.
- An invalid token shows "This link is no longer valid." and the contact line if D4 is supplied.

**The founders' view and CSV export (B FR-33).** Option A: the table view of the managed back end, with its CSV export. Option B: the console of the managed Postgres host behind multi-factor sign-in, plus the script `scripts/export-signups.mjs`, which writes a CSV of the columns of C10.7 to the founder's own machine. There is no admin page on the public site.

**Retries.** The email is sent from a queue, not inside the callback. A failed send is retried after 1 minute, 5 minutes and 30 minutes. After the third failure `email_status` becomes `failed` and the founders get a notice.

**Bounces.** The email service calls `POST /hooks/email` (signature checked with `EMAIL_WEBHOOK_SECRET`). A hard bounce or a complaint sets `email_status` to `bounced` and sends the founders a notice, so that they do not keep writing to a dead address.

---

## C11. Forms and contact

- There is no contact form. The route for someone who will not sign up is the contact line of 0.5, "Investor or partner? Write to {role address}.", in the final block and in the footer. The address is a plain `mailto:` link to a role-based address with no person's name in it (0.6, D4). If D4 is not supplied, the line is left out everywhere.
- The only form on the site is the optional one on `/trial/welcome` (C10.11). It posts to the auth back end, not to a site builder's form store, so personal data stays in one place.
- No newsletter form exists. Product updates are offered only through the unticked box on the welcome form.

---

## C12. Analytics and consent

### C12.1 Tooling

| Option | Consent needed | Recommendation |
|---|---|---|
| 1. Cookieless, privacy-focused page analytics (EU-hosted or self-hosted) with custom events and a server-side events endpoint | Yes on this site: 0.7 and B FR-42 require consent before any analytics; the banner of C12.2 is shown for either option. | Default at launch |
| 2. Tag-based analytics that stores identifiers on the device | Yes. Every storage signal is denied by default and only analytics storage may be granted. | Only if the founders need its reports. Its script host would also have to be added to the CSP and cleared against the banned-terms check (C17.3), which it is likely to fail. |

The builder chooses the product within option 1. The founders confirm the choice, because it is named in the privacy notice.

### C12.2 Consent

- `ConsentBanner` shows two buttons of equal size and weight: "Accept analytics" and "Decline" (0.4). There is no pre-ticked box and no "legitimate interest" toggle.
- Until a choice is made, and after "Decline", no analytics script is loaded and no event is sent from the page. The one server-side event, `signup_success` (C12.3), is outside the banner: it carries no identifier of the person or the device.
- The choice is kept in a first-party cookie, `pida_consent`, for 6 months. "Cookie settings" in the footer reopens the banner.
- Advertising signals stay denied whatever the choice, because the site runs no ads.
- The cookies of C10 are strictly necessary for sign-in and sit outside the banner.
- The banner is a non-modal region at the bottom of the page, paper-2 fill with a 1 px `rule` line on top, one sentence in `small` with a link to `/legal#cookies`. It does not cover the header or the hero button on a 360 px screen.

```js
// Generic shape; adapt to the chosen tool's API.
const consent = readCookie("pida_consent");            // "granted", "denied" or null
if (consent === "granted") loadAnalytics();
onBannerChoice((granted) => {
  writeCookie("pida_consent", granted ? "granted" : "denied", { days: 182 });
  if (granted) loadAnalytics();
});
```

### C12.3 Events

These are the canonical names of 0.4. Do not add, rename or split events.

| Event | When | Properties |
|---|---|---|
| `cta_click` | A "Sign up for trial" button or link is pressed | `location`: `header`, `hero`, `mid`, `final`, `trial-page` or `404` (C2) |
| `section_view` | Half of a block has been visible for 1 s, once per page view | `section_id`: `top`, `proof`, `pid-making`, `connectivity`, `hydraulics`, `safety`, `isolation`, `answers`, `how-it-fits`, `trust`, `compatibility`, `trial` |
| `video_view` | A video has been visible for 3 s, once per page view | `asset`: the media ID of 0.3, `M4` or `M10` |
| `video_toggle` | The pause / play toggle is pressed | `asset`, `state`: `paused` or `playing` |
| `lightbox_open` | The lightbox opens | `asset`: the media ID of 0.3 (`M1` to `M10`), so a still and a recording that share a base name stay apart |
| `signup_start` | A provider button on `/trial` is pressed | `provider`: `google` or `linkedin` |
| `signup_success` | A new row was created. **Sent by the server**, never by the page. | `provider` |
| `signup_error` | `/trial/error` is viewed | `code` (C10.9) |
| `outbound_click` | A link that leaves the site is pressed (legal links, `mailto:`) | `href`, with any query string removed; for `mailto:` the value is the word `mailto` and not the address |
| `graph3d_interact` | First drag or node hover in the 3D scene. Only if the scene ships. | none |

- `signup_success` is sent from the back end to the analytics tool's server-side endpoint, with the provider as its only property and no identifier of the person or the device. It is always sent for a new row, whatever the banner choice, so the server count covers everyone (B2).
- Never send names, emails, provider subject ids, reference ids or full URLs with query strings. Page paths are sent without their query string; the three `utm_*` values are sent as campaign properties.
- A repeat sign-up sends no `signup_success`.
- Funnel to report: `section_view {top}`, then `cta_click`, then `signup_start`, then `signup_success`, split by `location` and by UTM source.

### C12.4 What the storage statement on `/legal#cookies` lists

The statement is a plain table of everything the site puts on a device. With the defaults of this part it has these rows:

| Name | Set by | Purpose | Lifetime | Needed |
|---|---|---|---|---|
| `__Host-pida_oidc` | `auth.PIDA_DOMAIN`, when a sign-up button is pressed (option B) | Carries the sign-in through the redirect to the provider and back | 10 minutes | Strictly necessary |
| `__Host-pida_welcome` | `auth.PIDA_DOMAIN`, after sign-up (option B) | Lets the optional form be saved to the right sign-up | 30 minutes | Strictly necessary |
| The managed back end's sign-in cookies | `auth.PIDA_DOMAIN` (option A) | The same two purposes. List the actual names from the browser's storage panel. | as observed | Strictly necessary |
| `pida_consent` | The site | Remembers the analytics choice | 6 months | Strictly necessary |

The site uses no `localStorage` and no `sessionStorage`. If that changes, the table changes first.

---

## C13. SEO technicals

### C13.1 Head, per page

```html
<html lang="en">
<title>PIDA - Pharma Industry Design Automation</title>
<meta name="description" content="PIDA automates the early process-design work of a pharma plant. Every result is traceable to its source. Same specification in, same drawing out.">
<link rel="canonical" href="https://PIDA_DOMAIN/">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#F3F0E8">
<meta name="color-scheme" content="light">

<meta property="og:type" content="website">
<meta property="og:site_name" content="PIDA">
<meta property="og:title" content="PIDA: pharma process design automation">
<meta property="og:description" content="A P&amp;ID in 30 seconds. A hydraulic model in under a minute. Every line, value and answer traceable to its source.">
<meta property="og:url" content="https://PIDA_DOMAIN/">
<meta property="og:image" content="https://PIDA_DOMAIN/og/pida-og-1200x630.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="The PIDA wordmark beside a generated reactor P&amp;ID sheet.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://PIDA_DOMAIN/og/pida-og-1200x630.png">
```

- Final titles and descriptions come from Part A (A8.1, A8.2). The `title` and `description` strings above are fallbacks. The `og:` strings are those of A8.3, and `og:image:alt` is ALT-14. The title tag is one of the places where the word "Reimagined" is allowed (0.4); `og:title`, `og:description` and the meta description do not carry it (A8.3). `og:site_name` is "PIDA" (0.4).
- No meta tag repeats the compatibility statement or names a product of another company.
- There is one social image, `pida-og-1200x630.png`, used by every page. Design per A8.3: paper background (`#F3F0E8`); on the left the interim wordmark "PIDA", the line "Pharma Industry Design Automation" in Barlow Condensed and the two speed claims of 0.1 rule 7 in mono, in their exact words; on the right a crop of M2 with the 1 px `rule` border. No dark screenshots and no text under 28 px. Keep the text inside the central safe area, export as PNG under 300 KB, and run the 200 % check of C9.1 on the M2 crop.
- Favicons: there is no logo yet, so the icon is the letter P in Barlow Condensed 600, paper colour, on a cobalt square with the 2 px radius scaled up (0.3). Deliver `favicon.ico` (32), `icon.svg`, `apple-touch-icon.png` (180) and `manifest.webmanifest` with 192 and 512 icons. Replace them when the logo arrives (0.6, D7).
- `/trial/welcome`, `/trial/error`, `/404` and all staging hosts carry `noindex, nofollow`. Staging is also protected by a password.

### C13.2 Structured data

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://PIDA_DOMAIN/#org",
      "name": "PIDA",
      "alternateName": "Pharma Industry Design Automation",
      "url": "https://PIDA_DOMAIN/"
    },
    {
      "@type": "WebSite",
      "@id": "https://PIDA_DOMAIN/#website",
      "url": "https://PIDA_DOMAIN/",
      "name": "PIDA",
      "publisher": { "@id": "https://PIDA_DOMAIN/#org" }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://PIDA_DOMAIN/#software",
      "name": "PIDA",
      "alternateName": "Pharma Industry Design Automation",
      "applicationCategory": "DesignApplication",
      "description": "Automates the early process-design work of a pharma plant. Every result is traceable to its source.",
      "url": "https://PIDA_DOMAIN/",
      "featureList": [
        "P&ID generation with an independent check on every drawing",
        "Project-wide P&ID connectivity graph",
        "Hydraulic model automation with every value marked given, sourced, assumed or empty",
        "Safety questions answered from the drawing's own facts",
        "Flow path and isolation views on the drawing",
        "Engineering answers from held documents, with clause and page"
      ],
      "publisher": { "@id": "https://PIDA_DOMAIN/#org" }
    }
  ]
}
</script>
```

The `featureList` has six items, one per section subject, in page order (0.4, Metadata). The six strings are those of A8.6, because Part A owns words.

Deliberately left out:

- `logo`: there is no logo yet. Add it to `Organization` when 0.6, D7 delivers one.
- `offers` and `price`: there is no pricing on the site.
- `aggregateRating` and `review`: there are no testimonials.
- `author`, `founder` and `employee`: there are no names of people.
- `operatingSystem`: left out until the founders state it.

Without `offers` or ratings the page will not qualify for the software rich result. That is accepted. If the FAQ ships, do not add `FAQPage` markup until the answers that depend on 0.6, D1 and D5 are final.

### C13.3 Crawling

`robots.txt` in production:

```
User-agent: *
Allow: /
Disallow: /trial/welcome
Disallow: /trial/error
Sitemap: https://PIDA_DOMAIN/sitemap.xml
```

- On staging, `robots.txt` contains `Disallow: /`. The auth host serves `Disallow: /`.
- `sitemap.xml` lists `/`, `/trial`, `/privacy`, `/terms` and `/legal`, each with `lastmod`.
- Use one canonical host (0.6, D3). Either `www` or the apex redirects to the other with a 301. HTTP redirects to HTTPS. The trailing-slash policy is fixed and consistent.
- There is one `h1` per page. Section titles are `h2`. Heading levels are never skipped.
- `VideoObject` JSON-LD for the two recordings is optional. Add it only if each has a stable URL, a thumbnail and the description of C21.4.

---

## C14. Performance budgets

Measurement:

- Lab runs use Lighthouse mobile emulation (slow 4G, 4x CPU throttle) on `/`. Take the median of 5 runs.
- Field data uses the 75th percentile, once traffic allows.
- The reference laptop for the optional 3D scene is a mid-range machine with integrated graphics.

Budgets of 0.4 (these are the launch gates):

| Metric | Budget |
|---|---|
| LCP | 2.5 s or less |
| CLS | 0.1 or less |
| INP | 200 ms or less |
| Lighthouse performance | at least 90 hand-coded, at least 80 on a site builder |
| Lighthouse accessibility | at least 95 on both |
| JavaScript, compressed, without the lazily loaded 3D scene | 300 KB or less. On Route C this is the total. On Routes A and B it is what the builder adds (GSAP, ScrollTrigger, CustomEase, site scripts), because the platform runtime is outside the builder's control (see the note under this table). |
| The 3D scene, if it ships | 1.5 MB or less, loaded lazily |
| First load (transfer before any scroll) | 1.5 MB or less |
| Any still rendition loaded inline | 300 KB or less |
| The hero image | 200 KB or less |
| Any video rendition | under 3 MB |

Routes A and B: the platform's own runtime can exceed 300 KB by itself. There the platform runtime and the 1.5 MB first-load figure are measured and reported to the founders in week one. An overshoot that the platform alone causes is recorded as a deviation from 0.4, Budgets; the builder is not asked to fix what the platform ships. The gates on Routes A and B are LCP, CLS, INP and Lighthouse performance of at least 80, plus the media weights.

Working targets of this part. They are not launch gates; they are how the gates are met:

| Item | Target |
|---|---|
| CLS | 0.02 |
| Total Blocking Time (lab) | 200 ms or less hand-coded, 350 ms or less on a site builder |
| JavaScript we add (GSAP core, ScrollTrigger, CustomEase, the site scripts) | 120 KB or less compressed |
| CSS | 50 KB or less compressed |
| Fonts | 7 files or fewer, 200 KB or less in total, 2 preloaded |
| Lighthouse best practices and SEO | at least 90 |
| Third-party origins at load | 2 or fewer (analytics, and the platform CDN if on a builder) |

How the budgets are met with video on the page:

- The LCP element is the preloaded hero image (M2) or the headline text. It is never a `<video>`, and the hero reveal does not hide it (C7.3).
- No video source is attached until the video is near the viewport. `preload="none"` is set everywhere.
- Every media box reserves its space with the measured `width` and `height` and CSS `aspect-ratio`.
- The pinned section uses `anticipatePin` and a fixed height, so pinning adds no shift.
- Loading order: GSAP loads with `defer`. The lightbox code loads on first open. The 3D runtime and scene, if they exist, load on intersection and idle.
- `content-visibility: auto` with `contain-intrinsic-size` is set on blocks below the fold (hand-coded route).
- Videos pause off screen. At most one video decodes at a time.
- Phones get the `-960` video renditions and never get WebGL.
- Fonts are self-hosted and subset, with fallback metrics. There are no render-blocking third-party stylesheets.
- HTTP caching is `immutable, max-age=31536000` on hashed media and fonts. HTML is revalidated.

---

## C15. Accessibility implementation notes

Target: WCAG 2.2 level AA.

- Landmarks are `header`, `nav` (labelled), `main` and `footer`. A skip link is the first focusable element.
- Every block of 0.2 is a `section` with `aria-labelledby` pointing at its heading. The proof strip and the compatibility band have a visually hidden `h2` ("Numbers from a real run", "Compatibility", A8.4) unless Part A gives them a visible one.
- The anchor nav updates `aria-current="true"` on the active item. The hash in the URL updates without stealing focus.
- Colour: follow the contrast table in C4.1. Accent colours carry meaning only together with text or shape. In section 05 amber means flow path and coral means isolation, and both are always labelled in words as well. In the `value-fill` diagram each state has a pattern and a word, not only a colour.
- The focus ring is visible on every interactive element: 2 px, 2 px offset, cobalt on light bands, on-dark on dark bands (A6.8, C3.9). Amber is not used for focus.
- Interactive targets are at least 24 by 24 CSS px. Buttons are at least 44 px high.
- There is no CAPTCHA and no puzzle anywhere in the sign-up (0.4), which also meets WCAG 3.3.8.
- `MediaFrame`:
  - Images have meaningful `alt` from Part A, describing the evidence on the screen and not "screenshot". Alt text obeys the hard rules in 0.1 and does not repeat the compatibility statement.
  - A frame that opens the lightbox is a button with the accessible name "Open image larger", described by its caption (C3.1).
  - Videos have an `aria-label`, the pause / play toggle, the "Open larger" button and a text description (C21.4).
- `Lightbox` and the mobile menu: focus moves in and returns to the opener on close. Escape closes. The background is inert. Scroll is locked without a layout shift.
- `GraphScene`, if it ships: the canvas is `aria-hidden`. The adjacent list of sheets and joins is the accessible equivalent and is keyboard operable (C8.3). A text summary states the counts: 6 sheets, 5 joins.
- Motion: see C7.4. Nothing flashes. No content depends on animation to become available.
- Reflow: there is no loss of content at 320 CSS px width or at 400 % zoom. Text spacing overrides do not clip.
- The pinned sequence must not trap keyboard users. All of its content is in the DOM in reading order, and tabbing moves through it. While focus is inside section 01, the pin is disabled and the section shows its stacked layout.
- Language: `lang="en"`.
- **Abbreviations** are expanded at first use on the page (0.4, Copy limits): P&ID (piping and instrumentation diagram), CIP (clean-in-place), HAZOP (hazard and operability study), PSV (pressure safety valve), MAWP (maximum allowable working pressure), GxP (good practice regulations).
  - "First use" means the first use in the main content, in reading order. The navigation does not count.
  - The six section titles are verbatim and cannot carry a bracket. If an abbreviation first appears in a title or in the H1, the expansion goes in the first sentence of body text that follows it.
  - Later uses may be wrapped in `<abbr title="...">`. The visible expansion is still required once, because `title` is not reliably announced or shown on touch.
  - The CI check in C17.3 confirms that each expansion string is present on `/` whenever its abbreviation is.
- Provider buttons use the accessible names "Continue with Google" and "Continue with LinkedIn". The logos are decorative (`alt=""`).
- Error pages and state lines: the error message is the `h1`; a `StateLine` has `role="status"`. There are no auto-redirects.
- The accessibility statement on `/legal#accessibility` says: the target (WCAG 2.2 AA); how the site was tested (the list below); the known limits (the recordings are silent screen recordings with text descriptions; the optional 3D scene has a list equivalent); how to report a problem (the contact address of 0.6, D4); and the date of the last review.
- Testing covers:
  - axe in CI (C17)
  - a manual pass with a keyboard only
  - one desktop screen reader and one mobile screen reader
  - 200 % and 400 % zoom
  - a forced-colours mode check
  - a print preview of `/` and of one legal page

---

## C16. Security headers and Content Security Policy

### C16.1 Headers (hand-coded route, or a CDN proxy in front of a site builder)

| Header | Value |
|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload`. Add `preload` only once every subdomain is on HTTPS. |
| `Content-Security-Policy` | see C16.2 |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()` |
| `Cross-Origin-Opener-Policy` | `same-origin` |
| `Cross-Origin-Resource-Policy` | `same-site` on media and fonts |
| `X-Frame-Options` | `DENY`. This is a legacy twin of `frame-ancestors`. |

### C16.2 CSP for the marketing site (strict form, hand-coded route)

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-{NONCE}' 'strict-dynamic';
  style-src 'self' 'nonce-{NONCE}';
  style-src-attr 'unsafe-inline';
  img-src 'self' data: blob:;
  font-src 'self';
  media-src 'self' blob:;
  connect-src 'self' https://auth.PIDA_DOMAIN {ANALYTICS_ORIGIN};
  worker-src 'self' blob:;
  child-src 'self' blob:;
  frame-src 'none';
  form-action 'self' https://auth.PIDA_DOMAIN;
  frame-ancestors 'none';
  base-uri 'self';
  object-src 'none';
  manifest-src 'self';
  upgrade-insecure-requests;
  report-to csp
```

Notes:

- `style-src-attr 'unsafe-inline'` is needed because GSAP writes inline `style` attributes. Attribute styles cannot run script. Keep `style-src` itself nonce-based. The inline `js-motion` script of C7.3 and the welcome script of C10.2 carry the nonce.
- `connect-src https://auth.PIDA_DOMAIN` is needed only in option A, for the calls from the welcome page. `form-action https://auth.PIDA_DOMAIN` is needed for the optional form in option B.
- **Sign-in.** Sign-in is a top-level navigation by plain link to `auth.PIDA_DOMAIN` and from there to the provider. CSP does not restrict link navigations, so no provider origin appears in the site's policy or in its source. Do not load either provider's JavaScript sign-in widget. It would add script and frame origins, a third-party cookie dependency and a pop-up, all of which 0.4 rules out.
- The provider endpoints are called from the server only and need no CSP entry.
- **The 3D scene, if it ships.**
  - If the scene file and runtime are self-hosted, nothing is added.
  - If they load from Spline's production host, add `https://prod.spline.design` to `connect-src` and the viewer script's origin to `script-src`. The better choice is a pinned self-hosted copy with Subresource Integrity.
  - Should the browser console report a WebAssembly compile block from the runtime, add `'wasm-unsafe-eval'` to `script-src`. Do not add it otherwise.
- Run the policy in `Content-Security-Policy-Report-Only` on staging for a full test pass before enforcing it.

### C16.3 CSP for the hand-written auth service

```
Content-Security-Policy: default-src 'none'; style-src 'nonce-{NONCE}'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'
Cache-Control: no-store
Referrer-Policy: no-referrer
```

The service returns redirects, and one small HTML page for withdrawal (C10.12). That page has a nonce-protected inline style, no script and one form that posts to itself.

### C16.4 On Framer or Webflow hosting

- Both platforms inject their own scripts and styles from their own CDNs. A nonce-based strict policy is not achievable there.
- If response headers cannot be set on the platform, put a CDN reverse proxy in front of the published site and add the headers of C16.1 there.
- Use an allow-list CSP there instead:
  - the platform's script, style, image, font and media origins, read from the published page's network log
  - `https://auth.PIDA_DOMAIN`
  - the analytics origin
  - the Spline origin, only if the scene ships from it
  - `'unsafe-inline'` for styles
- Start in report-only mode.
- Without a proxy, a `<meta http-equiv="Content-Security-Policy">` tag can carry most directives. It cannot carry `frame-ancestors` or reporting. Record this as an accepted limitation in the delivery notes.
- The platform's own host names appear in the page source. They are build tools, not terms banned by 0.1, but check the list in C17.3 against them once.

### C16.5 Other

- Subresource Integrity is set on any script not served from our own origin.
- No secrets go in client code. The only public identifiers are the analytics site id and the auth host name.
- Dependencies are pinned. Automated update pull requests and a weekly audit run on the auth service repo (option B).
- `/.well-known/security.txt` carries `Contact:` (a `mailto:` of the role address of 0.6, D4, or a dedicated security address from the founders), `Expires:` (one year ahead; renew it), `Preferred-Languages: en` and `Canonical:`. It names no person. Without a contact address the file cannot be valid, so it waits for D4.

---

## C17. Hosting, domains, environments and CI

### C17.1 Domains

| Host | Serves |
|---|---|
| `PIDA_DOMAIN` (canonical; apex or `www`, the other redirects with 301; 0.6, D3) | The site |
| `auth.PIDA_DOMAIN` | The auth back end (C10): the custom domain of the managed back end in option A, the functions in option B |
| `assets.PIDA_DOMAIN` (Routes A and B only; required there for the video renditions, posters, WebVTT and `pida-*.js`) | Self-hosted media, fonts, `pida-motion.js` and the other `pida-*.js` files, the 3D scene |
| `staging.PIDA_DOMAIN`, `auth-staging.PIDA_DOMAIN` | Staging. Password protected, `noindex`. |

The assets host can be any static object store or CDN bucket with a custom domain, HTTPS, byte-range requests, `Access-Control-Allow-Origin: https://PIDA_DOMAIN` and long cache headers. The founders own the account; this input is not in the list of 0.6, so the builder asks for it on day one. Fallback if none is available at phase 2: upload the H.264 rendition to the platform's own video element, keep the poster, the toggle and the lazy start by custom code, drop WebM, and record the deviation in the delivery notes.

DNS also carries:

- SPF, DKIM and DMARC records for the sending domain
- the domain verification records for the two identity providers
- the verification record for the search console

Until 0.6, D3 is answered, build on the site builder's staging address and a staging auth project. Do not launch without D3.

### C17.2 Environments

| Environment | Trigger | Data | Sign-in clients | Indexing |
|---|---|---|---|---|
| Local | developer machine (Route C, option B) | local or throwaway database | dev | n/a |
| Preview | every pull request (Route C), or the builder's preview link | none. Sign-up points at staging auth. | staging | blocked |
| Staging | merge to `main`, or the builder's staging publish | staging database, purged monthly | staging | blocked, password |
| Production | tagged release, or the builder's production publish after sign-off | production database with daily backups, EU region | production | open |

### C17.3 CI checks

- In the hand-coded route, the checks run on the build output (`dist/`) and on the preview URL.
- In Framer and Webflow there is no build output. The same checks run against a crawl of the staging URL, which fetches every URL in the sitemap plus the non-indexed pages, together with the CSS and JavaScript files they load. They run on a schedule and on demand before each production publish.

| Check | Tool | Pass condition |
|---|---|---|
| Lighthouse | Lighthouse CI, mobile preset, 5 runs, median | The gates of C14: performance at least 90 hand-coded or 80 on a builder; accessibility at least 95 |
| Accessibility | axe-core through a headless browser, on every page, with the lightbox open and with the mobile menu open | 0 serious or critical violations |
| Links | a link checker over all pages, including anchors | 0 broken internal links. External links return 2xx or 3xx. |
| HTML validity | an HTML validator | 0 errors |
| Banned terms | the script below, over built or crawled HTML, CSS, JavaScript, JSON-LD, `alt` and `aria-label` text, captions (`.vtt`), the email templates, `robots.txt`, the sitemap, the web manifest, `security.txt`, and the list of file names | 0 matches after the allow-list |
| Banned characters | a script over rendered text nodes and the email templates | No exclamation mark (U+0021) in visible text |
| Compatibility said once | a script | The sentence of A3.11 occurs exactly once on `/` and nowhere on any other page or in any email. The phrases in `ci/compat-echo.txt` occur nowhere outside `#compatibility`. |
| "Reimagined" in headings only | a script | The word occurs only inside `h1`, `h2` and `title`. `og:title`, `og:description`, `twitter:title` and the meta description do not carry it (A8.3). |
| Abbreviations | a script | For each abbreviation of C15 present on `/`, its expansion string is present too |
| Placeholders | a script | No element with `data-pida="placeholder"` in a production build |
| Asset names | a script over `media/` | Every file matches `^pida-[a-z0-9-]+(\.[a-z0-9]+)+$`, its base is one of the canonical names of 0.3 or a listed derivative, and none matches the banned lists |
| Media weights | a script comparing file sizes with C9 and C14 | all within budget |
| 3D scene, if present | a script reading the exported scene's object names | No banned term. Size within C8.5. |
| Security headers | a header check against staging | All headers in C16.1 present. CSP has no `unsafe-eval`. |
| Auth service (option B) | unit tests for state, nonce and cookie handling; an integration test with a mock OpenID provider | all pass |
| Secrets | a secret scanner on the repos | 0 findings |

Minimum acceptable on Routes A and B when no developer is available (scripted CI is required only on Route C):

1. Lighthouse and an axe browser extension, run by hand on every page of C2, with the results saved in `qa/`.
2. For each page, save the published HTML (view source) and search it for every term of 0.1 and every phrase of `compat-echo.txt` with a text editor's find-in-files. Log each search in `qa/banned-terms-log.md`, which stays private like the term files.
3. A link-checker browser extension over every page.

**The banned-terms check and its allow-list.**

- The terms are those of the hard rules in 0.1 (rules 1, 5 and 6). They are not printed in this part. The builder copies them from 0.1 into two files in a private repo or a private CI secret, never into anything that is published:
  - `ci/banned-words.txt`: whole-word terms, one per line, matched case-insensitively. Short terms must be matched as whole words so that they do not fire inside ordinary English words. The names of AI models and AI providers go here; 0.1 bans them as a class, so the builder lists the common ones and the founders add any they use.
  - `ci/banned-substrings.txt`: fixed strings that must match even inside other text, such as the hydraulic solver's file extension and the phrases of rule 6.
- `ci/compat-echo.txt` holds phrases that would repeat the compatibility statement, for example "opens in", "compatible with" and "works with your". A hit outside `#compatibility` is reviewed by a person; it fails the build unless it is added to the allow-list with a reason.
- One sign-in provider is also on the banned list as an AI provider. The allow-list (0.1, exemption a) is therefore part of the check, in `ci/banned-allow.json`:

```json
{
  "exact_strings": [
    "Continue with Google",
    "Continue with LinkedIn"
  ],
  "scoped": [
    { "path": "/privacy", "selector": "[data-pida-allow='signin-providers']" },
    { "path": "/trial", "selector": "a[data-pida='provider']", "attributes": ["href", "data-provider"] }
  ]
}
```

  - The script removes every `exact_strings` match from the text before it searches. These two labels may appear on `/trial` only (0.4); the script fails if it finds them on any other page.
  - On `/privacy`, the paragraph that names the two companies as sign-in providers is wrapped in an element with `data-pida-allow="signin-providers"`. The script removes that element before it searches. The attribute is honoured on `/privacy` only.
  - On `/trial`, the script ignores the `href` and `data-provider` attributes of the two links marked `data-pida="provider"`. The address of a sign-in link and the `provider` analytics value cannot avoid the provider's name; they belong to the two buttons of exemption (a). The `signup_start` script reads the value from `data-provider` (C3.6), so the name is not written in any JavaScript file. The entry is honoured on `/trial` only.
  - Nothing else is allow-listed beyond these entries. In particular, the site loads no script, font or image from either provider's hosts, so no provider host name appears in the page source.

```yaml
- name: Banned terms
  run: node ci/check-banned.mjs --root dist --words ci/banned-words.txt \
       --substrings ci/banned-substrings.txt --allow ci/banned-allow.json
```

The check cannot see inside pixels. Names inside screenshots and video frames are covered by the manual media review in C9.1 and C18.

---

## C18. QA test plan

### C18.1 Matrix

| Class | Coverage |
|---|---|
| Desktop browsers | Latest two versions of the four major desktop browsers |
| Mobile | The default browser on a current and a three-year-old phone of each of the two major mobile platforms |
| Viewports | 320 (reflow only), 360, 390, 480, 768, 1024, 1280, 1440, 1920 |
| Conditions | Slow 4G throttle, data saver on, JavaScript off, reduced motion on, forced colours, 200 % and 400 % zoom, a content blocker on, print preview |

### C18.2 Test cases

| Area | Case | Expected |
|---|---|---|
| Content | Page order | The blocks of 0.2, in order, with the anchors of 0.2. No Status block, no traction line. |
| Content | Section names and eyebrows | Exactly the six names and six eyebrows of 0.2, verbatim |
| Content | Speed claims | Only "a P&ID in 30 seconds" and "a hydraulic model in under a minute" appear, with no timer or stopwatch near them |
| Content | Numbers | Every number on the site is in the claim register (A5.4), character for character. The check line reads "0 error, 0 warning". |
| Content | Determinism | Wherever "byte-identical" appears, it is said of the drawing |
| Content | Compatibility | Said once, in `#compatibility` |
| Content | Things that must not be said | No "nothing to install", no "no card", no number of days, no delivery time for the trial, no hosted login, no count of tools "running today" |
| Content | Hard rules, text | The CI check is green. A manual read of every page, email, error text, description and caption finds nothing that 0.1 forbids. |
| Content | Hard rules, pixels | Every still at 200 %, and every video frame-stepped at 1 s intervals, shows none of the items listed in C9.1 |
| Content | Flags | The 0.265 % line and the scope line are absent from the DOM unless 0.6, D6 switched them on |
| Content | Contact line and FAQ | The contact line is present only with D4. FAQ question 6 is present only with D5. Question 1 carries the default answer of A3.12 until D1 is decided. |
| Layout | No horizontal scroll at any width from 320 up | Pass |
| Layout | In narrow columns every still is shown whole and opens in the lightbox. M2 is never cropped to a detail. | Pass |
| Layout | Tablet at 768 and 1023 | Stacked sections, two-by-two grids, no pin, no hero overlap |
| Layout | Print preview | White bands, black text, posters for videos, FAQ open, no buttons |
| Motion | Pinned section 01 on a desktop with a mouse | It pins, scrubs through its beats, snaps and releases without a jump. The fixed header does not overlap the content. |
| Motion | No other pin | Sections 02 to 06 do not pin at any width |
| Motion | Touch laptop, tablet in landscape at 1180 px | No pin |
| Motion | Resize and orientation change while pinned | The layout recovers after `ScrollTrigger.refresh()` |
| Motion | Fast scroll, anchor jump into and past the pinned section, browser back to a hash | Correct position, no blank states |
| Motion | Hero | The mask runs once for 1.2 s. Scrolling does nothing to the hero. LCP is unchanged with and without the mask. |
| Motion | Numbers | Nothing counts up anywhere |
| Motion | Section 05 | The rule turns coral and the label reads "ISOLATION" when the recording reaches `isolationAt`, and returns to amber on loop |
| Motion | Reduced motion on | No pin, no draw-on, no autoplay, no mask, all content visible |
| Motion | JavaScript off | All text and stills are visible. Every call to action reaches `/trial`. The provider buttons work (option B completes; option A shows the `noscript` line on the welcome page). Videos show their posters. The menu works through `<details>`. |
| Video | Starts when half visible, pauses off screen, toggle works and the pause persists, "Open larger" opens the lightbox | Pass on both mobile platforms (inline, no fullscreen takeover) |
| Video | Source selection | VP9 (or AV1 if made) where supported, H.264 otherwise. The 960 set on phones. |
| Video | Network | No video bytes are requested before the video is near the viewport. With data saver on, the poster stays. |
| Video | Weights and sizes | Every rendition under 3 MB, at most 1600 px wide, at the source frame rate |
| 3D, if shipped | Capable desktop | The scene loads after the still and crossfades. Drag orbits. The page still scrolls. Rotation pauses off screen. No watermark. |
| 3D, if shipped | Fallback ladder | Each condition in C8.4 produces the stated fallback. A forced scene error falls back within 6 s. |
| 3D, if shipped | Keyboard and screen reader | The list of sheets is reachable, and the highlight follows focus |
| Lightbox | Every still opens; one item, no next or previous; Escape and backdrop click close; focus return; fit and 100 % toggle; pinch zoom; video controls | Pass |
| Sign-up | Google, new person | Row created with the columns of C10.7 only. One confirmation email, one internal notice. Lands on `/trial/welcome`, which shows no name and no email. `signup_success` arrives from the server. |
| Sign-up | LinkedIn, new person | Same |
| Sign-up | Same person again, same or other provider | One row. Lands on `?state=returning` with the words of A7.4. The email is sent again. No `signup_success`. |
| Sign-up | Two repeats within two minutes | One resend only |
| Sign-up | Welcome form saved, skipped, saved after 31 minutes | Saved: three columns updated, saved line shown. Skipped: nothing changes. Late: the expired line, nothing saved. |
| Sign-up | The updates box | Unticked by default; stored true only when ticked |
| Sign-up | Cancel at the provider | `/trial/error?code=cancelled` with a reference line and a "Try again" button to `/trial`. No provider button on the error page. Nothing is stored. |
| Sign-up | Tampered or replayed `state`, callback opened without the cookie, 11-minute-old flow (option B) | `expired`. No provider call is made. Nothing is stored. |
| Sign-up | LinkedIn test account with an unverified email | `email_unverified`. Nothing is stored. |
| Sign-up | Provider outage (blocked egress on staging) | `provider_down` after the timeout |
| Sign-up | Rate limit | `rate_limited` after the threshold, with recovery after the window. No IP address in the database or the logs. |
| Sign-up | `?code=` and `?ref=` tampering on the error page | An unknown code shows the `server` text. A malformed `ref` is not shown. Nothing else from the URL is echoed. |
| Sign-up | Third-party cookies blocked, pop-ups blocked, private window | The flow still completes, and no pop-up is ever opened |
| Sign-up | Provider consent screens | They show the app name "PIDA", PIDA's own domain, and only the three basic scopes |
| Sign-up | Profile picture | No picture or picture URL anywhere in the database, including the managed back end's own user record (option A) |
| Withdrawal | Open the link, press the button | GET deletes nothing. POST deletes the row and lands on `/trial?state=withdrawn`. The link then reads as no longer valid. |
| Email | Rendering in three major mail clients, the plain-text part, SPF, DKIM and DMARC pass, no tracking pixel, no rewritten links, legal details in the footer | Pass |
| Email | Forced failure and forced bounce on staging | Three retries, then `failed`; a bounce sets `bounced`; the founders are told in both cases |
| Founders' view | A founder opens the table and exports CSV | Works with multi-factor sign-in; the CSV has the columns of C10.7 |
| Analytics | Each event of C12.3 fires once with the listed properties and the canonical names. No personal data in any payload. Nothing fires from the page before consent. `signup_success` arrives from the server whatever the banner choice. | Pass |
| SEO | Titles, descriptions, canonical, the social image in two link-preview debuggers, JSON-LD validates with six `featureList` items, sitemap and robots correct, staging not indexable | Pass |
| Performance | The gates of C14, on staging and on production | Pass |
| Security | Headers present. CSP enforced with no console violations across a full click-through. Cookie attributes are correct. No secret in any client bundle. | Pass |
| Badges | The published site shows no site-builder badge and no 3D-tool watermark (0.1, rule 9) | Pass |

### C18.3 Sign-off

- Staging sign-off comes from the builder (function) and from the founders (content, hard rules, media review). The founders read the staging site on a phone and on a laptop (0.7).
- A production smoke test runs immediately after go-live. It covers both sign-up paths with real accounts, email receipt, the withdraw link, the analytics live view, a header check and a Lighthouse run.
- The launch gate itself is the checklist of B11. C20 below is the builder's own delivery list and feeds it.
- A change that a founder asks for and that contradicts Part 0 is made in Part 0 first, then on the site (0.7).

---

## C19. Handoff package: structure and asset names

None of the files below exists yet. The only inputs are this one document and the ten media files of 0.3 (M8 and M9 are still to come). The builder creates this package during the build and delivers it at go-live. Files that a Framer or Webflow builder is not expected to write (`auth/`, `ci/*.mjs`, `scripts/`) are marked "developer" and follow 0.6, D2: a developer named by the founders writes them. Where no developer is available, C17.3 gives the manual minimum for the checks.

### C19.1 Canonical names and their derivatives

The source files already carry their canonical names (0.3). Do not rename them, and do not invent a second scheme. Every shipped file is a derivative of one of these base names. No file name contains a term banned by 0.1, a space, an ampersand or a capital letter.

| ID | Master in `assets/masters/` | Base name for derivatives | Section |
|---|---|---|---|
| M1 | `pida-generator-review.png` | `pida-generator-review` | 01 |
| M2 | `pida-generated-pid-r101.png` | `pida-generated-pid-r101` | Hero, 01, social image |
| M3 | `pida-connectivity-graph.png` | `pida-connectivity-graph` | 02 (still, fallback) |
| M4 | `pida-connectivity-graph.mp4` | `pida-connectivity-graph` | 02 (video) |
| M5 | `pida-hydraulics-wizard.png` | `pida-hydraulics-wizard` | 03 |
| M6 | `pida-hydraulics-model-opened.png` | `pida-hydraulics-model-opened` | 03 |
| M7 | `pida-hydraulics-results.png` | `pida-hydraulics-results` | 03 |
| M8 | `pida-engineer-answer.png` (not in the folder yet) | `pida-engineer-answer` | 06 |
| M9 | `pida-safety-chat.png` (not in the folder yet) | `pida-safety-chat` | 04 |
| M10 | `pida-isolation-flowpath.mp4` | `pida-isolation-flowpath` | 05 |

M3 and M4 share a base name. Their derivatives do not collide, because still renditions end in `.avif`, `.webp` or `.png` and video renditions end in `.mp4` or `.webm`.

| Derivative | Pattern |
|---|---|
| Still renditions | `{base}-{width}.avif`, `.webp`, `.png` |
| Focused crop for narrow columns (could-have, C6.2) | `{base}-focus-{width}.*` |
| Video poster (0.3) | `{base}-poster.jpg`, plus `{base}-poster-{width}.avif` and `.webp` |
| Video renditions | `{base}-{width}.mp4`, `{base}-{width}.webm`, optionally `{base}-{width}.av1.mp4` |
| Captions | `{base}.en.vtt` |
| Social image | `pida-og-1200x630.png` |

### C19.2 Folder structure

```
pida-website-handoff/
  README.md                          how to use this package, in one page
  docs/
    pida-website-handoff.md          the one merged file: Part 0, A, B and C
  tokens/
    pida-tokens.json                 written by the builder from C4 and C5
    pida-tokens.css                  the block in C4.4
  fonts/
    barlow-condensed-500.woff2
    barlow-condensed-600.woff2
    barlow-400.woff2
    barlow-500.woff2
    barlow-600.woff2
    ibm-plex-mono-400.woff2
    ibm-plex-mono-500.woff2
    LICENSES.txt
  brand/                             made by the builder; there is no logo yet (0.3)
    pida-wordmark.svg                "PIDA" in Barlow Condensed 600, 0.04 em, outlined
    favicon.ico                      the letter P on a cobalt square
    icon.svg
    apple-touch-icon.png
    manifest.webmanifest
  assets/
    crops.json                       crop rectangles per base name (C9.5)
    media-facts.json                 measured width, height, frame rate, duration (C9.1)
    masters/                         the ten files of 0.3 under their canonical names; not for publishing
  media/                             everything that ships
    stills/                          {base}-{width}.{avif,webp,png} and -focus variants
    posters/                         pida-connectivity-graph-poster.jpg, pida-isolation-flowpath-poster.jpg, renditions
    video/                           pida-connectivity-graph-{W,960}.{mp4,webm}
                                     pida-isolation-flowpath-{W,960}.{mp4,webm}
    captions/                        {base}.en.vtt (should-have)
    og/
      pida-og-1200x630.png
  diagrams/
    pida-diagram-how-it-fits.svg
    pida-diagram-how-it-fits-vertical.svg
    pida-diagram-value-fill.svg
  spline/                            only if the 3D scene is built
    pida-connectivity-graph.spline
    pida-connectivity-graph.splinecode
    scene-notes.md                   topology written from M3 and confirmed by the founders, camera values, object names
  motion/
    pida-motion.js                   GSAP timelines of C7, attribute-driven
    pida-media.js                    video lazy loader, toggle, section 05 phase (C9.3, C7.3)
    pida-lightbox.js                 C3.5
    pida-graph.js                    GraphScene fallback ladder (C8.4), only if the scene is built
  auth/
    option-a/                        developer: table SQL, the three functions, setup notes (C10.2)
    option-b/                        developer: src/ (login, callback, welcome, withdraw, hooks, db, email, queue)
                                     migrations/001_trial_signups.sql
    emails/trial-confirmation.txt
    emails/trial-confirmation.html
    emails/internal-notice.txt
    .env.example                     names only, no values
    README.md                        provider console setup, step by step (C10.5, C10.6)
  legal-templates/                   privacy notice, trial terms, company details, storage statement (C12.4),
                                     accessibility statement (C15); to be approved under 0.6, D8
  seo/
    head-snippets.html
    jsonld.json
    robots.production.txt
    robots.staging.txt
    sitemap.xml
    security.txt
  ci/
    banned-words.txt                 copied from 0.1 by the builder; kept private
    banned-substrings.txt            copied from 0.1 by the builder; kept private
    banned-allow.json                the allow-list of C17.3
    compat-echo.txt
    check-banned.mjs                 developer
    check-copy-rules.mjs             developer: compatibility once, "Reimagined" in headings, abbreviations, exclamation marks, placeholders
    check-assets.mjs                 developer: names and weights
    crawl-and-check.mjs              developer: for the Framer and Webflow routes
    lighthouserc.json                gates of C14
    axe.config.json
    workflow.yml
  scripts/
    encode-video.sh                  developer: the commands of C9.2 (the builder may run them by hand instead)
    encode-stills.mjs                developer: crop, resize, AVIF, WebP, PNG (or any image tool, by hand)
    export-signups.mjs               developer: CSV export for option B (C10.12)
  qa/
    test-plan.md                     C18 as a checklist
    media-review-log.md              who reviewed which asset at 200 %, and when
    banned-terms-log.md              the manual searches of C17.3 on Routes A and B; kept private
```

---

## C20. Builder's delivery checklist

The launch gate is B11. This list is what the builder ticks off on the way there.

**Before build (founder inputs, 0.6)**

- [ ] Access to the Drive folder "PIDA website 1 / Website handoff" has been given.
- [ ] D2: the owner of the sign-up back end is named, option A or B is chosen, and the developer who writes the three functions of option A (or the service of option B) is named (C10.2).
- [ ] D3: domain, canonical host, sender address, legal entity and registered address. Without them, build on staging and do not launch.
- [ ] D4: the role-based contact address, or the decision to leave the contact line out.
- [ ] D6: scope line and 0.265 % line, both off unless the founders say otherwise.
- [ ] D7: the re-shot M1, M8 and M9 have arrived, or a date is agreed. A logo has arrived, or the interim wordmark is accepted.
- [ ] D8: who approves the privacy notice, the trial terms, the company details and the retention period.
- [ ] A company LinkedIn Page exists (C10.5).
- [ ] The build route is chosen and recorded (C1.3), with the paid plan that removes the builder's badge.
- [ ] The banned-term files have been copied from 0.1 into the private CI location.

**Media**

- [ ] Every master has been measured and `media-facts.json` and `crops.json` are filled.
- [ ] Every still and every video has been checked at 200 % against C9.1 and logged in `qa/media-review-log.md`.
- [ ] All renditions are encoded with metadata stripped, within C9 and C14. No video is wider than 1600 px or heavier than 3 MB.
- [ ] Posters and the social image have been produced (focus crops only if used).
- [ ] The text descriptions of the two recordings have been checked against the recordings (C21.4). `isolationAt` has been read off M10.

**Build**

- [ ] Tokens are loaded (C4), and fonts are self-hosted with the listed families and weights.
- [ ] All blocks of 0.2 exist in order with their anchors, themes and accents.
- [ ] All components of C3 exist with the listed properties and states.
- [ ] The motion script is installed. Only section 01 pins. The reduced-motion path is verified.
- [ ] Every still opens in the lightbox. Both videos have the toggle and "Open larger".
- [ ] `/trial` carries exactly two provider buttons and the consent line, and works without JavaScript.
- [ ] The small pages of C6.4, the print stylesheet and the mobile menu are done.
- [ ] If the 3D scene is built: the fallback ladder is verified, the scene is within its caps, object names are clean, no watermark.

**Sign-up**

- [ ] Google and LinkedIn apps are created per environment. Redirect URIs are exact. Domains are verified. The LinkedIn app is linked to the company Page with the OpenID Connect product added. The LinkedIn button label has been checked against its brand rules.
- [ ] The back end is deployed to staging and production, with secrets in its secret store only.
- [ ] The table has exactly the columns of C10.7, in an EU region, with access restricted and backups on.
- [ ] The email domain is authenticated (SPF, DKIM, DMARC). The confirmation email and the internal notice are approved by the founders. Tracking pixels and link rewriting are off.
- [ ] Withdrawal, retry, bounce handling and CSV export are verified.
- [ ] Rate limits and alerts are configured, and the error pages are verified.

**Quality gates**

- [ ] CI is green on every check of C17.3.
- [ ] The QA plan of C18 has been executed on staging, and the issues are closed.
- [ ] CSP is enforced with zero violations over a full click-through. If on a builder without a proxy, the limitation is recorded.
- [ ] Analytics events carry the canonical names of 0.4 and no personal data. Consent behaviour is verified.
- [ ] SEO: head tags, JSON-LD, sitemap, robots, canonical redirects and the social preview are verified. Staging is not indexable.
- [ ] Legal texts are approved (0.6, D8) and `consent_version` is set to their date.

**Go-live**

- [ ] DNS is switched, and HTTPS and the redirects are verified.
- [ ] The production smoke test has passed (C18.3).
- [ ] The search console is verified and the sitemap is submitted.
- [ ] The handoff package is archived with the final build and the back end's version tag.
- [ ] Owners are named for the back end and its updates, the database, the mailbox, the domain and analytics.

---

## C21. Fallback copy for places Part A may not cover

Use Part A's string wherever Part A has one for the same place, and delete the fallback. These fallbacks contain no claim that is not in the claim register, no exclamation mark, no delivery time and no promise of a login. Abbreviations are expanded at first use on each page.

### C21.1 `/trial`

Part A carries every string of this page (A7.2): title tag, eyebrow, `h1`, text, the two button labels, the consent line, the data line, the mono line and the foot link. The withdrawn view is A7.5 (C6.4). This part gives no fallback for them.

### C21.2 `/trial/welcome`

Part A carries the strings of this page (A7.3, and A7.4 for `returning`): title tag, eyebrow, `h1`, text, form heading, form text, labels, the button "Send", the skip link, the saved line, the failed-send note and the length error. Two strings are not in Part A:

- State line for `form_expired`: "That form has expired. Your sign-up is safe and nothing else is needed."
- `noscript` line (option A only): "Please switch JavaScript on and open this page again to finish signing up."

### C21.3 `/trial/error`, `/404` and the withdrawal page

- `/trial/error`: title tag, `h1`, text and buttons are those of A7.6. The line under them is "Reference: {id}" (0.4). The provider buttons do not appear here; the secondary button "Try again" links to `/trial`.
- `/404`: every string is in A7.9.
- Withdrawal page on the auth host: "Delete the details you gave us when you signed up for a PIDA trial?", button "Delete my details", and for a bad link "This link is no longer valid."

### C21.4 Text descriptions of the two recordings

The builder watches each recording and corrects the order of events if it differs. Do not add anything that is not seen on screen.

- **M4, `pida-connectivity-graph`.** "Silent screen recording. The P&IDs (piping and instrumentation diagrams) of one project are shown as a slowly rotating 3D graph. Each of the 6 sheets is a node and each of the 5 sheet-to-sheet connections is a line between two nodes. The sheets are grouped as reactor, condensers + receivers, utility supply and other."
- **M10, `pida-isolation-flowpath`.** "Silent screen recording of the Workspace. An item on the drawing is picked and its flow path lights up on the real drawing, with lines coloured by network: process, secondary process and utility. The view then changes to isolation. For a vessel it marks which valves to close in two scenarios, manual block valves only and actuated valves locked out, and it says when a line leaves the sheet first."

Video `aria-label` values: "Screen recording: the P&IDs of a project as a rotating 3D graph" and "Screen recording: a flow path and an isolation plan shown on the drawing".

### C21.5 FAQ answers (0.5)

| Question | Answer |
|---|---|
| What does the trial include? | Founders' answer (0.6, D1). Until then, the default answer of A3.12: "Sign up with an account you already have. We will email you with the next step." |
| What does PIDA cover today? | "This page shows it: the P&ID Generator, the P&ID Manager, the Hydraulic Modeler, the Workspace with flow paths and isolation, and the Engineer." If 0.6, D6 switches the scope line on, add it: "Shown here is what works today: reactor sheets, condenser and receiver sheets, and a clean-in-place loop." |
| Who checks the output? | "Every generated drawing comes with an independent check report and a redline drawing. When PIDA checks a drawing made elsewhere, the checker first proves itself on planted defects, then reports its findings with positions and a redline. In the hydraulic model, every value is marked given, sourced, assumed or empty." |
| Which formats come out? | "The drawing is a DXF. Beside it come a DEXPI export, the flow paths as PDF layers, the deliverables workbook, the isolation plan and the check report. The Hydraulic Modeler writes a native model file." This answer names formats only. It does not say what opens them; that is said once, in the compatibility band. |
| Where do my documents go? | "Your documents stay yours. PIDA works local first, and a document that is not cleared for use never leaves the PC." |
| How are the two speed claims measured? | Founders' answer, one sentence per claim (0.6, D5). Without it, leave the question out. |

### C21.6 Interface strings

| Place | String |
|---|---|
| Skip link | "Skip to content" |
| Menu button, screen-reader labels (A7.9) | "Open menu", "Close menu" |
| Video toggle | "Pause recording", "Play recording" |
| Lightbox (A7.9) | "Open image larger", "Open recording larger", "Close image" |
| Section 05 phase labels | "FLOW PATH", "ISOLATION" |
| Staging placeholder | "STILL TO FOLLOW: {ID}" |
| Consent banner | Text and link from A7.9. Buttons: "Accept analytics", "Decline" (0.4) |
| Footer (A3.14) | "Privacy", "Trial terms", "Legal and accessibility", "Cookie settings", "Sign up for trial" |
| Contact line (0.5; needs 0.6, D4) | "Investor or partner? Write to {role address}." |
| Standards line (0.4) | "Standards named on this site belong to their respective publishers. PIDA is not affiliated with or endorsed by them." |
