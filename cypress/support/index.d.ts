declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            dataCy(value: string): Chainable<JQuery<HTMLElement>>
            login(
                username?: string,
                password?: string,
            ): Chainable<import('src/entities/User/userIndex').User>
        }
    }
}
export {}
