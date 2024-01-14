import type { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import LightIcon from 'src/shared/assets/icons/light_mode.svg?react'
import DarkIcon from 'src/shared/assets/icons/dark_mode.svg?react'
import { Button } from 'src/shared/ui/Button/Button'
import { useTheme } from 'src/shared/lib/hooks/useTheme'
import { THEME } from 'src/shared/const/theme'

interface ThemeSwitcherProps extends PropsWithChildren {
    readonly className?: string
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
    const { theme, toggleTheme } = useTheme()

    return (
        <Button
            theme='clear'
            className={classNames('', {}, [className])}
            onClick={toggleTheme}
        >
            {theme === THEME.dark ? (
                <DarkIcon className='icon' />
            ) : (
                <LightIcon className='icon' />
            )}
        </Button>
    )
}
