# -*- coding: utf-8 -*-
"""
Rewrites the vendored landing page into PIDA's.

Every edit is an exact string swap against a 1.6MB minified file, so each one
asserts its expected hit count. A replacement that silently matches nothing
(or matches more than intended) stops the script instead of quietly shipping
the wrong page.
"""
import re, sys, io

SRC = 'index.phaseA.html'   # asset-fixed, content still Hoplite's
OUT = 'index.html'
h = io.open(SRC, encoding='utf-8').read()
LOG = []

def sub(old, new, n=1, label=''):
    """Replace `old` with `new`, asserting it occurs exactly n times."""
    global h
    found = h.count(old)
    if found != n:
        print(f'  FAIL [{label}] expected {n}, found {found}: {old[:90]!r}')
        sys.exit(1)
    h = h.replace(old, new)
    LOG.append(label or old[:40])

def sub_all(old, new, label=''):
    """Replace every occurrence, asserting there is at least one."""
    global h
    found = h.count(old)
    if found == 0:
        print(f'  FAIL [{label}] no match: {old[:90]!r}')
        sys.exit(1)
    h = h.replace(old, new)
    LOG.append(f'{label} (x{found})')

def drop(pattern, label='', flags=0, expect=None):
    """Delete every match of a regex."""
    global h
    ms = re.findall(pattern, h, flags)
    if expect is not None and len(ms) != expect:
        print(f'  FAIL [{label}] expected {expect} matches, found {len(ms)}')
        sys.exit(1)
    if not ms:
        print(f'  FAIL [{label}] no match for {pattern[:70]}')
        sys.exit(1)
    h = re.sub(pattern, '', h, flags=flags)
    LOG.append(f'{label} (dropped x{len(ms)})')

# ============================================================ head / meta
sub('<title>Hoplite</title>',
    '<title>PIDA | Pharma process design automation, reimagined</title>',
    label='title')

sub('<meta name="description" content="Effortless cloud coding agents that feel good to use.">',
    '<meta name="description" content="PIDA automates early pharma process design: a P&amp;ID in 30 seconds, a hydraulic model in under a minute, every value traceable to its source. Sign up for trial.">',
    label='meta description')

sub_all('content="Hoplite"', 'content="PIDA"', label='og/twitter site name + title')
sub_all('content="Effortless cloud coding agents that feel good to use."',
        'content="A P&amp;ID in 30 seconds. A hydraulic model in under a minute. Every line, value and answer traceable to its source."',
        label='og/twitter description')
sub_all('content="Hoplite cloud code agents — Backed by Y Combinator."',
        'content="PIDA: pharma process design automation."',
        label='og/twitter image alt')
sub_all('https://hoplite.sh/opengraph.png', 'opengraph.png', label='og image path')
sub_all('content="@hoplite_sh"', 'content=""', label='twitter handles')
sub_all('<meta property="og:url" content="https://hoplite.sh">', '', label='og url')
sub_all('<link rel="canonical" href="https://hoplite.sh">', '', label='canonical')

# The app shell set a dark class and a no-project flag for its own router.
sub('<html lang="en" class="dark" data-hoplite-no-project="" style="color-scheme: dark;">',
    '<html lang="en" class="dark" style="color-scheme: dark;">',
    label='html tag')

# ===================================================== announcement strip
# The reference offers a timed trial. Nothing on this site may state a
# duration or a payment term until D1 is decided, so the strip carries the
# one CTA label the rest of the page uses.
sub_all('Try Pro free for <!-- -->14<!-- --> days', 'Sign up for trial',
        label='strip label')
# A separate span states the payment term and carries an em-dash. Both are
# out, so the span goes with it.
sub('<span class="hidden whitespace-nowrap opacity-80 sm:inline">\u2014 full access, cancel anytime</span>',
    '', label='strip terms span')
sub_all('/login?plan=pro&amp;interval=monthly', '/trial', label='strip href')

