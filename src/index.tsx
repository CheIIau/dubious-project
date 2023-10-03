import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { router } from 'src/app/providers/router/lib/router'
import { ThemeProvider } from 'src/app/providers/ThemeProvider/themeProviderIndex'
import './shared/config/i18n/i18n'

const Loader = () => {
    return <div>Loading...</div>
}

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <ThemeProvider>
            <RouterProvider
                router={router}
                fallbackElement={<Loader />}
            />
        </ThemeProvider>
    </StrictMode>
)
