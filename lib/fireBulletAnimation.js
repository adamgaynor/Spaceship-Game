"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var BulletAnimation = Asteroids.BulletAnimation = function (options) {
    this.spaceship = options.spaceship;
    this.fireBulletPic = options.fireBulletPic;
    this.createBullet();
    this.duration = 0;

  };

  BulletAnimation.prototype.createBullet = function () {
    this.bullet = new createjs.Bitmap(this.fireBulletPic);
    this.bullet.x = this.spaceship.x;
    this.bullet.y = this.spaceship.y;
  };

  BulletAnimation.prototype.move = function () {
    this.bullet.x = this.spaceship.x - 9.5;
    this.bullet.y = this.spaceship.y - 30;
    this.duration += 1;

  };

})();