# ================================================================== nav
sub_all('>Hoplite</a>', '>PIDA</a>', label='wordmark')
sub_all('>Blog</a>', '>Product</a>', label='nav Blog')
sub_all('>Changelog</a>', '>Use cases</a>', label='nav Changelog')
sub_all('>Docs</a>', '>Security</a>', label='nav Docs')
sub_all('href="/blog"', 'href="#how-it-works"', label='nav Blog href')
sub_all('href="/changelog"', 'href="#use-cases"', label='nav Changelog href')
sub_all('href="https://hoplite.sh/docs"', 'href="#security"', label='nav Docs href')
sub_all('href="/pricing"', 'href="#pricing"', label='nav Pricing href')

# There is no login to offer, so the secondary chip goes to the questions.
sub_all('>Login</a>', '>Questions</a>', label='nav Login')
sub_all('>Start free</a>', '>Sign up for trial</a>', label='Start free buttons')
sub_all('>Start free<', '>Sign up for trial<', label='Start free spans')
sub_all('href="/login"', 'href="/trial"', label='login hrefs')

def sub_re(pattern, new, n=1, label='', flags=re.S):
    """Regex replace, asserting the match count."""
    global h
    ms = re.findall(pattern, h, flags)
    if len(ms) != n:
        print(f'  FAIL [{label}] expected {n}, found {len(ms)}: {pattern[:80]}')
        sys.exit(1)
    h = re.sub(pattern, lambda _: new, h, flags=flags)
    LOG.append(label)

# ================================================================= hero
# PIDA is not YC-backed, so the badge cannot stay. The slot keeps its
# styling and carries the audience line instead, as a span rather than a
# link, because it now points at nothing.
BADGE = ('<span data-slot="badge" data-variant="ghost" class="inline-flex w-fit shrink-0 '
         'items-center justify-center overflow-hidden font-medium whitespace-nowrap '
         'gap-[6px] rounded-[20px] bg-(--ink)/10 px-[12px] py-[4px] text-[14px] '
         'leading-[1.35] text-(--ink) backdrop-blur-[2px]">'
         'Built for pharma process engineers</span>')
sub_re(r'<a href="https://www\.ycombinator\.com.*?Combinator</a>', BADGE,
       label='YC badge -> audience badge')

sub('Build with <span class="italic" style="font-family:&quot;Redaction 35&quot;, serif">swarms</span><br>of cloud agents',
    'Pharma process design,<br><span class="italic" style="font-family:&quot;Redaction 35&quot;, serif">reimagined</span>.',
    label='H1')

sub('Hoplite turns ideas into built, tested, verified software at the speed of thought.',
    'A P&amp;ID in 30 seconds. A hydraulic model in under a minute. Every value traceable to its source.',
    label='hero sub')

# There is no desktop build to download. The slot becomes the quiet action.
sub('Download for Mac', 'See what it makes', label='hero secondary label')
sub('href="https://api.hoplite.sh/api/desktop/release/download"', 'href="#how-it-works"',
    label='hero secondary href')

# ========================================================= four steps
sub('From Local To Cloud<br>Agents In <span class="italic" style="font-family:&quot;Redaction 50&quot;, &quot;Redaction 35&quot;, serif">Four Steps</span>',
    'From A Blank Sheet To A<br>Checked Package In <span class="italic" style="font-family:&quot;Redaction 50&quot;, &quot;Redaction 35&quot;, serif">Four Steps</span>',
    label='steps heading')

sub('We import your local config, instantly set up automations, and run your projects in the cloud.',
    'We take nine short answers, draw the sheet, check it against itself, and write the whole deliverables package beside it.',
    label='steps sub')

# --- 01
sub('Connect a repository', 'Answer nine short steps', label='step 1 title')
sub('Point Hoplite at any GitHub repo. We pull in your codebase and branch structure so your agents have full context from the first prompt.',
    'Equipment, spark filter, inlets, outlets, solids and cleaning, utilities, instrumentation, controlled streams, review. Short answers, in the words an engineer already uses.',
    label='step 1 body')

