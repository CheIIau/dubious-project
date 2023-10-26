/* eslint-disable @typescript-eslint/promise-function-async */
import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'
import NotFoundPage from 'src/pages/NotFoundPage/NotFoundPage'
import ErrorPage from 'src/pages/ErrorPage/ErrorPage'
import App from 'src/app/App'
import { RoutesWrapper } from '../routerIndex'
import { RouterPaths } from './routeList'

const MainPage = lazy(() => import('src/pages/MainPage/MainPage'))
const AboutPage = lazy(() => import('src/pages/AboutPage/AboutPage'))
const ProfilePage = lazy(() => import('src/pages/ProfilePage/ProfilePage'))

const router = createBrowserRouter([
    {
        path: RouterPaths.app,
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <RoutesWrapper />,
                errorElement: <ErrorPage />,
                children: [
                    {
                        path: RouterPaths.main,
                        element: <MainPage />
                    },
                    {
                        path: RouterPaths.about,
                        element: <AboutPage />
                    },
                    {
                        path: RouterPaths.profile,
                        element: <ProfilePage />
                    },
                    {
                        path: RouterPaths._notFound,
                        element: <NotFoundPage />
                    },
                ]
            }
        ]
    }
])

export { router }
