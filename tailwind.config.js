/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,vue,ts,css}"],
  theme: {
    extend: {
      screens: {
        'sh': {'raw': '(max-height: 840px)'},
        'sm': {'raw': '(min-width: 640px)'},
        'max-sm': {'raw': '(max-width: 640px)'},
      }
    },
    fontFamily: {
      'roboto': ['Roboto', 'sans-serif'],
    },
  },
  plugins: [],
}

