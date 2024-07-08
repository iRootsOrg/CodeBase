/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customColor1: "#077187",
        customColor2: "#029AB4",
        customColor3: "#2CA7C6",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(118deg, #077187 0%, #029AB4 45%, #2CA7C6 100%)",
      },
    },
  },
  plugins: [],
};
