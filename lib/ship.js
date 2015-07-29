"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (options) {
    this.spaceship = new createjs.Bitmap("vendor/spaceship1.png");
    this.spaceship.x = options.posX;
    this.spaceship.y = options.posY;
  };

  Ship.prototype.move = function (pos) {
    this.spaceship.x = pos[0];
    this.spaceship.y = pos[1];
  }



  })();