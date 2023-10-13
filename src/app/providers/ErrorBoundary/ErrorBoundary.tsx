import type { ErrorInfo, ReactNode} from 'react'
import React, { Suspense } from 'react'
import ErrorPage from 'src/pages/ErrorPage/ErrorPage'

interface ErrorBoundaryProps {
    readonly children: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
}

class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can also log the error to an error reporting service
        console.log(error, errorInfo.componentStack)
    }

    render() {
        const { hasError } = this.state
        const { children } = this.props
        if (hasError) {
            // You can render any custom fallback UI
            return (
                <Suspense fallback="">
                    <ErrorPage />
                </Suspense>
            )
        }

        return children
    }
}

export default ErrorBoundary
