import './styles/index.scss'
import { Outlet } from 'react-router-dom'
import { Suspense, useEffect } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import { Navbar } from 'src/widgets/Navbar/NavbarIndex'
import { Sidebar } from 'src/widgets/Sidebar/SidebarIndex'
import { PageLoader } from 'src/widgets/PageLoader/PageLoader'
import { userActions } from 'src/entities/User/userIndex'
import { useAppDispatch } from 'src/shared/lib/hooks/store'

const App = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(userActions.initAuthData())
    })

    return (
        <div className={classNames('app', {}, [])}>
            <Navbar />
            <div className="content-page">
                <Sidebar />
                <Suspense fallback={<PageLoader />}>
                    <div className="page-wrapper">
                        <Outlet />
                    </div>
                </Suspense>
            </div>
        </div>
    )
}

export default App
