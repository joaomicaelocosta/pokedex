const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    options: {
      safelist: [
        'bg-green-400', 
        'bg-red-500', 
        'bg-blue-400', 
        'bg-green-600', 
        'bg-gray-400', 
        'bg-purple-600', 
        'bg-yellow-400', 
        'bg-yellow-600', 
        'bg-pink-400', 
        'bg-red-400', 
        'bg-pink-600', 
        'bg-amber-900', 
        'bg-purple-400', 
        'bg-blue-200', 
        'bg-blue-700', 
        'bg-dark', 
        'bg-gray-700', 
        'bg-blue-500'
      ],
    }
  },
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      minWidth: {
        '130': '130px',
        '240': '240px'
      },
      colors: {
        ...colors,
        'dark': '#432616',
      },
    },
  },
  plugins: [],
}

