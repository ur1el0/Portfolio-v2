/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
    extend: {
        colors: {
        bg: {
            dark: '#090a0f',
            surface: '#0b0f17',
            card: 'rgba(19, 23, 34, 0.7)',
        },
        accent: {
            cyan: '#38bdf8',
            emerald: '#10b981',
        },
        },
        fontFamily: {
        sans: ['Inter', 'Geist', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        },
    },
    },
    plugins: [],
};