export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        p5red: '#E61E25',
        amber:  '#C4962A',
        dark:   '#0d0a08',
        warm:   '#F0EBE3',
      },
      fontFamily: {
        p5:   ['Anton', 'sans-serif'],
        body: ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
}