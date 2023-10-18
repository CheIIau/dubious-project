import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import type { StateSchema } from './StateSchema'
import { counterReducer } from 'src/entities/Counter/counderIndex'
import { userReducer } from 'src/entities/User/userIndex'
import { loginReducer } from 'src/features/AuthByUsername/authByUsernameIndex'
import type { TypedUseSelectorHook} from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { rtkErrorLogger as logger } from './middlewares'

const rootReducers = combineReducers({
    counter: counterReducer,
    user: userReducer,
    loginForm: loginReducer,
})

export function createStore(initialState?: StateSchema) {
    return configureStore({
        reducer: rootReducers,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
    })
}

export type AppDispatch = ReturnType<typeof createStore>['dispatch']
export type StateSchema = ReturnType<typeof rootReducers>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector