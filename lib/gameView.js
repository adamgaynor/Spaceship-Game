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
    this.updateText();

    createjs.Ticker.paused = false;
    // console.log("begin");
    createjs.Ticker.removeAllEventListeners();
    createjs.Ticker.addEventListener("tick", this.tick.bind(this));
    createjs.Ticker.setInterval(4);
  };

  GameView.prototype.updateText = function () {
    this.text = new createjs.Text("Ships Remaining: " + (this.lives - 1), "20px Arial", "green");
    this.text.x = 250;
    this.stage.addChild(this.text);
    this.stage.setChildIndex(this.text, 500);
  };

  GameView.prototype.stop = function () {
    // console.log("Stop");
    createjs.Ticker.paused = true;
  };

  GameView.prototype.restart = function () {
    this.stop();
    // console.log("Lives: " + this.lives);
    if (this.lives > 1) {
      this.lives -= 1;
      window.setTimeout(function () {
        // console.log("start");
        this.start();
      }.bind(this), 1000)
    }
  };

  GameView.prototype.tick = function () {
    this.game.step();
    this.stage.update();
  };

})();
