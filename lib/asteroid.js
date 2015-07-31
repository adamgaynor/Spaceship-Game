"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var STAGE_WIDTH = 700;
  var STAGE_HEIGHT = 700;

  var Asteroid = Asteroids.Asteroid = function (options) {
    var img = new Image();
    img.crossOrigin="Anonymous";
    img.src = "https://s3.amazonaws.com/asteroids-game/asteroid.png";
    this.asteroid = new createjs.Bitmap(img);
    this.asteroid.x = options[0];
    this.asteroid.y = options[1];
    this.speed = (Asteroids.Util.getRandomInt(2, 4) / 2);

  };

  Asteroid.prototype.move = function () {
    this.asteroid.y += this.speed;
  }

  Asteroid.prototype.remove = function () {
    this.destroy();
  };

  Asteroid.prototype.isOutOfBounds = function (posX, posY) {
    if (this.asteroid.y > STAGE_HEIGHT + 150) {
      return true;
    } else {
      return false;
    }
  };


})();
