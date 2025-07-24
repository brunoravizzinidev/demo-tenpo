/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './js/**/*.js'],
	theme: {
		extend: {
			colors: {
				// Paleta de colores Tenpo - Cuenta Digital Chile
				'light-text': '#EEEEEE', // Texto claro
				secondary: '#00B2FF', // Azul secundario
				tenpo: '#00C48C', // Verde principal Tenpo
				'tenpo-suave': '#A7F3CE', // Verde suave Tenpo
			},
			fontFamily: {
				// Tipografías personalizadas
				heading: ['Graphie', 'sans-serif'], // Títulos
				body: ['Open Sans', 'sans-serif'], // Cuerpo (corregido)
			},
			fontSize: {
				// Tamaños de fuente específicos
				'hero-title': ['4rem', { lineHeight: '1.1' }],
				'hero-subtitle': ['1.5rem', { lineHeight: '1.4' }],
				'section-title': ['2.5rem', { lineHeight: '1.2' }],
			},
			spacing: {
				18: '4.5rem',
				88: '22rem',
				128: '32rem',
			},
			animation: {
				'fade-in': 'fadeIn 0.6s ease-in-out',
				'slide-up': 'slideUp 0.8s ease-out',
				'zoom-in': 'zoomIn 0.5s ease-out',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				slideUp: {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				zoomIn: {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
			},
			backdropBlur: {
				xs: '2px',
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
