# CABAL Monthly Report — August 2026

Monthly report website for Combo Interactive's PH AE Team. Covers **Cabal Mobile**
(CABAL Infinite Combo) and **Cabal PC** (CABAL Ultimate Combo), each split into four
programs: Community, Top Spender/VIP, Guild Leader, Streamer.

The UI follows the two existing report sites:

- https://cabal-q2-q3-report.vercel.app/ — design system (colours, Montserrat + Inter,
  kicker chips, stat cards, badge rows, strip cards, amber-bar notes, source cards)
- https://cabal-pride-campaign-report.vercel.app/ — product icons and the
  card-with-artwork pattern

## Status

| Product | Program | State |
| --- | --- | --- |
| Cabal Mobile | Community | Reported — full data from the August deck |
| Cabal Mobile | Top Spender/VIP | Reported — roster by tier, July vs August, and the Special Benefit E-Card |
| Cabal Mobile | Guild Leader | Reported — Guild Ranking Challenge + program update |
| Cabal Mobile | Streamer | Pending — no report received |
| Cabal PC | Community | Reported — full data from the August PC deck |
| Cabal PC | Top Spender/VIP | Reported — VIP top-up, tier breakdown, player movements from the August workbook |
| Cabal PC | Guild Leader | Reported — two guild events, roster participation and the 10% bonus from the August workbook |
| Cabal PC | Streamer | Pending — no report received |

Report status is **Draft**. Two of eight programs are still to come.

## Run it

No build step, no dependencies. Open `index.html` in a browser, or:

```bash
python3 -m http.server 8000     # then open http://localhost:8000
```

To produce a single self-contained file for email or Slack:

```bash
python3 build.py                # -> dist/august-2026-monthly-report.html
```

`build.py` inlines the CSS, the JS and every image as a data URI. Re-run it after
any data change. `dist/` is disposable output.

## Files

```
index.html   markup shell — the topbar, empty containers, lightbox, present controls
styles.css   all styling, including the print stylesheet and presentation mode
data.js      ASSETS (image paths) + REPORT (everything the page says). EDIT THIS.
app.js       renderers. Reads REPORT, writes the DOM. Unchanged month to month.
assets/      logo, the two product icons, section banners, event creatives
build.py     inlines everything into dist/ as one HTML file
```

The whole page is rendered from `REPORT`. There is no content in `index.html`.

## Editing the data

Everything lives in `data.js`. The structure:

```
REPORT
├─ meta          company, team, period, headline, status, compiled date
├─ nav           top bar links
├─ overview      cross-program headline, stats, notes
├─ products[]    Cabal Mobile, Cabal PC
│  └─ programs[] Community / Top Spender-VIP / Guild Leader / Streamer
│     ├─ status: "reported" | "pending"
│     ├─ lede, short, badges, sourceLine, banner, bannerCaption
│     ├─ stats[]   the KPI cards
│     └─ blocks[]  ordered content, each with a "type"
├─ next          What's Next
├─ sources       source cards
└─ dataNotes     the verification list at the bottom
```

### Block types

| type | renders |
| --- | --- |
| `notes` | amber-bar callout — `{ lead, bullets }`. Placed **first** in `blocks`, it becomes the program key points and renders above the KPI cards |
| `panel` | one panel — `{ title, paragraphs, bullets, note }` |
| `grid` | panels in a 1/2/3-column grid; items take `paragraphs`, `bullets`, `stats`, `chart` |
| `activities` | grouped activity cards; 3+ items in a group render as photo cards, fewer render wide (with `objective`, `highlights`, `results` and an optional `image` beside the text) |
| `charts` | one or two chart panels |
| `table` | generic table — `{ columns, rows, note }`; a column may be `{ text, num }`, a cell `{ text, sub, cls }` |
| `issues` | issues and risks table |
| `actions` | action items table |

Charts are `{ title, type: "bar" | "line", unit, labels, series: [{ name, values, color }] }`.
A `null` in `values` leaves that bar out, which is how the before/during Mission War
charts split one axis across two series.

### Adding a program report

Find the program in `products[].programs[]`, flip `status` to `"reported"`, then fill
`lede`, `short`, `badges`, `sourceLine`, `stats` and `blocks`. The strip cards on the
overview and the product header flip to "Reported" automatically and the counts update.

### Adding a new month

Copy the folder, update `meta`, empty out the reported programs and start again. The
renderers do not change.

## Adding images

1. Drop a WebP into `assets/`.
2. Add a key to `ASSETS` at the top of `data.js`, e.g. `event_foo: "assets/event-foo.webp"`.
3. Reference it by key: `banner: "event_foo"` on a program, `image: "event_foo"` on an
   activity item.

The Cabal Mobile images were cropped out of the Canva slide exports at 1280×720 and the
Cabal PC Community banner and event creatives out of that deck's exports at 1920×1080; all
are re-encoded as WebP (~300px wide for event creatives, 760px for banners). Every image opens in a
lightbox on click.

## Features

