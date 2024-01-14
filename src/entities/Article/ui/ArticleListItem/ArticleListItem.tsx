import type { HTMLAttributeAnchorTarget } from 'react'
import { type FC, type PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './ArticleListItem.module.scss'
import type { Article, ArticleTextBlock } from '../../model/types/article'
import {
    ARTICLE_BLOCK_TYPE,
    ARTICLE_VIEW,
    viewClassesMapping,
} from '../../model/types/article'
import { Text } from 'src/shared/ui/Text/Text'
import EyeIcon from 'src/shared/assets/icons/doc.svg?react'
import { Card } from 'src/shared/ui/Card/Card'
import { useHover } from 'src/shared/lib/hooks/useHover'
import { Avatar } from 'src/shared/ui/Avatar/Avatar'
import { BUTTON_THEME, Button } from 'src/shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import { RouterPaths } from 'src/shared/const/routeList'
import { AppLink } from 'src/shared/ui/AppLink/AppLink'

interface ArticleListItemProps extends PropsWithChildren {
    readonly className?: string
    readonly article: Article
    readonly view: keyof typeof ARTICLE_VIEW
    readonly target?: HTMLAttributeAnchorTarget
}

export const ARTICLE_GRID_ITEM_WIDTH = 232

export const ArticleListItem: FC<ArticleListItemProps> = ({
    className,
    article,
    view,
    target = '_self',
}) => {
    const [_isHover, bindHover] = useHover()
    const { t } = useTranslation('article')

    const types = (
        <Text
            text={article.type.join(', ')}
            className="mt-2"
        />
    )

    const views = (
        <>
            <Text
                text={String(article.views)}
                className="ml-auto mr-2"
            />
            <EyeIcon className="icon-inverted" />
        </>
    )

    if (view === ARTICLE_VIEW.LIST) {
        const textBlock = article.blocks.find(
            (block) => block.type === ARTICLE_BLOCK_TYPE.text,
        ) as ArticleTextBlock

        return (
            <div
                className={classNames('', {}, [
                    className,
                    classes[viewClassesMapping[view]],
                ])}
            >
                <Card>
                    <div className={classes.header}>
                        <Avatar
                            size={30}
                            src={article.user.avatar}
                        />
                        <Text
                            text={article.user.username}
                            className="ml-2"
                        />
                        <Text
                            text={article.createdAt}
                            className="ml-auto"
                        />
                    </div>
                    <Text
                        title={article.title}
                        className="mt-2"
                    />
                    {types}

                    <img
                        src={article.img}
                        className={classNames(classes.image, {}, ['my-2'])}
                        alt={article.title}
                    />
                    {textBlock && (
                        <ArticleTextBlockComponent
                            className={classes['text-block']}
                            block={textBlock}
                        />
                    )}
                    <div className={classNames(classes.footer, {}, ['mt-2'])}>
                        <AppLink
                            target={target}
                            to={RouterPaths.articleDetails + `/${article.id}`}
                        >
                            <Button theme={BUTTON_THEME.outline}>
                                {t('read')}
                            </Button>
                        </AppLink>
                        {views}
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <div
            className={classNames('', {}, [
                className,
                classes[viewClassesMapping[view]],
            ])}
            {...bindHover}
        >
            <AppLink
                target={target}
                to={RouterPaths.articleDetails + `/${article.id}`}
            >
                <Card>
                    <div className={classes['image-wrapper']}>
                        <img
                            src={article.img}
                            className={classes.image}
                            alt={article.title}
                        />
                        <Text
                            text={article.createdAt}
                            className={classes.date}
                        />
                    </div>
                    <div className={classes['info-wrapper']}>
                        {types}
                        {views}
                    </div>
                    <Text
                        text={article.title}
                        className="mt-2"
                    />
                </Card>
            </AppLink>
        </div>
    )
}
