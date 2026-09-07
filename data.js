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
  match: "assets/event-match-it.webp"
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
     stats       KPI cards: [{ label, value, note, tone: "up" | "down" }]
     blocks      ordered content blocks, each with a "type":
       notes       { lead, bullets }                 amber-bar callout
       panel       { title, paragraphs, bullets }    single panel
       grid        { title, intro, cols, items }     panels in a grid;
                   item: { title, subtitle, paragraphs, bullets, stats: [{label, value}], chart, note }
       activities  { title, groups: [{ name, intro, note, items }] }
                   item: { name, dates, status, category, description, image (ASSETS key), objective, results: [{label, value}], highlights }
       charts      { title, items: [chart] }        chart: { title, type: "bar" | "line", unit, labels, series: [{ name, values, color }], note }
       table       { title, columns, rows, note }   rows are arrays of cells; a cell may be { text, sub, cls }
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
    headline: "Three of eight program reports are in, all for Cabal Mobile: the community grew 3.33% to 21,507 members, the Top Spender roster reached 151 with 71 receiving the National Heroes Day E-Card, and 86.2% of Guild Leaders joined the Guild Ranking Challenge.",
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
    lede: "Community and Guild Leader both show reward-based activity moving the numbers: the Facebook community grew 3.33% to 21,507 members with comments up 472% on event posts, and the Guild Ranking Challenge lifted Mission War participation by 22.8% in Bracket 199 and 36.2% in the OVL bracket. The Top Spender roster grew from 148 to 151, with 71 High and Mid Tier accounts receiving the National Heroes Day E-Card. Streamer for Cabal Mobile and all four Cabal PC programs have not reported.",
    stats: [
      { label: "Programs reported", value: "3", small: "of 8", note: "Cabal Mobile Community, Top Spender/VIP and Guild Leader. Five programs pending." },
      { label: "Community members", value: 21507, note: "+693 in August, a 3.33% increase from the start of the month; 565 new members." },
      { label: "Top Spenders", value: 151, note: "Up from 148 in July; 47 active. 71 High and Mid Tier accounts received the August E-Card." },
      { label: "Guild Leader participation", value: "86.2%", note: "50 of 58 Guild Leaders joined the Guild Ranking Challenge; Mission War participation up 22.8% in Bracket 199 and 36.2% in the OVL bracket." }
    ],
    notes: {
      lead: "Three programs have reported.",
      bullets: [
        "Cabal Mobile Community, Top Spender/VIP and Guild Leader have August results",
        "Cabal Mobile Streamer is pending",
        "All four Cabal PC programs are pending"
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
        { id: "community", title: "Community", status: "pending", note: "The August Community report for Cabal PC has not been received yet." },
        { id: "vip", title: "Top Spender/VIP", status: "pending", note: "The August Top Spender/VIP report for Cabal PC has not been received yet." },
        { id: "guild", title: "Guild Leader", status: "pending", note: "The August Guild Leader report for Cabal PC has not been received yet." },
        { id: "streamer", title: "Streamer", status: "pending", note: "The August Streamer report for Cabal PC has not been received yet." }
      ]
    }
  ],

  next: {
    kicker: "Outlook",
    title: "What's Next",
    lede: "September has no major holiday to naturally boost group engagement, so the community team will run a more interactive activity; the Top Spender program's next Special Benefit E-Card is scheduled for 2–30 September; and the Guild Leader team carries five recommendations out of the challenge. Five program reports are still to come.",
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
        "Follow up with the 8 non-participating Guild Leaders at an appropriate time" ] }
    ],
    notes: {
      lead: "Still to report for August.",
      bullets: ["Cabal Mobile: Streamer", "Cabal PC: Community, Top Spender/VIP, Guild Leader and Streamer"]
    }
  },

  sources: [
    { title: "Community Report deck", desc: "[AUG 2026] Community Report, 15 pages", url: "https://www.canva.com/d/CAxmTnbo9G8-PHo" },
    { title: "Top Spender report sheet", desc: "[TS] Monthly Report - August, Google Sheet, one tab", url: "https://docs.google.com/spreadsheets/d/1ReLzocI18oeQalLxrw9ObBk72Zma8KH7LBPaSgmnvj8/edit?gid=0#gid=0" },
    { title: "August E-Card activity tab", desc: "[SEA-TS] August E-Card (SPECIAL BENEFIT) tab in ITEM CODE (BD) 2025 - MSEA [UPDATED 2026]", url: "https://docs.google.com/spreadsheets/d/1bPrNx6K9UmOLQzGRS3FkVnbSjQ2jlbeo8rOrF6pbjJE/edit?gid=61151223#gid=61151223" },
    { title: "E-Card banner post", desc: "Banner posting link from the [TS] Monthly Report - August sheet (Facebook)", url: "https://www.facebook.com/photo/?fbid=122129178302936258&set=g.532583169239776" },
    { title: "Guild Ranking Challenge deck", desc: "August 2026 Insights, 6 pages, prepared by AE PH: Ian", url: "https://www.canva.com/d/owhTiDEInG9aRZ4" },
    { title: "Guild Program update", desc: "Partnered count, 10% Guild Leaders and removals, shared as text", url: "" }
  ],

  dataNotes: {
    lead: "Data notes.",
    bullets: [
      "Community: the gender split uses the deck's legend (men 92.2%); the pie label reads 92.9%",
      "Community: 565 new members and 693 net growth are both as stated in the deck",
      "Community: Philippine region shares are read from the deck's chart; the age chart and the moderator approvals chart carry no value labels, so those are described in words",
      "Community: the Community Talks video post carries the same five figures as Spot the Difference (47 / 110 / 67 / 1,100 / 226)",
      "Top Spender: Active (47) and Inactive (143) are as stated in the sheet and do not add up to the Total (151); July has the same gap (45, 143, 148)",
      "Top Spender: the report sheet counts 71 E-Card receivers (8 High Tier, 63 Mid Tier); the E-Card activity tab's PH row shows 62 Mid Tier, 14 High Tier, 76 in total. The report sheet's figures are used",
      "Top Spender: the E-Card activity tab still lists delivery and code generation as in progress, while the report sheet carries receiver feedback; the activity list dates it 7–31 August and the activity details 9–31 August",
      "Guild Leader: the challenge counts 58 Guild Leaders; the program update counts 52 partnered. Both are shown as stated, and \"10% Guild Leaders\" is kept as labelled",
      "Guild Leader: 8 non-participants (6 work, 2 hospitalized) and 7 removals (5 work, 2 hospitalized) are separate facts from separate sources",
      "Guild Leader: the deck says Bracket 199 pre-event totals ranged from 100 to 113; its own chart puts 3 August at 119 and 5 August at 97"
    ]
  }
};
