/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        logoFont: ["Playfair Display", "serif"],
      },
      colors: {
        brand: "#041e3a",
      },
    },
  },
  plugins: [],
};
