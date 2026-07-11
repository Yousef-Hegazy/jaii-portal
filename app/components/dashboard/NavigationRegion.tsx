/**
 * Navigation Region — Phase 16
 *
 * Full sidebar navigation implementation with:
 * - Temporary Jaii brand header
 * - Translated grouped navigation links
 * - Icons and active states
 * - Nested Settings and Showcase groups
 * - User/workspace footer
 * - Integrated/apparent color modes
 * - Correct RTL/LTR placement
 * - Independent scroll behavior
 */

import { useSettingsStore, resolveDirection, type NavColorKey } from "../../stores/settings";
import {
  Box,
  Typography,
  Tooltip,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";
import { Icon } from "@iconify/react";
import { useState } from "react";

// ============================================================================
// Navigation Configuration (derived from routes.ts)
// ============================================================================

interface NavItemConfig {
  path: string;
  labelKey: string;
  icon: string;
  badge?: string;
}

interface NavGroupConfig {
  titleKey: string;
  items: NavItemConfig[];
  defaultExpanded?: boolean;
}

// Main navigation items (top-level dashboard routes)
const MAIN_NAV: NavItemConfig[] = [
  { path: "/dashboard", labelKey: "navigation:dashboard", icon: "solar:chart-bold" },
  { path: "/dashboard/orders", labelKey: "navigation:orders", icon: "solar:clipboard-list-bold" },
  { path: "/dashboard/customers", labelKey: "navigation:customers", icon: "solar:users-group-rounded-bold" },
  { path: "/dashboard/partners", labelKey: "navigation:partners", icon: "solar:handshake-bold" },
  { path: "/dashboard/analytics", labelKey: "navigation:analytics", icon: "solar:chart-square-bold" },
];

// Settings nested group
const SETTINGS_NAV: NavGroupConfig = {
  titleKey: "navigation:groups.settings",
  defaultExpanded: false,
  items: [
    { path: "/dashboard/settings", labelKey: "navigation:settings", icon: "solar:settings-bold" },
    { path: "/dashboard/settings/appearance", labelKey: "navigation:appearance", icon: "solar:pallete-bold" },
    { path: "/dashboard/settings/pricing", labelKey: "navigation:pricing", icon: "solar:tag-bold" },
    { path: "/dashboard/settings/zones", labelKey: "navigation:zones", icon: "solar:map-point-bold" },
    { path: "/dashboard/settings/drivers", labelKey: "navigation:drivers", icon: "solar:car-bold" },
  ],
};

// Showcase nested group
const SHOWCASE_NAV: NavGroupConfig = {
  titleKey: "navigation:groups.showcase",
  defaultExpanded: false,
  items: [
    { path: "/dashboard/showcase/components", labelKey: "navigation:showcaseComponents", icon: "solar:box-bold" },
    { path: "/dashboard/showcase/charts", labelKey: "navigation:showcaseCharts", icon: "solar:chart-line-bold" },
    { path: "/dashboard/showcase/forms", labelKey: "navigation:showcaseForms", icon: "solar:form-bold" },
    { path: "/dashboard/showcase/tables", labelKey: "navigation:showcaseTables", icon: "solar:table-bold" },
  ],
};

// ============================================================================
// Color Mode Helpers
// ============================================================================

interface NavColors {
  bg: string;
  bgHover: string;
  bgActive: string;
  textPrimary: string;
  textSecondary: string;
  textActive: string;
  iconActive: string;
  divider: string;
  groupTitle: string;
}

function getNavColors(theme: Theme, mode: NavColorKey, resolvedMode: "light" | "dark"): NavColors {
  if (mode === "apparent") {
    // Apparent mode: nav uses primary color with white text
    return {
      bg: theme.palette.primary.main,
      bgHover: alpha(theme.palette.primary.main, 0.9),
      bgActive: alpha(theme.palette.primary.dark, 1),
      textPrimary: theme.palette.primary.contrastText,
      textSecondary: alpha(theme.palette.primary.contrastText, 0.7),
      textActive: theme.palette.primary.contrastText,
      iconActive: theme.palette.primary.contrastText,
      divider: alpha(theme.palette.primary.contrastText, 0.2),
      groupTitle: alpha(theme.palette.primary.contrastText, 0.5),
    };
  }

  // Integrated mode: nav matches surface hierarchy
  return {
    bg: theme.palette.background.paper,
    bgHover: theme.palette.action.hover,
    bgActive: theme.jaii.palette.primary.selected,
    textPrimary: theme.palette.text.primary,
    textSecondary: theme.palette.text.secondary,
    textActive: theme.palette.primary.main,
    iconActive: theme.palette.primary.main,
    divider: theme.palette.divider,
    groupTitle: theme.palette.text.secondary,
  };
}

// ============================================================================
// Sub-components
// ============================================================================

interface NavItemProps {
  item: NavItemConfig;
  colors: NavColors;
  isActive: boolean;
  collapsed?: boolean;
}

function NavItem({ item, colors, isActive, collapsed }: NavItemProps) {
  const { t } = useTranslation();

  const content = (
    <ListItemButton
      component={Link}
      to={item.path}
      sx={{
        borderRadius: "8px",
        minHeight: 44,
        px: collapsed ? 1.5 : 2,
        justifyContent: collapsed ? "center" : "flex-start",
        bgcolor: isActive ? colors.bgActive : "transparent",
        color: isActive ? colors.textActive : colors.textPrimary,
        "&:hover": {
          bgcolor: isActive ? colors.bgActive : colors.bgHover,
        },
        transition: "all 0.15s ease",
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: collapsed ? 0 : 40,
          color: isActive ? colors.iconActive : colors.textSecondary,
          justifyContent: "center",
        }}
      >
        <Icon icon={item.icon} width={22} height={22} />
      </ListItemIcon>
      {!collapsed && (
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.875rem",
            fontWeight: isActive ? 600 : 400,
            color: "inherit",
            flex: 1,
          }}
        >
          {t(item.labelKey)}
        </Typography>
      )}
      {item.badge && !collapsed && (
        <Box
          sx={{
            px: 1,
            py: 0.25,
            borderRadius: "12px",
            bgcolor: isActive ? alpha(colors.textActive, 0.15) : alpha(colors.textSecondary, 0.1),
            color: isActive ? colors.textActive : colors.textSecondary,
            fontSize: "0.7rem",
            fontWeight: 600,
          }}
        >
          {item.badge}
        </Box>
      )}
    </ListItemButton>
  );

  if (collapsed) {
    return (
      <Tooltip title={t(item.labelKey)} placement="right">
        <ListItem disablePadding sx={{ display: "block" }}>
          {content}
        </ListItem>
      </Tooltip>
    );
  }

  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      {content}
    </ListItem>
  );
}

