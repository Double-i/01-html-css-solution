/// <reference types="cypress" />

before(function () {
  // Add pixels threshold for assertions
  // and ensure padding are not included when calculating elements dimensions and positions
  cy.configureLayoutInspector({
    threshold: 4,
    excludePadding: true,
  });
});

describe('Queue', function () {
  beforeEach(function () {
    cy.visit('/');

    cy.get('#queue').as('queue');
    cy.get('#queue').contains('Play next · 0 tracks').as('queueInfo');
    cy.get('#queue').contains('This queue is empty').as('queueContent');
  });

  it('should render the layout', function () {
    cy.get(this.queue).should('width.be.within', 328, 332);
    cy.get(this.queueInfo).should('be.inside', this.queue, { top: 32, left: 32 });
    cy.get(this.queueContent).should('be.horizontallyAligned', this.queue, 'centered');
    cy.get(this.queueContent).should('be.verticallyAligned', this.queue, 'centered');
    cy.get(this.queue).should('have.css', 'background-color', 'rgb(243, 244, 246)');
  });

  it('should use the right font', function () {
    cy.get(this.queueInfo).should('have.css', 'font-size', '16px');
    cy.get(this.queueInfo).should('have.css', 'line-height', '24px');

    cy.get(this.queueContent).should('have.css', 'font-size', '16px');
    cy.get(this.queueContent).should('have.css', 'line-height', '24px');
    cy.get(this.queueContent).should('have.css', 'color', 'rgb(156, 163, 175)');
  });
});
