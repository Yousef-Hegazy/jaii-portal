# Jaii — MUI Commercial Dashboard Micro-Phase Implementation Plan

## Confirmed starting point

- React Router Framework Mode with Vite
- `pnpm`
- New repository
- MUI and Emotion/RTL packages installed, but not configured
- Translation JSON files and `i18n.ts` may be present, but are not configured
- MUI Community/free packages only
- Mock-first data
- Demo authentication for now
- Landing page and admin dashboard in the same repository
- No Minimal license; its public demo and supplied screenshots are visual references only
- Public Sans for English and Tajawal for Arabic by default
- ApexCharts through `apexcharts` and `react-apexcharts`
- No automated test implementation during this roadmap
- Quality gates are typecheck, lint, build, direct-route checks, and manual visual review

The landing page and dashboard remain in one app because they share the same theme, localization, preference store, icons, typography, and brand language. React Router route-level splitting will keep the public bundle separate from dashboard-heavy modules.

---

# How to run the plan

For every phase:

1. Start a fresh agent session.
2. Paste the **Universal Micro-Phase Header**.
3. Paste only the current phase prompt below it.
4. Do not paste previous phase prompts.
5. Do not continue while the current phase gate is visibly failing.
6. Save screenshots after visual phases so later agents can compare rather than redesign blindly.

---

# Cost-first model strategy

| Model | Use |
|---|---|
| `deepseek/deepseek-v4-flash` | Default implementation model; configuration, routing, state, mocks, forms, tables, and business screens |
| `minimax/minimax-m2.7` | High-visibility UI composition and visual polish only |
| `z-ai/glm-5` | Difficult architecture: RTL/Emotion, theme generation, first-paint state, chart abstraction, maps |
| `nvidia/nemotron-3-ultra:free` | Read-only milestone audits and repository inventories |
| `google/gemma-4.31b-it:free` | Read-only Arabic/English copy and translation review |

### Fallbacks

- DeepSeek unavailable: use GLM-5 only for the blocked phase, or retry DeepSeek later.
- MiniMax unavailable: use GLM-5 with the same narrow visual prompt.
- GLM-5 unavailable: split the phase in half and use DeepSeek.
- Free reviewer unavailable: skip the review rather than blocking implementation.
- Do not use Qwen in this plan.

---

# Mandatory state-ownership contract

Zustand is the sole owner of mutable, cross-route **client application state**.

Use focused Zustand stores or slices for:

- appearance preferences and resolved UI settings
- selected language preference
- direction override
- navigation layout and sidebar expanded/collapsed state
- customizer open/closed state
- command-palette recent destinations
- temporary demo session and role
- client-only notification read state
- other cross-route UI preferences

Do **not** create custom React Context providers such as:

- `ColorModeContext`
- `ThemeModeContext`
- `SettingsContext`
- `SidebarContext`
- `AuthContext`
- `AppContext`

Library providers are still allowed and required where applicable:

- MUI `ThemeProvider`
- Emotion `CacheProvider`
- TanStack `QueryClientProvider`
- React Router providers
- i18next/react-i18next integration

Those providers must consume or synchronize with Zustand; they must not become competing application-state stores.

State belongs elsewhere when appropriate:

| State category | Owner |
|---|---|
| Cross-route client UI/preferences | Zustand |
| Remote/mock API data | TanStack Query |
| Shareable filters, page, sorting, date range | URL search parameters |
| Form values and validation | React Hook Form |
| One-component transient state | Local `useState` |
| Translation resources/runtime | i18next, synchronized from the Zustand language preference |
| MUI rendering context | MUI `ThemeProvider`, with theme derived from Zustand selectors |

Use narrow Zustand selectors so components subscribe only to the fields they need. Do not subscribe every component to the entire store. Do not create one uncontrolled “god store”; use coherent slices or focused stores.

If server rendering is enabled, follow the current official Zustand SSR/hydration guidance. Application state must still live in Zustand; any minimal provider used solely to scope a per-request vanilla store is infrastructure, not a second state system.

---

# Universal Micro-Phase Header

```text
Work only on the single Jaii phase included below.

Before editing:
- Read SPEC.md, AGENTS.md, and docs/IMPLEMENTATION_STATUS.md if they exist.
- Inspect the repository and installed package versions.
- Check current official documentation for every version-sensitive API used in this phase.
- State a short plan of no more than five steps.

Rules:
- Preserve completed work and existing package versions.
- Never downgrade any dependency.
- Use pnpm.
- Use MUI as the only UI foundation.
- Do not add shadcn, Radix-based UI kits, or Tailwind UI code.
- Use only MUI Community/free functionality.
- All mutable cross-route client application state must use Zustand.
- Do not create custom React Context state providers.
- Use TanStack Query for server/mock API state, URL parameters for shareable filters, React Hook Form for forms, and local state only for truly component-local behavior.
- Use narrow Zustand selectors rather than subscribing to an entire store.
- Do not copy Minimal source code, proprietary assets, or exact layouts.
- Reproduce its quality principles with original Jaii composition.
- Use logical direction-aware styling.
- Do not add automated tests in this phase.
- Do not expand the task into later phases.
- Avoid broad rewrites and premature abstractions.

Before finishing:
- Run the available typecheck, lint, and production build.
- Open every route changed by this phase directly.
- Manually check the exact visible behavior required by the phase.
- Update docs/IMPLEMENTATION_STATUS.md with changed files, packages, commands, results, limitations, and the next phase.
- Explicitly state: No existing dependencies downgraded.
```

