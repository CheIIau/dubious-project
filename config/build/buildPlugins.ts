import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import webpack from 'webpack'
import CopyPlugin from 'copy-webpack-plugin'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import type { BuildOptions } from './types/config'

export function buildPlugins({
    paths,
    isDev,
    project,
    apiUrl
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
            __API_URL__: JSON.stringify(apiUrl)
        }),
        new CopyPlugin({
            patterns: [{ from: paths.locales, to: paths.buildLocales }],
        }),
    ]
    if (isDev) {
        plugins.push(new webpack.HotModuleReplacementPlugin())
        plugins.push(new BundleAnalyzerPlugin({ openAnalyzer: false }))
    }

    return plugins
}
