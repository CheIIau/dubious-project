import postcssPresetEnv from 'postcss-preset-env'
import type { ConfigFn } from 'postcss-load-config'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
//@ts-ignore
import tailwindNesting from 'tailwindcss/nesting'

const config: ConfigFn = ({ env }) => ({
    plugins: [
        postcssPresetEnv({
            stage: 3,
        }),
        tailwindNesting,
        tailwindcss(),
        autoprefixer(),
    ],
})

export default config
