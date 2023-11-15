import { useEffect, type PropsWithChildren, memo } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './ArticleDetails.module.scss'
import type { ReducersList } from 'src/shared/lib/components/DynamicModuleLoader'
import { DynamicModuleLoader } from 'src/shared/lib/components/DynamicModuleLoader'
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice'
import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks/storeHooks'
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById'
import { useTranslation } from 'react-i18next'
import { TEXT_THEME, Text } from 'src/shared/ui/Text/Text'
import { Skeleton } from 'src/shared/ui/Skeleton/Skeleton'

interface ArticleDetailsProps extends PropsWithChildren {
    readonly className?: string
    readonly id: string
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
}

export const ArticleDetails = memo<ArticleDetailsProps>(
    function ArticleDetails({ className, id }) {
        const dispatch = useAppDispatch()
        const { t } = useTranslation(['translation'])

        const loading = useAppSelector((state) => state.articleDetails?.loading)
        const article = useAppSelector((state) => state.articleDetails?.data)
        const error = useAppSelector((state) => state.articleDetails?.error)

        useEffect(() => {
            dispatch(fetchArticleById(id))
        }, [dispatch, id])

        let content: JSX.Element

        if (!loading) {
            content = (
                <div className="mt-2 flex flex-col">
                    <Skeleton
                        width={200}
                        height={200}
                        border="50%"
                        className="self-center"
                    />
                    <Skeleton
                        width={300}
                        height={32}
                        className="mt-5"
                    />
                    <Skeleton
                        width={600}
                        height={24}
                        className="mt-4"
                    />
                    <Skeleton
                        width="100%"
                        height={200}
                        className="mt-4"
                    />
                    <Skeleton
                        width="100%"
                        height={200}
                        className="mt-4"
                    />
                </div>
            )
        } else if (error) {
            content = (
                <div className="mt-2 flex justify-center items-center text-center">
                    <Text
                        theme={TEXT_THEME.error}
                        title={t('error')}
                    />
                </div>
            )
        } else {
            content = <div></div>
        }

        return (
            <DynamicModuleLoader
                reducers={reducers}
                removeAfterUnmount
            >
                <div
                    className={classNames(classes['article-details'], {}, [
                        className,
                    ])}
                >
                    {content}
                </div>
            </DynamicModuleLoader>
        )
    },
)
