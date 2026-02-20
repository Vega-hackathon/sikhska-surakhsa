/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'Roboto', 'sans-serif'],
            },
            colors: {
                primary: {
                    blue: '#1e40af', // subtle blue
                    dark: '#0f172a', // deep blue space
                    glass: 'rgba(255, 255, 255, 0.1)',
                }
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            },
            backdropBlur: {
                'glass': '10px',
            },
            animation: {
                'shimmer': 'shimmer 8s infinite linear',
            },
            keyframes: {
                shimmer: {
                    '0%': { transform: 'translateX(-100%) skewX(-20deg)' },
                    '100%': { transform: 'translateX(200%) skewX(-20deg)' },
                }
            }
        },
    },
    plugins: [],
}
