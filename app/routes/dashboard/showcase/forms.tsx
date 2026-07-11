/**
 * Forms Showcase — /dashboard/showcase/forms
 *
 * Minimal placeholder. Full implementation in Phase 27.
 */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function FormsShowcasePage() {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Forms Showcase
        </Typography>
      </Paper>
    </Box>
  );
}
