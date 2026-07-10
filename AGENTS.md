# Jaii Portal — AGENTS.md

Repository rules, commands, and agent reference for the Jaii Portal project.

---

## 1. Project Identity

- **Name**: Jaii Portal
- **Description**: Saudi laundry-service platform — bilingual (Arabic/English) landing page + admin dashboard
- **Framework**: React Router v8 Framework Mode with Vite
- **Package Manager**: pnpm 11.11.0+
- **UI Foundation**: MUI Community (free) only
- **Styling**: Emotion (`@emotion/react`, `@emotion/styled`) + `@mui/stylis-plugin-rtl`
- **Localization**: i18next + react-i18next + i18next-http-backend (namespaced JSON in `public/locales/{ar,en}/`)
- **State**: TanStack Query (server), Zustand (UI preferences)
- **Charts**: ApexCharts via `apexcharts` + `react-apexcharts`
- **Maps**: MapLibre GL + `react-map-gl` (MapLibre entry point)
- **Forms**: React Hook Form + Zod + @hookform/resolvers
- **Mock API**: MSW (development only)
- **Tests**: Vitest + Testing Library + Playwright (later phases)
- **Storybook**: Component showcase (later phases)
- **RTL/LTR**: Document `dir`, MUI theme `direction`, Emotion RTL cache

---

## 2. Golden Rules (Non-Negotiable)

1. **Preserve completed work** — Never revert or rewrite working phases.
2. **Never downgrade dependencies** — `package.json` and `pnpm-lock.yaml` are source of truth.
3. **Use pnpm only** — No `npm` or `yarn`.
4. **MUI only** — No shadcn, Radix, Tailwind UI, or other component libraries in new code.
5. **MUI Community only** — No Pro/Premium APIs without explicit license confirmation.
6. **Original composition** — Do not copy Minimal source code, assets, or pixel layouts. Match quality principles only.
7. **Logical direction-aware styling** — Use logical CSS properties (`margin-inline-start`, `padding-inline-end`, `inset-inline-start`, etc.) in any custom CSS.
8. **No automated tests in Phase 0** — Typecheck, lint, build, and manual route checks only.
9. **No phase expansion** — Complete only the current phase scope.
10. **Prefer editing over creating** — Avoid new files unless absolutely necessary.

---

## 3. Required Scripts (package.json)

```json
{
  "scripts": {
    "build": "react-router build",
    "dev": "react-router dev",
    "start": "react-router-serve ./build/server/index.js",
    "typecheck": "react-router typegen && tsc",
    "lint": "eslint . --ext .ts,.tsx",
    "test": "vitest run",
    "test:ui": "vitest --ui",
    "test:e2e": "playwright test",
    "storybook": "storybook dev -p 6006",
    "build:storybook": "storybook build"
  }
}
```

> **Note**: `lint`, `test`, `test:e2e`, `storybook` scripts are added in later phases. Phase 0 only verifies `build`, `dev`, `start`, `typecheck` exist.

---

## 4. Key Directories

| Path | Purpose |
|------|---------|
| `app/` | React Router application root |
| `app/routes.ts` | Explicit route configuration (source of truth) |
| `app/routes/` | Route modules |
| `app/lib/i18n.ts` | i18next configuration only (no embedded translations) |
| `app/lib/localization.ts` | SAR currency, Gregorian dates, Saudi phone, Arabic/Latin numerals |
| `app/lib/utils.ts` | Utility functions (legacy `clsx` + `tailwind-merge` — to be removed) |
| `app/welcome/` | Landing page components (Phase 0 placeholder) |
| `public/locales/ar/` | Arabic translation namespaces (17 JSON files) |
| `public/locales/en/` | English translation namespaces (17 JSON files) |
| `docs/references/` | Visual references (Minimal screenshots) |
| `docs/` | Generated documentation (this phase) |

---

## 5. Translation Architecture

**Source of truth**: Namespaced JSON files under `public/locales/{ar,en}/`

Required namespaces (17):
- `common`, `navigation`, `appearance`, `landing`, `auth`, `dashboard`, `orders`, `customers`, `analytics`, `partners`, `settings`, `pricing`, `zones`, `drivers`, `notifications`, `validation`, `errors`

**Rules**:
- `i18n.ts` contains **configuration only** — no embedded translation catalogs.
- No generic `translation.json` files.
- Arabic (`ar`) is default language; English (`en`) is fallback.
- Language codes: `ar` → `ar-SA` (document/Intl), `en` → `en-US`.
- Language switching: no full reload, preserves URL/query/scroll, updates `<html lang>` and `<html dir>`, persists to `localStorage`.

---

## 6. Route Registration

Routes are **explicitly registered** in `app/routes.ts` using `@react/router/dev/routes` config.
- Filenames alone do **not** register routes.
- Path-bearing parent routes **must** render `<Outlet />`.
- Pathless layout routes **must not** be used where a real URL segment is required (e.g., `/dashboard`, `/settings`).

---

## 7. RTL/LTR Architecture

