import type { FC } from 'react'
import { Outlet } from 'react-router-dom'

interface RoutesWrapperProps {}

export const RoutesWrapper: FC<RoutesWrapperProps> = () => {
    return <Outlet />
}
