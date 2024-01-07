import { classNames } from 'src/shared/lib/style/classNames'
import { useTranslation } from 'react-i18next'
import { memo, type PropsWithChildren } from 'react'
import { Text } from 'src/shared/ui/Text/Text'
import { ArticleList } from 'src/entities/Article/articleIndex'
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi'

interface ArticleRecommedationsListProps extends PropsWithChildren {
    readonly className?: string
}

export const ArticleRecommedationsList = memo<ArticleRecommedationsListProps>(
    function ArticleRecommedationsList({ className }) {
        const { t } = useTranslation(['article', 'translation'])
        const {
            data: articles,
            error,
            isLoading,
        } = useArticleRecommendationsList(3)
        
        return (
            <div
                className={classNames('', {}, [
                    className,
                    'flex',
                    'flex-col',
                    'gap-2',
                ])}
            >
                <Text
                    className="mt-4 mb-3"
                    title={t('translation:recommendations')}
                />

                <ArticleList
                    loading={isLoading}
                    target="_blank"
                    articles={articles || []}
                    className="flex !flex-nowrap overflow-x-auto overflow-y-hidden !justify-normal"
                />
            </div>
        )
    },
)
