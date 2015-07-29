"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }


  var Game = Asteroids.Game = function (options) {
    this.stage = options.stage;
    this.ship = new Asteroids.Ship({
      stage: this.stage
    });

  };

})();
