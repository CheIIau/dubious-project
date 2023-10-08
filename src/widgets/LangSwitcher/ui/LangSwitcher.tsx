import { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import { useTranslation } from 'react-i18next'
import { Button, BUTTON_THEME } from 'src/shared/ui/Button/Button'
import TranslateIcon from 'src/shared/assets/icons/translate.svg?react'
import { languages } from 'src/shared/config/i18n/const'
interface LangSwitcherProps extends PropsWithChildren {
    className?: string
}

export const LangSwitcher: FC<LangSwitcherProps> = ({ className }) => {
    const { i18n } = useTranslation()
    
    const toggle = () => {
        i18n.changeLanguage(i18n.language === 'ru-RU' ? 'en' : 'ru-RU')
    }

    const iconColor = (language: typeof languages[number]) => {
        if (language === 'ru-RU') {
            return '#0ea5e9'
        }
        return '#f43f5e'
    }

    return (
        <Button
            className={classNames('', {}, [className])}
            theme={BUTTON_THEME.clear}
            onClick={toggle}
        >
            <TranslateIcon fill={iconColor(i18n.language as typeof languages[number])} />
        </Button>
    )
}
