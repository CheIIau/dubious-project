import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from './api'
import { USER_LOCALSTORAGE_KEY } from '../const/localstorage'

// Define a service using a base URL and expected endpoints
export const rtkApi = createApi({
    tagTypes: ['Recommendations'],
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || ''
            if (token) {
                headers.set('Authorization', token)
            }
            return headers
        },
    }),
    endpoints: () => ({}),
    refetchOnMountOrArgChange: 30,
    keepUnusedDataFor: 30,
})
