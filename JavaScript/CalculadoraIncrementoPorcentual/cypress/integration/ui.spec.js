/// <reference types="cypress" />

describe('Comprueba elementos visible y no visibles de la página principal', () => {

    beforeEach(() => {
        cy.visit('/index.html');
    })

    it('Cuando entramos por primera vez no debe verse el div de la respuesta', () => {
        cy.get('[data-cy=result-box]')
            .should('not.exist');
    })

    it('Comprbamos el título de la página', () => {
        cy.get('[data-cy=title]')
            .invoke('text')
            .should('equal', 'Calculadora Incremento Porcentual');
    })
})