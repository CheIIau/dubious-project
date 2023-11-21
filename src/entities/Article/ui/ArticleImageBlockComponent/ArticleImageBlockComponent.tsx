import type { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './ArticleImageBlockComponent.module.scss'
import type { ArticleImageBlock } from '../../model/types/article'
import { Text } from 'src/shared/ui/Text/Text'

interface ArticleImageBlockComponentProps extends PropsWithChildren {
    readonly className?: string
    readonly block?: ArticleImageBlock
}

export const ArticleImageBlockComponent: FC<
    ArticleImageBlockComponentProps
> = ({ className, block }) => {
    return (
        <div className={classNames('', {}, [className])}>
            <img
                src={block?.src}
                className={classes.img}
                alt={block?.title}
            />
            {block?.title && (
                <Text
                    text={block.title}
                    className="text-center mt-2"
                />
            )}
        </div>
    )
}
