"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var SHIP_IMG_WIDTH = 96;
  var SHIP_IMG_HEIGHT = 108;

  var Ship = Asteroids.Ship = function (options) {
    var img = new Image();
    img.crossOrigin="Anonymous";
    img.src = "vendor/spaceship1.png";
    this.spaceship = new createjs.Bitmap(img);
    this.spaceship.x = options.posX;
    this.spaceship.y = options.posY;
    this.spaceship.regX = SHIP_IMG_WIDTH/2;
    this.spaceship.regY = SHIP_IMG_HEIGHT/2;
    this.spaceship.scaleX = 0.5;
    this.spaceship.scaleY = 0.5;
  };

  Ship.prototype.move = function (pos) {
    this.spaceship.x = pos[0];
    this.spaceship.y = pos[1];
  };

  Ship.prototype.explode = function () {
    var posX = this.spaceship.x;
    var posY = this.spaceship.y;
    var img = new Image();
    img.crossOrigin="Anonymous";
    img.src="https://s3.amazonaws.com/asteroids-game/explosion.png";
    this.explosion = new createjs.Bitmap(img);
    this.explosion.x = posX;
    this.explosion.y = posY;
    return this.explosion;


  };



  })();
