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
    this.stage.on("stagemousedown", function (event) {
      alert("the canvas was clicked at "+event.stageX+","+event.stageY);
    });
    // var spaceship = new createjs.Bitmap("vendor/spaceship1.png");
    // spaceship.x = 300;
    // spaceship.y = 300;
    // this.stage.addChild(spaceship);
    // this.stage.update();
  };

  GameView.prototype.tick = function () {
    this.stage.update();
  };

})();
