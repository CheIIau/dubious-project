import './styles/index.scss'
import { Link, Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import { useTheme } from './theme/useTheme'
import { classNames } from './helpers/classNames/classNames'

const App = () => {
    const { theme, toggleTheme } = useTheme()
    return (
        <div className={classNames('app', {}, [theme])}>
            <button onClick={toggleTheme}>Toggle theme</button>
            <Link to={'/'}>Main</Link>
            <Link to={'/about'}>About</Link>
            <Suspense
                fallback={
                    <div>
                        <div>Loading...</div>
                    </div>
                }
            >
                <Outlet />
            </Suspense>
        </div>
    )
}

export default App
