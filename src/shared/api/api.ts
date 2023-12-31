import axios from 'axios'
import { USER_LOCALSTORAGE_KEY } from 'src/shared/const/localstorage'
import type { AxiosError } from 'axios'

export type ServiceError = AxiosError<{ message: string }>

export const DEV_API_URL = 'http://localhost:8000'

export const baseUrl = __IS_DEV__ ? DEV_API_URL : __API_URL__

export const $api = axios.create({
    baseURL: baseUrl,
})

$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization =
            localStorage.getItem(USER_LOCALSTORAGE_KEY) || ''
    }
    return config
})
