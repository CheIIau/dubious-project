import { FC, PropsWithChildren } from 'react'
import { useTheme } from 'src/app/providers/ThemeProvider/themeProviderIndex'
import { classNames } from 'src/shared/lib/classNames/classNames'
import LightIcon from 'src/shared/assets/icons/light_mode.svg'
import DarkIcon from 'src/shared/assets/icons/dark_mode.svg'
import { THEME } from 'src/app/providers/ThemeProvider/themeProviderIndex'
import { Button, THEME_BUTTON } from 'src/shared/ui/Button/Button'

interface ThemeSwitcherProps extends PropsWithChildren {
    className?: string
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
    const { theme, toggleTheme } = useTheme()

    return (
        <Button
            theme={THEME_BUTTON.clear}
            className={classNames('', {}, [className])}
            onClick={toggleTheme}
        >
            {theme === THEME.dark ? <DarkIcon fill='#fff' /> : <LightIcon fill='#fff' />}
        </Button>
    )
}
