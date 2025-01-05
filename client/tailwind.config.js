/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellowLight: '#ffda50', 
        yellowDark: '#fdb714', 
        grayDark: '#262626',   
        grayMedium: '#4c4c4c', 
        brown: {
          50: '#f7ede2',
          100: '#e6d4c5',
          200: '#d6baa7',
          300: '#c69f89',
          400: '#b7856b',
          500: '#a66b51', // Primary brown shade
          600: '#8a5541',
          700: '#6c4032',
          800: '#4d2b22',
          900: '#2f1612',
        },
        Orange: {
          50: '#FFF8F0',
          100: '#FFE9D3',
          200: '#FFC99A',
          300: '#FFA66B',
          400: '#FF8240',
          500: '#FF5800',
          600: '#DB4700',
          700: '#B73800',
          800: '#932A00',
          900: '#7A2100',
        },
      },
    },
  },
  plugins: [],
};


