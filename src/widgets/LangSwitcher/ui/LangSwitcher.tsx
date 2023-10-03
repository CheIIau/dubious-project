import { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/classNames/classNames'
import classes from './LangSwitcher.module.scss'
import { useTranslation } from 'react-i18next'
import { Button, THEME_BUTTON } from 'src/shared/ui/AppLink/Button/Button'
import TranslateIcon from 'src/shared/assets/icons/translate.svg'

interface LangSwitcherProps extends PropsWithChildren {
    className?: string
}

export const LangSwitcher: FC<LangSwitcherProps> = ({ className }) => {
    const { i18n } = useTranslation('translation')
    const toggle = () => {
        i18n.changeLanguage(i18n.language === 'ru-RU' ? 'en' : 'ru-RU')
    }
    return (
        <Button
            className={classNames(classes['lang-switcher'], {}, [className])}
            theme={THEME_BUTTON.clear}
            onClick={toggle}
        >
            <TranslateIcon fill="#fff" />
        </Button>
    )
}
