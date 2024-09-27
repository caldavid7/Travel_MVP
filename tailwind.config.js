/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        ocean: "linear-gradient(90deg, #1CB5E0 0%, #000851 100%);",
        darken:
          " linear-gradient(180deg, rgba(0, 0, 0, 0) 74.81%, #000000 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))",
        darken_bottom:
          "linear-gradient(180deg, rgba(0, 0, 0, 0) 43.66%, #000000 100%)",
      },
      colors: {
        "transparent-black": "rgba(35, 35, 35, 0.64)",
        "light-gray": " #F3F3F3",
        "middle-gray": "#D9D9D9",

        "primary-red": "#E32636",
        "secondary-red": "#FF0000",

        "primary-black": "#020202",
        "secondary-black": "#1D1D1F",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
