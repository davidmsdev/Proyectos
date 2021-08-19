/// <reference types="cypress" />

describe('Valida el formulario', () => {

    beforeEach(() => {
        cy.visit('/index.html')
    })

    it('Rellenar formulario y comprobar que se muestra cuadro con la respuesta correcta, si introducimos 10 y 20 el resultado tiene que ser 100%', () => {
        cy.get('[data-cy=initial-input]')
            .type(10)

        cy.get('[data-cy=final-input]')
            .type(20)

        cy.get('[data-cy=form]')
            .submit();

        cy.get('[data-cy=result-box]')
            .should('be.visible')
            .should('have.class', 'positive')
            .invoke('text')
            .should('equal', '100%')
    })

    it('Rellenar formulario y comprobar que se muestra cuadro con la respuesta correcta, si introducimos 10 y 0 el resultado tiene que ser -100%', () => {
        cy.get('[data-cy=initial-input]')
            .type(10)

        cy.get('[data-cy=final-input]')
            .type(0)

        cy.get('[data-cy=form]')
            .submit();

        cy.get('[data-cy=result-box]')
            .should('be.visible')
            .should('have.class', 'negative')
            .invoke('text')
            .should('equal', '-100%')
    })

    it('Submit al formulario y mostrar la alerta de error', () => {
        cy.get('[data-cy=form]')
            .submit()

        // Seleccionar la alerta
        cy.get('[data-cy=alert]')
            .invoke('text')
            .should('equal', 'Ambos campos son obligatorios')

        // Esperamos 4 segundos para comprobar que la alerta se elimina
        cy.wait(4000)
        cy.get('[data-cy=alert]')
            .should('not.exist')
    })

})