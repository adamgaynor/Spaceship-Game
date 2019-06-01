# Spaceships and Asteroids
The object of the game is to achieve the highest score possible by destroying as many enemy spaceships and asteroids as you can. As your score increases, the number of enemy ships increases, and they fire more bullets.

## Technology
Spaceships and Asteroids uses the HTML5 canvas element to create the game field. The game incorporates the createJS JavaScript library to create a stage inside the canvas in which the gameplay happens.  CreateJS is useful because greatly simplifies the drawing of sprites onto the game's stage, and an addon library exists for easy pixel-level collision detection.

## The Stage
The createJS library allows the creation of a special element called the Stage. The Stage is placed onto the canvas, and in turn the elements of the game are placed onto the Stage using its `addChild` method. Listeners can also be added either to the Stage, or to child elements, using the `addListener` method.
In this game, the Stage itself has a listener that detects the position of the mouse, and ensures that the player's spaceship follows the mouse's position when it is inside of the Stage. CSS is used to hide the cursorr itself, so that it does not block elements of the game.
The Stage also has a `createJS.Ticker` attribute, which fires a `tick` event at a constant interval. By listening for this `tick` event, the program can advance the state of the game every time it fires.

## DOM Elements
Elements from the DOM can also be registered to the Stage, which allows control over those elements from inside of the game. Examples of this include the start button that appears when the game is over, and the instructions that appear only when the page first loads.

## Class Structure
The various elements of the game are divided into their own JavaScript namespaces, each of which has its own prototype methods. This organization is similar to a class structure, and allows the objects of the game to communicate with each other using these methods.
For example, each type of sprite (spaceship, bullet) has its own `move` method that determines its behavior. The Game class simply calls the `move` method of every object on the Stage to advance the state of the game.
