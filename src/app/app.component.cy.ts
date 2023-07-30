import { AppComponent } from './app.component';

describe('App', () => {

  it('displays data from the server twice', () => {
    cy.clock();

    cy.intercept('GET', 'https://yesno.wtf/api', {
      body: {
        answer: 'Apple',
      }
    }).as('apple');
    cy.mount(AppComponent);
    cy.get('.container').contains('Apple');

    cy.intercept('GET', 'https://yesno.wtf/api', {
      body: {
        answer: 'Banana',
      }
    }).as('banana');
    cy.tick(1000);
    cy.get('.container').contains('Banana');
  });

});