# --- 02
sub('Import your local setup', 'Watch the schematic build', label='step 2 title')
sub('Your sessions, MCP servers, and CLIs all come with you. Hoplite mirrors your local machine in the cloud — no painful setups or manual config.',
    'The drawing assembles beside you as you answer, under one sentence: &ldquo;This is exactly what will be drawn.&rdquo; There is no gap between what you reviewed and what arrives.',
    label='step 2 body')

# --- 03
sub('Start an agent in a sandbox', 'Generate, and it checks itself', label='step 3 title')
sub('Agents run in isolated sandboxes, meaning you can run hundreds concurrently without worrying about resource constraints.',
    'PIDA draws the P&amp;ID as a DXF, then checks it independently and writes a redline. The same specification always produces the same drawing, byte for byte.',
    label='step 3 body')

# --- 04
sub('Verify and merge', 'Take the whole package', label='step 4 title')
sub("Hoplite prepares video recordings of all new features, out of the box. Easily confirm the agent's output without needing to juggle ports.",
    'The line list, valve list and instrument index are written from the same model as the drawing, so the copies cannot drift apart.',
    label='step 4 body')

# ============================================ step mockups, internal labels
# 01: the cards show repositories and their file trees. Here they are the
# sheets of a project, their revision, and what each one holds.
sub_all('Hoplite/phalanx-3b21c9d4', 'Project / R-101', label='sheet 1')
sub_all('Hoplite/argos-97e2ab41',  'Project / C-201', label='sheet 2')
sub_all('Hoplite/lyra-0c44d9e7',   'Project / C-202', label='sheet 3')
sub_all('Hoplite/rhegion-f20f5df5','Project / U-301', label='sheet 4')
sub_all('>main<', '>Rev B<', label='branch -> revision')
sub_all('>SRC<', '>SHEET<', label='src -> sheet')
sub_all('>Index.ts<',  '>Lines<',  label='file 1')
sub_all('>README.md<', '>Valves<', label='file 2')
# package.json appears in BOTH the 01 file tree and the 02 list. The 02 rows
# carry text-transform: lowercase in their style and the tree rows do not, so
# the lists are separated on that before either is touched.
sub_all('text-transform: lowercase;">package.json<',
        'text-transform: lowercase;">Utilities<', label='02 row 6')
sub_all('>package.json<', '>Instruments<', label='file 3')

# 02: two columns comparing a local machine with a cloud sandbox. Here they
# are the answers going in and the drawing coming out.
sub_all('Local Machine', 'Your answers', label='col 1')
sub_all('Cloud Sandbox', 'The drawing', label='col 2')
sub_all('API_KEY',        'Equipment',           label='row 1')
sub_all('Database_URL',   'Spark filter',        label='row 2')
sub_all('node_modules',   'Inlets',              label='row 3')
sub_all('>env<',          '>Outlets<',           label='row 4')
sub_all('>zshrc<',        '>Solids &amp; cleaning<', label='row 5')
sub_all('requirements.txt','Instrumentation',    label='row 7')
sub_all('pyproject.toml', 'Controlled streams',  label='row 8')
sub_all('AWS_SECRET_KEY', 'Title block',         label='row 9')
sub_all('tsconfig.json',  'Review',              label='row 10')

# 03: a count of running agents becomes the check result.
sub_all('Agents:', 'Errors:', label='counter label')
sub_all('>125<', '>0<', label='counter value')

# 04: updates awaiting approval become the documents written beside the sheet.
sub_all('Update:', 'Written:', label='update label')
sub_all('>Update<', '>Redline<', label='update button')
sub_all('Hero load-in animation', 'Line list', label='deliverable 1')
sub_all('Sidebar collapse morph', 'Valve list', label='deliverable 2')
sub_all('Billing empty state', 'Instrument index', label='deliverable 3')

RED = ('<span class="italic" style="font-family:&quot;Redaction 50&quot;, '
       '&quot;Redaction 35&quot;, serif">')

