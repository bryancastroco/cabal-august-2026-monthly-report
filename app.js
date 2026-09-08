(function () {
  'use strict';
  var R = REPORT, M = R.meta || {};

  /* ---------- helpers ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function has(v) { return Array.isArray(v) ? v.length > 0 : !(v == null || String(v).trim() === ''); }
  function num(v) { if (typeof v === 'number') return v; if (!has(v)) return NaN; var n = Number(String(v).replace(/[^0-9.\-]/g, '')); return Number.isFinite(n) ? n : NaN; }
  function show(v, unit) {
    if (!has(v)) return '';
    if (typeof v !== 'number') return esc(v);
    var s = v.toLocaleString('en-US', { maximumFractionDigits: 2 });
    if (!has(unit)) return s;
    unit = String(unit);
    if (unit === '%') return s + '%';
    if (/^[$₱€£¥฿]/.test(unit)) return esc(unit) + s;
    return s + ' ' + esc(unit);
  }
  function list(arr, fn) { return (arr || []).map(fn).join(''); }
  function paras(v) { return [].concat(v || []).filter(has).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join(''); }
  function bullets(v) { return has(v) ? '<ul class="clean">' + list(v, function (b) { return '<li>' + esc(b) + '</li>'; }) + '</ul>' : ''; }
  function badge(b) { return '<span class="badge ' + esc(b.kind || 'info') + '">' + esc(b.text) + '</span>'; }
  function statusBadge(s) {
    if (!has(s)) return '<span class="flat">—</span>';
    var t = String(s).toLowerCase(), k = /(done|complete|closed|resolved|achieved|delivered|live)/.test(t) ? 'ok' : /(blocked|overdue|off track|critical|cancel)/.test(t) ? 'info' : /(recommend|planned|monitor|open|ongoing|pending)/.test(t) ? 'amber' : 'dim';
    return '<span class="badge ' + k + '">' + esc(s) + '</span>';
  }
  function notes(n, cls) { if (!n || (!has(n.lead) && !has(n.bullets))) return ''; return '<div class="notes' + (cls ? ' ' + cls : '') + ' rise">' + (has(n.lead) ? '<p><strong>' + esc(n.lead) + '</strong></p>' : '') + bullets(n.bullets) + '</div>'; }
  function kv(stats) {
    var s = (stats || []).filter(function (x) { return has(x.label); });
    return s.length ? '<div class="kv">' + list(s, function (x) { return '<div><span>' + esc(x.label) + '</span><b>' + (has(x.value) ? show(x.value, x.unit) : '—') + '</b></div>'; }) + '</div>' : '';
  }

  /* ---------- charts (bars with value labels, matching the Q2/Q3 report) ---------- */
  var FALLBACK = ['var(--crimson)', 'var(--mob)', 'var(--amber)', 'var(--green)'];
  function niceStep(raw) { if (!(raw > 0)) return 1; var p = Math.pow(10, Math.floor(Math.log10(raw))), r = raw / p; return (r <= 1 ? 1 : r <= 2 ? 2 : r <= 5 ? 5 : 10) * p; }
  function fmtAxis(v) { var a = Math.abs(v); if (a >= 1e6) return (v / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'; if (a >= 1e3) return (v / 1e3).toFixed(1).replace(/\.0$/, '') + 'k'; return String(Math.round(v * 100) / 100); }
  function fmtVal(n, unit) { var s = Math.abs(n) >= 10000 ? n.toLocaleString('en-US', { maximumFractionDigits: 0 }) : n.toLocaleString('en-US', { maximumFractionDigits: 1 }); return unit === '%' ? s + '%' : s; }
  function seriesColor(s, i, palette) { return s.color || (palette && palette[i]) || FALLBACK[i % FALLBACK.length]; }
  function chart(m, palette) {
    var labels = (m.labels || []).map(String);
    var series = (m.series || []).filter(function (s) { return Array.isArray(s.values) && s.values.length; });
    if (!labels.length || !series.length) return '';
    var W = 760, H = 270, L = 48, RR = 14, T = 22, B = 34, iw = W - L - RR, ih = H - T - B;
    var all = [];
    series.forEach(function (s) { s.values.forEach(function (v) { var n = num(v); if (Number.isFinite(n)) all.push(n); }); });
    if (!all.length) return '';
    var max = Math.max.apply(null, [0].concat(all)), min = Math.min.apply(null, [0].concat(all));
    if (max === min) max = min + 1;
    var step = niceStep((max - min) / 4);
    max = Math.ceil((max * 1.08) / step) * step; min = Math.floor(min / step) * step;
    function y(v) { return T + ih - (v - min) / (max - min) * ih; }
    function x(i) { return L + (i + 0.5) * (iw / labels.length); }
    var out = '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(m.title || 'Chart') + '">';
    var ticks = Math.round((max - min) / step);
    for (var k = 0; k <= ticks; k++) {
      var tv = min + k * step, yy = y(tv).toFixed(1);
      out += '<line class="grid" x1="' + L + '" x2="' + (W - RR) + '" y1="' + yy + '" y2="' + yy + '"/><text class="lbl lbl-r" x="' + (L - 8) + '" y="' + (y(tv) + 4).toFixed(1) + '">' + fmtAxis(tv) + '</text>';
    }
    out += '<line class="axis" x1="' + L + '" x2="' + (W - RR) + '" y1="' + y(0).toFixed(1) + '" y2="' + y(0).toFixed(1) + '"/>';
    labels.forEach(function (lab, i) { out += '<text class="lbl lbl-c" x="' + x(i).toFixed(1) + '" y="' + (H - B + 20) + '">' + esc(lab) + '</text>'; });
    if ((m.type || 'bar') === 'line') {
      series.forEach(function (s, si) {
        var col = seriesColor(s, si, palette);
        var pts = s.values.map(function (v, i) { return { i: i, x: x(i), y: y(num(v)), n: num(v) }; }).filter(function (p) { return Number.isFinite(p.y); });
        out += '<polyline class="ln" style="stroke:' + col + '" points="' + pts.map(function (p) { return p.x.toFixed(1) + ',' + p.y.toFixed(1); }).join(' ') + '"/>';
        pts.forEach(function (p) {
          out += '<circle class="dot" cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="4" style="fill:' + col + '" data-tt="' + esc(s.name || '') + '|' + esc(labels[p.i]) + ': ' + fmtVal(p.n, m.unit) + '"></circle>';
          out += '<text class="vlbl" x="' + p.x.toFixed(1) + '" y="' + (p.y - 9).toFixed(1) + '">' + fmtVal(p.n, m.unit) + '</text>';
        });
      });
    } else {
      var gw = iw / labels.length;
      labels.forEach(function (lab, i) {
        var present = [];
        series.forEach(function (s, si) { var n = num(s.values[i]); if (Number.isFinite(n)) present.push({ s: s, si: si, n: n }); });
        if (!present.length) return;
        var bw = Math.min(48, (gw * 0.72) / present.length);
        present.forEach(function (pb, k) {
          var col = seriesColor(pb.s, pb.si, palette);
          var x0 = x(i) - (bw * present.length) / 2 + k * bw, y0 = y(Math.max(pb.n, 0)), y1 = y(Math.min(pb.n, 0));
          out += '<rect class="bar" x="' + x0.toFixed(1) + '" y="' + y0.toFixed(1) + '" width="' + (bw - 3).toFixed(1) + '" height="' + Math.max(0, y1 - y0).toFixed(1) + '" rx="2" style="fill:' + col + '" data-tt="' + esc(pb.s.name || '') + '|' + esc(lab) + ': ' + fmtVal(pb.n, m.unit) + '"></rect>';
          out += '<text class="' + (bw < 30 ? 'sml' : 'vlbl') + '" x="' + (x0 + (bw - 3) / 2).toFixed(1) + '" y="' + Math.max(10, y0 - 5).toFixed(1) + '">' + fmtVal(pb.n, m.unit) + '</text>';
        });
      });
    }
    return out + '</svg>';
  }
  function legend(m, palette) {
    var series = m.series || [];
    if (series.length < 2) return '';
    return '<div class="legend">' + series.map(function (s, i) { return '<span><i style="background:' + seriesColor(s, i, palette) + '"></i>' + esc(s.name || 'Series ' + (i + 1)) + '</span>'; }).join('') + '</div>';
  }
  function chartPanel(m, palette, title) {
    var svg = chart(m, palette);
    return '<div class="panel rise">' + (has(title || m.title) ? '<h4>' + esc(title || m.title) + (has(m.unit) ? ' <span style="color:var(--dim)">(' + esc(m.unit) + ')</span>' : '') + '</h4>' : '') +
      (svg || '<p class="pnote">This chart needs labels and at least one series with numbers.</p>') + legend(m, palette) +
      (has(m.note) ? '<p class="pnote">' + esc(m.note) + '</p>' : '') + '</div>';
  }

  /* ---------- content blocks ---------- */
  function statCard(s) {
    var big = has(s.value) ? show(s.value, s.unit) : '—';
    return '<div class="stat rise"><div class="lab">' + esc(s.label) + '</div><div class="big' + (has(s.tone) ? ' ' + esc(s.tone) : '') + '">' + big + (has(s.small) ? '<small>' + esc(s.small) + '</small>' : '') + '</div>' + (has(s.note) ? '<div class="note">' + esc(s.note) + '</div>' : '') + '</div>';
  }
  function statsGrid(stats) { return has(stats) ? '<div class="g4">' + list(stats, statCard) + '</div>' : ''; }
  function gridItem(it, palette) {
    return '<div class="panel rise">' + (has(it.title) ? '<h4>' + esc(it.title) + '</h4>' : '') + (has(it.subtitle) ? '<p class="psub">' + esc(it.subtitle) + '</p>' : '') +
      paras(it.paragraphs) + bullets(it.bullets) + kv(it.stats) +
      (it.chart ? '<div style="margin-top:14px">' + chart(it.chart, palette) + legend(it.chart, palette) + '</div>' : '') +
      (has(it.note) ? '<p class="pnote">' + esc(it.note) + '</p>' : '') + '</div>';
  }
  function imgSrc(key) { return (has(key) && ASSETS[key]) ? ASSETS[key] : ''; }
  function activityCard(a) {
    var res = (a.results || []).filter(function (r) { return has(r.label); });
    var src = imgSrc(a.image);
    return '<div class="hl rise">' +
      (src ? '<div class="shot"><img src="' + src + '" alt="' + esc(a.name || '') + '" data-cap="' + esc(a.name || '') + '"></div>' : '') +
      (has(a.category) ? '<span class="tag">' + esc(a.category) + '</span>' : '') +
      '<div class="post">' + esc(a.name || 'Untitled activity') + '</div>' +
      (has(a.dates) || has(a.status) ? '<div class="sec">' + (has(a.dates) ? esc(a.dates) : '') + (has(a.dates) && has(a.status) ? ' · ' : '') + (has(a.status) ? '<b>' + esc(a.status) + '</b>' : '') + '</div>' : '') +
      (has(a.description) ? '<div class="why">' + esc(a.description) + '</div>' : '') +
      kv(res) + bullets(a.highlights) + '</div>';
  }
  function activityWide(a) {
    var res = (a.results || []).filter(function (r) { return has(r.label); });
    var wsrc = imgSrc(a.image);
    return '<div class="panel act rise">' +
      (wsrc ? '<div class="act-shot"><img src="' + wsrc + '" alt="' + esc(a.name || '') + '" data-cap="' + esc(a.name || '') + '"></div>' : '') +
      '<div class="act-head"><span class="nm">' + esc(a.name || 'Untitled activity') + '</span>' + (has(a.status) ? '<span class="badge ok">' + esc(a.status) + '</span>' : '') + (has(a.category) ? '<span class="badge dim">' + esc(a.category) + '</span>' : '') + (has(a.dates) ? '<span class="dt">' + esc(a.dates) + '</span>' : '') + '</div>' +
      (has(a.description) ? '<p class="act-desc">' + esc(a.description) + '</p>' : '') +
      (function () {
        var left = (has(a.objective) ? '<h4>Objective</h4><p>' + esc(a.objective) + '</p>' : '') + (has(a.highlights) ? '<h4>Highlights</h4>' + bullets(a.highlights) : '');
        var right = res.length ? '<h4>Results</h4>' + kv(res) : '';
        return (left && right) ? '<div class="g2"><div>' + left + '</div><div>' + right + '</div></div>' : (left || right ? '<div>' + left + right + '</div>' : '');
      })() +
      (has(a.photos) ? '<div class="g3" style="margin-top:14px">' + list(a.photos, function (ph) { var src = typeof ph === 'string' ? ph : ph.src, cap = typeof ph === 'string' ? '' : ph.caption; return '<img src="' + esc(src) + '" alt="' + esc(cap || a.name) + '" data-cap="' + esc(cap) + '" style="width:100%;border-radius:10px;border:1px solid var(--line);cursor:zoom-in">'; }) + '</div>' : '') +
      '</div>';
  }
  function renderBlock(b, ctx) {
    var pal = ctx.palette;
    switch (b.type) {
      case 'notes': return notes(b);
      case 'panel': return '<div class="block">' + (has(b.title) ? '<div class="sub-h">' + esc(b.title) + '</div>' : '') + '<div class="panel rise">' + paras(b.paragraphs) + bullets(b.bullets) + (has(b.note) ? '<p class="pnote">' + esc(b.note) + '</p>' : '') + '</div></div>';
      case 'grid': {
        var cols = b.cols === 1 ? 'g1' : b.cols === 3 ? 'g3' : 'g2';
        return '<div class="block">' + (has(b.title) ? '<div class="sub-h">' + esc(b.title) + '</div>' : '') + (has(b.intro) ? '<p class="lede" style="margin-bottom:16px">' + esc(b.intro) + '</p>' : '') +
          '<div class="' + cols + '">' + list(b.items, function (it) { return gridItem(it, pal); }) + '</div>' + (has(b.note) ? '<p class="pnote">' + esc(b.note) + '</p>' : '') + '</div>';
      }
      case 'activities': return '<div class="block">' + (has(b.title) ? '<div class="sub-h">' + esc(b.title) + '</div>' : '') + list(b.groups, function (g) {
        var items = g.items || [];
        var body = items.length >= 3 ? '<div class="g3">' + list(items, activityCard) + '</div>' : list(items, activityWide);
        return '<div class="grp">' + (has(g.name) ? '<div class="ghead"><i style="background:' + esc(ctx.color) + '"></i><h3>' + esc(g.name) + '</h3></div>' : '') + (has(g.intro) ? '<p class="gintro">' + esc(g.intro) + '</p>' : '') + body + (has(g.note) ? notes({ lead: '', bullets: [g.note] }) : '') + '</div>';
      }) + '</div>';
      case 'charts': {
        var items = b.items || [];
        return '<div class="block">' + (has(b.title) ? '<div class="sub-h">' + esc(b.title) + '</div>' : '') + (items.length > 1 ? '<div class="g2">' : '') + list(items, function (m) { return chartPanel(m, pal); }) + (items.length > 1 ? '</div>' : '') + '</div>';
      }
      case 'table': return '<div class="block">' + (has(b.title) ? '<div class="sub-h">' + esc(b.title) + '</div>' : '') + '<div class="scroll-x"><table class="tbl wide"><thead><tr>' + list(b.columns, function (c) { var o = typeof c === 'string' ? { text: c } : c; return '<th' + (o.num ? ' class="num"' : '') + '>' + esc(o.text) + '</th>'; }) + '</tr></thead><tbody>' +
        list(b.rows, function (r) { return '<tr>' + list(r, function (c) { var o = (c && typeof c === 'object') ? c : { text: c }; return '<td' + (has(o.cls) ? ' class="' + esc(o.cls) + '"' : '') + '>' + (has(o.text) ? esc(o.text) : '<span class="flat">—</span>') + (has(o.sub) ? '<span class="sub">' + esc(o.sub) + '</span>' : '') + '</td>'; }) + '</tr>'; }) +
        '</tbody></table></div>' + (has(b.note) ? '<p class="pnote">' + esc(b.note) + '</p>' : '') + '</div>';
      case 'issues': return '<div class="block">' + (has(b.title) ? '<div class="sub-h">' + esc(b.title) + '</div>' : '') + '<div class="scroll-x"><table class="tbl wide"><thead><tr><th>Issue</th><th>Impact</th><th>Severity</th><th>Status</th><th>Owner</th><th>Resolution or next step</th></tr></thead><tbody>' +
        list(b.items, function (i) { return '<tr><td><b>' + esc(i.title) + '</b></td><td>' + (has(i.impact) ? esc(i.impact) : '<span class="flat">—</span>') + '</td><td>' + (has(i.severity) ? esc(i.severity) : '<span class="flat">—</span>') + '</td><td>' + statusBadge(i.status) + '</td><td>' + (has(i.owner) ? esc(i.owner) : '<span class="flat">—</span>') + '</td><td>' + (has(i.resolution) ? esc(i.resolution) : '<span class="flat">—</span>') + '</td></tr>'; }) +
        '</tbody></table></div></div>';
      case 'actions': return '<div class="block">' + (has(b.title) ? '<div class="sub-h">' + esc(b.title) + '</div>' : '') + '<div class="scroll-x"><table class="tbl wide"><thead><tr><th>Action</th><th>Owner</th><th>Due</th><th>Status</th></tr></thead><tbody>' +
        list(b.items, function (a) { return '<tr><td>' + esc(a.action) + '</td><td>' + (has(a.owner) ? esc(a.owner) : '<span class="flat">—</span>') + '</td><td>' + (has(a.due) ? esc(a.due) : '<span class="flat">—</span>') + '</td><td>' + statusBadge(a.status) + '</td></tr>'; }) +
        '</tbody></table></div></div>';
      default: return '';
    }
  }

  /* ---------- page assembly ---------- */
  function progId(prod, prog) { return prod.id + '-' + prog.id; }
  function programSection(prod, prog) {
    var id = progId(prod, prog), pending = prog.status !== 'reported';
    var kicker = prod.name + ' · ' + prog.title;
    if (pending) {
      return '<section class="prog pend slide" id="' + esc(id) + '"><div class="wrap">' +
        '<span class="kicker rise">' + esc(kicker) + '</span><h2 class="h2 rise">' + esc(prog.title) + '</h2>' +
        '<div class="badgerow rise"><span class="badge dim">Pending</span></div>' +
        '<div class="pend-box rise"><b>Data not available</b><span>' + esc(prog.note || 'The August report for this program has not been received yet.') + '</span></div>' +
        '</div></section>';
    }
    var ctx = { palette: prod.palette, color: prod.color };
    /* A leading "notes" block is the program's key points: show it above the KPI
       cards so each program opens with its takeaways rather than a wall of numbers. */
    var blocks = prog.blocks || [];
    var keyPoints = (blocks[0] && blocks[0].type === 'notes') ? blocks[0] : null;
    var rest = keyPoints ? blocks.slice(1) : blocks;
    return '<section class="prog slide" id="' + esc(id) + '"><div class="wrap">' +
      '<span class="kicker rise">' + esc(kicker) + '</span><h2 class="h2 rise">' + esc(prog.title) + '</h2>' +
      (has(prog.lede) ? '<p class="lede rise">' + esc(prog.lede) + '</p>' : '') +
      (has(prog.badges) ? '<div class="badgerow rise">' + list(prog.badges, badge) + '</div>' : '') +
      (has(prog.sourceLine) ? '<p class="srcline rise">' + esc(prog.sourceLine) + '</p>' : '') +
      (imgSrc(prog.banner) ? '<figure class="prog-banner rise"><img src="' + imgSrc(prog.banner) + '" alt="' + esc(prog.title) + '" data-cap="' + esc(prog.bannerCaption || prog.title) + '">' + (has(prog.bannerCaption) ? '<figcaption>' + esc(prog.bannerCaption) + '</figcaption>' : '') + '</figure>' : '') +
      (keyPoints ? notes(keyPoints, 'notes-lead') : '') +
      statsGrid(prog.stats) +
      list(rest, function (b) { return renderBlock(b, ctx); }) +
      '</div></section>';
  }
  function productBlock(prod) {
    var reported = prod.programs.filter(function (p) { return p.status === 'reported'; }).length;
    var strip = '<div class="strip rise">' + list(prod.programs, function (p) {
      var done = p.status === 'reported';
      return '<a class="mo ' + (done ? 'done' : 'pend') + '" href="#' + esc(progId(prod, p)) + '"><div class="m">' + esc(p.title) + '</div><div class="n">' + (done ? esc(p.short || 'Results in') : 'Awaiting the August report') + '</div><span class="badge ' + (done ? 'ok' : 'dim') + '">' + (done ? 'Reported' : 'Pending') + '</span></a>';
    }) + '</div>';
    return '<div id="' + esc(prod.id) + '" class="prodblock">' +
      '<section class="prod slide"><div class="wrap">' +
      '<div class="phead rise">' + (ASSETS[prod.icon] ? '<img src="' + ASSETS[prod.icon] + '" alt="' + esc(prod.full) + '">' : '<i class="sw" style="background:' + esc(prod.color) + '"></i>') +
      '<div><h2>' + esc(prod.name) + '</h2><div class="full">' + esc(prod.full) + '</div></div>' +
      '<div class="right"><b>' + reported + '</b> of ' + prod.programs.length + ' programs reported</div></div>' +
      strip + '</div></section>' +
      list(prod.programs, function (p) { return programSection(prod, p); }) +
      '</div>';
  }

  function render() {
    var totalProg = 0, reportedProg = 0;
    R.products.forEach(function (p) { p.programs.forEach(function (g) { totalProg++; if (g.status === 'reported') reportedProg++; }); });

    document.getElementById('brand').innerHTML = ASSETS.logo ? '<img src="' + ASSETS.logo + '" alt="' + esc(M.company) + '">' : '<b>' + esc(M.company) + '</b>';
    document.getElementById('navlinks').innerHTML = list(R.nav, function (n) { return '<a href="' + esc(n.href) + '">' + esc(n.text) + '</a>'; }) + '<button type="button" id="present-btn">Present</button>';
    document.title = 'CABAL ' + M.period + ' — ' + M.reportType;

    var parts = String(M.period || '').split(/\s+/), month = parts.length > 1 ? parts.slice(0, -1).join(' ') : M.period, year = parts.length > 1 ? parts[parts.length - 1] : '';
    document.getElementById('hero-wrap').innerHTML =
      '<p class="team rise">' + esc(M.team) + ' — ' + esc(M.period) + ' ' + esc(M.reportType) + '</p>' +
      '<h1 class="rise">' + esc(month) + ' ' + esc(year) + '<br><em>' + esc(M.reportType) + '</em></h1>' +
      '<p class="sub rise">' + esc(M.headline) + '</p>' +
      '<div class="icons rise">' + (ASSETS.cbm ? '<img src="' + ASSETS.cbm + '" alt="CABAL Infinite Combo">' : '') + (ASSETS.cbpc ? '<img src="' + ASSETS.cbpc + '" alt="CABAL Ultimate Combo">' : '') + '</div>' +
      '<div class="metaline rise"><span><b>' + esc(M.periodShort) + '</b></span><span>' + esc(M.market) + '</span><span>' + esc(M.products) + '</span><span><b>' + reportedProg + '</b> programs reported · <b>' + (totalProg - reportedProg) + '</b> pending</span>' + (has(M.status) ? '<span>' + esc(M.status) + '</span>' : '') + '</div>';

    var o = R.overview || {};
    var html = '<div class="rule"></div><section id="overview" class="slide"><div class="wrap">' +
      '<span class="kicker rise">' + esc(o.kicker || 'Headline') + '</span><h2 class="h2 rise">' + esc(o.title || 'Overview') + '</h2>' +
      (has(o.lede) ? '<p class="lede rise">' + esc(o.lede) + '</p>' : '') + statsGrid(o.stats) +
      '<div class="sub-h">Where the programs stand</div>' +
      list(R.products, function (prod) {
        return '<div class="grp" style="margin-top:14px"><div class="ghead"><i style="background:' + esc(prod.color) + '"></i><h3>' + esc(prod.name) + '</h3><span style="font-size:.8rem;color:var(--muted)">' + esc(prod.full) + '</span></div><div class="strip rise">' +
          list(prod.programs, function (p) { var done = p.status === 'reported'; return '<a class="mo ' + (done ? 'done' : 'pend') + '" href="#' + esc(progId(prod, p)) + '"><div class="m">' + esc(p.title) + '</div><div class="n">' + (done ? 'Results in' : 'Awaiting report') + '</div><span class="badge ' + (done ? 'ok' : 'dim') + '">' + (done ? 'Reported' : 'Pending') + '</span></a>'; }) +
          '</div></div>';
      }) + notes(o.notes) + '</div></section>';

    R.products.forEach(function (prod) { html += '<div class="rule"></div>' + productBlock(prod); });

    var nx = R.next || {};
    html += '<div class="rule"></div><section id="next" class="slide"><div class="wrap">' +
      '<span class="kicker rise">' + esc(nx.kicker || 'Outlook') + '</span><h2 class="h2 rise">' + esc(nx.title || "What's Next") + '</h2>' +
      (has(nx.lede) ? '<p class="lede rise">' + esc(nx.lede) + '</p>' : '') +
      (has(nx.panels) ? '<div class="g2">' + list(nx.panels, function (p) { return '<div class="panel rise"><h4>' + esc(p.title) + '</h4>' + paras(p.paragraphs) + bullets(p.bullets) + '</div>'; }) + '</div>' : '') +
      notes(nx.notes) + '</div></section>';

    html += '<div class="rule"></div><section id="sources" class="slide"><div class="wrap"><span class="kicker rise">Sources</span><h2 class="h2 rise">Where the numbers come from</h2>' +
      '<div class="srcs rise">' + list(R.sources, function (s) { var inner = '<div class="t">' + esc(s.title) + '</div><div class="d">' + esc(s.desc) + '</div>'; return has(s.url) ? '<a class="src" href="' + esc(s.url) + '" target="_blank" rel="noopener">' + inner + '</a>' : '<div class="src">' + inner + '</div>'; }) + '</div>' +
      notes(R.dataNotes) + '</div></section>';

    document.getElementById('report-body').innerHTML = html;
    document.getElementById('foot').innerHTML = '<strong style="color:var(--muted)">' + esc(M.company) + '</strong> · CABAL SEA · ' + esc(M.team) + ' · compiled ' + esc(M.compiled) + (has(M.status) ? ' · ' + esc(String(M.status).toLowerCase()) : '');
  }
  render();

  /* ---------- behaviour: reveal, scrollspy, tooltip, lightbox ---------- */
  var rises = document.querySelectorAll('.rise');
  if ('IntersectionObserver' in window) {
    var ro = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    rises.forEach(function (el) { ro.observe(el); });
  } else { rises.forEach(function (el) { el.classList.add('in'); }); }

  var navA = Array.prototype.slice.call(document.querySelectorAll('.navlinks a'));
  var targets = navA.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  function spy() {
    var yv = window.scrollY + 120, cur = targets[0];
    targets.forEach(function (t) { if (t.offsetTop <= yv) cur = t; });
    navA.forEach(function (a) { a.classList.toggle('on', cur && a.getAttribute('href') === '#' + cur.id); });
  }
  window.addEventListener('scroll', spy, { passive: true }); spy();

  var tt = document.getElementById('tt');
  document.addEventListener('mousemove', function (e) {
    var el = e.target.closest ? e.target.closest('[data-tt]') : null;
    if (!el) { tt.style.opacity = 0; return; }
    var p = String(el.getAttribute('data-tt')).split('|');
    tt.innerHTML = (p.length > 1 ? '<b>' + esc(p[0]) + '</b>' : '') + esc(p[p.length - 1]);
    tt.style.opacity = 1;
    var x = e.clientX + 14, yy = e.clientY + 14;
    if (x + tt.offsetWidth > window.innerWidth - 12) x = e.clientX - tt.offsetWidth - 14;
    if (yy + tt.offsetHeight > window.innerHeight - 12) yy = e.clientY - tt.offsetHeight - 14;
    tt.style.left = x + 'px'; tt.style.top = yy + 'px';
  });

  var lb = document.getElementById('lb'), lbImg = lb.querySelector('img'), lbCap = lb.querySelector('.cap');
  document.addEventListener('click', function (e) {
    var img = e.target.closest ? e.target.closest('img[data-cap]') : null;
    if (img) { lbImg.src = img.src; lbCap.textContent = img.getAttribute('data-cap') || img.alt || ''; lb.classList.add('open'); }
    else if (e.target === lb || e.target === lbImg) lb.classList.remove('open');
  });

  /* ---------- presentation mode ---------- */
  var body = document.body, controls = document.getElementById('present-controls'), counter = document.getElementById('present-counter'), presentBtn = document.getElementById('present-btn');
  var idx = 0;
  function slides() { return Array.prototype.slice.call(document.querySelectorAll('.slide')); }
  function showSlide(i) { var s = slides(); idx = Math.max(0, Math.min(i, s.length - 1)); s.forEach(function (el, k) { el.classList.toggle('active', k === idx); }); counter.textContent = (idx + 1) + ' / ' + s.length; s[idx].scrollTop = 0; }
  function presenting() { return body.classList.contains('presenting'); }
  function enterP() { body.classList.add('presenting'); controls.hidden = false; showSlide(0); try { var el = document.documentElement; if (el.requestFullscreen) { var p = el.requestFullscreen(); if (p && p.catch) p.catch(function () {}); } } catch (e) {} }
  function exitP() { if (!presenting()) return; body.classList.remove('presenting'); controls.hidden = true; slides().forEach(function (el) { el.classList.remove('active'); }); try { if (document.fullscreenElement && document.exitFullscreen) { var p = document.exitFullscreen(); if (p && p.catch) p.catch(function () {}); } } catch (e) {} }
  presentBtn.addEventListener('click', function () { presenting() ? exitP() : enterP(); });
  document.getElementById('exit-btn').addEventListener('click', exitP);
  document.getElementById('prev-btn').addEventListener('click', function () { showSlide(idx - 1); });
  document.getElementById('next-btn').addEventListener('click', function () { showSlide(idx + 1); });
  document.addEventListener('keydown', function (e) {
    if (lb.classList.contains('open') && e.key === 'Escape') { lb.classList.remove('open'); return; }
    if (!presenting()) return;
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].indexOf(e.key) !== -1) { e.preventDefault(); showSlide(idx + 1); }
    else if (['ArrowLeft', 'ArrowUp', 'PageUp'].indexOf(e.key) !== -1) { e.preventDefault(); showSlide(idx - 1); }
    else if (e.key === 'Home') { e.preventDefault(); showSlide(0); }
    else if (e.key === 'End') { e.preventDefault(); showSlide(slides().length - 1); }
    else if (e.key === 'Escape') exitP();
  });
  document.addEventListener('fullscreenchange', function () { if (!document.fullscreenElement && presenting()) exitP(); });
})();
