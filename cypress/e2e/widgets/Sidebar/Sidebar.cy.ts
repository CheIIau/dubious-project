describe('Sidebar', () => {
    it('should go to the about page on about page link click', () => {
        cy.visit('/')
        cy.dataCy('sidebar-items').as('sidebar')
        cy.get('@sidebar').should('exist')
        cy.get('@sidebar').contains('About').click()
        cy.url().should('include', '/about')
    })

    it('shows the profile and article items when logged in', () => {
        cy.visit('/')
        cy.dataCy('sidebar-items').as('sidebar')
        cy.get('@sidebar').contains('Profile').should('not.exist')
        cy.login()
        cy.reload()
        cy.get('@sidebar').contains('Profile').should('exist')
        cy.get('@sidebar').contains('Articles').should('exist')
    })
})
