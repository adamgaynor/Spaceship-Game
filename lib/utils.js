"use strict";

(function () {
  if (typeof Asteroids.Util === "undefined") {
    window.Asteroids.Util = {};
  }

  Asteroids.Util.inherits = function (ChildClass, ParentClass) {
    var Surrogate = function () {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  }

  Asteroids.Util.randomVec = function (maxSpeed) {
    var distanceX = ( Math.random() * (maxSpeed * 2) - maxSpeed);
    var distanceY = ( Math.random() * (maxSpeed * 2) - maxSpeed);
    return [distanceX, distanceY];
  }

  Asteroids.Util.getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  Asteroids.Util.checkCollision = function (object1, object2) {
    var collision = ndgmr.checkPixelCollision(object1,object2,0,true);
    return collision;
  }


})();
