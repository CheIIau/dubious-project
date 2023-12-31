import { type FC, type PropsWithChildren, useCallback } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import {
    DynamicModuleLoader,
    type ReducersList,
} from 'src/shared/lib/components/DynamicModuleLoader'
import { articlesPageReducer } from '../../model/slices/articlesPageSlice'
import { useAppDispatch } from 'src/shared/lib/hooks/storeHooks'
import { Page } from 'src/widgets/Page/Page'
import { fetchNextArtclesPage } from '../../model/services/fetchNextArticlesPage'
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters'
import { ArticlesInfiniteList } from '../ArticlesInfiniteList/ArticlesInfiniteList'

interface ArticlesPageProps extends PropsWithChildren {
    readonly className?: string
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
}

const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {
    const dispatch = useAppDispatch()

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArtclesPage())
    }, [dispatch])

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page
                onScrollEnd={onLoadNextPart}
                className={classNames('', {}, [className])}
            >
                <ArticlesPageFilters />
                <ArticlesInfiniteList className='mt-4' />
            </Page>
        </DynamicModuleLoader>
    )
}

export default ArticlesPage
