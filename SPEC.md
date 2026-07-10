# Jaii — Product and Frontend Specification

## 1. Project overview

Jaii is a Saudi laundry-service platform that connects customers, delivery drivers, laundries, and operations teams.

This repository covers two public-facing frontend experiences:

1. **Jaii landing page** — a premium bilingual marketing website that explains the service and directs users to the appropriate experience.
2. **Jaii admin dashboard** — a commercial-grade operations workspace for laundry owners, managers, and staff to manage orders, customers, pricing, drivers, partners, service zones, and business analytics.

The dashboard should be polished enough to stand on its own as a premium SaaS dashboard template while remaining tailored to Jaii’s laundry and delivery workflows.

The visual benchmark is the design quality and restraint of the Minimal dashboard theme: <https://minimals.cc/dashboard>. Jaii must use original layouts, branding, content, and assets; it must not copy Minimal’s source code or reproduce it pixel-for-pixel.

---

## 2. Scope

### Included

- Responsive public landing page
- Login and session handling
- Role-aware admin dashboard
- Dashboard overview
- Orders management
- Customer management
- Analytics
- Laundry profile and pricing
- Service zones and geofencing
- Drivers and laundry partners
- Notifications and global command/search experience
- Arabic and English localization
- RTL and LTR layouts
- Theme and layout customization
- Mock API environment for development and testing

### Not included in this repository

- Customer mobile/web application
- Driver mobile application
- Laundry processing application outside the admin dashboard
- Backend API implementation
- Payment processing implementation
- Production map data acquisition or licensing
- A copied or redistributed commercial theme

---

## 3. Product principles

### 3.1 Commercial dashboard quality

Jaii must feel like one coherent premium product rather than a collection of CRUD screens.

The interface must provide:

- Clear visual hierarchy and consistent page composition
- Professional typography, spacing, surfaces, and motion
- Responsive desktop, tablet, and mobile behavior
- Accessible keyboard and screen-reader interaction
- Complete loading, skeleton, empty, filtered-empty, error, offline, forbidden, and stale-data states
- Consistent tables, cards, forms, dialogs, drawers, charts, maps, and activity timelines
- No unfinished placeholders in production routes

### 3.2 Arabic-first, bilingual experience

- Arabic (`ar`) is the primary language.
- English (`en`) is the fallback language.
- Arabic uses `ar-SA` for document metadata and formatting.
- English uses `en-US` for document metadata and formatting.
- Arabic must be designed as a first-class RTL experience, not as an afterthought or a simple visual mirror.

### 3.3 Existing architecture must be preserved

- The repository and lockfile are the source of truth.
- Existing dependency versions are the minimum allowed versions.
- No package may be downgraded to match an outdated specification or example.
- Agents must inspect installed versions and current official documentation before using version-sensitive APIs.
- Do not recreate the application scaffold or replace working architecture without a documented reason.

---

## 4. Technology architecture

The catalogue below defines the approved technical direction. It intentionally does not pin versions: the repository and lockfile remain the source of truth, and no existing package may be downgraded to match this document.

### 4.1 Approved library catalogue

| Concern | Approved packages | Purpose and constraints |
|---|---|---|
| Runtime | `react`, `react-dom` | Existing installed versions; never downgrade |
| Routing | `react-router`, `@react-router/dev` and the repository’s existing React Router runtime packages | Framework Mode routing, loaders, actions, route type generation |
| Build and language | `vite`, `typescript` | Existing strict Vite/TypeScript setup |
| Core UI | `@mui/material`, `@mui/system` | Primary component and styling system |
| Styling engine | `@emotion/react`, `@emotion/styled`, `@emotion/cache` | MUI theme rendering and direction-specific caches |
| RTL transformation | `@mui/stylis-plugin-rtl`, `stylis` | Required for correct MUI/Emotion RTL CSS transformation |
| Icons | `@iconify/react` as the preferred application icon layer | Consistent premium iconography; avoid loading multiple complete icon libraries |
| Data grids | `@mui/x-data-grid` | Community edition by default; Pro/Premium features require an explicit license |
| Date and time UI | `@mui/x-date-pickers`, `dayjs` | Date pickers and date adapter |
| Charts | `@mui/x-charts` | Theme-aware dashboard charts; introduce another chart library only with a documented gap |
| Server state | `@tanstack/react-query`, `@tanstack/react-query-devtools` | Queries, mutations, caching, optimistic updates |
| Forms and validation | `react-hook-form`, `zod`, `@hookform/resolvers` | Forms, schemas, localized validation |
| Localization | `i18next`, `react-i18next`, `i18next-http-backend` | Namespaced JSON catalogues and runtime language switching |
| Client preferences | `zustand` | Small persisted UI state such as appearance and sidebar preferences |
| Notifications | `notistack` | MUI-compatible application snackbars and action feedback |
| Maps | `maplibre-gl`, `react-map-gl` using its MapLibre entry point | Map rendering without a Mapbox token |
| Geometry editing | `terra-draw`, `terra-draw-maplibre-gl-adapter` | Polygon creation and editing after installed-version compatibility verification |
| API mocking | `msw` | Development, tests, and component previews only |
| Unit/integration tests | `vitest`, `@testing-library/react`, `@testing-library/user-event` | Component and domain testing |
| Browser tests | `@playwright/test`, `@axe-core/playwright` | Route, RTL, theme, responsive, and accessibility checks |
| Component documentation | `storybook` and compatible Storybook testing packages | Premium-template component and state showcase |

