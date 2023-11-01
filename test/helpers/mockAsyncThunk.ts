import type { AxiosStatic } from 'axios'
import axios from 'axios'
import type { StateSchema } from 'src/app/providers/StoreProvider/storeProviderIndex'
import type { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import type { AsyncThunkAction } from '@reduxjs/toolkit'
import type { MockedFunctionDeep } from '@vitest/spy'

type ActionCreatorType<Return, Arg, RejectedValue> = (
    arg: Arg,
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>

vi.mock('axios')

const mockedAxios = vi.mocked(axios, true)

export class MockAsyncThunk<Return, Arg, RejectedValue> {
    dispatch: ThunkDispatch<unknown, unknown, AnyAction>
    getState: () => StateSchema
    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>

    api: MockedFunctionDeep<AxiosStatic>
    constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>) {
        this.actionCreator = actionCreator
        this.dispatch = vi.fn()
        this.getState = vi.fn()
        this.api = mockedAxios
    }

    async callThunk(arg: Arg) {
        const action = this.actionCreator(arg)
        const result = await action(this.dispatch, this.getState, {
            api: this.api,
        })

        return result
    }
}
