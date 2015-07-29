"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }


  var Game = Asteroids.Game = function (options) {
    this.stage = options.stage;
    this.ship = new Asteroids.Ship({
      posX: 300,
      posY: 300
    });
    this.stage.addChild(this.ship.spaceship);
    this.addShipListener();
  };

  Game.prototype.addShipListener = function () {
    this.stage.on("stagemousemove", function (event) {
      console.log("stageX/Y: "+event.stageX+","+event.stageY);
    });

  }

})();
