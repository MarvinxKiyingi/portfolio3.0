# Sanity Presentation Tool: Fixing Reloads on Every Change

A guide to diagnosing and fixing the issue where the Sanity Presentation tool causes the preview iframe to reload (or the whole page to refresh) on every content change, instead of updating in place.

---

## The Problem

- **Symptom:** When editing content in Sanity Studio's Presentation tool, the preview iframe (or the whole page) reloads on every change.
- **Expected:** Only the changed content updates in place via live preview; no full reloads.

---

## Smoking Gun Causes (Root Causes)

There are **three main causes**. Any one can trigger the bad behavior; often multiple are present.

### 1. SanityLive / VisualEditing Wrapping the Embedded Studio

**Cause:** `SanityLive` and/or `VisualEditing` are rendered in a **root layout** that also wraps the embedded Sanity Studio route (e.g. `/studio`).

**Why it breaks:**
Sanity's docs explicitly warn: *"Including SanityLive in your studio route can cause unexpected reloads."* When these components run inside the studio route, they react to Studio events and trigger refreshes/revalidations that cause full reloads.

**How to check:**
Is your Studio mounted under a path like `/studio` or `/admin`, and does your **root** `app/layout.tsx` (or equivalent) render `<SanityLive />` or `<VisualEditing />`? If yes, the studio is wrapped by them.

---

### 2. Outdated Sanity / next-sanity Packages

**Cause:** Older versions of `sanity`, `next-sanity`, and related packages that had:

- Bugs in the Presentation tool (e.g. full iframe refresh on data changes).
- Overly aggressive or incorrect revalidation behavior.

**Why it breaks:**
Core fixes live in `sanity` (e.g. Studio v3.64.1+ for iframe refresh) and in `next-sanity` (e.g. v11+ for better refresh strategy when live preview is enabled). Old versions don't get these fixes.

