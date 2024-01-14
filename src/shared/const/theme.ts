export const THEME = {
    light: 'light',
    dark: 'dark',
    orange: 'orange',
} as const

export type ThemeType = keyof typeof THEME