declare module '*.module.css' {
    const classes: { [key: string]: string }
    export default classes
}

declare module '*.module.scss' {
    const classes: { [key: string]: string }
    export default classes
}

declare module '*.scss' {
    const classes: { [key: string]: string }
    export default classes
}

declare module '*.svg' {
    import type React from 'react'
    const svg: React.FC<React.SVGProps<SVGSVGElement>>
    export default svg
}

declare module '*.png'
declare module '*.jpg'

declare const __IS_DEV__: boolean
declare const __PROJECT__: 'storybook' | 'frontend' | 'unit_test'
