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
    this.addShipListeners();
  };

  Game.prototype.addShipListeners = function () {
    this.stage.on("stagemousemove", function (event) {
      console.log("stageX/Y: "+event.stageX+","+event.stageY);
      this.ship.move([event.stageX, event.stageY]);
    }.bind(this));

    this.stage.on("stagemousedown", function (event) {
      alert("the canvas was clicked at "+event.stageX+","+event.stageY);
    });
  }

})();
