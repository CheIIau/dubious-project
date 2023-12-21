/* eslint-disable @typescript-eslint/promise-function-async */
import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'
import NotFoundPage from 'src/pages/NotFoundPage/NotFoundPage'
import ErrorPage from 'src/pages/ErrorPage/ErrorPage'
import App from 'src/app/App'
import { RoutesWrapper } from '../routerIndex'
import { RouterPaths } from './routeList'
import { PrivateRouteWrapper } from '../ui/PrivateRouteWrapper'

const MainPage = lazy(() => import('src/pages/MainPage/MainPage'))
const AboutPage = lazy(() => import('src/pages/AboutPage/AboutPage'))
const ProfilePage = lazy(() => import('src/pages/ProfilePage/ProfilePage'))

import { ArticlesPage } from 'src/pages/ArticlesPage/articlesPageIndex'
import { ArticleDetailsPage } from 'src/pages/ArticleDetailsPage/articleDetailsPageIndex'

const ArticleEditPage = lazy(
    () => import('src/pages/ArticleEditPage/articleEditPageIndex'),
)

const router = createBrowserRouter([
    {
        path: RouterPaths.app,
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: RouterPaths.app,
                element: <RoutesWrapper />,
                errorElement: <ErrorPage />,
                children: [
                    {
                        path: RouterPaths.main,
                        element: <MainPage />,
                    },
                    {
                        path: RouterPaths.about,
                        element: <AboutPage />,
                    },
                    {
                        path: RouterPaths.profile + '/:id',
                        element: (
                            <PrivateRouteWrapper>
                                <ProfilePage />
                            </PrivateRouteWrapper>
                        ),
                    },
                    {
                        path: RouterPaths.articles,
                        element: (
                            <PrivateRouteWrapper>
                                <ArticlesPage />
                            </PrivateRouteWrapper>
                        ),
                    },
                    {
                        path: RouterPaths.articleDetails + '/:id',
                        element: (
                            <PrivateRouteWrapper>
                                <ArticleDetailsPage />
                            </PrivateRouteWrapper>
                        ),
                    },
                    {
                        path: RouterPaths.articleEdit,
                        element: (
                            <PrivateRouteWrapper>
                                <ArticleEditPage />
                            </PrivateRouteWrapper>
                        ),
                    },
                    {
                        path: RouterPaths.articleCreate,
                        element: (
                            <PrivateRouteWrapper>
                                <ArticleEditPage />
                            </PrivateRouteWrapper>
                        ),
                    },
                    {
                        path: RouterPaths._notFound,
                        element: <NotFoundPage />,
                    },
                ],
            },
        ],
    },
])

export { router }
