const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        fontFamily: {
            sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
            roboto: ['Roboto', 'sans-serif'],
        },
        extend: {
            height: {
                'screen-header': '90vh',
            },
            minHeight: {
                'screen-header': '90vh',
            },
            width: {
                'screen-side-menu': '85vw',
            },
        },
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    daisyui: {
        themes: [
            {
                lockr: {
                    primary: '#661AE6',
                    secondary: '#D926AA',
                    accent: '#1FB2A5',
                    neutral: '#CCCCCC',
                    'base-100': '#FFF',
                    info: '#3ABFF8',
                    success: '#198754',
                    warning: '#FBBD23',
                    error: '#d9534f',
                },
            },
        ],
    },
};
