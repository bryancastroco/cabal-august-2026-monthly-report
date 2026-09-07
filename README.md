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
| Cabal Mobile | Top Spender/VIP | Pending — no report received |
| Cabal Mobile | Guild Leader | Reported — Guild Ranking Challenge + program update |
| Cabal Mobile | Streamer | Pending — no report received |
| Cabal PC | Community | Pending |
| Cabal PC | Top Spender/VIP | Pending |
| Cabal PC | Guild Leader | Pending |
| Cabal PC | Streamer | Pending |

Report status is **Draft**. Six of eight programs are still to come.

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
| `notes` | amber-bar callout — `{ lead, bullets }` |
| `panel` | one panel — `{ title, paragraphs, bullets }` |
| `grid` | panels in a 1/2/3-column grid; items take `paragraphs`, `bullets`, `stats`, `chart` |
| `activities` | grouped activity cards; 3+ items in a group render as photo cards, fewer render wide |
| `charts` | one or two chart panels |
| `table` | generic table — `{ columns, rows }` |
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

Current images were cropped out of the Canva slide exports at 1280×720 and re-encoded
as WebP (~300px wide for event creatives, 760px for banners). Every image opens in a
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

- Community: legend says men 92.2%, pie label reads 92.9%. Using 92.2%.
- Community: 565 new members vs 693 net growth — both as stated in the deck.
- Community: PH region shares read off the chart image; the age chart and the moderator
  approvals/declines chart have no value labels, so they're described in words only.
  Send the numbers and they can become charts.
- Community: the Community Talks video post carries the same five figures as Spot the
  Difference (47 / 110 / 67 / 1,100 / 226) — looks like a copy-over in the deck.
- Guild Leader: the challenge counts 58 Guild Leaders, the program update counts 52
  partnered. Both shown as stated. "10% Guild Leaders" kept as labelled.
- Guild Leader: 8 non-participants (6 work, 2 hospitalized) and 7 removals (5 work,
  2 hospitalized) are separate facts from separate sources.
- Guild Leader: deck text says Bracket 199 pre-event totals ranged 100–113, but its own
  chart puts Aug 3 at 119 and Aug 5 at 97.

**Content to add**

- Six pending program reports
- Top Posts and Community Talks currently have no images — the source screenshots are
  Facebook posts that turn illegible at card width
- `preparedBy` on the Community program is empty; Guild Leader credits AE PH: Ian
- Higher-resolution event creatives if the decks get re-exported at 2560px wide

## Sources

- `[AUG 2026] Community Report` — Canva, 15 pages
- `Guild Ranking Challenge: August 2026 Insights` — Canva, 6 pages, prepared by AE PH: Ian
- Guild Program update (partnered count, 10% Guild Leaders, removals) — shared as text
