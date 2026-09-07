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
       notes       { lead, bullets }                 amber-bar callout
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
    headline: "Six of eight program reports are in. Cabal Mobile: the community grew 3.33% to 21,507, the Top Spender roster reached 151 and 86.2% of Guild Leaders joined the Guild Ranking Challenge. Cabal PC: the community grew 1.03% to 9,911, VIP top-up rose 48.3% to 44,302 and 13 of 14 registered guilds joined at least one of the August guild events.",
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
    lede: "Six of eight programs have reported. On Cabal Mobile, Community and Guild Leader both show reward-based activity moving the numbers: the Facebook community grew 3.33% to 21,507 members with comments up 472% on event posts, and the Guild Ranking Challenge lifted Mission War participation by 22.8% in Bracket 199 and 36.2% in the OVL bracket; the Top Spender roster grew from 148 to 151, with 71 High and Mid Tier accounts receiving the National Heroes Day E-Card. On Cabal PC, the Facebook community grew 1.03% to 9,911 with comments up 54% but views down 18.32%; VIP top-up rose 48.3% to 44,302 across 83 active players; and 13 of the 14 registered PH guilds joined at least one of the two August guild events. Only the two Streamer programs have not reported.",
    stats: [
      { label: "Programs reported", value: "6", small: "of 8", note: "Cabal Mobile: Community, Top Spender/VIP, Guild Leader. Cabal PC: Community, Top Spender/VIP, Guild Leader. Streamer pending on both." },
      { label: "Mobile community members", value: 21507, note: "+693 in August, a 3.33% increase from the start of the month; 565 new members." },
      { label: "Mobile Top Spenders", value: 151, note: "Up from 148 in July; 47 active. 71 High and Mid Tier accounts received the August E-Card." },
      { label: "Mobile Guild Leader participation", value: "86.2%", note: "50 of 58 Guild Leaders joined the Guild Ranking Challenge; Mission War participation up 22.8% in Bracket 199 and 36.2% in the OVL bracket." },
      { label: "PC community members", value: 9911, note: "+104 in August, a 1.03% increase; comments up 54%, views down 18.32%." },
      { label: "PC VIP top-up", value: 44302, tone: "up", note: "+48.3% vs July across 83 active players (-1.2%); 6 tier promotions. The sheet states no currency." },
      { label: "PC guild participation", value: "92.9%", note: "13 of 14 registered guilds joined at least one August event; 9 joined both." },
      { label: "PC Guild Leader bonus", value: "10%", note: "Top-up bonus applied to all 14 Guild Leaders on the roster." }
    ],
    notes: {
      lead: "Six programs have reported.",
      bullets: [
        "Cabal Mobile Community, Top Spender/VIP and Guild Leader have August results",
        "Cabal PC Community, Top Spender/VIP and Guild Leader have August results",
        "Pending: Streamer for Cabal Mobile and for Cabal PC"
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
          lede: "Membership grew 3.33% to 21,507 in August, and comments rose 472% on the back of reward-based events. The Facebook group is Cabal: Infinite Combo – PH Official, a public group.",
          badges: [
            { text: "Reported", kind: "ok" }, { text: "21,507 members", kind: "info" }, { text: "+3.33% growth", kind: "info" },
            { text: "1,584 posts", kind: "info" }, { text: "+472% comments", kind: "info" }
          ],
          sourceLine: "Source: [AUG 2026] Community Report deck, 15 pages.",
          stats: [
            { label: "Total members", value: 21507, note: "+693 in August, a 3.33% increase from the beginning of the month." },
            { label: "New members", value: 565, note: "Members who joined during August." },
            { label: "Total views", value: 67746, note: "A slight 1.78% decrease from July." },
            { label: "Posts", value: 1584, note: "Consistent content and community activity throughout the month." },
            { label: "Comments", value: 1808, tone: "up", note: "Up 472%, with a spike of 699 comments on 30 August." },
            { label: "Reactions", value: 1795, note: "Up 9%." },
            { label: "Posts removed", value: 5, note: "Removed by moderation during August." },
            { label: "Members in the Philippines", value: 19952, note: "93.4% of the group; 1.9% elsewhere in Southeast Asia." }
          ],
          blocks: [
            { type: "notes", lead: "Reward-based events drove August.",
              bullets: [
                "The standout moment was 30 August: 699 comments in a single day as members shared the 31 August event teaser to receive a code for the National Heroes Day event",
                "Monday is the most active day with 305 interactions, likely driven by the social media events; Wednesday's patch updates come second at 283",
                "Engagement peaks around 11 AM on Mondays, the most effective slot for activating events and publishing engagement-focused content",
                "Community talks centered on the F2P vs. P2W balance, with official giveaways viewed as an important way to support player progression and accessibility"
              ] },
            { type: "grid", title: "Member profile", cols: 2, items: [
              { title: "Members by location",
                paragraphs: ["The group is overwhelmingly Philippine-based: 93.4% of members are in the Philippines and 1.9% elsewhere in Southeast Asia."],
                stats: [{ label: "Philippines", value: 19952 }, { label: "Southeast Asia", value: 398 }, { label: "Others", value: 1020 }],
                chart: { title: "Members by location", type: "bar", labels: ["Philippines", "Southeast Asia (SEA)", "Others"], series: [{ name: "Members", values: [19952, 398, 1020] }] } },
              { title: "Members by Philippine region",
                paragraphs: ["NCR and Region IV-A together hold well over half of the members."],
                chart: { title: "Members by Philippine region", type: "bar", unit: "%", labels: ["NCR", "Region IV-A", "Region III", "Visayas", "Mindanao", "MIMAROPA", "CAR"], series: [{ name: "Share of members", values: [33.8, 24.8, 15.3, 10.8, 9.1, 2.3, 1.2] }] } },
              { title: "Members by gender and age",
                paragraphs: ["Men make up 92.2% of members and women 7.1%, with custom gender at 0%. The 25–34 age range is by far the largest group, followed by 35–44 and then 18–24; women are also concentrated in the 25–34 range."],
                stats: [{ label: "Men", value: "92.2%" }, { label: "Women", value: "7.1%" }, { label: "Custom gender", value: "0%" }] }
            ] },
            { type: "activities", title: "Activities and events", groups: [
              { name: "Official group",
                intro: "Simple, easy-to-join mechanics such as guessing and commenting generate strong participation. The National Heroes Day event achieved the highest reach and engagement, suggesting that special or seasonal events attract greater attention as players anticipate more valuable or exclusive rewards.",
                note: "Events are facilitated by Moderator Yukon, who assists with event posting; event banners are produced in line with the CI guidelines. Yukon also records and reviews event data to identify areas for improvement and help optimize future events.",
                items: [
                  { name: "Price Is Right, round 1", category: "Event", image: "pir1", description: "Guess the cost of each dungeon entry.",
                    results: [{ label: "Reactions", value: 113 }, { label: "Comments", value: 217 }, { label: "Shares", value: 112 }, { label: "People reached", value: 3471 }, { label: "Post engagement", value: 448 }] },
                  { name: "Price Is Right, round 2", category: "Event", image: "pir2", description: "Guess the cost of each dungeon entry.",
                    results: [{ label: "Reactions", value: 139 }, { label: "Comments", value: 247 }, { label: "Shares", value: 130 }, { label: "People reached", value: 521 }, { label: "Post engagement", value: 4097 }] },
                  { name: "National Heroes Day Event", category: "Highest reach", image: "nhd", description: "Salute, Honor, Inspire. Members shared the 31 August event teaser to receive a code, driving the 30 August engagement spike.",
                    results: [{ label: "Reactions", value: 410 }, { label: "Comments", value: 760 }, { label: "Shares", value: 432 }, { label: "People reached", value: 14100 }, { label: "Post engagement", value: 1602 }] }
                ] },
              { name: "Partner groups",
                intro: "Simple interactive activities such as choosing, spotting differences and matching encouraged consistent participation. “This or That” generated the strongest comments and shares, while “Match It” recorded the highest post engagement, showing that quick, easy game-related challenges effectively drive community interaction.",
                items: [
                  { name: "This or That", category: "Strongest comments and shares", image: "tot", description: "Choose the correct option: which materials are required to craft the Chaos Safeguard and Chaos Talisman.",
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
                "Force Gem rates showed moderate fluctuation, with reseller rates around $5.06–$5.39 and casual rates around $5.06–$5.39, driven by upgrade demand and seller supply.",
                "SEA vs. ROA: players compared progression, economy and the F2P experience.",
                "Events: Monster Invasion received positive feedback; Boss Revenge favored high-CP players.",
                "Premium Check-In: mixed feedback on reward changes." ] },
              { title: "Week 2", bullets: [
                "Force Gems: rates remained generally stable, with reseller rates around $5.05–$5.55 and casual rates around $5.20–$5.55, supported by Path of Dusk, Safeguards and accessory demand.",
                "Progression: players focused on event rewards and materials for character progression.",
                "Events: ongoing events continued to drive player activity and spending.",
                "Community: event and streamer content remained key discussion drivers." ] },
              { title: "Week 3", bullets: [
                "Force Gem rates increased slightly and stabilized, with reseller rates around $5.19–$5.51 and casual rates around $5.35–$5.51, as limited supply balanced GMF demand.",
                "Safeguard issue: exchange-limit concerns became a major player discussion.",
                "Compensation: players requested broader compensation following the Safeguard issue.",
                "Dungeon Spotlight: mixed feedback focused on Archeron Arena drop rates." ] },
              { title: "Week 4", bullets: [
                "Rates were stable early but increased toward month-end, with reseller rates rising from around $5.17–$5.33 to $5.80–$6.13, marking the strongest Force Gem prices of August.",
                "Newbie support: requests for Newbie and Retention Codes gained attention.",
                "Rare drop: the Laxar's Brooch (Medium) drop generated community excitement.",
                "SEA vs. ROA: server comparisons remained an active community topic." ] }
            ] },
            { type: "grid", title: "Top posts", cols: 3,
              intro: "Group engagement was mainly driven by events, giveaways and patch-related discussions, showing that reward-based and game-update content generates the strongest community interest.",
              items: [
                { title: "National Heroes Day Event", subtitle: "Moderator Yukon's post" },
                { title: "Patch-related text post", subtitle: "Update details shared with the group" },
                { title: "Patch Feedback", subtitle: "“We value your feedback for a better CABAL experience”" }
              ] },
            { type: "grid", title: "Community talks", cols: 2,
              intro: "Community talks centered on the F2P vs. P2W balance, with official giveaways viewed as an important way to support player progression and accessibility.",
              items: [
                { title: "Player text post", stats: [{ label: "Reactions", value: 5 }, { label: "Comments", value: 8 }, { label: "Shares", value: 0 }, { label: "People reached", value: 1700 }, { label: "Post engagement", value: 133 }] },
                { title: "Player video post", stats: [{ label: "Reactions", value: 47 }, { label: "Comments", value: 110 }, { label: "Shares", value: 67 }, { label: "People reached", value: 1100 }, { label: "Post engagement", value: 226 }] }
              ] },
            { type: "grid", title: "Moderators", cols: 3, items: [
              { title: "Moderator Perry", paragraphs: ["Leads overall moderation activity and approvals, but carries a significantly heavier workload than the other moderators."] },
              { title: "Moderator Meow", paragraphs: ["Provides balanced moderation support, though overall activity remains relatively low."] },
              { title: "Moderator Pinky", paragraphs: ["Strongly focuses on filtering and declining unsuitable posts, but has limited involvement in post approvals."] }
            ] },
            { type: "issues", title: "Issues and risks", items: [
              { title: "Safeguard exchange-limit issue", impact: "Exchange-limit concerns became a major player discussion in week 3, and players requested broader compensation following the issue.", severity: "", status: "", owner: "", resolution: "" },
              { title: "Uneven moderator workload", impact: "Perry carries a significantly heavier workload than the other moderators; Meow's activity remains relatively low and Pinky has limited involvement in approvals.", severity: "", status: "", owner: "", resolution: "A new MOU will define moderator roles, responsibilities and expected deliverables; moderators will present weekly reports for review." },
              { title: "Competing release: Cabal Red Thailand", impact: "Potential impact of a competing game release on community sentiment and activity.", severity: "", status: "Monitoring", owner: "", resolution: "Continue monitoring community discussions and player sentiment regarding competing game releases." }
            ] },
            { type: "actions", title: "Action items", items: [
              { action: "Create and publish at least one Newbie Guide per week to support new players", owner: "Community moderators", due: "Weekly", status: "Planned" },
              { action: "Present weekly moderator reports for review to identify areas that need adjustment, improvement or additional support", owner: "Community moderators", due: "Weekly", status: "Planned" },
              { action: "Run a September engagement activity: a TikTok dance challenge featuring players' characters, with Force Gems as rewards", owner: "", due: "September 2026", status: "Planned" },
              { action: "Shift partner group events toward emoji- and reaction-based mechanics to encourage simple participation and increase engagement", owner: "", due: "", status: "Planned" },
              { action: "Keep monitoring community discussions and player sentiment around competing game releases, particularly Cabal Red Thailand", owner: "", due: "Ongoing", status: "Ongoing" },
              { action: "Provide a new MOU to Community Moderators and Community Leaders that clearly defines roles, responsibilities and expected deliverables", owner: "", due: "", status: "Planned" }
            ] }
          ]
        },

        {
          id: "vip", title: "Top Spender/VIP", status: "reported",
          short: "151 Top Spenders, +3; 71 received the August E-Card",
          lede: "The Top Spender roster grew from 148 to 151 in August, with every tier adding one account and active accounts up from 45 to 47. The month's Special Benefit E-Card for National Heroes Day went to 71 High and Mid Tier Top Spenders.",
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
            { type: "notes", lead: "Steady growth across all three tiers.",
              bullets: [
                "Every tier added one account in August: Leviathan 8 to 9, Moby Dick 39 to 40, Big Daddy 101 to 102",
                "Active accounts rose from 45 to 47 while inactive accounts stayed at 143",
                "Account transfers rose from 1 in July to 9 in August; new onboarded accounts held at 2",
                "The August Special Benefit E-Card went to 71 High and Mid Tier Top Spenders: 8 High Tier and 63 Mid Tier"
              ] },
            { type: "grid", title: "Roster, July vs August", cols: 2, items: [
              { title: "Top Spenders by tier",
                paragraphs: ["All three tiers grew by one account. Big Daddy remains by far the largest tier, at 102 of the 151 accounts."],
                chart: { title: "Top Spenders by tier", type: "bar", labels: ["Leviathan", "Moby Dick", "Big Daddy"],
                  series: [{ name: "July", color: "var(--mob-dk)", values: [8, 39, 101] }, { name: "August", color: "var(--mob)", values: [9, 40, 102] }] } },
              { title: "Roster movement",
                paragraphs: ["The total rose by 3 and active accounts by 2, while inactive stayed at 143. Account transfers went from 1 to 9, the largest change of the month, and new onboarded accounts held at 2."],
                chart: { title: "Roster movement", type: "bar", labels: ["Total", "Active", "Inactive"],
                  series: [{ name: "July", color: "var(--mob-dk)", values: [148, 45, 143] }, { name: "August", color: "var(--mob)", values: [151, 47, 143] }] },
                note: "Active and inactive are shown as stated in the sheet; they do not add up to the total (see Data notes)." }
            ] },
            { type: "activities", title: "Activities and events", groups: [
              { name: "Special Benefit",
                intro: "The E-Card is one of the benefits offered to Top Spenders: an item code sent to High and Mid Tier accounts on their country's national holiday, which for the Philippines is National Heroes Day on 31 August.",
                note: "Activity owner per the activity list: AE PH Jay. The banner posting is linked from the report sheet.",
                items: [
                  { name: "August E-Card, National Heroes Day", dates: "9–31 August 2026", category: "Special Benefit (E-Card)", image: "nhd",
                    description: "Unique codes were activated on 9 August and can be redeemed on the member site until 15 September. The activity is logged as a retention benefit for Top Spenders.",
                    objective: "Retention: reward High and Mid Tier Top Spenders with an item code on National Heroes Day.",
                    highlights: [
                      "Requirement: account lifetime value of $15,000 and higher",
                      "One code per ID, redeemable once, on one character, at sea-member.combocabalm.com/rewards",
                      "Receivers said the Mid Tier reward was better than the High Tier one, because Mid Tier received an Agent Yul accessory",
                      "High Tier Top Spenders added that not all High Tier accounts are maxed out in upgrades, which caused some frustration with the rewards sent to High Tier"
                    ],
                    results: [{ label: "Receivers", value: 71 }, { label: "High Tier", value: 8 }, { label: "Mid Tier", value: 63 }] }
                ] }
            ] },
            { type: "issues", title: "Issues and risks", items: [
              { title: "High Tier E-Card reward seen as weaker than Mid Tier", impact: "Mid Tier received an Agent Yul accessory and High Tier Top Spenders felt their reward was worse; because not all High Tier accounts are maxed out in upgrades, the High Tier reward caused some frustration.", severity: "", status: "Open", owner: "", resolution: "None recorded in the sheets. The next Special Benefit E-Card is listed for 2–30 September." }
            ] }
          ]
        },

        {
          id: "guild", title: "Guild Leader", status: "reported",
          short: "86.2% joined the Guild Ranking Challenge; Mission War +22.8% / +36.2%",
          banner: "banner_guild", bannerCaption: "Guild Ranking Challenge · August 2026 · 17–21 August",
          lede: "50 of 58 Guild Leaders (86.2%) joined the August Guild Ranking Challenge, lifting Mission War participation by 22.8% in Bracket 199 and 36.2% in the OVL bracket.",
          badges: [
            { text: "Reported", kind: "ok" }, { text: "86.2% participation", kind: "info" }, { text: "+22.8% Bracket 199", kind: "info" },
            { text: "+36.2% OVL", kind: "info" }, { text: "7 removed from program", kind: "amber" }
          ],
          sourceLine: "Sources: Guild Ranking Challenge: August 2026 Insights deck (prepared by AE PH: Ian) and the Guild Program update.",
          stats: [
            { label: "Guild Leaders in the challenge", value: 58, note: "Total Guild Leaders counted for the Guild Ranking Challenge." },
            { label: "Participated", value: 50, note: "86.2% participation rate." },
            { label: "Did not participate", value: 8, note: "6 busy with work or no available time, 2 hospitalized during the event." },
            { label: "Partnered Guild Leaders", value: 52, note: "Per the Guild Program update." },
            { label: "10% Guild Leaders", value: 46, note: "Per the Guild Program update." },
            { label: "Removed from the Guild Program", value: 7, note: "4 consecutive missed activities, despite prior notices and warnings." },
            { label: "Bracket 199 uplift", value: "+22.8%", tone: "up", note: "Average 129.4 participants per day during the event, from 105.4 before it." },
            { label: "OVL bracket uplift", value: "+36.2%", tone: "up", note: "Average 286.0 per day during the event, from 210.0; full 150 vs 150 capacity on 20 and 21 August." }
          ],
          blocks: [
            { type: "notes", lead: "Strong participation despite availability constraints.",
              bullets: [
                "50 out of 58 Guild Leaders actively engaged, reflecting high commitment to the event",
                "All 8 absences were due to personal or work constraints: 6 were busy with work or had no available time and 2 were hospitalized during the event",
                "No stated rejection of the activity was reported",
                "Mission War participation was tracked for 8 days before the challenge (3–13 August) and 5 days during it (17–21 August)"
              ] },
            { type: "activities", title: "Activities and events", groups: [
              { name: "", items: [
                { name: "Guild Ranking Challenge", dates: "17–21 August 2026", status: "Completed", category: "Guild Leaders",
                  description: "Mission War participation and Guild Leader engagement. 50 of 58 Guild Leaders took part; participation was compared across 8 days before the event (3–13 August) and the 5 event days (17–21 August) in Bracket 199 and the OVL bracket.",
                  results: [{ label: "Participated", value: "50 of 58" }, { label: "Participation rate", value: "86.2%" }, { label: "Bracket 199 uplift", value: "+22.8%" }, { label: "OVL bracket uplift", value: "+36.2%" }],
                  highlights: ["Full server capacity of 150 vs 150 reached in the OVL bracket on 20 and 21 August", "Peak day in Bracket 199: 19 August with 139 participants in total"] }
              ] }
            ] },
            { type: "grid", title: "Mission War participation, before vs during the event", cols: 1,
              intro: "Average players per side per day, 8 days before the Guild Ranking Challenge (3–13 August) and 5 days during it (17–21 August).",
              items: [
                { title: "Bracket 199",
                  paragraphs: ["Before the event (3–13 August), daily totals ranged from 100 to 113 participants across both sides, averaging 52.7 per side; the lowest day was 5 August with 97 in total. During the event (17–21 August), daily totals ranged from 122 to 139, peaking on 19 August with 139: a clear 22.8% uplift on the pre-event baseline."],
                  stats: [{ label: "Avg total per day, before", value: 105.4 }, { label: "Avg total per day, during", value: 129.4 }, { label: "Uplift", value: "+22.8%" }, { label: "Avg per side, before", value: 52.7 }, { label: "Avg per side, during", value: 64.7 }],
                  chart: { title: "Bracket 199, average players per side", type: "bar",
                    labels: ["Aug 3", "Aug 4", "Aug 5", "Aug 6", "Aug 10", "Aug 11", "Aug 12", "Aug 13", "Aug 17", "Aug 18", "Aug 19", "Aug 20", "Aug 21"],
                    series: [
                      { name: "Before event", color: "var(--mob-dk)", values: [59.5, 50, 48.5, 56.5, 54.5, 49.5, 52, 51, null, null, null, null, null] },
                      { name: "During event", color: "var(--mob)", values: [null, null, null, null, null, null, null, null, 62.5, 65.5, 69.5, 61, 65] }
                    ] } },
                { title: "OVL bracket",
                  paragraphs: ["Participation ranged from 89 to 146 per side before the event. Daily totals for 3–13 August were 282, 263, 257, 217, 196, 192, 188 and 183, averaging 210.0 per day across the 8 recorded days. Full capacity was reached during the event: 20 and 21 August recorded 150 vs 150, the maximum server capacity on both sides. During-event daily totals were 248, 285, 297, 300 and 300."],
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
                paragraphs: ["A total of 7 Guild Leaders were removed from the Guild Program due to having 4 consecutive missed activities, despite receiving prior notices and warnings regarding their inactivity."],
                bullets: [
                  "5 Guild Leaders shared that they have been busy with work and no longer have enough time to actively play or coordinate activities with their guild members or managers.",
                  "2 Guild Leaders were hospitalized, which prevented them from participating in the required activities." ],
                note: "All affected Guild Leaders were given notices and warnings before their removal from the program." },
              { title: "Non-participation in the Guild Ranking Challenge",
                paragraphs: ["All 8 absences were due to personal or work constraints, and no stated rejection of the activity was reported."],
                bullets: [
                  "6 Guild Leaders were busy with work or had no available time (75% of non-participants).",
                  "2 Guild Leaders were hospitalized during the event (25% of non-participants)." ] }
            ] },
            { type: "issues", title: "Issues and risks", items: [
              { title: "OVL bracket at full server capacity", impact: "20 and 21 August recorded 150 vs 150, the maximum server capacity on both sides (full utilization).", severity: "", status: "Open", owner: "", resolution: "Assess OVL bracket capacity and evaluate whether an additional Mission War channel is justified." },
              { title: "Guild Leader availability", impact: "8 of 58 Guild Leaders could not join the challenge (work or time constraints, hospitalization), and 7 were removed from the Guild Program after 4 consecutive missed activities.", severity: "", status: "Open", owner: "", resolution: "Follow up with the 8 non-participating Guild Leaders at an appropriate time." }
            ] },
            { type: "actions", title: "Recommended next steps", items: [
              { action: "Review feasibility of increasing activity codes from 20 to 30 per participant", owner: "", due: "", status: "Recommended" },
              { action: "Assess OVL bracket capacity and evaluate whether an additional Mission War channel is justified given full 150 vs 150 utilization", owner: "", due: "", status: "Recommended" },
              { action: "Clarify and evaluate the permanent Transmuter / Battle Style proposal; exact implementation requires game-team review", owner: "", due: "", status: "Recommended" },
              { action: "Repeat the same before/during participation tracking methodology for the next Guild Activity to validate trends", owner: "", due: "Next Guild Activity", status: "Recommended" },
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
          lede: "Membership grew 1.03% to 9,911 in August with 104 new members. Comments rose 54% to 171, while views fell 18.32% from July to 27,981 and reactions fell to 291 from 400. The Facebook group is Cabal Ultimate Combo - Official (SEA), a public group.",
          badges: [
            { text: "Reported", kind: "ok" }, { text: "9,911 members", kind: "info" }, { text: "+1.03% growth", kind: "info" },
            { text: "350 posts", kind: "info" }, { text: "+54% comments", kind: "info" }, { text: "-18.32% views", kind: "amber" }
          ],
          sourceLine: "Source: [AUG 2026] PC Community Report deck, 13 pages.",
          stats: [
            { label: "Total members", value: 9911, note: "+104 in August, a 1.03% increase from the beginning of the month." },
            { label: "New members", value: 104, note: "Members who joined during August; the deck also notes a 10% increase in members joined." },
            { label: "Total views", value: 27981, tone: "down", note: "An 18.32% decrease from July." },
            { label: "Posts", value: 350, note: "Consistent content and community activity throughout the month." },
            { label: "Comments", value: 171, tone: "up", note: "Up 54% from the previous month." },
            { label: "Reactions", value: 291, tone: "down", note: "400 in July; the deck describes this as almost half." },
            { label: "Posts removed", value: 5, note: "Posts removed during August, as stated in the deck." },
            { label: "Members in the Philippines", value: 8847, note: "448 elsewhere in Southeast Asia and 287 in other countries." }
          ],
          blocks: [
            { type: "notes", lead: "Comments up, views and reactions down.",
              bullets: [
                "Sunday is the most active day with 173 interactions, likely driven by social media events and the non-work day; Wednesday is second with 169, ahead of the Thursday patch update",
                "Engagement peaks around 9 AM, 3 PM and 9 PM: before work, at break time and after work",
                "Reactions fell to 291 from 400 in July; the deck suggests players are not enticed by the activities or the patch updates",
                "Players are more active in-game than in social media groups, which limits what the team can gather on what players are talking about"
              ] },
            { type: "grid", title: "Member profile", cols: 2, items: [
              { title: "Members by location",
                paragraphs: ["8,847 of the 9,911 members are in the Philippines, 448 elsewhere in Southeast Asia and 287 in other countries."],
                stats: [{ label: "Philippines", value: 8847 }, { label: "Southeast Asia", value: 448 }, { label: "Others", value: 287 }],
                chart: { title: "Members by location", type: "bar", labels: ["Philippines", "Southeast Asia (SEA)", "Others"], series: [{ name: "Members", values: [8847, 448, 287] }] } },
              { title: "Members by country, outside the Philippines",
                paragraphs: ["After the Philippines (8,847), Indonesia and Malaysia are the largest member countries."],
                chart: { title: "Members by country", type: "bar", labels: ["Indonesia", "Malaysia", "UAE", "Vietnam", "USA", "Canada", "Australia", "Thailand", "Japan"], series: [{ name: "Members", values: [210, 115, 78, 74, 56, 54, 52, 49, 47] }] },
                note: "The Philippines (8,847) is left off this chart for scale." },
              { title: "Members by Philippine region",
                paragraphs: ["NCR holds 44.9% of members. The deck's pie puts 28.6% outside the Philippines, which does not match the countries chart (see Data notes)."],
                chart: { title: "Members by Philippine region", type: "bar", unit: "%", labels: ["NCR", "Region XI", "Region VII", "Region VI", "Region IV-A", "Region III", "Outside PH"], series: [{ name: "Share of members", values: [44.9, 8.3, 7.2, 4.4, 4.4, 4.2, 28.6] }] } },
              { title: "Members by gender and age",
                paragraphs: ["Men make up 94% of members and women 6%, with custom gender at 0%. The 25–34 age range is by far the largest group, followed by 35–44 and then 18–24; women are also concentrated in the 25–34 range."],
                stats: [{ label: "Men", value: "94%" }, { label: "Women", value: "6%" }, { label: "Custom gender", value: "0%" }] }
            ] },
            { type: "activities", title: "Activities and events", groups: [
              { name: "Official group",
                intro: "Simple, easy-to-join mechanics such as guessing and commenting generate strong participation. The Trivia Challenge Event gained the most comments and reach; players are more interested in challenge-type activities.",
                note: "Events are facilitated by Moderator Croffles, who assists with event posting, sometimes creates her own banners, and helps talk to players about their prize winnings during an activity.",
                items: [
                  { name: "Trivia Challenge Event", category: "Most comments and reach", image: "pc_trivia", description: "Trivia challenge in the official group.",
                    results: [{ label: "Reactions", value: 17 }, { label: "Comments", value: 35 }, { label: "Shares", value: 5 }, { label: "People reached", value: 2641 }, { label: "Post engagement", value: 57 }] },
                  { name: "Word Puzzle Event", category: "Event", image: "pc_puzzle", description: "Word puzzle in the official group.",
                    results: [{ label: "Reactions", value: 9 }, { label: "Comments", value: 33 }, { label: "Shares", value: 1 }, { label: "People reached", value: 794 }, { label: "Post engagement", value: 43 }] },
                  { name: "National Heroes Day", category: "Most shares", image: "pc_nhd", description: "Salute, Honor, Inspire. The deck gives no post engagement figure for this post.",
                    results: [{ label: "Reactions", value: 22 }, { label: "Comments", value: 9 }, { label: "Shares", value: 56 }, { label: "People reached", value: 2112 }] }
                ] },
              { name: "Partner groups",
                intro: "Players like to join activities with social media and in-game components. An activity usually runs for 2 days, and players see it as another way to interact with other players.",
                items: [
                  { name: "Guess the Location", category: "Partner group", image: "pc_guess",
                    description: "Players comment their answer and account ID (AID) for a chance to win a code; the first 10 to guess correctly win.",
                    results: [{ label: "Reactions", value: 9 }, { label: "Comments", value: 25 }, { label: "Shares", value: 2 }, { label: "People reached", value: 1114 }, { label: "Post engagement", value: 36 }] },
                  { name: "In-game screenshot activity", category: "Partner group", image: "pc_screenshot",
                    description: "A partner-group post built on an in-game screenshot. The deck does not name the activity.",
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
              paragraphs: ["The deck carries one week of hot topics. The economy rate is stable, with no major changes in ALZ and FG rates for the whole month, and many resellers are posting in the group, either in-game currency or prizes from Path of Dusk."],
              bullets: [
                "Buying rate ALZ per M: $0.44–$0.48; selling rate ALZ per M: $0.46–$0.52",
                "Buying rate FG per 10k: average $5.42–$5.46; selling rate FG per 10k: average $5.40–$5.58",
                "Players are still looking for better activities, like ALZ and FG burning events",
                "In the 2nd patch update, players are very happy because the events and activities are more F2P-centric, such as Dungeon Spotlight and the Mission War updates"
              ],
              note: "Players are not usually active in social media groups; they are more active in-game, which is why less information is gathered on what players talk about in the game." },
            { type: "grid", title: "Moderators", cols: 2,
              intro: "The approvals chart shows Chop with more posts approved and declined than Rygnus; it carries no value labels.",
              items: [
                { title: "Moderator Chop", paragraphs: ["Leads overall moderation activity and approvals. Also supports reporting player issues and concerns through the moderators' group chat (Moderator GC)."] },
                { title: "Moderator Rygnus", paragraphs: ["Provides balanced moderation but always reports issues and concerns directly to the Moderator GC."] }
              ] },
            { type: "issues", title: "Issues and risks", items: [
              { title: "Views and reactions down from July", impact: "Views fell 18.32% to 27,981 and reactions fell to 291 from 400; the deck suggests players are not enticed by the activities or the patch updates.", severity: "", status: "Open", owner: "", resolution: "Deck future plan: create more trivia, polls, screenshot challenges, memes, GM hunts and mini-games to keep players active." },
              { title: "Limited visibility of player talk", impact: "Players are more active in-game than in the social media group, so less information is gathered on what they discuss.", severity: "", status: "Open", owner: "", resolution: "Deck future plans: moderators to regularly gather feedback and monitor game issues, scams, bots, top-up concerns and sentiment; scout additional partner leads to gather more data from the community." }
            ] },
            { type: "actions", title: "Future plans", items: [
              { action: "Create more trivia, polls, screenshot challenges, memes, GM hunts and mini-games to keep players active", owner: "", due: "", status: "Planned" },
              { action: "Instruct moderators to regularly gather feedback and monitor game issues, scams, bots, top-up concerns and player sentiment", owner: "Community moderators", due: "", status: "Planned" },
              { action: "Scout additional partner leads to increase in-game influence and gather additional data from the community", owner: "", due: "", status: "Planned" },
              { action: "Inform moderators to perform their duties and responsibilities actively, for clearer accountability and immediate reporting of issues and concerns", owner: "Community moderators", due: "", status: "Planned" }
            ] }
          ]
        },
        {
          id: "vip", title: "Top Spender/VIP", status: "reported",
          short: "Top-up 44,302, +48.3%; 83 active VIP players",
          banner: "banner_vip_pc", bannerCaption: "TS & GL Slides · August 2026 VIP Performance & Philippines Guild Events KPI Summary",
          lede: "VIP top-up rose 48.3% from July to 44,302 across 83 active players, with the Prestige and Topspender tiers driving 81.3% of the total. 15 players were onboarded and 6 moved up a tier.",
          badges: [
            { text: "Reported", kind: "ok" }, { text: "44,302 top-up", kind: "info" }, { text: "+48.3% vs July", kind: "info" },
            { text: "83 active players", kind: "info" }, { text: "6 tier promotions", kind: "info" }, { text: "Active players -1.2%", kind: "amber" }
          ],
          sourceLine: "Sources: the Cabal PC Top Spenders August workbook (sheet VIP Report Aug '26, titled Staz VIP Report — August 2026) and the TS & GL Slides deck.",
          stats: [
            { label: "Total top-up", value: 44302, tone: "up", note: "+48.3% vs July 2026. The sheet states no currency." },
            { label: "Active players", value: 83, note: "-1.2% vs July 2026." },
            { label: "New players onboarded", value: 15, note: "As stated in the workbook summary; its onboarding list has 14 entries (see Data notes)." },
            { label: "Tier promotions", value: 6, note: "Players who moved up a tier." },
            { label: "Accounts transferred", value: 1, note: "Ownership handoffs this month." },
            { label: "All-time VIP spend", value: 1187242, note: "Across the whole active roster. The sheet states no currency." },
            { label: "Prestige + Topspender share", value: "81.3%", note: "Of total top-up: Prestige 48.5%, Topspender 32.8%." },
            { label: "Black tier top-up", value: 4920, note: "One player; 11.1% of total, +23.0% month on month." }
          ],
          blocks: [
            { type: "notes", lead: "Top-up rose sharply while the active roster held steady.",
              bullets: [
                "Total top-up rose 48.3% to 44,302 while active players slipped 1.2% to 83",
                "Prestige (18 players, 21,474) and Topspender (39 players, 14,524) drive 81.3% of total top-up",
                "The single Black tier player accounts for 11.1% of top-up (4,920), up 23.0% month on month",
                "Every tier grew its top-up month on month: Black +23.0%, Prestige +51.4%, Topspender +52.4%, Exclusive +56.1%",
                "15 new players onboarded, 6 tier promotions and 1 account transfer"
              ] },
            { type: "grid", title: "Tier breakdown, August 2026", cols: 2, items: [
              { title: "Top-up by tier",
                paragraphs: ["Prestige generates the most top-up with 18 players; Topspender is the largest tier by headcount."],
                stats: [{ label: "Black", value: "11.1%" }, { label: "Prestige", value: "48.5%" }, { label: "Topspender", value: "32.8%" }, { label: "Exclusive", value: "7.6%" }],
                chart: { title: "Top-up by tier", type: "bar", labels: ["Black", "Prestige", "Topspender", "Exclusive"], series: [{ name: "Top-up", values: [4920, 21474, 14524, 3384] }] },
                note: "Shares are the sheet's % of total top-up." },
              { title: "Active players by tier",
                paragraphs: ["39 of the 83 active players sit in Topspender, 25 in Exclusive, 18 in Prestige and 1 in Black."],
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
              note: "Month-on-month change as stated in the sheet. The total row uses the sheet's summary figures; 100% is the sum of the four stated shares." },
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
                paragraphs: ["15 per the summary; the onboarding list has 14 entries."],
                bullets: ["13 new to the sheet and 1 who took over an existing account", "By current tier: 8 Exclusive, 5 Topspender, 1 Prestige"] },
              { title: "Tier promotions",
                paragraphs: ["6 players moved up a tier in August."],
                bullets: ["1 promotion from Topspender to Prestige, on a 13,618 top-up (23,566 cumulative)", "5 promotions from Exclusive to Topspender, on top-ups of 1,610, 1,110, 576, 386 and 98 (6,516 to 7,262 cumulative)"] },
              { title: "Account transfers",
                paragraphs: ["1 ownership handoff in August, on a Topspender-tier account."] }
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
          lede: "13 of the 14 registered PH guilds (92.9%) joined at least one of August's two guild events: 9 entered the Guild Battle Arena and 13 the Maquinas Outpost Speed Run, where Aria Assassins set the fastest registered clear at 315 seconds. All 14 Guild Leaders received the 10% top-up bonus.",
          badges: [
            { text: "Reported", kind: "ok" }, { text: "14 registered guilds", kind: "info" }, { text: "92.9% active in at least one event", kind: "info" },
            { text: "12 Arena / 16 Speed Run submissions", kind: "info" }, { text: "10% bonus to 14 Guild Leaders", kind: "info" }, { text: "1 guild inactive", kind: "amber" }
          ],
          sourceLine: "Sources: the Cabal PC Guild Leader August workbook (KPI Summary, Guild Roster & Bonus, Guild Battle Arena and Maquinas Speed Run submission logs) and the TS & GL Slides deck.",
          stats: [
            { label: "Registered PH guilds", value: 14, note: "Total guilds on the official roster." },
            { label: "Active in at least one event", value: 13, tone: "up", note: "92.9% of registered guilds; 9 were active in both events." },
            { label: "Guild Battle Arena participation", value: "64.3%", note: "9 of 14 registered guilds; 12 submissions, 3 of them from non-roster guilds." },
            { label: "Maquinas Speed Run participation", value: "92.9%", tone: "up", note: "13 of 14 registered guilds; 16 submissions, 3 of them from non-roster guilds." },
            { label: "Fastest registered clear", value: 315, unit: "sec", note: "Maquinas Outpost Speed Run, by Aria Assassins. Lower is better." },
            { label: "Speed Run views", value: "2,600+", note: "Average views, per the workbook highlight." },
            { label: "Guild Leaders receiving bonus", value: 14, note: "10% top-up bonus applied per Guild Leader." },
            { label: "Guilds with zero participation", value: 1, note: "MASTERS entered neither event." }
          ],
          blocks: [
            { type: "notes", lead: "Near-full roster engagement, with one guild absent.",
              bullets: [
                "13 of 14 registered guilds submitted to at least one event and 9 to both; MASTERS was the only guild with zero participation",
                "The Maquinas Outpost Speed Run drew 16 submissions, 13 of them from registered guilds (92.9% of the roster); the Guild Battle Arena drew 12 submissions, 9 from registered guilds (64.3% of the roster)",
                "The remaining 3 submissions in each event came from guilds outside the PH roster, such as regional rivals",
                "Guild Leaders gave positive feedback on the Guild Mission Festival: rewards were valued and the event ran without reported bugs",
                "Guild Leaders reported occasional issues with Guild Top-Up transactions and asked for multi-card credit card payments, or the 10% bonus applied directly to members' accounts"
              ] },
            { type: "activities", title: "Activities and events", groups: [
              { name: "Guild events",
                intro: "Two guild events ran in the second half of August; entries for both were submitted as Facebook posts. Participation counts registered PH guilds with at least one submission.",
                items: [
                  { name: "Guild Battle Arena", dates: "15–31 August 2026", category: "PH vs Indonesia guild PvP (3v3)",
                    description: "Guild PvP matches against Indonesian guilds, with results submitted via Facebook post.",
                    highlights: [
                      "9 of the 14 registered guilds entered; 5 did not: Synesthesia, Nikostratos, ABYSSHUNTERS, LaughingCoffin and MASTERS",
                      "3 further submissions came from guilds outside the PH roster",
                      "Submissions were logged from 16 to 31 August"
                    ],
                    results: [{ label: "Submissions", value: 12 }, { label: "Registered guilds", value: 9 }, { label: "Participation rate", value: "64.3%" }, { label: "Non-roster submissions", value: 3 }, { label: "Registered guilds not entering", value: 5 }] },
                  { name: "Maquinas Outpost Speed Run", dates: "21–26 August 2026", category: "Guild dungeon clear",
                    description: "Guild dungeon clear submitted via Facebook post; the top 5 fastest and 3 random guilds were rewarded.",
                    highlights: [
                      "Fastest registered clear: Aria Assassins at 315 seconds; 5 of the 16 submissions carry a recorded time",
                      "An average of 2,600+ views, per the workbook highlight",
                      "Only MASTERS did not enter; submissions were logged from 16 to 31 August, beyond the 21–26 August window"
                    ],
                    results: [{ label: "Submissions", value: 16 }, { label: "Registered guilds", value: 13 }, { label: "Participation rate", value: "92.9%" }, { label: "Non-roster submissions", value: 3 }, { label: "Fastest registered clear", value: "315 sec" }] }
                ] }
            ] },
            { type: "charts", title: "Speed Run clear times", items: [
              { title: "Maquinas Outpost Speed Run, recorded clear times", type: "bar", unit: "sec",
                labels: ["Aria Assassins", "STARLIGHT", "PAPISQUAD", "SPECTRAL"],
                series: [{ name: "Clear time", values: [315, 334, 409, 409] }],
                note: "Lower is better. Registered guilds with a recorded time; a fifth timed submission, 214 seconds, came from Together, a guild outside the PH roster." }
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
                paragraphs: ["All 14 Guild Leaders on the roster received the 10% top-up bonus for August."] },
              { title: "Highlight",
                bullets: [
                  "Guild Leaders expressed positive feedback on the Guild Mission Festival: they found the rewards valuable and rewarding, and the event ran smoothly without any reported bugs",
                  "The Maquinas Outpost Speed Run accumulated an average of 2,600+ views, indicating good player engagement and interest in the event" ] },
              { title: "Lowlight",
                bullets: [
                  "Guild Leaders reported occasional issues with Guild Top-Up transactions and stressed the need to resolve these recurring issues for smoother, more reliable transactions",
                  "Guild Leaders are requesting improvements to credit card payment options, particularly allowing multiple cards for top-ups; alternatively, members of guilds with a Top-Up Bonus could receive the 10% bonus directly on their accounts" ] }
            ] },
            { type: "issues", title: "Issues and risks", items: [
              { title: "Guild Top-Up transaction issues", impact: "Guild Leaders report occasional, recurring problems with Guild Top-Up transactions; multi-card support and direct bonus delivery are their top requests.", severity: "", status: "Open", owner: "", resolution: "Deck next step: improve payment system reliability and expand top-up options." },
              { title: "Non-participating guilds", impact: "MASTERS entered neither event, and 5 registered guilds skipped the Guild Battle Arena.", severity: "", status: "Open", owner: "", resolution: "Deck next step: re-engage inactive guilds, especially MASTERS and the Guild Battle Arena non-participants, with targeted campaigns and incentives." }
            ] },
            { type: "actions", title: "Next steps from the deck", items: [
              { action: "Improve payment system reliability and expand top-up options", owner: "", due: "", status: "Planned" },
              { action: "Re-engage inactive guilds, especially MASTERS and non-participating Guild Battle Arena guilds, with targeted campaigns and incentives", owner: "", due: "", status: "Planned" },
              { action: "Continue supporting and promoting Guild Leader incentives to maintain high engagement", owner: "", due: "", status: "Ongoing" }
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
    lede: "September has no major holiday to naturally boost group engagement, so the Cabal Mobile community team will run a more interactive activity; the Cabal Mobile Top Spender program's next Special Benefit E-Card is scheduled for 2–30 September; the Cabal Mobile Guild Leader team carries five recommendations out of the Guild Ranking Challenge; the Cabal PC community team plans more engagement activities and closer moderator monitoring; and the Cabal PC TS & GL deck sets next steps around payment reliability, inactive guilds, Guild Leader incentives and tier promotions. Two program reports are still to come.",
    panels: [
      { title: "Cabal Mobile · Community", bullets: [
        "TikTok dance challenge featuring players' characters, with Force Gems as rewards",
        "Partner group events shift toward emoji- and reaction-based mechanics",
        "At least one Newbie Guide per week from the moderators",
        "Weekly moderator reports for review",
        "New MOU for Community Moderators and Community Leaders",
        "Continued monitoring of competing releases, particularly Cabal Red Thailand" ] },
      { title: "Cabal Mobile · Top Spender/VIP", bullets: [
        "September E-Card (Special Benefit) scheduled for 2–30 September per the activity list",
        "August E-Card feedback on record: the High Tier reward was seen as weaker than Mid Tier, and not all High Tier accounts are maxed out in upgrades. No response is recorded in the sheets" ] },
      { title: "Cabal Mobile · Guild Leader", bullets: [
        "Review increasing activity codes from 20 to 30 per participant",
        "Assess OVL bracket capacity and whether an additional Mission War channel is justified",
        "Clarify and evaluate the permanent Transmuter / Battle Style proposal with the game team",
        "Repeat the before/during participation tracking for the next Guild Activity",
        "Follow up with the 8 non-participating Guild Leaders at an appropriate time" ] },
      { title: "Cabal PC · Community", bullets: [
        "More trivia, polls, screenshot challenges, memes, GM hunts and mini-games to keep players active",
        "Moderators to regularly gather feedback and monitor game issues, scams, bots, top-up concerns and player sentiment",
        "Scout additional partner leads for in-game influence and more community data",
        "Clearer moderator responsibilities and accountability, with immediate reporting of issues and concerns" ] },
      { title: "Cabal PC · Top Spender/VIP", bullets: [
        "Monitor tier promotions to sustain VIP growth momentum",
        "Improve payment system reliability and expand top-up options" ] },
      { title: "Cabal PC · Guild Leader", bullets: [
        "Re-engage inactive guilds, especially MASTERS and the Guild Battle Arena non-participants, with targeted campaigns and incentives",
        "Continue supporting and promoting Guild Leader incentives to maintain high engagement",
        "Guild Leaders' requests on record: resolve the recurring Guild Top-Up transaction issues, allow multiple credit cards for top-ups, or apply the 10% bonus directly to members' accounts" ] }
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
