import type { Middleware, PayloadAction } from '@reduxjs/toolkit'
import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { ServiceError } from 'src/shared/api/api'
import type { StateSchema } from './StateSchema'

export const rtkErrorLogger: Middleware<object, StateSchema> =
    (_api) => (next) => (action: PayloadAction<ServiceError>) => {
        if (isRejectedWithValue(action)) {
            console.error(action)
        }
        return next(action)
    }
