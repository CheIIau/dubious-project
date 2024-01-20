describe('editableProfileCard', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.login().then((user) => {
            cy.visit(`profile/${user.id}`)
        })
    })
    it('should update profile when user edits profile card', () => {
        cy.dataCy('firstname')
            .as('firstname-input')
            .should('have.attr', 'readonly')
        cy.contains('button', 'Edit').as('edit-button').should('exist')
        cy.get('@edit-button').click()
        cy.get('@firstname-input').should('not.have.attr', 'readonly')
        cy.get('@firstname-input').then((el) => {
            const previousName = el.val()
            cy.get('@firstname-input').clear().type(getRandomString())

            cy.contains('button', 'Save').should('exist').click()
            cy.reload()

            cy.get('@firstname-input').should('not.have.value', previousName)
        })
    })
})

const getRandomString = () => (Math.random() + 1).toString(36).substring(7)
