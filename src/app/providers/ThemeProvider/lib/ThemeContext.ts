import { createContext } from 'react'
import type { ThemeType } from 'src/shared/const/theme'

interface ThemeContextProps {
    theme: ThemeType
    setTheme: (theme: ThemeType) => void
}

export const ThemeContext = createContext<
    ThemeContextProps | Record<string, never>
>({})
