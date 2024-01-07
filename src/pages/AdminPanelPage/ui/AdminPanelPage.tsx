import type { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import { Page } from 'src/widgets/Page/Page'

interface AdminPanelPageProps extends PropsWithChildren {
    readonly className?: string
}

export const AdminPanelPage: FC<AdminPanelPageProps> = ({ className }) => {
    return <Page className={classNames('', {}, [className])}></Page>
}
