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
    if (this.game) {
      this.stage.removeAllChildren();
      this.stage.removeAllEventListeners();
      this.game = null;
    }
    this.game = new Asteroids.Game({
      stage: this.stage,
      view: this
    });
    createjs.Ticker.paused = false;
    console.log("begin");
    createjs.Ticker.removeAllEventListeners();
    createjs.Ticker.addEventListener("tick", this.tick.bind(this));
    createjs.Ticker.setInterval(10);
  };

  GameView.prototype.stop = function () {
    console.log("Stop");
    createjs.Ticker.paused = true;
    //this.stage.update();
  };

  GameView.prototype.restart = function () {
    this.stop();
    console.log("Lives: " + this.lives);
    if (this.lives > 0) {
      this.lives -= 1;
      window.setTimeout(function () {
        console.log("start");
        this.start();
      }.bind(this), 2000)
    }
  };

  GameView.prototype.tick = function () {
    this.game.step();
    this.stage.update();
  };

})();
