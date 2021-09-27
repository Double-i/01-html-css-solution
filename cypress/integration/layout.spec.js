/// <reference types="cypress" />

describe("Layout", function () {
  before(() => {
    cy.configureLayoutInspector({ threshold: 4 });
  });

  beforeEach(function () {
    cy.visit("http://localhost:8080", {});

    cy.get('main').as('main');
    // playlist info
    cy.get("main").get("img").as("playlistCover");
    cy.get("main").contains("Playlist").as("type");
    cy.get("main").contains("Hits of the moment").as("playlistTitle");
    cy.get("main")
      .contains("By Fábio - Deezer Pop Editor")
      .as("playlistAuthor");
    cy.get("main").contains("2016 · 60 songs · 162 minutes").as("playlistInfo");
    cy.get('[data-section="playlist-info"]').as('playlistSection');

    // player
    cy.get("#player").as("player");
    cy.get("#player").get('img[alt="Stay"]').as("trackImage");
    cy.get("#player").contains("STAY").as("trackTitle");
    cy.get("#player").contains("The Kid Laroi").as("trackAuthor");

    cy.get("#player").get('img[alt="Skip Previous"]').as("previousIcon");
    cy.get("#player").get('img[alt="Pause"]').as("pauseIcon");
    cy.get("#player").get('img[alt="Skip Next"]').as("nextIcon");

    cy.get("#player").contains("Powered by").as("poweredBy");
    cy.get("#player").get('img[alt="Deezer logo"]').as("deezerLogo");

    // queue
    cy.get("#queue").as("queue");
    cy.get("#queue").contains("Play next · 0 tracks").as("queueInfo");
    cy.get("#queue").contains("This queue is empty").as("queueContent");
  });

  it.skip("renders the playlist info", function () {
    cy.get(this.playlistCover).should("be.width", 250);
    cy.get(this.playlistCover).should("be.inside", this.main, {top: 86, left: 86});
    cy.get(this.playlistTitle).should("be.rightOf", this.playlistCover, 32);
    cy.get(this.type).should("be.above", this.title, 24);
    cy.get(this.playlistAuthor).should("be.below", this.title, 24);
    cy.get(this.playlistInfo).should("be.below", this.playlistAuthor, 4);
    cy.get(this.playlistInfo).should("be.inside", this.playlistSection, {bottom: 0});
  });

  it("should render player", function () {
    cy.get(this.trackImage).should("be.height", 80);
    cy.get(this.trackImage).should("be.width", 80);
    cy.get(this.trackImage).should("be.inside", this.player, {
      top: 0,
      bottom: 0,
      left: 0,
    });
    cy.get(this.trackTitle).should("be.rightOf", this.trackImage, 16);
    cy.get(this.trackAuthor).should("be.rightOf", this.trackImage, 16);
    cy.get(this.trackTitle).should("be.above", this.trackAuthor);

    cy.get(this.pauseIcon).should("be.verticallyAligned", this.player);
    cy.get(this.pauseIcon).should("be.horizontallyAligned", this.player);
    cy.get(this.pauseIcon).should("be.rightOf", this.previousIcon, 32);
    cy.get(this.pauseIcon).should("be.leftOf", this.nextIcon, 32);

    cy.get(this.deezerLogo).should("be.inside", this.player, { right: 16 });
    cy.get(this.poweredBy).should("be.above", this.deezerLogo);
  });

  it("should render queue", function () {
    cy.get(this.queueInfo).should("be.inside", this.queue, {
      top: 32,
      left: 32,
    });
    cy.get(this.queueContent).should("be.horizontallyAligned", this.queue);
    cy.get(this.queueContent).should("be.verticallyAligned", this.queue);
  });

  describe("songs", function () {
    beforeEach(function () {
      cy.get("main").contains("Stay").as("track1");
      cy.get("main").contains("The Kid Laroi").as("artist1");
      
      cy.get("main").contains("INDUSTRY BABY").as("track2");
      cy.get("main").contains("Lil Nas X").as("artist2");

      cy.get("main").contains("Woman").as("track3");
      cy.get("main").contains("Doja Cat").as("artist3");
      
      cy.get("main").contains("Bad Habits").as("track4");
      cy.get("main").contains("Ed Sheeran").as("artist4");

      cy.get("main").contains("Way 2 Sexy").as("track5");
      cy.get("main").contains("Drake").as("artist5");

      cy.get("main").contains("Pepas").as("track5");
      cy.get("main").contains("Farruko").as("artist5");

      cy.get("main").contains("Take My Breath").as("track6");
      cy.get("main").contains("The Weeknd").as("artist6");

      cy.get("main").contains("Happier Than Ever").as("track7");
      cy.get("main").contains("Billie Eilish").as("artist7");
    });
    
    it.only("should render song list", function () {
      cy.get(this.track1).should("be.above", this.artist1, 4);
      cy.get(this.artist1).should("be.above", this.track2, 32);


      cy.get(this.track2).should("be.above", this.artist2, 4);
      cy.get(this.artist2).should("be.above", this.track3, 32);

      cy.get(this.track3).should("be.above", this.artist3, 4);
      cy.get(this.artist3).should("be.above", this.track4, 32);

      cy.get(this.track5).should("be.above", this.artist5, 4);
      cy.get(this.artist5).should("be.above", this.track6, 32);

      cy.get(this.track6).should("be.above", this.artist6, 4);
      cy.get(this.artist6).should("be.above", this.track7, 32);

      cy.get(this.track7).should("be.above", this.artist7, 4);

      cy.get(this.track1).should('be.inside', this.main, { left: 86 })
      cy.get(this.track2).should('be.inside', this.main, { left: 86 })
      cy.get(this.track3).should('be.inside', this.main, { left: 86 })
      cy.get(this.track4).should('be.inside', this.main, { left: 86 })
      cy.get(this.track5).should('be.inside', this.main, { left: 86 })
      cy.get(this.track6).should('be.inside', this.main, { left: 86 })
      cy.get(this.track7).should('be.inside', this.main, { left: 86 })
    });
  });
});