# ============================================================= use cases
sub('Deploy Into Every Part Of The<br>Development ' + RED + 'Lifecycle</span>',
    'Carry It Through The Rest<br>Of The ' + RED + 'Project</span>',
    label='use cases heading')
sub('With Hoplite, automate everything from issue triage to complex migrations.',
    'The drawing is where it starts. Connectivity, hydraulics, safety and isolation all read from the same model.',
    label='use cases sub')

sub('Instant issue resolution', 'Connectivity and hydraulics', label='uc tab 1')
sub('Multiplayer collaboration', 'Safety and isolation', label='uc tab 2')
sub('Start from where you work', 'Engineering answers', label='uc tab 3')

# The three bodies repeat verbatim across the three tabs in the source.
sub_all('Spin up threads as soon as new Sentry issues are created, and merge before they become real production incidents.',
        'Every P&amp;ID of a project becomes a node in one graph, and every sheet-to-sheet connection an edge. A sheet joined to nothing is flagged.',
        label='uc body 1')
sub_all('One-click share links mean threads can be easily handed off between engineers and stakeholders.',
        'Pick any line, valve, nozzle or vessel and its flow path lights up on the real drawing, coloured by network.',
        label='uc body 2')
sub_all('With deep integrations into Linear and Slack, you can spin up and monitor threads from your existing preferred tools. The agent picks up the context and gets to work.',
        'The Engineer answers only from documents PIDA holds and cites the clause and page. A number no source contains is flagged &ldquo;Verify before use.&rdquo;',
        label='uc body 3')

# ================================================================= scale
sub('Scale To ' + RED + 'Infinity.</span>',
    'Point It At A Drawing<br>It Never ' + RED + 'Drew.</span>',
    label='scale heading')
sub('Run agents in parallel, each in its own isolated sandbox. Fan out a whole backlog at once and review the results as they finish.',
    'PIDA checks drawings made elsewhere. The checker first proves itself on planted defects, then reports its findings with positions and a redline.',
    label='scale sub')

# ============================================================== security
sub('Built From The Ground Up For The Most ' + RED + 'Secure</span> <!-- -->Workloads.',
    'Built To Be ' + RED + 'Checked</span><!-- -->, Not Taken On Trust.',
    label='security heading')
sub('Every session runs in an isolated sandbox, and your data is never sold, shared, or used to train models—by us or anyone else.',
    'Engineering for pharma is reviewed, signed and audited under good practice (GxP) regulations. A tool that gives a different answer on a different day cannot be reviewed once and relied on.',
    label='security sub')

# ---------------------------------------------------- the four properties
sub('Never trained on your code', 'Deterministic', label='card 1 title')
sub("We don't train on your data, and neither do the model providers you connect. Your codebase is used to do the work you asked for, and nothing else.",
    'Run the same specification again and the drawing is byte-identical. What was reviewed is what everyone gets. That is a statement about the drawing, not about every file beside it.',
    label='card 1 body')

sub('Encrypted end to end', 'Independently checked', label='card 2 title')
sub('Your code and credentials are encrypted in transit and at rest. Bring your own keys, and keep full control of what each agent can access.',
    'Every generated drawing arrives with an independent check report and a redline. One real run reported PASS, 0 error, 0 warning.',
    label='card 2 body')

sub('Isolated by default', 'Sourced', label='card 3 title')
sub('Every agent runs in its own sandboxed environment, walled off from your other sessions and from other users. Nothing bleeds across boundaries.',
    'Values are marked given, sourced, assumed or empty. Answers cite clause and page. The Engineer holds 94 documents, 1,772 design rules in 46 topics and 67 vendor datasheets.',
    label='card 3 body')

sub('SOC 2 in progress', 'Yours', label='card 4 title')
sub("We're completing SOC 2 certification and build to its standards today. Security isn't a feature we bolted on—it's how the product is designed.",
    'PIDA works local first. A document that has not been cleared for use never leaves the PC. Nothing here is a claim that PIDA is compliant, validated or qualified.',
    label='card 4 body')

