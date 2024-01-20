/// <reference types="cypress" />
// ***********************************************
import { USER_LOCALSTORAGE_KEY } from '~/src/shared/const/localstorage'

export default function addCustomCommands() {
    Cypress.Commands.add('login', (username = 'test_user', password = 'test') => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8000/login',
            body: {
                username,
                password,
            },
        }).then(({ body }) => {
            window.localStorage.setItem(
                USER_LOCALSTORAGE_KEY,
                JSON.stringify(body),
            )
        })
    })

    Cypress.Commands.add('dataCy', (value) => {
        return cy.get(`[data-cy=${value}]`)
    })
}
