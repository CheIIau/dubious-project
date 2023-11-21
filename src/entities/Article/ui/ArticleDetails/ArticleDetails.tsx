import { useEffect, type PropsWithChildren, memo, useCallback } from 'react'
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
import { Avatar } from 'src/shared/ui/Avatar/Avatar'
import EyeIcon from 'src/shared/assets/icons/doc.svg?react'
import CalendarIcon from 'src/shared/assets/icons/calendar.svg?react'
import type { ArticleBlock } from '../../model/types/article'
import { ARTICLE_BLOCK_TYPE } from '../../model/types/article'
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent'

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

        const renderBlock = useCallback((block: ArticleBlock) => {
            switch (block.type) {
                case ARTICLE_BLOCK_TYPE.code:
                    return (
                        <ArticleCodeBlockComponent
                            key={block.id}
                            block={block}
                            className="mt-4"
                        />
                    )
                case ARTICLE_BLOCK_TYPE.text:
                    return (
                        <ArticleTextBlockComponent
                            key={block.id}
                            block={block}
                            className="mt-4"
                        />
                    )
                case ARTICLE_BLOCK_TYPE.image:
                    return (
                        <ArticleImageBlockComponent
                            key={block.id}
                            block={block}
                            className="mt-4 flex flex-col items-center"
                        />
                    )
                default:
                    return null
            }
        }, [])

        let content: JSX.Element | null = null

        if (loading) {
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
        } else if (article) {
            content = (
                <div className="mt-2 flex flex-col">
                    <Avatar
                        size={200}
                        src={article!.img}
                        className="self-center"
                    />
                    <Text
                        title={article!.title}
                        text={article!.subtitle}
                    />
                    <div className="flex mt-2">
                        <EyeIcon className="icon-inverted" />
                        <Text
                            text={article!.views}
                            className="ml-2"
                        />
                    </div>
                    <div className="flex mt-2">
                        <CalendarIcon className="icon-inverted" />
                        <Text
                            text={article!.createdAt}
                            className="ml-2"
                        />
                    </div>
                    {article.blocks.map(renderBlock)}
                </div>
            )
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