Packages must be added only when their feature phase requires them. Agents must inspect current official documentation and peer requirements before installation.

### 4.2 UI-system migration rule

- MUI is the only UI foundation for new implementation.
- Do not introduce new shadcn, Radix, or Tailwind-dependent UI components.
- Existing shadcn/Tailwind artifacts from earlier work must be audited before removal.
- Remove an old UI dependency only after confirming that no source file, generated file, test, or build configuration uses it.
- Do not operate two competing design systems in production screens.
- Custom Jaii components must compose MUI primitives rather than recreate low-level accessibility behavior.

### 4.3 MUI usage rules

- Use official MUI components before creating custom low-level primitives.
- Build Jaii-specific compositions on top of MUI rather than duplicating buttons, dialogs, drawers, menus, tables, inputs, tabs, tooltips, or navigation primitives.
- Use MUI X Community components unless a paid MUI X license is explicitly available.
- Do not assume Pro or Premium-only functionality.
- Centralize palette tokens, typography, spacing, shape, shadows, component defaults, and variants in the MUI theme.
- Prefer `sx`, theme variants, and styled components over broad global CSS.
- Custom CSS must use logical properties whenever direction matters.
- Import packages and icons in bundle-conscious ways.

---

## 5. Design system and customization

The settings experience is inspired by the product owner’s Minimal dashboard references. Jaii must reproduce the same level of flexibility and polish using an original MUI implementation; it must not copy Minimal’s source, proprietary assets, or screen structure.

Reference images included with this specification package:

- `docs/references/theme-customizer-overview.png`
- `docs/references/theme-customizer-presets-fonts.png`

### 5.1 Settings trigger and drawer

Provide a persistent floating MUI `Fab` on the logical viewport edge until an equally discoverable control is available in the final header.

The trigger must:

- Use logical positioning and move correctly between RTL and LTR
- Remain reachable on phone and desktop
- Respect safe-area insets
- Have a translated tooltip and accessible name
- Avoid covering primary controls

It opens a responsive MUI `Drawer`:

- Desktop: temporary side drawer approximately 360–400 px wide
- Mobile: full-width or near-full-width temporary drawer
- Right edge in RTL and left edge in LTR
- Sticky title/reset area
- Scrollable settings body
- Immediate live preview
- Reset-all action
- Keyboard and focus management

### 5.2 Customization controls

The drawer must expose the following settings.

| Setting | Required values | Behavior |
|---|---|---|
| Mode | Light, Dark, System | System is the default and reacts to OS preference changes |
| Contrast | Standard, High | High contrast strengthens surface separation, borders, text, and controls while remaining visually refined |
| Direction | Auto, LTR, RTL | Auto follows language; manual values are primarily for preview/testing and must not corrupt saved language choice |
| Compact mode | Off, On | Off uses comfortable density; On reduces navigation, card, form, toolbar, and data-grid spacing without violating touch-target requirements |
| Navigation layout | Vertical, Horizontal, Mini | Vertical is expanded sidebar, Horizontal is top navigation, Mini is icon rail |
| Navigation color | Integrated, Apparent | Integrated blends navigation with the page theme; Apparent uses a distinct elevated/tonal navigation surface |
| Primary preset | Emerald, Cyan, Purple, Blue, Orange, Red | Generates a complete semantic tonal palette, not only a single button color |
| Radius | Compact, Balanced, Soft, Rounded | Globally affects MUI shape and component-specific radii |
| Font family | Public Sans, Inter, DM Sans, Nunito Sans | Each Latin choice must have an explicit high-quality Arabic companion font |
| Base font size | 14–18 px, default 16 px | Slider with immediate typography preview |
| Reset | Product defaults | Clears persisted customization and restores the default configuration |

