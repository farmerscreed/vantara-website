# Vantara International — vantarainternational.com

Single-page corporate site for **Vantara International Limited**, built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion. Deployed on Vercel.

## Stack

- **Next.js 14** (App Router, SSR/SSG)
- **TypeScript** + **Tailwind CSS**
- **Framer Motion** for scroll/entrance animations
- **React Hook Form** + **Zod** for the partnership form
- **Formspree** for form delivery (no backend)
- **Embla Carousel** for the render gallery
- **Lucide** for icons
- **Sharp** for asset processing

## Getting started

```bash
pnpm install
cp .env.example .env.local   # fill in NEXT_PUBLIC_FORMSPREE_ID
pnpm dev                     # http://localhost:3000
```

## Scripts

| Script | Purpose |
|---|---|
| `pnpm dev` | Local dev server |
| `pnpm build` | Production build |
| `pnpm start` | Run production build |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript check, no emit |
| `pnpm prepare-assets` | Re-run asset pipeline (sharp) — see below |

## Environment variables

Set these on Vercel (Settings → Environment Variables) and in `.env.local` for dev:

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_FORMSPREE_ID` | Yes, for the form to work in production | Formspree form ID (after `/f/`) |
| `NEXT_PUBLIC_USE_HERO_VIDEO` | No | Set to `"true"` once the hero video is uploaded |

### Creating the Formspree form

1. Sign up at [formspree.io](https://formspree.io/).
2. Create a new form pointing at `info@vantarainternational.com`.
3. Copy the form ID (the part after `/f/` in the endpoint URL).
4. Add it as `NEXT_PUBLIC_FORMSPREE_ID` in Vercel and in `.env.local`.

## Asset pipeline

Raw source assets live in `/assets/originals/`. The `scripts/prepare-assets.mjs` script (powered by sharp) produces:

- Transparent logos (`public/images/logo-light.png`, `public/images/logo-dark.png`) — background removal
- Optimized WebP + JPG fallbacks for the hero still and all four renders
- Favicon + Apple touch icon + OG image

Re-run after replacing any source asset:

```bash
pnpm prepare-assets
```

## Swapping to the hero video

The hero uses a still image by default (`/images/hero-still.webp`). To switch to the video:

1. Drop the MP4 at `public/videos/hero-video.mp4` (H.264, ≤ 8 MB recommended).
2. Set `NEXT_PUBLIC_USE_HERO_VIDEO=true` in Vercel.
3. Redeploy. The still image remains as the video `poster` and mobile fallback.

## Project structure

```
app/                    Next.js App Router
├── layout.tsx          Fonts, metadata, JSON-LD
├── page.tsx            Single-page composition
├── globals.css         Tailwind + globals
├── robots.ts
├── sitemap.ts
components/
├── layout/             Navbar, Footer
├── sections/           One component per page section
├── features/           StatsBar, RenderGallery, PartnershipForm, ...
├── ui/                 Button, Input, Select, Textarea
└── animations/         FadeIn, CountUp
hooks/                  useScrollSpy
lib/                    constants (all copy), utils
types/
scripts/
└── prepare-assets.mjs  Asset pipeline
```

## Brand tokens

Defined in `tailwind.config.ts`:

- `bg-navy` `#0A1628`  — primary background
- `bg-slate` `#1E2D3D` — secondary / cards
- `text-gold` `#C8963E` — accent, CTAs
- `text-teal` `#2A9D8F` — Smart Living section only
- Fonts: Cormorant Garamond (display), DM Sans (body), Bebas Neue (stats)

## Deploy

The repo is connected to Vercel. Merging to `main` deploys to production. Ensure DNS and environment variables are configured in the Vercel project settings.
