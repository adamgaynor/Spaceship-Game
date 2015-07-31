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
    this.gameView = options.view;
    this.ship = new Asteroids.Ship({
      posX: 300,
      posY: 300
    });
    this.stage.addChild(this.ship.spaceship);
    this.addShipListeners();
  };

  Game.prototype.step = function () {
    if (this.isExploding) {
      this.ship.explosion.scaleX += .05;
      this.ship.explosion.scaleY += .05;
      console.log(this.ship.explosion.scaleX);
      if (this.ship.explosion.scaleX >= 1) {
        this.gameView.restart();
      }
    }

    this.spawnAsteroids();
    this.moveObjects();
    this.checkBulletCollisions();
    if (!this.isExploding) {
      this.checkShipCollisions();
    }
    this.pruneObjects();
  };

  Game.prototype.moveObjects = function () {
    this.bullets.forEach(this.move);
    if (!this.isExploding) {
      this.asteroids.forEach(this.move);
    }
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
        self.blowUpShip();
      }
    });
  };

  Game.prototype.blowUpShip = function () {
    this.isExploding = true;
    this.stage.removeChild(this.ship.spaceship);
    this.stage.addChild(this.ship.explode());
    this.ship.explosion.regX = 100;
    this.ship.explosion.regY = 100;
    this.ship.explosion.scaleX = 0;
    this.ship.explosion.scaleY = 0;

    this.stage.off("stagemousemove", this.moveListener);
    this.stage.off("stagemousedown", this.clickListener);
    //this.gameView.restart();
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
    this.moveListener = this.stage.on("stagemousemove", handleMove, this, false);
    function handleMove (event) {
      this.ship.move([event.stageX - 32, event.stageY + 5]);
    };

    this.clickListener = this.stage.on("stagemousedown", handleClick, this, false);

    function handleClick (event) {
      var bullet = new Asteroids.Bullet([event.stageX, event.stageY]);
      this.bullets.push(bullet);
      this.stage.addChild(bullet.bullet);
    };
  };

  Game.prototype.remove = function (array, object) {
    var i = array.indexOf(object);
    array.splice(i, 1);
  };

})();
