import type { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './ArticleTextBlockComponent.module.scss'
import type { ArticleTextBlock } from '../../model/types/article'
import { Text } from 'src/shared/ui/Text/Text'
interface ArticleTextBlockComponentProps extends PropsWithChildren {
    readonly className?: string
    readonly block?: ArticleTextBlock
}

export const ArticleTextBlockComponent: FC<ArticleTextBlockComponentProps> = ({
    className,
    block,
}) => {
    return (
        <div
            className={classNames(classes.articletextblockcomponent, {}, [
                className,
            ])}
        >
            {block?.title && (
                <Text
                    title={block.title}
                    className="mb-4"
                />
            )}
            {block?.paragraphs.map((paragraph, i) => (
                <Text
                    key={i}
                    text={paragraph}
                    className="mt-2"
                />
            ))}
        </div>
    )
}
