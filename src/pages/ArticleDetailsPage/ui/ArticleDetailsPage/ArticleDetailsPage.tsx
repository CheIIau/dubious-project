import { type FC, type PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import { useTranslation } from 'react-i18next'
import { ArticleDetails } from 'src/entities/Article/articleIndex'
import { useParams } from 'react-router-dom'
import type { ReducersList } from 'src/shared/lib/components/DynamicModuleLoader'
import { DynamicModuleLoader } from 'src/shared/lib/components/DynamicModuleLoader'
import { Page } from 'src/widgets/Page/Page'
import { articleDetailsPageRecuder } from '../../model/slices/articleDetailsSliceIndex'
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'
import { ArticleRecommedationsList } from 'src/features/articleRecommedationsList/articleRecommendationListIndex'
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments'
import { ArticleRating } from 'src/features/articleRating/articleRatingIndex'

interface ArticleDetailsPageProps extends PropsWithChildren {
    readonly className?: string
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageRecuder,
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = ({ className }) => {
    const { t } = useTranslation(['article'])
    const { id } = useParams<{ id: string }>()

    if (!id) {
        return (
            <Page className={classNames('', {}, [className])}>
                {t('article:notFound')}
            </Page>
        )
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames('', {}, [className])}>
                <ArticleDetailsPageHeader />
                <ArticleDetails id={id} />
                <ArticleRating
                    articleId={id}
                    className="mt-5"
                />
                <ArticleRecommedationsList />
                <ArticleDetailsComments id={id} />
            </Page>
        </DynamicModuleLoader>
    )
}

export default ArticleDetailsPage
