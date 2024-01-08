import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import webpack, { WebpackError } from 'webpack'
import CopyPlugin from 'copy-webpack-plugin'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import type { BuildOptions } from './types/config'
import CircilarDependencyPlugin from 'circular-dependency-plugin'

//curent count of circular dependencies because of router.tsx and App.tsx file. is completely safe
const MAX_CYCLES = 8
let numCyclesDetected = 0

export function buildPlugins({
    paths,
    isDev,
    project,
    apiUrl,
}: BuildOptions): webpack.WebpackPluginInstance[] {
    const plugins = [
        new HTMLWebpackPlugin({
            template: paths.html,
            // title: 'App',
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __PROJECT__: JSON.stringify(project),
            __API_URL__: JSON.stringify(apiUrl),
        }),
        new CopyPlugin({
            patterns: [{ from: paths.locales, to: paths.buildLocales }],
        }),
    ]
    if (isDev) {
        plugins.push(new webpack.HotModuleReplacementPlugin())
        plugins.push(new BundleAnalyzerPlugin({ openAnalyzer: false }))
        plugins.push(
            new CircilarDependencyPlugin({
                exclude: /node_modules/,
                onStart({ compilation }) {
                    numCyclesDetected = 0
                },
                onDetected() //     {
                //     module: webpackModuleRecord,
                //     paths,
                //     compilation,
                //     }
                {
                    numCyclesDetected++
                    // compilation.warnings.push(
                    //     new WebpackError(paths.join(' -> ')),
                    // )
                },
                onEnd({ compilation }) {
                    if (numCyclesDetected > MAX_CYCLES) {
                        compilation.errors.push(
                            new WebpackError(
                                `Detected ${numCyclesDetected} cycles which exceeds configured limit of ${MAX_CYCLES}`,
                            ),
                        )
                    }
                },
            }),
        )
    }

    return plugins
}