- Document: `<html dir="rtl" lang="ar-SA">` (Arabic) / `<html dir="ltr" lang="en-US">` (English)
- MUI Theme: `direction: 'rtl' | 'ltr'` synced to active language
- Emotion: Separate cache per direction via `@mui/stylis-plugin-rtl`
- Custom CSS: Logical properties only
- Components: Sidebar/drawer on right in RTL, left in LTR; icons, breadcrumbs, pagination, charts, map controls direction-aware

---

## 8. Theme & Appearance Preferences (Persisted via Zustand)

Versioned model:
```
mode: 'light' | 'dark' | 'system'
contrast: 'standard' | 'high'
direction: 'auto' | 'ltr' | 'rtl'
compact: boolean
navLayout: 'vertical' | 'horizontal' | 'mini'
navColor: 'integrated' | 'apparent'
primaryPreset: 'emerald' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
radius: 'compact' | 'balanced' | 'soft' | 'rounded'
fontFamily: 'public-sans' | 'inter' | 'dm-sans' | 'nunito-sans'
fontSize: 14..18 (default 16)
```

Requirements:
- Apply before first paint (no flash)
- Persist non-sensitive settings
- Validate + migrate stored versions
- Safe fallback on corruption
- Update MUI theme, Emotion cache, document attributes, responsive nav without full reload
- Live preview in drawer + dedicated settings route

---

## 9. Quality Gates (Every Phase)

Before marking a phase complete:

1. `pnpm run typecheck` — passes
2. `pnpm run lint` — passes (when script exists)
3. `pnpm run build` — production build succeeds
4. Open every route changed by the phase directly in browser
5. Manually verify exact visible behavior required by the phase
6. Update `docs/IMPLEMENTATION_STATUS.md` with:
   - Changed files
   - Added/updated packages
   - Commands run and results
   - Limitations/known issues
   - Next phase reference
7. **Explicitly state**: "No existing dependencies downgraded."

---

## 10. Prohibited Actions

- ❌ Downgrade any `package.json` dependency version
- ❌ Add shadcn, Radix, or Tailwind UI components
- ❌ Use MUI X Pro/Premium APIs without confirmed license
- ❌ Copy Minimal source code, assets, or layouts
- ❌ Add automated tests in Phase 0
- ❌ Expand scope beyond current phase
- ❌ Use `npm` or `yarn` (pnpm only)
- ❌ Use physical CSS properties (`margin-left`, `padding-right`) in direction-sensitive contexts
- ❌ Put translation strings in `i18n.ts` or component files
- ❌ Use generic `translation.json` namespace

---

## 11. Useful Commands

```bash
# Install dependencies (preserves lockfile)
pnpm install

# Development server with HMR
pnpm run dev

# Type generation + typecheck
pnpm run typecheck

# Production build
pnpm run build

# Preview production build
pnpm run start

# Check outdated packages (do not auto-update)
pnpm outdated

# Add a dependency (example)
pnpm add @mui/x-data-grid

# Add a dev dependency (example)
pnpm add -D vitest @testing-library/react
```

---

## 12. Phase 0 — Audit Summary

### Confirmed
- React Router app directory: `app/`
- Routes file: `app/routes.ts` (single index route → `routes/home.tsx`)
- Scripts: `build`, `dev`, `start`, `typecheck` present; `lint`, `test`, `storybook` missing
- MUI packages: `@mui/material@^9.2.0`, `@mui/stylis-plugin-rtl@^9.1.1`
- RTL packages: `@mui/stylis-plugin-rtl@^9.1.1`, `stylis@^4.4.0`
- i18n packages: `i18next`, `react-i18next`, `i18next-http-backend` (versions in baseline)
- i18n config: `app/lib/i18n.ts` (config-only)
- Translation namespaces: 17 each in `public/locales/{ar,en}/`
- Localization utilities: `app/lib/localization.ts` (SAR, Gregorian dates, Saudi phone, numerals)

### Flags
- `lint`, `test`, `test:e2e`, `storybook` scripts missing from `package.json`
- Tailwind CSS v4 + `@tailwindcss/vite` present in devDependencies (legacy from template) — will be removed
- `clsx` + `tailwind-merge` used in `app/lib/utils.ts` — legacy, will be removed
- i18n config uses `load: 'languageOnly'` and `ns: ['common']` — verify namespace loading behavior in Phase 2
- `@emotion/cache` not installed — required for RTL cache separation (Phase 3)
- `@iconify/react` not installed (Phase 4)
- Font packages not installed (Phase 4)
- Zustand not installed (Phase 9)
- TanStack Query not installed (Phase 29)
- MSW not installed (Phase 30)
- ApexCharts not installed (Phase 24)
- MapLibre/react-map-gl not installed (Phase 40)
- React Hook Form/Zod not installed (Phase 27)
- MUI X Data Grid not installed (Phase 28)
- Notistack not installed (Phase 22)
- Terra Draw not installed (Phase 41)

### Next Phase
**Phase 1 — Root Provider Skeleton** (Model: DeepSeek v4 Flash)

---

**No existing dependencies downgraded.** ✅