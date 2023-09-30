/* eslint-disable @typescript-eslint/promise-function-async */
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { type FunctionComponent, lazy } from 'react'

const MainPage = lazy(() => import('../pages/MainPage/MainPage'))
const AboutPage = lazy(() => import('../pages/AboutPage/AboutPage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'))
import App from 'src/App'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        // errorElement: <Error />,
        children: [
            {
                path: '',
                element: <MainPage />
                // errorElement: <Error />
            },
            {
                path: '/about',
                element: <AboutPage />
            },

            {
                path: '/*',
                element: <NotFoundPage />
            }
        ]
    }
])

export { router }
