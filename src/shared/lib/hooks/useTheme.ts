import { useContext } from 'react'
import { ThemeContext } from '../../../app/providers/ThemeProvider/lib/ThemeContext'
import { THEME } from 'src/shared/const/theme'
import { LOCAL_STORAGE_THEME_KEY } from 'src/shared/const/localstorage'

export function useTheme() {
    const { theme, setTheme } = useContext(ThemeContext)

    const toggleTheme = () => {
        let newTheme: keyof typeof THEME
        switch (theme) {
            case THEME.dark: {
                newTheme = THEME.light
                break
            }
            case THEME.light: {
                newTheme = THEME.orange
                break
            }
            case THEME.orange: {
                newTheme = THEME.dark
                break
            }
            default:
                newTheme = THEME.light
        }
        setTheme?.(newTheme)
        document.body.className = newTheme
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
    }
    return { theme: theme || THEME.light, toggleTheme }
}
