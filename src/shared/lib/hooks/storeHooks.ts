import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector, useStore } from 'react-redux'
import type { Action as BasicAction, AnyAction } from 'redux'
import type {
    AppDispatch,
    StateSchema,
} from 'src/app/providers/StoreProvider/storeProviderIndex'
import type { ReduxStoreWithManager } from 'src/app/providers/StoreProvider/storeProviderIndex'

export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector

export const useAppStore = useStore as <
    State = unknown,
    Action extends BasicAction<any> = AnyAction,
>() => ReduxStoreWithManager<State, Action>
