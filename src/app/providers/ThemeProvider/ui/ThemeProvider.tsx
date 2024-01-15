import type { FC, PropsWithChildren } from 'react'
import { useMemo, useState } from 'react'
import type { ThemeType } from 'src/shared/const/theme'
import { THEME } from 'src/shared/const/theme'
import { LOCAL_STORAGE_THEME_KEY } from 'src/shared/const/localstorage'
import { ThemeContext } from 'src/shared/lib/context/ThemeContext'

const defaultTheme =
    (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as ThemeType) || THEME.light

interface ThemeProviderProps extends PropsWithChildren {
    readonly initialTheme?: ThemeType
}

const ThemeProvider: FC<ThemeProviderProps> = ({ initialTheme, children }) => {
    const [theme, setTheme] = useState<ThemeType>(initialTheme || defaultTheme)

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme],
    )

    if (!document.body.classList.length) {
        document.body.className = theme
    }

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
