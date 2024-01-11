import { useState, type FC, type PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './StarRating.module.scss'
import StarIcon from 'src/shared/assets/icons/star.svg?react'

interface StarRatingProps extends PropsWithChildren {
    readonly className?: string
    readonly onSelect?: (star: number) => void
    readonly size?: number
    readonly selectedStar?: number
}

const stars = [1, 2, 3, 4, 5] as const

export const StarRating: FC<StarRatingProps> = ({
    className,
    size = 30,
    selectedStar = 0,
    onSelect,
}) => {
    const [currentStar, setCurrentStar] = useState(0)
    const [isSelected, setIsSelected] = useState(Boolean(selectedStar))

    const onHover = (star: number) => () => {
        if (!isSelected) {
            setCurrentStar(star)
        }
    }

    const onLeave = () => {
        if (!isSelected) {
            setCurrentStar(0)
        }
    }

    const onClick = (star: number) => () => {
        if (!isSelected) {
            onSelect?.(star)
            setCurrentStar(star)
            setIsSelected(true)
        }
    }

    const mods = (star: number) => ({
        [classes.star_selected]:
            isSelected && selectedStar > 0 && star <= selectedStar,
        [classes.star_disabled]: isSelected,
    })

    const additional = (star: number) => [
        currentStar >= star || selectedStar >= star
            ? classes.star_active
            : classes.star_inactive,
    ]

    return (
        <div className={classNames(classes['star-rating'], {}, [className])}>
            {stars.map((star) => (
                <StarIcon
                    key={star}
                    className={classNames(
                        classes.star,
                        mods(star),
                        additional(star),
                    )}
                    width={size}
                    height={size}
                    onMouseLeave={onLeave}
                    onMouseEnter={onHover(star)}
                    onClick={onClick(star)}
                />
            ))}
        </div>
    )
}