---

# Milestone A — Stable MUI, localization, RTL, and appearance foundation

## Phase 0 — Repository baseline

**Model:** `nvidia/nemotron-3-ultra:free`  
**Cost:** Free review  
**Outcome:** Reliable repository map; no UI work

```text
Audit the new Jaii repository without redesigning or implementing screens.

Create:
- AGENTS.md with repository rules and commands
- docs/IMPLEMENTATION_STATUS.md with a phase checklist
- docs/DEPENDENCY_BASELINE.md with current direct package versions
- docs/ROUTE_INVENTORY.md with current and planned URLs

Confirm the actual React Router app directory, routes file, scripts, MUI packages, RTL packages, and current i18n files. Flag missing scripts or ambiguous translation sources. Do not install packages or modify product UI.
```

**Gate:** The next agent can identify the exact app root, route config, and current dependency baseline.

---

## Phase 1 — Root provider skeleton

**Model:** `deepseek/deepseek-v4-flash`  
**Cost:** Very low  
**Outcome:** MUI renders correctly at the application root

```text
Configure the root application provider stack using the installed MUI and Emotion versions.

Implement only:
- MUI ThemeProvider integration point
- CssBaseline
- Emotion CacheProvider integration point
- a minimal app providers component
- one simple MUI-rendered home placeholder

Do not create a custom settings, theme-mode, color-mode, sidebar, or app-state Context. The MUI and Emotion providers are rendering infrastructure only. Zustand application state is introduced in Phase 6.

Do not implement RTL switching, full theme presets, localization, or the dashboard shell yet. Use the installed official MUI APIs and preserve React Router Framework Mode.
```

**Gate:** `/` renders MUI typography/button/card styling and the production build succeeds.

---

## Phase 2 — Translation source of truth

**Model:** `deepseek/deepseek-v4-flash`  
**Cost:** Very low  
**Outcome:** Clean namespaced localization architecture

```text
Configure i18next/react-i18next using one source of truth: namespaced JSON files under public/locales/{ar|en}/.

Use configuration-only i18n.ts with no embedded translations.

Create or normalize only these initial namespaces:
- common
- navigation
- appearance
- landing
- auth
- dashboard
- errors

Remove generic translation.json usage if present. Configure Arabic as default and English as fallback. Add a tiny language switch on the root placeholder to prove both languages load. Do not style it as the final control.
```

**Gate:** Switching language changes visible text; browser requests the intended namespace files; no duplicate translation catalogue exists.

---

## Phase 3 — Correct MUI RTL/LTR engine

**Model:** `z-ai/glm-5`  
**Cost:** Controlled premium spend  
**Outcome:** Direction changes correctly across MUI and Emotion

```text
Implement the official MUI RTL architecture for the installed versions.

Configure:
- document lang and dir
- theme direction
- separate or correctly regenerated Emotion caches for LTR and RTL
- stylis prefixer plus MUI RTL plugin
- correct behavior for MUI portal components

Connect direction to the selected language: Arabic RTL, English LTR. Add a small Dialog and TextField proof section to catch portal and input-direction errors. Do not implement the final appearance drawer.
```

**Gate:** TextField, Dialog, spacing, and document direction visibly mirror correctly without reload.

---

## Phase 4 — Font and icon foundation

**Model:** `deepseek/deepseek-v4-flash`  
**Cost:** Very low  
**Outcome:** Premium bilingual typography and consistent icons

```text
Add and configure:
- Public Sans for English
- Tajawal for Arabic
- @iconify/react as the single application icon layer

Prefer self-hosted/fontsource packages compatible with the repository. Create typography tokens for headings, body, captions, buttons, and navigation. Switch the active font stack with language. Add a small typography/icon proof section to the existing placeholder.
```

**Gate:** Arabic visibly uses Tajawal, English uses Public Sans, and icons render without another icon library.

---

## Phase 5 — Base MUI theme anatomy

**Model:** `z-ai/glm-5`  
**Cost:** Controlled premium spend  
**Outcome:** Maintainable theme architecture

```text
Create the theme architecture only.

Define:
- semantic palette extensions
- neutral grey scale
- typography
- spacing
- shape
- shadows
- transitions
- z-index strategy
- custom TypeScript theme augmentation
- component override file structure

Use Cyan as the initial primary main color. Add polished defaults for Button, Card, Paper, TextField, Tooltip, Dialog, Drawer, Chip, and IconButton. Do not add theme switching controls yet.
```

**Gate:** Existing proof components look coherent and premium in one default light theme.

---


## Immediate remediation — Use this if the current Phase 6 created Context state

