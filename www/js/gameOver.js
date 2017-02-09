/* Made by Brandon Loehle
*  brandon.loehle@quinnipiac.edu
*/
var gameOverItems = [];
var adReady = false;

/*Loads the game over screen
*/
function gameOver(){
  setHighscore();

  addToArray(gameOverItems, game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'blackBackground'));

  addToArray(gameOverItems, game.add.bitmapText(game.world.centerX, game.world.centerY - 100, 'redFont', 'Game Over', 40));
  gameOverItems[1].x = game.world.centerX - (gameOverItems[1].width / 2);

  addToArray(gameOverItems, game.add.bitmapText(game.world.centerX, game.world.centerY, 'font', 'Level: ' + level, 35));
  gameOverItems[2].x = game.world.centerX - (gameOverItems[2].width / 2);

  addToArray(gameOverItems, game.add.bitmapText(game.world.centerX, game.world.centerY + 100, 'font', 'Press and Hold to Play Again', 16));
  gameOverItems[3].x = game.world.centerX - (gameOverItems[3].width / 2);

  if(adReady){
    showAd();
    adReady = false;
  }
  else{
    prepareAd();
    adReady = true;
  }
}

function scrollGameOverBackground(){
  gameOverItems[0].tilePosition.y += Math.log10(75 * level);
}

/*Removes menu elements
*/
function clearGameOver(){
  for(var i = 0; i < gameOverItems.length; i++){

    //stop from rendering
    gameOverItems[i].destroy();
    gameOverItems[i] = null;

    //remove from array
    gameOverItems.splice(i, 1);

    //must decrement i to avoid skipping elements in array
    i--;

  }
}
