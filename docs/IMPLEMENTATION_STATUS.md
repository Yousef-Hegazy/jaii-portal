# Jaii Portal — Implementation Status

**Repository baseline captured:** 2026-07-10
**Phase 0 — Repository Audit** ✅ Complete

---

## Phase Checklist

| Phase | Name | Status | Model | Key Deliverables | Gate |
|-------|------|--------|-------|------------------|------|
| 0 | Repository baseline | ✅ **Done** | Nemotron-3-Ultra (free) | `AGENTS.md`, `docs/IMPLEMENTATION_STATUS.md`, `docs/DEPENDENCY_BASELINE.md`, `docs/ROUTE_INVENTORY.md` | Next agent can identify app root, route config, dependency baseline |
| 1 | Root provider skeleton | ⬜ Pending | DeepSeek v4 Flash | MUI ThemeProvider, CssBaseline, Emotion CacheProvider, minimal app providers, MUI home placeholder | `/` renders MUI styling; production build succeeds |
| 2 | Translation source of truth | ⬜ Pending | DeepSeek v4 Flash | i18next config-only, 8 initial namespaces, language switch proof | Language switch changes visible text; correct namespace files requested; no duplicate catalog |
| 3 | Correct MUI RTL/LTR engine | ⬜ Pending | GLM-5 | Document lang/dir, theme direction, Emotion RTL caches, stylis + MUI RTL plugin, portal components | TextField, Dialog, spacing, document direction mirror correctly without reload |
| 4 | Font and icon foundation | ⬜ Pending | DeepSeek v4 Flash | Public Sans (EN), Tajawal (AR), @iconify/react, typography tokens, language-switched fonts | Arabic uses Tajawal, English uses Public Sans, icons render without extra library |
| 5 | Base MUI theme anatomy | ⬜ Pending | GLM-5 | Semantic palette, neutral scale, typography, spacing, shape, shadows, transitions, z-index, TS augmentation, component overrides structure | Proof components look coherent/premium in default light theme (Cyan primary) |
| 6 | Light/dark/theme generation | ⬜ Pending | DeepSeek v4 Flash | Complete light/dark/system modes, OS preference following, no reload, temp mode selector | All proof components affected in light/dark/system including open Dialog/menu |
| 7 | Six primary-color presets | ⬜ Pending | DeepSeek v4 Flash | Emerald, Cyan, Purple, Blue, Orange, Red with full tonal palettes, temp preset selector | Every preset attractive/readable in light+dark; Cyan default; no hardcoded primary |
| 8 | Shape, density, contrast, typography preferences | ⬜ Pending | DeepSeek v4 Flash | Radius (4), compact (on/off), contrast (2), font family (4 + Arabic), font size (14-18), temp controls | Each setting causes obvious global change on real MUI components |
| 9 | Preference store + first-paint bootstrap | ⬜ Pending | GLM-5 | Zustand store with versioned model, safe parsing/migration/reset, pre-hydration bootstrap, no flash | Refresh preserves controls; no light/direction flash |
| 10 | Floating settings trigger + drawer shell | ⬜ Pending | MiniMax M2.7 | Translated FAB, logical RTL/LTR edge, responsive drawer, title/reset/close, scrollable sections, premium styling | Trigger + drawer look like premium template in AR/EN |
| 11 | Customizer core controls | ⬜ Pending | DeepSeek v4 Flash | Mode, contrast, direction (auto/ltr/rtl), compact connected to polished controls in drawer | All 4 controls work immediately, persist, usable in RTL |
| 12 | Customizer visual controls | ⬜ Pending | MiniMax M2.7 | Nav layout (3), nav color (2), 6 color presets, 4 radii, 4 font families, font size slider, visual thumbnails/swatches | Complete customizer visually impressive; every option changes proof UI |
| 13 | Appearance settings route | ⬜ Pending | DeepSeek v4 Flash | `/dashboard/settings/appearance` reusing drawer controls + larger live preview | Direct URL works; drawer/page synchronized |
| 14 | Route map + placeholder hierarchy | ⬜ Pending | DeepSeek v4 Flash | 17 explicit routes registered with Outlet, minimal MUI placeholders | Every URL opens directly; no route mismatch |
| 15 | Dashboard frame | ⬜ Pending | MiniMax M2.7 | Nav/header/content regions, responsive gutters, surface hierarchy, skip link, route outlet | Placeholder pages feel like commercial dashboard |
| 16 | Expanded vertical navigation | ⬜ Pending | MiniMax M2.7 | Logo placeholder, translated grouped links, icons, active states, nested groups, user/footer, integrated/apparent color modes, RTL/LTR correct side, independent scroll | All links work; Arabic labels fit; both nav color modes premium |
| 17 | Mini navigation mode | ⬜ Pending | MiniMax M2.7 | Stable icon rail, accessible tooltips, active marker, nested flyout, persisted, reduced-motion-safe transition, Ctrl/Cmd+B | Vertical ↔ mini polished, persistent, works RTL/LTR |
| 18 | Horizontal navigation mode | ⬜ Pending | MiniMax M2.7 | Horizontal nav below header, same config/permissions, grouped menus, active state, overflow-safe, integrated/apparent, RTL ordering | All 3 nav options work via customizer without route loss |
| 19 | Mobile dashboard navigation | ⬜ Pending | MiniMax M2.7 | Mobile header + temp Drawer, correct RTL/LTR edge, focus/close behavior, translated groups, active state, closes after nav, compact brand/user, no horizontal overflow | Small-phone nav usable/finished in both languages |
| 20 | Header essentials | ⬜ Pending | MiniMax M2.7 | Sidebar/mobile trigger, page title/breadcrumbs, language switcher, compact selector, appearance trigger, notification button, user avatar/menu, demo logout | Header balanced in vertical/mini/horizontal/mobile/RTL/LTR |
| 21 | Command palette | ⬜ Pending | DeepSeek v4 Flash | MUI Dialog Ctrl/Cmd+K, route nav, translated labels/keywords, grouped results, recent routes, keyboard nav, disabled placeholders for orders/customers | Keyboard opens, searches, navigates, closes, restores focus |
| 22 | Notifications experience | ⬜ Pending | MiniMax M2.7 | Popover with unread badge, categories (order/customer/driver/system), read/unread styling, timestamps, mark all read, empty state, route links, mobile-friendly, translated | Production-ready in light/dark/RTL/LTR |
| 23 | Component showcase route | ⬜ Pending | MiniMax M2.7 | `/dashboard/showcase/components` — buttons, chips, avatars, alerts, cards, menus, dialogs, drawers, tooltips, tabs, accordions, empty/loading/error states, template-catalogue style | Every theme dimension visibly affects catalogue |
| 24 | ApexCharts infrastructure | ⬜ Pending | GLM-5 | `apexcharts` + `react-apexcharts` installed, SSR-safe lazy wrapper, MUI→Apex theme options, direction-aware toolbar/tooltip/legend/labels, semantic color helpers, reusable chart card, no-data/loading states | Proof chart works after direct reload, dark mode, Arabic RTL, color-preset switch |
| 25 | Core charts showcase | ⬜ Pending | MiniMax M2.7 | Area, line, column, horizontal bar with mock business labels, compact controls, legends, responsive sizing | 4 charts coherent/readable on tablet/phone |
| 26 | Advanced charts showcase | ⬜ Pending | MiniMax M2.7 | Donut, radial bar, mixed line/column, range/timeline, sparkline KPI cards, translated titles, realistic Jaii labels | Chart showcase comparable to premium dashboard theme |
| 27 | Forms showcase | ⬜ Pending | DeepSeek v4 Flash | `react-hook-form` + `zod` installed, text/password/number, select/autocomplete, checkbox/radio/switch, date picker/upload placeholder, validation/disabled states, multi-section layout, translated labels | Forms dense/elegant; Arabic field alignment correct |
| 28 | Tables showcase | ⬜ Pending | DeepSeek v4 Flash | `@mui/x-data-grid` Community installed, basic table, sorting, filtering/search, pagination, selection, custom cells/status/avatar/actions, loading/no-results, responsive card fallback | No license warning; theme matches Jaii; mobile fallback usable |
| 29 | API + Query foundation | ⬜ Pending | DeepSeek v4 Flash | TanStack Query installed, root QueryClient provider, typed fetch wrapper, normalized API error type, query key factories, placeholder domain hooks | Build passes; tiny non-visual query proof succeeds |
| 30 | MSW + Saudi demo dataset | ⬜ Pending | DeepSeek v4 Flash | MSW installed, fictional Saudi demo data for all domains (overview, orders, customers, notifications, pricing, drivers, partners, zones, analytics), SAR in halalas, Gregorian dates, Riyadh/Jeddah districts, AR/EN names, Saudi phones, mock endpoints with filters/latency, data outside components | MSW starts only in dev; existing pages don't break |
| 31 | Demo authentication + permissions | ⬜ Pending | DeepSeek v4 Flash | Demo session provider (owner/manager/staff), protected dashboard routing, demo login redirect, user menu role switch (dev), permission helper, no real tokens/refresh/backend | `/dashboard` redirects when off; each role changes visible nav/actions |
| 32 | Overview visual composition | ⬜ Pending | MiniMax M2.7 | `/dashboard` static typed placeholders: greeting, period selector, KPI cards, revenue chart, order-status chart, recent orders, attention queue, top services, quick actions, chart wrappers + dashboard patterns | Overview looks like premium commercial template before data wiring |
| 33 | Overview mock-data wiring | ⬜ Pending | DeepSeek v4 Flash | TanStack Query hooks + MSW, period switching, loading skeletons, no-data/error states, localized SAR/date/number formatting, role-aware financial visibility | Period changes update metrics/charts; all data states usable |
| 34 | Orders list | ⬜ Pending | DeepSeek v4 Flash | `/dashboard/orders` with MUI X Data Grid Community + mobile card fallback, search, status/driver/date filters, sorting, pagination, status chips, amount/date formatting, row action menu, URL-synced filters, query hooks + MSW | Filters survive refresh; AR + mobile layouts usable |
| 35 | Order details + workflow | ⬜ Pending | MiniMax M2.7 | Order detail Drawer: customer/contact, structured address, items/totals, status timeline, driver, notes, assign-driver dialog, allowed status actions, mock mutations with pending/success/error feedback | Detail flow polished; mutations update list/detail consistently |
| 36 | Customers | ⬜ Pending | DeepSeek v4 Flash | `/dashboard/customers`: searchable/paginated Data Grid, mobile cards, spend/order count/last order/loyalty/district, customer detail Drawer (addresses, order history, notes, activity), add-note mock mutation, localized CSV export (browser APIs), Community only | Search, detail, note, export work in AR/EN |
| 37 | Analytics | ⬜ Pending | MiniMax M2.7 | `/dashboard/analytics` with ApexCharts + mock hooks: result summary, revenue/demand, customer retention, category mix, district performance, fulfillment performance, period comparison, loading/error/no-data, concise insight text, no wall of charts | Analytics tells clear business story on desktop; understandable on mobile |
| 38 | Laundry profile settings | ⬜ Pending | DeepSeek v4 Flash | `/dashboard/settings`: AR/EN name, logo upload/preview, email/Saudi phone, structured address, business hours, service status, RHF + Zod, dirty state + save feedback, mock hooks | Validation, save, language, mobile layouts work |
| 39 | Pricing settings | ⬜ Pending | DeepSeek v4 Flash | `/dashboard/settings/pricing`: categories, item AR/EN names, price in halalas, add/edit/archive, desktop table, mobile cards, save/cancel, duplicate/negative validation, mock endpoints + role perms | Currency accurate; owner-only actions hidden for other roles |
| 40 | Zones map foundation | ⬜ Pending | GLM-5 | MapLibre + compatible React wrapper (after API check), `/dashboard/settings/zones`: lazy client-only map, configurable free dev style, Riyadh initial view, demo district GeoJSON, themed container, loading/failure states, no drawing yet | Direct reload works, no SSR error, map bundle not in unrelated routes |
| 41 | Zone editor | ⬜ Pending | GLM-5 | Compatible free polygon editor (after API check): create/edit/delete polygon, district selection, zone name/active state, semantic zone colors, valid GeoJSON in MSW, non-map zone list, save/cancel feedback | Zone can be created, edited, saved, reloaded, disabled, deleted |
| 42 | Drivers + partners | ⬜ Pending | DeepSeek v4 Flash | `/dashboard/settings/drivers`, `/dashboard/partners`: searchable desktop lists, mobile cards, status, Saudi phone, zone/coverage, invite/add/edit dialogs, active toggle, conflict feedback, reuse table/form/card/detail patterns | Both routes consistent with orders/customers; role controls work |
| 43 | Demo login page | ⬜ Pending | MiniMax M2.7 | `/login`: brand presentation, email/password fields, role/demo shortcuts, language switch, mode switch, original illustration/composition, responsive mobile, connects to demo session only | Login visually matches landing/dashboard; redirects correctly |
| 44 | Landing header + hero | ⬜ Pending | MiniMax M2.7 | Public header/hero: original brand placeholder, translated nav, language/mode controls, login + CTA, mobile menu, customer→driver→laundry story, original HTML/CSS preview, centralized asset map for legal placeholder imagery | Hero premium in AR/EN + phone/desktop |
| 45 | Landing product sections | ⬜ Pending | MiniMax M2.7 | Value strip, how it works, customer/driver/laundry/admin benefits, operations capabilities, dashboard preview (reuse real cards/charts), service-quality section | Varied coherent composition; not repetitive card grids |
| 46 | Landing trust, FAQ, CTA, footer | ⬜ Pending | MiniMax M2.7 | Fictional testimonials, accessible FAQ, final CTA, complete footer, legal/contact placeholders, translated copy, subtle reduced-motion-safe interactions, no real numbers/endorsements | `/` complete enough to publish as visual demo |
| 47 | Arabic + translation review | ⬜ Pending | Gemma-4.31B (free) | Review running UI + catalogues: raw/missing keys, unnatural Arabic, mixed-language strings, nav terminology inconsistencies, validation/error wording, long-label risks, incorrect namespace ownership → `docs/ARABIC_REVIEW.md` | Report precise enough for coding agent to apply |
| 48 | Apply Arabic/RTL corrections | ⬜ Pending | DeepSeek v4 Flash | Apply `docs/ARABIC_REVIEW.md` issues; manually inspect Drawers/Dialogs edges, breadcrumbs/chevrons, tables/pagination, ApexCharts legends/tooltips, form adornments, map controls, mobile nav | No obvious raw keys, clipping, or direction mistakes |
| 49 | Theme matrix polish | ⬜ Pending | MiniMax M2.7 | Review full appearance matrix: light/dark, standard/high contrast, 6 presets, 4 radii, compact on/off, 4 fonts, 3 nav layouts, 2 nav colors — fix token/component/contrast/spacing/customizer inconsistencies | No selectable combination looks unfinished/broken |
| 50 | Responsive polish | ⬜ Pending | MiniMax M2.7 | Review all routes at: small phone, large phone, tablet, laptop, wide desktop — fix horizontal overflow, toolbar wrapping, card grids, chart sizing, Data Grid fallbacks, Drawer widths, nav transitions, long Arabic labels | Every route usable/attractive at target sizes |
| 51 | Performance + route splitting | ⬜ Pending | DeepSeek v4 Flash | Audit/improve: route lazy loading, ApexCharts/MapLibre/font/image loading, duplicate imports, icon imports, large mock data imports, console warnings — behavior/appearance unchanged | Production build succeeds; maps/charts not in unrelated initial chunks |
| 52 | Final independent audit | ⬜ Pending | Nemotron-3-Ultra (free) | Audit without fixes: SPEC coverage, route accessibility, MUI-only consistency, no downgrades, RTL/LTR, translation completeness, customizer behavior, nav modes, ApexCharts, Data Grid Community-only, mock data separation, responsive quality, loading/error/empty states, build/lint/typecheck → `docs/FINAL_AUDIT.md` with blockers/high/medium/optional | No unresolved blocker before demo |

