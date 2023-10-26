import type { ReducersMapObject } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
// import type { StateSchema } from './StateSchema'
import { userReducer } from 'src/entities/User/userIndex'
import { loginReducer } from 'src/features/AuthByUsername/authByUsernameIndex'
import { rtkErrorLogger as logger } from './middlewares'
import { createReducerManager } from './reducerManager'
import type { StateSchema } from './StateSchema'

export function createStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        user: userReducer,
        loginForm: loginReducer,
        ...asyncReducers,
    }

    //reduce manager тупо для того, чтобы можно было добавлять и удалять редьюсеры на лету
    // по факту можно было просто передать в reducer ниже rootReducers
    const reducerManager = createReducerManager(rootReducers)
    const store = configureStore({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(logger),
    })
    ///@ts-expect-error
    store.reducerManager = reducerManager
    return store
}

export type AppDispatch = ReturnType<typeof createStore>['dispatch']