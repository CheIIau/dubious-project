import { useCallback, type FC, type PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { RatingCard } from 'src/entities/Rating/ratingCardIndex'
import { classNames } from 'src/shared/lib/style/classNames'
import { useArticleRating, useRateArticle } from '../../api/articleRatingApi'
import { useAppSelector } from 'src/shared/lib/hooks/storeHooks'
import { Skeleton } from 'src/shared/ui/Skeleton/Skeleton'

export interface ArticleRatingProps extends PropsWithChildren {
    readonly className?: string
    readonly articleId: string
}

const ArticleRating: FC<ArticleRatingProps> = ({
    className,
    articleId,
}) => {
    const { t } = useTranslation('article')
    const userId = useAppSelector((state) => state.user.authData?.id)!

    const { data, isLoading } = useArticleRating({ articleId, userId })
    const [rateArticle] = useRateArticle()
    const rating = data?.[0]

    const rateArticleHandler = useCallback(
        (stars: number, feedback?: string) => {
            try {
                rateArticle({
                    userId,
                    articleId,
                    rate: stars,
                    feedback: feedback || '',
                })
            } catch (error) {
                console.log(error)
            }
        },
        [articleId, rateArticle, userId],
    )

    const onCancel = useCallback(
        (stars: number) => {
            rateArticleHandler(stars)
        },
        [rateArticleHandler],
    )

    const onAccept = useCallback(
        (stars: number, feedback?: string) => {
            rateArticleHandler(stars, feedback)
        },
        [rateArticleHandler],
    )

    if (isLoading) {
        return (
            <Skeleton
                className={classNames('', {}, [className, 'max-w-md m-auto'])}
                width={'100%'}
                height={112}
            />
        )
    }

    return (
        <RatingCard
            onAccept={onAccept}
            onCancel={onCancel}
            title={rating?.rate ? t('thanksForFeedback') : t('leaveYourFeedback')}
            className={classNames('', {}, [className, 'max-w-md m-auto'])}
            feedbackTitle={t('leaveYourFeedback')}
            hasFeedback
            rate={rating?.rate}
        />
    )
}

export default ArticleRating