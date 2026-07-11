# Jaii — Lean Prompts for Phases 15–52

## How to use

For each phase, paste:

1. The **Lean Header**
2. The current phase prompt only

Do not paste earlier phases.

## Lean Header

```text
Read only `AGENTS.md` and files directly relevant to this phase. Do not read SPEC files, implementation plans, or `docs/IMPLEMENTATION_STATUS.md`. Do not edit documentation unless this phase explicitly asks for a report.

Preserve completed work and existing package versions. Use pnpm, MUI Community, Zustand for all cross-route client state, TanStack Query for API state, URL params for shareable filters, React Hook Form for forms, and local state only for one-component transient behavior. Do not create custom application Context.

Implement only this phase. Run typecheck, lint if configured, and build. Manually open changed routes. End with changed files, validation results, and:
- No custom application-state Context added or retained.
- No existing dependencies downgraded.
```

---

## Phase 15 — Dashboard frame

**Model:** `minimax/minimax-m2.7`

```text
Build the dashboard frame only:
- navigation slot
- header slot
- main content with Outlet
- responsive gutters/max width
- polished background and surface hierarchy
- skip link

Do not build detailed navigation or header controls yet. Keep the composition original and premium.
```

**Gate:** All dashboard placeholders render inside one polished responsive shell.

---

## Phase 16 — Expanded vertical navigation

**Model:** `minimax/minimax-m2.7`

```text
Build the expanded sidebar using the existing route config:
- temporary Jaii brand
- translated grouped links
- icons and active states
- nested Settings and Showcase groups
- user/workspace footer
- integrated/apparent color modes
- correct RTL/LTR side
- independent scroll

Do not duplicate route definitions.
```

**Gate:** All links work and both color modes look polished in Arabic and English.

---

## Phase 17 — Mini navigation

**Model:** `minimax/minimax-m2.7`

```text
Add mini-sidebar mode to the existing navigation:
- icon rail
- expand/collapse
- active marker
- tooltips
- nested flyout
- Ctrl/Cmd+B shortcut
- Zustand persistence
- reduced-motion-safe transitions

Do not redesign expanded mode.
```

**Gate:** Expanded ↔ mini switching is smooth, persistent, and correct in RTL/LTR.

---

## Phase 18 — Horizontal navigation

**Model:** `minimax/minimax-m2.7`

```text
Add a horizontal desktop navigation option below the header.

Reuse the same navigation data and permissions. Support grouped menus, active state, overflow handling, integrated/apparent color modes, and RTL order. Leave mobile navigation unchanged.
```

**Gate:** Vertical, mini, and horizontal modes switch without route loss.

---

## Phase 19 — Mobile navigation

**Model:** `minimax/minimax-m2.7`

```text
Build the mobile dashboard header and temporary Drawer navigation.

Requirements:
- correct RTL/LTR opening edge
- translated groups and active state
- closes after navigation
- focus/escape/backdrop behavior
- compact brand/user area
- no horizontal overflow

Reuse existing navigation data.
```

**Gate:** Small-phone navigation is fully usable in Arabic and English.

---

## Phase 20 — Header essentials

**Model:** `minimax/minimax-m2.7`

```text
Complete the dashboard header:
- sidebar/mobile trigger
- page title and responsive breadcrumbs
- language switch
- compact-mode control
- appearance trigger
- notification placeholder button
- user menu and demo logout

Do not implement command search or notification content yet.
```

**Gate:** Header remains balanced in every nav mode, breakpoint, and direction.

---

## Phase 21 — Command palette

**Model:** `deepseek/deepseek-v4-flash`

```text
Add a MUI Dialog command palette opened by Ctrl/Cmd+K.

Use existing route/navigation data. Include translated search, grouped route results, keyboard navigation, focus restoration, and recent routes in a focused Zustand slice. Entity search remains disabled placeholders.
```

**Gate:** It opens, searches, navigates, closes, and restores focus correctly.

---

## Phase 22 — Notifications

**Model:** `minimax/minimax-m2.7`

```text
Build a polished notification popover with fictional local data:
- unread badge
- order/customer/driver/system categories
- read/unread styling
- timestamps
- mark all read
- empty state
- route links
- mobile-friendly layout

Store temporary read state in Zustand.
```

