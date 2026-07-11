/**
 * Appearance Customizer — Floating Drawer
 *
 * Renders a floating FAB that opens a responsive MUI Drawer containing
 * the shared SettingsControls panel. The control components, Zustand
 * selectors/actions, and translations are imported from SettingsControls.
 *
 * This file is the drawer shell only — no duplicate preference logic.
 * The same SettingsControls panel is reused by the /dashboard/settings/appearance page.
 */

import { forwardRef, useRef } from "react";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import {
  useSettingsStore,
  resolveDirection,
} from "../stores/settings";
import SettingsControls, { ResetButton } from "./SettingsControls";

// =============================================================================
// Floating Action Button
// =============================================================================

interface CustomizerFabProps {
  onClick: () => void;
}

const CustomizerFab = forwardRef<HTMLButtonElement, CustomizerFabProps>(
  ({ onClick }, ref) => {
    const { t } = useTranslation("appearance");
    const language = useSettingsStore((s) => s.language);
    const directionPref = useSettingsStore((s) => s.direction);
    const direction = resolveDirection(directionPref, language);
    const theme = useTheme();

    return (
      <Tooltip
        title={t("title")}
        placement={direction === "rtl" ? "left" : "right"}
      >
        <Fab
          ref={ref}
          onClick={onClick}
          size="medium"
          aria-label={t("title")}
          sx={{
            position: "fixed",
            bottom: 24,
            insetInlineStart: 24,
            zIndex: theme.zIndex.fab,
            "@media (hover: none) and (pointer: coarse)": {
              bottom: "max(24px, env(safe-area-inset-bottom))",
            },
          }}
        >
          <Icon icon="mdi:cog-outline" width={22} height={22} />
        </Fab>
      </Tooltip>
    );
  }
);

CustomizerFab.displayName = "CustomizerFab";

// =============================================================================
// Drawer Content — wraps shared SettingsControls in drawer shell
// =============================================================================

function DrawerContent() {
  const { t } = useTranslation("appearance");
  const closeCustomizer = useSettingsStore((s) => s.closeCustomizer);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* ── Header ── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1.5,
          borderBottom: 1,
          borderColor: "divider",
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Icon icon="mdi:palette-outline" width={20} height={20} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {t("title")}
          </Typography>
        </Box>
        <IconButton size="small" onClick={closeCustomizer} aria-label={t("closeDrawer")}>
          <Icon icon="mdi:close" width={18} height={18} />
        </IconButton>
      </Box>

      {/* ── Scrollable body with shared controls ── */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          overscrollBehavior: "contain",
        }}
      >
        <SettingsControls />
        <Box sx={{ height: 8 }} />
      </Box>

      {/* ── Footer ── */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          borderTop: 1,
          borderColor: "divider",
          flexShrink: 0,
        }}
      >
        <Tooltip title={t("resetDescription")} placement="top">
          <Box sx={{ width: "100%" }}>
            <ResetButton />
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
}

// =============================================================================
// Appearance Customizer
//
// Renders:
// - A floating action button (FAB) that opens the drawer
// - A responsive MUI Drawer using shared SettingsControls
//
// All state is owned by the Zustand settings store.
// No custom Context is created.
// =============================================================================

export default function AppearanceCustomizer() {
  const language = useSettingsStore((s) => s.language);
  const directionPref = useSettingsStore((s) => s.direction);
  const direction = resolveDirection(directionPref, language);
  const theme = useTheme();
  const fabRef = useRef<HTMLButtonElement>(null);

  const customizerOpen = useSettingsStore((s) => s.customizerOpen);
  const toggleCustomizer = useSettingsStore((s) => s.toggleCustomizer);
  const closeCustomizer = useSettingsStore((s) => s.closeCustomizer);

  const handleClose = () => {
    closeCustomizer();
    fabRef.current?.focus();
  };

  return (
    <>
      <CustomizerFab ref={fabRef} onClick={toggleCustomizer} />
      <Drawer
        anchor={direction === "rtl" ? "left" : "right"}
        variant="temporary"
        open={customizerOpen}
        onClose={handleClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            position: "fixed",
            top: 0,
            insetInlineStart: 0,
            width: {
              xs: "100vw",
              sm: 380,
            },
            maxWidth: "100%",
            height: "100dvh",
            boxSizing: "border-box",
            border: "none",
            borderInlineEnd: 1,
            borderColor: "divider",
            boxShadow: theme.jaii.shadows.drawer,
          },
        }}
      >
        <DrawerContent />
      </Drawer>
    </>
  );
}
