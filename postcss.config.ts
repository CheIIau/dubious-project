import postcssPresetEnv from 'postcss-preset-env'
import type { ConfigFn } from 'postcss-load-config'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

const config: ConfigFn = ({ env }) => ({
    plugins: [
        postcssPresetEnv({
            stage: 3
        }),
        autoprefixer(),
        tailwindcss()
    ]
})

export default config
