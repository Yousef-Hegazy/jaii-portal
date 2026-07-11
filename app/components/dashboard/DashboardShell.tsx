/**
 * Dashboard Shell — Phase 15
 *
 * The original Jaii dashboard frame providing:
 * - Navigation region (sidebar/rail)
 * - Header region (top bar)
 * - Content region (route outlet)
 * - Skip link for accessibility
 * - Responsive max widths and gutters
 * - Background/surface hierarchy
 *
 * Navigation and header actions are placeholder implementations.
 * Full navigation and header features come in Phases 16-20.
 */

import { useSettingsStore, resolveDirection } from "../../stores/settings";
import { Box } from "@mui/material";
import { Outlet } from "react-router";
import NavigationRegion from "./NavigationRegion";
import HeaderRegion from "./HeaderRegion";

export default function DashboardShell() {
  const language = useSettingsStore((s) => s.language);
  const directionPref = useSettingsStore((s) => s.direction);
  const direction = resolveDirection(directionPref, language);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      {/* Skip link — first focusable element */}
      <Box
        component="a"
        href="#main-content"
        sx={{
          position: "fixed",
          top: -64,
          insetInlineStart: 0,
          zIndex: 9999,
          padding: "12px 24px",
          bgcolor: "primary.main",
          color: "primary.contrastText",
          fontWeight: 600,
          textDecoration: "none",
          borderRadius: "0 0 8px 0",
          transition: "top 0.2s ease",
          "&:focus": {
            top: 0,
            outline: "none",
          },
        }}
      >
        Skip to content
      </Box>

      {/* Navigation region */}
      <NavigationRegion />

      {/* Main area: header + content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minWidth: 0, // Prevent flex overflow
          // Content offset for fixed header
        }}
      >
        {/* Header region */}
        <HeaderRegion />

        {/* Content region */}
        <Box
          component="main"
          id="main-content"
          tabIndex={-1}
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            // Responsive gutters
            padding: {
              xs: "16px",
              sm: "24px",
              md: "32px",
            },
            // Max content width for readability
            maxWidth: {
              xs: "100%",
              xl: "1440px",
            },
            width: "100%",
            mx: "auto",
            // Background/surface hierarchy
            bgcolor: "background.default",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}