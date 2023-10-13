import type webpack from 'webpack'
import type { BuildOptions } from './types/config'
import { buildCssLoader } from './loaders/cssLoader'
import { languages } from '../../src/shared/config/i18n/const'

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const fileLoader = {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
            {
                loader: 'file-loader'
            }
        ]
    }

    const svgLoader = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack']
    }

    const tsLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
    }

    const babelLoader = {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: [
                    [
                        'i18next-extract',
                        {
                            locales: languages,
                            keyAsDefaultValue: true
                        }
                    ]
                ]
            }
        }
    }

    const cssLoaders = buildCssLoader(options.isDev)

    return [fileLoader, svgLoader, babelLoader, tsLoader, cssLoaders]
}
