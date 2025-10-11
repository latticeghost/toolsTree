// tailwind.config.js
module.exports = {
  content: [
    "./*.html",
    "./categories/**/*.html",
    "./tools/**/*.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'tt-primary': '#10b981',
        'tt-secondary': '#4f46e5',
      },
      fontFamily: {
        sans: ['Roboto Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}