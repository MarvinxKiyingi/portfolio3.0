![initials logo](/app/apple-icon.png 'initials logo')

# Portfolio 3.5

Next.js 15 (App Router) + Sanity CMS. Embedded Studio, Presentation tool, draft mode, and live content via `next-sanity` v11.

---

## Features

- ⚡ **Next.js 15** App Router with React 19
- 📝 **Sanity CMS** with embedded Studio and Presentation tool
- 🔄 **Live content** via `sanityFetch` + `SanityLive` (no full-page reloads in preview)
- 🎨 **Tailwind CSS 4** for styling
- 📦 **TypeScript** with Sanity schema typegen

---

## Quick Start

> ⚠️ **Prerequisites:** Node.js **22.x** (see [.nvmrc](.nvmrc); [nvm](https://github.com/nvm-sh/nvm) recommended).

### 1. Clone & Install

```bash
git clone <repo-url>
cd portfolio3.0
yarn install
```

### 2. Set Up Environment Variables

Copy the example file and fill in your Sanity credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-08-19
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3000
SANITY_API_READ_TOKEN=your_viewer_token
```

### 3. Start Development Server

```bash
yarn dev
```

- **Site:** [http://localhost:3000](http://localhost:3000)
- **Studio:** [http://localhost:3000/studio](http://localhost:3000/studio)

---

## Available Scripts

| Command       | Description                     |
| ------------- | ------------------------------- |
| `yarn dev`    | Start development server        |
| `yarn build`  | Build for production            |
| `yarn start`  | Start production server         |
| `yarn lint`   | Run ESLint                      |
| `yarn typegen`| Sanity schema → TypeScript types|

---

## Project Structure

```
app/
├── layout.tsx                  # Root layout (fonts, theme; no Sanity)
├── (site)/                     # Route group: all content routes
│   ├── layout.tsx              # SanityLive, VisualEditing, draft-mode UI
│   ├── (home)/
│   │   ├── layout.tsx
│   │   └── page.tsx            # Homepage /
│   ├── [slug]/                 # Dynamic pages
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── projects/
│       ├── layout.tsx
│       ├── page.tsx            # /projects
│       └── [slug]/
│           └── page.tsx       # /projects/:slug
├── studio/
│   └── [[...tool]]/
│       └── page.tsx            # Embedded Sanity Studio at /studio
├── api/
│   └── draft-mode/             # enable | disable
└── components/                 # PageBuilder, NavBar, Footer, etc.

sanity.config.ts                # Studio config (presentation, vision, plugins)

sanity/
├── lib/                        # client, live (defineLive/sanityFetch), queries
├── presentation/
│   └── resolve.ts              # Presentation locations (e.g. caseStudy → /projects/:slug)
└── schemaTypes/                # Document & block schemas

utils/                          # Helpers (e.g. generateMetadata)
docs/                           # Guides
```

**Sanity & routes:** `SanityLive` and `VisualEditing` live only in `(site)/layout.tsx` so the studio at `/studio` is not wrapped—this avoids preview reloads. See [SANITY-PRESENTATION-RELOAD-FIX.md](docs/SANITY-PRESENTATION-RELOAD-FIX.md) for details.

---

## Sanity Setup (Summary)

- **Studio:** Embedded at `/studio`; config in `sanity.config.ts` (structure, Presentation, Vision, media, Mux, color).
- **Presentation:** Preview URL uses draft-mode enable route; `resolve` maps doc types (e.g. `caseStudy`) to site routes.
- **Draft mode:** Enabled via `/api/draft-mode/enable`; disabled via API or “Disable” button (hidden in Presentation iframe via `useIsPresentationTool`).
- **Live content:** `defineLive` in `sanity/lib/live.ts` → `sanityFetch` + `SanityLive`. Content routes use `sanityFetch`.

---

## Documentation

| Document | Description |
| -------- | ----------- |
| [SANITY-PRESENTATION-RELOAD-FIX.md](docs/SANITY-PRESENTATION-RELOAD-FIX.md) | Fixing Presentation tool reloads on every change |

---

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/)
- **CMS:** [Sanity](https://www.sanity.io/) with [next-sanity](https://github.com/sanity-io/next-sanity) v11
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Language:** TypeScript
