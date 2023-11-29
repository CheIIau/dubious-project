import { type FC, type PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './ArticleListItem.module.scss'
import { ARTICLE_VIEW, viewClassesMapping } from '../../model/types/article'
import { Card } from 'src/shared/ui/Card/Card'
import { Skeleton } from 'src/shared/ui/Skeleton/Skeleton'

interface ArticleListItemSkeletonProps extends PropsWithChildren {
    readonly className?: string
    readonly view: keyof typeof ARTICLE_VIEW
}

export const ArticleListItemSkeleton: FC<ArticleListItemSkeletonProps> = ({
    className,
    view,
}) => {
    if (view === ARTICLE_VIEW.LIST) {
        return (
            <div
                className={classNames('', {}, [
                    className,
                    classes[viewClassesMapping[view]],
                ])}
            >
                <Card>
                    <div className={classes.header}>
                        <Skeleton
                            width={30}
                            height={30}
                            border="50%"
                        />
                        <Skeleton
                            width={150}
                            height={16}
                            className="ml-2"
                        />
                        <Skeleton
                            width={150}
                            height={16}
                            className="ml-auto"
                        />
                    </div>
                    <Skeleton
                        width={250}
                        height={24}
                        className="mt-2"
                    />
                    <Skeleton
                        className={classNames(classes.image, {}, ['my-2'])}
                        height={200}
                    />
                    <div className={classNames(classes.footer, {}, ['mt-2'])}>
                        <Skeleton
                            height={36}
                            width={200}
                        />
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
        >
            <Card>
                <div className={classes['image-wrapper']}>
                    <Skeleton
                        width={200}
                        height={200}
                        className={classes.image}
                    />
                </div>
                <div
                    className={classNames(classes['info-wrapper'], {}, [
                        'mt-2',
                    ])}
                >
                    <Skeleton
                        width={130}
                        height={16}
                    />
                </div>
                <Skeleton
                    width={150}
                    height={16}
                    className="mt-2"
                />
            </Card>
        </div>
    )
}
