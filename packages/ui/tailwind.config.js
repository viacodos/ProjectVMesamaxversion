/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"../../apps/frontend-user/**/*.{js,jsx,ts,tsx}",
		"../../apps/frontend-admin/**/*.{js,jsx,ts,tsx}"
	],
	theme: {
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				// Project Specific Colors
				ochre: {
					DEFAULT: '#D48D4D',
					light: '#E6A56C',
					dark: '#B87035'
				},
				'teal-dark': {
					DEFAULT: '#23383B',
					lighter: '#2F4B4F',
					darker: '#1A2A2C'
				},
				'beige-light': {
					DEFAULT: '#F5F5F0',
					dim: '#EBEBE6'
				}
			},
			fontFamily: {
				serif: ['"Playfair Display"', 'serif'],
				sans: ['Inter', 'Manrope', 'sans-serif'],
				display: ['"Playfair Display"', 'serif'],
				body: ['Inter', 'sans-serif']
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			backdropBlur: {
				glass: '16px',
				'glass-lg': '24px'
			},
			boxShadow: {
				glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
				'glass-inset': 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)'
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"aurora": {
					"0%, 100%": { backgroundPosition: "0% 50%" },
					"50%": { backgroundPosition: "100% 50%" }
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"aurora": "aurora 15s ease infinite",
			},
		},
	},
	plugins: [require('tailwindcss-animate')]
}
