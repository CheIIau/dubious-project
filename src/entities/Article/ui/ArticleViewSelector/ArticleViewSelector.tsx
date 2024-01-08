import type { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import ListIcon from 'src/shared/assets/icons/list.svg?react'
import GridIcon from 'src/shared/assets/icons/grid.svg?react'
import { BUTTON_THEME, Button } from 'src/shared/ui/Button/Button'
import { ARTICLE_VIEW } from '../../model/types/article'

interface ArticleViewSelectorProps extends PropsWithChildren {
    readonly className?: string
    readonly view: keyof typeof ARTICLE_VIEW
    readonly onViewClick?: (view: keyof typeof ARTICLE_VIEW) => void
}

const viewTypes = [
    {
        view: ARTICLE_VIEW.LIST,
        icon: <ListIcon />,
    },
    {
        view: ARTICLE_VIEW.GRID,
        icon: <GridIcon />,
    },
] as const

export const ArticleViewSelector: FC<ArticleViewSelectorProps> = ({
    className,
    onViewClick,
    view,
}) => {
    const onChangeViewClick = (view: keyof typeof ARTICLE_VIEW) => () => {
        onViewClick?.(view)
    }

    return (
        <div className={classNames('', {}, [className])}>
            {viewTypes.map((viewType) => (
                <Button
                    theme={BUTTON_THEME.clear}
                    onClick={onChangeViewClick(viewType.view)}
                    key={viewType.view}
                    className={
                        view === viewType.view
                            ? 'icon-primary'
                            : 'icon-inverted'
                    }
                >
                    {viewType.icon}
                </Button>
            ))}
        </div>
    )
}
