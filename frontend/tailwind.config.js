/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"], // Merge content types from both versions
  theme: {
    extend: {}, // You can extend the theme configuration here if needed
  },
  plugins: [], // Merge plugins if needed
};
