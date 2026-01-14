/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          darkest: '#031716',
          dark: '#032F30',
          DEFAULT: '#0A7075',
          light: '#0C969C',
          lighter: '#6BA3BE',
          muted: '#274D60'
        }
      },
      backdropBlur: {
        glass: '20px'
      },
      backgroundColor: {
        'glass': 'rgba(3, 47, 48, 0.25)',
        'glass-dark': 'rgba(3, 23, 22, 0.4)',
        'glass-light': 'rgba(107, 163, 190, 0.15)'
      },
      borderColor: {
        'glass': 'rgba(107, 163, 190, 0.18)'
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(3, 23, 22, 0.37)',
        'glass-lg': '0 12px 48px 0 rgba(3, 23, 22, 0.5)'
      }
    }
  },
  plugins: []
}
