declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            dataCy(value: string): Chainable<JQuery<HTMLElement>>
            login(email: string, password: string): Chainable<void>
        }
    }
}
export {}
