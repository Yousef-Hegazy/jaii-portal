# Jaii Portal — Route Inventory

**Generated**: Phase 0 (Repository Audit)  
**Date**: 2026-07-10  
**Route Configuration Source**: `app/routes.ts` (explicit React Router config)  
**Framework**: React Router v8 Framework Mode

> **Rule**: Routes are **explicitly registered** in `app/routes.ts`. Filenames alone do not register routes. Path-bearing parent routes must render `<Outlet />`. Pathless layout routes must not be used where a real URL segment is required (e.g., `/dashboard`, `/settings`).

---

## Current Routes (Phase 0 Baseline)

| Method | Path | Route Module | Parent | Status | Notes |
|--------|------|--------------|--------|--------|-------|
| GET | `/` | `app/routes/home.tsx` | Root (`root.tsx`) | ✅ Active | Landing page placeholder (Welcome component) |

### Route Tree (Current)

```
root.tsx (Layout: <html>, <head>, <body>, <Outlet />)
└── index → routes/home.tsx (Welcome component with Tailwind styling)
```

### Route Configuration (`app/routes.ts`)

```ts
import { type RouteConfig, index } from "@react-router/dev/routes";

export default [index("routes/home.tsx")] satisfies RouteConfig;
```

---

## Planned Routes (Per SPEC.md §8)

### Public Routes

| Method | Path | Purpose | SPEC Reference | Phase |
|--------|------|---------|----------------|-------|
| GET | `/` | Public landing page (hero, features, trust, FAQ, CTA, footer) | §8, Milestone F | 44–46 |
| GET | `/login` | Demo login page (brand, email/password, role shortcuts, language/mode switches) | §8, Phase 43 | 43 |

### Protected Dashboard Routes (Authentication Required)

| Method | Path | Purpose | SPEC Reference | Phase |
|--------|------|---------|----------------|-------|
| GET | `/dashboard` | Dashboard overview (KPIs, charts, recent orders, attention queue, quick actions) | §8, §9.1 | 32–33 |
| GET | `/dashboard/orders` | Orders management (search, filters, Data Grid, mobile cards, URL-synced) | §8, §9.2 | 34 |
| GET | `/dashboard/orders/:id` | Order detail drawer (customer, address, items, timeline, driver, actions) | §9.2 | 35 |
| GET | `/dashboard/customers` | Customers CRM (search, Data Grid, mobile cards, detail drawer, CSV export) | §8, §9.3 | 36 |
| GET | `/dashboard/analytics` | Business analytics (results, demand, retention, category, zone, fulfillment) | §8, §9.4 | 37 |
| GET | `/dashboard/partners` | Laundry partners management | §8, §9.7 | 42 |
| GET | `/dashboard/settings` | Laundry profile (bilingual name, logo, contact, address, hours, status) | §8, §9.5 | 38 |
| GET | `/dashboard/settings/appearance` | Appearance customization (full-page mirror of floating drawer) | §8, §5.5, §13 | 13 |
| GET | `/dashboard/settings/pricing` | Category/item pricing in halalas/SAR | §8, §9.5 | 39 |
| GET | `/dashboard/settings/zones` | Service zones & geofencing (MapLibre, district selection, polygon editor) | §8, §9.6 | 40–41 |
| GET | `/dashboard/settings/drivers` | Drivers management | §8, §9.7 | 42 |

### Showcase Routes (Internal/Development)

| Method | Path | Purpose | SPEC Reference | Phase |
|--------|------|---------|----------------|-------|
| GET | `/dashboard/showcase/components` | Component catalogue (buttons, chips, avatars, alerts, cards, menus, dialogs, drawers, tooltips, tabs, accordions, states) | Milestone C, Phase 23 | 23 |
| GET | `/dashboard/showcase/charts` | ApexCharts examples (area, line, column, bar, donut, radial, mixed, sparklines) | Milestone C, Phases 25–26 | 25–26 |
| GET | `/dashboard/showcase/forms` | Form patterns (RHF + Zod: text, select, checkbox, radio, switch, date, upload, validation, multi-section) | Milestone C, Phase 27 | 27 |
| GET | `/dashboard/showcase/tables` | Data Grid examples (sorting, filtering, pagination, selection, custom cells, loading, empty, mobile fallback) | Milestone C, Phase 28 | 28 |

---

## Route Registration Requirements

Per SPEC.md §8:

1. **Explicit registration** — All routes must be declared in `app/routes.ts` using `@react-router/dev/routes` config (`index`, `route`, `prefix`, `layout`).
2. **Path-bearing parents** — Routes with children that represent real URL segments (e.g., `/dashboard`, `/dashboard/settings`) must use `route()` or `prefix()` with a path, not pathless `layout()`.
3. **`<Outlet />` requirement** — Every parent route with children must render `<Outlet />` in its component.
4. **Type generation** — Route changes require `pnpm run typecheck` (runs `react-router typegen && tsc`).
5. **Direct URL testing** — Every route must be openable directly via browser address bar without navigation from another route.

---

## Route Hierarchy (Planned)

