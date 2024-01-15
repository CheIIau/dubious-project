import { THEME } from 'src/shared/const/theme'
import { withThemeByClassName } from '@storybook/addon-themes'

export const AddonThemeDecorator = withThemeByClassName({
    themes: {
        light: THEME.light,
        dark: THEME.dark,
        orange: THEME.orange,
    },
    defaultTheme: 'light',
})