### 5.3 Reference primary presets

Use the following main colors from the supplied visual reference as the initial preset catalogue:

| Preset | Main color |
|---|---|
| Emerald | `#00A76F` |
| Cyan | `#078DEE` |
| Purple | `#7635DC` |
| Blue | `#0C68E9` |
| Orange | `#FDA92D` |
| Red | `#FF3030` |

The product owner may choose the default preset later. Until then, use **Cyan** for Jaii because it suits cleanliness and logistics without removing the other presets.

Each preset must produce accessible semantic tokens for:

- `lighter`
- `light`
- `main`
- `dark`
- `darker`
- `contrastText`
- hover, selected, focus, disabled, and translucent states
- chart series
- map overlays
- status-neutral integration

Do not hard-code these main values throughout components. Generate or reference them through the theme.

### 5.4 Typography presets

Provide these selectable Latin families:

- Public Sans
- Inter
- DM Sans
- Nunito Sans

Arabic must never depend on unsupported glyph fallback. Define an explicit Arabic companion stack, such as Noto Sans Arabic, Cairo, Tajawal, or IBM Plex Sans Arabic, and validate each pairing visually.

Typography customization must affect:

- body and headings
- buttons and form labels
- navigation
- tables and data grids
- charts and tooltips
- dialogs and drawers

### 5.5 Preference model and persistence

Maintain a versioned appearance-preference model equivalent to:

```text
mode
contrast
direction
compact
navLayout
navColor
primaryPreset
radius
fontFamily
fontSize
```

Requirements:

- Apply preferences before first paint to prevent visual flash
- Persist non-sensitive settings across sessions
- Validate and migrate stored preference versions
- Fall back safely when stored values are malformed
- Update MUI theme, Emotion cache, document attributes, and responsive navigation without a full page reload
- Provide a live preview in the drawer and a dedicated settings route
- Test every control in Arabic, English, light, dark, RTL, and LTR

### 5.6 Theme quality rules

- Light and dark modes require complete token sets, not a background-only change.
- Contrast mode is separate from dark mode.
- Cards should use restrained borders, subtle shadows, and generous whitespace similar in quality to the supplied references.
- Settings groups may use compact labelled sections and visual option cards, but the final composition must be original to Jaii.
- All theme combinations must satisfy accessible contrast.
- The theme must cover MUI Core, Data Grid, Date Pickers, Charts, drawers, dialogs, menus, snackbars, maps, and custom Jaii compositions.

---

## 6. RTL and localization architecture

### 6.1 One translation source of truth

All user-facing translation values must exist only in namespaced JSON files:

```text
public/locales/
├── ar/
│   ├── common.json
│   ├── navigation.json
│   ├── appearance.json
│   ├── landing.json
│   ├── auth.json
│   ├── dashboard.json
│   ├── orders.json
│   ├── customers.json
│   ├── analytics.json
│   ├── partners.json
│   ├── settings.json
│   ├── pricing.json
│   ├── zones.json
│   ├── drivers.json
│   ├── notifications.json
│   ├── validation.json
│   └── errors.json
└── en/
    └── matching namespace files and key paths
```

The i18n configuration file contains configuration only. It must not contain embedded translation catalogs or duplicated user-facing strings.

Do not use generic `translation.json` files.

### 6.2 Language switching

A visible Arabic/English switcher is required on:

- Landing-page header and mobile menu
- Login page
- Dashboard header
- User or settings menu

Switching language must:

- Occur without a full page reload
- Preserve pathname, query string, hash, table filters, and pagination
- Update `<html lang>` and `<html dir>` immediately
- Persist across sessions
- Avoid raw translation keys and untranslated flashes

### 6.3 MUI RTL configuration

RTL support must include all of the following:

