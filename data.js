/* ---------------------------------------------------------------------
   ASSETS — every image the page can use, keyed by name.
   Add a WebP to assets/, add a key here, then reference the key from
   REPORT (banner: "banner_guild" on a program, image: "pir1" on an activity).
   build.py inlines these as data URIs for the single-file version.
   --------------------------------------------------------------------- */
const ASSETS = {
  logo: "assets/logo.webp",
  cbm: "assets/icon-cbm.webp",
  cbpc: "assets/icon-cbpc.webp",
  banner_community: "assets/banner-community.webp",
  banner_guild: "assets/banner-guild.webp",
  pir1: "assets/event-price-is-right-1.webp",
  pir2: "assets/event-price-is-right-2.webp",
  nhd: "assets/event-national-heroes-day.webp",
  tot: "assets/event-this-or-that.webp",
  spot: "assets/event-spot-the-difference.webp",
  match: "assets/event-match-it.webp",
  banner_vip_pc: "assets/banner-vip-pc.webp",
  banner_guild_pc: "assets/banner-guild-pc.webp",
  banner_community_pc: "assets/banner-community-pc.webp",
  pc_trivia: "assets/event-pc-trivia-challenge.webp",
  pc_puzzle: "assets/event-pc-word-puzzle.webp",
  pc_nhd: "assets/event-pc-national-heroes-day.webp",
  pc_guess: "assets/event-pc-guess-the-location.webp",
  pc_screenshot: "assets/event-pc-screenshot-activity.webp"
};

/* =====================================================================
   DATA LAYER — everything on the page is rendered from this REPORT object.
   This file is the only one you edit month to month; app.js does not change.

   Structure: products (Cabal Mobile, Cabal PC) → programs (Community,
   Top Spender/VIP, Guild Leader, Streamer). A program is either
   status "reported" with content, or status "pending" with a note.

   Reported program content, in the order it is shown:
     short       one line for the program strip cards
     banner      optional key into ASSETS for the wide image above the program
     bannerCaption  caption bar printed under the banner
     lede        one-sentence headline for the program
     badges      [{ text, kind: "ok" | "info" | "dim" | "amber" }]
     sourceLine  optional line naming the source deck
     stats       KPI cards: [{ label, value, unit, small, note, tone: "up" | "down" }]
     blocks      ordered content blocks, each with a "type":
       notes       { lead, bullets }                 amber-bar callout. A notes block
                   placed FIRST is the program's key points: it renders above the KPI
                   cards so the program opens with its takeaways, not a wall of numbers.
       panel       { title, paragraphs, bullets, note }    single panel; note prints small under it
       grid        { title, intro, cols, items }     panels in a grid;
                   item: { title, subtitle, paragraphs, bullets, stats: [{label, value}], chart, note }
       activities  { title, groups: [{ name, intro, note, items }] }
                   item: { name, dates, status, category, description, image (ASSETS key), objective, results: [{label, value}], highlights }
       charts      { title, items: [chart] }        chart: { title, type: "bar" | "line", unit, labels, series: [{ name, values, color }], note }
       table       { title, columns, rows, note }   columns are strings or { text, num }; rows are arrays of cells; a cell may be { text, sub, cls }
       issues      { title, items }                  item: { title, impact, severity, status, owner, resolution }
       actions     { title, items }                  item: { action, owner, due, status }

   Sources for this edition
   - Cabal Mobile Community: Canva deck "[AUG 2026] Community Report" (15 pages).
   - Cabal Mobile Guild Leader: Canva deck "Guild Ranking Challenge: August 2026
     Insights" (6 pages, prepared by AE PH: Ian) and the Guild Program update text.
   - Cabal Mobile Top Spender/VIP: Google Sheet "[TS] Monthly Report - August" (one tab:
     July/August roster by tier, E-Card receivers and feedback) and the
     "[SEA-TS] August E-Card (SPECIAL BENEFIT)" tab of "ITEM CODE (BD) 2025 - MSEA
     [UPDATED 2026]" (activity dates, conditions, per-country counts).
   - Cabal PC Community: Canva deck "[AUG 2026] PC Community Report" (13 pages); its
     banner and five event creatives are cropped from the deck's page exports.
   - Cabal PC Top Spender/VIP: "Montly Report - Top Spenders AUGUST.xlsx", sheet
     "VIP Report Aug '26" (Staz VIP Report — August 2026), and the "TS & GL Slides" deck.
   - Cabal PC Guild Leader: "Montly Report - Guild Leader AUGUST.xlsx" (KPI Summary,
     Guild Roster & Bonus, Guild Battle Arena and Maquinas Speed Run logs) and the
     "TS & GL Slides" deck. The Top Spender/VIP and Guild Leader banners are cropped from
     that deck's artwork.
   Figures are taken as they appear in those sources; nothing has been
   added or estimated. Anything unclear is listed under Data notes.
   ===================================================================== */
