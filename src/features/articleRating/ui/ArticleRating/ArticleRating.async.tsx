import { Suspense, lazy } from 'react'
import type { ArticleRatingProps } from './ArticleRating'
import { Skeleton } from 'src/shared/ui/Skeleton/Skeleton'

export const ArticleRatingLazy = lazy(() => import('./ArticleRating'))

export const ArticleRatingAsync = (props: ArticleRatingProps) => {
    return (
        <Suspense
            fallback={
                <Skeleton
                    className={'max-w-md m-auto'}
                    width={'100%'}
                    height={112}
                />
            }
        >
            <ArticleRatingLazy {...props} />
        </Suspense>
    )
}
