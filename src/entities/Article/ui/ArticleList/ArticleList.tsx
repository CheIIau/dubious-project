import type { ReactNode } from 'react'
import {
    type FC,
    type HTMLAttributeAnchorTarget,
    type PropsWithChildren,
    useCallback,
} from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './ArticleList.module.scss'
import type { Article } from '../../articleIndex'
import { ARTICLE_VIEW, viewClassesMapping } from '../../model/types/article'
import {
    ARTICLE_GRID_ITEM_WIDTH,
    ArticleListItem,
} from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import { useTranslation } from 'react-i18next'
import { Text } from 'src/shared/ui/Text/Text'
import type { ListRowProps } from 'react-virtualized'
import { List, WindowScroller } from 'react-virtualized'
import { PAGE_ID } from 'src/widgets/Page/Page'
import { useElementSize } from 'src/shared/lib/hooks/useElementSize'

interface ArticleListProps extends PropsWithChildren {
    readonly className?: string
    readonly articles: Article[]
    readonly loading: boolean
    readonly view?: keyof typeof ARTICLE_VIEW
    readonly target?: HTMLAttributeAnchorTarget
}

const getSkeletons = (view: keyof typeof ARTICLE_VIEW) => {
    return new Array(view == ARTICLE_VIEW.GRID ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton
                className="mb-4"
                view={view}
                key={index}
            />
        ))
}

export const ArticleList: FC<ArticleListProps> = ({
    className,
    view = ARTICLE_VIEW.GRID,
    loading,
    articles,
    target = '_self',
}) => {
    const { t } = useTranslation('translation')
    const pageElement = document.getElementById(PAGE_ID) as HTMLElement
    const pageSize = useElementSize(pageElement)
    const isList = view === ARTICLE_VIEW.LIST
    const gridItemsInRow = pageSize
        ? Math.floor(pageSize[0] / (ARTICLE_GRID_ITEM_WIDTH + 32))
        : 3 || 1
    const itemsPerRow = isList ? 1 : gridItemsInRow || 1
    const rowCount = isList
        ? articles.length
        : Math.ceil(articles.length / itemsPerRow) || 1
    const rowHeight = isList ? 670 : 330

    const rowRender = useCallback(
        ({ index, key, style }: ListRowProps) => {
            const items = []
            const fromIndex = index * itemsPerRow
            const toIndex = Math.min(fromIndex + itemsPerRow, articles.length)

            for (let i = fromIndex; i < toIndex; i++) {
                items.push(
                    <ArticleListItem
                        target={target}
                        article={articles[i]}
                        view={view}
                        key={articles[i].id}
                        className={classes.card}
                    />,
                )
            }

            return (
                <div
                    key={key}
                    style={style}
                    className={classNames(classes.row, {}, ['gap-7', 'mt-2'])}
                >
                    {items}
                </div>
            )
        },
        [articles, itemsPerRow, target, view],
    )

    if (!loading && !articles.length) {
        return (
            <Text
                title={t('nothingFound')}
                className="m-auto text-center mt-4 text-lg"
            />
        )
    }

    if (loading) {
        return (
            <div
                className={classNames(classes['article-list'], {}, [
                    className,
                    classes[viewClassesMapping[view]],
                    'gap-7',
                ])}
            >
                {getSkeletons(view)}
            </div>
        )
    }

    return (
        <WindowScroller scrollElement={pageElement}>
            {({
                height,
                width,
                registerChild,
                scrollTop,
                onChildScroll,
                isScrolling,
            }) => (
                <div
                    // the line below is to get rid of annoying findDOMNode error
                    ref={(element): void => {
                        if (element && registerChild) {
                            registerChild(element as unknown as ReactNode)
                        }
                    }}
                    className={classNames(classes['article-list'], {}, [
                        className,
                        classes[viewClassesMapping[view]],
                    ])}
                >
                    <List
                        autoHeight
                        height={height ?? 800}
                        rowCount={rowCount}
                        rowHeight={rowHeight}
                        rowRenderer={rowRender}
                        width={width ? width - 50 : 700}
                        onScroll={onChildScroll}
                        isScrolling={isScrolling}
                        scrollTop={scrollTop}
                    />
                </div>
            )}
        </WindowScroller>
    )
}
