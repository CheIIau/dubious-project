import type { FC, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'src/shared/lib/style/classNames'
import { Page } from 'src/widgets/Page/Page'

interface ForbiddenPageProps extends PropsWithChildren {
    readonly className?: string
}

const ForbiddenPage: FC<ForbiddenPageProps> = ({ className }) => {
    const { t } = useTranslation()

    return (
        <Page className={classNames('', {}, [className])}>
            <div className="text-lg text-center flex justify-center w-full mt-32">
                {t('dontHavePermissions')}
            </div>
        </Page>
    )
}

export default ForbiddenPage
