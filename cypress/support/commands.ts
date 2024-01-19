/// <reference types="cypress" />
// ***********************************************
Cypress.Commands.add('login', (email, password) => {})

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            login(email: string, password: string): Chainable<void>
        }
    }
}
export {}
