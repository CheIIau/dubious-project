import { createSelector } from '@reduxjs/toolkit'
import type { StateSchema } from 'src/app/providers/StoreProvider/storeProviderIndex'

export const getScrollPosition = (state: StateSchema) =>
    state.scrollPosition.scroll

export const getScrollPositionByPath = createSelector(
    getScrollPosition,
    (state: StateSchema, path: string) => path,
    (scroll, path) => scroll[path] || 0,
)
