/**
 * Login Page — /login
 *
 * Minimal placeholder. Full login page implementation in Phase 43.
 */
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function LoginPage() {
  const { t } = useTranslation("common");
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {t("login") || "Login"}
        </Typography>
      </Paper>
    </Box>
  );
}
