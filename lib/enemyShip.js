"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var STAGE_WIDTH = 700;
  var STAGE_HEIGHT = 700;

  var EnemyShip = Asteroids.EnemyShip = function (options) {
    var img = new Image();
    img.crossOrigin="Anonymous";
    img.src = "vendor/enemy-ship.png";
    this.ship = new createjs.Bitmap(img);
    this.vector = this.getVector();
    this.ship.x = this.vector.x;
    this.ship.y = this.vector.y;
    this.vector = this.vector.vec;
  };

  EnemyShip.prototype.getVector = function () {
    var vector = {};
    var startingX = (Math.random() < 0.5) ? -10 : (STAGE_WIDTH - 10);
    // var startingX = Asteroids.Util.getRandomInt(10, (STAGE_HEIGHT / 3));
    var startingY = Asteroids.Util.getRandomInt(10, (STAGE_HEIGHT / 4));
    var vectorX = Asteroids.Util.getRandomInt(3, 4) / 2;
    var vectorY = Asteroids.Util.getRandomInt(0, 2) / 2;

    // make sure it's moving left if it starts on the right
    if (startingX != -10) {
      vectorX = vectorX * -1;
    }

    vector.x = startingX;
    vector.y = startingY;
    vector.vec = [vectorX, vectorY];
    return vector;
  };

  EnemyShip.prototype.move = function () {
    this.ship.x += this.vector[0];
    this.ship.y += this.vector[1];
  };

  EnemyShip.prototype.isOutOfBounds = function () {
    if (this.ship.x > 800 || this.ship.x < -100) {
      return true;
    } else {
      return false;
    }
  };

})();
