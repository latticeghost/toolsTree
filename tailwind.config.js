// tailwind.config.js
module.exports = {
  content: [
    './contact.html',
    './index.html',
    './privacy.html',
    './success.html',
    './categories/clock.html',
    './categories/data-dev.html',
    './categories/finance.html',
    './categories/image.html',
    './categories/misc.html',
    './categories/text.html',
    './tools/case-converter.html',
    './tools/character-counter.html',
    './tools/compound-interest.html',
    './tools/contrast-checker.html',
    './tools/css-gradient-generator.html',
    './tools/currency-converter.html',
    './tools/data-converter.html',
    './tools/emi-calculator.html',
    './tools/fd-calculator.html',
    './tools/hash-generator.html',
    './tools/headline-title-case.html',
    './tools/image-compressor.html',
    './tools/json-formatter.html',
    './tools/password-generator.html',
    './tools/qr-generator.html',
    './tools/rd-calculator.html',
    './tools/remove-spaces.html',
    './tools/rent-vs-buy-calculator.html',
    './tools/retirement-calculator.html',
    './tools/reverse-text.html',
    './tools/simple-interest.html',
    './tools/sip-calculator.html',
    './tools/time-zone-converter.html',
    './tools/favicon-generator.html',
    './tools/jwt-debugger.html',
    './tools/css-grid-generator.html'
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