# =============================================================== pricing
sub('Stay At The Frontier<br>Of Agentic Coding.',
    'One Tool, Priced To Be<br>' + RED + 'Argued</span> For.',
    label='pricing heading')
sub("With our simple and transparent pricing, you won't have to worry about doing mental maths ever again.",
    'What you get is the same in both plans. The difference is how many people review the work.',
    label='pricing sub')

# ==================================================================== faq
sub('Quick replies to the questions we get asked the most.',
    'The ones that come up before anyone agrees to look at a drawing.',
    label='faq sub')

# ============================================================= final cta
sub('Close The ' + RED + 'Lid.</span>',
    'Stop Redrawing<br>The ' + RED + 'Same</span> Sheet.',
    label='final cta heading')
sub('Local agents die when your laptop sleeps. Hoplite agents keep shipping from the cloud.',
    'A P&amp;ID in 30 seconds. A hydraulic model in under a minute. Every value traceable to its source.',
    label='final cta sub')

# ================================================================= footer
sub('Hoplite allows you to effortlessly deploy cloud coding agents',
    'Early process design for pharma plants, automated and traceable.',
    label='footer tagline')
sub('© 2026 Carbon Copy Markets, Inc.', '© 2026 PIDA.', label='copyright')

# ============================================================ faq, 9 items
# Question 1 keeps to what is decided: no duration, no delivery time, no
# payment statement, because D1 is still open. The speed-claim question is
# not asked, because the founders have not supplied how each is measured and
# an answer must not be invented for them.
FAQ = [
 ('What exactly is an AI agent?',
  'What does the trial include?',
  "A coding agent takes a task — fix this bug, build this feature — and works it in a real dev environment: reading your code, editing files, running tests, and opening a pull request when it's done. You review the result, not every keystroke.",
  'Sign up with an account you already have. There is no password to create. We will email you with the next step.'),

 ('Do I need coding skills?',
  'What does PIDA cover today?',
  'No. Hoplite is designed for founders and operators who prefer explaining tasks in plain English over creating flowcharts. If you can send a Slack message describing the job, you can build an agent.',
  'What this page shows: P&amp;ID generation with an independent check, the project connectivity graph, hydraulic model automation, safety answers on the drawing, flow path and isolation views, and the PIDA Engineer.'),

 ('Which apps does Hoplite integrate with?',
  'Which formats come out?',
  "GitHub for repositories and pull requests, Linear for issues, Slack for updates, and anything that speaks MCP. Inside the sandbox, agents can also install and use your project's own tooling.",
  'The drawing is a DXF. The package beside it holds a check report and redline, a deliverables workbook, an isolation plan, flow paths as PDF layers, a hashed revision chain and a DEXPI export. The Hydraulic Modeler writes a native model file.'),

 ('What tasks can my Hoplite agent handle?',
  'Who checks the output?',
  "Anything you'd hand a teammate with a fresh checkout: features, bug fixes, refactors, test coverage, dependency upgrades, review follow-ups. Each thread runs in its own sandbox with your environment mirrored.",
  'Every generated drawing arrives with an independent check report and a redline drawing. One real run reported PASS, 0 error, 0 warning, and listed 12 lines, 28 valves and 23 instruments.'),

 ('Will it ever act without checking with me first?',
  'Will the same specification give the same drawing twice?',
  'No. File edits, shell commands, and pull-request actions can each be gated on your explicit approval, and everything the agent does streams live so you can step in at any point.',
  'Yes. Run the same specification again and the drawing is byte-identical, so what was reviewed is what everyone gets. That is a statement about the drawing, not about every file in the package.'),

 ('How is Hoplite different from Others?',
  'Can it check a drawing PIDA did not draw?',
  'Every thread gets a real machine, not a text buffer: dependencies installed, tests running, and your app booted on a live preview URL the agent checks its own work against. And you can run a hundred of them at once.',
  'Yes. The checker first proves itself on planted defects, then reports its findings with positions and a redline, so you can see what it caught and what it missed before you trust it with yours.'),

 ('What happens to my data with Hoplite?',
  'Where do my documents go?',
  'It stays yours. Every session runs in an isolated sandbox, your code and credentials are encrypted in transit and at rest, and neither we nor the model providers train on your data.',
  'They stay yours. PIDA works local first, and a document that has not been cleared for use never leaves the PC.'),

 ('Can I try Hoplite before subscribing?',
  'What does the Engineer answer from?',
  'Start solo on Free with no long-term commitment, or try Pro before paying to add team capacity and included per-seat credits.',
  'Only from documents PIDA holds: 94 of them, 1,772 design rules in 46 topics and 67 vendor datasheets, including ASME BPE-2026, the EU Pressure Equipment Directive, API 520, 521 and 2000, and the ISPE Baseline Guides.'),

 ('Why is it named Hoplite?',
  'What does PIDA stand for?',
  'Hoplites were the citizen-soldiers of ancient Greece — capable alone, devastating in formation. One agent is useful; a phalanx of them ships your whole backlog.',
  'Pharma Industry Design Automation. A P&amp;ID is a piping and instrumentation diagram, which is the drawing the whole package is built from.'),
]

