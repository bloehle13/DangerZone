/* Made by Brandon Loehle
*  brandon.loehle@quinnipiac.edu
*/

/*Flashes red around the danger zone
*/
function madeMistake(){

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
  else{}

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
    return levelbar.width - window.innerWidth;
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
