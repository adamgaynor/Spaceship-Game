"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }


  var Game = Asteroids.Game = function (options) {
    this.allObjects = [];
    this.bullets = [];
    this.asteroids = [];
    this.stage = options.stage;
    this.ship = new Asteroids.Ship({
      posX: 300,
      posY: 300
    });
    this.stage.addChild(this.ship.spaceship);
    this.addShipListeners();
  };

  Game.prototype.step = function () {
    this.spawnAsteroids();
    this.moveObjects();
    //this.checkCollisions();
  };

  Game.prototype.moveObjects = function () {
    this.bullets.forEach(this.move);
    this.asteroids.forEach(this.move);
  };

  Game.prototype.move = function (object) {
    object.move();
  };

  Game.prototype.spawnAsteroids = function () {
    if (Math.random() < 0.01) {
      var posX = Asteroids.Util.getRandomInt(0, 690);
      var asteroid = new Asteroids.Asteroid([posX, 0]);
      this.asteroids.push(asteroid);
      this.stage.addChild(asteroid.asteroid);
    }
  };

  Game.prototype.checkCollisions = function () {
    var self = this;
    self.bullets.forEach(function (bullet) {
      self.asteroids.forEach(function (asteroid) {
        if (Asteroids.Util.checkCollision(bullet.bullet, asteroid.asteroid)) {
          console.log("hit");
        }
      });
    });
  };

  Game.prototype.addShipListeners = function () {
    this.stage.on("stagemousemove", function (event) {
      //console.log("stageX/Y: "+event.stageX+","+event.stageY);
      this.ship.move([event.stageX, event.stageY]);
    }.bind(this));

    this.stage.on("stagemousedown", function (event) {
      //alert("the canvas was clicked at "+event.stageX+","+event.stageY);
      var bullet = new Asteroids.Bullet([event.stageX, event.stageY]);
      this.bullets.push(bullet);
      this.stage.addChild(bullet.bullet);
    }.bind(this));
  }

})();
