"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var STARTING_LIVES = 5;

  var GameView = Asteroids.GameView = function (stage) {
    this.stage = stage;

    this.lives = STARTING_LIVES;

    this.score = 0;

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
    this.updateLives();
    this.updateScore();

    createjs.Ticker.paused = false;
    // console.log("begin");
    createjs.Ticker.removeAllEventListeners();
    createjs.Ticker.addEventListener("tick", this.tick.bind(this));
    createjs.Ticker.setInterval(3);
  };

  GameView.prototype.updateLives = function () {
    this.livesDisplay = new createjs.Text(
      "Ships Remaining: " + (this.lives - 1), "24px Arial", "green");
    this.livesDisplay.x = 150;
    this.stage.addChild(this.livesDisplay);
    this.stage.setChildIndex(this.livesDisplay, 500);
    if (this.scoreDisplay) {
      this.stage.addChild(this.scoreDisplay);
    }
  };

  GameView.prototype.updateScore = function () {
    if (!this.scoreDisplay) {
      this.scoreDisplay = new createjs.Text(
        "Score: " + (this.score), "24px Arial", "green");
      this.scoreDisplay.x = 450;
      this.stage.addChild(this.scoreDisplay);
    }
    this.scoreDisplay.text = "Score: " + (this.score);

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
    } else {
      this.showRestartButton();
    }
  };

  GameView.prototype.showRestartButton = function () {
    this.clickListener = this.stage.on("stagemousedown", handleClick, this, false);

    function handleClick (event) {
      this.stage.removeAllEventListeners();
      this.stage.removeAllChildren();
      view = new Asteroids.GameView(stage).start();
      //need to remove the old view
    };
  };

  GameView.prototype.tick = function () {
    this.game.step();
    this.stage.update();
    this.updateScore();
  };

})();
