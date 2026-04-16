# Original source assets

These are the raw, unprocessed assets supplied by the client. They are **not** used directly by the site. The build pipeline in `scripts/prepare-assets.mjs` reads these and produces optimized variants in `/public/images/` and `/public/`.

If you need to re-run the pipeline (for instance after replacing a render):

```bash
node scripts/prepare-assets.mjs
```

## Files

| File | Notes |
|---|---|
| `Hero_Still.png` | 1280×1064, used as static hero background (and eventual video poster) |
| `Logo_Dark.png`  | Has solid navy (`#0A1628`) background — script removes it |
| `Logo_Light.png` | Has solid white background — script removes it |
| `Render_01.png` – `Render_04.jpg` | Primerose renders |

## Swapping to the hero video later

1. Drop `Hero_Video.mp4` into `public/videos/hero-video.mp4` (keep under ~8 MB, H.264).
2. In `components/sections/HeroSection.tsx`, the `useVideo` flag is set to `false`. Flip it to `true` (or set `NEXT_PUBLIC_USE_HERO_VIDEO=true`).
3. The still image remains as the mobile fallback and the video poster, so nothing else needs to change.
