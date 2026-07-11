/**
 * Appearance Settings Route — /dashboard/settings/appearance
 *
 * A clean full-page settings experience that:
 * - Reuses the exact control components, Zustand selectors/actions, translations,
 *   and theme tokens from the floating Drawer (via SettingsControls module)
 * - Does not fork, copy, or reimplement preference logic
 * - Preserves the visual hierarchy established from the reference images
 * - Includes a larger live preview of a card, form, status chips, navigation sample,
 *   and small chart placeholder
 * - Keeps drawer and page values synchronized in real time (same Zustand store)
 * - Supports reset, persistence, Arabic/English, RTL/LTR, light/dark, keyboard,
 *   and responsive layouts
 */

import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import {
  useSettingsStore,
  resolveDirection,
} from "../../../stores/settings";
import SettingsControls, { ResetButton } from "../../../components/SettingsControls";

// =============================================================================
// Live Preview Components
// =============================================================================

function SampleCard() {
  const theme = useTheme();
  const { t } = useTranslation("appearance");

  return (
    <Paper variant="outlined" sx={{ p: 2.5, mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Avatar
          sx={{
            width: 48,
            height: 48,
            bgcolor: "primary.main",
            color: "primary.contrastText",
          }}
        >
          <Icon icon="mdi:store-outline" width={24} height={24} />
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {t("preview.cardTitle")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("preview.cardSubtitle")}
          </Typography>
        </Box>
        <Button variant="contained" size="small">
          {t("preview.viewDetails")}
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          "& > .MuiBox-root": {
            flex: 1,
            minWidth: 100,
            p: 1.5,
            borderRadius: 1,
            bgcolor: "action.hover",
          },
        }}
      >
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
            {t("preview.totalOrders")}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.25 }}>
            1,284
          </Typography>
          <Typography variant="caption" color="success.main" sx={{ display: "flex", alignItems: "center", gap: 0.25, mt: 0.5 }}>
            <Icon icon="mdi:trending-up" width={14} height={14} />
            +12.5%
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
            {t("preview.revenue")}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.25 }}>
            SAR 48,250
          </Typography>
          <Typography variant="caption" color="success.main" sx={{ display: "flex", alignItems: "center", gap: 0.25, mt: 0.5 }}>
            <Icon icon="mdi:trending-up" width={14} height={14} />
            +8.3%
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

