import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    test: {
        environment: 'happy-dom',
        setupFiles: 'test/setup-file.ts',
        include: [
            // Matches vitest tests in any subfolder of 'src' or into 'test/vitest/__tests__'
            // Matches all files with extension 'js', 'jsx', 'ts' and 'tsx'
            'src/**/*.vitest.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
            'test/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
        ],
        globals: true
    },
    plugins: [tsconfigPaths()]
})
