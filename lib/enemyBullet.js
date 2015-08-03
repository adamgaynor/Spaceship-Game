"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var EnemyBullet = Asteroids.EnemyBullet = function (options) {
    this.posX = options[0] + 20;
    this.posY = options[1] + 45;
    this.bullet = this.draw(this.posX, this.posY);
    this.vectorX = Asteroids.Util.getRandomInt(-1, 2);
  };

  EnemyBullet.prototype.move = function () {
    this.bullet.x += this.vectorX;
    this.bullet.y += 4;
  };

  EnemyBullet.prototype.draw = function (posX, posY) {
    var img = new Image();
    img.crossOrigin="Anonymous";
    img.src = "vendor/enemy-bullet.png";
    var bullet = new createjs.Bitmap(img);
    bullet.x = posX;
    bullet.y = posY;
    return bullet;
  };

  EnemyBullet.prototype.isOutOfBounds = function (posX, posY) {
    if (this.bullet.y > STAGE_HEIGHT + 100 ||
      this.bullet.x < 0 ||
      this.bullet.x > STAGE_WIDTH) {
      return true;
    } else {
      return false;
    }
  };


})();