**Gate:** It looks finished in light/dark and RTL/LTR.

---

## Phase 23 — Component showcase

**Model:** `minimax/minimax-m2.7`

```text
Build `/dashboard/showcase/components` as a premium MUI catalogue:
buttons, icon buttons, chips, avatars, alerts, cards, menus, dialogs, drawers, tooltips, tabs, accordions, and empty/loading/error states.

Reuse existing theme components; do not create a separate design system.
```

**Gate:** Theme presets, radius, density, fonts, mode, and contrast visibly affect the page.

---

## Phase 24 — ApexCharts foundation

**Model:** `z-ai/glm-5`

```text
Install `apexcharts` and `react-apexcharts` after checking current official APIs.

Create an SSR-safe lazy chart wrapper, MUI-derived theme options, RTL-aware labels/tooltips/legend, semantic chart colors, a reusable chart card, and loading/no-data states. Render one proof chart only.
```

**Gate:** Direct reload works in dark mode, Arabic RTL, and every primary preset.

---

## Phase 25 — Core chart showcase

**Model:** `minimax/minimax-m2.7`

```text
Add area, line, column, and horizontal-bar examples to `/dashboard/showcase/charts`.

Use realistic Jaii mock labels, compact controls, responsive sizing, and the existing chart wrapper/colors.
```

**Gate:** All four charts remain clear on desktop, tablet, and phone.

---

## Phase 26 — Advanced chart showcase

**Model:** `minimax/minimax-m2.7`

```text
Add donut, radial bar, mixed line/column, one supported range/timeline chart, and sparkline KPI cards.

Use translated titles and realistic Jaii demo data. Reuse the shared chart layer.
```

**Gate:** The chart catalogue feels premium and visually consistent.

---

## Phase 27 — Forms showcase

**Model:** `deepseek/deepseek-v4-flash`

```text
Install only the required free React Hook Form/Zod packages.

Build `/dashboard/showcase/forms` with text, password, number, select/autocomplete, checkbox/radio/switch, date input or free MUI picker, upload placeholder, validation, disabled states, and one multi-section form.
```

**Gate:** Forms are polished and correctly aligned in Arabic and English.

---

## Phase 28 — Tables showcase

**Model:** `deepseek/deepseek-v4-flash`

```text
Install MUI X Data Grid Community only.

Build `/dashboard/showcase/tables` with sorting, quick search, filters, pagination, selection, custom cells/actions, loading/no-results overlays, and a mobile card fallback. Do not use Pro/Premium APIs.
```

**Gate:** No license warning; desktop and mobile views are usable.

---

## Phase 29 — Query/API foundation

**Model:** `deepseek/deepseek-v4-flash`

```text
Install TanStack Query.

Add the root QueryClient provider, typed fetch wrapper, normalized API error, query-key factories, and empty domain hook folders. Components must not call fetch directly. Do not add MSW data yet.
```

**Gate:** Build passes and one tiny query proof succeeds.

---

## Phase 30 — MSW demo backend

**Model:** `deepseek/deepseek-v4-flash`

```text
Install MSW and add fictional Saudi demo data/endpoints for overview, orders, customers, notifications, pricing, drivers, partners, zones, and analytics.

Use halalas, Gregorian dates, Saudi phones, Arabic/English names, Riyadh/Jeddah-style districts, basic filters, and realistic latency. Keep data outside components.
```

**Gate:** MSW runs only in development and existing routes remain stable.

---

## Phase 31 — Demo session and permissions

**Model:** `deepseek/deepseek-v4-flash`

```text
Create a focused Zustand demo-session store with owner, manager, and staff roles.

Add protected dashboard routing, demo-login redirect, development role switch, and a small permission helper. Do not create AuthContext or real token logic.
```

**Gate:** Logged-out access redirects and each role changes allowed navigation/actions.

---

## Phase 32 — Overview visual layout

**Model:** `minimax/minimax-m2.7`

