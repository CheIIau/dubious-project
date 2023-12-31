import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
    test: {
        environment: 'happy-dom',
        setupFiles: 'test/setup-file.ts',
        include: [
            // Matches vitest tests in any subfolder of 'src' or into 'test/vitest/__tests__'
            // Matches all files with extension 'js', 'jsx', 'ts' and 'tsx'
            'src/**/*.vitest.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
            'test/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
        ],
        globals: true,
        outputFile: './.reports/html/index.html',
    },
    plugins: [tsconfigPaths() as Plugin, svgr() as Plugin],
    define: {
        __IS_DEV__: true,
    },
})