for i, (oq, nq, oa, na) in enumerate(FAQ, 1):
    sub(oq, nq, label=f'faq Q{i}')
    sub(oa, na, label=f'faq A{i}')

# =========================================================== pricing plans
# The figures are NOT set. D1 is open and the standing rule is that nothing
# on this site states a duration or a payment term until it is. The price
# slots therefore read "Not set", which cannot be mistaken for a number, and
# the section carries a staging notice. Replace both when the founders
# decide; do not fill them in from a guess.
sub('>Free</p>', '>Trial</p>', label='plan 1 name')
sub('>Pro</p>',  '>Team</p>',  label='plan 2 name')
sub('>$0</span>',  '>Not set</span>', label='plan 1 price')
sub('>$99</span>', '>Not set</span>', label='plan 2 price')
sub('<span class="text-[14px] leading-[1.2] text-(--body)">Seat<br>/month</span>', '',
    label='per-seat unit')
sub('$<!-- -->82.50<!-- --> <!-- -->on yearly', 'Figure to be confirmed',
    label='yearly badge')

sub('Run agents yourself, free — just you, with 2× usage on OpenAI and Anthropic models. Nothing charged.',
    'Sign up with an account you already have. There is no password to create. We will email you with the next step.',
    label='plan 1 body')
sub('For teams putting agents on real work every day, with credits included per seat.',
    "For a group that reviews and signs each other's drawings, working on the same projects.",
    label='plan 2 body')
sub('Start 14 day free trial', 'Sign up for trial', label='plan 2 cta')
sub('Everything in Free, plus:', 'Everything in Trial, plus:', label='plan 2 features head')

# Feature bullets: every line below is a capability this page demonstrates.
sub_all('2× usage on OpenAI and Anthropic models',
        'P&amp;ID generation with an independent check on every drawing', label='f1')
sub('5 concurrent 2 CPU / 8 GB cloud sessions',
    'The project connectivity graph, as one rotating 3D view', label='f2')
sub('2 projects', 'Hydraulic model automation with every value marked', label='f3')
sub('Luna, Terra, Sonnet 5, GLM 5.3 + Flash, and DeepSeek V4 Flash',
    'Safety answers and isolation views built from the drawing', label='f4')
sub('Card required — nothing charged',
    'Open formats out: DXF, DEXPI, PDF, XLSX', label='f5')
sub('$100 credits', 'Your documents stay yours, local first', label='f6')

sub('$100 of usage credits per seat each month',
    'Shared projects across a review team', label='f7')
sub('Team seats and shared workspaces',
    'Checking of drawings made elsewhere, with planted-defect proof runs', label='f8')
sub('Much higher limits for agents and automations',
    'Hashed revision chain on every generated sheet', label='f9')
sub('Bigger, faster sandboxes', 'HAZOP starter and isolation plan', label='f10')
sub('Standard support', 'Support during the trial', label='f11')

