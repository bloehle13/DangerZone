/* Made by Brandon Loehle
*  brandon.loehle@quinnipiac.edu
*/
var menuItems = [];
var resetTutorial;

/*Loads the menu
*/
function openMenu(){
  addToArray(menuItems, game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'blackBackground'));

  addToArray(menuItems, game.add.bitmapText(0, game.world.centerY - 100, 'titleFont', 'Danger Zone', 30));
  menuItems[1].x = game.world.centerX - (menuItems[1].width / 2);

  addToArray(menuItems, game.add.bitmapText(0, game.world.centerY, 'font', 'Tap to Play', 25));
  menuItems[2].x = game.world.centerX - (menuItems[2].width / 2);

  addToArray(menuItems, game.add.bitmapText(0, window.innerHeight, 'font', 'Highscore: ' + getHighscore(), 20));
  menuItems[3].x = game.world.centerX - (menuItems[3].width / 2);
  menuItems[3].y = window.innerHeight - menuItems[3].height * 3;

  addToArray(menuItems, game.add.bitmapText(0, window.innerHeight, 'font', 'Game by Brandon Loehle (C)2017', 15));
  menuItems[4].x = game.world.centerX - (menuItems[4].width / 2);
  menuItems[4].y = window.innerHeight - menuItems[4].height;

  //reset tutorial
  addToArray(menuItems, game.add.sprite(0, 0, 'button'));
  menuItems[5].width = 200;
  menuItems[5].height = 75;
  menuItems[5].x = game.world.centerX - (menuItems[5].width / 2);
  menuItems[5].inputEnabled = true;
  menuItems[5].events.onInputDown.add(listener, this);
}

/*For reset tutorial button
*/
function listener(){
  resetTutorial();
  console.log(isTutorialDone());
  alert('Tutorial reset');
}

/*Flash "Tap to Play"
*/
var timer = 0;
function flash(text){
    timer += game.time.elapsed;
    if ( timer >= 750 ){
      timer = 0;
      text.visible = !text.visible;
    }
}

/*Scroll the menu background
*/
function scrollMenuBackground(){
  menuItems[0].tilePosition.y += Math.log10(75 * level);
}

/*Removes menu elements
*/
function clearMenu(){
  for(var i = 0; i < menuItems.length; i++){

    //stop from rendering
    menuItems[i].destroy();
    menuItems[i] = null;

    //remove from array
    menuItems.splice(i, 1);

    //must decrement i to avoid skipping elements in array
    i--;

    menuOpen = false;
  }
}

/*Used by this script and gameOver.js
*/
function addToArray(array, sprite){
  array[array.length] = sprite;
}
