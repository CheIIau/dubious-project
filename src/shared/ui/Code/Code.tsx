import { useCallback, type FC, type PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Code.module.scss'
import { BUTTON_THEME, Button } from 'src/shared/ui/Button/Button'
import CopyIcon from 'src/shared/assets/icons/copy.svg?react'

interface CodeProps extends PropsWithChildren {
    readonly className?: string
    readonly text: string
}

export const Code: FC<CodeProps> = ({ className, text }) => {
    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text)
    }, [text])

    return (
        <pre className={classNames(classes.code, {}, [className])}>
            <Button
                theme={BUTTON_THEME.clear}
                className={classes['copy-button']}
                onClick={onCopy}
            >
                <CopyIcon className="icon-inverted" />
            </Button>
            <code>{text}</code>
        </pre>
    )
}
