import type { Middleware, PayloadAction } from '@reduxjs/toolkit'
import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { StateSchema } from './store'
import type { ServiceError } from 'src/shared/config/axios/config'

export const rtkErrorLogger: Middleware<object, StateSchema> =
    (api) => (next) => (action: PayloadAction<ServiceError>) => {
        if (isRejectedWithValue(action)) {
            console.error(action)
        }
        return next(action)
    }
