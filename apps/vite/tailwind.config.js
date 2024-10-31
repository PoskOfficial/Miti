/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      mukta: ['Mukta', 'sans-serif'],
    },
    extend: {
      gridAutoRows: {
        cell: '72px',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