- **Present** button in the top bar — full-screen, one section per slide, arrow keys
  and Esc, driven by `.slide` elements
- Print stylesheet switches to a light theme with page breaks per section
- Chart tooltips on hover via `data-tt`
- Scrollspy on the top nav, reveal-on-scroll via `.rise`

## Open items

**Verification** — these are the deck ambiguities, also listed at the bottom of the page
under Data notes:

- Cabal Mobile Community: legend says men 92.2%, pie label reads 92.9%. Using 92.2%.
- Cabal Mobile Community: 565 new members vs 693 net growth — both as stated in the deck.
- Cabal Mobile Community: PH region shares read off the chart image; the age chart and the moderator
  approvals/declines chart have no value labels, so they're described in words only.
  Send the numbers and they can become charts.
- Cabal Mobile Community: the Community Talks video post carries the same five figures as Spot the
  Difference (47 / 110 / 67 / 1,100 / 226) — looks like a copy-over in the deck.
- Cabal Mobile Guild Leader: the challenge counts 58 Guild Leaders, the program update counts 52
  partnered. Both shown as stated. "10% Guild Leaders" kept as labelled.
- Cabal Mobile Guild Leader: 8 non-participants (6 work, 2 hospitalized) and 7 removals (5 work,
  2 hospitalized) are separate facts from separate sources.
- Cabal Mobile Guild Leader: deck text says Bracket 199 pre-event totals ranged 100–113, but its own
  chart puts Aug 3 at 119 and Aug 5 at 97.
- Cabal Mobile Top Spender: Active (47) and Inactive (143) do not add up to the Total (151); July has
  the same gap (45, 143, 148). Shown as stated.
- Cabal Mobile Top Spender: the report sheet says 71 E-Card receivers (8 High, 63 Mid); the E-Card
  activity tab's PH row says 62 Mid, 14 High, 76 total. The report sheet is used.
- Cabal Mobile Top Spender: the E-Card tab still shows delivery and code generation "In progress";
  the report sheet has receiver feedback, so it is treated as delivered. The activity
  list dates it 7–31 August, the activity details 9–31 August.
- Cabal PC Top Spender: the summary says 15 new players onboarded; the onboarding list has 14
  entries, one of them the account taken over in the month's single transfer.
- Cabal PC Top Spender: the sheet states no currency for top-up amounts. Player names and
  usernames in the sheet are not reproduced on the site.
- Cabal PC Guild Leader: the Maquinas Speed Run window is 21–26 August but its log holds
  submissions from 16 to 31 August. Only 5 of 16 submissions carry a completion time; a
  non-roster guild logged 214 s against the fastest registered 315 s.
- Cabal PC Guild Leader: the highlight mentions a Guild Mission Festival that is not
  described anywhere else in the workbook or deck.
- Cabal PC Community: the region pie says 28.6% outside the Philippines; the countries chart
  counts 8,847 of 9,911 in the Philippines. Both shown as stated.
- Cabal PC Community: the age, popular-days and moderator approvals charts have no value
  labels (only Sunday 173 and Wednesday 169 are stated), so they are described in words; the
  Philippine region shares are read off the pie image and total 102% as read.
- Cabal PC Community: gender legend reads "men (94%%)"; the growth page also says members
  joined rose 10%. National Heroes Day has no post engagement figure; the second partner-group
  activity is unnamed; hot topics cover Week 1 only.

**Content to add**

- Two pending program reports
- Top Posts and Community Talks currently have no images — the source screenshots are
  Facebook posts that turn illegible at card width
- Community's `sourceLine` carries no preparer credit; Guild Leader's credits AE PH: Ian and
  the Top Spender activity note credits AE PH Jay
- Higher-resolution event creatives if the decks get re-exported at 2560px wide

## Sources

- `[AUG 2026] Community Report` — Canva, 15 pages
- `[AUG 2026] PC Community Report` — Canva, 13 pages
- `Guild Ranking Challenge: August 2026 Insights` — Canva, 6 pages, prepared by AE PH: Ian
- Guild Program update (partnered count, 10% Guild Leaders, removals) — shared as text
- `[TS] Monthly Report - August` — Google Sheet, one tab: July/August roster by tier and
  the Special Benefit E-Card (requirements, receivers, feedback, banner link)
- `ITEM CODE (BD) 2025 - MSEA [UPDATED 2026]` — tab `[SEA-TS] August E-Card (SPECIAL
  BENEFIT)`: activity dates, conditions, per-country receiver counts; owner AE PH Jay
- `Montly Report - Top Spenders AUGUST.xlsx` — sheet `VIP Report Aug '26` (Staz VIP Report —
  August 2026): summary metrics, tier breakdown, top 10, onboarding, transfers, promotions
- `Montly Report - Guild Leader AUGUST.xlsx` — KPI Summary, Guild Roster & Bonus, Guild Battle
  Arena and Maquinas Speed Run submission logs
- `TS & GL Slides.pptx` — 6 slides, August 2026 VIP Performance & Philippines Guild Events KPI
  Summary
