import { useCallback, type PropsWithChildren, type ReactNode } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Tabs.module.scss'
import { Card, CardTheme } from 'src/shared/ui/Card/Card'

interface TabsProps<T extends string = string> extends PropsWithChildren {
    readonly className?: string
    readonly tabs?: TabItem<T>[]
    readonly value: T
    readonly onTabClick: (tab: TabItem<T>) => void
}

export interface TabItem<T extends string> {
    readonly value: T
    readonly content: ReactNode
}

export const Tabs = <T extends string>({
    className,
    tabs,
    value,
    onTabClick,
}: TabsProps<T>) => {
    const clickHandler = useCallback(
        (tab: TabItem<T>) => {
            return () => {
                onTabClick(tab)
            }
        },
        [onTabClick],
    )
    return (
        <div className={classNames(classes.tabs, {}, [className])}>
            {tabs?.map((tab) => (
                <Card
                    theme={
                        tab.value === value
                            ? CardTheme.OUTLINE
                            : CardTheme.NORMAL
                    }
                    key={tab.value}
                    onClick={clickHandler(tab)}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    )
}
