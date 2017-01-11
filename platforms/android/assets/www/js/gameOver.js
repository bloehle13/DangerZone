/* Made by Brandon Loehle
*  brandon.loehle@quinnipiac.edu
*/
var gameOverItems = [];

/*Loads the game over screen
*/
function gameOver(){
  addToArray(gameOverItems, game.add.sprite(0, 0, 'blackBackground'));
  gameOverItems[0].width = window.innerWidth;
  gameOverItems[0].height = window.innerHeight;

  addToArray(gameOverItems, game.add.text(game.world.centerX, game.world.centerY - 100, 'Game Over', {
    font: "50px Impact",
    fill: "#ff0000"
  }));
  gameOverItems[1].x = game.world.centerX - (gameOverItems[1].width / 2);

  addToArray(gameOverItems, game.add.text(game.world.centerX, game.world.centerY, 'Level: ' + level, {
    font: "25px Impact",
    fill: "#ffffff"
  }));
  gameOverItems[2].x = game.world.centerX - (gameOverItems[2].width / 2);
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
