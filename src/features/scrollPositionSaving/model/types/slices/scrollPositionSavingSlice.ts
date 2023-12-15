import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { ScrollPositionSavingSchema } from '../scrollPositionSavingSchema'

const initialState: ScrollPositionSavingSchema = {
    scroll: {},
}

const scrollPositionSaving = createSlice({
    name: 'scrollPositionSaving',
    initialState,
    reducers: {
        setScrollPosition: (state, action: PayloadAction<{path: string, position: number}>) => {
            state.scroll[action.payload.path] = action.payload.position
        },
    },
})

export const {
    actions: scrollPositionSavingActions,
    reducer: scrollPositionSavingReducer,
} = scrollPositionSaving
