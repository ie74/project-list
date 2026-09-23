# Project List - Campaign Website

Official website for **Project List**, a student list running for student
representative elections at Istituto A. Messedaglia. The site presents the
list's platform, team, events, and merch, and links out to the external
e-commerce store where merch is actually sold.

Live deployment: `projectlistmesse.vercel.app` (Vercel Hobby plan, static
site, no build step).

---

## Goal

A fast, clean, single-purpose campaign site: explain who's running, what
they're proposing, and where to find more — with zero friction for
students browsing on their phones between classes. No login, no backend,
no tracking beyond what a standard static host provides.

---

## Tech stack

Plain HTML, CSS and vanilla JavaScript. No framework, no build tool, no
package manager. This is a deliberate choice:

- the content is mostly static and won't outgrow a handful of pages before
  the election is over
- anyone on the team can open a file and edit text directly, no npm install
  required
- deploys instantly on Vercel's static hosting with no build step to
  maintain or break

## Project structure

```
.
├── index.html          Landing page (home)
├── style.css           Single global stylesheet, imported by every page
├── script.js           Shared JS: footer year + mobile menu toggle
├── pages/               Inner pages (platform, team, events, merch, etc.)
│   └── ...              Each page is a standalone .html file, same
│                         header/footer markup as index.html
└── assets/
    ├── logo/            Logo files (icon.svg for the header, a full/
    │                     extended version for the homepage hero)
    └── img/             Any other image asset (e.g. social preview image)
```

Pages inside `pages/` reference shared files and other pages with relative
paths (for example, `../style.css` and `../script.js`). This keeps the links
working when the HTML files are opened locally or served from a subpath.

## Design system

All shared design decisions live in `style.css`, so every page stays
visually consistent without repeating styles.

### Colors

Extracted directly from the official brandboard:

| Token | Hex | Usage |
|---|---|---|
| `--color-text-primary` | `#0d0e12` | Body text, headings |
| `--color-text-secondary` | `#414b57` | Muted text, captions |
| `--color-bg` | `#fcfdff` | Page background |
| `--color-surface` | `#ebeff8` | Alternate section background |
| `--color-accent` | `#3b82f6` | Accent bright — CTAs, links on hover |
| `--color-accent-navy` | `#0b2558` | Accent navy — header, footer, primary buttons |

### Typography

Two Google Fonts, loaded via `@import` at the top of `style.css`:

- **Space Grotesk** (`--font-display`) — headings and titles (`.title`,
  `.card__title`, brand name in the footer)
- **Sora** (`--font-body`) — body text, buttons, captions, everything else

### Reusable classes

The stylesheet defines a small set of building blocks meant to be reused
across every page, rather than one-off styles per section:

- `.title`, `.title--hero` / `.title--lg` / `.title--md` — heading sizes
- `.text`, `.text--muted`, `.text--lg` — body text variants
- `.caption` — small labels/metadata
- `.link` — inline text links with an animated underline
- `.button`, `.button--primary` / `.button--secondary` / `.button--accent`
- `.card` — the repeating link/info blocks (used in the "links" grid)
- `.section`, `.section--tight`, `.section--surface` — page section
  wrappers with consistent vertical rhythm
- `.container` — max-width content wrapper (see `--max-width`)

When building a new page, prefer these existing classes over writing new
CSS. If a new pattern is genuinely needed, add it to `style.css` under the
relevant numbered section (the file is organized in commented blocks:
tokens → reset → layout → typography → buttons → cards → header → footer →
utility → page-specific).

## Header & navigation

- Sticky navy header (`position: sticky`) with the logo on the left,
  primary nav links, and a "Merch" CTA button.
- Below 720px, the nav collapses into a hamburger toggle. `script.js`
  handles opening/closing (`.is-open` class), updates `aria-expanded`, and
  closes on <kbd>Esc</kbd>. The corresponding CSS lives in the `@media
  (max-width: 720px)` block right after `.site-header__toggle`.
- The header intentionally keeps `position: sticky` even inside that same
  mobile media query — don't reintroduce a `position: relative` override
  on `.site-header` there, it previously broke the sticky behavior on
  mobile production builds.

## Hero animation

The hero includes a single-shot SVG stroke animation under the headline
(`.hero__stroke`), drawn once on page load via `stroke-dasharray` /
`stroke-dashoffset` with `pathLength="1"` on the `<path>` — this keeps the
dash math independent of the path's actual on-screen length, avoiding a
flash/jump on first render. It respects `prefers-reduced-motion`.

## Adding a new page

1. Duplicate `pages/programma.html` (or any existing inner page) as a
   starting template — it already has the correct header/footer markup
   and script include.
2. Update `<title>`, the meta description, and the Open Graph tags.
3. Set `aria-current="page"` on the matching nav link, and remove it from
   whichever link had it before.
4. Write the page content using the existing utility classes above rather
   than new one-off styles.

## Assets still pending

- **Logo**: header currently expects `assets/logo/icon.svg`; the homepage
  hero expects an extended/full version at `assets/logo/full.svg`.
- **Favicon**: referenced as `/assets/logo/favicon.svg` in the `<head>`.
- **Social preview image**: `assets/img/og-cover.jpg`, referenced by the
  Open Graph tags for link previews (WhatsApp, Instagram, etc.).

None of these block the site from working — until they're added, the
header shows a broken image reference and shared links won't have a
preview thumbnail, but every other part of the site functions normally.

## Hosting

Deployed on Vercel's free Hobby plan (static site, no server-side code).
Relevant limits for context: 100 GB/month bandwidth, no commercial-use
restriction issue here since this site itself doesn't process payments —
the merch store is a separate external e-commerce link.
