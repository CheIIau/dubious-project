import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [react(), svgr(), tsconfigPaths(), reactVirtualized()],
    resolve: {
        alias: [
            { find: '@', replacement: path.resolve(__dirname, './src') },
            { find: '~', replacement: path.resolve(__dirname, './') },
            { find: 'src', replacement: path.resolve(__dirname, './src') },
        ],
    },
    css: {
        modules: {
            localsConvention: 'dashes',
        },
    },
    esbuild: {
        legalComments: 'none',
    },
    define: {
        __IS_DEV__: true,
        __PROJECT__: JSON.stringify('frontend'),
        __API_URL__: JSON.stringify('http://localhost:8000'),
    },
    test: {
        environment: 'happy-dom',
        setupFiles: 'test/setup-file.ts',
        include: [
            'src/**/*.vitest.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
            'test/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
        ],
        globals: true,
        outputFile: './.reports/unit/index.html',
    },
})

//the code below is to fix fucking bug in react virtualized
const WRONG_CODE =
    'import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";'

function reactVirtualized() {
    return {
        name: 'my:react-virtualized',
        configResolved() {
            const file = require
                .resolve('react-virtualized')
                .replace(
                    path.join('dist', 'commonjs', 'index.js'),
                    path.join(
                        'dist',
                        'es',
                        'WindowScroller',
                        'utils',
                        'onScroll.js',
                    ),
                )
            const code = fs.readFileSync(file, 'utf-8')
            const modified = code.replace(WRONG_CODE, '')
            fs.writeFileSync(file, modified)
        },
    }
}
