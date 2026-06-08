# Will It Fit My Kid?

A small, installable web app (PWA) that tells you **when** a given clothing size
will fit your child — not just whether it fits today. It projects each kid's
growth along their percentile curve and maps the result onto kids' clothing
sizes, so you can shop ahead (e.g. second-hand) with confidence.

The interface is in Norwegian (Bokmål).

## What it does

- **"Når passer størrelsen" (calculator)** — pick a clothing size and see, for
  each of your kids, the window of time it is expected to fit (start/end season,
  year, age and projected height). Filter by season and by kid.
- **Size conversions** — translate the selected EU size to US, UK, FR, JP and IT
  equivalents (toggleable).
- **"Mine barn" (manage kids)** — add, edit and remove kids. Each kid has a name,
  sex, birthday and either a current height or a growth percentile; entering one
  derives a sensible suggestion for the other from the growth reference data.
- **Sharing & backup** — export/import your kids as a JSON backup, share it via
  the native share sheet to move data to another device, and generate a clean,
  screenshot-friendly overview of each kid's projected sizes for the next three
  years (handy for grandparents).

## How it works

Projections use a **Norwegian growth reference** (length/height in cm by month
of age, percentiles P1–P97, separate tables for boys and girls). A kid's
percentile is held steady into the future and converted to a projected height
each month, which is then matched against a kids' clothing size chart.

All data lives **only on your device** (browser `localStorage`). Nothing is sent
to a server; backups are explicit, user-initiated files. In development the app
seeds demo kids; production builds start empty.

## Tech stack

- **React 19** + **TypeScript**, built with **Vite 8**
- **temporal-polyfill** for date math, **@use-gesture/react** for swipe gestures
- **PWA**: web manifest + service worker, installable and offline-capable
- ESLint (flat config) with the React Hooks and TypeScript plugins

## Development

```bash
npm install
npm run dev      # start the Vite dev server
npm run build    # type-check (tsc -b) and build for production
npm run preview  # preview the production build locally
npm run lint     # run ESLint
```

## Deployment

The app deploys to **GitHub Pages** via GitHub Actions on every push to the
`githubpages` branch (see `.github/workflows/deploy.yml`). The Vite `base` is set
to `/willitfitmykid/` to match the Pages path.

## Project structure

```
src/
  app/         App shell: tabs, splash, gallery/share pages
  features/    Domain features
    calculator/  size picker, result panel, season/kid filters
    myKids/      kid list, add/edit form, sharing & backup
  data/        Growth reference tables and the clothing size chart
  utils/       Growth, projection, fit and size helpers
  services/    localStorage persistence
  hooks/       Context (kids, kid filter) and shared hooks
  components/  Reusable core UI and layout
```
