import type {
    ChangeEvent,
    OptionHTMLAttributes,
    SelectHTMLAttributes,
} from 'react'
import { useMemo, type PropsWithChildren, memo } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Select.module.scss'

interface SelectOption extends OptionHTMLAttributes<HTMLOptionElement> {
    content?: string
}

interface SelectProps extends PropsWithChildren {
    readonly className?: string
    readonly label?: string
    readonly options?: SelectOption[]
    readonly value?: string
    readonly onChange?: (value: string) => void
    readonly readonly?: boolean
    readonly selectAttributes?: SelectHTMLAttributes<HTMLSelectElement>
}

export const Select = memo<SelectProps>(function Select(props) {
    const {
        label,
        className,
        options,
        value,
        onChange,
        readonly,
        selectAttributes,
    } = props

    const optionsList = useMemo(() => {
        return options?.map((optionItem) => (
            <option
                key={optionItem.value as string}
                className={classNames(classes.option, {}, [className])}
                value={optionItem.value}
            >
                {optionItem.content || optionItem.value}
            </option>
        ))
    }, [className, options])

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value)
    }

    return (
        <div className={classNames(classes['select-wrapper'], {}, [className])}>
            {label && (
                <span
                    className={classNames('mr-2', {
                        [classes.label__disabled]: readonly,
                    })}
                >
                    {label}
                </span>
            )}
            <select
                className={classNames(
                    classes.select,
                    {
                        [classes.readonly]: readonly,
                    },
                    ['mr-2'],
                )}
                value={value}
                disabled={readonly}
                onChange={onChangeHandler}
                {...selectAttributes}
            >
                {optionsList}
            </select>
        </div>
    )
})
