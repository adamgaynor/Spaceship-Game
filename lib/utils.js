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


})();
