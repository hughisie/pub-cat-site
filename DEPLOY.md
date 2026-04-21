# pub.cat — static site deployment

One file does the work: `index.html`. Scroll-scrub video + overlay chapters + full SEO content + structured data, all in one page. Hosted on GitHub Pages.

## Files that ship

| Path | What it is |
|---|---|
| `index.html` | Full page. Scroll-scrub hero (React + Babel from CDN) + investor content + JSON-LD. |
| `assets/logo/*.svg` | Mark + wordmark lockups in paper, ink, red, and blink variants. |
| `CNAME` | `pub.cat` — tells GitHub Pages to serve at the apex. |
| `.nojekyll` | Disables Jekyll so nothing gets mangled. |
| `robots.txt` | Open to all well-behaved crawlers, including AI crawlers. |
| `sitemap.xml` | Primary URL + in-page anchors. |

## Still to produce before first push

1. **`assets/og.png`** — 1200×630 social card. Use a flat paper bg with the red dot-cat mark + "One founder. Every department." in Fraunces italic.
2. **Favicon at `/favicon.ico`** (optional — the SVG favicon already works everywhere modern).

## Publishing to GitHub Pages

```bash
cd "01. Website"
git init
git branch -M main
git add .
git commit -m "Initial pub.cat landing page"
git remote add origin git@github.com:hughisie/pub-cat-site.git
git push -u origin main
```

Then in the GitHub repo: **Settings → Pages → Source: `main` / `(root)`**. CNAME is already present, so it'll serve at `pub.cat` once DNS is pointed.

### DNS at your registrar

Apex (`pub.cat`) — four A records to GitHub Pages IPs:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

`www.pub.cat` — CNAME to `hughisie.github.io` (or whichever account).

GitHub Pages handles the HTTPS cert once DNS resolves.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Any static server works. The page loads React 18 + Babel Standalone from unpkg — fine for a brochure site, and the perf cost is bounded by the CDN's HTTP/2 + edge caching.

## Why this architecture

- **Single file:** everything that a crawler indexes is pre-rendered in HTML (nav, hero h1, chapter captions are all semantic HTML; the SVG animation sits on top). The React/Babel layer adds animation, not content.
- **Scroll-scrub via `position: sticky`:** the `#hero-stage` section is 600vh tall, the inner `.pin` is `position: sticky; top: 0; height: 100vh`, so scrolling drives the animation playhead from 0 → 1 across that runway. After that, regular document flow continues into the investor sections.
- **No bundler, no build:** zero pipeline to go stale. Open the HTML and it works.

## Tweaking the animation

The entire animation engine — Stage, Sprite, timeline, 6 scenes — is inlined as `<script type="text/babel">` blocks. To change scene timings edit the `start`/`end` props on each `<Sprite>`; to change the total duration edit `const DURATION = 14` (line ~2528 or so). The overlay chapter ranges (`data-range="0.18,0.38"` etc.) are independent — they drive fade states from scroll % directly.
