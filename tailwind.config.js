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
      },
      colors: {
        "primary-red": "#E32636",
        "secondary-red": "#FF0000",
        "primary-black": "#020202",
        "secondary-black": "#1D1D1F",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
