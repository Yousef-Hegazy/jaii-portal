# Jaii Portal — Dependency Baseline

**Generated**: Phase 0 (Repository Audit)  
**Date**: 2026-07-10  
**Package Manager**: pnpm 11.11.0+  
**Lockfile**: `pnpm-lock.yaml` (source of truth)

> **Rule**: This document captures the **exact installed direct dependencies** from `pnpm-lock.yaml` at Phase 0 baseline. No package may be downgraded below these versions. New packages may be added only when their feature phase requires them.

---

## Direct Dependencies (Production) — Actually Installed

| Package | Version (Resolved) | Specifier in package.json | Purpose |
|---------|-------------------|---------------------------|---------|
| `@emotion/react` | 11.14.0 | `^11.14.0` | Emotion CSS-in-JS runtime for MUI |
| `@emotion/styled` | 11.14.1 | `^11.14.1` | Emotion styled-component API for MUI |
| `@mui/material` | 9.2.0 | `^9.2.0` | MUI Core components (Community) |
| `@mui/stylis-plugin-rtl` | 9.1.1 | `^9.1.1` | Stylis plugin for RTL CSS transformation |
| `@react-router/node` | 8.0.0 | `8.0.0` | React Router server runtime (Framework Mode) |
| `@react-router/serve` | 8.0.0 | `8.0.0` | React Router production server |
| `isbot` | 5.2.0 | `^5.1.36` | Bot detection for SSR optimization |
| `react` | 19.2.7 | `^19.2.7` | React 19 runtime |
| `react-dom` | 19.2.7 | `^19.2.7` | React DOM renderer |
| `react-router` | 8.0.0 | `8.0.0` | React Router core |
| `stylis` | 4.4.0 | `^4.4.0` | CSS preprocessor (used by Emotion RTL plugin) |

**Count**: 11 production dependencies

---

## Dev Dependencies — Actually Installed

| Package | Version (Resolved) | Specifier in package.json | Purpose |
|---------|-------------------|---------------------------|---------|
| `@react-router/dev` | 8.0.0 | `8.0.0` | React Router Vite plugin, type generation |
| `@tailwindcss/vite` | 4.3.2 | `^4.2.2` | Tailwind CSS v4 Vite plugin (legacy from template) |
| `@types/node` | 22.20.1 | `^22` | Node.js type definitions |
| `@types/react` | 19.2.17 | `^19.2.14` | React type definitions |
| `@types/react-dom` | 19.2.3 | `^19.2.3` | React DOM type definitions |
| `tailwindcss` | 4.3.2 | `^4.2.2` | Tailwind CSS v4 (legacy from template) |
| `typescript` | 5.9.3 | `^5.9.3` | TypeScript compiler |
| `vite` | 8.1.4 | `^8.0.3` | Build tool / dev server |

**Count**: 8 dev dependencies

---

## ⚠️ Discrepancy: Code Imports vs. Installed Packages

The following packages are **imported in source code** but **NOT installed** (missing from `package.json` and `pnpm-lock.yaml`):

| Package | Imported In | Required By Phase |
|---------|-------------|-------------------|
| `i18next` | `app/lib/i18n.ts` | Phase 2 (already needed) |
| `react-i18next` | `app/lib/i18n.ts` | Phase 2 (already needed) |
| `i18next-http-backend` | `app/lib/i18n.ts` | Phase 2 (already needed) |
| `@tanstack/react-query` | `app/lib/queryClient.ts` | Phase 29 (but file exists now) |
| `clsx` | `app/lib/utils.ts` | Legacy (template) — to remove |
| `tailwind-merge` | `app/lib/utils.ts` | Legacy (template) — to remove |

**Action Required**: These must be added in Phase 1-2 (i18n packages) or removed (clsx/tailwind-merge). The `app/lib/queryClient.ts` file appears to be a premature addition from the template or earlier work — it imports TanStack Query which isn't installed until Phase 29.

---

## Packages NOT Yet Installed (Planned for Future Phases)

| Package | Phase | Purpose |
|---------|-------|---------|
| `@emotion/cache` | 3 | Emotion cache separation for RTL/LTR |
| `@iconify/react` | 4 | Single icon layer |
| `@fontsource/public-sans` | 4 | Latin font (self-hosted) |
| `@fontsource/tajawal` | 4 | Arabic font (self-hosted) |
| `zustand` | 9 | UI preference store |
| `@tanstack/react-query` | 29 | Server state management |
| `@tanstack/react-query-devtools` | 29 | Devtools for React Query |
| `msw` | 30 | Mock Service Worker |
| `apexcharts` | 24 | Charting library |
| `react-apexcharts` | 24 | React wrapper for ApexCharts |
| `maplibre-gl` | 40 | Map rendering |
| `react-map-gl` | 40 | React wrapper (MapLibre entry point) |
| `react-hook-form` | 27 | Form handling |
| `zod` | 27 | Schema validation |
| `@hookform/resolvers` | 27 | Zod resolver for RHF |
| `@mui/x-data-grid` | 28 | Data Grid Community |
| `notistack` | 22 | Snackbar notifications |
| `terra-draw` | 41 | Polygon editing |
| `terra-draw-maplibre-gl-adapter` | 41 | MapLibre adapter for Terra Draw |

---

## Version Matrix Summary

| Category | Package | Baseline Version | Upgrade Policy |
|----------|---------|------------------|----------------|
| React | `react` | 19.2.7 | Minor/patch only; major requires full audit |
| React | `react-dom` | 19.2.7 | Same as React |
| Router | `react-router` | 8.0.0 | Minor/patch only |
| Router | `@react-router/dev` | 8.0.0 | Same as Router |
| Router | `@react-router/node` | 8.0.0 | Same as Router |
| Router | `@react-router/serve` | 8.0.0 | Same as Router |
| UI Core | `@mui/material` | 9.2.0 | Minor/patch only; major requires migration |
| UI RTL | `@mui/stylis-plugin-rtl` | 9.1.1 | Must match MUI major |
| Styling | `@emotion/react` | 11.14.0 | Minor/patch only |
| Styling | `@emotion/styled` | 11.14.1 | Minor/patch only |
| Styling | `stylis` | 4.4.0 | Minor/patch only |
| Build | `vite` | 8.1.4 | Minor/patch only |
| Build | `typescript` | 5.9.3 | Minor/patch only |
| CSS | `tailwindcss` | 4.3.2 | **Remove** (legacy template) |
| CSS | `@tailwindcss/vite` | 4.3.2 | **Remove** (legacy template) |

---

## Integrity Check

Run to verify lockfile matches package.json:

```bash
pnpm install --frozen-lockfile
```

Expected: Success (lockfile is consistent)

---

## Next Phase Actions

**Phase 1** will:
1. Add missing i18n packages: `pnpm add i18next react-i18next i18next-http-backend`
2. Add `@emotion/cache` for RTL support (Phase 3 prep)
3. Remove `clsx` and `tailwind-merge` (and `app/lib/utils.ts` or rewrite without them)
4. Remove Tailwind CSS packages from devDependencies
5. Configure MUI ThemeProvider, CssBaseline, Emotion CacheProvider at root

**Phase 2** will complete i18n namespace configuration.

---

**No existing dependencies downgraded.** ✅