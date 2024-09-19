/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Kanit', 'sans-serif'],
    },
    extend: {
      colors: {
        sea: '#243c5a',
        fullBg: '#fafcff',
        tableHeader: '#f2f5fa',
        title: '#9fabbe',
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
    },
    plugins: [],
  },
}
