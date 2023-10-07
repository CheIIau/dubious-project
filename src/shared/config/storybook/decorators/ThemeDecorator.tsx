import { Decorator } from '@storybook/react'
import { ThemeType } from 'src/app/providers/ThemeProvider/themeProviderIndex'

export const ThemeDecorator: (theme: ThemeType) => Decorator = (theme) => {
    return function ThemedStory(Story) {
        return <div className={`app ${theme} p-10`} style={{minHeight: 'unset'}}>{Story()}</div>
    }
}
