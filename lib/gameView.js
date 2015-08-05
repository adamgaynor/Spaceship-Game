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

    var element = document.getElementById("start");
    this.startButton = new createjs.DOMElement(element);
    element = document.getElementById("gameCanvas");
    this.stageElement = new createjs.DOMElement(element);
    // stops the stage from getting absolute positioning for some reason
    this.stageElement.htmlElement.setAttribute("style", "");
    element = document.getElementById("info-text");
    this.infoText = new createjs.DOMElement(element);


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
      window.setTimeout(function () {
        // console.log("start");
        this.showStartButton();
      }.bind(this), 1000)
    }
  };

  GameView.prototype.showStartButton = function () {
    this.clickListener = this.startButton.htmlElement.onclick = handleClick.bind(this);
    this.startButton.htmlElement.setAttribute("class", "show");
    this.stageElement.htmlElement.setAttribute("class", "show");

    // this.clickListener = this.stage.on("stagemousedown", handleClick, this, false);

    function handleClick (event) {
      event.preventDefault();
      this.startButton.htmlElement.setAttribute("class", "");
      this.stageElement.htmlElement.setAttribute("class", "");
      this.infoText.htmlElement.setAttribute("class", "");

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
