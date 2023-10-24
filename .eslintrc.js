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
    plugins: ['@typescript-eslint', 'react', 'i18next', 'react-hooks'],
    rules: {
        // indent: ['warn', 4],
        'linebreak-style': ['warn', 'windows'],
        quotes: ['warn', 'single'],
        semi: ['warn', 'never'],
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
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        'react/prefer-read-only-props': 'error',
        '@typescript-eslint/no-explicit-any': 'warn',
        'react/prop-types': 'off',
        indent: 'off',
    },
}
