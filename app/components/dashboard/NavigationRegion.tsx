/**
 * Navigation Region — Phase 15 Placeholder
 *
 * Placeholder sidebar navigation for the dashboard frame.
 * Full navigation implementation comes in Phases 16-19.
 *
 * Current behavior:
 * - Renders a minimal vertical sidebar strip
 * - Shows Jaii brand name
 * - No interactive navigation items yet
 * - Responsive behavior: visible on desktop, hidden on mobile (mobile nav in Phase 19)
 */

import { useSettingsStore, resolveDirection } from "../../stores/settings";
import { Box, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function NavigationRegion() {
  const theme = useTheme();
  const language = useSettingsStore((s) => s.language);
  const directionPref = useSettingsStore((s) => s.direction);
  const direction = resolveDirection(directionPref, language);
  const { t } = useTranslation("dashboard");

  // Placeholder nav width — Phase 16 will use navLayout preference
  const navWidth = 260;

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
        // Surface hierarchy: nav slightly elevated
        bgcolor: "background.paper",
        borderInlineEnd: "1px solid",
        borderColor: "divider",
        // Subtle shadow for depth
        boxShadow: theme.jaii.shadows.drawer,
        zIndex: theme.zIndex.drawer,
        overflow: "hidden",
      }}
    >
      {/* Brand / Logo area */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          padding: "20px 20px",
          borderBottom: "1px solid",
          borderColor: "divider",
          minHeight: 64,
        }}
      >
        {/* Jaii logo mark — placeholder SVG */}
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "8px",
            bgcolor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "primary.contrastText",
              fontWeight: 700,
              fontSize: "1rem",
              lineHeight: 1,
            }}
          >
            ج
          </Typography>
        </Box>

        {/* Brand name */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "text.primary",
              lineHeight: 1.2,
            }}
          >
            {t("brand.name", "جايي")}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              fontSize: "0.7rem",
              lineHeight: 1,
            }}
          >
            {t("brand.subtitle", "منصة الغسيل")}
          </Typography>
        </Box>
      </Box>

      {/* Navigation items placeholder */}
      <Box
        sx={{
          flex: 1,
          padding: "16px 12px",
          overflow: "auto",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            padding: "8px 8px 12px",
          }}
        >
          {t("nav.placeholder", "التنقل")}
        </Typography>

        {/* Placeholder nav items — Phase 16 adds real navigation */}
        {[1, 2, 3, 4].map((i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              padding: "10px 12px",
              borderRadius: "8px",
              marginBottom: "4px",
              cursor: "default",
              color: i === 1 ? "primary.main" : "text.secondary",
              bgcolor: i === 1 ? "primary.selected" : "transparent",
              "&:hover": {
                bgcolor: i === 1 ? "primary.selected" : "action.hover",
              },
            }}
          >
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: "4px",
                bgcolor: "currentColor",
                opacity: 0.2,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.875rem",
                fontWeight: i === 1 ? 600 : 400,
              }}
            >
              {t(`nav.item${i}`, `القائمة ${i}`)}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* User footer placeholder */}
      <Box
        sx={{
          padding: "12px 16px",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              bgcolor: "primary.lighter",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "primary.dark",
                fontWeight: 600,
              }}
            >
              م
            </Typography>
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontSize: "0.875rem",
                color: "text.primary",
                lineHeight: 1.2,
              }}
            >
              {t("user.name", "مستخدم تجريبي")}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontSize: "0.75rem",
              }}
            >
              {t("user.role", "مدير المغسلة")}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}