import 'webpack-dev-server'
import type webpack from 'webpack'
import { buildWebpackConfig } from './config/build/buildWebpackConfig'
import type { BuildEnv, BuildPaths } from './config/build/types/config'
import path from 'path'

export default (env: BuildEnv) => {
    const paths: BuildPaths = {
        '~': path.resolve(__dirname, './'),
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        build: path.resolve(__dirname, 'build'),
        src: path.resolve(__dirname, 'src'),
        test: path.resolve(__dirname, 'test'),
        locales: path.resolve(__dirname, 'public', 'locales'),
        buildLocales: path.resolve(__dirname, 'build', 'locales'),
    }

    const mode = env.mode || 'development'
    const PORT = env.port || 3000
    const apiUrl = env.apiUrl
    
    const config: webpack.Configuration = buildWebpackConfig({
        mode,
        paths,
        isDev: mode === 'development' ? true : false,
        port: PORT,
        project: 'frontend',
        apiUrl
    })
    return config
}
