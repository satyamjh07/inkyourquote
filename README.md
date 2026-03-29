# InkyourQuote (PWA)

A production-ready quote generator built with React + Vite and Tailwind CSS.

## Features

- Random quote engine with local JSON dataset and API fallback.
- Category filtering.
- Quote card customization:
  - Google Font picker
  - Gradient presets + image upload backgrounds
  - Vertical text alignment (top/center/bottom)
  - Custom watermark
- Export quote card to PNG using canvas.
- Favorites and settings persistence via `localStorage`.
- Progressive Web App support:
  - `manifest.json`
  - Cache-first Service Worker
  - Offline fallback page

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Project Structure

- `src/components`: UI components.
- `src/hooks`: stateful logic and orchestration.
- `src/services`: API, storage, export, and PWA utilities.
- `src/data`: local quote dataset.
- `public`: manifest, service worker, offline assets, and icons.
