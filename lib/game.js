"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }


  var Game = Asteroids.Game = function (options) {
    this.allObjects = [];
    this.bullets = [];
    this.asteroids = [];
    this.fireBullets = [];
    this.enemyShips = [];
    this.enemyBullets = [];
    this.stage = options.stage;
    this.gameView = options.view;
    this.ship = new Asteroids.Ship({
      posX: STAGE_WIDTH - 100,
      posY: STAGE_HEIGHT - 100
    });
    this.stage.addChild(this.ship.spaceship);
    this.addShipListeners();
  };

  Game.prototype.step = function () {
    if (!createjs.Ticker.paused) {
      if (this.isExploding) {
        this.ship.explosion.scaleX += .05;
        this.ship.explosion.scaleY += .05;

        // console.log(this.ship.explosion.scaleX);
        if (this.ship.explosion.scaleX >= 1) {
          createjs.Ticker.paused = true;
          this.gameView.restart();
        }
      }

      this.spawnAsteroids();
      this.spawnEnemyShips();
      this.fireEnemyBullets();
      this.moveObjects();
      this.checkBulletCollisions();
      if (!this.isExploding) {
        this.checkShipCollisions();
      }
      this.pruneObjects();
    }
  };

  Game.prototype.moveObjects = function () {
    this.bullets.forEach(this.move);
    if (!this.isExploding) {
      this.asteroids.forEach(this.move);
      this.fireBullets.forEach(this.move);
      this.enemyShips.forEach(this.move);
      this.enemyBullets.forEach(this.move);
    }
    this.fireBullets.forEach(function (glow) {
      if (glow.duration > 10) {
        this.remove(this.fireBullets, glow);
        this.stage.removeChild(glow.bullet);
      }
    }.bind(this));
  };


  Game.prototype.move = function (object) {
    object.move();
  };

  Game.prototype.spawnAsteroids = function () {
    if (Math.random() < 0.01) {
      var posX = Asteroids.Util.getRandomInt(10, STAGE_WIDTH - 50);
      var asteroid = new Asteroids.Asteroid([posX, -100]);
      this.asteroids.push(asteroid);
      this.stage.addChild(asteroid.asteroid);
    }
  };

  Game.prototype.spawnEnemyShips = function () {
    var multiplier = 1 + this.gameView.score / 350;
    //var multiplier = createjs.Ticker.getTicks() / 3000;
    //multiplier = 4;
    if (Math.random() < 0.001 * multiplier) {
        var newEnemy = new Asteroids.EnemyShip();
        this.enemyShips.push(newEnemy);
        this.stage.addChild(newEnemy.ship);
    }
  };

  Game.prototype.fireEnemyBullets = function () {
    var self = this;
    var multiplier = 1 + this.gameView.score / 1000;
    self.enemyShips.forEach(function (enemyShip) {
      if (Math.random() < 0.003 * multiplier) {
        var enemyBullet = new Asteroids.EnemyBullet(
          [enemyShip.ship.x, enemyShip.ship.y]
        );
        self.enemyBullets.push(enemyBullet);
        self.stage.addChild(enemyBullet.bullet);
      }
    });
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
          self.gameView.score += 10;
        }
      });
      self.enemyShips.forEach(function (enemyShip) {
        if (Asteroids.Util.checkCollision(bullet.bullet, enemyShip.ship)) {
          self.remove(self.enemyShips, enemyShip);
          self.stage.removeChild(enemyShip.ship);
          self.remove(self.bullets, bullet);
          self.stage.removeChild(bullet.bullet);
          self.gameView.score += 20;
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
    self.enemyShips.forEach(function (enemyShip) {
      if (Asteroids.Util.checkCollision(enemyShip.ship, self.ship.spaceship)) {
        self.blowUpShip();
      }
    });
    self.enemyBullets.forEach(function (enemyBullet) {
      if (Asteroids.Util.checkCollision(enemyBullet.bullet, self.ship.spaceship)) {
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
    self.enemyShips.forEach(function (enemyShip) {
      if (enemyShip.isOutOfBounds()) {
        self.remove(self.enemyShips, enemyShip);
        self.stage.removeChild(enemyShip.ship);
      }
    });
    self.enemyBullets.forEach(function (enemyBullet) {
      if (enemyBullet.isOutOfBounds()) {
        self.remove(self.enemyBullets, enemyBullet);
        self.stage.removeChild(enemyBullet.bullet);
      }
    });
  };

  Game.prototype.addShipListeners = function () {
    this.moveListener = this.stage.on("stagemousemove", handleMove, this, false);
    function handleMove (event) {
      this.ship.move([event.stageX, event.stageY]);
    };

    this.clickListener = this.stage.on("stagemousedown", handleClick, this, false);

    function handleClick (event) {
      var bullet = new Asteroids.Bullet([event.stageX, event.stageY]);
      this.bullets.push(bullet);
      this.stage.addChild(bullet.bullet);

      //add explosions here
      var fireBullet = this.ship.fireBullet();
      this.fireBullets.push(fireBullet);
      this.stage.addChild(fireBullet.bullet);
    };
  };

  Game.prototype.remove = function (array, object) {
    var i = array.indexOf(object);
    array.splice(i, 1);
  };

})();