**Model:** `deepseek/deepseek-v4-flash`  
**Run before continuing to the revised Phase 6/7 sequence**

```text
Refactor the current Jaii mode/theme implementation so mutable global client state is owned by Zustand, not custom React Context.

Inspect the current code and remove custom application-state providers such as:
- ColorModeContext
- ThemeModeContext
- SettingsContext
- AppContext

Keep only required library providers such as MUI ThemeProvider and Emotion CacheProvider.

Install Zustand with pnpm if it is not installed.

Create a typed Zustand settings store containing at minimum:
- mode: light | dark | system
- actions to set/reset mode

If other global appearance values already exist, include them in the same coherent settings slice rather than leaving duplicate state.

Requirements:
- MUI ThemeProvider derives its theme from a narrow Zustand selector.
- System-mode resolution listens to prefers-color-scheme without becoming a second preference source.
- Components call Zustand actions directly.
- Do not mirror mode in Context, local state, and Zustand simultaneously.
- Preserve current visual behavior and existing dependency versions.
- If React Router SSR is enabled, follow current official Zustand SSR/hydration guidance and avoid request-shared mutable state.
- Run typecheck, lint, and build.
- Update docs/IMPLEMENTATION_STATUS.md and state that custom global-state Context was removed.
```

**Gate:** Searching the source finds no custom mode/settings Context, and mode switching works through Zustand only.

---

## Phase 6 — Zustand global UI-state foundation

**Model:** `z-ai/glm-5`  
**Cost:** Controlled premium spend  
**Outcome:** One unambiguous global client-state architecture

```text
Install Zustand and establish the global client-state architecture before implementing any theme switching.

Create focused typed slices or stores for:
- appearance settings: mode, contrast, direction override, compact, nav layout, nav color, primary preset, radius, font family, font size
- locale preference
- navigation/sidebar preference
- overlay UI such as the appearance drawer

Requirements:
- Zustand is the sole source of truth for mutable cross-route application state.
- Do not create or retain custom React Context state providers.
- MUI ThemeProvider and Emotion CacheProvider may remain, but they must derive their values from Zustand.
- i18next must synchronize from the Zustand language preference without duplicating the preference source.
- Use named actions, defaults, typed selectors, and narrow subscriptions.
- Add versioned persistence, safe parsing, reset, and migration shape.
- Implement first-paint bootstrap for persisted mode, direction, and language to avoid visible flash.
- Follow current official Zustand SSR/hydration guidance if SSR is enabled.
- Do not implement the visual theme controls yet.

If a custom ColorModeContext, ThemeModeContext, SettingsContext, or equivalent already exists, remove it and migrate its state/actions to Zustand.
```

**Gate:** Global UI preferences are readable and writable through Zustand only; refresh preserves them; no custom app-state Context remains.

---

## Phase 7 — Light, dark, and system mode

**Model:** `deepseek/deepseek-v4-flash`  
**Cost:** Very low  
**Outcome:** Complete mode behavior driven by Zustand

```text
Implement light, dark, and system modes using the Phase 5 theme architecture and the Phase 6 Zustand settings store.

Requirements:
- selected mode is stored in Zustand
- resolved light/dark mode is derived without creating another source of truth
- system mode follows OS preference changes
- complete semantic tokens in both modes
- no page reload
- a temporary small mode selector that calls Zustand actions
- accessible surfaces, borders, text, menus, dialogs, and inputs
- MUI ThemeProvider consumes a memoized theme derived from narrow Zustand selectors

Do not use React Context for mode state. Do not use MUI color-scheme state as a competing application preference store. Do not add color presets or the final customizer drawer.
```

**Gate:** Light, dark, and system affect all proof components; mode survives refresh; React DevTools shows no custom mode/settings Context.

---

## Phase 8 — Six primary-color presets

**Model:** `deepseek/deepseek-v4-flash`  
**Cost:** Very low  
**Outcome:** Minimal-inspired tonal presets driven by Zustand

```text
Add six generated primary presets to the theme and store the selected preset in Zustand:
- Emerald #00A76F
- Cyan #078DEE
- Purple #7635DC
- Blue #0C68E9
- Orange #FDA92D
- Red #FF3030

Each preset must generate lighter, light, main, dark, darker, contrast, hover, selected, focus, and translucent states. Add a temporary selector that uses a Zustand action. Keep Cyan as default. Remove hard-coded primary colors from proof components.

Do not introduce Context or duplicate local/global preset state.
```

**Gate:** Every preset is attractive in light and dark mode, persists after refresh, and has one Zustand source of truth.

---

## Phase 9 — Shape, density, contrast, and typography preferences

**Model:** `deepseek/deepseek-v4-flash`  
**Cost:** Very low  
**Outcome:** Remaining theme dimensions driven by Zustand

```text
Connect these working preferences to the existing Zustand settings store:
- radius: compact, balanced, soft, rounded
- compact mode: off/on
- contrast: standard/high
- font family: Public Sans, Inter, DM Sans, Nunito Sans, each with Tajawal Arabic fallback
- base font size: 14–18 px

Expose temporary controls that call Zustand actions. Apply settings to real MUI cards, inputs, buttons, tables, dialogs, and navigation-sized samples.

Do not mirror the same values in component state or React Context. Local component state may be used only for transient interaction while committing the authoritative value to Zustand.
```

