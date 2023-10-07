import { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import { useTranslation } from 'react-i18next'
import { Button, THEME_BUTTON } from 'src/shared/ui/Button/Button'
import TranslateIcon from 'src/shared/assets/icons/translate.svg?react'
import { fillIcon } from 'src/shared/lib/style/icons'
import { useTheme } from 'src/app/providers/ThemeProvider/themeProviderIndex'

interface LangSwitcherProps extends PropsWithChildren {
    className?: string
}

export const LangSwitcher: FC<LangSwitcherProps> = ({ className }) => {
    const { i18n } = useTranslation('translation')
    const { theme } = useTheme()
    const toggle = () => {
        i18n.changeLanguage(i18n.language === 'ru-RU' ? 'en' : 'ru-RU')
    }
    return (
        <Button
            className={classNames('', {}, [className])}
            theme={THEME_BUTTON.clear}
            onClick={toggle}
        >
            <TranslateIcon fill={fillIcon(theme)} />
        </Button>
    )
}
