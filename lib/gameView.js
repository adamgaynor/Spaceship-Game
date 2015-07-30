"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var STARTING_LIVES = 5;

  var GameView = Asteroids.GameView = function (stage) {
    this.stage = stage;

    this.lives = STARTING_LIVES;
  };

  GameView.prototype.start = function () {
    this.game = new Asteroids.Game({
      stage: this.stage,
      view: this
    });
    console.log("begin");
    createjs.Ticker.addEventListener("tick", this.tick.bind(this));
    createjs.Ticker.setInterval(10);
  };

  GameView.prototype.stop = function () {
    createjs.Ticker.setInterval(100000000000000);
    this.stage.update();
  };

  GameView.prototype.restart = function () {
    this.stop();

    if (this.lives > 0) {
      this.lives -= 1;
      window.setTimeout(function () {
        this.start();
        console.log("start");
      }.bind(this), 2000)
    }
  };

  GameView.prototype.tick = function () {
    this.game.step();
    this.stage.update();
  };

})();