**How to check:**
Compare your versions to the minimum recommended set below (see [Package versions](#fix-2-upgrade-sanity-packages)).

---

### 3. Aggressive Default Revalidation (VisualEditing)

**Cause:** `VisualEditing` is used **without** a custom refresh strategy, and your app is **not** using the Live Content API in a way that next-sanity can detect (e.g. no `SanityLive` + `sanityFetch`).

**Why it breaks:**
When next-sanity doesn't detect "live preview" (e.g. loaders / `SanityLive`), `VisualEditing`'s default refresh calls `revalidatePath("/", "layout")`, which revalidates the **entire root layout** and purges the data cache on every mutation — effectively a full reload.

**How to check:**
You use `<VisualEditing />` with no `refresh` prop, and you either don't use `SanityLive` + `sanityFetch`, or they're not set up so that next-sanity can detect live preview (e.g. wrong layout placement).

---

## Solutions (In Order of Impact)

### Fix 1: Isolate Studio from SanityLive / VisualEditing (Critical)

**Do not** render `SanityLive` or `VisualEditing` in a layout that wraps the Studio. Render them only in layouts that wrap your **content/preview** routes.

**Recommended approach: route groups**

1. **Create a route group** for all non-studio content, e.g. `(site)` or `(content)`.
2. **Move** your content routes (home, pages, projects, etc.) **into** that group.
3. **Add a layout** inside the route group that renders:
   - `SanityLive`
   - `VisualEditing` (when draft mode is enabled)
   - Any "disable draft mode" UI.
4. **Keep the root layout** minimal: HTML, fonts, theme, analytics — **no** Sanity preview components.

**Example structure (Next.js App Router):**

```
app/
├── layout.tsx                  # Root: only HTML, fonts, theme. NO SanityLive / VisualEditing.
├── (site)/                     # Route group (URLs unchanged)
│   ├── layout.tsx              # Here: SanityLive, VisualEditing, DisableDraftMode
│   ├── (home)/
│   │   ├── layout.tsx
│   │   └── page.tsx            # e.g. /
│   ├── [slug]/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── projects/
│       ├── layout.tsx
│       ├── page.tsx            # /projects
│       └── [slug]/
│           └── page.tsx        # /projects/:slug
├── studio/
│   └── [[...tool]]/
│       └── page.tsx            # Studio is NOT under (site) → no SanityLive/VisualEditing
├── api/
│   └── draft-mode/             # enable | disable
└── components/                 # Shared UI (e.g. DisableDraftMode)
```

**Example `app/(site)/layout.tsx`:**

```tsx
import { SanityLive } from '@/sanity/lib/live';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity/visual-editing';
import { DisableDraftMode } from '../components/DisableDraftMode';

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isEnabled: isDraftMode } = await draftMode();
  return (
    <>
      {isDraftMode && (
        <>
          <VisualEditing />
          <DisableDraftMode />
        </>
      )}
      <SanityLive />
      {children}
    </>
  );
}
```

**Takeaway:** Studio route must **not** be a child of any layout that renders `SanityLive` or `VisualEditing`.

---

### Fix 2: Upgrade Sanity Packages

Use versions that include the Presentation and revalidation fixes.

**Minimum recommended (Next.js 15, React 19):**

| Package                  | Minimum version | Notes                          |
|--------------------------|-----------------|--------------------------------|
| `sanity`                 | `^4.22.0`       | Includes presentation fixes    |
| `next-sanity`            | `^11.6.12`      | v11+ has correct import paths  |
| `@sanity/client`         | `^7.13.2`       | Matches next-sanity v11        |
| `@sanity/visual-editing` | `^5.2.1`        | Or let next-sanity bring it in |
| `@sanity/vision`        | `^4.22.0`       | Align with sanity major        |
| `@sanity/types`         | `^4.22.0`       | Align with sanity major        |

**Upgrade command (yarn):**

```bash
yarn add "sanity@^4.22.0" "next-sanity@^11.6.12" "@sanity/client@^7.13.2" "@sanity/visual-editing@latest" "@sanity/vision@^4.22.0" "@sanity/types@^4.22.0"
```

**next-sanity v11 breaking changes (required):**

- `VisualEditing`: import from `'next-sanity/visual-editing'` (not `'next-sanity'`).
- `defineLive`: import from `'next-sanity/live'` (not `'next-sanity'`).
- `isCorsOriginError`: import from `'next-sanity/live'`.

Other imports (`createClient`, `defineQuery`, `createDataAttribute`, etc.) can stay as `'next-sanity'`.

---

### Fix 3: Use Live Content API So VisualEditing Doesn't Fall Back to Full Revalidation

When next-sanity detects that live preview is in use (e.g. `SanityLive` + `sanityFetch` from `defineLive`), `VisualEditing` uses a lighter refresh strategy and does **not** call `revalidatePath("/", "layout")` on every mutation.

**Do this:**

1. **Use `defineLive`** from `next-sanity/live` and export `sanityFetch` and `SanityLive`.
2. **Render `<SanityLive />`** in the **content** layout (the same one that has `VisualEditing`, e.g. `(site)/layout.tsx`), **not** in the root layout and **not** in the studio route.
3. **Use `sanityFetch`** (from `defineLive`) for all Sanity queries that should update in preview, instead of raw `client.fetch`.

**Example `sanity/lib/live.ts`:**

```ts
import { defineLive } from 'next-sanity/live';
import { client } from './client';

const token = process.env.SANITY_API_READ_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});
```

**Optional: custom refresh (if you still see full reloads)**
If you are **not** using `SanityLive`/`sanityFetch`, or still see full reloads, you can override `VisualEditing`'s refresh to avoid revalidating the whole layout (e.g. use a tag or path):

```tsx
<VisualEditing
  refresh={async () => {
    'use server';
    await revalidateTag('preview'); // and tag your fetches with 'preview' when in draft mode
  }}
/>
```

---

## DisableDraftMode: React Version Matters

The `DisableDraftMode` component needs to detect whether it is being rendered inside the Presentation tool's iframe (to hide itself) or in the user's browser directly (to show the disable button). The correct implementation depends on which React version the project uses.

### Why the React version matters

The `useIsPresentationTool()` hook from `next-sanity/hooks` relies on `useSyncExternalStore` to share an `environment` variable between the `SanityLive` client component and `DisableDraftMode`. `SanityLive` sets the environment (e.g. `"live"`, `"presentation-iframe"`), and `useIsPresentationTool` reads it.

In **React 18**, the cross-component store update from `SanityLive` can fail to propagate to `DisableDraftMode` under Next.js App Router's Suspense boundaries. The `environment` stays stuck at its initial value (`"checking"`), `useIsPresentationTool()` returns `null` forever, and the button never appears.

**React 19** fixes this — `useSyncExternalStore` reliably propagates updates across components regardless of Suspense boundaries.

### React 19 (recommended)

Use the `useIsPresentationTool()` hook. It handles all edge cases cleanly:

```tsx
'use client';

import { useTransition } from 'react';
import { useIsPresentationTool } from 'next-sanity/hooks';
import { disableDraftMode } from '@/app/actions';

export function DisableDraftMode() {
  const [pending, startTransition] = useTransition();
  const isPresentationTool = useIsPresentationTool();

  // null = still checking, true = inside Presentation tool
  if (isPresentationTool || isPresentationTool === null) {
    return null;
  }

  const disable = () =>
    startTransition(() => disableDraftMode());

  return (
    <div className="fixed bottom-6 right-6 z-[9999] ...">
      {pending ? 'Disabling draft mode...' : 'Sanity draft mode is enabled'}
      <button type="button" onClick={disable}>Disable</button>
    </div>
  );
}
```

### React 18 (fallback)

Do **not** use `useIsPresentationTool()`. Instead, check `window.self === window.top` directly — the Presentation tool loads the site in an iframe, so this reliably detects it:

```tsx
'use client';

import { useTransition, useState, useEffect } from 'react';
import { disableDraftMode } from '@/app/actions';

export function DisableDraftMode() {
  const [pending, startTransition] = useTransition();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // true when NOT inside an iframe (i.e. not in the Presentation tool)
    setShow(window.self === window.top);
  }, []);

  if (!show) return null;

  const disable = () =>
    startTransition(() => disableDraftMode());

  return (
    <div className="fixed bottom-6 right-6 z-[9999] ...">
      {pending ? 'Disabling draft mode...' : 'Sanity draft mode is enabled'}
      <button type="button" onClick={disable}>Disable</button>
    </div>
  );
}
```

**Key differences:**

| | React 19 | React 18 |
|---|---|---|
| **Detection method** | `useIsPresentationTool()` from `next-sanity/hooks` | `window.self === window.top` (DOM check) |
| **Why** | Hook works reliably with React 19's `useSyncExternalStore` | Hook stays stuck at `null` due to React 18 Suspense limitations |
| **Starts hidden** | Yes (`null` while checking) | Yes (`useState(false)`) |
| **Resize-safe** | Yes | Yes (runs once on mount, no resize listener) |

---

## Configuration Checklist

Use this to verify setup in a new project or after applying the fixes.

- [ ] **Studio isolation**
  - [ ] Studio route (e.g. `/studio`) is **not** under a layout that renders `SanityLive` or `VisualEditing`.
  - [ ] `SanityLive` and `VisualEditing` live in a layout that only wraps content/preview routes (e.g. via a route group).

- [ ] **Packages**
  - [ ] `sanity` >= 4.22.0 (or latest v4).
  - [ ] `next-sanity` >= 11.6.12 and imports use v11 paths (`next-sanity/visual-editing`, `next-sanity/live`).
  - [ ] `@sanity/client` and other `@sanity/*` packages aligned with the versions above.

- [ ] **Live preview**
  - [ ] `defineLive` is used and `sanityFetch` + `SanityLive` are exported.
  - [ ] `<SanityLive />` is rendered in the **content** layout only.
  - [ ] Content pages use `sanityFetch` for queries that should update in the Presentation tool.

- [ ] **Draft mode**
  - [ ] Draft mode enable route (e.g. `/api/draft-mode/enable`) uses `defineEnableDraftMode` from `next-sanity/draft-mode`.
  - [ ] Presentation tool `previewUrl.previewMode.enable` points at that route (e.g. `'/api/draft-mode/enable'`).

- [ ] **VisualEditing**
  - [ ] Import: `import { VisualEditing } from 'next-sanity/visual-editing'`.
  - [ ] Rendered only when draft mode is enabled and only in the content layout.
  - [ ] Optional: custom `refresh` with `revalidateTag` if you are not using `SanityLive`/`sanityFetch` or still see full reloads.

- [ ] **Disable draft mode UI**
  - [ ] React 19: uses `useIsPresentationTool()` from `next-sanity/hooks`.
  - [ ] React 18: uses `window.self === window.top` in a `useEffect`.
  - [ ] Button is hidden inside the Presentation tool iframe.

---

## Quick Reference: What Causes Reloads

| Cause | Fix |
|-------|-----|
| SanityLive/VisualEditing in root layout wrapping `/studio` | Move them into a content-only layout (e.g. route group `(site)`). |
| Old sanity / next-sanity | Upgrade to sanity >=4.22, next-sanity >=11.6, correct v11 imports. |
| VisualEditing default refresh | Use SanityLive + sanityFetch so next-sanity uses the non-aggressive path; or set a custom `refresh` (e.g. `revalidateTag('preview')`). |

---

## References

- [Visual Editing with Next.js App Router](https://www.sanity.io/docs/visual-editing/visual-editing-with-next-js-app-router) — official setup.
- [Configuring the Presentation tool](https://www.sanity.io/docs/visual-editing/configuring-the-presentation-tool) — `previewUrl`, draft mode, etc.
- [next-sanity Live Content API](https://github.com/sanity-io/next-sanity#live-content-api) — `defineLive`, `sanityFetch`, `SanityLive`.
- [GitHub: VisualEditing revalidation too aggressive (issue #1649)](https://github.com/sanity-io/next-sanity/issues/1649) — workaround with custom `refresh` and tags.
