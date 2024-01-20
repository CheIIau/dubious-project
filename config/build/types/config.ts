export type BuildMods = 'development' | 'production'

export interface BuildPaths {
    '~': string
    entry: string
    build: string
    html: string
    src: string
    test: string
    locales: string
    buildLocales: string
}

export interface BuildOptions {
    mode: BuildMods
    paths: BuildPaths
    isDev: boolean
    port: number
    project: 'storybook' | 'frontend' | 'unit_test'
    apiUrl: string | undefined
}

export interface BuildEnv {
    NODE_ENV: BuildMods
    port: number
    apiUrl?: string
}
