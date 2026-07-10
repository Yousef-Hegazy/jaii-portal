import { useTranslation } from "react-i18next";
import i18n from "../lib/i18n";
import { persistLanguage } from "../lib/i18n";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { useState } from "react";

import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Jaii Portal" },
    { name: "description", content: "Saudi laundry-service platform" },
  ];
}

export default function Home() {
  const { t } = useTranslation("landing");
  const currentLang = i18n.language;
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleLanguage = () => {
    const nextLang = currentLang === "ar" ? "en" : "ar";
    i18n.changeLanguage(nextLang);
    persistLanguage(nextLang);
  };

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 560, width: "100%" }}>
        <CardContent sx={{ textAlign: "center", py: 6, px: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Jaii Portal
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {t("pageDescription")}
          </Typography>
          <Button variant="contained" size="large" sx={{ mb: 3 }}>
            {t("ctaTitle")}
          </Button>

          {/* Temporary language switch — not final styled control */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "center",
              borderTop: 1,
              borderColor: "divider",
              pt: 2,
            }}
          >
            <Button
              size="small"
              variant={currentLang === "ar" ? "contained" : "outlined"}
              onClick={toggleLanguage}
              sx={{ minWidth: 64 }}
            >
              العربية
            </Button>
            <Button
              size="small"
              variant={currentLang === "en" ? "contained" : "outlined"}
              onClick={toggleLanguage}
              sx={{ minWidth: 64 }}
            >
              English
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* RTL/LTR Proof Section — Dialog and TextField */}
      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          insetInlineEnd: 16,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          size="small"
          placeholder={currentLang === "ar" ? "اختبار الإدخال" : "Test input"}
          variant="outlined"
          sx={{ minWidth: 200, backgroundColor: "background.paper" }}
        />
        <Button
          variant="outlined"
          size="small"
          onClick={handleDialogOpen}
          sx={{ backgroundColor: "background.paper" }}
        >
          {currentLang === "ar" ? "افتح الحوار" : "Open Dialog"}
        </Button>
      </Box>

      {/* Portal Dialog — tests correct direction inheritance */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          {currentLang === "ar" ? "حوار اختباري" : "Test Dialog"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {currentLang === "ar"
              ? "هذا حوار اختباري للتحقق من دعم RTL/LTR. يجب أن يظهر النص من اليمين إلى اليسار باللغة العربية."
              : "This is a test dialog to verify RTL/LTR support. Text should appear right-to-left in Arabic."}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label={currentLang === "ar" ? "حقل اختباري" : "Test Field"}
            type="text"
            fullWidth
            variant="standard"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>
            {currentLang === "ar" ? "إلغاء" : "Cancel"}
          </Button>
          <Button onClick={handleDialogClose} variant="contained">
            {currentLang === "ar" ? "تأكيد" : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
