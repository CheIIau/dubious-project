import webpack, { RuleSetRule } from 'webpack'
import { BuildPaths } from '../build/types/config'
import path from 'path'
import { buildCssLoader } from '../build/loaders/cssLoader'

export default ({ config }: { config: webpack.Configuration }) => {
    const paths: BuildPaths = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
        test: ''
    }

    config.resolve?.modules?.push(paths.src)
    config.resolve?.extensions?.push('.ts', '.tsx', '.js', '.jsx')
    config.resolve!.alias = {
        src: paths.src,
        '@': paths.src,
    }

    config.module!.rules = config.module!.rules!.map((configRule) => {
        // to avoid ts error
        const rule = configRule as RuleSetRule
        if ((rule.test as RegExp | undefined)?.test('.svg')) {
            return { ...rule, exclude: /\.svg$/i };
        }
        return rule;
    });

    config.module?.rules?.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    });

    config.module?.rules?.push(buildCssLoader(true))

    return config
}