**Gate:** Each setting causes a global visible change, persists, and has no duplicate state source.

---

## Phase 10 — Floating settings trigger and drawer shell

**Model:** `minimax/minimax-m2.7`  
**Cost:** Visual spend  
**Outcome:** Beautiful Minimal-quality customizer shell

```text
Design the floating appearance Fab and responsive MUI Drawer using the supplied customization screenshots as quality references.

Implement only the shell:
- translated floating trigger
- logical RTL/LTR edge
- responsive drawer width
- title, reset button, close button
- scrollable grouped sections
- elegant cards, labels, icons, spacing, and dividers

Use original Jaii styling. The drawer open state and reset action must use Zustand. Connect the reset button, but leave detailed controls to the next two phases. Do not create a drawer/settings Context.
```

**Gate:** The trigger and drawer already look like a premium template in Arabic and English.

---

## Phase 11 — Customizer core controls

**Model:** `deepseek/deepseek-v4-flash`  
**Cost:** Very low  
**Outcome:** Core controls inside the real drawer

```text
Connect these existing Zustand preferences and actions to polished controls inside the customizer:
- light/dark/system
- standard/high contrast
- auto/LTR/RTL direction
- compact off/on

Remove their temporary proof-page controls. Use visual option cards and switches consistent with the drawer design. Direction Auto follows language; manual direction is a preview override.
```

**Gate:** All four controls work immediately, persist, and remain usable in RTL.

---

## Phase 12 — Customizer visual controls

**Model:** `minimax/minimax-m2.7`  
**Cost:** Visual spend  
**Outcome:** Complete premium customizer

```text
Add polished controls for:
- vertical/horizontal/mini navigation preview options
- integrated/apparent navigation color
- six color presets
- four radius choices
- four font-family choices
- 14–18 px font-size slider

Use visual thumbnails and swatches inspired by the supplied references but with original Jaii artwork. Connect every option directly to narrow Zustand selectors/actions; do not duplicate values in local state except for transient slider interaction.
```

**Gate:** The complete customizer is visually impressive and every option visibly changes the proof UI.

---

## Phase 13 — Appearance settings route

**Model:** `deepseek/deepseek-v4-flash`  
**Cost:** Very low  
**Outcome:** Permanent full-page customization route

```text
Register `/dashboard/settings/appearance`.

Create a clean settings page that reuses the same controls and store as the floating drawer, plus a larger live preview of a card, form, status chips, navigation sample, and small chart placeholder. Do not duplicate preference logic.
```

**Gate:** Direct URL works and drawer/page stay synchronized.

---

# Milestone B — Premium dashboard shell

## Phase 14 — Route map and placeholder hierarchy

**Model:** `deepseek/deepseek-v4-flash`  
**Cost:** Very low  
**Outcome:** Correct registered route tree

```text
Create explicit React Router routes and minimal MUI placeholders for:
- /
- /login
- /dashboard
- /dashboard/orders
- /dashboard/customers
- /dashboard/analytics
- /dashboard/partners
- /dashboard/settings
- /dashboard/settings/appearance
- /dashboard/settings/pricing
- /dashboard/settings/zones
- /dashboard/settings/drivers
- /dashboard/showcase/components
- /dashboard/showcase/charts
- /dashboard/showcase/forms
- /dashboard/showcase/tables

Use path-bearing parent routes and Outlet. Do not design the pages.
```

**Gate:** Every URL opens directly with no route mismatch.

---

## Phase 15 — Dashboard frame

**Model:** `minimax/minimax-m2.7`  
**Cost:** Visual spend  
**Outcome:** Premium structural shell

```text
Create the original Jaii dashboard frame:
- navigation region
- header region
- content region
- responsive max widths and gutters
- background/surface hierarchy
- skip link
- route outlet

Use Minimal only as a quality benchmark for whitespace and refinement. Do not implement detailed navigation or header actions yet.
```

**Gate:** Placeholder pages already feel like one commercial dashboard.

---

## Phase 16 — Expanded vertical navigation

**Model:** `minimax/minimax-m2.7`  
**Cost:** Visual spend  
**Outcome:** Beautiful full sidebar

```text
Implement the expanded vertical navigation:
- temporary Jaii wordmark/logo placeholder
- translated grouped links
- icons
- active states
- nested settings/showcase groups
- workspace/user footer
- integrated and apparent nav color modes
- correct side in RTL/LTR
- independent scrolling

Use the shared route configuration as the navigation source.
```

**Gate:** All links work; Arabic labels fit; both nav color modes look premium.

---

## Phase 17 — Mini navigation mode

**Model:** `minimax/minimax-m2.7`  
**Cost:** Visual spend  
**Outcome:** Collapsible icon rail

