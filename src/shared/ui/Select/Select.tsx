import type {
    ChangeEvent,
    OptionHTMLAttributes,
    SelectHTMLAttributes,
} from 'react'
import { useMemo, type PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Select.module.scss'

export interface SelectOption<T extends string>
    extends Omit<OptionHTMLAttributes<HTMLOptionElement>, 'value'> {
    content?: string
    value: T
}

interface SelectProps<T extends string> extends PropsWithChildren {
    readonly className?: string
    readonly label?: string
    readonly options?: SelectOption<T>[]
    readonly value?: T
    readonly onChange?: (value: T) => void
    readonly readonly?: boolean
    readonly selectAttributes?: SelectHTMLAttributes<HTMLSelectElement>
}

export const Select = <T extends string>(props: SelectProps<T>) => {
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
        onChange?.(e.target.value as T)
    }

    return (
        <div className={classNames(classes['select-wrapper'], {}, [className])}>
            {label && (
                <span
                    className={classNames('mr-2', {
                        [classes.label_disabled]: readonly,
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
}
