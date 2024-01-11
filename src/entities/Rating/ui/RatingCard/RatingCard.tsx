import { useState, type FC, type PropsWithChildren, useCallback } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import { Card } from 'src/shared/ui/Card/Card'
import { Text } from 'src/shared/ui/Text/Text'
import { StarRating } from 'src/shared/ui/StarRating/StarRating'
import { Modal } from 'src/shared/ui/Modal/Modal'
import { Input } from 'src/shared/ui/Input/Input'
import { useTranslation } from 'react-i18next'
import { BUTTON_THEME, Button } from 'src/shared/ui/Button/Button'
import { BrowserView, MobileView } from 'react-device-detect'
import { Drawer } from 'src/shared/ui/Drawer/Drawer'

interface RatingCardProps extends PropsWithChildren {
    readonly className?: string
    readonly title?: string
    readonly feedbackTitle?: string
    readonly hasFeedback?: boolean
    readonly onCancel?: (stars: number) => void
    readonly onAccept?: (stars: number, feedback?: string) => void
    readonly rate?: number
}

export const RatingCard: FC<RatingCardProps> = ({
    className,
    title,
    feedbackTitle,
    hasFeedback,
    onAccept,
    onCancel,
    rate = 0
}) => {
    const { t } = useTranslation()
    const [stars, setStars] = useState(rate)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [feedback, setFeedback] = useState('')

    const onSelectStar = useCallback(
        (star: number) => {
            setStars(star)
            if (hasFeedback) {
                setIsModalOpen(true)
            } else {
                onAccept?.(stars)
            }
        },
        [hasFeedback, onAccept, stars],
    )

    const acceptHandler = useCallback(() => {
        setIsModalOpen(false)
        onAccept?.(stars, feedback)
    }, [feedback, onAccept, stars])

    const cancelHandler = useCallback(() => {
        setIsModalOpen(false)
        onCancel?.(stars)
    }, [onCancel, stars])

    const modalContent = (
        <>
            <Text text={feedbackTitle} />
            <Input
                value={feedback}
                onChange={setFeedback}
                placeholder={t('yourFeedback')}
            />
        </>
    )

    return (
        <Card className={classNames('', {}, [className])}>
            <div className="flex flex-col gap-2 items-center">
                <Text text={title} />
                <StarRating
                    size={40}
                    selectedStar={stars}
                    onSelect={onSelectStar}
                />
                <BrowserView>
                    <Modal isOpen={isModalOpen}>
                        <div className="flex flex-col gap-8 w-full">
                            {modalContent}
                            <div className="flex flex-row justify-end gap-4">
                                <Button
                                    onClick={cancelHandler}
                                    theme={BUTTON_THEME['outline-red']}
                                >
                                    {t('cancel')}
                                </Button>
                                <Button
                                    onClick={acceptHandler}
                                    theme={BUTTON_THEME.outline}
                                >
                                    {t('send')}
                                </Button>
                            </div>
                        </div>
                    </Modal>
                </BrowserView>
                <MobileView>
                    <Drawer
                        isOpen={isModalOpen}
                        onClose={cancelHandler}
                        lazy
                    >
                        <div className="flex flex-col gap-8 w-full">
                            {modalContent}
                            <Button
                                className="w-full"
                                onClick={acceptHandler}
                                size="l"
                            >
                                {t('send')}
                            </Button>
                        </div>
                    </Drawer>
                </MobileView>
            </div>
        </Card>
    )
}
