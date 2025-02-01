/// <reference types="cypress" />

describe('add ingredients to constructor', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000/');
  });

  it('should add bun', function () {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1]')
      .contains('Ингредиент1')
      .should('exist');
    cy.get('[data-cy=constructor-bun-2]')
      .contains('Ингредиент1')
      .should('exist');
  });

  it('should add ingredients', function () {
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Ингредиент2')
      .should('exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Ингредиент4')
      .should('exist');
  });
});

describe('modals', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000/');
  });

  it('should open modal', function () {
    cy.contains('Ингредиент1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').contains('Ингредиент1').should('exist');
  });

  it('should close modal - button', function () {
    cy.contains('Ингредиент1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals button[aria-label="Закрыть"]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('should close modal - overlay', function () {
    cy.contains('Ингредиент1').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=modal-overlay]').click('left', { force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('make orders', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('ingredients');
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    });
    cy.intercept('POST', 'api/orders', {
      fixture: 'order.json'
    }).as('postOrder');
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000/');

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000/');
  });

  it('should make order', function () {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();

    cy.get('[data-cy=make-order]').click();

    cy.wait('@postOrder')
      .its('request.body')
      .should('deep.equal', { ingredients: ['1', '2', '4', '1'] });
    cy.get('[data-cy=order-number]').contains('12345').should('exist');

    cy.get('#modals button[aria-label="Закрыть"]').click();
    cy.contains('Детали ингредиента').should('not.exist');

    cy.get('[data-cy=constructor-bun-1]').should('not.exist');
    cy.get('[data-cy=constructor-bun-2]').should('not.exist');
    cy.get('[data-cy=constructor-bun-1]').should('not.exist');
  });

  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});
