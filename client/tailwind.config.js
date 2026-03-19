/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#064E3B',
          light: '#059669',
          dark: '#022C22',
        },
        secondary: {
          DEFAULT: '#78350F',
          light: '#B45309',
          dark: '#451A03',
        },
        accent: {
          DEFAULT: '#F59E0B',
          light: '#FBBF24',
          dark: '#B45309',
        },
        nature: '#ECFDF5',
        earth: '#FFFBEB',
        surface: '#FFFFFF',
        background: '#FAFAF9',
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'premium': '0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 4px 10px -2px rgba(0, 0, 0, 0.02)',
        'premium-hover': '0 20px 40px -5px rgba(0, 0, 0, 0.1), 0 8px 20px -2px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'fade-slide': 'fadeSlideIn 0.5s ease both',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeSlideIn: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
