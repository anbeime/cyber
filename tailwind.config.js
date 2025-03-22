/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        }
        secondary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        }
      }
      animation: {
        'incense-burn': 'incense-burn 30s linear infinite',
        'smoke': 'smoke 3s ease-out infinite',
      }
      keyframes: {
        'incense-burn': {
          '0%': { height: '100%' }
          '100%': { height: '0%' }
        }
        'smoke': {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0.3' }
          '100%': { transform: 'translateY(-200%) scale(2)', opacity: '0' }
        }
      }
      boxShadow: {
        neon: '0 0 5px rgba(14, 165, 233, 0.5), 0 0 20px rgba(14, 165, 233, 0.3)',
      }
    }
  }
  plugins: [],
}