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
    var queue = new createjs.LoadQueue();
    queue.on("fileload", this.handleFileLoad, this);
    queue.loadFile({id: "explosion", src:"vendor/explosion.png"});
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
    img.src = this.explosionPic;
    this.explosion = new createjs.Bitmap(this.explosionPic);
    this.explosion.x = posX;
    this.explosion.y = posY;
    return this.explosion;
  };

  Ship.prototype.handleFileLoad = function (event) {
    var image = event.result;
    this.explosionPic = image;
  };



  })();