sub_all('href="/login?plan=free&amp;interval=monthly"', 'href="/trial"', label='plan 1 href')

# ================================================== last brand references
sub('A board of Hoplite agent threads running in parallel — some succeeded, some merged, one hit a conflict, and others are still running.',
    'A board of PIDA sheets in one project, some checked, some merged, one flagged as joined to nothing, and others still generating.',
    label='board aria-label')
sub_all('• Hoplite •', '• PIDA •', label='circular text')
sub_all('sans-serif;">Hoplite</span>', 'sans-serif;">PIDA</span>', label='mockup wordmark')
sub('dark:invert">Hoplite</p>', 'dark:invert">PIDA</p>', label='footer wordmark')

# The notice is deliberately loud. It is the only thing standing between an
# unset figure and a live page.
NOTICE = ('<p style="margin:0 auto 28px;max-width:72ch;padding:14px 20px;'
          'border:1px solid rgba(255,54,22,0.35);border-radius:12px;'
          'background:rgba(255,54,22,0.12);color:var(--ink);font-size:14px;'
          'line-height:1.5;text-align:left">'
          '<strong style="color:#ff5a33;font-weight:600">Staging notice.</strong> '
          'The figures below are not set. Pricing is blocked on decision D1 and '
          'this section must not go live with a placeholder in the price slot.</p>')
sub('<div class="grid gap-[12px] md:grid-cols-2">', NOTICE + '<div class="grid gap-[12px] md:grid-cols-2">',
    label='pricing staging notice')

# ============================================ leftover references to origin
drop(r'<link rel="alternate"[^>]*hoplite\.sh[^>]*>', label='llms/agents txt links', expect=2)
sub_all('data-hoplite-', 'data-pida-', label='shell data attributes')
sub_all('--hoplite-desktop-titlebar-height', '--pida-desktop-titlebar-height',
        label='titlebar var')
sub('https://api.hoplite.sh/api/desktop/nightly/download', '/trial', label='nightly link')
sub('Download Nightly', 'Sign up for trial', label='nightly label')

# ====================================== use cases, the collaboration mockup
# Invented people and an invented ticket, reset to the PIDA equivalent: a
# review thread on a sheet.
sub('Manage Staging URLs Terraform', 'Isolate Condenser 1 C-201', label='thread title')
sub('Add managed staging URLs to our Terraform stack',
    'Which valves do I close to isolate Condenser 1?', label='thread first message')
sub('@henry can you take a look at the DNS config?',
    '@priya can you check the fail position on CV-214?', label='thread reply 1')
sub('On it. @hoplite set up the DNS records',
    'On it. @pida show the isolation envelope', label='thread reply 2')
sub('Jenna is typing', 'Priya is typing', label='typing indicator')
sub('Fable 5.0', 'PIDA Engineer', label='model chip')

# Names: the reference ships four. Kept as four, made specific rather than
# the placeholder set a template reaches for.
sub_all('>Jenna<', '>Priya<',   label='name 1')
sub_all('>Henry<', '>Marek<',   label='name 2')
sub_all('>Jefferson<', '>Aoife<', label='name 3')
sub_all('>Sunny<', '>Tomas<',   label='name 4')

# ============================================ use cases, the issues mockup
sub('Sentry issues', 'Check findings', label='issues source')
sub_all('Write to the database', 'Line leaves the sheet', label='issue title')
sub('Resolving Error', 'Resolving finding', label='issue status')

# =============================================================== footer nav
sub('>About</a>', '>Why believe it</a>', label='footer About')
sub('>Branding</a>', '>Questions</a>', label='footer Branding')
sub('>Contact</a>', '>Trial terms</a>', label='footer Contact')
sub('Terms &amp; Conditions', 'Legal and accessibility', label='footer terms')

# ================================================================= write
io.open(OUT, 'w', encoding='utf-8').write(h)
print(f'OK  {len(LOG)} edits applied  ->  {OUT} ({len(h)} bytes)')
