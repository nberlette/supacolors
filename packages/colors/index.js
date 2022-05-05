const darkPreset = require('@supacolors/presets/dark')
const darkAlphaPreset = require('@supacolors/presets/darkAlpha')
const lightPreset = require('@supacolors/presets/light')
const lightAlphaPreset = require('@supacolors/presets/lightAlpha')

const {
  theme: { colors: light },
} = lightPreset
const {
  theme: { colors: dark },
} = darkPreset
const {
  theme: {
    extend: { colors: lightAlpha },
  },
} = lightAlphaPreset
const {
  theme: {
    extend: { colors: darkAlpha },
  },
} = darkAlphaPreset

const colors = {
  light: {
    ...light,
    ...lightAlpha,
  },
  dark: {
    ...dark,
    ...darkAlpha,
  },
}

module.exports = exports.default = {
  colors,
  dark: darkPreset,
  darkAlpha: darkAlphaPreset,
  light: lightPreset,
  lightAlpha: lightAlphaPreset,
}
