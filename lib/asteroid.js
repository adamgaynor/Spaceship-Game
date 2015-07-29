"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (options) {
    this.posX = options[0];
    this.posY = options[1];
    this.bullet = this.draw(this.posX, this.posY);
  };

  Asteroid.prototype.move = function () {

  }

  Asteroid.prototype.draw = function (posX, posY) {

  }


})();