interface NavGroupProps {
  group: NavGroupConfig;
  colors: NavColors;
  activePath: string;
  collapsed?: boolean;
  isAnyChildActive: boolean;
}

function NavGroup({ group, colors, activePath, collapsed, isAnyChildActive }: NavGroupProps) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(group.defaultExpanded || isAnyChildActive);

  // Check if any child is active
  const isChildActive = group.items.some((item) => item.path === activePath);
  const effectiveExpanded = collapsed ? false : (expanded || isChildActive);

  if (collapsed) {
    // Collapsed mode: show items without expand/collapse
    return (
      <List disablePadding sx={{ px: 1 }}>
        {group.items.map((item) => (
          <NavItem
            key={item.path}
            item={item}
            colors={colors}
            isActive={item.path === activePath}
            collapsed
          />
        ))}
      </List>
    );
  }

  return (
    <Box sx={{ mb: 1 }}>
      {/* Group header with expand/collapse toggle */}
      <Box
        onClick={() => setExpanded(!expanded)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1,
          cursor: "pointer",
          minHeight: 36,
          "&:hover": {
            bgcolor: colors.bgHover,
          },
          borderRadius: "8px",
          transition: "background 0.15s ease",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontSize: "0.7rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: colors.groupTitle,
          }}
        >
          {t(group.titleKey)}
        </Typography>
        <Icon
          icon={expanded ? "solar:chevron-up-bold" : "solar:chevron-down-bold"}
          width={16}
          height={16}
          style={{
            color: colors.groupTitle,
          }}
        />
      </Box>

      {/* Group items */}
      <Collapse in={effectiveExpanded} timeout={200}>
        <List disablePadding sx={{ px: 1, pt: 0.5 }}>
          {group.items.map((item) => (
            <NavItem
              key={item.path}
              item={item}
              colors={colors}
              isActive={item.path === activePath}
            />
          ))}
        </List>
      </Collapse>
    </Box>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export default function NavigationRegion() {
  const theme = useTheme();
  const language = useSettingsStore((s) => s.language);
  const directionPref = useSettingsStore((s) => s.direction);
  const resolvedMode = useSettingsStore((s) => s.resolvedMode);
  const navColor = useSettingsStore((s) => s.navColor);
  const navLayout = useSettingsStore((s) => s.navLayout);
  const direction = resolveDirection(directionPref, language);
  const { t } = useTranslation("dashboard");

  const location = useLocation();
  const currentPath = location.pathname;

  // Determine if sidebar is collapsed
  const collapsed = navLayout === "mini";

  // Navigation width based on layout
  const navWidth = collapsed ? 72 : 260;

  // Get colors based on nav color mode
  const colors = getNavColors(theme, navColor, resolvedMode);

  // Check if any settings/showcase items are active
  const isSettingsActive = SETTINGS_NAV.items.some((item) => item.path === currentPath);
  const isShowcaseActive = SHOWCASE_NAV.items.some((item) => item.path === currentPath);

  return (
    <Box
      component="nav"
      aria-label="Main navigation"
      sx={{
        position: "fixed",
        top: 0,
        // RTL: sidebar on right; LTR: sidebar on left
        insetInlineStart: 0,
        width: navWidth,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: colors.bg,
        borderInlineEnd: navColor === "apparent" ? "none" : `1px solid ${colors.divider}`,
        boxShadow: navColor === "apparent" ? "none" : theme.jaii.shadows.drawer,
        zIndex: theme.zIndex.drawer,
        transition: "width 0.2s ease, background-color 0.2s ease",
        overflow: "hidden",
      }}
    >
      {/* Brand / Logo area */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: collapsed ? 0 : 1.5,
          px: collapsed ? 1.5 : 3,
          py: 2,
          borderBottom: `1px solid ${colors.divider}`,
          minHeight: 72,
          justifyContent: collapsed ? "center" : "flex-start",
        }}
      >
        {/* Jaii logo mark */}
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "10px",
            bgcolor: navColor === "apparent" ? alpha(theme.palette.primary.contrastText, 0.15) : "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background-color 0.2s ease",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: navColor === "apparent" ? colors.textPrimary : "primary.contrastText",
              fontWeight: 700,
              fontSize: "1.1rem",
              lineHeight: 1,
            }}
          >
            ج
          </Typography>
        </Box>

        {/* Brand name (hidden in collapsed mode) */}
        {!collapsed && (
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: "1.1rem",
                color: colors.textPrimary,
                lineHeight: 1.2,
              }}
            >
              {t("brand.name", "جايي")}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: colors.textSecondary,
                fontSize: "0.7rem",
                lineHeight: 1,
              }}
            >
              {t("brand.subtitle", "منصة الغسيل")}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Navigation items - independent scroll */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          py: 2,
          // Custom scrollbar styling
          "&::-webkit-scrollbar": {
            width: 6,
          },
          "&::-webkit-scrollbar-track": {
            bgcolor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: colors.divider,
            borderRadius: "3px",
            "&:hover": {
              bgcolor: colors.textSecondary,
            },
          },
        }}
      >
        {/* Main navigation items */}
        <List disablePadding sx={{ px: collapsed ? 1 : 1.5 }}>
          {MAIN_NAV.map((item) => (
            <NavItem
              key={item.path}
              item={item}
              colors={colors}
              isActive={currentPath === item.path}
              collapsed={collapsed}
            />
          ))}
        </List>

        {/* Divider */}
        {!collapsed && (
          <Box sx={{ px: 2, py: 1, mt: 1 }}>
            <Box sx={{ height: 1, bgcolor: colors.divider }} />
          </Box>
        )}

        {/* Settings group */}
        <NavGroup
          group={SETTINGS_NAV}
          colors={colors}
          activePath={currentPath}
          collapsed={collapsed}
          isAnyChildActive={isSettingsActive}
        />

        {/* Divider */}
        {!collapsed && (
          <Box sx={{ px: 2, py: 1, mt: 1 }}>
            <Box sx={{ height: 1, bgcolor: colors.divider }} />
          </Box>
        )}

        {/* Showcase group */}
        <NavGroup
          group={SHOWCASE_NAV}
          colors={colors}
          activePath={currentPath}
          collapsed={collapsed}
          isAnyChildActive={isShowcaseActive}
        />
      </Box>

      {/* User footer */}
      <Box
        sx={{
          px: collapsed ? 1 : 2,
          py: 2,
          borderTop: `1px solid ${colors.divider}`,
          bgcolor: navColor === "apparent" ? alpha(theme.palette.primary.dark, 0.3) : "transparent",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: collapsed ? 0 : 1.5,
            justifyContent: collapsed ? "center" : "flex-start",
          }}
        >
          {/* Avatar */}
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: navColor === "apparent"
                ? alpha(theme.palette.primary.contrastText, 0.15)
                : "primary.lighter",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "background-color 0.2s ease",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: navColor === "apparent" ? colors.textPrimary : "primary.dark",
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            >
              م
            </Typography>
          </Box>

          {/* User info (hidden in collapsed mode) */}
          {!collapsed && (
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  color: colors.textPrimary,
                  lineHeight: 1.2,
                }}
              >
                {t("user.name", "مستخدم تجريبي")}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: colors.textSecondary,
                  fontSize: "0.75rem",
                }}
              >
                {t("user.role", "مدير المغسلة")}
              </Typography>
            </Box>
          )}

          {/* Settings icon (collapsed mode only) */}
          {collapsed && (
            <Tooltip title={t("settings", "الإعدادات")} placement="right">
              <Box
                sx={{
                  position: "absolute",
                  bottom: 16,
                  width: 36,
                  height: 36,
                  borderRadius: "8px",
                  bgcolor: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: colors.textSecondary,
                  "&:hover": {
                    bgcolor: colors.bgHover,
                    color: colors.textPrimary,
                  },
                }}
              >
                <Icon icon="solar:settings-bold" width={20} height={20} />
              </Box>
            </Tooltip>
          )}
        </Box>
      </Box>
    </Box>
  );
}
