"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var STARTING_X = 300;
  var STARTING_Y = 300;

  var Ship = Asteroids.Ship = function (options) {
    this.stage = options.stage;
    var spaceship = new createjs.Bitmap("vendor/spaceship1.png");
    spaceship.x = STARTING_X;
    spaceship.y = STARTING_Y;
    this.stage.addChild(spaceship);

  }


  })();
