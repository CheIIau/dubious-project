import { createContext } from 'react'

export const THEME = {
    light: 'light',
    dark: 'dark',
    orange: 'orange',
} as const

export type ThemeType = keyof typeof THEME

export interface ThemeContextProps {
    theme: ThemeType
    setTheme: (theme: ThemeType) => void
}

export const ThemeContext = createContext<
    ThemeContextProps | Record<string, never>
>({})

export const LOCAL_STORAGE_THEME_KEY = 'theme'
