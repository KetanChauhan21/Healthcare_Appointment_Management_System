/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // Modify paths based on your project structure
    ],
    theme: {
        extend: {
            colors:{
                'primary': '#FF6A00',
            }
        },
    },
    plugins: [],
};      