---

## Phase 0 — Audit Results

### Confirmed Repository State

| Aspect | Status | Details |
|--------|--------|---------|
| React Router app directory | ✅ Confirmed | `app/` with `app/routes.ts` config |
| Routes file | ✅ Confirmed | `app/routes.ts` — single index route to `routes/home.tsx` |
| Scripts | ⚠️ Partial | `build`, `dev`, `start`, `typecheck` present; `lint`, `test`, `storybook` missing |
| MUI packages | ✅ Installed | `@mui/material@^9.2.0`, `@mui/stylis-plugin-rtl@^9.1.1` |
| RTL packages | ✅ Installed | `@mui/stylis-plugin-rtl@^9.1.1`, `stylis@^4.4.0` |
| i18n packages | ✅ Installed | `i18next`, `react-i18next`, `i18next-http-backend` (versions in baseline) |
| i18n config | ✅ Present | `app/lib/i18n.ts` — config-only, no embedded catalogs |
| Translation namespaces | ✅ Present | 17 namespaces each in `public/locales/{ar,en}/` |
| Localization utilities | ✅ Present | `app/lib/localization.ts` — SAR, Gregorian dates, Saudi phone, numerals |
| Tailwind CSS | ⚠️ Present | `tailwindcss@^4.2.2`, `@tailwindcss/vite@^4.2.2` in devDependencies (legacy from template) |
| React version | ✅ v19 | `react@^19.2.7`, `react-dom@^19.2.7` |
| React Router version | ✅ v8 | `react-router@8.0.0`, `@react-router/dev@8.0.0`, `@react-router/node@8.0.0`, `@react-router/serve@8.0.0` |
| TypeScript | ✅ Strict | `typescript@^5.9.3`, strict mode enabled |
| Vite | ✅ v8 | `vite@^8.0.3` |
| Package manager | ✅ pnpm | `pnpm@11.11.0+` declared in `packageManager` field |

