/**
 * Showcase Layout — /dashboard/showcase
 *
 * Minimal layout wrapper that renders <Outlet /> for child routes.
 * Supports:
 *   /dashboard/showcase/components
 *   /dashboard/showcase/charts
 *   /dashboard/showcase/forms
 *   /dashboard/showcase/tables
 */
import { Outlet } from "react-router";

export default function ShowcaseLayout() {
  return <Outlet />;
}
