import { FC, PropsWithChildren } from 'react'
import { useTheme } from 'src/app/providers/ThemeProvider/themeProviderIndex'
import { classNames } from 'src/shared/lib/style/classNames'
import LightIcon from 'src/shared/assets/icons/light_mode.svg?react'
import DarkIcon from 'src/shared/assets/icons/dark_mode.svg?react'
import { Button } from 'src/shared/ui/Button/Button'

interface ThemeSwitcherProps extends PropsWithChildren {
    className?: string
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
    const { theme, toggleTheme } = useTheme()

    return (
        <Button
            theme='clear'
            className={classNames('', {}, [className])}
            onClick={toggleTheme}
        >
            {theme === 'dark' ? (
                <DarkIcon className='icon' />
            ) : (
                <LightIcon className='icon' />
            )}
        </Button>
    )
}
