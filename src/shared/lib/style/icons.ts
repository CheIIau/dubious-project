import type { ThemeType } from 'src/app/providers/ThemeProvider/themeProviderIndex'

export function fillIcon(theme: ThemeType) {
    if (theme === 'dark') {
        return '#202028'
    }
    return '#f9f9fe'
}
