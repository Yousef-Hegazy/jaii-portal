import { forwardRef, useRef } from "react";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Switch from "@mui/material/Switch";
import { useTheme } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import {
  useSettingsStore,
  resolveDirection,
  type Mode,
  type DirectionKey,
} from "../stores/settings";

// =============================================================================
// Types
// =============================================================================

interface OptionCardProps {
  icon: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}

// =============================================================================
// Option Card — clickable card with icon, label, and selected state
// =============================================================================

function OptionCard({ icon, label, selected, onClick }: OptionCardProps) {
  return (
    <Box
      component="button"
      onClick={onClick}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-pressed={selected}
      tabIndex={0}
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0.75,
        py: 1.25,
        px: 0.5,
        border: 1,
        borderRadius: 1.5,
        cursor: "pointer",
        minWidth: 0,
        backgroundColor: selected ? "primary.main" : "transparent",
        borderColor: selected ? "primary.main" : "divider",
        color: selected ? "primary.contrastText" : "text.secondary",
        transition: "background-color 0.15s, border-color 0.15s, color 0.15s",
        outline: "none",
        "&:hover": {
          borderColor: selected ? "primary.main" : "primary.light",
          backgroundColor: selected ? "primary.main" : "action.hover",
        },
        "&:focus-visible": {
          boxShadow: (t) => `0 0 0 2px ${t.palette.primary.main}`,
        },
      }}
    >
      <Icon
        icon={icon}
        width={20}
        height={20}
        style={{ flexShrink: 0 }}
      />
      <Typography
        variant="caption"
        sx={{
          fontWeight: selected ? 600 : 500,
          fontSize: "11px",
          lineHeight: 1.2,
          textAlign: "center",
          color: "inherit",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

// =============================================================================
// Section Label
// =============================================================================

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="overline"
      color="text.secondary"
      sx={{
        px: 2,
        pt: 2,
        pb: 0.5,
        display: "block",
        fontSize: "10px",
        fontWeight: 600,
        lineHeight: 1.6,
        letterSpacing: "0.08em",
      }}
    >
      {children}
    </Typography>
  );
}

// =============================================================================
// Setting Row Card
// =============================================================================

function SettingRow({
  icon,
  label,
  description,
  children,
}: {
  icon: string;
  label: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <Paper
      variant="outlined"
      sx={{
        mx: 2,
        mb: 1.25,
        p: 1.5,
        display: "flex",
        alignItems: "flex-start",
        gap: 1.5,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          insetInlineStart: 0,
          width: 3,
          height: "100%",
          borderRadius: "0 2px 2px 0",
          backgroundColor: "primary.main",
          opacity: 0.6,
        },
      }}
    >
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "primary.main",
          opacity: 0.1,
          flexShrink: 0,
          mt: 0.25,
        }}
      >
        <Icon
          icon={icon}
          width={16}
          height={16}
          style={{ opacity: 0.7, position: "relative" }}
        />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.4 }}>
          {label}
        </Typography>
        {description && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ lineHeight: 1.4, display: "block", mt: 0.25 }}
          >
            {description}
          </Typography>
        )}
        {children && (
          <Box sx={{ mt: 1.25 }}>
            {children}
          </Box>
        )}
      </Box>
    </Paper>
  );
}

// =============================================================================
// Current Settings Summary
// =============================================================================

function SettingsSummary() {
  const mode = useSettingsStore((s) => s.mode);
  const primaryPreset = useSettingsStore((s) => s.primaryPreset);
  const radius = useSettingsStore((s) => s.radius);
  const compact = useSettingsStore((s) => s.compact);
  const contrast = useSettingsStore((s) => s.contrast);
  const direction = useSettingsStore((s) => s.direction);
  const fontFamily = useSettingsStore((s) => s.fontFamily);
  const fontSize = useSettingsStore((s) => s.fontSize);

  const items = [
    { label: "Mode", value: mode },
    { label: "Color", value: primaryPreset },
    { label: "Dir", value: direction },
    { label: "Radius", value: radius },
    { label: "Compact", value: compact ? "On" : "Off" },
    { label: "Contrast", value: contrast },
    { label: "Font", value: fontFamily },
    { label: "Size", value: `${fontSize}px` },
  ];

  return (
    <Box sx={{ px: 2, pb: 2 }}>
      <Paper
        variant="outlined"
        sx={{
          p: 1.5,
          display: "flex",
          flexWrap: "wrap",
          gap: 0.5,
        }}
      >
        {items.map((item) => (
          <Box
            key={item.label}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              px: 1,
              py: 0.25,
              borderRadius: 1,
              backgroundColor: "action.hover",
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontWeight: 500, whiteSpace: "nowrap" }}
            >
              {item.label}:
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: "primary.main",
                textTransform: "capitalize",
                whiteSpace: "nowrap",
              }}
            >
              {item.value}
            </Typography>
          </Box>
        ))}
      </Paper>
    </Box>
  );
}

// =============================================================================
// Drawer Content
// =============================================================================

