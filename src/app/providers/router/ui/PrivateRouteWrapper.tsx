import type { FunctionComponent, PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from 'src/shared/lib/hooks/storeHooks'
import { RouterPaths } from '../routerIndex'

export const PrivateRouteWrapper: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    const auth =
        useAppSelector((state) => state.user.authData)

    const location = useLocation()

    if (!auth) {
        return (
            <Navigate
                to={RouterPaths.main}
                state={{ from: location }}
                replace
            />
        )
    }
    return children
}
