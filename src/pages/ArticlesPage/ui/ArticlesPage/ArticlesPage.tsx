import { type FC, type PropsWithChildren, useCallback, useEffect } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import {
    DynamicModuleLoader,
    type ReducersList,
} from 'src/shared/lib/components/DynamicModuleLoader'
import { articlesPageReducer } from '../../model/slices/articlesPageSlice'
import { useAppDispatch } from 'src/shared/lib/hooks/storeHooks'
import { Page } from 'src/widgets/Page/Page'
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage'
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters'
import { ArticlesInfiniteList } from '../ArticlesInfiniteList/ArticlesInfiniteList'
import { useSearchParams } from 'react-router-dom'
import { initArticlesPage } from '../../model/services/initArticlesPage'

interface ArticlesPageProps extends PropsWithChildren {
    readonly className?: string
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
}

const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {
    const dispatch = useAppDispatch()

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage())
    }, [dispatch])
    const [searchParams] = useSearchParams()

    useEffect(() => {
        dispatch(initArticlesPage(searchParams))
    }, [dispatch, searchParams])
    
    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount={false}
        >
            <Page
                onScrollEnd={onLoadNextPart}
                className={classNames('', {}, [className])}
            >
                <ArticlesPageFilters />
                <ArticlesInfiniteList className="mt-4" />
            </Page>
        </DynamicModuleLoader>
    )
}

export default ArticlesPage
