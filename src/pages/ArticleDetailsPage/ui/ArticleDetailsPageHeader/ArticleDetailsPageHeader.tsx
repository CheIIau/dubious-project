import { type FC, type PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './ArticleDetailsPageHeader.module.scss'
import { AppLink } from 'src/shared/ui/AppLink/AppLink'
import { BUTTON_THEME, Button } from 'src/shared/ui/Button/Button'
import { RouterPaths } from 'src/shared/const/routeList'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from 'src/shared/lib/hooks/storeHooks'
import { getCanEditArticle } from '../../model/selectors/article'

interface ArticleDetailsPageHeaderProps extends PropsWithChildren {
    readonly className?: string
}

export const ArticleDetailsPageHeader: FC<ArticleDetailsPageHeaderProps> = ({
    className,
}) => {
    const { t } = useTranslation(['article', 'translation'])

    const article = useAppSelector((state) => state.articleDetails?.data)
    const canEdit = useAppSelector(getCanEditArticle)

    return (
        <div
            className={classNames(classes['article-details-page-header'], {}, [
                className,
            ])}
        >
            <AppLink to={RouterPaths.articles}>
                <Button theme={BUTTON_THEME.outline}>
                    {t('article:backToTheList')}
                </Button>
            </AppLink>
            {canEdit && (
                <AppLink to={RouterPaths.articleDetails + `/${article?.id}` + '/edit'}>
                    <Button
                        className="ml-auto"
                        theme={BUTTON_THEME.outline}
                    >
                        {t('translation:edit')}
                    </Button>
                </AppLink>
            )}
        </div>
    )
}
