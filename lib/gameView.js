"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (stage) {
    this.game = new Asteroids.Game();
    this.stage = stage;
  };

  GameView.prototype.start = function () {
  }
})();
