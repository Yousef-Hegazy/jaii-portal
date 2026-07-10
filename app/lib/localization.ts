/**
 * Localization utilities for Jaii
 * Handles SAR currency, Gregorian dates, Arabic/Latin numbers, and Saudi phone formatting
 */

// ============================================================================
// Currency Formatting (SAR)
// ============================================================================

/**
 * Formats an amount in halalas to Saudi Riyals with proper Arabic numerals
 * @param halalas - Amount in halalas (1 SAR = 100 halalas)
 * @param locale - 'ar-SA' for Arabic numerals, 'en-US' for Latin numerals
 * @returns Formatted currency string (e.g., "١٬٢٣٤٫٥٠ ر.س" or "SAR 1,234.50")
 */
export function formatCurrencySAR(
  halalas: number,
  locale: "ar-SA" | "en-US" = "ar-SA"
): string {
  const sar = halalas / 100;

  if (locale === "ar-SA") {
    return new Intl.NumberFormat("ar-SA", {
      style: "currency",
      currency: "SAR",
      currencyDisplay: "name",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(sar);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "SAR",
    currencyDisplay: "code",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(sar);
}

/**
 * Formats an amount in SAR (not halalas) with proper locale
 * @param sar - Amount in SAR
 * @param locale - 'ar-SA' for Arabic numerals, 'en-US' for Latin numerals
 */
export function formatSAR(
  sar: number,
  locale: "ar-SA" | "en-US" = "ar-SA"
): string {
  if (locale === "ar-SA") {
    return new Intl.NumberFormat("ar-SA", {
      style: "currency",
      currency: "SAR",
      currencyDisplay: "name",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(sar);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "SAR",
    currencyDisplay: "code",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(sar);
}

// ============================================================================
// Date Formatting (Gregorian)
// ============================================================================

/**
 * Formats a date in Arabic format with Gregorian calendar
 * @param date - Date to format
 * @param locale - 'ar-SA' for Arabic, 'en-US' for English
 * @returns Formatted date string (e.g., "١٥ يوليو ٢٠٢٤ م" or "Jul 15, 2024")
 */
export function formatDateAr(
  date: Date | string | number,
  locale: "ar-SA" | "en-US" = "ar-SA"
): string {
  const d = new Date(date);

  if (locale === "ar-SA") {
    // Arabic month name + Gregorian year + م (for Gregorian calendar)
    const formatter = new Intl.DateTimeFormat("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      calendar: "gregory",
    });

    let formatted = formatter.format(d);
    // Add م for Gregorian calendar indication
    if (!formatted.includes("م")) {
      formatted += " م";
    }
    return formatted;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
}

/**
 * Formats a date with time
 * @param date - Date to format
 * @param locale - 'ar-SA' for Arabic, 'en-US' for English
 */
export function formatDateTime(
  date: Date | string | number,
  locale: "ar-SA" | "en-US" = "ar-SA"
): string {
  const d = new Date(date);

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    calendar: "gregory",
  }).format(d);
}

/**
 * Formats a date as relative time (e.g., "منذ ٥ دقائق" or "5 minutes ago")
 * @param date - Date to format
 * @param locale - 'ar-SA' for Arabic, 'en-US' for English
 */
export function formatRelativeTime(
  date: Date | string | number,
  locale: "ar-SA" | "en-US" = "ar-SA"
): string {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  const rtf = new Intl.RelativeTimeFormat(locale, {
    numeric: "auto",
  });

  if (diffDay > 0) {
    return rtf.format(-diffDay, "day");
  }
  if (diffHour > 0) {
    return rtf.format(-diffHour, "hour");
  }
  if (diffMin > 0) {
    return rtf.format(-diffMin, "minute");
  }
  return rtf.format(-diffSec, "second");
}

/**
 * Formats a date for input fields (YYYY-MM-DD)
 */
export function formatDateInput(date: Date | string | number): string {
  const d = new Date(date);
  return d.toISOString().split("T")[0];
}

// ============================================================================
// Number Formatting
// ============================================================================

/**
 * Formats a number with Arabic or Latin numerals
 * @param value - Number to format
 * @param locale - 'ar-SA' for Arabic numerals, 'en-US' for Latin numerals
 * @param options - Intl.NumberFormatOptions
 */
export function formatNumber(
  value: number,
  locale: "ar-SA" | "en-US" = "ar-SA",
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, {
    numberingSystem: locale === "ar-SA" ? "arab" : "latn",
    ...options,
  }).format(value);
}

/**
 * Formats a number as percentage
 */
export function formatPercent(
  value: number,
  locale: "ar-SA" | "en-US" = "ar-SA"
): string {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
}

/**
 * Formats a number with compact notation (e.g., 1.2K, 1.5M)
 */
export function formatCompact(
  value: number,
  locale: "ar-SA" | "en-US" = "ar-SA"
): string {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    compactDisplay: "short",
  }).format(value);
}

// ============================================================================
// Phone Formatting (Saudi)
// ============================================================================

/**
 * Formats a Saudi phone number
 * @param phone - Phone number (can include +966 or start with 05)
 * @param locale - 'ar-SA' for Arabic, 'en-US' for English
 * @returns Formatted phone string (e.g., "+966 5X XXX XXXX")
 */
export function formatSaudiPhone(
  phone: string,
  locale: "ar-SA" | "en-US" = "ar-SA"
): string {
  // Remove all non-digit characters
  let digits = phone.replace(/\D/g, "");

  // Handle different formats
  if (digits.startsWith("966")) {
    digits = digits.slice(3);
  } else if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  // Validate Saudi mobile number (starts with 5)
  if (!digits.startsWith("5") || digits.length !== 9) {
    return phone; // Return original if invalid
  }

  // Format: +966 5X XXX XXXX
  const formatted = `+966 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;

  if (locale === "ar-SA") {
    // Convert to Arabic numerals
    return formatted.replace(/\d/g, (d) => ARABIC_NUMERALS[parseInt(d)]);
  }

  return formatted;
}

/**
 * Validates a Saudi phone number
 */
export function isValidSaudiPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");

  // Check for +966 format
  if (digits.startsWith("966")) {
    const rest = digits.slice(3);
    return /^5[0-9]{8}$/.test(rest);
  }

  // Check for 05 format
  if (digits.startsWith("05")) {
    return /^05[0-9]{8}$/.test(digits);
  }

  // Check for 5 format (without prefix)
  return /^5[0-9]{8}$/.test(digits);
}

/**
 * Normalizes a Saudi phone number to international format
 */
export function normalizeSaudiPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("966")) {
    return `+${digits}`;
  }

  if (digits.startsWith("0")) {
    return `+966${digits.slice(1)}`;
  }

  return `+966${digits}`;
}

// ============================================================================
// Status Localization
// ============================================================================

export const ORDER_STATUS = {
  pending: { ar: "قيد الانتظار", en: "Pending" },
  confirmed: { ar: "مؤكد", en: "Confirmed" },
  pickedUp: { ar: "تم الاستلام", en: "Picked Up" },
  processing: { ar: "قيد المعالجة", en: "Processing" },
  ready: { ar: "جاهز", en: "Ready" },
  delivered: { ar: "تم التوصيل", en: "Delivered" },
  cancelled: { ar: "ملغي", en: "Cancelled" },
} as const;

export function getOrderStatus(
  status: keyof typeof ORDER_STATUS,
  locale: "ar-SA" | "en-US" = "ar-SA"
): string {
  return locale === "ar-SA" ? ORDER_STATUS[status].ar : ORDER_STATUS[status].en;
}

export const LOYALTY_TIER = {
  bronze: { ar: "برونزي", en: "Bronze" },
  silver: { ar: "فضي", en: "Silver" },
  gold: { ar: "ذهبي", en: "Gold" },
  platinum: { ar: "بلاتيني", en: "Platinum" },
} as const;

export function getLoyaltyTier(
  tier: keyof typeof LOYALTY_TIER,
  locale: "ar-SA" | "en-US" = "ar-SA"
): string {
  return locale === "ar-SA" ? LOYALTY_TIER[tier].ar : LOYALTY_TIER[tier].en;
}

// ============================================================================
// Constants
// ============================================================================

export const ARABIC_NUMERALS: Record<number, string> = {
  0: "٠",
  1: "١",
  2: "٢",
  3: "٣",
  4: "٤",
  5: "٥",
  6: "٦",
  7: "٧",
  8: "٨",
  9: "٩",
};

export const LATIN_NUMERALS: Record<string, number> = {
  "٠": 0,
  "١": 1,
  "٢": 2,
  "٣": 3,
  "٤": 4,
  "٥": 5,
  "٦": 6,
  "٧": 7,
  "٨": 8,
  "٩": 9,
};

/**
 * Converts Arabic numerals to Latin numerals
 */
export function arabicToLatinNumerals(str: string): string {
  return str.replace(/[٠-٩]/g, (d) => String(LATIN_NUMERALS[d] ?? d));
}

/**
 * Converts Latin numerals to Arabic numerals
 */
export function latinToArabicNumerals(str: string): string {
  return str.replace(/[0-9]/g, (d) => ARABIC_NUMERALS[parseInt(d)]);
}