```text
Implement Mini navigation mode and explicit expand/collapse behavior.

Include:
- stable icon rail
- accessible tooltips
- active marker
- nested menu flyout
- sidebar/navigation preference stored in Zustand
- persisted selection
- smooth reduced-motion-safe transition
- Ctrl/Cmd+B shortcut

Do not redesign expanded navigation.
```

**Gate:** Switching vertical ↔ mini is polished, persistent, and works in RTL/LTR.

---

## Phase 18 — Horizontal navigation mode

**Model:** `minimax/minimax-m2.7`  
**Cost:** Visual spend  
**Outcome:** Third navigation layout

```text
Implement the horizontal desktop navigation option below the header.

Reuse the same navigation configuration and permissions shape. Support grouped menus, active state, overflow-safe behavior, integrated/apparent color modes, and RTL ordering. Do not change mobile behavior yet.
```

**Gate:** All three navigation options work through the customizer without route loss.

---

## Phase 19 — Mobile dashboard navigation

**Model:** `minimax/minimax-m2.7`  
**Cost:** Visual spend  
**Outcome:** First-class mobile shell

```text
Implement the mobile dashboard header and temporary Drawer navigation.

Requirements:
- correct opening edge in RTL/LTR
- focus and close behavior
- translated groups
- active state
- closes after navigation
- compact brand and user area
- no horizontal overflow

Reuse the existing nav configuration.
```

**Gate:** Small-phone navigation is usable and visually finished in both languages.

---

## Phase 20 — Header essentials

**Model:** `minimax/minimax-m2.7`  
**Cost:** Visual spend  
**Outcome:** Complete primary header

```text
Design and implement:
- sidebar/mobile trigger
- page title and responsive breadcrumbs
- language switcher
- compact mode selector
- appearance-drawer trigger
- placeholder notification button
- user avatar/menu
- demo logout item

Keep command search and notification content for later phases.
```

**Gate:** Header is balanced in vertical, mini, horizontal, mobile, RTL, and LTR modes.

---

## Phase 21 — Command palette

**Model:** `deepseek/deepseek-v4-flash`  
**Cost:** Very low  
**Outcome:** Premium navigation search

```text
Add a MUI Dialog-based Ctrl/Cmd+K command palette.

Support:
- route navigation
- translated labels and keywords
- grouped results
- recent routes stored in a focused Zustand UI slice
- keyboard navigation
- disabled placeholders for future order/customer search

Use the shared route/navigation data.
```

**Gate:** Keyboard opens, searches, navigates, closes, and restores focus correctly.

---

## Phase 22 — Notifications experience

**Model:** `minimax/minimax-m2.7`  
**Cost:** Visual spend  
**Outcome:** Finished notification popover

```text
Create a polished notification popover with fictional data. Store client-only read/unread UI state in a focused Zustand slice until server-backed notification state is introduced:
- unread badge
- order, customer, driver, and system categories
- read/unread styling
- timestamps
- mark all read
- empty state
- links to relevant routes

Use a mobile-friendly presentation and translated copy. Data hooks come later.
```

**Gate:** Notification UI looks production-ready in light/dark and RTL/LTR.

---

# Milestone C — Showcase library

## Phase 23 — Component showcase route

**Model:** `minimax/minimax-m2.7`  
**Cost:** Visual spend  
**Outcome:** `/dashboard/showcase/components`

```text
Build a premium component showcase using the existing MUI theme:
- buttons and icon buttons
- chips/statuses
- avatars
- alerts
- cards
- menus
- dialogs
- drawers
- tooltips
- tabs
- accordions
- empty/loading/error examples

Organize it like a commercial template catalogue, not a debug page.
```

**Gate:** Every theme dimension visibly affects the catalogue.

---

## Phase 24 — ApexCharts infrastructure

**Model:** `z-ai/glm-5`  
**Cost:** Controlled premium spend  
**Outcome:** Reusable MUI-aware chart layer

```text
Install `apexcharts` and `react-apexcharts`.

Create:
- SSR-safe/lazy chart wrapper
- shared MUI-to-Apex theme options
- direction-aware toolbar, tooltip, legend, and labels
- semantic chart color helpers
- reusable chart card shell
- no-data and loading chart states

Render one small proof chart only.
```

**Gate:** Proof chart works after direct reload, in dark mode, in Arabic RTL, and after color-preset switching.

---

## Phase 25 — Core charts showcase

**Model:** `minimax/minimax-m2.7`  
**Cost:** Visual spend  
**Outcome:** First half of `/dashboard/showcase/charts`

```text
Create original premium examples for:
- area
- line
- column
- horizontal bar

Include useful mock business labels, compact controls, legends, and responsive sizing. Reuse the chart wrapper and semantic colors.
```

**Gate:** Four charts look coherent and remain readable on tablet and phone.

---

## Phase 26 — Advanced charts showcase

**Model:** `minimax/minimax-m2.7`  
**Cost:** Visual spend  
**Outcome:** Complete charts catalogue

```text
Add:
- donut
- radial bar
- mixed line/column
- range or timeline-style example supported by the installed ApexCharts version
- sparkline KPI cards

Provide translated chart titles and realistic Jaii demo labels.
```

