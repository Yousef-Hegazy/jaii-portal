/**
 * Header Region — Phase 15 Placeholder
 *
 * Placeholder top header for the dashboard frame.
 * Full header implementation comes in Phase 20.
 *
 * Current behavior:
 * - Fixed top header bar
 * - Shows page title area
 * - Language switcher placeholder
 * - No detailed actions yet
 */

import { useSettingsStore, resolveDirection } from "../../stores/settings";
import { Box, Typography, IconButton, Tooltip, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";

export default function HeaderRegion() {
  const theme = useTheme();
  const language = useSettingsStore((s) => s.language);
  const directionPref = useSettingsStore((s) => s.direction);
  const direction = resolveDirection(directionPref, language);
  const setLanguage = useSettingsStore((s) => s.setLanguage);
  const { t } = useTranslation("dashboard");

  const isRtl = direction === "rtl";

  return (
    <Box
      component="header"
      role="banner"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: theme.zIndex.appBar,
        display: "flex",
        alignItems: "center",
        // Offset for nav width
        marginInlineStart: "260px",
        height: 64,
        paddingInline: "24px",
        // Surface hierarchy: header elevated above content
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        // Subtle shadow
        boxShadow: theme.jaii.shadows.dropdown,
        gap: 2,
      }}
    >
      {/* Page title placeholder */}
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: "1rem",
            color: "text.primary",
            lineHeight: 1.3,
          }}
        >
          {t("header.title", "لوحة التحكم")}
        </Typography>
      </Box>

      {/* Language switcher placeholder */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <Tooltip title={isRtl ? "English" : "العربية"}>
          <IconButton
            size="small"
            onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
            aria-label={isRtl ? "Switch to English" : "التبديل إلى العربية"}
            sx={{
              borderRadius: "6px",
              border: "1px solid",
              borderColor: "divider",
              width: 36,
              height: 36,
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                fontSize: "0.7rem",
                color: "text.primary",
                lineHeight: 1,
              }}
            >
              {language === "ar" ? "EN" : "ع"}
            </Typography>
          </IconButton>
        </Tooltip>
      </Box>

      {/* Settings trigger placeholder */}
      <Tooltip title={t("header.settings", "الإعدادات")}>
        <IconButton
          size="small"
          aria-label={t("header.settings", "الإعدادات")}
          sx={{
            borderRadius: "6px",
            border: "1px solid",
            borderColor: "divider",
            width: 36,
            height: 36,
            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
        >
          <Icon icon="mdi:gear" width={18} height={18} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}