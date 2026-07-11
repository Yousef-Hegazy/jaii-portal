/**
 * Partners — /dashboard/partners
 *
 * Minimal placeholder. Full implementation in Phase 42.
 */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function PartnersPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Partners
        </Typography>
      </Paper>
    </Box>
  );
}
