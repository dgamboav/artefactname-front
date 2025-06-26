// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/styles/**/*.css",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mulish': ['Mulish', 'sans-serif'],
      },
      colors: {
        // These are available globally for background, text, border, etc.
        'Background-Default-Default': '#FFFFFF', // Blanco
        'Border-Default-Default': '#D1D5DB',   // Un gris medio, ajusta si es otro tono
      },
      // --- ADD THIS SECTION FOR OUTLINE COLORS ---
      outlineColor: {
        'Border-Default-Default': '#D1D5DB', // Map your custom color to outlineColor
      },
      // --- END ADDITION ---
    },
  },
  plugins: [],
}