### Flags / Ambiguities

| Item | Flag | Notes |
|------|------|-------|
| `lint` script | ❌ Missing | Not in `package.json`; will be added in later phase |
| `test` / `test:e2e` scripts | ❌ Missing | Vitest/Playwright not installed; added in later phases |
| `storybook` script | ❌ Missing | Storybook not installed; added in later phases |
| Tailwind CSS | ⚠️ Ambiguous | Present in devDependencies and `vite.config.ts`; SPEC says MUI only — will be removed/replaced in Phase 1+ |
| `clsx` + `tailwind-merge` | ⚠️ Used | `app/lib/utils.ts` uses `clsx` + `twMerge` — legacy from template; will be removed when Tailwind removed |
| i18n `load: 'languageOnly'` | ⚠️ Check | `app/lib/i18n.ts` uses `load: 'languageOnly'` — may need `load: 'all'` or `load: 'currentOnly'` for namespace loading; verify in Phase 2 |
| i18n `ns: ['common']` | ⚠️ Limited | Only loads `common` namespace by default; other namespaces must be loaded explicitly via `useTranslation('namespace')` — verify in Phase 2 |
| `public/locales` structure | ✅ Correct | 17 namespaces each for `ar` and `en`, matching SPEC §6.1 |
| `@emotion/cache` | ❌ Missing | Not in `package.json`; required for RTL cache separation — will be added in Phase 3 |
| `@iconify/react` | ❌ Missing | Not installed; will be added in Phase 4 |
| Font packages | ❌ Missing | Public Sans, Tajawal not installed; will be added in Phase 4 |
| Zustand | ❌ Missing | Not installed; will be added in Phase 9 |
| TanStack Query | ❌ Missing | Not installed; will be added in Phase 29 |
| MSW | ❌ Missing | Not installed; will be added in Phase 30 |
| ApexCharts | ❌ Missing | Not installed; will be added in Phase 24 |
| MapLibre / react-map-gl | ❌ Missing | Not installed; will be added in Phase 40 |
| React Hook Form / Zod | ❌ Missing | Not installed; will be added in Phase 27 |
| MUI X Data Grid | ❌ Missing | Not installed; will be added in Phase 28 |
| MUI X Date Pickers | ❌ Missing | Not installed; optional, for Phase 27 if needed |
| MUI X Charts | ❌ Missing | Not installed; SPEC prefers ApexCharts for charts |
| Notistack | ❌ Missing | Not installed; will be added for notifications (Phase 22) |
| Terra Draw | ❌ Missing | Not installed; for zone polygon editing (Phase 41) |

---

## Commands Run (Phase 0)

```bash
# No commands run — audit only
# pnpm install not executed (preserve lockfile)
```

## Next Phase

**Phase 1 — Root Provider Skeleton** (Model: DeepSeek v4 Flash)
- Configure MUI ThemeProvider, CssBaseline, Emotion CacheProvider at app root
- Minimal app providers component
- Simple MUI-rendered home placeholder (Typography, Button, Card)
- No RTL switching, full theme presets, localization, or dashboard shell

---

**No existing dependencies downgraded.** ✅