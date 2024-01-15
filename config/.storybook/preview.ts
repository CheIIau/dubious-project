import type { Preview } from '@storybook/react'
// можно подгрузить глобальные стили не через декораторы а тупо импортом
// import '../../src/app/styles/storybook.scss'
import { StyleDecorator } from '../../src/shared/config/storybook/decorators/StyleDecorator'
import { AddonThemeDecorator } from '../../src/shared/config/storybook/decorators/AddonThemeDecorator'
import i18n from './i18n'

const preview: Preview = {
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
    decorators: [
        StyleDecorator,
        //@ts-expect-error
        AddonThemeDecorator,
    ],
    globals: {
        locale: 'ru-RU',
        locales: {
            'ru-RU': 'Русский',
            en: 'English',
        },
    },
}

export default preview
