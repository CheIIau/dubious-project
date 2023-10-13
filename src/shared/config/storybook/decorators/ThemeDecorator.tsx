import type { Decorator } from '@storybook/react'
import type {
    ThemeType} from 'src/app/providers/ThemeProvider/themeProviderIndex'
import {
    ThemeProvider
} from 'src/app/providers/ThemeProvider/themeProviderIndex'

export const ThemeDecorator: (theme: ThemeType) => Decorator = (theme) => {
    return function ThemedStory(Story) {
        return (
            <ThemeProvider initialTheme={theme}>
                <div
                    className={`app ${theme} p-10`}
                    style={{ minHeight: 'unset' }}
                >
                    {Story()}
                </div>
            </ThemeProvider>
        )
    }
}
