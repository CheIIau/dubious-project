module.exports = {
    settings: {
        react: {
            version: 'detect',
        },
    },
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/strict',
        'plugin:react/recommended',
        'plugin:i18next/recommended',
        'plugin:storybook/recommended',
        'prettier',
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'dubious-plugin',
        '@typescript-eslint',
        'react',
        'i18next',
        'react-hooks',
    ],
    rules: {
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
            },
        ],
        'i18next/no-literal-string': 'warn',
        '@typescript-eslint/ban-ts-comment': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/jsx-no-constructed-context-values': 'error',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        'react/prefer-read-only-props': 'error',
        '@typescript-eslint/no-explicit-any': 'warn',
        'react/prop-types': 'off',
        'dubious-plugin/same-slice-local-import': ['error', { alias: 'src' }],
        'dubious-plugin/public-api-import-slice': [
            'error',
            { alias: 'src', ignoreFiles: ['**/*.test.*', '**/*.stories.*'] },
        ],
        'dubious-plugin/underlying-layer-imports': [
            'error',
            {
                alias: 'src',
                ignoreImportPatterns: ['**.scss', '**/StoreProvider/**'],
                ignoreFiles: ['**/*.test.*', '**/*.stories.*'],
            },
        ],
        'dubious-plugin/different-layer-absolute-import': [
            'error',
            {
                alias: 'src',
                ignoreFiles: ['**/*.test.*', '**/*.stories.*'],
            },
        ],
        'dubious-plugin/different-layer-export': [
            'error',
            {
                alias: 'src',
            },
        ],
        '@typescript-eslint/consistent-type-imports': [
            'error',
            {
                disallowTypeAnnotations: false,
            },
        ],
    },
}
