import { RouterPaths } from 'src/app/providers/router/routerIndex'
import type { SidebarItemProps } from '../ui/Sidebar/SidebarItem/SidebarItem'
import { appLinkTheme } from 'src/shared/ui/AppLink/AppLink'
import HomeIcon from 'src/shared/assets/icons/home.svg?react'
import PersonIcon from 'src/shared/assets/icons/person.svg?react'
import AboutIcon from 'src/shared/assets/icons/doc.svg?react'
import 'src/shared/config/i18n/i18n'

export const sidebarItemsList: SidebarItemProps[] = [
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
    {
        path: RouterPaths.profile,
        theme: appLinkTheme.secondary,
        text: 'profile',
        icon: <PersonIcon className="icon" />,
    },
]
