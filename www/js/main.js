var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var dangerZoner;
var levelbar;
var textScore;
var level;
var textLevel;
var gameHasBegun;
var shapeSuccessMeterLeft;
var shapeSuccessMeterMiddle;
var shapeSuccessMeterRight;

/*Load in sprites and event handlers
*/
function preload() {
  game.load.image('rectRed', 'assets/rectRed.png');
  game.load.image('rectBlue', 'assets/rectBlue.png');
  game.load.image('rectGreen', 'assets/rectGreen.png');
  game.load.image('rectYellow', 'assets/rectYellow.png');
  game.load.image('rectPurple', 'assets/rectPurple.png');
  game.load.image('rectTeal', 'assets/rectTeal.png');
  game.load.image('rectOrange', 'assets/rectOrange.png');
  game.load.image('error', 'assets/error.png');
  game.load.image('success', 'assets/success.png');
  game.load.image('dangerZone', 'assets/dangerZone.png');
  game.load.image('levelbar', 'assets/levelbar.png');
  game.load.image('shapeSuccessMeter', 'assets/shapeSuccessMeter.png');
  game.input.onTap.add(onTap, this);
}

/*Create initial game scenario, set global variable values
*/
function create() {

  //add danger zone and fill it to screen width
  dangerZone = game.add.sprite(0, window.innerHeight/2-100, 'dangerZone');
  dangerZone.width = window.innerWidth;

  levelbar = game.add.sprite(0, 100, 'levelbar');
  levelbar.width = 0;

  level = 1;

  gameHasBegun = false;

  //add each of the three shape success meters
  shapeSuccessMeterLeft = game.add.sprite(0, dangerZone.bottom, 'shapeSuccessMeter');
  shapeSuccessMeterLeft.height = 0;
  shapeSuccessMeterLeft.width = window.innerWidth / 3;
  shapeSuccessMeterMiddle = game.add.sprite(tapZone1, dangerZone.bottom, 'shapeSuccessMeter');
  shapeSuccessMeterMiddle.height = 0;
  shapeSuccessMeterMiddle.width = window.innerWidth / 3;
  shapeSuccessMeterRight = game.add.sprite(tapZone2, dangerZone.bottom, 'shapeSuccessMeter');
  shapeSuccessMeterRight.height = 0;
  shapeSuccessMeterRight.width = window.innerWidth / 3;

  //add and center needed text
  textScore = game.add.text(game.world.centerX, 0, 'X    X    X', {
      font: "50px Impact",
      fill: "#ff0044",
  });
  textScore.x = game.world.centerX - (textScore.width/2);

  textLevel = game.add.text(0, 55, "Level: " + level, {
      font: "30px Impact",
      fill: "#ffffff",
  });
  textLevel.x = game.world.centerX - (textLevel.width/2);

  //used timed spawning initially before using generateShape()
  game.time.events.add(Phaser.Timer.SECOND * 0.5, generateShape, this);
  game.time.events.add(Phaser.Timer.SECOND * 4.5, generateShape, this);
  game.time.events.add(Phaser.Timer.SECOND * 8.5, generateShape, this);
  game.time.events.add(Phaser.Timer.SECOND * 9, startGame, this);
}

/*Helper method to switch from timed spawning to generateShape()
*/
function startGame(){
  gameHasBegun = true;
}

/*Handles updates at 60FPS
*/
function update() {
  updateShape();
  checkInZone();
  if(gameHasBegun){
    generateShape();
  }
}

/*Event handler
*/
function onTap() {
  moveShape(game.input.x);
}
