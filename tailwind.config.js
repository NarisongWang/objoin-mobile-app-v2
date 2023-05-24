/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        xxs: ['10px', '14px'],
      },
    },
    screens: {
      md: '600px',
    },
  },
  plugins: [],
};
