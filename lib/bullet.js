"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (options) {
    this.posX = options[0];
    this.posY = options[1];
    this.bullet = this.draw(this.posX, this.posY);
  };

  Bullet.prototype.move = function () {
    this.bullet.y -= 5;
  }

  Bullet.prototype.draw = function (posX, posY) {
    var bullet = new createjs.Shape();
    bullet.graphics.beginFill("lightgreen").drawCircle(0, 0, 2);
    bullet.x = posX;
    bullet.y = posY;
    return bullet;
  }


})();
