/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#0f2370',
        'primary-green': '#079233',
        'primary-pink': '#f3597f',
        'primary-orange': '#f9f2e8',
      },
    },
  },
  plugins: [],
};
