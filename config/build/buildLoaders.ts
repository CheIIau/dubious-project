import type webpack from 'webpack'
import type { BuildOptions } from './types/config'
import { buildCssLoader } from './loaders/cssLoader'

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const fileLoader = {
        exclude: /node_modules/,
        test: /\.(png|jpe?g|gif)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    }

    const svgLoader = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
        exclude: /node_modules/,
    }

    // const tsLoader = {
    //     test: /\.tsx?$/,
    //     use: 'ts-loader',
    //     exclude: /node_modules/
    // }

    const babelLoader = {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                cacheDirectory: true,
                // presets: ['@babel/preset-env'],
                // plugins: [
                //     [
                //         'i18next-extract',
                //         {
                //             locales: languages,
                //             keyAsDefaultValue: true,
                //         },
                //     ],
                // ],
            },
        },
    }

    const cssLoaders = buildCssLoader(options.isDev)

    return [
        fileLoader,
        svgLoader,
        babelLoader,
        //tsLoader,
        cssLoaders,
    ]
}
