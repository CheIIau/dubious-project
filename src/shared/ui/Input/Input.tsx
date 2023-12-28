import {
    useState,
    type ChangeEvent,
    type InputHTMLAttributes,
    type PropsWithChildren,
    useEffect,
    memo,
    useRef,
} from 'react'
import type { Mods } from 'src/shared/lib/style/classNames'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Input.module.scss'

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'readOnly'
>

interface InputProps extends PropsWithChildren, HTMLInputProps {
    readonly className?: string
    readonly inputClassName?: string
    readonly value?: string
    readonly onChange?: (value: string) => void
    readonly placeholder?: string
    readonly readonly?: boolean
}

export const Input = memo<InputProps>(function Input({
    className,
    onChange,
    value,
    placeholder,
    autoFocus,
    inputClassName,
    readonly,
    type = 'text',
    ...otherProps
}) {
    const inputRef = useRef<HTMLInputElement>(null)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.target.value)
        setCaretPosition(event.target.value.length)
    }
    useEffect(() => {
        if (autoFocus) {
            setIsFocused(true)
            inputRef.current?.focus()
        }
    }, [autoFocus])

    const [isFocused, setIsFocused] = useState(false)
    const [caretPosition, setCaretPosition] = useState(0)

    const onBlur = () => {
        setIsFocused(false)
    }
    const onFocused = () => {
        setIsFocused(true)
    }
    const onSelect = (event: ChangeEvent<HTMLInputElement>) => {
        setCaretPosition(event.target.selectionStart || caretPosition || 0)
    }

    const mods: Mods = {
        [classes.readonly]: readonly,
    }

    const isCaretVisible = isFocused && !readonly

    return (
        <div
            className={classNames(classes['input-wrapper'], mods, [className])}
        >
            {placeholder && <div className="mr-1">{`${placeholder}>`}</div>}
            <div className={classes['caret-wrapper']}>
                <input
                    ref={inputRef}
                    className={classNames(classes.input, mods, [
                        inputClassName,
                    ])}
                    type={type}
                    value={value}
                    onChange={onChangeHandler}
                    onFocus={onFocused}
                    onBlur={onBlur}
                    onSelect={onSelect}
                    readOnly={readonly}
                    {...otherProps}
                />
                {isCaretVisible && (
                    <span
                        className={classes.caret}
                        style={{ left: `${caretPosition * 8.8}px` }}
                    ></span>
                )}
            </div>
        </div>
    )
})
