"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (options) {
    this.posX = options[0] - 15;
    this.posY = options[1] - 40;
    this.bullet = this.draw(this.posX, this.posY);
  };

  Bullet.prototype.move = function () {
    this.bullet.y -= 5;
  }

  Bullet.prototype.draw = function (posX, posY) {
    var img = new Image();
    img.crossOrigin="Anonymous";
    img.src = "vendor/bullet.png";
    var bullet = new createjs.Bitmap(img);
    bullet.x = posX;
    bullet.y = posY;
    return bullet;
  };

  Bullet.prototype.isOutOfBounds = function (posX, posY) {
    if (this.bullet.y < -150) {
      return true;
    } else {
      return false;
    }
  };


})();
