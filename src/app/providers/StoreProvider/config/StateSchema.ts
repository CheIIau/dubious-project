import type {
    Action,
    AnyAction,
    CombinedState,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit'
import type { AxiosInstance } from 'axios'
import type { CounterSchema } from 'src/entities/Counter/counderIndex'
import type { ProfileSchema } from 'src/entities/Profile/profileIndex'
import type { UserSchema } from 'src/entities/User/userIndex'
import type { LoginSchema } from 'src/features/AuthByUsername/authByUsernameIndex'

export interface StateSchema {
    user: UserSchema
    loginForm: LoginSchema
    
    // below is async reducers
    profile?: ProfileSchema
    counter?: CounterSchema
}

export type StateSchemaKey = keyof StateSchema
export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>
    reduce: (
        state: StateSchema | undefined,
        action: AnyAction,
    ) => CombinedState<StateSchema>
    add: (key: StateSchemaKey, reducer: Reducer) => void
    remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithManager<
    S = StateSchema,
    A extends Action = AnyAction,
> extends EnhancedStore<S, A> {
    reducerManager: ReducerManager
}


export interface ThunkExtraArg {
    api: AxiosInstance
}

export interface ThunkConfig<T> {
    rejectValue: T
    extra: ThunkExtraArg
    state: StateSchema
}