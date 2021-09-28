/// <reference types="cypress" />

before(function () {
  // Add pixels threshold for assertions
  // and ensure padding are not included when calculating elements dimensions and positions
  cy.configureLayoutInspector({
    threshold: 4,
    excludePadding: true,
  });
});

describe('Layout', function () {
  beforeEach(function () {
    cy.visit('/');

    cy.get('main').as('main');
    // playlist info
    cy.get('main').find('img').as('playlistCover');
    cy.get('main').contains('Playlist').as('type');
    cy.get('main').contains('Hits of the moment').as('playlistTitle');
    cy.get('main').contains('By Fábio - Deezer Pop Editor').as('playlistAuthor');
    cy.get('main').contains('2016 · 60 songs · 162 minutes').as('playlistInfo');
    cy.get('[data-section="playlist-info"]').as('playlistSection');

    // player
    cy.get('#player').as('player');
    cy.get('#player').find('img[alt="Stay"]').as('trackImage');
    cy.get('#player').contains('STAY').as('trackTitle');
    cy.get('#player').contains('The Kid Laroi').as('trackAuthor');

    cy.get('#player').find('img[alt="Skip Previous"]').as('previousIcon');
    cy.get('#player').find('img[alt="Pause"]').as('pauseIcon');
    cy.get('#player').find('img[alt="Skip Next"]').as('nextIcon');

    cy.get('#player').contains('Powered by').as('poweredBy');
    cy.get('#player').find('img[alt="Deezer logo"]').as('deezerLogo');

    // queue
    cy.get('#queue').as('queue');
    cy.get('#queue').contains('Play next · 0 tracks').as('queueInfo');
    cy.get('#queue').contains('This queue is empty').as('queueContent');

    // song list
    cy.get('main').contains('Stay').as('track1');
    cy.get('main').contains('The Kid Laroi').as('artist1');

    cy.get('main').contains('INDUSTRY BABY').as('track2');
    cy.get('main').contains('Lil Nas X').as('artist2');

    cy.get('main').contains('Woman').as('track3');
    cy.get('main').contains('Doja Cat').as('artist3');

    cy.get('main').contains('Bad Habits').as('track4');
    cy.get('main').contains('Ed Sheeran').as('artist4');

    cy.get('main').contains('Way 2 Sexy').as('track5');
    cy.get('main').contains('Drake').as('artist5');

    cy.get('main').contains('Pepas').as('track5');
    cy.get('main').contains('Farruko').as('artist5');

    cy.get('main').contains('Take My Breath').as('track6');
    cy.get('main').contains('The Weeknd').as('artist6');

    cy.get('main').contains('Happier Than Ever').as('track7');
    cy.get('main').contains('Billie Eilish').as('artist7');
  });

  it('page body should not overlow horizontally', function () {
    cy.get('body').should('not.be.overflowing', 'horizontally');
  });

  it('should render the playlist info', function () {
    cy.get(this.playlistCover).should('be.width', 250);
    cy.get(this.playlistCover).should('be.inside', this.main, {
      top: 86,
      left: 86,
    });
    cy.get(this.playlistTitle).should('be.rightOf', this.playlistCover, 32);
    cy.get(this.type).should('be.above', this.playlistTitle, 6);
    cy.get(this.playlistAuthor).should('be.below', this.playlistTitle, 6);
    cy.get(this.playlistInfo).should('be.below', this.playlistAuthor, 4);
    cy.get(this.playlistInfo).should('be.inside', this.playlistSection, {
      bottom: 0,
    });
  });

  it('should render player', function () {
    cy.get(this.trackImage).should('height.be.within', 75, 85);
    cy.get(this.trackImage).should('width.be.within', 75, 85);
    cy.get(this.trackImage).should('be.inside', this.player, {
      top: 1, // TODO: use threshold
      bottom: 0,
      left: 0,
    });
    cy.get(this.trackTitle).should('be.rightOf', this.trackImage, 16);
    cy.get(this.trackAuthor).should('be.rightOf', this.trackImage, 16);
    cy.get(this.trackTitle).should('be.above', this.trackAuthor);

    cy.get(this.pauseIcon).should('be.verticallyAligned', this.player, 'centered');
    cy.get(this.pauseIcon).should('be.horizontallyAligned', this.player, 'centered');
    cy.get(this.pauseIcon).should('width.be.within', 38, 42);
    cy.get(this.previousIcon).should('width.be.within', 38, 42);
    cy.get(this.nextIcon).should('width.be.within', 38, 42);
    cy.get(this.pauseIcon).should('be.rightOf', this.previousIcon, 32);
    cy.get(this.pauseIcon).should('be.leftOf', this.nextIcon, 32);

    cy.get(this.deezerLogo).should('be.inside', this.player, { right: 16 });
    cy.get(this.deezerLogo).should('height.be.within', 25, 35);
    cy.get(this.poweredBy).should('be.above', this.deezerLogo);
  });

  it('should keep player visible even when scrolling', function () {
    const checkPlayerPosition = () => {
      console.log('checkPlayerPosition');
      cy.get('#player')
        .then((elem) => elem[0].getBoundingClientRect().bottom)
        .then((bottom) => {
          assert.equal(
            bottom,
            Cypress.config().viewportHeight,
            'the player should stick to the bottom of the screen',
          );
        });
    };

    checkPlayerPosition();
    // Scroll to last song
    cy.get('main').contains('Billie Eilish').scrollIntoView();
    checkPlayerPosition();
  });

  it('should render queue', function () {
    cy.get(this.queueInfo).should('be.inside', this.queue, {
      top: 32,
      left: 32,
    });
    cy.get(this.queueContent).should('be.horizontallyAligned', this.queue, 'centered');
    cy.get(this.queueContent).should('be.verticallyAligned', this.queue, 'centered');
    cy.get(this.queue).should('have.css', 'background-color', 'rgb(243, 244, 246)');
  });

  it('should have correct font (playlist info)', function () {
    // playlist info
    cy.get(this.type).should('have.css', 'font-size', '16px');
    cy.get(this.type).should('have.css', 'line-height', '24px');

    cy.get(this.playlistTitle).should('have.css', 'font-size', '48px');

    cy.get(this.playlistAuthor).should('have.css', 'font-size', '16px');
    cy.get(this.playlistAuthor).should('have.css', 'line-height', '24px');

    cy.get(this.playlistInfo).should('have.css', 'font-size', '16px');
    cy.get(this.playlistInfo).should('have.css', 'line-height', '24px');
  });

  it('should have correct font (player)', function () {
    // player
    cy.get(this.trackTitle).should('have.css', 'font-size', '14px');
    cy.get(this.trackTitle).should('have.css', 'line-height', '21px');
    cy.get(this.trackTitle).should('have.css', 'font-weight', '500');

    cy.get(this.trackAuthor).should('have.css', 'font-size', '14px');
    cy.get(this.trackAuthor).should('have.css', 'line-height', '21px');

    cy.get(this.poweredBy).should('have.css', 'font-size', '12px');
  });

  it('should have correct font (queue)', function () {
    // queue
    cy.get(this.queueInfo).should('have.css', 'font-size', '16px');
    cy.get(this.queueInfo).should('have.css', 'line-height', '24px');

    cy.get(this.queueContent).should('have.css', 'font-size', '16px');
    cy.get(this.queueContent).should('have.css', 'line-height', '24px');
    cy.get(this.queueContent).should('have.css', 'color', 'rgb(166, 166, 166)');
  });

  it('should have correct font (song list)', function () {
    // queue
    cy.get(this.track1).should('have.css', 'font-size', '16px');
    cy.get(this.track1).should('have.css', 'line-height', '24px');
    cy.get(this.track1).should('have.css', 'font-weight', '500');

    cy.get(this.track2).should('have.css', 'font-size', '16px');
    cy.get(this.track2).should('have.css', 'line-height', '24px');
    cy.get(this.track2).should('have.css', 'font-weight', '500');

    cy.get(this.track3).should('have.css', 'font-size', '16px');
    cy.get(this.track3).should('have.css', 'line-height', '24px');
    cy.get(this.track3).should('have.css', 'font-weight', '500');

    cy.get(this.track4).should('have.css', 'font-size', '16px');
    cy.get(this.track4).should('have.css', 'line-height', '24px');
    cy.get(this.track4).should('have.css', 'font-weight', '500');

    cy.get(this.track5).should('have.css', 'font-size', '16px');
    cy.get(this.track5).should('have.css', 'line-height', '24px');
    cy.get(this.track5).should('have.css', 'font-weight', '500');

    cy.get(this.track6).should('have.css', 'font-size', '16px');
    cy.get(this.track6).should('have.css', 'line-height', '24px');
    cy.get(this.track6).should('have.css', 'font-weight', '500');

    cy.get(this.artist1).should('have.css', 'font-size', '16px');
    cy.get(this.artist1).should('have.css', 'line-height', '24px');

    cy.get(this.artist2).should('have.css', 'font-size', '16px');
    cy.get(this.artist2).should('have.css', 'line-height', '24px');

    cy.get(this.artist3).should('have.css', 'font-size', '16px');
    cy.get(this.artist3).should('have.css', 'line-height', '24px');

    cy.get(this.artist4).should('have.css', 'font-size', '16px');
    cy.get(this.artist4).should('have.css', 'line-height', '24px');

    cy.get(this.artist5).should('have.css', 'font-size', '16px');
    cy.get(this.artist5).should('have.css', 'line-height', '24px');

    cy.get(this.artist6).should('have.css', 'font-size', '16px');
    cy.get(this.artist6).should('have.css', 'line-height', '24px');
  });

  it('should render song list', function () {
    cy.get(this.track1).should('be.above', this.artist1, 4);
    cy.get(this.artist1).should('be.above', this.track2, 32);

    cy.get(this.track2).should('be.above', this.artist2, 4);
    cy.get(this.artist2).should('be.above', this.track3, 32);

    cy.get(this.track3).should('be.above', this.artist3, 4);
    cy.get(this.artist3).should('be.above', this.track4, 32);

    cy.get(this.track5).should('be.above', this.artist5, 4);
    cy.get(this.artist5).should('be.above', this.track6, 32);

    cy.get(this.track6).should('be.above', this.artist6, 4);
    cy.get(this.artist6).should('be.above', this.track7, 32);

    cy.get(this.track7).should('be.above', this.artist7, 4);

    cy.get(this.track1).should('be.inside', this.main, { left: 86 });
    cy.get(this.track2).should('be.inside', this.main, { left: 86 });
    cy.get(this.track3).should('be.inside', this.main, { left: 86 });
    cy.get(this.track4).should('be.inside', this.main, { left: 86 });
    cy.get(this.track5).should('be.inside', this.main, { left: 86 });
    cy.get(this.track6).should('be.inside', this.main, { left: 86 });
    cy.get(this.track7).should('be.inside', this.main, { left: 86 });
  });
});
