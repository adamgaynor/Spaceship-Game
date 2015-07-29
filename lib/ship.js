"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var STARTING_X = 300;
  var STARTING_Y = 300;

  var Ship = Asteroids.Ship = function (options) {
    this.spaceship = new createjs.Bitmap("vendor/spaceship1.png");
    this.spaceship.x = STARTING_X;
    this.spaceship.y = STARTING_Y;

  };



  })();
