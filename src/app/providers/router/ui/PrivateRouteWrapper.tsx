import type { FunctionComponent, PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from 'src/shared/lib/hooks/storeHooks'
import { isUserAdmin } from 'src/entities/User/userIndex'
import { RouterPaths } from 'src/shared/const/routeList'

export const PrivateRouteWrapper: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    const auth = useAppSelector((state) => state.user.authData)

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

export const AdminRouteWrapper: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    const auth = useAppSelector((state) => state.user.authData)

    const isAdmin = useAppSelector(isUserAdmin)
    const location = useLocation()

    if (!auth || !isAdmin) {
        return (
            <Navigate
                to={RouterPaths._forbidden}
                state={{ from: location }}
                replace
            />
        )
    }
    return children
}
