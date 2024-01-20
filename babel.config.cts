// eslint-disable-next-line @typescript-eslint/no-var-requires
const babelRemoveAttrsPlugin = require('./config/babel/babelRemoveAttrsPlugin.cts')
type TransformOptions = import('@babel/core').TransformOptions

module.exports = function (
    api: import('@babel/core').ConfigAPI,
): TransformOptions {
    const NODE_ENV = api.env() as 'production' | 'development' | undefined
    api.cache.using(() => NODE_ENV !== 'production')

    const presets = [
        '@babel/preset-env',
        ['@babel/preset-typescript', {}],
        [
            '@babel/preset-react',
            {
                runtime: 'automatic',
            },
        ],
    ]
    const plugins: TransformOptions['plugins'] = [
        // [
        //     'i18next-extract',
        //     {
        //         locales: ['ru-RU', 'en'],
        //         keyAsDefaultValue: true,
        //     },
        // ],
        'istanbul',
    ]

    if (NODE_ENV === 'production') {
        plugins.push([
            babelRemoveAttrsPlugin,
            {
                props: ['data-testid', 'data-cy'],
            },
        ])
    }

    return {
        presets,
        plugins,
    }
}
