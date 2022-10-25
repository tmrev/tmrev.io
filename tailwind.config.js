/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  plugins: [],
  theme: {
    extend: {
      aspectRatio: {
        moviePoster: '2 / 3',
      },
      colors: {
        black: '#242424',
        tmrev: {
          alt: {
            blue: '#1CBA13',
            red: '#FD4C55',
            yellow: '#FFC000',
          },
          gray: {
            dark: '#3B3B3B',
            light: '#7B7B7B',
            mid: '#555555',

          },
          purple: {
            main: '#430062',
            secondary: '#340049',
          },
        },
        white: '#FFFDFA',
      },
    },
  },
};
