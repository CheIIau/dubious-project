import webpack, { DefinePlugin, RuleSetRule } from 'webpack'
import { BuildOptions, BuildPaths } from '../build/types/config'
import path from 'path'
import { buildCssLoader } from '../build/loaders/cssLoader'

export default ({ config }: { config: webpack.Configuration }) => {
    const paths: BuildPaths = {
        '~': path.resolve(__dirname, '..', '..'),
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
        test: '',
        locales: '',
        buildLocales: ''
    }

    config.resolve?.modules?.push(paths.src)
    config.resolve?.extensions?.push('.ts', '.tsx', '.js', '.jsx')
    config.resolve!.alias = {
        src: paths.src,
        '@': paths.src,
        '~': paths['~']
    }

    config.module!.rules = config.module!.rules!.map((configRule) => {
        // to avoid ts error
        const rule = configRule as RuleSetRule
        if ((rule.test as RegExp | undefined)?.test('.svg')) {
            return { ...rule, exclude: /\.svg$/i }
        }
        return rule
    })

    config.module?.rules?.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    })

    config.plugins?.push(
        new DefinePlugin({
            __IS_DEV__: true,
            __PROJECT__: JSON.stringify('storybook' as BuildOptions['project']),
        }),
    )

    config.module?.rules?.push(buildCssLoader(true))

    return config
}