- Document `dir="rtl"` in Arabic and `dir="ltr"` in English
- MUI theme `direction` synchronized with the active language
- Correct Emotion RTL styling cache using the supported RTL prefixing plugin
- Cache/theme refresh when direction changes
- Logical CSS properties in custom styles
- Direction-aware icons, breadcrumbs, drawers, pagination, charts, timelines, and map controls

The sidebar and mobile drawer appear on the right in Arabic and on the left in English.

### 6.4 Saudi formatting

Shared utilities must format:

- SAR currency from minor units
- Gregorian dates and relative time
- Arabic or Latin digits according to product rules
- Saudi phone numbers beginning with `+966`
- Structured Saudi addresses
- Localized order and operational statuses

---

## 7. Dashboard shell

The authenticated shell is a core product feature.

### 7.1 Sidebar

Provide three responsive states:

1. **Expanded desktop sidebar**
   - Brand and workspace identity
   - Grouped translated navigation
   - Icons, labels, badges, and nested settings
   - User/workspace footer

2. **Collapsed desktop icon rail**
   - Explicit expand/collapse button
   - Accessible tooltips
   - Active-route state
   - Safe nested navigation
   - Persisted desktop preference

3. **Mobile drawer**
   - Correct RTL/LTR edge
   - Focus trapping and restoration
   - Closes after navigation
   - Keyboard and screen-reader support

Provide a `Ctrl/Cmd + B` shortcut when it does not conflict with the host environment.

### 7.2 Header

Include:

- Sidebar control
- Page title and responsive breadcrumbs
- Global command/search trigger
- Context-aware quick action
- Language switcher
- Theme control
- Appearance settings access
- Notifications
- User/workspace menu

### 7.3 Command palette and global search

Provide `Ctrl/Cmd + K` behavior for:

- Permitted route navigation
- Recent destinations
- Role-aware quick actions
- Orders and customers when APIs are available
- Arabic and English search labels
- Correct focus restoration

Unauthorized commands must never be exposed.

---

## 8. Routes

Routes must be registered explicitly using the actual React Router configuration. Filenames alone do not register routes.

Required routes:

```text
/
/login
/dashboard
/dashboard/orders
/dashboard/customers
/dashboard/analytics
/dashboard/partners
/dashboard/settings
/dashboard/settings/appearance
/dashboard/settings/pricing
/dashboard/settings/zones
/dashboard/settings/drivers
```

Requirements:

- Required URL segments must use path-bearing route entries.
- Pathless layout helpers must not be used where `/dashboard` or `/settings` is required.
- Every route parent with children must render `<Outlet />`.
- Route changes require route-tree inspection, type generation, automated route tests, and direct URL smoke testing.

---

## 9. Functional modules

### 9.1 Dashboard overview

- Date-range and comparison controls
- Revenue, orders, average order value, retention, and operational KPIs
- Revenue and order trends
- Order-status distribution
- Recent orders
- Attention queue
- Top services
- Role-aware quick actions

### 9.2 Orders

- Search, filters, sorting, and server pagination synchronized with the URL
- Responsive data grid on desktop and entity cards on mobile
- Order detail drawer or page
- Customer, address, items, totals, notes, assignment, and activity timeline
- Valid status workflow
- Driver assignment and reassignment
- Optimistic updates with rollback and duplicate-action prevention
- Permission-aware actions and exports

### 9.3 Customers

- Searchable, sortable, paginated customer list
- Responsive desktop and mobile presentation
- Contact information, addresses, orders, spend, loyalty, notes, and activity
- Permission-aware privacy controls
- Arabic-safe CSV export

### 9.4 Analytics

Organize analytics as a business narrative rather than a wall of charts:

- Business results
- Demand and order behavior
- Customer retention and cohorts
- Service/category performance
- Zone performance
- Driver and fulfillment performance where permitted
- Accessible summaries and exports

### 9.5 Settings

- Laundry profile and bilingual business identity
- Logo upload and validation
- Saudi contact and structured address fields
- Business hours
- Appearance preferences
- Category and item pricing in halalas/SAR
- Dirty-state protection and responsive save behavior

### 9.6 Zones and geofencing

- MapLibre map loaded only on the zones route
- Riyadh-centered initial view with future city support
- District selection
- Polygon create, edit, and delete
- Valid GeoJSON Polygon or MultiPolygon output
- Accessible non-map controls
- Configurable map style source
- Clear map and tile failure states

