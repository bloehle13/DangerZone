/* Made by Brandon Loehle
*  brandon.loehle@quinnipiac.edu
*/

var storage = window.localStorage;
var spawn = false;
var greenBar = true;
var whiteBar = true;
var fail = true;
var below = true;
var tutorialTap = false;
var tutorialDone = false;

/*Resets tutorial back to how it started
*/
function finishedTutorial(){
  storage.setItem('tutorialDone', 'true');
  tutorialTap = false;
  tutorialDone = false;
  textTutorial.y = game.world.centerY + 200;
  spawn = false;
  timer = 420;
  restartGame();

  //necessary to remove another 0 coordinate existing, caused by our code adding the tutorial shape x into the real game coordinates
  xLocations.splice(3, 1);

  menuOpen = true;
  textTutorial.setText(' ');
}

/*The following are helper fuctions to help the main function, tutorial(), run in sequential order
*/
function isTutorialDone(){
  return storage.getItem('tutorialDone') === 'true';
}

function resetTutorial(){
  storage.setItem('tutorialDone', 'false');
}

function hasSpawned(){
  spawn = true;
  timer = 420;
}

function hasGreenBar(){
  greenBar = true;
  shapes[0].timeInZone++;
  timer = 420;
}

function hasWhiteBar(){
  whiteBar = true;
  tutorialDone = true;
  timer = 200;
}

function hasFail(){
  fail = true;
  shapes[0].y = window.innerHeight - 150;
  below = false;
  timer = 420;
}

function hasBelow(){
  below = true;
  tapTutorial = false;
  whiteBar = false;
  timer = 420;
}

/*A sequential tutorial that runs off of timers
* Variables are strictly for helping the function run in the right order
*/
function tutorial(){
  if(!spawn){
    timer--;
    shapes[0] = game.add.sprite(0, window.innerHeight, 'rectGreen');
    shapes[0].speed = 2;
    shapes[0].tap = 50;
    shapes[0].timeInZone = 0;
    textTutorial.setText('Tap anywhere on the\nthird of the screen\nthe block is in to\nmove the block down.');
    textTutorial.x = game.world.centerX - (textTutorial.width/2);
    if(timer <= 0){
      hasSpawned();
    }
  }
  else if(shapes[0].timeInZone === 10){
    timer--;
    greenBar = false;
    tutorialTap = true;
    textTutorial.setText('A green bar below the\nshape will begin to\nfill once the shape\nis in the danger zone.');
    textTutorial.x = game.world.centerX - (textTutorial.width/2);
    if(timer <= 0){
      hasGreenBar();
    }
  }
  else if(shapes[0].bottom <= dangerZone.top + 3){
    timer--;
    fail = false;
    textTutorial.setText('If the shape completely\nrises above the\nDanger Zone\nyou will lose one of\nyour three lives.');
    textTutorial.x = game.world.centerX - (textTutorial.width/2);
    if(timer <= 0){
      hasFail();
    }
  }
  else if(!below){
    timer--;
    textTutorial.setText('If the shape completely\nfalls below the\nDanger Zone\nits green bar will\ndecrease in size.');
    textTutorial.x = game.world.centerX - (textTutorial.width/2);
    textTutorial.y = dangerZone.top - (dangerZone.height / 2);
    if(shapeSuccessMeterLeft.height > 0){
      shapeSuccessMeterLeft.height--;
    }
    if(timer <= 0){
      hasBelow();
    }
  }
  else if(!whiteBar){
    timer--;
    textTutorial.y = levelBar.bottom + 15;
    levelBar.width = 100;
    textTutorial.setText('Fill the green bar\nto register the shape\nand score! Doing so\nwill increase this\nwhite level bar.');
    textTutorial.x = game.world.centerX - (textTutorial.width/2);
    if(timer <= 0){
      hasWhiteBar();
    }
  }
  else if(tutorialDone){
    timer--;
    textTutorial.setText('That is it!\nReturning to\nthe main menu...');
    textTutorial.x = game.world.centerX - (textTutorial.width/2);
    if(timer <= 0){
      finishedTutorial();
    }
  }
  else if(spawn && greenBar && whiteBar && fail && below){
    textTutorial.setText(' ');
    updateShape();
    checkInZone();
  }
}
