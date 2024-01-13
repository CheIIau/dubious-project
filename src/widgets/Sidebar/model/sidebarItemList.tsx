import { RouterPaths } from 'src/shared/const/routeList'
import type { SidebarItemProps } from '../ui/Sidebar/SidebarItem/SidebarItem'
import { appLinkTheme } from 'src/shared/ui/AppLink/AppLink'
import HomeIcon from 'src/shared/assets/icons/home.svg?react'
import PersonIcon from 'src/shared/assets/icons/person.svg?react'
import AboutIcon from 'src/shared/assets/icons/doc.svg?react'
import Article from 'src/shared/assets/icons/article_details.svg?react'
import type { StateSchema } from 'src/app/providers/StoreProvider/storeProviderIndex'
import { createSelector } from '@reduxjs/toolkit'

export const getSidebarItems = createSelector(
    [(state: StateSchema) => state],
    (state: StateSchema) => {
        const authData = state.user.authData

        const sidebarItemsList: SidebarItemProps[] = [
            {
                path: RouterPaths.main,
                theme: appLinkTheme.primary,
                text: 'main:mainPage',
                icon: <HomeIcon className="icon" />,
            },
            {
                path: RouterPaths.about,
                theme: appLinkTheme.secondary,
                text: 'about:aboutPage',
                icon: <AboutIcon className="icon" />,
            },
        ]

        if (authData) {
            sidebarItemsList.push(
                {
                    //@ts-expect-error
                    path: RouterPaths.profile + '/' + authData.id,
                    theme: appLinkTheme.secondary,
                    text: 'profile:profile',
                    icon: <PersonIcon className="icon" />,
                    authOnly: true,
                },
                {
                    path: RouterPaths.articles,
                    theme: appLinkTheme.secondary,
                    text: 'article:articles',
                    icon: <Article className="icon" />,
                    authOnly: true,
                },
            )
        }
        return sidebarItemsList
    },
)
