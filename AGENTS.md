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
- **State**: Zustand is the sole owner of mutable cross-route client application state; TanStack Query owns server/mock API state
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
2. **Never downgrade dependencies** — `package.json` and `pnpm-lock.yaml` are the source of truth.
3. **Use pnpm only** — No `npm` or `yarn`.
4. **MUI only** — No shadcn, Radix, Tailwind UI, or competing component libraries in new code.
5. **MUI Community only** — No Pro/Premium APIs without explicit license confirmation.
6. **Zustand owns global client state** — Every mutable value shared across routes, layouts, providers, or distant components must live in a focused Zustand store or slice.
7. **No custom application-state Context** — Do not create or retain `DirectionContext`, `DirectionProvider`, `ColorModeContext`, `ThemeModeContext`, `SettingsContext`, `SidebarContext`, `AuthContext`, `AppContext`, or equivalent providers that own, mirror, synchronize, or proxy application state.
8. **Library providers are infrastructure only** — MUI `ThemeProvider`, Emotion `CacheProvider`, TanStack `QueryClientProvider`, React Router, and i18next integration may exist, but they must consume Zustand or their own library state and must not become competing application-state stores.
9. **One source of truth** — Never mirror the same value in Zustand, React Context, and component state. Derive values where possible.
10. **Use narrow Zustand selectors** — Components must subscribe only to the fields/actions they need. Do not subscribe to the entire store.
11. **No god store** — Use coherent slices or focused stores with typed state, named actions, defaults, persistence, and migrations.
12. **Original composition** — Do not copy Minimal source code, assets, or pixel layouts. Match quality principles only.
13. **Logical direction-aware styling** — Use logical CSS properties (`margin-inline-start`, `padding-inline-end`, `inset-inline-start`, etc.) in custom CSS.
14. **No automated tests in the current visual roadmap** — Typecheck, lint, build, and manual route checks only until the stabilization phase.
15. **No phase expansion** — Complete only the current phase scope.
16. **Prefer editing over creating** — Reuse existing architecture and components; avoid parallel implementations.

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
| `app/lib/utils.ts` | Shared utilities |
| `app/stores/` | Zustand stores and slices; sole location for mutable cross-route client state |
| `app/stores/settings.ts` | Appearance, direction override, and related persisted UI preferences |
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

```text
mode: 'light' | 'dark' | 'system'
contrast: 'standard' | 'high'
direction: 'auto' | 'ltr' | 'rtl'
compact: boolean
navLayout: 'vertical' | 'horizontal' | 'mini'
navColor: 'integrated' | 'apparent'
primaryPreset: 'emerald' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
radius: 'compact' | 'balanced' | 'soft' | 'rounded'
fontFamily: 'public-sans' | 'inter' | 'dm-sans' | 'nunito-sans'
fontSize: 14..18
```
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

- ❌ Downgrade any dependency version
- ❌ Use `npm` or `yarn`
- ❌ Add shadcn, Radix, Tailwind UI, or another competing UI system
- ❌ Use MUI X Pro/Premium APIs without a confirmed license
- ❌ Copy Minimal source code, assets, or layouts
- ❌ Create or retain custom application-state Context providers
- ❌ Create `DirectionContext`, `DirectionProvider`, `ColorModeContext`, `ThemeModeContext`, `SettingsContext`, `SidebarContext`, `AuthContext`, or `AppContext`
- ❌ Mirror the same value across Zustand, Context, and local state
- ❌ Put cross-route state in component-level `useState`
- ❌ Use a single unstructured Zustand god store
- ❌ Subscribe components to the entire Zustand store without justification
- ❌ Let MUI theme/color-scheme APIs become a competing preference store
- ❌ Use physical CSS properties in direction-sensitive contexts
- ❌ Put translation strings in `i18n.ts` or component files
- ❌ Use a generic `translation.json` namespace
- ❌ Expand scope beyond the current phase
- ❌ Create a second customizer, navigation system, or theme implementation beside the existing one

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
**No existing dependencies downgraded.** ✅