/* Made by Brandon Loehle
*  brandon.loehle@quinnipiac.edu
*/

var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var gameHasBegun = false;
var menuOpen = true;
var gameIsOver = false;

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
  game.load.image('levelBar', 'assets/levelBar.png');
  game.load.image('shapeSuccessMeter', 'assets/shapeSuccessMeter.png');
  game.load.image('blackBackground', 'assets/blackBackground.png');
  game.load.bitmapFont('titleFont', 'assets/titleFont.png', 'assets/titleFont.fnt');
  game.load.bitmapFont('font', 'assets/font.png', 'assets/font.fnt');
  game.load.bitmapFont('redFont', 'assets/redFont.png', 'assets/redFont.fnt');
  game.load.audio('music', 'assets/arcadeMusic.mp3');
  game.load.audio('success', 'assets/successSound.wav');
  game.load.audio('fail', 'assets/failSound.wav');
  game.input.onTap.add(onTap, this);
  game.input.onHold.add(onHold, this);
  game.input.holdRate = 500;
}

/*Create initial game scenario, set global variable values
*/
function create(){
    loadGame();
    loadMusic();
    openMenu();
}

/*Helper method to switch from timed spawning to generateShape()
*/
function startGame(){
  gameHasBegun = true;
}

/*Handles updates at 60FPS
*/
function update() {
  if(!gameIsOver){
    updateShape();
    checkInZone();
    if(gameHasBegun){
      generateShape();
    }
  }
  if(menuOpen){
    fixFontSize(menuItems);
    scrollMenuBackground();
    flash(menuItems[2]);
  }
  else if(gameIsOver){
    fixFontSize(gameOverItems);
    flash(gameOverItems[3]);
    scrollGameOverBackground();
  }
}

/*Event handlers
*/
function onTap() {
  if(menuOpen){
    clearMenu();
    initalSpawn();
    menuOpen = false;
  }
  else if(gameIsOver){

  }
  else{
    moveShape(game.input.x);
  }
}

function onHold(){
  if(gameIsOver){
    clearGameOver();
    restartGame();
  }
}
