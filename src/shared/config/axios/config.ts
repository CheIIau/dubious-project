import type { AxiosError } from 'axios'

export type ServiceError = AxiosError<{message: string}>
export const API_URL = 'http://localhost:8000'