```
root.tsx
├── index.tsx                                    → "/"
├── login.tsx                                    → "/login"
└── dashboard/
    ├── layout.tsx (DashboardFrame: nav + header + <Outlet />)
    ├── index.tsx                                → "/dashboard"
    ├── orders.tsx                               → "/dashboard/orders"
    │   └── $orderId.tsx (or drawer in layout)   → "/dashboard/orders/:id"
    ├── customers.tsx                            → "/dashboard/customers"
    ├── analytics.tsx                            → "/dashboard/analytics"
    ├── partners.tsx                             → "/dashboard/partners"
    └── settings/
        ├── layout.tsx (SettingsFrame: tabs + <Outlet />)
        ├── index.tsx                            → "/dashboard/settings"
        ├── appearance.tsx                       → "/dashboard/settings/appearance"
        ├── pricing.tsx                          → "/dashboard/settings/pricing"
        ├── zones.tsx                            → "/dashboard/settings/zones"
        └── drivers.tsx                          → "/dashboard/settings/drivers"
    └── showcase/
        ├── components.tsx                       → "/dashboard/showcase/components"
        ├── charts.tsx                           → "/dashboard/showcase/charts"
        ├── forms.tsx                            → "/dashboard/showcase/forms"
        └── tables.tsx                           → "/dashboard/showcase/tables"
```

> **Note**: The exact file structure (e.g., `layout.tsx` vs `route.tsx` with `Outlet`) will be determined in Phase 14. The hierarchy above reflects the URL structure required by SPEC.md §8.

---

## Route Params & Search Params

| Route | Params | Search Params (URL-synced) |
|-------|--------|----------------------------|
| `/dashboard/orders` | — | `q` (search), `status`, `driverId`, `dateFrom`, `dateTo`, `sort`, `page`, `perPage` |
| `/dashboard/orders/:id` | `id` (string) | — |
| `/dashboard/customers` | — | `q`, `loyaltyTier`, `district`, `sort`, `page`, `perPage` |
| `/dashboard/analytics` | — | `period` (today/week/month/year/custom), `compare` (previous/year-over-year) |
| `/dashboard/settings/pricing` | — | `categoryId`, `archived` (true/false) |
| `/dashboard/settings/zones` | — | `district`, `active` (true/false) |

---

## Navigation Configuration (Source of Truth for Sidebar/Header/Command Palette)

The navigation structure is derived from the route hierarchy and will be defined in a shared config (e.g., `app/lib/navigation.ts`) in Phase 14+. Example structure:

```ts
// Planned: app/lib/navigation.ts
export const navigation = [
  { key: 'dashboard', labelKey: 'navigation.dashboard', href: '/dashboard', icon: '...' },
  { key: 'orders', labelKey: 'navigation.orders', href: '/dashboard/orders', icon: '...' },
  { key: 'customers', labelKey: 'navigation.customers', href: '/dashboard/customers', icon: '...' },
  { key: 'analytics', labelKey: 'navigation.analytics', href: '/dashboard/analytics', icon: '...' },
  { key: 'partners', labelKey: 'navigation.partners', href: '/dashboard/partners', icon: '...' },
  {
    key: 'settings',
    labelKey: 'navigation.settings',
    icon: '...',
    children: [
      { key: 'profile', labelKey: 'navigation.profile', href: '/dashboard/settings' },
      { key: 'appearance', labelKey: 'navigation.appearance', href: '/dashboard/settings/appearance' },
      { key: 'pricing', labelKey: 'navigation.pricing', href: '/dashboard/settings/pricing' },
      { key: 'zones', labelKey: 'navigation.zones', href: '/dashboard/settings/zones' },
      { key: 'drivers', labelKey: 'navigation.drivers', href: '/dashboard/settings/drivers' },
    ],
  },
  // Showcase (dev only)
  {
    key: 'showcase',
    labelKey: 'navigation.showcase',
    icon: '...',
    children: [
      { key: 'components', labelKey: 'navigation.components', href: '/dashboard/showcase/components' },
      { key: 'charts', labelKey: 'navigation.charts', href: '/dashboard/showcase/charts' },
      { key: 'forms', labelKey: 'navigation.forms', href: '/dashboard/showcase/forms' },
      { key: 'tables', labelKey: 'navigation.tables', href: '/dashboard/showcase/tables' },
    ],
  },
];
```

Translation keys for labels exist in `public/locales/{ar,en}/navigation.json`.

---

## Route Guards (Planned)

| Route Pattern | Guard | Behavior |
|---------------|-------|----------|
| `/dashboard*` | Auth required | Redirect to `/login?redirect=<original>` if no demo session |
| `/dashboard/settings/*` | Role: `LAUNDRY_OWNER` | Hide from sidebar/command palette for `MANAGER`/`STAFF`; return 403 if accessed directly |
| `/dashboard/settings/pricing` | Role: `LAUNDRY_OWNER` | Financial data — owner only |
| `/dashboard/settings/zones` | Role: `LAUNDRY_OWNER` \| `LAUNDRY_MANAGER` | Operational — manager+ |
| `/dashboard/settings/drivers` | Role: `LAUNDRY_OWNER` \| `LAUNDRY_MANAGER` | Operational — manager+ |
| `/dashboard/partners` | Role: `LAUNDRY_OWNER` | Partner management — owner only |

> Implemented in Phase 31 (Demo auth) and refined in subsequent phases.

---

## Current vs. Planned Summary

| Category | Current (Phase 0) | Planned Total |
|----------|-------------------|---------------|
| Public routes | 1 (`/`) | 2 (`/`, `/login`) |
| Dashboard routes | 0 | 11 core + 4 showcase = 15 |
| **Total** | **1** | **17** |

---

## Verification Checklist (Per Phase)

When adding/modifying routes in any phase:

- [ ] Route added to `app/routes.ts` with correct path and module
- [ ] Parent routes render `<Outlet />`
- [ ] `pnpm run typecheck` passes (generates route types)
- [ ] Direct URL access works (manual browser test)
- [ ] Navigation config updated (if applicable)
- [ ] Translation keys added to `navigation.json` (AR/EN)
- [ ] Route guard logic implemented (if protected)
- [ ] `docs/ROUTE_INVENTORY.md` updated

---

**No existing dependencies downgraded.** ✅