**Gate:** Chart showcase feels comparable in polish to a premium dashboard theme.

---

## Phase 27 — Forms showcase

**Model:** `deepseek/deepseek-v4-flash`  
**Cost:** Very low  
**Outcome:** `/dashboard/showcase/forms`

```text
Install only the needed free packages for React Hook Form and Zod.

Build a visual forms catalogue:
- text, password, number
- select/autocomplete
- checkbox/radio/switch
- date input or MUI X Community picker if added
- upload placeholder
- validation and disabled states
- multi-section form layout

Use translated labels and MUI components.
```

**Gate:** Forms are dense but elegant, and Arabic field alignment is correct.

---

## Phase 28 — Tables showcase

**Model:** `deepseek/deepseek-v4-flash`  
**Cost:** Very low  
**Outcome:** `/dashboard/showcase/tables`

```text
Install and configure MUI X Data Grid Community only.

Build examples for:
- polished basic table
- sorting
- filtering/quick search
- pagination
- selection
- custom cells/status/avatar/actions
- loading and no-results overlays
- responsive fallback card list

Do not use Pro or Premium APIs.
```

**Gate:** No license warning; table theme matches Jaii; mobile fallback is usable.

---

# Milestone D — Data and demo session

## Phase 29 — API and Query foundation

**Model:** `deepseek/deepseek-v4-flash`  
**Cost:** Very low  
**Outcome:** Typed mock-ready data layer

```text
Install TanStack Query and create:
- root QueryClient provider
- typed fetch wrapper
- normalized API error type
- query key factories
- placeholder domain hook folders

Components must not call fetch directly. Do not add domain data or MSW yet.
```

**Gate:** App still builds and a tiny non-visual query proof succeeds.

---

## Phase 30 — MSW and Saudi demo dataset

**Model:** `deepseek/deepseek-v4-flash`  
**Cost:** Very low  
**Outcome:** Coherent mock backend

```text
Install MSW and add realistic fictional Saudi demo data for:
- overview
- orders
- customers
- notifications
- pricing
- drivers
- partners
- zones
- analytics

Use SAR in halalas, Gregorian dates, Riyadh/Jeddah-style districts, Arabic/English names, and Saudi phones. Add mock endpoints with basic filters and latency. Keep data outside components.
```

**Gate:** MSW starts only in development and existing pages do not break.

---

## Phase 31 — Demo authentication and permissions

**Model:** `deepseek/deepseek-v4-flash`  
**Cost:** Very low  
**Outcome:** Visual demo session

```text
Implement a simple demo session with a focused Zustand session store and three switchable roles:
- owner
- manager
- staff

Add protected dashboard routing, demo login redirect, user menu role switch for development, and a small permission helper. Do not create AuthContext. Do not implement real tokens, refresh, or backend security.
```

**Gate:** `/dashboard` redirects when demo session is off; each role changes visible navigation/actions.

---

# Milestone E — Jaii product screens

## Phase 32 — Overview visual composition

**Model:** `minimax/minimax-m2.7`  
**Cost:** Visual spend  
**Outcome:** Beautiful overview layout before data wiring

```text
Design `/dashboard` using static typed placeholders:
- greeting/page header
- period selector
- KPI cards
- revenue chart card
- order-status chart
- recent orders
- attention queue
- top services
- quick actions

Use the existing chart wrappers and dashboard patterns. Focus only on composition and responsiveness.
```

**Gate:** Overview looks like a premium commercial template before data integration.

---

## Phase 33 — Overview mock-data wiring

**Model:** `deepseek/deepseek-v4-flash`  
**Cost:** Very low  
**Outcome:** Functional overview

```text
Replace the overview placeholders with TanStack Query hooks backed by MSW.

Add:
- period switching
- loading skeletons
- no-data state
- error state
- localized SAR/date/number formatting
- role-aware financial visibility

Do not redesign the page.
```

**Gate:** Period changes update visible metrics/charts and all data states are usable.

---

## Phase 34 — Orders list

**Model:** `deepseek/deepseek-v4-flash`  
**Cost:** Very low  
**Outcome:** Functional orders management list

```text
Build `/dashboard/orders` using MUI X Data Grid Community and a mobile card fallback.

Include:
- search
- status filter
- driver filter
- date filter
- sorting
- pagination
- status chips
- amount/date formatting
- row action menu
- URL-synchronized filters

Use query hooks and MSW.
```

**Gate:** Filters survive refresh; Arabic and mobile layouts remain usable.

---

## Phase 35 — Order details and workflow

**Model:** `minimax/minimax-m2.7`  
**Cost:** Visual spend  
**Outcome:** Premium order detail experience

```text
Create an order detail Drawer:
- customer/contact
- structured address
- item list and totals
- status timeline
- driver
- notes
- assign-driver dialog
- allowed status actions

Wire mock mutations with visible pending/success/error feedback. Keep business rules simple and explicit.
```

**Gate:** Detail flow feels polished and mutations update the list/detail consistently.

---

## Phase 36 — Customers

**Model:** `deepseek/deepseek-v4-flash`  
**Cost:** Very low  
**Outcome:** Customer CRM route

