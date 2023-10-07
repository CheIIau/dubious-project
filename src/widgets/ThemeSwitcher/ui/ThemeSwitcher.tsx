import { FC, PropsWithChildren } from 'react'
import { useTheme } from 'src/app/providers/ThemeProvider/themeProviderIndex'
import { classNames } from 'src/shared/lib/style/classNames'
import LightIcon from 'src/shared/assets/icons/light_mode.svg?react'
import DarkIcon from 'src/shared/assets/icons/dark_mode.svg?react'
import { THEME } from 'src/app/providers/ThemeProvider/themeProviderIndex'
import { Button, THEME_BUTTON } from 'src/shared/ui/Button/Button'
import { fillIcon } from 'src/shared/lib/style/icons'

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
            {theme === THEME.dark ? (
                <DarkIcon fill={fillIcon(theme)} />
            ) : (
                <LightIcon fill={fillIcon(theme)} />
            )}
        </Button>
    )
}
