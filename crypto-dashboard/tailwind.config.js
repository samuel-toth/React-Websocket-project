/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      rotate: {
        full: "360deg",
      },

    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
