describe('Main Page', () => {
    it('visits main page', () => {
        cy.visit('/')
        cy.dataCy('main-page-text').should('exist')
    })
})
