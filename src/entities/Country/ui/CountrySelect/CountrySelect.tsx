import { useCallback, type PropsWithChildren, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { COUNTRIES } from 'src/shared/const/enums'
import { Select } from 'src/shared/ui/Select/Select'

interface CountrySelectProps extends PropsWithChildren {
    readonly className?: string
    readonly readonly?: boolean
    readonly onChange?: (value?: keyof typeof COUNTRIES) => void
    readonly value?: keyof typeof COUNTRIES
}

const countriesOptions: {
    value: keyof typeof COUNTRIES
    content: keyof typeof COUNTRIES
}[] = [
    { value: COUNTRIES.Belarus, content: COUNTRIES.Belarus },
    { value: COUNTRIES.Russia, content: COUNTRIES.Russia },
    { value: COUNTRIES.USA, content: COUNTRIES.USA },
    { value: COUNTRIES.Ukraine, content: COUNTRIES.Ukraine },
    { value: COUNTRIES.Zimbabwe, content: COUNTRIES.Zimbabwe },
]

export const CountrySelect = memo<CountrySelectProps>(
    function CountrySelect(props) {
        const { readonly, onChange, value, className } = props
        const { t } = useTranslation(['profile'])

        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as keyof typeof COUNTRIES)
            },
            [onChange],
        )

        return (
            <Select
                label={t('profile:chooseCountry')}
                options={countriesOptions}
                className={className}
                onChange={onChangeHandler}
                readonly={readonly}
                value={value}
            />
        )
    },
)
