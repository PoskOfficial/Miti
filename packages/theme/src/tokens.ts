/**
 * @miti/theme — single source of truth for color, type, radius, spacing.
 *
 * Design read: multi-surface Nepali calendar (web PWA + native + extension)
 * for general users, calm/minimal language, Tailwind neutral + shadcn + Tamagui.
 * DIALS: VARIANCE 5 / MOTION 3 / DENSITY 5
 *
 * Rules locked here:
 * - One brand accent (indigo-600 #4f46e5) used on ALL surfaces.
 * - One radius scale (0.5rem). One font stack (Inter latin + Mukta numerals).
 * - No purple-gradient slop, no pure #000/#fff, WCAG AA contrast.
 */

export const brand = {
  // Canonical primary — indigo-600, matches vite today, replaces plasmo blue-600
  primaryHex: "#4f46e5",
  primaryHoverHex: "#4338ca", // indigo-700
  primarySoftBgLight: "#eef2ff", // indigo-50
  primaryBorderLight: "#c7d2fe", // indigo-200
  ringHex: "#6366f1", // indigo-500 for focus rings
} as const;

export const surfaces = {
  light: {
    background: "#ffffff",
    card: "#ffffff",
    muted: "#f4f4f5", // zinc-100 ~ secondary/muted
    border: "#e4e4e7", // zinc-200
    foreground: "#09090b", // zinc-950, not pure black
  },
  dark: {
    // Matches vite .dark HSL 220 20% 9% / 11% / 15% / 18%
    background: "#12151d",
    card: "#161b26",
    muted: "#202635",
    border: "#252d3d",
    accent: "#2b3548",
    foreground: "#f7f8fa",
  },
  // Plasmo popup legacy — keep as alias to dark.card for migration
  popupLegacy: "#1f2937",
} as const;

export const semantic = {
  holidayLight: "#e11d48", // rose-600
  holidayDark: "#fb7185", // rose-400
  todayBgLight: "#c7d2fe", // indigo-200
  todayTextLight: "#4f46e5", // indigo-600
} as const;

export const radius = {
  base: "0.5rem", // 8px — single scale
  sm: "calc(0.5rem - 4px)", // 4px
  md: "calc(0.5rem - 2px)", // 6px
  lg: "0.5rem", // 8px
  full: "9999px",
  // Tamagui numeric mapping
  tamagui: {
    3: 6,
    4: 8,
  },
} as const;

export const fonts = {
  sans: ["Inter", "system-ui", "sans-serif"],
  mukta: ["Mukta", "Inter", "sans-serif"],
  // Single label for calendar numerals
  calendarNumeral: "'Mukta', 'Inter', sans-serif",
} as const;

export const spacing = {
  navHeight: 64, // h-16 — 80px max per skill, we lock 64
  containerWeb: "80rem", // max-w-7xl
  containerPopup: "30rem",
  cellHeight: 72,
} as const;

/**
 * Google Calendar event colorIds 1-11.
 * Canonical hex (API truth) + Tailwind light classes + dark-aware classes.
 * Vite previously only had light classes; plasmo/expo had none.
 */
export const eventColors: Record<
  string,
  { hex: string; bg: string; text: string; border: string }
> = {
  "1": { hex: "#7986cb", bg: "bg-indigo-100", text: "text-indigo-700", border: "border-indigo-200" },
  "2": { hex: "#33b679", bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-200" },
  "3": { hex: "#8e24aa", bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200" },
  "4": { hex: "#e67c73", bg: "bg-rose-100", text: "text-rose-700", border: "border-rose-200" },
  "5": { hex: "#f6c026", bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200" },
  "6": { hex: "#f5511d", bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-200" },
  "7": { hex: "#039be5", bg: "bg-sky-100", text: "text-sky-700", border: "border-sky-200" },
  "8": { hex: "#616161", bg: "bg-neutral-100", text: "text-neutral-700", border: "border-neutral-200" },
  "9": { hex: "#3f51b5", bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" },
  "10": { hex: "#0b8043", bg: "bg-lime-100", text: "text-lime-700", border: "border-lime-200" },
  "11": { hex: "#d60000", bg: "bg-red-100", text: "text-red-700", border: "border-red-200" },
};

export const eventHex: Record<string, string> = Object.fromEntries(
  Object.entries(eventColors).map(([k, v]) => [k, v.hex])
);

export const fallbackEventHex = "#64748b"; // slate-500, was #475569
