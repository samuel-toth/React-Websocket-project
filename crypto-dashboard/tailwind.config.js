/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      rotate: {
        full: "360deg",
      },
      height: {
        25: "25%",
        300: "300px",
        400: "400px",
        100: "28rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
