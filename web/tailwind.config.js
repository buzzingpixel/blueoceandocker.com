const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [
        // Customize: https://github.com/tailwindlabs/tailwindcss-typography#customization
        // https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/styles.js
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/forms'),
    ],
};
