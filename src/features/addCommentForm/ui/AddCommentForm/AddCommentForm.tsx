import { useCallback, type FC, type PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './AddCommentForm.module.scss'
import { Input } from 'src/shared/ui/Input/Input'
import { useTranslation } from 'react-i18next'
import { Button } from 'src/shared/ui/Button/Button'
import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks/storeHooks'
import {
    addCommentFormActions,
    addCommentFormReducer,
} from '../../model/slices/addCommentFormSlice'
import type { ReducersList } from 'src/shared/lib/components/DynamicModuleLoader'
import { DynamicModuleLoader } from 'src/shared/lib/components/DynamicModuleLoader'

interface AddCommentFormProps extends PropsWithChildren {
    readonly className?: string
    readonly onSendComment: (text: string) => void
}

const reducer: ReducersList = {
    addCommentForm: addCommentFormReducer,
}

const AddCommentForm: FC<AddCommentFormProps> = ({
    className,
    onSendComment,
}) => {
    const { t } = useTranslation('translation')
    const text = useAppSelector((state) => state.addCommentForm?.text)
    const dispatch = useAppDispatch()

    const onCommentTextChange = useCallback(
        (value: string) => {
            dispatch(addCommentFormActions.setText(value))
        },
        [dispatch],
    )

    const onSendHandler = useCallback(() => {
        if (text) {
            onSendComment(text)
            onCommentTextChange('')
        }
    }, [onCommentTextChange, onSendComment, text])

    return (
        <DynamicModuleLoader reducers={reducer}>
            <div
                className={classNames(classes['add-comment-form'], {}, [
                    className,
                ])}
            >
                <Input
                    className="flex-grow"
                    placeholder={t('enterComment')}
                    multiple
                    value={text}
                    onChange={onCommentTextChange}
                />
                <Button onClick={onSendHandler}>{t('send')}</Button>
            </div>
        </DynamicModuleLoader>
    )
}

export default AddCommentForm