const REPORT = {
  meta: {
    company: "Combo Interactive",
    team: "PH AE Team",
    reportType: "Monthly Report",
    period: "August 2026",
    periodShort: "1 – 31 Aug 2026",
    market: "Philippines",
    products: "CABAL Infinite Combo & Ultimate Combo",
    headline: "Six of eight programs reported. Cabal Mobile: 21,507 members, 151 Top Spenders, 86.2% Guild Leader participation. Cabal PC: 9,911 members, 44,302 VIP top-up, 13 of 14 guilds active.",
    status: "Draft",
    compiled: "7 September 2026"
  },

  nav: [
    { href: "#overview", text: "Overview" },
    { href: "#mobile", text: "Cabal Mobile" },
    { href: "#pc", text: "Cabal PC" },
    { href: "#next", text: "What's Next" },
    { href: "#sources", text: "Sources" }
  ],

  overview: {
    kicker: "Headline",
    title: "The Month So Far",
    lede: "Six of eight programs reported; Streamer is outstanding on both products. Reward-based activity moved the numbers everywhere it ran.",
    stats: [
      { label: "Programs reported", value: "6", small: "of 8", note: "Community, Top Spender/VIP and Guild Leader on both products. Streamer pending on both." },
      { label: "Mobile community members", value: 21507, note: "+693 (3.33%), of which 565 new members." },
      { label: "Mobile Top Spenders", value: 151, note: "148 in July. 47 active; 71 received the August E-Card." },
      { label: "Mobile Guild Leader participation", value: "86.2%", note: "50 of 58 joined the challenge. Mission War +22.8% Bracket 199, +36.2% OVL." },
      { label: "PC community members", value: 9911, note: "+104 (1.03%). Comments +54%, views -18.32%." },
      { label: "PC VIP top-up", value: 44302, tone: "up", note: "+48.3% vs July. 83 active players (-1.2%), 6 promotions. No currency stated." },
      { label: "PC guild participation", value: "92.9%", note: "13 of 14 in at least one event, 9 in both." },
      { label: "PC Guild Leader bonus", value: "10%", note: "Applied to all 14 Guild Leaders." }
    ],
    notes: {
      lead: "Six programs have reported.",
      bullets: [
        "Cabal Mobile: Community, Top Spender/VIP, Guild Leader",
        "Cabal PC: Community, Top Spender/VIP, Guild Leader",
        "Pending: Streamer on both products"
      ]
    }
  },

  products: [
    /* ================================================================
       CABAL MOBILE — Infinite Combo
       ================================================================ */
    {
      id: "mobile", name: "Cabal Mobile", full: "CABAL Infinite Combo", icon: "cbm", color: "var(--mob)",
      palette: ["var(--mob)", "var(--mob-dk)", "var(--mob-lt)", "var(--amber)"],
      programs: [
        {
          id: "community", title: "Community", status: "reported",
          short: "21,507 members, +3.33%; comments up 472%",
          banner: "banner_community", bannerCaption: "[AUG 2026] Community Report · Cabal: Infinite Combo – PH Official",
          lede: "Reward-based events drove August: members +3.33%, comments +472%. The group is Cabal: Infinite Combo – PH Official, public.",
          badges: [
            { text: "Reported", kind: "ok" }, { text: "21,507 members", kind: "info" }, { text: "+3.33% growth", kind: "info" },
            { text: "1,584 posts", kind: "info" }, { text: "+472% comments", kind: "info" }
          ],
          sourceLine: "Source: [AUG 2026] Community Report deck, 15 pages.",
          stats: [
            { label: "Total members", value: 21507, note: "+693 in August, a 3.33% increase." },
            { label: "New members", value: 565 },
            { label: "Total views", value: 67746, note: "-1.78% vs July." },
            { label: "Posts", value: 1584 },
            { label: "Comments", value: 1808, tone: "up", note: "+472%. 699 of them on 30 August alone." },
            { label: "Reactions", value: 1795, note: "+9% vs July." },
            { label: "Posts removed", value: 5 },
            { label: "Members in the Philippines", value: 19952, note: "93.4% of the group. 1.9% elsewhere in SEA." }
          ],
          blocks: [
            { type: "notes", lead: "What moved the numbers.",
              bullets: [
                "30 August: 699 comments in one day, as members shared the National Heroes Day teaser for a code",
                "Monday is the most active day (305 interactions); Wednesday second (283, patch day)",
                "Engagement peaks 11 AM Mondays, the best slot for launching events",
                "Talk centred on the F2P vs P2W balance; giveaways seen as key to progression"
              ] },
            { type: "grid", title: "Member profile", cols: 2, items: [
              { title: "Members by location",
                stats: [{ label: "Philippines", value: 19952 }, { label: "Southeast Asia", value: 398 }, { label: "Others", value: 1020 }],
                chart: { title: "Members by location", type: "bar", labels: ["Philippines", "Southeast Asia (SEA)", "Others"], series: [{ name: "Members", values: [19952, 398, 1020] }] } },
              { title: "Members by Philippine region",
                paragraphs: ["NCR and Region IV-A hold over half the members."],
                chart: { title: "Members by Philippine region", type: "bar", unit: "%", labels: ["NCR", "Region IV-A", "Region III", "Visayas", "Mindanao", "MIMAROPA", "CAR"], series: [{ name: "Share of members", values: [33.8, 24.8, 15.3, 10.8, 9.1, 2.3, 1.2] }] } },
              { title: "Members by gender and age",
                bullets: ["25–34 is by far the largest age group, then 35–44, then 18–24", "Women are concentrated in the same 25–34 range"],
                stats: [{ label: "Men", value: "92.2%" }, { label: "Women", value: "7.1%" }, { label: "Custom gender", value: "0%" }] }
            ] },
            { type: "activities", title: "Activities and events", groups: [
              { name: "Official group",
                intro: "Guess-and-comment mechanics drove participation. National Heroes Day took the highest reach and engagement.",
                note: "Facilitated by Moderator Yukon: event posting, banners to CI guidelines, and event data review.",
                items: [
                  { name: "Price Is Right, round 1", category: "Event", image: "pir1", description: "Guess the cost of each dungeon entry.",
                    results: [{ label: "Reactions", value: 113 }, { label: "Comments", value: 217 }, { label: "Shares", value: 112 }, { label: "People reached", value: 3471 }, { label: "Post engagement", value: 448 }] },
                  { name: "Price Is Right, round 2", category: "Event", image: "pir2", description: "Guess the cost of each dungeon entry.",
                    results: [{ label: "Reactions", value: 139 }, { label: "Comments", value: 247 }, { label: "Shares", value: 130 }, { label: "People reached", value: 521 }, { label: "Post engagement", value: 4097 }] },
                  { name: "National Heroes Day Event", category: "Highest reach", image: "nhd", description: "Members shared the 31 August teaser for a code, driving the 30 August spike.",
                    results: [{ label: "Reactions", value: 410 }, { label: "Comments", value: 760 }, { label: "Shares", value: 432 }, { label: "People reached", value: 14100 }, { label: "Post engagement", value: 1602 }] }
                ] },
              { name: "Partner groups",
                intro: "This or That drew the most comments and shares; Match It the highest post engagement.",
                items: [
                  { name: "This or That", category: "Strongest comments and shares", image: "tot", description: "Which materials craft the Chaos Safeguard and Chaos Talisman.",
                    results: [{ label: "Reactions", value: 68 }, { label: "Comments", value: 272 }, { label: "Shares", value: 93 }, { label: "People reached", value: 452 }, { label: "Post engagement", value: 1670 }] },
                  { name: "Spot the Difference", category: "Partner group", image: "spot", description: "Spot the difference between two character images.",
                    results: [{ label: "Reactions", value: 47 }, { label: "Comments", value: 110 }, { label: "Shares", value: 67 }, { label: "People reached", value: 1100 }, { label: "Post engagement", value: 226 }] },
                  { name: "Match It", category: "Highest post engagement", image: "match", description: "Match the skill to its class.",
                    results: [{ label: "Reactions", value: 45 }, { label: "Comments", value: 85 }, { label: "Shares", value: 5 }, { label: "People reached", value: 135 }, { label: "Post engagement", value: 2222 }] }
                ] }
            ] },
            { type: "charts", title: "Activity comparison", items: [
              { title: "Interactions by activity", type: "bar",
                labels: ["Price Is Right 1", "Price Is Right 2", "Heroes Day", "This or That", "Spot the Diff.", "Match It"],
                series: [{ name: "Reactions", values: [113, 139, 410, 68, 47, 45] }, { name: "Comments", values: [217, 247, 760, 272, 110, 85] }, { name: "Shares", values: [112, 130, 432, 93, 67, 5] }],
                note: "Official group: Price Is Right 1 and 2, National Heroes Day. Partner groups: This or That, Spot the Difference, Match It." },
              { title: "Reach and post engagement by activity", type: "bar",
                labels: ["Price Is Right 1", "Price Is Right 2", "Heroes Day", "This or That", "Spot the Diff.", "Match It"],
                series: [{ name: "People reached", values: [3471, 521, 14100, 452, 1100, 135] }, { name: "Post engagement", values: [448, 4097, 1602, 1670, 226, 2222] }] }
            ] },
            { type: "grid", title: "Community hot topics", cols: 2, items: [
              { title: "Week 1", bullets: [
                "Force Gems fluctuated moderately: reseller and casual both around $5.06–$5.39, on upgrade demand",
                "SEA vs. ROA: players compared progression, economy and the F2P experience",
                "Events: Monster Invasion well received; Boss Revenge favoured high-CP players",
                "Premium Check-In: mixed feedback on reward changes" ] },
              { title: "Week 2", bullets: [
                "Force Gems stable: reseller $5.05–$5.55, casual $5.20–$5.55, on Path of Dusk and accessory demand",
                "Progression: focus on event rewards and materials",
                "Events: ongoing events drove activity and spending",
                "Community: event and streamer content drove discussion" ] },
              { title: "Week 3", bullets: [
                "Force Gems up slightly then stable: reseller $5.19–$5.51, casual $5.35–$5.51",
                "Safeguard: exchange-limit concerns became a major discussion",
                "Compensation: players asked for more after the Safeguard issue",
                "Dungeon Spotlight: mixed feedback on Archeron Arena drop rates" ] },
              { title: "Week 4", bullets: [
                "Force Gems rose late: reseller $5.17–$5.33 to $5.80–$6.13, August's strongest prices",
                "Newbie support: requests for Newbie and Retention Codes",
                "Rare drop: Laxar's Brooch (Medium) generated excitement",
                "SEA vs. ROA: server comparisons stayed active" ] }
            ] },
            { type: "grid", title: "Top posts", cols: 3,
              intro: "Events, giveaways and patch discussion drove the most engagement.",
              items: [
                { title: "National Heroes Day Event", subtitle: "Moderator Yukon's post" },
                { title: "Patch-related text post", subtitle: "Update details shared with the group" },
                { title: "Patch Feedback", subtitle: "“We value your feedback for a better CABAL experience”" }
              ] },
            { type: "grid", title: "Community talks", cols: 2,
              intro: "Two player posts, both on the F2P vs P2W balance.",
              items: [
                { title: "Player text post", stats: [{ label: "Reactions", value: 5 }, { label: "Comments", value: 8 }, { label: "Shares", value: 0 }, { label: "People reached", value: 1700 }, { label: "Post engagement", value: 133 }] },
                { title: "Player video post", stats: [{ label: "Reactions", value: 47 }, { label: "Comments", value: 110 }, { label: "Shares", value: 67 }, { label: "People reached", value: 1100 }, { label: "Post engagement", value: 226 }] }
              ] },
            { type: "grid", title: "Moderators", cols: 3, items: [
              { title: "Moderator Perry", paragraphs: ["Leads approvals; carries a much heavier workload than the others."] },
              { title: "Moderator Meow", paragraphs: ["Balanced moderation, but low overall activity."] },
              { title: "Moderator Pinky", paragraphs: ["Focuses on declining unsuitable posts; little involvement in approvals."] }
            ] },
            { type: "issues", title: "Issues and risks", items: [
              { title: "Safeguard exchange-limit issue", impact: "A major player discussion in week 3; players asked for broader compensation.", severity: "", status: "", owner: "", resolution: "" },
              { title: "Uneven moderator workload", impact: "Perry carries a much heavier load; Meow's activity is low and Pinky rarely approves.", severity: "", status: "", owner: "", resolution: "New MOU defining roles and deliverables; weekly moderator reports." },
              { title: "Competing release: Cabal Red Thailand", impact: "A competing release could affect community sentiment and activity.", severity: "", status: "Monitoring", owner: "", resolution: "Keep monitoring discussion and sentiment." }
            ] },
            { type: "actions", title: "Action items", items: [
              { action: "Publish at least one Newbie Guide per week", owner: "Community moderators", due: "Weekly", status: "Planned" },
              { action: "Present weekly moderator reports for review", owner: "Community moderators", due: "Weekly", status: "Planned" },
              { action: "Run a TikTok dance challenge with Force Gems as rewards", owner: "", due: "September 2026", status: "Planned" },
              { action: "Shift partner group events to emoji- and reaction-based mechanics", owner: "", due: "", status: "Planned" },
              { action: "Monitor sentiment around competing releases, particularly Cabal Red Thailand", owner: "", due: "Ongoing", status: "Ongoing" },
              { action: "Issue a new MOU defining moderator roles, responsibilities and deliverables", owner: "", due: "", status: "Planned" }
            ] }
          ]
        },

        {
          id: "vip", title: "Top Spender/VIP", status: "reported",
          short: "151 Top Spenders, +3; 71 received the August E-Card",
          lede: "Roster 148 to 151, every tier up by one; active 45 to 47. The August E-Card went to 71 High and Mid Tier accounts.",
          badges: [
            { text: "Reported", kind: "ok" }, { text: "151 Top Spenders", kind: "info" }, { text: "+3 vs July", kind: "info" },
            { text: "47 active", kind: "info" }, { text: "71 E-Card receivers", kind: "info" }, { text: "9 account transfers", kind: "amber" }
          ],
          sourceLine: "Sources: [TS] Monthly Report - August sheet, and the [SEA-TS] August E-Card (SPECIAL BENEFIT) tab of the ITEM CODE (BD) 2025 - MSEA [UPDATED 2026] sheet.",
          stats: [
            { label: "Total Top Spenders", value: 151, note: "148 in July, up by 3." },
            { label: "Active", value: 47, tone: "up", note: "45 in July." },
            { label: "Inactive", value: 143, note: "Unchanged from July." },
            { label: "New onboarded", value: 2, note: "Same as July." },
            { label: "Account transfers", value: 9, note: "1 in July." },
            { label: "Leviathan", value: 9, note: "8 in July." },
            { label: "Moby Dick", value: 40, note: "39 in July." },
            { label: "Big Daddy", value: 102, note: "101 in July." }
          ],
          blocks: [
            { type: "notes", lead: "Where the growth came from.",
              bullets: [
                "Every tier added one account in August: Leviathan 8 to 9, Moby Dick 39 to 40, Big Daddy 101 to 102",
                "Active 45 to 47; inactive unchanged at 143",
                "Account transfers 1 to 9, the month's largest change; new onboarded held at 2",
                "August E-Card went to 71 accounts: 8 High Tier, 63 Mid Tier"
              ] },
            { type: "grid", title: "Roster, July vs August", cols: 2, items: [
              { title: "Top Spenders by tier",
                paragraphs: ["Big Daddy is by far the largest tier: 102 of 151."],
                chart: { title: "Top Spenders by tier", type: "bar", labels: ["Leviathan", "Moby Dick", "Big Daddy"],
                  series: [{ name: "July", color: "var(--mob-dk)", values: [8, 39, 101] }, { name: "August", color: "var(--mob)", values: [9, 40, 102] }] } },
              { title: "Roster movement",
                paragraphs: ["Account transfers, 1 to 9, were the month's largest change."],
                chart: { title: "Roster movement", type: "bar", labels: ["Total", "Active", "Inactive"],
                  series: [{ name: "July", color: "var(--mob-dk)", values: [148, 45, 143] }, { name: "August", color: "var(--mob)", values: [151, 47, 143] }] },
                note: "Active and inactive are as stated and do not sum to the total (see Data notes)." }
            ] },
            { type: "activities", title: "Activities and events", groups: [
              { name: "Special Benefit",
                intro: "An item code sent to High and Mid Tier accounts on their country's national holiday: 31 August for the Philippines.",
                note: "Owner per the activity list: AE PH Jay. Banner posting linked from the report sheet.",
                items: [
                  { name: "August E-Card, National Heroes Day", dates: "9–31 August 2026", category: "Special Benefit (E-Card)", image: "nhd",
                    description: "Codes activated 9 August, redeemable until 15 September. Logged as a retention benefit.",
                    objective: "Reward High and Mid Tier Top Spenders on National Heroes Day.",
                    highlights: [
                      "Requirement: account lifetime value of $15,000 and higher",
                      "One code per ID, redeemable once, on one character, at sea-member.combocabalm.com/rewards",
                      "Mid Tier's reward was rated better: it included an Agent Yul accessory",
                      "Not all High Tier accounts are maxed out in upgrades, causing frustration with their reward"
                    ],
                    results: [{ label: "Receivers", value: 71 }, { label: "High Tier", value: 8 }, { label: "Mid Tier", value: 63 }] }
                ] }
            ] },
            { type: "issues", title: "Issues and risks", items: [
              { title: "High Tier E-Card reward seen as weaker than Mid Tier", impact: "Mid Tier got an Agent Yul accessory; High Tier rated their reward worse, and not all High Tier accounts are maxed out in upgrades.", severity: "", status: "Open", owner: "", resolution: "None recorded in the sheets. The next Special Benefit E-Card is listed for 2–30 September." }
            ] }
          ]
        },

        {
          id: "guild", title: "Guild Leader", status: "reported",
          short: "86.2% joined the Guild Ranking Challenge; Mission War +22.8% / +36.2%",
          banner: "banner_guild", bannerCaption: "Guild Ranking Challenge · August 2026 · 17–21 August",
          lede: "50 of 58 Guild Leaders joined the challenge. Mission War participation rose 22.8% in Bracket 199 and 36.2% in OVL.",
          badges: [
            { text: "Reported", kind: "ok" }, { text: "86.2% participation", kind: "info" }, { text: "+22.8% Bracket 199", kind: "info" },
            { text: "+36.2% OVL", kind: "info" }, { text: "7 removed from program", kind: "amber" }
          ],
          sourceLine: "Sources: Guild Ranking Challenge: August 2026 Insights deck (prepared by AE PH: Ian) and the Guild Program update.",
          stats: [
            { label: "Guild Leaders in the challenge", value: 58 },
            { label: "Participated", value: 50, note: "86.2% participation rate." },
            { label: "Did not participate", value: 8, note: "6 work or no time, 2 hospitalized." },
            { label: "Partnered Guild Leaders", value: 52, note: "Per the Guild Program update." },
            { label: "10% Guild Leaders", value: 46, note: "Per the Guild Program update." },
            { label: "Removed from the Guild Program", value: 7, note: "4 consecutive missed activities, after notices and warnings." },
            { label: "Bracket 199 uplift", value: "+22.8%", tone: "up", note: "129.4 per day during, from 105.4 before." },
            { label: "OVL bracket uplift", value: "+36.2%", tone: "up", note: "286.0 per day during, from 210.0. Full 150 vs 150 on 20–21 August." }
          ],
          blocks: [
            { type: "notes", lead: "Participation and absences.",
              bullets: [
                "50 of 58 Guild Leaders took part",
                "All 8 absences were work or health: 6 had no time, 2 were hospitalized",
                "No stated rejection of the activity was reported",
                "Tracked 8 days before (3–13 Aug) against 5 days during (17–21 Aug)"
              ] },
            { type: "activities", title: "Activities and events", groups: [
              { name: "", items: [
                { name: "Guild Ranking Challenge", dates: "17–21 August 2026", status: "Completed", category: "Guild Leaders",
                  description: "Participation compared across 8 days before and the 5 event days, in Bracket 199 and OVL.",
                  results: [{ label: "Participated", value: "50 of 58" }, { label: "Participation rate", value: "86.2%" }, { label: "Bracket 199 uplift", value: "+22.8%" }, { label: "OVL bracket uplift", value: "+36.2%" }],
                  highlights: ["Full server capacity of 150 vs 150 reached in the OVL bracket on 20 and 21 August", "Peak day in Bracket 199: 19 August with 139 participants in total"] }
              ] }
            ] },
            { type: "grid", title: "Mission War participation, before vs during the event", cols: 1,
              intro: "Average players per side per day: 8 days before (3–13 Aug) against 5 days during (17–21 Aug).",
              items: [
                { title: "Bracket 199",
                  bullets: ["Before: daily totals 100–113, averaging 52.7 per side; lowest 5 August at 97", "During: 122–139, peaking 19 August at 139", "A 22.8% uplift on the pre-event baseline"],
                  stats: [{ label: "Avg total per day, before", value: 105.4 }, { label: "Avg total per day, during", value: 129.4 }, { label: "Uplift", value: "+22.8%" }, { label: "Avg per side, before", value: 52.7 }, { label: "Avg per side, during", value: 64.7 }],
                  chart: { title: "Bracket 199, average players per side", type: "bar",
                    labels: ["Aug 3", "Aug 4", "Aug 5", "Aug 6", "Aug 10", "Aug 11", "Aug 12", "Aug 13", "Aug 17", "Aug 18", "Aug 19", "Aug 20", "Aug 21"],
                    series: [
                      { name: "Before event", color: "var(--mob-dk)", values: [59.5, 50, 48.5, 56.5, 54.5, 49.5, 52, 51, null, null, null, null, null] },
                      { name: "During event", color: "var(--mob)", values: [null, null, null, null, null, null, null, null, 62.5, 65.5, 69.5, 61, 65] }
                    ] } },
                { title: "OVL bracket",
                  bullets: ["Before: 89–146 per side; daily totals 282, 263, 257, 217, 196, 192, 188, 183, averaging 210.0", "During: 248, 285, 297, 300, 300, averaging 286.0", "20 and 21 August hit 150 vs 150, full server capacity"],
                  stats: [{ label: "Avg total per day, before", value: 210.0 }, { label: "Avg total per day, during", value: 286.0 }, { label: "Uplift", value: "+36.2%" }, { label: "Avg per side, before", value: 105.0 }, { label: "Avg per side, during", value: 143.0 }],
                  chart: { title: "OVL bracket, average players per side", type: "bar",
                    labels: ["Aug 3", "Aug 4", "Aug 5", "Aug 6", "Aug 10", "Aug 11", "Aug 12", "Aug 13", "Aug 17", "Aug 18", "Aug 19", "Aug 20", "Aug 21"],
                    series: [
                      { name: "Before event", color: "var(--mob-dk)", values: [141, 131.5, 128.5, 108.5, 98, 96, 94, 91.5, null, null, null, null, null] },
                      { name: "During event", color: "var(--mob)", values: [null, null, null, null, null, null, null, null, 124, 142.5, 148.5, 150, 150] }
                    ] } }
              ] },
            { type: "charts", title: "Event impact", items: [
              { title: "Mission War participation uplift, average total per day", type: "bar",
                labels: ["Bracket 199", "OVL bracket"],
                series: [{ name: "Before event (3–13 Aug)", color: "var(--mob-dk)", values: [105.4, 210.0] }, { name: "During event (17–21 Aug)", color: "var(--mob)", values: [129.4, 286.0] }],
                note: "Uplift: +22.8% in Bracket 199, +36.2% in the OVL bracket." }
            ] },
            { type: "grid", title: "Guild Program update", cols: 2, items: [
              { title: "Removals from the Guild Program",
                paragraphs: ["7 Guild Leaders removed after 4 consecutive missed activities."],
                bullets: [
                  "5 were busy with work and no longer have time to play or coordinate with their guild",
                  "2 were hospitalized" ],
                note: "All were given notices and warnings first." },
              { title: "Non-participation in the Guild Ranking Challenge",
                paragraphs: ["No stated rejection of the activity; all 8 absences were work or health."],
                bullets: [
                  "6 busy with work or no time (75%)",
                  "2 hospitalized (25%)" ] }
            ] },
            { type: "issues", title: "Issues and risks", items: [
              { title: "OVL bracket at full server capacity", impact: "20 and 21 August hit 150 vs 150, the server maximum on both sides.", severity: "", status: "Open", owner: "", resolution: "Assess OVL bracket capacity and evaluate whether an additional Mission War channel is justified." },
              { title: "Guild Leader availability", impact: "8 of 58 could not join, and 7 were removed after 4 consecutive missed activities.", severity: "", status: "Open", owner: "", resolution: "Follow up with the 8 non-participating Guild Leaders at an appropriate time." }
            ] },
            { type: "actions", title: "Recommended next steps", items: [
              { action: "Review raising activity codes from 20 to 30 per participant", owner: "", due: "", status: "Recommended" },
              { action: "Assess OVL capacity and whether another Mission War channel is justified", owner: "", due: "", status: "Recommended" },
              { action: "Evaluate the permanent Transmuter / Battle Style proposal with the game team", owner: "", due: "", status: "Recommended" },
              { action: "Repeat the before/during tracking for the next Guild Activity", owner: "", due: "Next Guild Activity", status: "Recommended" },
              { action: "Follow up with the 8 non-participating Guild Leaders at an appropriate time", owner: "", due: "", status: "Recommended" }
            ] }
          ]
        },

        { id: "streamer", title: "Streamer", status: "pending", note: "The August Streamer report for Cabal Mobile has not been received yet." }
      ]
    },

    /* ================================================================
       CABAL PC — Ultimate Combo
       ================================================================ */
    {
      id: "pc", name: "Cabal PC", full: "CABAL Ultimate Combo", icon: "cbpc", color: "var(--pcg)",
      palette: ["var(--pcg)", "var(--pcg-dk)", "var(--pcg-lt)", "var(--amber)"],
      programs: [
        {
          id: "community", title: "Community", status: "reported",
          short: "9,911 members, +1.03%; comments up 54%, views down 18.32%",
          banner: "banner_community_pc", bannerCaption: "[AUG 2026] PC Community Report · Cabal Ultimate Combo - Official (SEA)",
          lede: "Members +1.03% and comments +54%, but views -18.32% and reactions down to 291 from 400. The group is Cabal Ultimate Combo - Official (SEA), public.",
          badges: [
            { text: "Reported", kind: "ok" }, { text: "9,911 members", kind: "info" }, { text: "+1.03% growth", kind: "info" },
            { text: "350 posts", kind: "info" }, { text: "+54% comments", kind: "info" }, { text: "-18.32% views", kind: "amber" }
          ],
          sourceLine: "Source: [AUG 2026] PC Community Report deck, 13 pages.",
          stats: [
            { label: "Total members", value: 9911, note: "+104 in August, a 1.03% increase." },
            { label: "New members", value: 104, note: "The deck also notes a 10% increase in members joined." },
            { label: "Total views", value: 27981, tone: "down", note: "-18.32% vs July." },
            { label: "Posts", value: 350 },
            { label: "Comments", value: 171, tone: "up", note: "+54% vs July." },
            { label: "Reactions", value: 291, tone: "down", note: "400 in July; the deck describes this as almost half." },
            { label: "Posts removed", value: 5, note: "As stated in the deck." },
            { label: "Members in the Philippines", value: 8847, note: "448 elsewhere in SEA, 287 in other countries." }
          ],
          blocks: [
            { type: "notes", lead: "What moved the numbers.",
              bullets: [
                "Sunday is the most active day (173 interactions); Wednesday second (169, ahead of the Thursday patch)",
                "Engagement peaks around 9 AM, 3 PM and 9 PM: before work, at break time and after work",
                "Reactions 400 to 291; the deck suggests activities and patches are not enticing players",
                "Players are more active in-game than in the group, limiting what the team can gather"
              ] },
            { type: "grid", title: "Member profile", cols: 2, items: [
              { title: "Members by location",
                stats: [{ label: "Philippines", value: 8847 }, { label: "Southeast Asia", value: 448 }, { label: "Others", value: 287 }],
                chart: { title: "Members by location", type: "bar", labels: ["Philippines", "Southeast Asia (SEA)", "Others"], series: [{ name: "Members", values: [8847, 448, 287] }] } },
              { title: "Members by country, outside the Philippines",
                paragraphs: ["Indonesia and Malaysia lead outside the Philippines."],
                chart: { title: "Members by country", type: "bar", labels: ["Indonesia", "Malaysia", "UAE", "Vietnam", "USA", "Canada", "Australia", "Thailand", "Japan"], series: [{ name: "Members", values: [210, 115, 78, 74, 56, 54, 52, 49, 47] }] },
                note: "The Philippines (8,847) is left off this chart for scale." },
              { title: "Members by Philippine region",
                paragraphs: ["NCR holds 44.9%. The pie's 28.6% outside the Philippines does not match the countries chart (see Data notes)."],
                chart: { title: "Members by Philippine region", type: "bar", unit: "%", labels: ["NCR", "Region XI", "Region VII", "Region VI", "Region IV-A", "Region III", "Outside PH"], series: [{ name: "Share of members", values: [44.9, 8.3, 7.2, 4.4, 4.4, 4.2, 28.6] }] } },
              { title: "Members by gender and age",
                bullets: ["25–34 is by far the largest age group, then 35–44, then 18–24", "Women are concentrated in the same 25–34 range"],
                stats: [{ label: "Men", value: "94%" }, { label: "Women", value: "6%" }, { label: "Custom gender", value: "0%" }] }
            ] },
            { type: "activities", title: "Activities and events", groups: [
              { name: "Official group",
                intro: "Guess-and-comment mechanics drove participation. Trivia Challenge took the most comments and reach.",
                note: "Facilitated by Moderator Croffles: event posting, some banners, and prize follow-up with players.",
                items: [
                  { name: "Trivia Challenge Event", category: "Most comments and reach", image: "pc_trivia",
                    results: [{ label: "Reactions", value: 17 }, { label: "Comments", value: 35 }, { label: "Shares", value: 5 }, { label: "People reached", value: 2641 }, { label: "Post engagement", value: 57 }] },
                  { name: "Word Puzzle Event", category: "Event", image: "pc_puzzle",
                    results: [{ label: "Reactions", value: 9 }, { label: "Comments", value: 33 }, { label: "Shares", value: 1 }, { label: "People reached", value: 794 }, { label: "Post engagement", value: 43 }] },
                  { name: "National Heroes Day", category: "Most shares", image: "pc_nhd", description: "Salute, Honor, Inspire. No post engagement figure in the deck.",
                    results: [{ label: "Reactions", value: 22 }, { label: "Comments", value: 9 }, { label: "Shares", value: 56 }, { label: "People reached", value: 2112 }] }
                ] },
              { name: "Partner groups",
                intro: "Activities mixing social media with in-game play, usually running 2 days.",
                items: [
                  { name: "Guess the Location", category: "Partner group", image: "pc_guess",
                    description: "Comment the answer and account ID for a code; the first 10 correct win.",
                    results: [{ label: "Reactions", value: 9 }, { label: "Comments", value: 25 }, { label: "Shares", value: 2 }, { label: "People reached", value: 1114 }, { label: "Post engagement", value: 36 }] },
                  { name: "In-game screenshot activity", category: "Partner group", image: "pc_screenshot",
                    description: "An in-game screenshot post. The deck does not name the activity.",
                    results: [{ label: "Reactions", value: 6 }, { label: "Comments", value: 11 }, { label: "Shares", value: 0 }, { label: "People reached", value: 201 }, { label: "Post engagement", value: 17 }] }
                ] }
            ] },
            { type: "charts", title: "Activity comparison", items: [
              { title: "Interactions by activity", type: "bar",
                labels: ["Trivia Challenge", "Word Puzzle", "Heroes Day", "Guess the Location", "Screenshot activity"],
                series: [{ name: "Reactions", values: [17, 9, 22, 9, 6] }, { name: "Comments", values: [35, 33, 9, 25, 11] }, { name: "Shares", values: [5, 1, 56, 2, 0] }],
                note: "Official group: Trivia Challenge, Word Puzzle, National Heroes Day. Partner groups: Guess the Location, screenshot activity." },
              { title: "Reach and post engagement by activity", type: "bar",
                labels: ["Trivia Challenge", "Word Puzzle", "Heroes Day", "Guess the Location", "Screenshot activity"],
                series: [{ name: "People reached", values: [2641, 794, 2112, 1114, 201] }, { name: "Post engagement", values: [57, 43, null, 36, 17] }],
                note: "No post engagement figure is given for National Heroes Day." }
            ] },
            { type: "panel", title: "Community hot topics",
              paragraphs: ["Week 1 only. The economy is stable, with no major ALZ or FG rate changes, and many resellers post in the group."],
              bullets: [
                "Buying rate ALZ per M: $0.44–$0.48; selling rate ALZ per M: $0.46–$0.52",
                "Buying rate FG per 10k: average $5.42–$5.46; selling rate FG per 10k: average $5.40–$5.58",
                "Players are still looking for better activities, like ALZ and FG burning events",
                "Players are happy the 2nd patch is more F2P-centric: Dungeon Spotlight, Mission War updates"
              ],
              note: "Players are more active in-game than in the group, so less is gathered on what they discuss." },
            { type: "grid", title: "Moderators", cols: 2,
              intro: "The approvals chart has no value labels; Chop approved and declined more than Rygnus.",
              items: [
                { title: "Moderator Chop", paragraphs: ["Leads moderation and approvals. Reports player issues through the moderators' group chat (Moderator GC)."] },
                { title: "Moderator Rygnus", paragraphs: ["Balanced moderation; always reports issues directly to the Moderator GC."] }
              ] },
            { type: "issues", title: "Issues and risks", items: [
              { title: "Views and reactions down from July", impact: "Views -18.32% to 27,981 and reactions 400 to 291; the deck points at the activities and patch updates.", severity: "", status: "Open", owner: "", resolution: "Deck plan: more trivia, polls, screenshot challenges, memes, GM hunts and mini-games." },
              { title: "Limited visibility of player talk", impact: "Less is gathered on player discussion, because players are more active in-game.", severity: "", status: "Open", owner: "", resolution: "Deck plans: moderators to gather feedback and monitor issues; scout more partner leads for community data." }
            ] },
            { type: "actions", title: "Future plans", items: [
              { action: "More trivia, polls, screenshot challenges, memes, GM hunts and mini-games", owner: "", due: "", status: "Planned" },
              { action: "Moderators to gather feedback and monitor issues, scams, bots, top-ups and sentiment", owner: "Community moderators", due: "", status: "Planned" },
              { action: "Scout more partner leads for in-game influence and community data", owner: "", due: "", status: "Planned" },
              { action: "Clearer moderator responsibilities and immediate reporting of issues", owner: "Community moderators", due: "", status: "Planned" }
            ] }
          ]
        },
        {
          id: "vip", title: "Top Spender/VIP", status: "reported",
          short: "Top-up 44,302, +48.3%; 83 active VIP players",
          banner: "banner_vip_pc", bannerCaption: "TS & GL Slides · August 2026 VIP Performance & Philippines Guild Events KPI Summary",
          lede: "Top-up +48.3% to 44,302 across 83 active players, with Prestige and Topspender driving 81.3%. 15 onboarded, 6 promoted.",
          badges: [
            { text: "Reported", kind: "ok" }, { text: "44,302 top-up", kind: "info" }, { text: "+48.3% vs July", kind: "info" },
            { text: "83 active players", kind: "info" }, { text: "6 tier promotions", kind: "info" }, { text: "Active players -1.2%", kind: "amber" }
          ],
          sourceLine: "Sources: the Cabal PC Top Spenders August workbook (sheet VIP Report Aug '26) and the TS & GL Slides deck.",
          stats: [
            { label: "Total top-up", value: 44302, tone: "up", note: "+48.3% vs July 2026. The sheet states no currency." },
            { label: "Active players", value: 83, note: "-1.2% vs July 2026." },
            { label: "New players onboarded", value: 15, note: "As stated in the workbook summary; its onboarding list has 14 entries (see Data notes)." },
            { label: "Tier promotions", value: 6 },
            { label: "Accounts transferred", value: 1, note: "On a Topspender-tier account." },
            { label: "All-time VIP spend", value: 1187242, note: "Across the whole active roster. The sheet states no currency." },
            { label: "Prestige + Topspender share", value: "81.3%", note: "Of total top-up: Prestige 48.5%, Topspender 32.8%." },
            { label: "Black tier top-up", value: 4920, note: "One player; 11.1% of total, +23.0% month on month." }
          ],
          blocks: [
            { type: "notes", lead: "Where the top-up came from.",
              bullets: [
                "Top-up +48.3% to 44,302 while active players slipped 1.2% to 83",
                "Prestige (18 players, 21,474) and Topspender (39, 14,524) drive 81.3% of top-up",
                "The single Black tier player is 11.1% of top-up (4,920), +23.0% month on month",
                "Every tier grew: Black +23.0%, Prestige +51.4%, Topspender +52.4%, Exclusive +56.1%",
                "15 new players onboarded, 6 tier promotions and 1 account transfer"
              ] },
            { type: "grid", title: "Tier breakdown, August 2026", cols: 2, items: [
              { title: "Top-up by tier",
                paragraphs: ["Prestige generates the most top-up from just 18 players."],
                stats: [{ label: "Black", value: "11.1%" }, { label: "Prestige", value: "48.5%" }, { label: "Topspender", value: "32.8%" }, { label: "Exclusive", value: "7.6%" }],
                chart: { title: "Top-up by tier", type: "bar", labels: ["Black", "Prestige", "Topspender", "Exclusive"], series: [{ name: "Top-up", values: [4920, 21474, 14524, 3384] }] },
                note: "Shares are the sheet's % of total top-up." },
              { title: "Active players by tier",
                paragraphs: ["Topspender is the largest tier by headcount: 39 of 83."],
                chart: { title: "Active players by tier", type: "bar", labels: ["Black", "Prestige", "Topspender", "Exclusive"], series: [{ name: "Active players", values: [1, 18, 39, 25] }] } }
            ] },
            { type: "table", title: "Tier breakdown as reported",
              columns: ["Tier", { text: "Active players", num: true }, { text: "Top-up", num: true }, { text: "% of total", num: true }, { text: "MoM change", num: true }],
              rows: [
                ["Black", { text: "1", cls: "num" }, { text: "4,920", cls: "num" }, { text: "11.1%", cls: "num" }, { text: "+23.0%", cls: "num up" }],
                ["Prestige", { text: "18", cls: "num" }, { text: "21,474", cls: "num" }, { text: "48.5%", cls: "num" }, { text: "+51.4%", cls: "num up" }],
                ["Topspender", { text: "39", cls: "num" }, { text: "14,524", cls: "num" }, { text: "32.8%", cls: "num" }, { text: "+52.4%", cls: "num up" }],
                ["Exclusive", { text: "25", cls: "num" }, { text: "3,384", cls: "num" }, { text: "7.6%", cls: "num" }, { text: "+56.1%", cls: "num up" }],
                ["Total", { text: "83", cls: "num" }, { text: "44,302", cls: "num" }, { text: "100%", cls: "num" }, { text: "+48.3%", cls: "num up" }]
              ],
              note: "Changes as stated in the sheet. The total row uses its summary figures; 100% is the sum of the four shares." },
            { type: "table", title: "Top 10 spenders, August 2026",
              columns: [{ text: "#", num: true }, "Tier", { text: "Top-up", num: true }],
              rows: [
                [{ text: "1", cls: "num" }, "Prestige", { text: "13,618", cls: "num" }],
                [{ text: "2", cls: "num" }, "Black", { text: "4,920", cls: "num" }],
                [{ text: "3", cls: "num" }, "Prestige", { text: "2,250", cls: "num" }],
                [{ text: "4", cls: "num" }, "Topspender", { text: "1,614", cls: "num" }],
                [{ text: "5", cls: "num" }, "Topspender", { text: "1,610", cls: "num" }],
                [{ text: "6", cls: "num" }, "Topspender", { text: "1,346", cls: "num" }],
                [{ text: "7", cls: "num" }, "Prestige", { text: "1,304", cls: "num" }],
                [{ text: "8", cls: "num" }, "Exclusive", { text: "1,156", cls: "num" }],
                [{ text: "9", cls: "num" }, "Topspender", { text: "1,110", cls: "num" }],
                [{ text: "10", cls: "num" }, "Topspender", { text: "1,044", cls: "num" }]
              ],
              note: "Names and usernames are in the sheet and are not reproduced here." },
            { type: "grid", title: "Player movements", cols: 3, items: [
              { title: "New players onboarded",
                paragraphs: ["15 per the summary; the list has 14 entries."],
                bullets: ["13 new to the sheet, 1 took over an existing account", "By tier: 8 Exclusive, 5 Topspender, 1 Prestige"] },
              { title: "Tier promotions",
                bullets: ["1 Topspender to Prestige, on a 13,618 top-up (23,566 cumulative)", "5 Exclusive to Topspender, on top-ups of 1,610, 1,110, 576, 386 and 98 (6,516–7,262 cumulative)"] },
              { title: "Account transfers",
                paragraphs: ["1 ownership handoff, on a Topspender-tier account."] }
            ] },
            { type: "actions", title: "Next steps from the deck", items: [
              { action: "Monitor tier promotions to sustain VIP growth momentum", owner: "", due: "", status: "Planned" },
              { action: "Improve payment system reliability and expand top-up options", owner: "", due: "", status: "Planned" }
            ] }
          ]
        },
        {
          id: "guild", title: "Guild Leader", status: "reported",
          short: "13 of 14 guilds active (92.9%); 10% bonus to all 14 Guild Leaders",
          banner: "banner_guild_pc", bannerCaption: "TS & GL Slides · August 2026 VIP Performance & Philippines Guild Events KPI Summary",
          lede: "13 of 14 registered guilds joined at least one of August's two events: 9 the Guild Battle Arena, 13 the Speed Run. All 14 Guild Leaders got the 10% bonus.",
          badges: [
            { text: "Reported", kind: "ok" }, { text: "14 registered guilds", kind: "info" }, { text: "92.9% active in at least one event", kind: "info" },
            { text: "12 Arena / 16 Speed Run submissions", kind: "info" }, { text: "10% bonus to 14 Guild Leaders", kind: "info" }, { text: "1 guild inactive", kind: "amber" }
          ],
          sourceLine: "Sources: the Cabal PC Guild Leader August workbook (KPI Summary, roster and the two event logs) and the TS & GL Slides deck.",
          stats: [
            { label: "Registered PH guilds", value: 14, note: "On the official roster." },
            { label: "Active in at least one event", value: 13, tone: "up", note: "92.9% of the roster; 9 were active in both." },
            { label: "Guild Battle Arena participation", value: "64.3%", note: "9 of 14 guilds; 12 submissions, 3 from non-roster guilds." },
            { label: "Maquinas Speed Run participation", value: "92.9%", tone: "up", note: "13 of 14 guilds; 16 submissions, 3 from non-roster guilds." },
            { label: "Fastest registered clear", value: 315, unit: "sec", note: "By Aria Assassins. Lower is better." },
            { label: "Speed Run views", value: "2,600+", note: "Average views, per the workbook highlight." },
            { label: "Guild Leaders receiving bonus", value: 14, note: "10% top-up bonus each." },
            { label: "Guilds with zero participation", value: 1, note: "MASTERS entered neither event." }
          ],
          blocks: [
            { type: "notes", lead: "Participation and feedback.",
              bullets: [
                "13 of 14 guilds submitted to at least one event and 9 to both; only MASTERS sat out entirely",
                "Speed Run: 16 submissions, 13 from registered guilds (92.9% of the roster). Battle Arena: 12 submissions, 9 registered (64.3%)",
                "The remaining 3 submissions in each event came from guilds outside the roster",
                "Positive feedback on the Guild Mission Festival: rewards valued, no bugs reported",
                "Recurring Guild Top-Up transaction issues; requests for multi-card payments, or the bonus applied directly to member accounts"
              ] },
            { type: "activities", title: "Activities and events", groups: [
              { name: "Guild events",
                intro: "Both events took entries as Facebook posts. Participation counts registered guilds with at least one submission.",
                items: [
                  { name: "Guild Battle Arena", dates: "15–31 August 2026", category: "PH vs Indonesia guild PvP (3v3)",
                    description: "Guild PvP against Indonesian guilds.",
                    highlights: [
                      "5 guilds did not enter: Synesthesia, Nikostratos, ABYSSHUNTERS, LaughingCoffin, MASTERS",
                      "3 further submissions came from outside the roster",
                      "Submissions logged 16–31 August"
                    ],
                    results: [{ label: "Submissions", value: 12 }, { label: "Registered guilds", value: 9 }, { label: "Participation rate", value: "64.3%" }, { label: "Non-roster submissions", value: 3 }, { label: "Registered guilds not entering", value: 5 }] },
                  { name: "Maquinas Outpost Speed Run", dates: "21–26 August 2026", category: "Guild dungeon clear",
                    description: "Guild dungeon clear; the top 5 fastest and 3 random guilds were rewarded.",
                    highlights: [
                      "Aria Assassins fastest at 315 seconds; only 5 of 16 submissions carry a time",
                      "2,600+ average views, per the workbook",
                      "Only MASTERS sat out; submissions logged 16–31 August, beyond the stated window"
                    ],
                    results: [{ label: "Submissions", value: 16 }, { label: "Registered guilds", value: 13 }, { label: "Participation rate", value: "92.9%" }, { label: "Non-roster submissions", value: 3 }, { label: "Fastest registered clear", value: "315 sec" }] }
                ] }
            ] },
            { type: "charts", title: "Speed Run clear times", items: [
              { title: "Maquinas Outpost Speed Run, recorded clear times", type: "bar", unit: "sec",
                labels: ["Aria Assassins", "STARLIGHT", "PAPISQUAD", "SPECTRAL"],
                series: [{ name: "Clear time", values: [315, 334, 409, 409] }],
                note: "Lower is better. Registered guilds with a recorded time; a fifth, 214 seconds, came from a non-roster guild." }
            ] },
            { type: "table", title: "Roster participation",
              columns: ["Guild", "Guild Battle Arena", "Maquinas Speed Run", "Both events"],
              rows: [
                ["PAPISQUAD", { text: "Yes", cls: "up" }, { text: "Yes", cls: "up" }, { text: "Yes", cls: "up" }],
                ["Synesthesia", { text: "No", cls: "flat" }, { text: "Yes", cls: "up" }, { text: "No", cls: "flat" }],
                ["SPECTRAL", { text: "Yes", cls: "up" }, { text: "Yes", cls: "up" }, { text: "Yes", cls: "up" }],
                ["Nikostratos", { text: "No", cls: "flat" }, { text: "Yes", cls: "up" }, { text: "No", cls: "flat" }],
                ["MugiwaraPirates", { text: "Yes", cls: "up" }, { text: "Yes", cls: "up" }, { text: "Yes", cls: "up" }],
                ["STARLIGHT", { text: "Yes", cls: "up" }, { text: "Yes", cls: "up" }, { text: "Yes", cls: "up" }],
                ["ABYSSHUNTERS", { text: "No", cls: "flat" }, { text: "Yes", cls: "up" }, { text: "No", cls: "flat" }],
                ["LaughingCoffin", { text: "No", cls: "flat" }, { text: "Yes", cls: "up" }, { text: "No", cls: "flat" }],
                ["IDOLS", { text: "Yes", cls: "up" }, { text: "Yes", cls: "up" }, { text: "Yes", cls: "up" }],
                ["Wanderers", { text: "Yes", cls: "up" }, { text: "Yes", cls: "up" }, { text: "Yes", cls: "up" }],
                ["MASTERS", { text: "No", cls: "down" }, { text: "No", cls: "down" }, { text: "No", cls: "down" }],
                ["Aria Assassins", { text: "Yes", cls: "up" }, { text: "Yes", cls: "up" }, { text: "Yes", cls: "up" }],
                ["ascension", { text: "Yes", cls: "up" }, { text: "Yes", cls: "up" }, { text: "Yes", cls: "up" }],
                ["SUPREME", { text: "Yes", cls: "up" }, { text: "Yes", cls: "up" }, { text: "Yes", cls: "up" }]
              ],
              note: "All 14 Guild Leaders on the roster received the 10% top-up bonus." },
            { type: "grid", title: "Incentive, highlight and lowlight", cols: 3, items: [
              { title: "Guild Leader Incentive Program",
                paragraphs: ["All 14 Guild Leaders received the 10% top-up bonus."] },
              { title: "Highlight",
                bullets: [
                  "Guild Mission Festival: rewards found valuable, and no bugs reported",
                  "The Speed Run averaged 2,600+ views" ] },
              { title: "Lowlight",
                bullets: [
                  "Recurring Guild Top-Up transaction issues need resolving for reliable transactions",
                  "Requests: multiple credit cards for top-ups, or the 10% bonus applied directly to member accounts" ] }
            ] },
            { type: "issues", title: "Issues and risks", items: [
              { title: "Guild Top-Up transaction issues", impact: "Recurring problems with Guild Top-Up transactions; multi-card support and direct bonus delivery are the top requests.", severity: "", status: "Open", owner: "", resolution: "Deck next step: improve payment system reliability and expand top-up options." },
              { title: "Non-participating guilds", impact: "MASTERS entered neither event, and 5 registered guilds skipped the Guild Battle Arena.", severity: "", status: "Open", owner: "", resolution: "Deck next step: re-engage MASTERS and the Battle Arena non-participants with targeted campaigns." }
            ] },
            { type: "actions", title: "Next steps from the deck", items: [
              { action: "Improve payment system reliability and expand top-up options", owner: "", due: "", status: "Planned" },
              { action: "Re-engage MASTERS and the Battle Arena non-participants with targeted campaigns", owner: "", due: "", status: "Planned" },
              { action: "Keep supporting and promoting Guild Leader incentives", owner: "", due: "", status: "Ongoing" }
            ] }
          ]
        },
        { id: "streamer", title: "Streamer", status: "pending", note: "The August Streamer report for Cabal PC has not been received yet." }
      ]
    }
  ],

  next: {
    kicker: "Outlook",
    title: "What's Next",
    lede: "September has no major holiday to lift engagement on its own, so both community teams are leaning on activities. Two reports are still to come.",
    panels: [
      { title: "Cabal Mobile · Community", bullets: [
        "TikTok dance challenge, with Force Gems as rewards",
        "Partner group events shift to emoji- and reaction-based mechanics",
        "At least one Newbie Guide per week from the moderators",
        "Weekly moderator reports for review",
        "New MOU for moderators and community leaders",
        "Monitor competing releases, particularly Cabal Red Thailand" ] },
      { title: "Cabal Mobile · Top Spender/VIP", bullets: [
        "Next Special Benefit E-Card scheduled 2–30 September",
        "August feedback on record: the High Tier reward was rated weaker than Mid Tier. No response recorded" ] },
      { title: "Cabal Mobile · Guild Leader", bullets: [
        "Review increasing activity codes from 20 to 30 per participant",
        "Assess OVL capacity and whether another Mission War channel is justified",
        "Evaluate the permanent Transmuter / Battle Style proposal with the game team",
        "Repeat the before/during tracking for the next Guild Activity",
        "Follow up with the 8 non-participating Guild Leaders at an appropriate time" ] },
      { title: "Cabal PC · Community", bullets: [
        "More trivia, polls, screenshot challenges, memes, GM hunts and mini-games",
        "Moderators to gather feedback and monitor issues, scams, bots, top-ups and sentiment",
        "Scout more partner leads for in-game influence and community data",
        "Clearer moderator responsibilities and immediate reporting of issues" ] },
      { title: "Cabal PC · Top Spender/VIP", bullets: [
        "Monitor tier promotions to sustain VIP growth momentum",
        "Improve payment system reliability and expand top-up options" ] },
      { title: "Cabal PC · Guild Leader", bullets: [
        "Re-engage MASTERS and the Battle Arena non-participants with targeted campaigns",
        "Keep supporting and promoting Guild Leader incentives",
        "Requests on record: fix the Guild Top-Up transaction issues, allow multiple cards, or apply the 10% bonus directly to member accounts" ] }
    ],
    notes: {
      lead: "Still to report for August.",
      bullets: ["Cabal Mobile: Streamer", "Cabal PC: Streamer"]
    }
  },

  sources: [
    { title: "Community Report deck", desc: "[AUG 2026] Community Report, 15 pages", url: "https://www.canva.com/d/CAxmTnbo9G8-PHo" },
    { title: "PC Community Report deck", desc: "[AUG 2026] PC Community Report, 13 pages", url: "https://www.canva.com/d/2xphjJGW8pIvlv3" },
    { title: "Top Spender report sheet", desc: "[TS] Monthly Report - August, Google Sheet, one tab", url: "https://docs.google.com/spreadsheets/d/1ReLzocI18oeQalLxrw9ObBk72Zma8KH7LBPaSgmnvj8/edit?gid=0#gid=0" },
    { title: "August E-Card activity tab", desc: "[SEA-TS] August E-Card (SPECIAL BENEFIT) tab in ITEM CODE (BD) 2025 - MSEA [UPDATED 2026]", url: "https://docs.google.com/spreadsheets/d/1bPrNx6K9UmOLQzGRS3FkVnbSjQ2jlbeo8rOrF6pbjJE/edit?gid=61151223#gid=61151223" },
    { title: "E-Card banner post", desc: "Banner posting link from the [TS] Monthly Report - August sheet (Facebook)", url: "https://www.facebook.com/photo/?fbid=122129178302936258&set=g.532583169239776" },
    { title: "PC Top Spenders workbook", desc: "File name as received: Montly Report - Top Spenders AUGUST.xlsx. Sheet VIP Report Aug '26 (Staz VIP Report — August 2026)", url: "" },
    { title: "PC Guild Leader workbook", desc: "File name as received: Montly Report - Guild Leader AUGUST.xlsx. KPI Summary, Guild Roster & Bonus, Guild Battle Arena and Maquinas Speed Run logs", url: "" },
    { title: "TS & GL Slides deck", desc: "TS & GL Slides.pptx, 6 slides: August 2026 VIP Performance & Philippines Guild Events KPI Summary", url: "" },
    { title: "Guild Ranking Challenge deck", desc: "August 2026 Insights, 6 pages, prepared by AE PH: Ian", url: "https://www.canva.com/d/owhTiDEInG9aRZ4" },
    { title: "Guild Program update", desc: "Partnered count, 10% Guild Leaders and removals, shared as text", url: "" }
  ],

  dataNotes: {
    lead: "Data notes.",
    bullets: [
      "Cabal Mobile Community: the gender split uses the deck's legend (men 92.2%); the pie label reads 92.9%",
      "Cabal Mobile Community: 565 new members and 693 net growth are both as stated in the deck",
      "Cabal Mobile Community: Philippine region shares are read from the deck's chart; the age chart and the moderator approvals chart carry no value labels, so those are described in words",
      "Cabal Mobile Community: the Community Talks video post carries the same five figures as Spot the Difference (47 / 110 / 67 / 1,100 / 226)",
      "Cabal Mobile Top Spender: Active (47) and Inactive (143) are as stated in the sheet and do not add up to the Total (151); July has the same gap (45, 143, 148)",
      "Cabal Mobile Top Spender: the report sheet counts 71 E-Card receivers (8 High Tier, 63 Mid Tier); the E-Card activity tab's PH row shows 62 Mid Tier, 14 High Tier, 76 in total. The report sheet's figures are used",
      "Cabal Mobile Top Spender: the E-Card activity tab still lists delivery and code generation as in progress, while the report sheet carries receiver feedback; the activity list dates it 7–31 August and the activity details 9–31 August",
      "Cabal Mobile Guild Leader: the challenge counts 58 Guild Leaders; the program update counts 52 partnered. Both are shown as stated, and \"10% Guild Leaders\" is kept as labelled",
      "Cabal Mobile Guild Leader: 8 non-participants (6 work, 2 hospitalized) and 7 removals (5 work, 2 hospitalized) are separate facts from separate sources",
      "Cabal Mobile Guild Leader: the deck says Bracket 199 pre-event totals ranged from 100 to 113; its own chart puts 3 August at 119 and 5 August at 97",
      "Cabal PC Community: the region pie puts 28.6% of members outside the Philippines, while the countries chart counts 8,847 of 9,911 members in the Philippines, and the seven shares read from the pie total 102%; all are shown as stated",
      "Cabal PC Community: the age chart, the popular-days chart (the deck's text gives only Sunday 173 and Wednesday 169) and the moderator approvals chart carry no value labels, so they are described in words; region shares are read from the pie",
      "Cabal PC Community: the deck's gender legend reads 'men (94%%)' and its growth page adds 'a 10% increase in members joined this August'; 94% and the +104 / 1.03% figures are used. 104 on the implied July base is about 1.06%, so 104 may be joins rather than net growth",
      "Cabal PC Community: the deck calls 291 reactions 'almost half' of July's 400, which is a 27% decrease; the National Heroes Day card carries no post engagement figure; the second partner-group activity is not named; hot topics cover Week 1 only",
      "Cabal PC Top Spender: the summary states 15 new players onboarded; the onboarding list has 14 entries, one of them the account taken over in the month's single transfer",
      "Cabal PC Top Spender: top-up amounts are shown as in the sheet, which does not state a currency; player names and usernames in the sheet are not reproduced",
      "Cabal PC Guild Leader: the Maquinas Outpost Speed Run window is 21–26 August but its log holds submissions from 16 to 31 August; the Guild Battle Arena log runs 16–31 August inside its 15–31 August window",
      "Cabal PC Guild Leader: only 5 of the 16 Speed Run submissions carry a completion time; 315 seconds is the fastest among registered guilds, and a non-roster guild logged 214 seconds",
      "Cabal PC Guild Leader: the workbook highlight refers to a Guild Mission Festival that is not otherwise described in the workbook or the deck",
      "Cabal PC Guild Leader: the workbook spells the fastest guild both AriaAssassins (roster and Guild Battle Arena log) and Aria Assassins (KPI Summary and Maquinas log); Aria Assassins is used here"
    ]
  }
};
