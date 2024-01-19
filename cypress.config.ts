import { defineConfig } from 'cypress'
import registerCodeCoverageTasks from '@cypress/code-coverage/task'

export default defineConfig({
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    video: true,
    chromeWebSecurity: false,
    e2e: {
        setupNodeEvents(on, config) {
            registerCodeCoverageTasks(on, config)
            return config
        },
        baseUrl: 'http://localhost:3000/',
        supportFile: 'cypress/support/e2e.ts',
        specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    },
})
