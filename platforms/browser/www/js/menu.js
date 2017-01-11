/* Made by Brandon Loehle
*  brandon.loehle@quinnipiac.edu
*/
var menuItems = [];

/*Loads the menu
*/
function openMenu(){
  addToArray(menuItems, game.add.sprite(0, 0, 'blackBackground'));
  menuItems[0].width = window.innerWidth;
  menuItems[0].height = window.innerHeight;

  addToArray(menuItems, game.add.text(game.world.centerX, game.world.centerY - 100, 'Danger Zone', {
    font: "50px Impact",
    fill: "#ffffff"
  }));
  menuItems[1].x = game.world.centerX - (menuItems[1].width / 2);

  addToArray(menuItems, game.add.text(game.world.centerX, game.world.centerY, 'Tap to Play', {
    font: "25px Impact",
    fill: "#ffffff"
  }));
  menuItems[2].x = game.world.centerX - (menuItems[2].width / 2);
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
