/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,html}"],
  // Locked dark popup to match vite .dark tokens (@miti/theme surfaces.dark).
  // Single radius scale 0.5rem, single brand accent indigo-600 #4f46e5.
  darkMode: "class",
  prefix: "plasmo-",
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#4f46e5",
          hover: "#4338ca",
          soft: "#eef2ff",
          ring: "#6366f1",
        },
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
        lg: "0.5rem",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mukta: ["Mukta", "Inter", "sans-serif"],
      },
    },
  },
}
