import { createContext } from 'react'

export const THEME = {
    light: 'light',
    dark: 'dark'
} as const

export interface ThemeContextProps {
    theme: keyof typeof THEME
    setTheme: (theme: keyof typeof THEME) => void
}

export const ThemeContext = createContext<
    ThemeContextProps | Record<string, never>
>({})

export const LOCAL_STORAGE_THEME_KEY = 'theme'
