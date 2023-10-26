import { Suspense, type FC, type PropsWithChildren, lazy } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './LoginModal.module.scss'
import { Modal } from 'src/shared/ui/Modal/Modal'
import { Spinner } from 'src/shared/ui/Spinner/Spinner'
const LoginForm = lazy(() => import('../LoginForm/LoginForm'))

interface LoginModalProps extends PropsWithChildren {
    readonly className?: string
    readonly isOpen: boolean
    readonly onClose: () => void
}

export const LoginModal: FC<LoginModalProps> = ({
    className,
    isOpen,
    onClose,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            className={classNames(classes['login-modal'], {}, [className])}
            onClose={onClose}
            lazy
        >
            <Suspense fallback={<Spinner />}>
                <LoginForm onSuccess={onClose} />
            </Suspense>
        </Modal>
    )
}
