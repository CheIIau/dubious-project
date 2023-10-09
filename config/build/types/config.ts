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
}

export interface BuildEnv {
    mode: BuildMods,
    port: number
}