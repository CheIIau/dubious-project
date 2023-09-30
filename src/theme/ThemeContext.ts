import { createContext } from "react"

export const Theme = {
    light: 'light',
    dark: 'dark'
} as const

export interface ThemeContextProps {
    theme?: keyof typeof Theme
    setTheme?: (theme: keyof typeof Theme) => void
}

export const ThemeContext = createContext<ThemeContextProps>({})

export const LOCAL_STORAGE_THEME_KEY = 'theme'