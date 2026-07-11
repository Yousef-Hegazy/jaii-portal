/**
 * Settings Overview — /dashboard/settings
 *
 * Minimal placeholder. Full implementation in Phase 38.
 */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function SettingsOverviewPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Settings
        </Typography>
      </Paper>
    </Box>
  );
}
