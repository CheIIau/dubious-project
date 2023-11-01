import axios from 'axios'
import { USER_LOCALSTORAGE_KEY } from 'src/shared/const/localstorage'
import type { AxiosError } from 'axios'

export type ServiceError = AxiosError<{message: string}>

export const DEV_API_URL = 'http://localhost:8000'

const baseUrl = __IS_DEV__ ? DEV_API_URL : 'https://prod.ru'

export const $api = axios.create({
    baseURL: baseUrl,
    headers: {
        authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY),
    },
})
