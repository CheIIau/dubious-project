import type { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './LoginForm.module.scss'
import { useTranslation } from 'react-i18next'
import { Button } from 'src/shared/ui/Button/Button'
import { Input } from 'src/shared/ui/Input/Input'
import { loginActions } from '../../model/slice/loginSlice'
import { loginByUsername } from '../../model/services/loginByUsername'
import { TEXT_THEME, Text } from 'src/shared/ui/Text/Text'
import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks/store'

interface LoginFormProps extends PropsWithChildren {
    readonly className?: string
    readonly onSuccess: () => void
}

const LoginForm: FC<LoginFormProps> = ({ className, onSuccess }) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const { username, password, loading, error } = useAppSelector(
        (state) => state.loginForm,
    )

    const onChangeUsername = (value: string) => {
        dispatch(loginActions.setUsername(value))
    }
    const onChangePassword = (value: string) => {
        dispatch(loginActions.setPassword(value))
    }

    const onLogin = async () => {
        const result = await dispatch(loginByUsername({ username, password }))
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess()
        }
    }

    return (
        <div className={classNames(classes['login-form'], {}, [className])}>
            <Text
                title={t('authorizationForm')}
                className="mb-2"
            />

            <Input
                autoFocus
                placeholder={t('enterUsername')}
                className="mt-2 w-full"
                type="text"
                onChange={onChangeUsername}
                value={username}
            />
            <Input
                placeholder={t('enterPassword')}
                className="mt-2 w-full"
                type="text"
                onChange={onChangePassword}
                value={password}
            />
            <div className="flex row justify-between items-center mt-4">
                {error && (
                    <Text
                        theme={TEXT_THEME.error}
                        text={error}
                    />
                )}
                <Button
                    onClick={onLogin}
                    className="ml-auto"
                    disabled={loading}
                >
                    {t('singIn')}
                </Button>
            </div>
        </div>
    )
}

export default LoginForm
