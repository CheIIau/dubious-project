import type {
    Action,
    AnyAction,
    CombinedState,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit'
import type { CounterSchema } from 'src/entities/Counter/counderIndex'
import type { ProfileSchema } from 'src/entities/Profile/profileIndex'
import type { UserSchema } from 'src/entities/User/userIndex'
import type { LoginSchema } from 'src/features/AuthByUsername/authByUsernameIndex'

export interface StateSchema {
    counter?: CounterSchema
    user: UserSchema
    loginForm: LoginSchema

    // there might be async reducers
    profile?: ProfileSchema
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
