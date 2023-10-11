import { FC, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps extends Required<PropsWithChildren> {
    element?: HTMLElement
}

export const Portal: FC<PortalProps> = ({
    children,
    element = document.body,
}) => {
    return createPortal(children, element)
}
