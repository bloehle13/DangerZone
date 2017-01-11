/* Made by Brandon Loehle
*  brandon.loehle@quinnipiac.edu
*/

var shapes = [];
var shapeNames = ['rectRed', 'rectBlue', 'rectGreen', 'rectYellow', 'rectPurple', 'rectTeal', 'rectOrange'];
var xLocations = [0, window.innerWidth / 2 - 25, window.innerWidth-50];

//divide the width of device into three tapable zones
var tapZone1 = window.innerWidth * (1/3);
var tapZone2 = window.innerWidth * (2/3);

/*Spawns in the starting blocks to ensure all three don't spawn at once
*/
function initalSpawn(){
    game.time.events.add(Phaser.Timer.SECOND * 0.5, generateShape, this);
    game.time.events.add(Phaser.Timer.SECOND * 4.5, generateShape, this);
    game.time.events.add(Phaser.Timer.SECOND * 8.5, generateShape, this);
    game.time.events.add(Phaser.Timer.SECOND * 9, startGame, this);
}

/*Generates a shape with a speed and tap rate, stores it in global array shapes
*/
function generateShape(){
  //can only handle 3 shapes, per game rules
  if(shapes.length < 3){
    var index = Math.random() * xLocations.length;
    var xCoords = xLocations[Math.floor(index)];

    //this x coordinate is taken, remove it
    xLocations.splice(index, 1);

    //randomly chose a shape name
    var shapeType = shapeNames[Math.floor(Math.random() * shapeNames.length)];
    var shape = game.add.sprite(xCoords, window.innerHeight, shapeType);

    //use alorithms for speed shape rises and distance it travels backwards when tapped
    shape.speed = Math.log10(75 * level);
    shape.tap = (Math.random() * (100 - shape.speed*12)) + (shape.speed*12);
    shape.timeInZone = 0;
    shapes.push(shape);
  }
}

/*Constantly make each shape rise by its defined speed
*/
function updateShape(){
  for(var i = 0; i < shapes.length; i++){

    //only move shapes that exist
    if(shapes[i] !== null){
        shapes[i].y -= shapes[i].speed;
    }
  }
}

/*Resets shapes to initial setup by removing them all
*/
function removeAllShapes(){
  for(var i = 0; i < shapes.length; i++){
    if(shapes[i] !== null){
      destroyShape(i);

      //must decrement to not skip over a shape
      i--;
    }
  }
}

/*Remove shape from the game
* @param index = index in array shapes
*/
function destroyShape(index){
  //stop shape from rendering
  xLocations.push(shapes[index].x);
  shapes[index].destroy();
  shapes[index] = null;

  //remove from our array of shapes
  shapes.splice(index, 1);

}


/*Moves shape by its tap, given which third of the screen was tapped
* @param tapX = x coordinate of tap event
*/
function moveShape(tapX){

  //left 1/3 of screen width
  if(tapX < tapZone1){
    for(var i = 0; i < shapes.length; i++){

      //find the correct shape that lies in this boundary, if it exists
      if(shapes[i].x < tapZone1){
          shapes[i].y += shapes[i].tap;
      }
    }
  }

  //middle 1/3 of screen width
  if(tapX >= tapZone1 && game.input.x < tapZone2){
    for(var i = 0; i < shapes.length; i++){

      //find the correct shape that lies in this boundary, if it exists
      if(shapes[i].x >= tapZone1 && shapes[i].x < tapZone2){
          shapes[i].y += shapes[i].tap;
      }
    }
  }

  //right 1/3 of screen width
  if(tapX >= tapZone2){
    for(var i = 0; i < shapes.length; i++){

      //find the correct shape that lies in this boundary, if it exists
      if(shapes[i].x >= tapZone2){
          shapes[i].y += shapes[i].tap;
      }
    }
  }
}