```text
Design `/dashboard` with static typed placeholders:
- greeting and period selector
- KPI cards
- revenue chart
- order-status chart
- recent orders
- attention queue
- top services
- quick actions

Use existing shell/chart patterns. Focus only on composition and responsiveness.
```

**Gate:** The page looks premium before data wiring.

---

## Phase 33 — Overview data wiring

**Model:** `deepseek/deepseek-v4-flash`

```text
Wire the overview to TanStack Query + MSW.

Add period switching, skeletons, error/no-data states, localized SAR/date/number formatting, and role-aware financial visibility. Do not redesign the page.
```

**Gate:** Period changes update content and every data state is usable.

---

## Phase 34 — Orders list

**Model:** `deepseek/deepseek-v4-flash`

```text
Build `/dashboard/orders` with Data Grid Community and mobile cards.

Include search, status/driver/date filters, sorting, pagination, status chips, row actions, localized values, and URL-synchronized filters using query hooks + MSW.
```

**Gate:** Filters survive refresh and mobile/Arabic layouts work.

---

## Phase 35 — Order details

**Model:** `minimax/minimax-m2.7`

```text
Add a polished order-details Drawer:
customer/contact, address, items/totals, status timeline, driver, notes, assign-driver dialog, and allowed status actions.

Wire mock mutations with pending/success/error feedback.
```

**Gate:** List and detail remain synchronized after actions.

---

## Phase 36 — Customers

**Model:** `deepseek/deepseek-v4-flash`

```text
Build `/dashboard/customers` with searchable/paginated Data Grid, mobile cards, spend/order metrics, customer Drawer, addresses, order history, notes/activity, add-note mutation, and localized browser CSV export.
```

**Gate:** Search, detail, notes, and export work in both languages.

---

## Phase 37 — Analytics

**Model:** `minimax/minimax-m2.7`

```text
Build `/dashboard/analytics` with ApexCharts and mock hooks:
summary, revenue/demand, retention, category mix, district performance, and fulfillment performance.

Include period comparison and loading/error/no-data states. Keep the story concise; avoid a wall of charts.
```

**Gate:** The page communicates clear business insights on desktop and mobile.

---

## Phase 38 — Laundry profile

**Model:** `deepseek/deepseek-v4-flash`

```text
Build `/dashboard/settings` with React Hook Form + Zod:
Arabic/English name, logo preview, email, Saudi phone, structured address, business hours, service status, dirty state, and mock save feedback.
```

**Gate:** Validation, saving, language, and mobile layout work.

---

## Phase 39 — Pricing

**Model:** `deepseek/deepseek-v4-flash`

```text
Build `/dashboard/settings/pricing`:
categories, Arabic/English item names, halala-based prices, add/edit/archive, desktop table, mobile cards, save/cancel, duplicate validation, negative-value validation, and role permissions.
```

**Gate:** Currency stays exact and owner-only actions are enforced.

---

## Phase 40 — Map foundation

**Model:** `z-ai/glm-5`

```text
Check current official APIs, then install MapLibre and a compatible React wrapper.

Build `/dashboard/settings/zones` with a lazy client-only map, configurable free dev style, Riyadh initial view, demo district GeoJSON, themed container, and loading/failure states. No editing yet.
```

**Gate:** Direct reload has no SSR error and map code is route-split.

---

## Phase 41 — Zone editor

**Model:** `z-ai/glm-5`

```text
Add a compatible free polygon editor after checking current installed APIs.

Support create/edit/delete polygon, district selection, zone name/status, semantic colors, valid GeoJSON in MSW, non-map list controls, and save/cancel feedback.
```

**Gate:** A zone can be created, saved, reloaded, edited, disabled, and deleted.

---

## Phase 42 — Drivers and partners

**Model:** `deepseek/deepseek-v4-flash`

```text
Build:
- `/dashboard/settings/drivers`
- `/dashboard/partners`

Use established table/card/form patterns. Include search, status, Saudi phone, zone/coverage, add/edit/invite dialogs, active toggle, conflict feedback, and role controls.
```

**Gate:** Both routes match the quality and behavior of orders/customers.

---

## Phase 43 — Demo login

**Model:** `minimax/minimax-m2.7`

