import type { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './ArticleCodeBlockComponent.module.scss'
import type { ArticleCodeBlock } from '../../model/types/article'
import { Code } from 'src/shared/ui/Code/Code'

interface ArticleCodeBlockComponentProps extends PropsWithChildren {
    readonly className?: string
    readonly block?: ArticleCodeBlock
}

export const ArticleCodeBlockComponent: FC<ArticleCodeBlockComponentProps> = ({
    className,
    block,
}) => {
    return (
        <div
            className={classNames(classes['article-code-block-component'], {}, [
                className,
            ])}
        >
            <Code text={block!.code} />
        </div>
    )
}
