/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            height: {
                'screen-header': '90vh',
            },
            minHeight: {
                'screen-header': '90vh',
            },
        },
    },
    plugins: [],
};