```text
Design `/login` with Jaii branding, email/password fields, demo-role shortcuts, language/mode switches, an original visual composition, and responsive mobile layout.

Connect only to the existing demo session.
```

**Gate:** Login matches the landing/dashboard and redirects correctly.

---

## Phase 44 — Landing header and hero

**Model:** `minimax/minimax-m2.7`

```text
Build the public header and hero:
brand placeholder, translated nav, language/mode controls, login/CTA, mobile menu, customer→driver→laundry story, and an original product preview.

Use legal placeholder imagery through one centralized asset map.
```

**Gate:** Hero is premium in Arabic/English and phone/desktop.

---

## Phase 45 — Landing product sections

**Model:** `minimax/minimax-m2.7`

```text
Add value strip, how-it-works, audience benefits, operations capabilities, dashboard preview, and service-quality sections.

Reuse real dashboard cards/charts where useful. Avoid repetitive card grids.
```

**Gate:** Sections form one varied, coherent product story.

---

## Phase 46 — Landing completion

**Model:** `minimax/minimax-m2.7`

```text
Add fictional testimonials, accessible FAQ, final CTA, footer, legal/contact placeholders, translated copy, and subtle reduced-motion-safe interactions.

Do not invent real endorsements or customer numbers.
```

**Gate:** `/` is complete enough for a visual demo.

---

## Phase 47 — Arabic review

**Model:** `google/gemma-4.31b-it:free`

```text
Review the running UI and translation JSON only. Do not edit code.

Write `docs/ARABIC_REVIEW.md` listing raw/missing keys, unnatural Arabic, mixed language, inconsistent terminology, validation/error issues, and long-label risks with file/key references.
```

**Gate:** The report is precise and actionable.

---

## Phase 48 — Apply Arabic/RTL fixes

**Model:** `deepseek/deepseek-v4-flash`

```text
Apply only actionable items from `docs/ARABIC_REVIEW.md`.

Also fix obvious RTL issues in Drawers, Dialogs, breadcrumbs, tables, pagination, ApexCharts, form adornments, maps, and mobile navigation. Do not redesign screens.
```

**Gate:** No obvious raw keys, clipping, or direction mistakes remain.

---

## Phase 49 — Theme matrix polish

**Model:** `minimax/minimax-m2.7`

```text
Open:
- `docs/references/theme-customizer-overview.png`
- `docs/references/theme-customizer-presets-fonts.png`

If either is missing, stop.

Review light/dark, contrast, six presets, four radii, compact mode, four fonts, three nav layouts, and two nav colors. Fix only visual inconsistencies, broken combinations, contrast, spacing, and customizer previews.
```

**Gate:** Every selectable combination looks intentional and usable.

---

## Phase 50 — Responsive polish

**Model:** `minimax/minimax-m2.7`

```text
Review all routes at small phone, large phone, tablet, laptop, and wide desktop.

Fix overflow, toolbar wrapping, grids, chart sizing, mobile table cards, Drawer widths, navigation transitions, long Arabic labels, and customizer layout. For customizer comparison, use:
- `docs/references/theme-customizer-overview.png`
- `docs/references/theme-customizer-presets-fonts.png`
```

**Gate:** Every route is usable and attractive at all target sizes.

---

## Phase 51 — Performance and route splitting

**Model:** `deepseek/deepseek-v4-flash`

```text
Improve route lazy loading, ApexCharts/MapLibre loading, fonts, image sizing, duplicate imports, Iconify usage, mock-data imports, and production warnings.

Do not change appearance or behavior. Report actual build observations only.
```

**Gate:** Build succeeds and heavy chart/map code is absent from unrelated initial routes where practical.

---

## Phase 52 — Final audit

**Model:** `nvidia/nemotron-3-ultra:free`

```text
Audit without implementing fixes.

Check routes, MUI-only consistency, Zustand/global-state rules, dependencies, RTL/LTR, translations, customizer, navigation modes, ApexCharts, Data Grid Community use, mock-data separation, responsiveness, loading/error/empty states, typecheck, lint, and build.

Write `docs/FINAL_AUDIT.md` with blockers, high, medium, and optional findings.
```

**Gate:** No unresolved blocker before demo presentation.
