import type { Preview } from '@storybook/react'
// можно подгрузить глобальные стили не через декораторы а тупо импортом
// import '../../src/app/styles/storybook.scss'
import { StyleDecorator } from '../../src/shared/config/storybook/decorators/StyleDecorator'
import { ThemeDecorator } from '../../src/shared/config/storybook/decorators/ThemeDecorator'
import { THEME } from '../../src/shared/const/theme'
import i18n from './i18n'

const decorator = withThemeByClassName({
    themes: {
        light: THEME.light,
        dark: THEME.dark,
        orange: THEME.orange,
    },
    defaultTheme: 'light',
})

const preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        i18n,
    },
    decorators: [StyleDecorator, ThemeDecorator(THEME.light), decorator],
    globals: {
        locale: 'ru-RU',
        locales: {
            'ru-RU': 'Русский',
            en: 'English',
        },
    },
} satisfies Preview

import { withThemeByClassName } from '@storybook/addon-themes'

export default preview
