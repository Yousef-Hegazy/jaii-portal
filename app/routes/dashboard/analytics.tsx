/**
 * Analytics — /dashboard/analytics
 *
 * Minimal placeholder. Full implementation in Phase 37.
 */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function AnalyticsPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Analytics
        </Typography>
      </Paper>
    </Box>
  );
}
