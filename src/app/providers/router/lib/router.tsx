/* eslint-disable @typescript-eslint/promise-function-async */
import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'

const MainPage = lazy(() => import('src/pages/MainPage/MainPage'))
const AboutPage = lazy(() => import('src/pages/AboutPage/AboutPage'))
const NotFoundPage = lazy(() => import('src/pages/NotFoundPage/NotFoundPage'))
import App from 'src/app/App'

export const RouterPaths = {
    app: '/',
    main: '',
    about: '/about',
    _notFound: '/*'
} as const

const router = createBrowserRouter([
    {
        path: RouterPaths.app,
        element: <App />,
        // errorElement: <Error />,
        children: [
            {
                path: RouterPaths.main,
                element: <MainPage />
                // errorElement: <Error />
            },
            {
                path: RouterPaths.about,
                element: <AboutPage />
            },

            {
                path: RouterPaths._notFound,
                element: <NotFoundPage />
            }
        ]
    }
])

export { router }
