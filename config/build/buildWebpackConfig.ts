import type { BuildOptions } from './types/config'
import type webpack from 'webpack'
import { buildPlugins } from './buildPlugins'
import { buildResolvers } from './buildResolve'
import { buildLoaders } from './buildLoaders'
import { buildDevServer } from './buildDevServer'

export function buildWebpackConfig(
    options: BuildOptions,
): webpack.Configuration {
    const { paths, mode, isDev } = options
    return {
        mode,
        entry: paths.entry,
        output: {
            path: paths.build,
            filename: '[name].[contenthash].js',
            clean: true,
            publicPath: '/',
        },
        plugins: buildPlugins(options),
        resolve: buildResolvers(options),
        module: {
            rules: buildLoaders(options),
        },
        devtool: isDev ? 'eval-cheap-module-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
    }
}
