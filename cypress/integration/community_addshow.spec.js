/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
        cy.visit('https://cis-658-1580957541230.firebaseapp.com')
    })

    it('.click() - click thru menu and open and add show', () => {
        // https://on.cypress.io/click
        cy.get('.MuiButtonBase-root').click({multiple: true})
        cy.get('.addShow').click()
        cy.get('#show-title').type('Brooklyn Nine-Nine').should('have.value', 'Brooklyn Nine-Nine')
        cy.get('#show-description')
            .type("Brooklyn Nine-Nine is an American police procedural comedy television series created by Dan Goor and Michael Schur. The series revolves around Jake Peralta (Andy Samberg), an immature but talented NYPD detective in Brooklyn's fictional 99th Precinct")
            .should('have.value', "Brooklyn Nine-Nine is an American police procedural comedy television series created by Dan Goor and Michael Schur. The series revolves around Jake Peralta (Andy Samberg), an immature but talented NYPD detective in Brooklyn's fictional 99th Precinct")
        cy.get('#show-image')
            .type('https://m.media-amazon.com/images/M/MV5BNzVkYWY4NzYtMWFlZi00YzkwLThhZDItZjcxYTU4ZTMzMDZmXkEyXkFqcGdeQXVyODUxOTU0OTg@._V1_UY1200_CR90,0,630,1200_AL_.jpg')
            .should('have.value', 'https://m.media-amazon.com/images/M/MV5BNzVkYWY4NzYtMWFlZi00YzkwLThhZDItZjcxYTU4ZTMzMDZmXkEyXkFqcGdeQXVyODUxOTU0OTg@._V1_UY1200_CR90,0,630,1200_AL_.jpg')
        cy.get('#save').click()
    })
