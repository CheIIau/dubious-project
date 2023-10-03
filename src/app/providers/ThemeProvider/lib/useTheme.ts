import { useContext } from 'react'
import { LOCAL_STORAGE_THEME_KEY, THEME, ThemeContext } from './ThemeContext'

export function useTheme() {
    const { theme, setTheme } = useContext(ThemeContext)

    const toggleTheme = () => {
        const newTheme = theme === THEME.light ? THEME.dark : THEME.light
        setTheme!(newTheme)
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
    }
    return {theme, toggleTheme}
}
