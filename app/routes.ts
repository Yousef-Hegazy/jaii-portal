import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
  route("dashboard", "routes/dashboard/layout.tsx", [
    index("routes/dashboard/page.tsx"),
    route("orders", "routes/dashboard/orders.tsx"),
    route("customers", "routes/dashboard/customers.tsx"),
    route("analytics", "routes/dashboard/analytics.tsx"),
    route("partners", "routes/dashboard/partners.tsx"),
    route("settings", "routes/dashboard/settings/layout.tsx", [
      index("routes/dashboard/settings/page.tsx"),
      route("appearance", "routes/dashboard/settings/appearance.tsx"),
      route("pricing", "routes/dashboard/settings/pricing.tsx"),
      route("zones", "routes/dashboard/settings/zones.tsx"),
      route("drivers", "routes/dashboard/settings/drivers.tsx"),
    ]),
    route("showcase", "routes/dashboard/showcase/layout.tsx", [
      route("components", "routes/dashboard/showcase/components.tsx"),
      route("charts", "routes/dashboard/showcase/charts.tsx"),
      route("forms", "routes/dashboard/showcase/forms.tsx"),
      route("tables", "routes/dashboard/showcase/tables.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
