import webpack from 'webpack'
import { BuildOptions } from './types/config'

export function buildResolvers({
    paths
}: BuildOptions): webpack.ResolveOptions {
    return {
        alias: {
            src: paths.src,
            '@': paths.src
        },
        extensions: ['.ts', '.tsx', '.js', '.json']
    }
}
