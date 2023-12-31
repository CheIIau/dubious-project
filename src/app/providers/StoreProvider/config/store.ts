import type { ReducersMapObject } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
// import type { StateSchema } from './StateSchema'
import { userReducer } from 'src/entities/User/userIndex'
import { loginReducer } from 'src/features/AuthByUsername/authByUsernameIndex'
import { rtkErrorLogger as logger } from './middlewares'
import { createReducerManager } from './reducerManager'
import type { StateSchema } from './StateSchema'
import { $api } from 'src/shared/api/api'
import { scrollPositionSavingReducer } from 'src/features/scrollPositionSaving/scrollPositionSavingIndex'
import { rtkApi } from 'src/shared/api/rtkApi'

export function createStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        user: userReducer,
        loginForm: loginReducer,
        scrollPosition: scrollPositionSavingReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
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
            getDefaultMiddleware({
                thunk: {
                    extraArgument: {
                        api: $api,
                    },
                },
            })
                .concat(rtkApi.middleware)
                .concat(logger),
    })
    ///@ts-expect-error
    store.reducerManager = reducerManager
    return store
}

export type AppDispatch = ReturnType<typeof createStore>['dispatch']
