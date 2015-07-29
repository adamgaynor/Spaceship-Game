"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (stage) {
    //this.game = new Asteroids.Game();
    this.stage = stage;
  };

  GameView.prototype.start = function () {
    createjs.Ticker.addEventListener("tick", this.tick.bind(this));
    // var circle = new createjs.Shape();
    // circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    // circle.x = 100;
    // circle.y = 100;
    // this.stage.addChild(circle);
    // this.stage.update();

    var spaceship = new createjs.Bitmap("vendor/spaceship1.png");
    spaceship.x = 300;
    spaceship.y = 300;
    this.stage.addChild(spaceship);
    this.stage.update();
  };

  GameView.prototype.tick = function () {
    this.stage.update();
  };

})();