function DrawerContent() {
  const { t, i18n } = useTranslation("appearance");
  const resetAll = useSettingsStore((s) => s.resetAll);
  const closeCustomizer = useSettingsStore((s) => s.closeCustomizer);
  const currentLang = i18n.language;

  // ── Mode ──
  const mode = useSettingsStore((s) => s.mode);
  const setMode = useSettingsStore((s) => s.setMode);

  // ── Direction ──
  const direction = useSettingsStore((s) => s.direction);
  const setDirection = useSettingsStore((s) => s.setDirection);

  // ── Compact ──
  const compact = useSettingsStore((s) => s.compact);
  const setCompact = useSettingsStore((s) => s.setCompact);

  // ── Contrast ──
  const contrast = useSettingsStore((s) => s.contrast);
  const setContrast = useSettingsStore((s) => s.setContrast);

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

      {/* ── Scrollable body ── */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          overscrollBehavior: "contain",
        }}
      >
        {/* ── Appearance section ── */}
        <SectionLabel>{t("sections.appearance")}</SectionLabel>

        <SettingRow
          icon="mdi:theme-light-dark"
          label={t("mode.title")}
          description={t("mode.description")}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            {(["light", "dark", "system"] as Mode[]).map((m) => (
              <OptionCard
                key={m}
                icon={
                  m === "light"
                    ? "mdi:weather-sunny"
                    : m === "dark"
                      ? "mdi:weather-night"
                      : "mdi:theme-light-dark"
                }
                label={t(`mode.${m}`)}
                selected={mode === m}
                onClick={() => setMode(m)}
              />
            ))}
          </Box>
        </SettingRow>

        <SettingRow
          icon="mdi:palette-outline"
          label={t("color.title")}
          description={t("color.description")}
        />

        <Divider sx={{ mx: 2, my: 0.5 }} />

        {/* ── Layout section ── */}
        <SectionLabel>{t("sections.layout")}</SectionLabel>

        <SettingRow
          icon="mdi:arrow-split-vertical"
          label={t("direction.title")}
          description={t("direction.description")}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            {(["auto", "ltr", "rtl"] as DirectionKey[]).map((d) => (
              <OptionCard
                key={d}
                icon={
                  d === "auto"
                    ? "mdi:page-layout-header-footer"
                    : d === "ltr"
                      ? "mdi:format-horizontal-align-left"
                      : "mdi:format-horizontal-align-right"
                }
                label={t(`direction.${d}`)}
                selected={direction === d}
                onClick={() => setDirection(d)}
              />
            ))}
          </Box>
        </SettingRow>

        <SettingRow
          icon="mdi:border-radius"
          label={t("radius.title")}
          description={t("radius.description")}
        />

        <SettingRow
          icon="mdi:arrow-collapse-vertical"
          label={t("compact.title")}
          description={t("compact.description")}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 500,
                color: compact ? "text.secondary" : "primary.main",
              }}
            >
              {currentLang === "ar" ? "مريح" : "Comfortable"}
            </Typography>
            <Switch
              checked={compact}
              onChange={(_, checked) => setCompact(checked)}
              size="small"
              slotProps={{ input: { "aria-label": t("compact.title") } }}
            />
            <Typography
              variant="caption"
              sx={{
                fontWeight: 500,
                color: compact ? "primary.main" : "text.secondary",
              }}
            >
              {currentLang === "ar" ? "مضغوط" : "Compact"}
            </Typography>
          </Box>
        </SettingRow>

        <SettingRow
          icon="mdi:contrast-circle-outline"
          label={t("contrast.title")}
          description={t("contrast.description")}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 500,
                color: contrast === "standard" ? "primary.main" : "text.secondary",
              }}
            >
              {t("contrast.standard")}
            </Typography>
            <Switch
              checked={contrast === "high"}
              onChange={(_, checked) => setContrast(checked ? "high" : "standard")}
              size="small"
              slotProps={{ input: { "aria-label": t("contrast.title") } }}
            />
            <Typography
              variant="caption"
              sx={{
                fontWeight: 500,
                color: contrast === "high" ? "primary.main" : "text.secondary",
              }}
            >
              {t("contrast.high")}
            </Typography>
          </Box>
        </SettingRow>

        <Divider sx={{ mx: 2, my: 0.5 }} />

        {/* ── Typography section ── */}
        <SectionLabel>{t("sections.typography")}</SectionLabel>

        <SettingRow
          icon="mdi:format-font"
          label={t("fontFamily.title")}
          description={t("fontFamily.description")}
        />

        <SettingRow
          icon="mdi:format-size"
          label={t("fontSize.title")}
          description={t("fontSize.description")}
        />

        {/* Current settings summary */}
        <Divider sx={{ mx: 2, my: 0.5 }} />
        <SectionLabel>{t("sections.currentSettings")}</SectionLabel>
        <SettingsSummary />

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
          <Box
            component="button"
            onClick={() => {
              resetAll();
              closeCustomizer();
            }}
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              py: 1,
              px: 2,
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
              backgroundColor: "transparent",
              cursor: "pointer",
              color: "text.secondary",
              transition: "background-color 0.15s, color 0.15s",
              "&:hover": {
                backgroundColor: "action.hover",
                color: "text.primary",
              },
              "&:focus-visible": {
                outline: 2,
                outlineColor: "primary.main",
                outlineOffset: 2,
              },
            }}
          >
            <Icon icon="mdi:refresh" width={16} height={16} />
            <Typography variant="body2">{t("reset")}</Typography>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
}

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
// Appearance Customizer
//
// Renders:
// - A floating action button (FAB) that opens the drawer
// - A responsive MUI Drawer anchored to the logical start edge (right in RTL, left in LTR)
//
// Controls (Phase 11): Mode, Direction, Contrast, Compact
// Controls (Phase 12): Color presets, Radius, Font Family, Font Size
//
// State (open/close) and all settings are owned by the Zustand settings store.
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
