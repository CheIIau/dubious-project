import { FC } from 'react'
import { Outlet } from 'react-router-dom'

interface RoutesWrapperProps {}

const RoutesWrapper: FC<RoutesWrapperProps> = () => {
    return <Outlet />
}

export default RoutesWrapper
