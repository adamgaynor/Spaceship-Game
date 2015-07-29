"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (options) {
    this.asteroid = new createjs.Bitmap("vendor/asteroid.png");
    this.asteroid.x = options[0];
    this.asteroid.y = options[1];

  };

  Asteroid.prototype.move = function () {
    this.asteroid.y += 1;
  }

  Asteroid.prototype.draw = function (posX, posY) {

  }


})();