function SampleForm() {
  const { t } = useTranslation("appearance");

  return (
    <Paper variant="outlined" sx={{ p: 2.5, mb: 2 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
        {t("preview.sampleForm")}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <TextField
          label={t("preview.fullName")}
          size="small"
          defaultValue="Ahmed Al-Saud"
          fullWidth
        />
        <TextField
          label={t("preview.email")}
          size="small"
          defaultValue="ahmed@example.com"
          fullWidth
        />
        <FormControlLabel
          control={<Switch defaultChecked size="small" />}
          label={t("preview.notifyByEmail")}
          sx={{ "& .MuiTypography-root": { typography: "body2" } }}
        />
      </Box>
    </Paper>
  );
}

function StatusChips() {
  const { t } = useTranslation("appearance");

  return (
    <Paper variant="outlined" sx={{ p: 2.5, mb: 2 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
        {t("preview.statusChips")}
      </Typography>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        <Chip label={t("preview.chipActive")} color="success" size="small" />
        <Chip label={t("preview.chipPending")} color="warning" size="small" />
        <Chip label={t("preview.chipCancelled")} color="error" size="small" />
        <Chip label={t("preview.chipInfo")} color="info" size="small" />
        <Chip
          label={t("preview.chipPrimary")}
          color="primary"
          size="small"
          variant="outlined"
        />
        <Chip
          label={t("preview.chipDefault")}
          size="small"
          variant="outlined"
        />
      </Box>
    </Paper>
  );
}

function NavigationSample() {
  const theme = useTheme();
  const { t } = useTranslation("appearance");
  const primary = theme.palette.primary.main;

  const navItems = [
    { icon: "mdi:view-dashboard-outline", label: t("preview.navDashboard"), active: true },
    { icon: "mdi:clipboard-list-outline", label: t("preview.navOrders"), active: false },
    { icon: "mdi:account-group-outline", label: t("preview.navCustomers"), active: false },
    { icon: "mdi:chart-box-outline", label: t("preview.navAnalytics"), active: false },
  ];

  return (
    <Paper variant="outlined" sx={{ p: 2.5, mb: 2 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
        {t("preview.navigationSample")}
      </Typography>
      <Paper variant="outlined" sx={{ borderRadius: 1, overflow: "hidden" }}>
        <List dense disablePadding>
          {navItems.map((item) => (
            <ListItem
              key={item.label}
              sx={{
                px: 1.5,
                py: 0.75,
                bgcolor: item.active ? theme.jaii.palette.primary.selected : "transparent",
                borderInlineStart: item.active ? 3 : 0,
                borderColor: primary,
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Icon
                  icon={item.icon}
                  width={18}
                  height={18}
                  color={item.active ? primary : undefined}
                />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                slotProps={{
                  primary: {
                    sx: {
                      fontWeight: item.active ? 600 : 400,
                      color: item.active ? primary : undefined,
                      fontSize: "0.875rem",
                    },
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Paper>
  );
}

function ChartPlaceholder() {
  const theme = useTheme();
  const { t } = useTranslation("appearance");
  const series = theme.jaii.chart.series;

  const bars = [
    { label: t("preview.chartMon"), value: 65 },
    { label: t("preview.chartTue"), value: 45 },
    { label: t("preview.chartWed"), value: 80 },
    { label: t("preview.chartThu"), value: 55 },
    { label: t("preview.chartFri"), value: 70 },
    { label: t("preview.chartSat"), value: 40 },
    { label: t("preview.chartSun"), value: 60 },
  ];

  const maxValue = Math.max(...bars.map((b) => b.value));

  return (
    <Paper variant="outlined" sx={{ p: 2.5, mb: 2 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
        {t("preview.chartTitle")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          gap: 0.75,
          height: 120,
          px: 0.5,
        }}
      >
        {bars.map((bar, idx) => (
          <Box
            key={bar.label}
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: `${(bar.value / maxValue) * 100}%`,
                minHeight: 8,
                borderRadius: "4px 4px 0 0",
                background: `linear-gradient(180deg, ${series[idx % series.length]} 0%, ${series[idx % series.length]}80 100%)`,
                transition: "background 0.3s",
              }}
            />
            <Typography
              variant="caption"
              sx={{
                fontSize: "9px",
                color: "text.disabled",
                textAlign: "center",
              }}
            >
              {bar.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

// =============================================================================
// Appearance Settings Page
// =============================================================================

export default function AppearanceSettingsPage() {
  const { t } = useTranslation("appearance");
  const language = useSettingsStore((s) => s.language);
  const directionPref = useSettingsStore((s) => s.direction);
  const direction = resolveDirection(directionPref, language);

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        bgcolor: "background.default",
        py: { xs: 2, sm: 3 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Container maxWidth="xl" disableGutters>
        {/* ── Page Header ── */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {t("title")}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
              {t("description")}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ResetButton />
          </Box>
        </Box>

        {/* ── Two-column layout: Controls + Preview ── */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "420px 1fr" },
            gap: 3,
            alignItems: "start",
          }}
        >
          {/* ── Left: Settings Controls ── */}
          <Paper
            variant="outlined"
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              position: "sticky",
              top: { lg: 16 },
              maxHeight: { lg: "calc(100dvh - 140px)" },
              overflowY: { lg: "auto" },
            }}
          >
            <SettingsControls />
            <Box sx={{ px: 2, pb: 2 }}>
              <ResetButton />
            </Box>
          </Paper>

          {/* ── Right: Live Preview ── */}
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{
                display: "block",
                mb: 2,
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.08em",
              }}
            >
              {t("preview.title")}
            </Typography>

            <SampleCard />
            <SampleForm />
            <StatusChips />
            <NavigationSample />
            <ChartPlaceholder />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