```text
Build `/dashboard/customers`:
- searchable/paginated Data Grid
- mobile cards
- spend, order count, last order, loyalty, district
- customer detail Drawer
- addresses, order history, notes, activity
- add-note mock mutation
- localized CSV export using browser APIs

Use only Community/free features.
```

**Gate:** Search, detail, note, and export work in Arabic and English.

---

## Phase 37 — Analytics

**Model:** `minimax/minimax-m2.7`  
**Cost:** Visual spend  
**Outcome:** Decision-oriented analytics page

```text
Design and wire `/dashboard/analytics` using ApexCharts and mock hooks.

Sections:
- result summary
- revenue/demand
- customer retention
- category mix
- district performance
- fulfillment performance

Include period comparison, loading/error/no-data states, and concise insight text. Avoid a wall of unrelated charts.
```

**Gate:** Analytics tells a clear business story on desktop and remains understandable on mobile.

---

## Phase 38 — Laundry profile settings

**Model:** `deepseek/deepseek-v4-flash`  
**Cost:** Very low  
**Outcome:** `/dashboard/settings`

```text
Build the laundry profile form:
- Arabic and English name
- logo placeholder upload/preview
- email and Saudi phone
- structured address
- business hours
- simple service status
- React Hook Form and Zod
- dirty state and save feedback

Use mock query/mutation hooks.
```

**Gate:** Validation, save, language, and mobile layouts work.

---

## Phase 39 — Pricing settings

**Model:** `deepseek/deepseek-v4-flash`  
**Cost:** Very low  
**Outcome:** `/dashboard/settings/pricing`

```text
Build a category and item pricing manager:
- service categories
- item name Arabic/English
- price stored in halalas
- add/edit/archive
- desktop table
- mobile cards
- save/cancel
- duplicate and negative-value validation

Use mock endpoints and role permissions.
```

**Gate:** Currency remains accurate and owner-only actions are hidden for other roles.

---

## Phase 40 — Zones map foundation

**Model:** `z-ai/glm-5`  
**Cost:** Controlled premium spend  
**Outcome:** Stable MapLibre route

```text
Install MapLibre and the compatible React wrapper only after checking current official APIs.

Build `/dashboard/settings/zones` with:
- lazy client-only map
- configurable free development style
- Riyadh initial view
- demo district GeoJSON
- themed map container
- map loading and failure states

Do not add drawing/editing yet.
```

**Gate:** Direct reload works with no SSR error and the map bundle does not load on unrelated routes.

---

## Phase 41 — Zone editor

**Model:** `z-ai/glm-5`  
**Cost:** Controlled premium spend  
**Outcome:** Functional geofencing demo

```text
Add a compatible free polygon editor after checking installed MapLibre APIs.

Support:
- create/edit/delete polygon
- district selection
- zone name and active state
- semantic zone colors
- valid GeoJSON storage in MSW
- non-map zone list controls
- save/cancel feedback

Use clearly labelled demo boundaries.
```

**Gate:** A zone can be created, edited, saved, reloaded, disabled, and deleted.

---

## Phase 42 — Drivers and partners

**Model:** `deepseek/deepseek-v4-flash`  
**Cost:** Very low  
**Outcome:** Remaining operations routes

```text
Build:
- `/dashboard/settings/drivers`
- `/dashboard/partners`

Include searchable desktop lists, mobile cards, status, Saudi phone, zone/coverage, invite/add/edit dialogs, active toggle, and simple conflict feedback. Reuse established table, form, card, and detail patterns.
```

**Gate:** Both routes feel consistent with orders/customers and role controls work.

---

## Phase 43 — Demo login page

**Model:** `minimax/minimax-m2.7`  
**Cost:** Visual spend  
**Outcome:** Premium public authentication entry

```text
Design `/login` as a premium Jaii demo login:
- brand presentation
- email/password fields
- role/demo account shortcuts
- language switch
- mode switch
- useful illustration or clean original CSS composition
- responsive mobile layout

Connect it to the existing demo session only.
```

**Gate:** Login visually matches landing/dashboard and redirects correctly.

---

# Milestone F — Public landing page

## Phase 44 — Landing header and hero

**Model:** `minimax/minimax-m2.7`  
**Cost:** Visual spend  
**Outcome:** Strong first impression

```text
Design the public header and hero:
- original Jaii placeholder brand
- translated navigation
- language and mode controls
- login and CTA
- mobile menu
- customer → driver → laundry story
- original HTML/CSS product preview

Use legally usable remote placeholder imagery only through one centralized asset map. Do not copy Minimal’s layout.
```

**Gate:** Hero is premium in Arabic/English and phone/desktop.

---

## Phase 45 — Landing product sections

**Model:** `minimax/minimax-m2.7`  
**Cost:** Visual spend  
**Outcome:** Complete product narrative

```text
Add:
- value strip
- how it works
- customer/driver/laundry/admin benefits
- operations capabilities
- dashboard preview
- service-quality section

Reuse real dashboard cards/charts where practical so the marketing preview is credible.
```

