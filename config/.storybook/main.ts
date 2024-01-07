import type { StorybookConfig } from '@storybook/react-webpack5'

const config = {
    stories: [
        '../../stories/**/*.mdx',
        '../../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-onboarding',
        '@storybook/addon-interactions',
        'storybook-react-i18next',
        'storybook-addon-mock',
        'storybook-addon-react-router-v6',
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
    core: {},
} satisfies StorybookConfig

export default config
