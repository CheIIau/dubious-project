import { type FC, type PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './LoginForm.module.scss'
import { useTranslation } from 'react-i18next'
import { Button } from 'src/shared/ui/Button/Button'
import { Input } from 'src/shared/ui/Input/Input'

interface LoginFormProps extends PropsWithChildren {
    readonly className?: string
}

export const LoginForm: FC<LoginFormProps> = ({ className }) => {
    const { t } = useTranslation()
    return (
        <div className={classNames(classes['login-form'], {}, [className])}>
            <Input
                autoFocus
                placeholder={t('enterUsername')}
                className="mt-2 w-full"
                type="text"
            />
            <Input
                placeholder={t('enterPassword')}
                className="mt-2 w-full"
                type="text"
            />
            <Button className="mt-4 ml-auto">{t('singIn')}</Button>
        </div>
    )
}
