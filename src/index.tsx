import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { router } from 'src/app/providers/router/lib/router'
import { ThemeProvider } from 'src/app/providers/ThemeProvider/themeProviderIndex'
import './shared/config/i18n/i18n'
import ErrorBoundary from './app/providers/ErrorBoundary/ErrorBoundary'
import { Spinner } from './shared/ui/Spinner/Spinner'

//тут errorboundary по сути не нужен, т.к. все ошибки перехватывает роутер
createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <ErrorBoundary>
            <ThemeProvider>
                <RouterProvider
                    router={router}
                    fallbackElement={<Spinner />}
                />
            </ThemeProvider>
        </ErrorBoundary>
    </StrictMode>
)
