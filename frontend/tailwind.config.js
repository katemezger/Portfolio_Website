export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        onyx:          '#0C120C',
        cornsilk:      '#F3ECCD',
        'dusty-olive': '#647656',
        'olive-wood':  '#7A6243',
        'deep-space':  '#0B3954',
        candlelight:   '#D4A853',
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        serif:   ['Cormorant Garamond', 'serif'],
        body:    ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}