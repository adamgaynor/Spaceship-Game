"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (options) {
    this.asteroid = new createjs.Bitmap("vendor/asteroid.png");
    this.asteroid.x = options.posX;
    this.asteroid.y = options.posY;

  };

  Asteroid.prototype.move = function () {

  }

  Asteroid.prototype.draw = function (posX, posY) {

  }


})();
