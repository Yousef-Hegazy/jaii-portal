/**
 * Settings Layout — /dashboard/settings
 *
 * Minimal layout wrapper that renders <Outlet /> for child routes.
 * Supports:
 *   /dashboard/settings
 *   /dashboard/settings/appearance
 *   /dashboard/settings/pricing
 *   /dashboard/settings/zones
 *   /dashboard/settings/drivers
 */
import { Outlet } from "react-router";

export default function SettingsLayout() {
  return <Outlet />;
}
