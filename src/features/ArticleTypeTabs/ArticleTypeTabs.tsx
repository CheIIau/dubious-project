import { useMemo, type FC, type PropsWithChildren, useCallback } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import { ARTICLE_TYPE } from 'src/entities/Article/articleIndex'
import { Tabs, type TabItem } from 'src/shared/ui/Tabs/Tabs'
import { useTranslation } from 'react-i18next'

interface ArticleTypeTabsProps extends PropsWithChildren {
    readonly className?: string
    readonly value: keyof typeof ARTICLE_TYPE
    readonly onChangeType: (type: keyof typeof ARTICLE_TYPE) => void
}

export const ArticleTypeTabs: FC<ArticleTypeTabsProps> = ({
    className,
    value,
    onChangeType,
}) => {
    const { t } = useTranslation(['translation', 'article'])

    const typeTabs = useMemo<TabItem<keyof typeof ARTICLE_TYPE>[]>(
        () => [
            { value: ARTICLE_TYPE.ALL, content: <p>{t('article:all')}</p> },
            { value: ARTICLE_TYPE.IT, content: <p>{t('article:it')}</p> },
            {
                value: ARTICLE_TYPE.economics,
                content: <p>{t('article:economics')}</p>,
            },
            {
                value: ARTICLE_TYPE.science,
                content: <p>{t('article:science')}</p>,
            },
        ],
        [t],
    )

    const onTabClick = useCallback(
        (tab: TabItem<keyof typeof ARTICLE_TYPE>) => {
            onChangeType(tab.value)
        },
        [onChangeType],
    )

    return (
        <Tabs
            className={classNames('', {}, [className])}
            tabs={typeTabs}
            value={value}
            onTabClick={onTabClick}
        />
    )
}
