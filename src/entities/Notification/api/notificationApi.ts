import { rtkApi } from 'src/shared/api/rtkApi'
import type { Notification } from '../model/types/notifications'

const notificationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
        getNotifications: build.query<Notification[], void>({
            query: () => ({
                url: '/notifications',
            }),
            providesTags: ['Notifications'],
        }),
    }),
})

export const useNotifications = notificationApi.useGetNotificationsQuery