**Gate:** Sections have varied, coherent composition rather than repetitive card grids.

---

## Phase 46 — Landing trust, FAQ, CTA, footer

**Model:** `minimax/minimax-m2.7`  
**Cost:** Visual spend  
**Outcome:** Complete landing page

```text
Add:
- clearly fictional testimonials
- accessible FAQ
- final CTA
- complete footer
- legal/contact placeholders
- translated copy
- subtle reduced-motion-safe interactions

Do not invent real customer numbers or endorsements.
```

**Gate:** `/` is complete enough to publish as a visual demo.

---

# Milestone G — Review and polish

## Phase 47 — Arabic and translation review

**Model:** `google/gemma-4.31b-it:free`  
**Cost:** Free review  
**Outcome:** Actionable language report

```text
Review the running Jaii UI and translation catalogues without editing code.

Report:
- raw or missing keys
- unnatural Arabic
- mixed-language strings
- navigation terminology inconsistencies
- validation/error wording
- long-label risks
- incorrect namespace ownership

Write findings to docs/ARABIC_REVIEW.md with file/key references.
```

**Gate:** Review report is precise enough for a coding agent to apply.

---

## Phase 48 — Apply Arabic and RTL corrections

**Model:** `deepseek/deepseek-v4-flash`  
**Cost:** Very low  
**Outcome:** Clean bilingual UI

```text
Apply only the actionable issues in docs/ARABIC_REVIEW.md.

Also manually inspect:
- all Drawer and Dialog edges
- breadcrumbs and chevrons
- tables and pagination
- ApexCharts legends/tooltips
- form adornments
- map controls
- mobile navigation

Do not redesign unrelated screens.
```

**Gate:** No obvious raw keys, clipping, or direction mistakes remain.

---

## Phase 49 — Theme matrix polish

**Model:** `minimax/minimax-m2.7`  
**Cost:** Visual spend  
**Outcome:** Customizer combinations remain beautiful

```text
Visually review and refine the full appearance matrix:
- light/dark
- standard/high contrast
- six presets
- four radii
- compact on/off
- four font choices
- vertical/mini/horizontal nav
- integrated/apparent nav

Fix only inconsistencies in tokens, component overrides, contrast, spacing, and customizer previews.
```

**Gate:** No selectable combination looks unfinished or broken.

---

## Phase 50 — Responsive polish

**Model:** `minimax/minimax-m2.7`  
**Cost:** Visual spend  
**Outcome:** Commercial mobile/tablet quality

```text
Review all public and dashboard routes at:
- small phone
- large phone
- tablet
- laptop
- wide desktop

Fix horizontal overflow, toolbar wrapping, card grids, chart sizing, Data Grid fallbacks, Drawer widths, navigation transitions, and long Arabic labels. Do not add new features.
```

**Gate:** Every route is usable and attractive at the target sizes.

---

## Phase 51 — Performance and route splitting

**Model:** `deepseek/deepseek-v4-flash`  
**Cost:** Very low  
**Outcome:** Fast visual demo

```text
Audit and improve:
- route lazy loading
- ApexCharts loading
- MapLibre loading
- font loading
- placeholder image sizing
- duplicate imports
- icon imports
- large mock-data imports
- production console warnings

Keep behavior and appearance unchanged. Record bundle/build observations without inventing scores.
```

**Gate:** Production build succeeds; maps/charts are not in unrelated initial route chunks where avoidable.

---

## Phase 52 — Final independent audit

**Model:** `nvidia/nemotron-3-ultra:free`  
**Cost:** Free review  
**Outcome:** Release decision report

```text
Audit Jaii without implementing fixes.

Check:
- SPEC coverage
- route accessibility
- MUI-only consistency
- no dependency downgrades
- RTL/LTR
- translation completeness
- appearance customizer behavior
- navigation modes
- ApexCharts
- Data Grid Community-only use
- mock data separation
- responsive quality
- loading/error/empty states
- build/lint/typecheck results

Write docs/FINAL_AUDIT.md with blockers, high, medium, and optional findings.
```

**Gate:** No unresolved blocker before presenting the demo.

---

# Recommended one-day execution order

A single intensive day should prioritize visible value:

1. Phases 0–13: foundation and complete appearance customizer
2. Phases 14–22: premium shell
3. Phases 23–28: showcase routes and ApexCharts
4. Phases 29–33: mocks and overview
5. Continue product pages on following sessions

Do not rush into orders, maps, or landing sections before the theme/customizer and shell gates pass. Those foundations determine the visual quality of every later route.

---

# Deferred until after the visual demo

The user explicitly requested no test-suite complexity for now. Defer these to a later stabilization roadmap:

- Vitest and Testing Library suites
- Playwright regression suites
- automated accessibility scanning
- real authentication and cookie refresh
- production API integration
- real uploads
- authoritative Saudi district data
- paid MUI X features
- visual snapshot infrastructure
- full SEO/deployment pipeline

Manual checks, typecheck, lint, direct-route verification, and production build remain mandatory throughout this plan.

The no-custom-global-Context rule is not deferred: it applies from Phase 6 onward.
