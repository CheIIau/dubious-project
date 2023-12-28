import { useCallback, type PropsWithChildren, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { CURRENCIES } from 'src/shared/const/enums'
import { ListBox } from 'src/shared/ui/ListBox/ListBox/ListBox'
import { Select } from 'src/shared/ui/Select/Select'

interface CurrencySelectProps extends PropsWithChildren {
    readonly className?: string
    readonly readonly?: boolean
    readonly onChange?: (value?: keyof typeof CURRENCIES) => void
    readonly value?: keyof typeof CURRENCIES
}

const currenciesOptions: {
    value: keyof typeof CURRENCIES
    content: keyof typeof CURRENCIES
}[] = [
    { value: CURRENCIES.RUB, content: CURRENCIES.RUB },
    { value: CURRENCIES.EUR, content: CURRENCIES.EUR },
    { value: CURRENCIES.USD, content: CURRENCIES.USD },
]

export const CurrencySelect = memo<CurrencySelectProps>(
    function CurrencySelect(props) {
        const { readonly, onChange, value, className } = props
        const { t } = useTranslation(['profile'])

        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as keyof typeof CURRENCIES)
            },
            [onChange],
        )

        return (
            <ListBox
                label={t('profile:chooseCurrency')}
                readonly={readonly}
                defaultValue={t('chooseCurrency')}
                className={className}
                onChange={onChangeHandler}
                value={value}
                items={currenciesOptions}
            />
        )

        // return (
        //     <Select
        //         label={t('profile:chooseCurrency')}
        //         options={currenciesOptions}
        //         className={className}
        //         onChange={onChangeHandler}
        //         readonly={readonly}
        //         value={value}
        //     />
        // )
    },
)
