/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          DEFAULT: '#1A3C6E',
          dark: '#0F2548',
          light: '#2563EB',
        },
        wa: {
          DEFAULT: '#25D366',
          dark: '#128C7E',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSlight: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':       { transform: 'translateY(-5px)' },
        },
      },
      animation: {
        fadeIn:       'fadeIn 0.3s ease-out',
        bounceSlight: 'bounceSlight 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
