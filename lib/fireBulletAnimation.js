"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var BulletAnimation = Asteroids.BulletAnimation = function (options) {
    this.spaceship = options.spaceship;
    this.fireBulletPic = options.fireBulletPic;
    this.createBullet();

  };

  BulletAnimation.prototype.createBullet = function () {
    this.bullet = new createjs.Bitmap(this.fireBulletPic);
    this.bullet.x = this.spaceship.x;
    this.bullet.y = this.spaceship.y;
  }

})();
