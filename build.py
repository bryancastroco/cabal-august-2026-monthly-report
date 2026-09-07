#!/usr/bin/env python3
"""
Build a single self-contained HTML file from the source files.

    python3 build.py            -> dist/august-2026-monthly-report.html

Everything is inlined: styles.css, data.js, app.js and every image in assets/
(as base64 data URIs). The result is one file you can email, drop in Slack or
open with no web server. Google Fonts still loads from the network; without it
the page falls back to system sans-serif and still reads fine.

Nothing here needs editing month to month. Edit data.js and re-run.
"""

import base64
import mimetypes
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).parent
DIST = ROOT / "dist"


def data_uri(path: pathlib.Path) -> str:
    mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    return f"data:{mime};base64," + base64.b64encode(path.read_bytes()).decode()


def main() -> int:
    html = (ROOT / "index.html").read_text()
    css = (ROOT / "styles.css").read_text()
    data = (ROOT / "data.js").read_text()
    app = (ROOT / "app.js").read_text()

    # Inline every assets/... path referenced in data.js
    missing = []
    for ref in sorted(set(re.findall(r'"(assets/[^"]+)"', data))):
        path = ROOT / ref
        if not path.exists():
            missing.append(ref)
            continue
        data = data.replace(f'"{ref}"', f'"{data_uri(path)}"')
    if missing:
        print("Missing assets referenced in data.js:", ", ".join(missing), file=sys.stderr)
        return 1

    html = html.replace(
        '<link rel="stylesheet" href="styles.css">',
        "<style>\n" + css.strip() + "\n</style>",
    )
    html = html.replace(
        '<script src="data.js"></script>\n<script src="app.js"></script>',
        '<script id="report-data">\n' + data.strip() + "\n</script>\n"
        "<script>\n" + app.strip() + "\n</script>",
    )

    DIST.mkdir(exist_ok=True)
    out = DIST / "august-2026-monthly-report.html"
    out.write_text(html)
    print(f"Wrote {out.relative_to(ROOT)} ({len(html) / 1024:.0f} KB)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
