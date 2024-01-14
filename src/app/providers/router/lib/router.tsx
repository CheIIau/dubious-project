import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'
import NotFoundPage from 'src/pages/NotFoundPage/NotFoundPage'
import ErrorPage from 'src/pages/ErrorPage/ErrorPage'
import App from '../../../App'
import { RoutesWrapper } from '../routerIndex'
import { RouterPaths } from 'src/shared/const/routeList'
import { AdminRouteWrapper, PrivateRouteWrapper } from '../ui/PrivateRouteWrapper'

const MainPage = lazy(() => import('src/pages/MainPage/MainPage'))
const AboutPage = lazy(() => import('src/pages/AboutPage/AboutPage'))
const ProfilePage = lazy(() => import('src/pages/ProfilePage/ProfilePage'))
const ForbiddenPage = lazy(() => import('src/pages/ForbiddenPage/ForbiddenPage'))
import { ArticlesPageAsync as ArticlesPage } from 'src/pages/ArticlesPage/articlesPageAsyncIndex'
import { ArticleDetailsPageAsync as ArticleDetailsPage } from 'src/pages/ArticleDetailsPage/articleDetailsPageAsyncIndex'
const ArticleEditPage = lazy(
    () => import('src/pages/ArticleEditPage/articleEditPageIndex'),
)
const AdminPanelPage = lazy(
    () => import('src/pages/AdminPanelPage/adminPanelPageIndex'),
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
                        path: RouterPaths.adminPanelPage,
                        element: (
                            <AdminRouteWrapper>
                                <AdminPanelPage />
                            </AdminRouteWrapper>
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
                        path: RouterPaths._forbidden,
                        element: <ForbiddenPage />,
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
