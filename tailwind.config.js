/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    "./theme.ts"
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          100: '#fff5e1',
          200: '#fce7bf',
          300: '#e5cd9c',
          400: '#cbb385',
          500: '#ae986f',
          600: '#927f59',
          700: '#6a5b3e',
          800: '#544832',
          900: '#423925'
        }
      }
    },
  },
  plugins: [],
}
