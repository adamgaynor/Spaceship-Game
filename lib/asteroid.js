"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (options) {
    var img = new Image();
    img.crossOrigin="Anonymous";
    img.src = "https://s3.amazonaws.com/asteroids-game/asteroid.png";
    this.asteroid = new createjs.Bitmap(img);
    this.asteroid.x = options[0];
    this.asteroid.y = options[1];

  };

  Asteroid.prototype.move = function () {
    this.asteroid.y += 1;
  }

  Asteroid.prototype.remove = function () {
    this.destroy();
  };

  Asteroid.prototype.draw = function (posX, posY) {

  }


})();
