module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontSize: {
        '2xs': '0.66em',
        '3xs': '0.5em',
      },
    },
  },
  plugins: [],
  presets: [require('@supacolors/presets/dark'), require('@supacolors/presets/darkAlpha')],
}
