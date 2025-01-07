/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "black-23": "rgba(0, 0, 0, 0.23)",
        "black-87": "rgba(0, 0, 0, 0.87)"
      }
    },
  },
  plugins: [],
}

