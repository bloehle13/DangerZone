/* Made by Brandon Loehle
*  brandon.loehle@quinnipiac.edu
*/
var dangerZoner;
var levelBar;
var textScore;
var level;
var textLevel;
var shapeSuccessMeterLeft;
var shapeSuccessMeterMiddle;
var shapeSuccessMeterRight;
var background;
/*Loads the inital game state
*/
function loadGame(){
  //load background
  background = game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'blackBackground');

  //add danger zone and fill it to screen width
  dangerZone = game.add.sprite(0, window.innerHeight/2-100, 'dangerZone');
  dangerZone.width = window.innerWidth;

  levelBar = game.add.sprite(0, 100, 'levelBar');
  levelBar.width = 0;

  level = 1;

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
  textScore = game.add.bitmapText(0, 5, 'redFont', 'X    X    X', 30)
  if(textScore.width >= window.innerWidth){
    textScore.fontSize -= 5;
  }
  textScore.x = game.world.centerX - (textScore.width/2);

  textLevel =   game.add.bitmapText(0, 55, 'font', 'Level: ' + level, 25)
  textLevel.x = game.world.centerX - (textLevel.width/2);
}
/*Flashes red around the danger zone
*/
function madeMistake(){
  playSound('fail');

  //flashes image
  var mistake = game.add.sprite(0, window.innerHeight/2-100, 'error');
  mistake.width = window.innerWidth;
  game.add.tween(mistake).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);

  //decrease amount of X's and recenter text
  if (textScore.text === 'X    X    X'){
    textScore.setText('X    X');
    textScore.x = game.world.centerX - (textScore.width/2);
  }
  else if(textScore.text === 'X    X'){
    textScore.setText('X');
    textScore.x = game.world.centerX - (textScore.width/2);
  }

  //game over!
  else{
    gameIsOver = true;
    gameOver();
  }

}

/*Flashes green around the danger zone
*/
function success(){

  //flashes image
  var success = game.add.sprite(0, window.innerHeight/2-100, 'success');
  success.width = window.innerWidth;
  game.add.tween(success).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);

}

/*Helps reset the level bar
* @return number of pixels the bar exceeded the window by
*/
function resetBar(){
    return levelBar.width - window.innerWidth;
}

/*If the meter fills the screen, the height needs to be set back to 0.
* @param x = coordinate of shape, used to determine which meter needs reseting
*/
function resetShapeSuccessMeter(x){
  if(x < tapZone1){
    shapeSuccessMeterLeft.height = 0;
  }
  else if(x >= tapZone1 && x < tapZone2){
    shapeSuccessMeterMiddle.height = 0;
  }
  else if(x >= tapZone2){
    shapeSuccessMeterRight.height = 0;
  }
}

/*Scrolls the background
*/
function scrollBackground(speed){
  background.tilePosition.y += speed;
}

/*Change the height of each success meter given how long that shape has been in the danger zone
* @param x = x coordinate of shape
* @param timeInZone = how long shape has been in the danger zone
*/
function updateShapeSuccessMeter(x, timeInZone){

  //find total space on phone for meter
  var totalHeight = window.innerHeight - dangerZone.bottom;
  for(var i = 0; i < shapes.length; i++){

    //only move shapes that exist
    if(x < tapZone1){

        //bar fills screen in two seconds, using 119 frames, not 120, to account for potential drop in frames
        shapeSuccessMeterLeft.height = totalHeight * (timeInZone / 119);
        if(shapeSuccessMeterLeft.height >= totalHeight){
          resetShapeSuccessMeter(x);
          success();
        }
    }

    else if(x >= tapZone1 && x < tapZone2){
        shapeSuccessMeterMiddle.height = totalHeight * (timeInZone / 119);
        if(shapeSuccessMeterMiddle.height >= totalHeight){
          resetShapeSuccessMeter(x);
          success();
        }
    }

    else if(x >= tapZone2){
        shapeSuccessMeterRight.height = totalHeight * (timeInZone / 119);
        if(shapeSuccessMeterRight.height >= totalHeight){
          resetShapeSuccessMeter(x);
          success();
        }
    }
  }
}

/*Self correcting font size function
*/
function fixFontSize(texts){
  //start at 1 to skip the background, that is not text
  for(var i = 1; i < texts.length; i++){
    if(texts[i].width > window.innerWidth){
      texts[i].fontSize -= 2;
      texts[i].x = game.world.centerX - (texts[i].width / 2);
    }
  }
}

/*Sets every sprite and aspect of the game to its inital setup
*/
function restartGame(){
  removeAllShapes();
  shapeSuccessMeterLeft.height = 0;
  shapeSuccessMeterMiddle.height = 0;
  shapeSuccessMeterRight.height = 0;
  levelBar.width = 0;
  textScore.setText('X    X    X');
  level = 1;
  textLevel.setText('Level: ' + level);
  textScore.x = game.world.centerX - (textScore.width/2);
  textLevel.x = game.world.centerX - (textLevel.width/2);
  gameIsOver = false;
  gameHasBegun = false;
  openMenu();
  menuOpen = true;
}
