/// <reference types="cypress" />

describe('Body', function () {
  beforeEach(function () {
    cy.visit('/');
  });
  it('page body should not overflow horizontally', function () {
    cy.get('body').should('not.be.overflowing', 'horizontally');
  });
});
