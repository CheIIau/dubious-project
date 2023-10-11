import React, { FC, PropsWithChildren, useMemo, useState } from 'react'
import {
    LOCAL_STORAGE_THEME_KEY,
    THEME,
    ThemeContext,
    ThemeType,
} from '../lib/ThemeContext'

const defaultTheme =
    (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as ThemeType) || THEME.light

interface ThemeProviderProps extends PropsWithChildren {
    initialTheme?: ThemeType
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

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
