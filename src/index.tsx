import { BrowserRouter, RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { router } from './router/router'
import Loader from './components/Loader'
import ThemeProvider from './theme/ThemeProvider'

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <ThemeProvider>
            <RouterProvider router={router} fallbackElement={<Loader />} />
        </ThemeProvider>
    </StrictMode>
)
