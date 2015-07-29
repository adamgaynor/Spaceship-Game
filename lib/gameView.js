"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (stage) {
    this.stage = stage;
    this.game = new Asteroids.Game({
      stage: this.stage
    });
  };

  GameView.prototype.start = function () {
    createjs.Ticker.addEventListener("tick", this.tick.bind(this));
    createjs.Ticker.setInterval(10);
  };

  GameView.prototype.tick = function () {
    this.game.moveObjects();
    this.stage.update();
  };

})();
