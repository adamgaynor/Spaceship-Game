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
    this.checkBulletCollisions();
    this.checkShipCollisions();
    this.pruneObjects();
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
      var posX = Asteroids.Util.getRandomInt(50, 650);
      var asteroid = new Asteroids.Asteroid([posX, -100]);
      this.asteroids.push(asteroid);
      this.stage.addChild(asteroid.asteroid);
    }
  };

  Game.prototype.checkBulletCollisions = function () {
    var self = this;
    self.bullets.forEach(function (bullet) {
      self.asteroids.forEach(function (asteroid) {
        if (Asteroids.Util.checkCollision(bullet.bullet, asteroid.asteroid)) {
          self.remove(self.asteroids, asteroid);
          self.stage.removeChild(asteroid.asteroid);
          self.remove(self.bullets, bullet);
          self.stage.removeChild(bullet.bullet);
        }
      });
    });
  };

  Game.prototype.checkShipCollisions = function () {
    var self = this;
    self.asteroids.forEach(function (asteroid) {
      if (Asteroids.Util.checkCollision(asteroid.asteroid, self.ship.spaceship)) {
        //console.log("BOOM");
      }
    });
  };

  Game.prototype.pruneObjects = function () {
    var self = this;
    self.asteroids.forEach(function (asteroid) {
      if (asteroid.isOutOfBounds()) {
        self.remove(self.asteroids, asteroid);
        self.stage.removeChild(asteroid.asteroid);
      }
    });
    self.bullets.forEach(function (bullet) {
      if (bullet.isOutOfBounds()) {
        self.remove(self.bullets, bullet);
        self.stage.removeChild(bullet.bullet);
      }
    });
  };

  Game.prototype.addShipListeners = function () {
    this.stage.on("stagemousemove", function (event) {
      this.ship.move([event.stageX - 32, event.stageY + 5]);
    }.bind(this));

    this.stage.on("stagemousedown", function (event) {
      var bullet = new Asteroids.Bullet([event.stageX, event.stageY]);
      this.bullets.push(bullet);
      this.stage.addChild(bullet.bullet);
    }.bind(this));
  };

  Game.prototype.remove = function (array, object) {
    var i = array.indexOf(object);
    array.splice(i, 1);
  };

})();
