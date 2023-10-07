import type { Config } from 'tailwindcss'

export default {
    content: ['./src/**/*.{tsx,jsx,ts,js}', './public/*.html', './stories/*.stories.{ts,jsx,ts,js}'],
    theme: {
        extend: {}
    },
    plugins: []
} satisfies Config
