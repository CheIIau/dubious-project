/// <reference types="cypress" />
// ***********************************************
Cypress.Commands.add('login', (email, password) => {})

Cypress.Commands.add('dataCy', (value) => {
    return cy.get(`[data-cy=${value}]`)
})

export {}