### 9.7 Drivers and partners

- Searchable lists and responsive cards
- Invitation, edit, status, availability, zone, and workload where supported
- Active-assignment conflict handling
- Laundry partner records and forms
- Role-aware actions

---

## 10. Data architecture

### 10.1 API layer

- One typed API client
- Configurable API base URL
- `credentials: "include"`
- `X-Requested-With` on mutating requests
- Abort-signal support
- Normalized success and error responses
- No silent conversion of errors into empty data

### 10.2 TanStack Query

- Query-key factories by domain
- Hooks for auth, orders, customers, analytics, notifications, settings, zones, drivers, and partners
- Targeted invalidation
- Optimistic mutations with rollback where appropriate
- No direct `fetch` calls inside React components

### 10.3 Mocking

- MSW runs only in development, tests, and component previews
- Mock handlers mirror the real API contract
- Demo data is clearly fictional and Saudi-localized
- No mock arrays inside feature components

---

## 11. Authentication and permissions

### 11.1 Authentication

- Backend-managed HttpOnly access and refresh cookies
- No access or refresh token in local storage, session storage, Zustand, or React state
- Login, logout, current-user, and refresh endpoints
- One coordinated refresh attempt after a `401`
- Retry the failed request once
- No refresh loops or request storms
- Safe internal post-login redirect
- Protected-content loading state without a flash

### 11.2 Roles

| Role | General access |
|---|---|
| `LAUNDRY_OWNER` | Full dashboard and settings access |
| `LAUNDRY_MANAGER` | Orders, customers, analytics, and permitted operational features |
| `LAUNDRY_STAFF` | Assigned operational work and permitted status updates |

Permissions affect:

- Route access
- Sidebar and command palette
- Actions and mutations
- Financial fields
- Contact details
- Exports
- Settings access

---

## 12. Reusable page patterns

Build reusable Jaii compositions using MUI components:

- Dashboard page container
- Page header and breadcrumbs
- Page toolbar and filter bar
- KPI and chart cards
- Data-grid wrapper
- Responsive entity cards
- Detail drawer
- Form section
- Settings section
- Save bar
- Status badge
- Activity timeline
- Empty, error, forbidden, and skeleton states

Feature pages must compose these patterns rather than create unrelated layouts.

---

## 13. Accessibility, responsiveness, and performance

### Accessibility

- WCAG 2.1 AA target
- Keyboard-complete navigation
- Visible focus
- Skip link and landmarks
- Focus trapping/restoration in dialogs and drawers
- Accessible tables and chart summaries
- Reduced-motion support
- Contrast checked across all theme presets

### Responsive targets

Test at:

- Small phone
- Large phone
- Tablet
- Laptop
- Wide desktop

Do not compress desktop data grids into unusable mobile tables. Use mobile entity cards and filter drawers where appropriate.

### Performance

- Route-based code splitting
- Lazy-load maps and chart-heavy modules
- Avoid duplicated UI libraries
- Optimize fonts, images, and icons
- Measure quality targets rather than claiming them without evidence

---

## 14. Validation and documentation

The project must include:

- Automated route registration tests
- Translation namespace parity tests
- Theme and RTL/LTR tests
- Authentication and permission tests
- Domain-hook and mutation tests
- Component showcase or Storybook
- Architecture and extension documentation
- Dependency baseline and no-downgrade verification

A feature is complete only when its relevant typecheck, lint, tests, route validation, and production build pass.

---

## 15. Definition of done

Jaii is ready for stakeholder review when:

- Landing page and dashboard are complete in Arabic and English
- MUI theme supports light, dark, system, contrast, six primary presets, four radii, compact density, three navigation layouts, two navigation color treatments, four font families, and adjustable base font size
- Appearance preferences persist without visual flash
- Sidebar expands, collapses, and works as an RTL/LTR mobile drawer
- Language switching preserves route and state
- All required routes open directly
- Authentication and permissions are enforced throughout the UI
- Overview, orders, customers, analytics, settings, zones, drivers, and partners are complete
- Every page has intentional loading, empty, error, offline, and forbidden states where relevant
- No component performs direct server fetching
- No production feature contains inline mock data
- Accessibility and responsive checks pass
- No dependency is below the repository baseline
- Typecheck, lint, tests, and production build pass
