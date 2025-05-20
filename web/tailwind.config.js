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
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        pre: {
                            color: theme('colors.gray.600'),
                            'background-color': 'hsl(230, 1%, 98%)',
                        },
                        code: {
                            'padding-left': '0.4rem',
                            'padding-right': '0.4rem',
                            'padding-top': '0.2rem',
                            'padding-bottom': '0.2rem',
                            'background-color': 'hsl(0, 0%, 92%)',
                            'border-radius': 'var(--radius-sm)',
                        },
                    }
                }
            }),
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
