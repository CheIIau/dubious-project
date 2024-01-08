/* eslint-disable @typescript-eslint/consistent-type-imports */
module.exports = function (
    api: import('@babel/core').ConfigAPI,
): import('@babel/core').TransformOptions {
    api.cache.forever()

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
    // const plugins = [
    //     [
    //         'i18next-extract',
    //         {
    //             locales: ['ru-RU', 'en'],
    //             keyAsDefaultValue: true,
    //         },
    //     ],
    // ]

    return {
        presets,
        // plugins,
    }
}
