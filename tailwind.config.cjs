/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,svelte}",
  ],
  theme: {
    extend: {
      zIndex: {
        '1': '1',
        '2': '2',
        '3': '3'
      },
      inset: {
        '1/4': '25%'
      }
    },
  },
  plugins: [],
}
