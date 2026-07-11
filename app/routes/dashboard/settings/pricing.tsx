/**
 * Pricing Settings — /dashboard/settings/pricing
 *
 * Minimal placeholder. Full implementation in Phase 39.
 */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function PricingSettingsPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Pricing
        </Typography>
      </Paper>
    </Box>
  );
}
