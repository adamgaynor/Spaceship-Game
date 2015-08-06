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

    this.registerDOMElements();


  };

  GameView.prototype.registerDOMElements = function () {
    this.startButton = new createjs.DOMElement(document.getElementById("start"));

    this.stageElement = new createjs.DOMElement(document.getElementById("gameCanvas"));

    this.infoText = new createjs.DOMElement(document.getElementById("info-text"));

    this.contentElement = new createjs.DOMElement(document.getElementById("content"));

    // stops the stage from getting absolute positioning for some reason
    this.contentElement.htmlElement.setAttribute("style", "");
    this.stageElement.htmlElement.setAttribute("style", "");
    this.stageElement.htmlElement.setAttribute("height", STAGE_HEIGHT);
    this.stageElement.htmlElement.setAttribute("width", STAGE_WIDTH);


    this.contentElement.htmlElement.setAttribute("width", STAGE_WIDTH);
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
      "Ships Remaining: " + (this.lives), "24px Arial", "green");
    this.livesDisplay.x = (STAGE_WIDTH / 2) - 200;
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
      this.scoreDisplay.x = (STAGE_WIDTH / 2) + 100;
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
        this.showStartButton(true);
      }.bind(this), 1000)
    }
  };

  GameView.prototype.showStartButton = function (gameLost) {
    this.gameOver = new createjs.Text("Game Over\n\n" +
      "Final Score: " + this.score,
      "36px Arial", "red");
    this.gameOver.x = (STAGE_WIDTH / 2) - 100;
    this.gameOver.y = 150;

    this.stage.addChild(this.gameOver);


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
