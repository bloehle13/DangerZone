/* Made by Brandon Loehle
*  brandon.loehle@quinnipiac.edu
*/

/*Main logic function. Handles scoring, removal of shapes, and UI indicators
*/
function checkInZone(){
  for(var i = 0; i < shapes.length; i++){
    var rect = shapes[i];

    //increase scoring, shape is inside danger zone
    if(rect.top >= dangerZone.top && rect.bottom <= dangerZone.bottom){
      levelbar.width += 3;
      rect.timeInZone++;
      updateShapeSuccessMeter(rect.x, rect.timeInZone);

      //if the shape has been inside danger zone for 2 seconds
      if(rect.timeInZone >= 120){
        destroyShape(i);
        levelbar.width += (window.innerWidth / 4);
      }

      //if the width of the progress bar exceeds the width of the device
      if(resetBar() > 0){

        //set bar to extra width exceeding window
        levelbar.width = resetBar();
        level++
        textLevel.setText("Level: " + level);
        textLevel.x = game.world.centerX - (textLevel.width / 2);
      }
      score++;
    }

    //if shape exceeds danger zone, get rid of it & lose a life
    else if(rect.bottom < dangerZone.top){
      resetShapeSuccessMeter(shapes[i].x);
      destroyShape(i);
      madeMistake();
    }

    //if entire shape is past danger zone in direction of travel, decrease score
    else if(rect.top > dangerZone.bottom){
      if(shapes[i].timeInZone > 0){
        shapes[i].timeInZone--;
        updateShapeSuccessMeter(shapes[i].x, shapes[i].timeInZone);
      }
    }
  }
}
