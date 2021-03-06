/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
        cy.visit('https://cis-658-1580957541230.firebaseapp.com')
    })

    it('.click() - click thru menu, view shows and add show', () => {
        // https://on.cypress.io/click
        cy.get('.MuiButtonBase-root').click({multiple: true})
        cy.get('#view-series').click()
        cy.get('.MuiButton-contained').click()
        cy.get('#outlined-comment-text').type('This show Rules man!').should('have.value', 'This show Rules man!')
        cy.get('#comment').click()
    })
