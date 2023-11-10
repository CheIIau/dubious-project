export type BuildMods = 'development' | 'production'

export interface BuildPaths {
    entry: string
    build: string
    html: string
    src: string
    test: string
}

export interface BuildOptions {
    mode: BuildMods
    paths: BuildPaths
    isDev: boolean;
    port: number
    project: 'storybook' | 'frontend' | 'unit_test'
}

export interface BuildEnv {
    mode: BuildMods,
    port: number
}