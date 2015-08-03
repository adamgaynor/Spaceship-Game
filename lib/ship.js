"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var SHIP_IMG_WIDTH = 96;
  var SHIP_IMG_HEIGHT = 108;

  var Ship = Asteroids.Ship = function (options) {
    this.loadImages();
    this.loadShip(options);

  };

  Ship.prototype.loadImages = function () {
    this.queue = new createjs.LoadQueue();
    this.queue.on("complete", this.handleImageQueue, this);
    this.queue.loadFile({id: "explosion", src:"vendor/explosion.png"});
    this.queue.loadFile({id: "fire-bullet", src:"vendor/fire-bullet.png"});
    this.queue.loadFile({id: "spaceship-sheet", src:"assets/spaceships_t.png"});
    this.queue.loadFile({id: "explosion-sheet", src:"assets/explosions_sheet.png"});

    // var queue = new createjs.LoadQueue();
    // queue.on("complete", this.handleImageQueue, this);
    // queue.loadFile({id: "ship", src:"vendor/spaceship1.png"});
    // queue.loadFile({id: "explosion", src:"vendor/explosion.png"});

  };

  Ship.prototype.loadShip = function (options) {
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
    img.src = this.explosionPic;
    this.explosion = new createjs.Bitmap(this.explosionPic);
    //this.explosion = new createjs.Sprite(this.explosionSpriteSheet, "explode");
    this.explosion.x = posX;
    this.explosion.y = posY;
    return this.explosion;
  };

  Ship.prototype.handleImageQueue = function (event) {
    // var image = this.queue.getResult("ship");
    // this.shipPic = image;

    var image = this.queue.getResult("explosion");
    this.explosionPic = image;

    image = this.queue.getResult("fire-bullet");
    this.fireBulletPic = image;

    image = this.queue.getResult("spaceship-sheet");
    this.shipSpriteSheet = this.generateShipSpriteSheet(image);
    // this.explosionPic =
    //   createjs.SpriteSheetUtils.extractFrame(this.shipSpriteSheet, 5);

    image = this.queue.getResult("explosion-sheet");
    this.explosionSpriteSheet = this.generateExplosionSpriteSheet(image);

  };

  Ship.prototype.fireBullet = function () {
    // var fireBullet = new createjs.Bitmap(this.fireBulletPic);
    // fireBullet.x = this.spaceship.x;
    // fireBullet.y = this.spaceship.y;

    var fireBullet = new Asteroids.BulletAnimation({
      spaceship: this.spaceship,
      fireBulletPic: this.fireBulletPic
    });
    return fireBullet;
  };

  Ship.prototype.generateShipSpriteSheet = function (spriteSheet) {
    var data = {
      images: [spriteSheet],
      frames: {
        width: 94,
        height: 99,
        //count: 80,
        spacing: 1
      },
      animations: {
        stand: 5,
        left: 16,
        right: 37,
        moving: 26
      }
    };
    return new createjs.SpriteSheet(data);
  }

  Ship.prototype.generateExplosionSpriteSheet = function (spriteSheet) {
    var data = {
      images: [spriteSheet],
      frames: {
        width: 250,
        height: 250,
        count: 48//,
        //spacing: 1
      },
      animations: {
        explode: [1,48]
      }
    };
    return new createjs.SpriteSheet(data);
  }




  })();
