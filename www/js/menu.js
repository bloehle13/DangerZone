/* Made by Brandon Loehle
*  brandon.loehle@quinnipiac.edu
*/
var menuItems = [];

/*Loads the menu
*/
function openMenu(){
  addToArray(menuItems, game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'blackBackground'));

  addToArray(menuItems, game.add.bitmapText(0, game.world.centerY - 100, 'titleFont', 'Danger Zone', 30));
  menuItems[1].x = game.world.centerX - (menuItems[1].width / 2);

  addToArray(menuItems, game.add.bitmapText(0, game.world.centerY, 'font', 'Tap to Play', 25));
  menuItems[2].x = game.world.centerX - (menuItems[2].width / 2);
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

  }
}

/*Used by this script and gameOver.js
*/
function addToArray(array, sprite){
  array[array.length] = sprite;
}
