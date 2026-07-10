import { useTranslation } from "react-i18next";
import i18n from "../lib/i18n";
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
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { TYPOGRAPHY_SCALE } from "../lib/typography";
import { useTheme } from "@mui/material/styles";
import { useSettingsStore } from "../stores/settings";
import AppearanceCustomizer from "../components/AppearanceCustomizer";

import type { Route } from "./+types/home";

// Sample navigation items for proof
const NAV_ITEMS = [
  { icon: "mdi:view-dashboard-outline", labelEn: "Dashboard", labelAr: "لوحة التحكم" },
  { icon: "mdi:shopping-outline", labelEn: "Orders", labelAr: "الطلبات" },
  { icon: "mdi:account-group-outline", labelEn: "Customers", labelAr: "العملاء" },
  { icon: "mdi:chart-line", labelEn: "Analytics", labelAr: "التحليلات" },
  { icon: "mdi:cog-outline", labelEn: "Settings", labelAr: "الإعدادات" },
];

// Sample table data
const TABLE_ROWS = [
  { id: "#001", customer: "Ahmed Al-Saud", amount: "240.00 SAR", status: "Completed" },
  { id: "#002", customer: "Sara Ali", amount: "180.00 SAR", status: "Processing" },
  { id: "#003", customer: "Mohammed Omar", amount: "320.00 SAR", status: "Pending" },
  { id: "#004", customer: "Nora Khalid", amount: "95.00 SAR", status: "Completed" },
];

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Jaii Portal" },
    { name: "description", content: "Saudi laundry-service platform" },
  ];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Home() {
  const { t } = useTranslation("landing");
  const theme = useTheme();
  const currentLang = i18n.language;
  const [dialogOpen, setDialogOpen] = useState(false);

  // Narrow Zustand selectors for theme info display
  const mode = useSettingsStore((s) => s.mode);
  const resolvedMode = useSettingsStore((s) => s.resolvedMode);
  const primaryPreset = useSettingsStore((s) => s.primaryPreset);
  const compact = useSettingsStore((s) => s.compact);
  const contrast = useSettingsStore((s) => s.contrast);
  const setLanguage = useSettingsStore((s) => s.setLanguage);

  const toggleLanguage = () => {
    const nextLang = currentLang === "ar" ? "en" : "ar";
    setLanguage(nextLang);
  };

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  // Sample icons to showcase
  const iconSet = [
    { icon: "mdi-light:home", label: "Home" },
    { icon: "mdi:shopping-outline", label: "Orders" },
    { icon: "mdi:account-outline", label: "Account" },
    { icon: "mdi:chart-line", label: "Analytics" },
    { icon: "mdi:truck-delivery-outline", label: "Delivery" },
    { icon: "mdi:cog-outline", label: "Settings" },
    { icon: "mdi:bell-outline", label: "Notifications" },
    { icon: "mdi:map-marker-outline", label: "Zones" },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
        gap: 3,
        pb: 10,
      }}
    >
      {/* ── Brand Card ── */}
      <Card sx={{ maxWidth: 720, width: "100%" }}>
        <CardContent sx={{ textAlign: "center", py: 4, px: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Jaii Portal
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {t("pageDescription")}
          </Typography>
          <Button variant="contained" size="large" sx={{ mb: 3 }}>
            {t("ctaTitle")}
          </Button>

          {/* Language switch */}
          <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
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

      {/* ── Theme Proof Section (Buttons, Chips, Papers, TextFields, Cards) ── */}
      <Card sx={{ maxWidth: 800, width: "100%" }}>
        <CardContent sx={{ py: 4, px: 4 }}>
          <Typography variant="overline" color="text.secondary" sx={{ mb: 2, display: "block" }}>
            {currentLang === "ar" ? "مكونات السمة" : "Theme Components"}
          </Typography>

          <Stack spacing={4}>
            {/* Buttons */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
                {currentLang === "ar" ? "الأزرار" : "Buttons"}
              </Typography>
              <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                <Button variant="contained">{currentLang === "ar" ? "أساسي" : "Contained"}</Button>
                <Button variant="outlined">{currentLang === "ar" ? "محدد" : "Outlined"}</Button>
                <Button variant="text">{currentLang === "ar" ? "نص" : "Text"}</Button>
                <Button variant="contained" size="small">{currentLang === "ar" ? "صغير" : "Small"}</Button>
                <Button variant="contained" size="large">{currentLang === "ar" ? "كبير" : "Large"}</Button>
                <Button variant="contained" disabled>{currentLang === "ar" ? "معطل" : "Disabled"}</Button>
              </Box>
            </Box>

            {/* Icon Buttons */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
                {currentLang === "ar" ? "أزرار الأيقونات" : "Icon Buttons"}
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Tooltip title={currentLang === "ar" ? "الرئيسية" : "Home"}>
                  <IconButton>
                    <Icon icon="mdi:home" width={20} height={20} />
                  </IconButton>
                </Tooltip>
                <Tooltip title={currentLang === "ar" ? "الإعدادات" : "Settings"}>
                  <IconButton color="primary">
                    <Icon icon="mdi:cog" width={20} height={20} />
                  </IconButton>
                </Tooltip>
                <Tooltip title={currentLang === "ar" ? "الحذف" : "Delete"}>
                  <IconButton color="error">
                    <Icon icon="mdi:delete" width={20} height={20} />
                  </IconButton>
                </Tooltip>
                <IconButton disabled>
                  <Icon icon="mdi:close" width={20} height={20} />
                </IconButton>
              </Box>
            </Box>

            {/* Chips */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
                {currentLang === "ar" ? "العلامات" : "Chips"}
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Chip label={currentLang === "ar" ? "افتراضي" : "Default"} />
                <Chip label={currentLang === "ar" ? "أساسي" : "Primary"} color="primary" />
                <Chip label={currentLang === "ar" ? "نجاح" : "Success"} color="success" />
                <Chip label={currentLang === "ar" ? "تحذير" : "Warning"} color="warning" />
                <Chip label={currentLang === "ar" ? "خطأ" : "Error"} color="error" />
                <Chip label={currentLang === "ar" ? "محدد" : "Outlined"} variant="outlined" />
                <Chip
                  icon={<Icon icon="mdi:check" width={16} height={16} />}
                  label={currentLang === "ar" ? "مع أيقونة" : "With Icon"}
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  label={currentLang === "ar" ? "قابل للحذف" : "Deletable"}
                  onDelete={() => {}}
                  color="primary"
                />
              </Box>
            </Box>

            {/* Papers */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
                {currentLang === "ar" ? "الأوراق" : "Papers"}
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Paper elevation={0} sx={{ p: 2, minWidth: 100, textAlign: "center" }}>
                  <Typography variant="body2">elevation 0</Typography>
                </Paper>
                <Paper elevation={1} sx={{ p: 2, minWidth: 100, textAlign: "center" }}>
                  <Typography variant="body2">elevation 1</Typography>
                </Paper>
                <Paper elevation={2} sx={{ p: 2, minWidth: 100, textAlign: "center" }}>
                  <Typography variant="body2">elevation 2</Typography>
                </Paper>
                <Paper elevation={3} sx={{ p: 2, minWidth: 100, textAlign: "center" }}>
                  <Typography variant="body2">elevation 3</Typography>
                </Paper>
                <Paper variant="outlined" sx={{ p: 2, minWidth: 100, textAlign: "center" }}>
                  <Typography variant="body2">outlined</Typography>
                </Paper>
              </Box>
            </Box>

            {/* Text Fields */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
                {currentLang === "ar" ? "حقول النص" : "Text Fields"}
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <TextField
                    label={currentLang === "ar" ? "محدد" : "Outlined"}
                    variant="outlined"
                    size="small"
                    sx={{ minWidth: 160 }}
                  />
                  <TextField
                    label={currentLang === "ar" ? "مملوء" : "Filled"}
                    variant="filled"
                    size="small"
                    sx={{ minWidth: 160 }}
                  />
                  <TextField
                    label={currentLang === "ar" ? "قياسي" : "Standard"}
                    variant="standard"
                    size="small"
                    sx={{ minWidth: 160 }}
                  />
                </Box>
                <TextField
                  label={currentLang === "ar" ? "مع أيقونة" : "With Icon"}
                  variant="outlined"
                  size="small"
                  sx={{ maxWidth: 300 }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <Icon icon="mdi:magnify" width={18} height={18} style={{ opacity: 0.6 }} />
                      ),
                    },
                  }}
                />
              </Stack>
            </Box>

            {/* Cards */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
                {currentLang === "ar" ? "البطاقات" : "Cards"}
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {currentLang === "ar" ? "بطاقة بسيطة" : "Simple Card"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {currentLang === "ar"
                          ? "هذه بطاقة بسيطة مع محتوى نصي."
                          : "This is a simple card with text content."}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {currentLang === "ar" ? "بطاقة محددة" : "Outlined Card"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {currentLang === "ar"
                          ? "هذه بطاقة مع حدود فقط."
                          : "This is a card with only borders."}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card sx={{ background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)` }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
                        {currentLang === "ar" ? "بطاقة ملونة" : "Gradient Card"}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
                        {currentLang === "ar"
                          ? "بطاقة بخلفية متدرجة."
                          : "Card with gradient background."}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            {/* Table */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
                {currentLang === "ar" ? "جدول" : "Table"}
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size={compact ? "small" : "medium"}>
                  <TableHead>
                    <TableRow>
                      <TableCell>{currentLang === "ar" ? "المعرف" : "ID"}</TableCell>
                      <TableCell>{currentLang === "ar" ? "العميل" : "Customer"}</TableCell>
                      <TableCell align="right">{currentLang === "ar" ? "المبلغ" : "Amount"}</TableCell>
                      <TableCell align="right">{currentLang === "ar" ? "الحالة" : "Status"}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {TABLE_ROWS.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.customer}</TableCell>
                        <TableCell align="right">{row.amount}</TableCell>
                        <TableCell align="right">
                          <Chip
                            label={row.status}
                            size="small"
                            color={
                              row.status === "Completed"
                                ? "success"
                                : row.status === "Processing"
                                  ? "info"
                                  : "warning"
                            }
                            variant="outlined"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Dialog trigger */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
                {currentLang === "ar" ? "حوار" : "Dialog"}
              </Typography>
              <Button variant="outlined" onClick={handleDialogOpen}>
                {currentLang === "ar" ? "افتح الحوار" : "Open Dialog"}
              </Button>
            </Box>

            {/* Divider */}
            <Divider>
              <Chip
                label={currentLang === "ar" ? "معلومات السمة" : "Theme Info"}
                size="small"
                variant="outlined"
              />
            </Divider>

            {/* Theme Info */}
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {currentLang === "ar" ? "السمة الحالية" : "Current Theme"}:
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
                <Chip size="small" label={`mode: ${mode}`} variant="outlined" />
                <Chip size="small" label={`resolved: ${resolvedMode}`} variant="outlined" color="primary" />
                <Chip size="small" label={`preset: ${primaryPreset}`} variant="outlined"
                  sx={{ borderColor: theme.palette.primary.main, color: theme.palette.primary.main }} />
                <Chip size="small" label={theme.palette.primary.main} variant="outlined" />
                <Chip size="small" label={`compact: ${compact ? "on" : "off"}`} variant="outlined" />
                <Chip size="small" label={`contrast: ${contrast}`} variant="outlined" />
                <Chip size="small" label={`direction: ${theme.direction}`} variant="outlined" />
              </Box>
            </Paper>
          </Stack>
        </CardContent>
      </Card>

      {/* ── Typography Proof Section ── */}
      <Card sx={{ maxWidth: 720, width: "100%" }}>
        <CardContent sx={{ py: 4, px: 4 }}>
          <Typography variant="overline" color="text.secondary" sx={{ mb: 2, display: "block" }}>
            {currentLang === "ar" ? "الطباعة" : "Typography"}
          </Typography>

          <Stack spacing={2} sx={{ mt: 2 }}>
            {/* Headings */}
            <Box sx={{ borderBottom: 1, borderColor: "divider", pb: 1, mb: 1 }}>
              <Typography variant="caption" color="text.secondary">
                {currentLang === "ar" ? "العناوين" : "Headings"}
              </Typography>
            </Box>
            <Typography variant="h1">h1 — {currentLang === "ar" ? "مرحباً بكم في جايي" : "Welcome to Jaii"}</Typography>
            <Typography variant="h2">h2 — {currentLang === "ar" ? "لوحة التحكم" : "Dashboard"}</Typography>
            <Typography variant="h3">h3 — {currentLang === "ar" ? "إدارة الطلبات" : "Order Management"}</Typography>
            <Typography variant="h4">h4 — {currentLang === "ar" ? "تحليلات الأداء" : "Performance Analytics"}</Typography>
            <Typography variant="h5">h5 — {currentLang === "ar" ? "إعدادات المتجر" : "Store Settings"}</Typography>
            <Typography variant="h6">h6 — {currentLang === "ar" ? "تفاصيل العميل" : "Customer Details"}</Typography>

            {/* Body */}
            <Box sx={{ borderBottom: 1, borderColor: "divider", pb: 1, mb: 1, mt: 3 }}>
              <Typography variant="caption" color="text.secondary">
                {currentLang === "ar" ? "النصوص" : "Body Text"}
              </Typography>
            </Box>
            <Typography variant="body1">
              body1 — {currentLang === "ar"
                ? "هذا هو النص الأساسي المستخدم في المحتوى الرئيسي للصفحات. جايي هي منصة غسيل الملابس الرائدة في المملكة العربية السعودية."
                : "This is the primary body text used for main page content. Jaii is the leading laundry platform in Saudi Arabia."}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              body2 — {currentLang === "ar"
                ? "هذا هو النص الثانوي بحجم أصغر، يُستخدم في التفاصيل والملاحظات والتوضيحات الإضافية."
                : "This is secondary body text at a smaller size, used for details, notes, and additional explanations."}
            </Typography>

            {/* Subtitles */}
            <Box sx={{ borderBottom: 1, borderColor: "divider", pb: 1, mb: 1, mt: 3 }}>
              <Typography variant="caption" color="text.secondary">
                {currentLang === "ar" ? "العناوين الفرعية" : "Subtitles"}
              </Typography>
            </Box>
            <Typography variant="subtitle1">
              subtitle1 — {currentLang === "ar" ? "معلومات الحساب" : "Account Information"}
            </Typography>
            <Typography variant="subtitle2">
              subtitle2 — {currentLang === "ar" ? "آخر نشاط: منذ ٣ ساعات" : "Last activity: 3 hours ago"}
            </Typography>

            {/* Caption / Overline / Button */}
            <Box sx={{ borderBottom: 1, borderColor: "divider", pb: 1, mb: 1, mt: 3 }}>
              <Typography variant="caption" color="text.secondary">
                {currentLang === "ar" ? "تذييل وأزرار" : "Caption, Overline & Button"}
              </Typography>
            </Box>
            <Typography variant="caption">
              caption — {currentLang === "ar" ? "تم التحديث منذ ٥ دقائق" : "Updated 5 minutes ago"}
            </Typography>
            <Typography variant="overline" color="text.secondary">
              overline — {currentLang === "ar" ? "قسم الإحصائيات" : "STATISTICS SECTION"}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
              <Button variant="contained">
                {currentLang === "ar" ? "زر أساسي" : "Primary Button"}
              </Button>
              <Button variant="outlined">
                {currentLang === "ar" ? "زر ثانوي" : "Secondary Button"}
              </Button>
              <Button size="small">
                {currentLang === "ar" ? "صغير" : "Small"}
              </Button>
            </Box>

            {/* Scale table */}
            <Box sx={{ borderBottom: 1, borderColor: "divider", pb: 1, mb: 1, mt: 3 }}>
              <Typography variant="caption" color="text.secondary">
                {currentLang === "ar" ? "جدول القياسات" : "Token Scale (px)"}
              </Typography>
            </Box>
            <Grid container spacing={1} sx={{ fontSize: "13px" }}>
              {Object.entries(TYPOGRAPHY_SCALE).map(([variant, token]) => (
                <Grid key={variant} size={{ xs: 6, sm: 4 }}>
                  <Chip
                    label={`${variant}: ${token.size}px / w${token.weight}`}
                    size="small"
                    variant="outlined"
                    sx={{ width: "100%", justifyContent: "flex-start", fontFamily: "inherit" }}
                  />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </CardContent>
      </Card>

      {/* ── Navigation-Sized Sample ── */}
      <Card sx={{ maxWidth: 320, width: "100%" }}>
        <CardContent sx={{ py: compact ? 2 : 3, px: compact ? 2 : 3 }}>
          <Typography variant="overline" color="text.secondary" sx={{ mb: 1.5, display: "block" }}>
            {currentLang === "ar" ? "قائمة التنقل (نموذج)" : "Navigation Sample"}
          </Typography>
          <Paper variant="outlined" sx={{ borderRadius: 1 }}>
            <List disablePadding dense={compact}>
              {NAV_ITEMS.map((item) => (
                <ListItem key={item.labelEn} disablePadding>
                  <ListItemButton sx={{ py: compact ? 0.5 : 1 }}>
                    <ListItemIcon sx={{ minWidth: compact ? 32 : 40 }}>
                      <Icon icon={item.icon} width={compact ? 18 : 20} height={compact ? 18 : 20} />
                    </ListItemIcon>
                    <ListItemText
                      primary={currentLang === "ar" ? item.labelAr : item.labelEn}
                      slotProps={{
                        primary: {
                          variant: "body2",
                          sx: { fontSize: compact ? "13px" : "14px" },
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </CardContent>
      </Card>

      {/* ── Icon Proof Section ── */}
      <Card sx={{ maxWidth: 720, width: "100%" }}>
        <CardContent sx={{ py: 4, px: 4 }}>
          <Typography variant="overline" color="text.secondary" sx={{ mb: 2, display: "block" }}>
            {currentLang === "ar" ? "الأيقونات" : "Icons"} — @iconify/react
          </Typography>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            {iconSet.map(({ icon, label }) => (
              <Grid
                key={icon}
                size={{ xs: 3, sm: 2 }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 0.5,
                  p: 1.5,
                  borderRadius: 1,
                  "&:hover": { backgroundColor: "action.hover" },
                }}
              >
                <Icon icon={icon} width={28} height={28} />
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: "11px" }}>
                  {label}
                </Typography>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap", mt: 3 }}>
            <Icon icon="mdi:check-circle" width={24} height={24} color={theme.palette.success.main} />
            <Icon icon="mdi:alert-circle" width={24} height={24} color={theme.palette.error.main} />
            <Icon icon="mdi:star" width={24} height={24} color={theme.palette.warning.main} />
            <Icon icon="mdi:information" width={24} height={24} color={theme.palette.info.main} />
            <Chip
              icon={<Icon icon="mdi:refresh" width={16} height={16} />}
              label={currentLang === "ar" ? "تحديث" : "Refresh"}
              variant="outlined"
              size="small"
            />
            <Chip
              icon={<Icon icon="mdi:plus" width={16} height={16} />}
              label={currentLang === "ar" ? "إضافة" : "Add"}
              color="primary"
              size="small"
            />
          </Box>
        </CardContent>
      </Card>

      {/* ── RTL/LTR Proof — Dialog and TextField ── */}
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

      {/* Portal Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          {currentLang === "ar" ? "حوار اختباري" : "Test Dialog"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {currentLang === "ar"
              ? "هذا حوار اختباري للتحقق من تأثيرات السمة (نصف القطر، التباين، الوضع المضغوط)."
              : "This is a test dialog to verify theme effects (radius, contrast, compact mode)."}
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
          <Box sx={{ display: "flex", gap: 1, mt: 3, flexWrap: "wrap" }}>
            <Button variant="contained" size="small">
              {currentLang === "ar" ? "زر أساسي" : "Primary"}
            </Button>
            <Button variant="outlined" size="small">
              {currentLang === "ar" ? "ثانوي" : "Secondary"}
            </Button>
            <Chip label={currentLang === "ar" ? "علامة" : "Chip"} size="small" color="primary" />
            <Chip label={currentLang === "ar" ? "محدد" : "Outlined"} size="small" variant="outlined" />
          </Box>
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

      {/* ── Floating Appearance Customizer ── */}
      <AppearanceCustomizer />
    </Box>
  );
}
