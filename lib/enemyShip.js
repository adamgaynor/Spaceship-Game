"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var STAGE_WIDTH = 700;
  var STAGE_HEIGHT = 700;

  var EnemyShip = Asteroids.EnemyShip = function (options) {
    var img = new Image();
    img.crossOrigin="Anonymous";
    img.src = "vendor/evemy-ship.png";

  }

})();
