var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var shapes = [];
var shapeNames = ['rectRed', 'rectBlue', 'rectGreen', 'rectYellow', 'rectPurple', 'rectTeal', 'rectOrange'];
var xLocations = [0, window.innerWidth / 2 - 25, window.innerWidth-50];
var locY = window.innerHeight;
var dangerZoner;
var progressBar;
var textScore;
var score;
var tapZone1;
var tapZone2;//these two tap zones divide the phone into three areas
var timerBarBlue;
var timerBarRed;
var timerBarGreen;
var level;
var textLevel;
var gameHasBegun;
var successMeterLeft;
var successMeterMiddle;
var successMeterRight;

function preload() {
  game.load.image('rectRed', 'assets/rectRed.png');
  game.load.image('rectBlue', 'assets/rectBlue.png');
  game.load.image('rectGreen', 'assets/rectGreen.png');
  game.load.image('rectYellow', 'assets/rectYellow.png');
  game.load.image('rectPurple', 'assets/rectPurple.png');
  game.load.image('rectTeal', 'assets/rectTeal.png');
  game.load.image('rectOrange', 'assets/rectOrange.png');
  game.load.image('error', 'assets/error.png');
  game.load.image('success', 'assets/success.png');
  game.load.image('dangerZone', 'assets/dangerZone.png');
  game.load.image('progressBar', 'assets/progressBar.png');
  game.load.image('successMeter', 'assets/successMeter.png');
  game.input.onTap.add(onTap, this);
}

function create() {
  dangerZone = game.add.sprite(0, window.innerHeight/2-100, 'dangerZone');
  dangerZone.width = window.innerWidth;

  progressBar = game.add.sprite(0, 100, 'progressBar');
  progressBar.width = 0;

  level = 1;
  score = 0;
  tapZone1 = window.innerWidth * (1/3);
  tapZone2 = window.innerWidth * (2/3);
  gameHasBegun = false;

  successMeterLeft = game.add.sprite(0, dangerZone.bottom, 'successMeter');
  successMeterLeft.height = 0;
  successMeterLeft.width = window.innerWidth / 3;
  successMeterMiddle = game.add.sprite(tapZone1, dangerZone.bottom, 'successMeter');
  successMeterMiddle.height = 0;
  successMeterMiddle.width = window.innerWidth / 3;
  successMeterRight = game.add.sprite(tapZone2, dangerZone.bottom, 'successMeter');
  successMeterRight.height = 0;
  successMeterRight.width = window.innerWidth / 3;

  textScore = game.add.text(game.world.centerX, 0, 'X    X    X', {
      font: "50px Impact",
      fill: "#ff0044",
  });
  textScore.x = game.world.centerX - (textScore.width/2);

  textLevel = game.add.text(0, 55, "Level: " + level, {
      font: "30px Impact",
      fill: "#ffffff",
  });
  textLevel.x = game.world.centerX - (textLevel.width/2);

  game.time.advancedTiming = true;
  game.time.events.add(Phaser.Timer.SECOND * 0.5, generateShape, this);
  game.time.events.add(Phaser.Timer.SECOND * 4.5, generateShape, this);
  game.time.events.add(Phaser.Timer.SECOND * 8.5, generateShape, this);
  game.time.events.add(Phaser.Timer.SECOND * 9, startGame, this);
}

function startGame(){
  gameHasBegun = true;
}

function update() {
  moveRect();
  checkInZone();
  if(gameHasBegun){
    generateShape();
  }
}

function madeMistake(){
  //flashes image
  var mistake = game.add.sprite(0, window.innerHeight/2-100, 'error');
  mistake.width = window.innerWidth;
  game.add.tween(mistake).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);

  if (textScore.text === 'X    X    X'){
    textScore.setText('X    X');
    textScore.x = game.world.centerX - (textScore.width/2);
  }
  else if(textScore.text === 'X    X'){
    textScore.setText('X');
    textScore.x = game.world.centerX - (textScore.width/2);
  }
  else{} //END GAME

}

function checkForDestroyedShapes(){//destroy function won't remove sprite from our array, need this function for that
  for(var i = 0; i < shapes.length; i++){
    if(shapes[i] === null){
      shapes.splice(i, 1);
    }
  }
}

function destroyShape(index){
  xLocations.push(shapes[index].x);
  shapes[index].destroy();
  shapes[index] = null;
}

function checkInZone(){
  checkForDestroyedShapes();
  for(var i = 0; i < shapes.length; i++){
    var rect = shapes[i];
    if(rect.top >= dangerZone.top && rect.bottom <= dangerZone.bottom){
      progressBar.width += 3;
      rect.timeInZone++;
      updateSuccessMeter(rect.x, rect.timeInZone);
      if(rect.timeInZone >= 120){
        destroyShape(i);
        progressBar.width += (window.innerWidth / 4);
      }
      if(resetBar() > 0){//increase level and reset bar
        progressBar.width = resetBar();//set bar to extra width exceeding window
        level++
        textLevel.setText("Level: " + level);
        textLevel.x = game.world.centerX - (textLevel.width / 2);
      }
      score++;
    }//if entire shape is inside danger zone, increase score
    else if(rect.bottom < dangerZone.top){
      resetSuccessMeter(shapes[i].x);
      destroyShape(i);
      madeMistake();
    }//if entire shape is past danger zone in direction of travel, decrease score
    else if(rect.top > dangerZone.bottom){
      if(shapes[i].timeInZone > 0){
        shapes[i].timeInZone--;
        updateSuccessMeter(shapes[i].x, shapes[i].timeInZone);
      }
    }
  }
}

function generateShape(){
  if(shapes.length < 3){//can only take 3 shapes
    var index = Math.random() * xLocations.length;
    var xCoords = xLocations[Math.floor(index)];
    xLocations.splice(index, 1);//this x coordinate is taken, remove it
    var shapeType = shapeNames[Math.floor(Math.random() * shapeNames.length)];
    var shape = game.add.sprite(xCoords, locY, shapeType);
    shape.speed = Math.log10(75 * level);//algorithm for slowly increasing speed over time
    console.log(shape.speed);
    shape.tap = (Math.random() * (100 - shape.speed*12)) + (shape.speed*12);//algorithm for amount each shape drops down when tapped
    shape.timeInZone = 0;//used to determine when shape has been in zone long enough
    shapes.push(shape);//add to array of shapes
  }
}

function resetBar(){//return true if bar has filled the screen
    return progressBar.width - window.innerWidth;
}

function resetSuccessMeter(x){
  if(x < tapZone1){//only move shapes that exist
    successMeterLeft.height = 0;//reset if fills screen
  }
  else if(x >= tapZone1 && x < tapZone2){//only move shapes that exist
    successMeterMiddle.height = 0;//reset if fills screen
  }
  else if(x >= tapZone2){//only move shapes that exist
    successMeterRight.height = 0;//reset if fills screen
  }
}

function success(){
  //flashes image
  var success = game.add.sprite(0, window.innerHeight/2-100, 'success');
  success.width = window.innerWidth;
  game.add.tween(success).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
}

function updateSuccessMeter(x, timeInZone){
  var totalHeight = window.innerHeight - dangerZone.bottom;//find total space on phone for meter
  for(var i = 0; i < shapes.length; i++){
    if(x < tapZone1){//only move shapes that exist
        successMeterLeft.height = totalHeight * (timeInZone / 119);//will fill remaining space in 2 seconds, using 119, not 120, to ensure meter disappears given fps drops
        if(successMeterLeft.height >= totalHeight){
          successMeterLeft.height = 0;//reset if fills screen
          success();
        }
    }
    else if(x >= tapZone1 && x < tapZone2){//only move shapes that exist
        successMeterMiddle.height = totalHeight * (timeInZone / 119);//will fill remaining space in 2 seconds
        if(successMeterMiddle.height >= totalHeight){
          successMeterMiddle.height = 0;//reset if fills screen
          success();
        }
    }
    else if(x >= tapZone2){//only move shapes that exist
        successMeterRight.height = totalHeight * (timeInZone / 119);//will fill remaining space in 2 seconds
        if(successMeterRight.height >= totalHeight){
          successMeterRight.height = 0;//reset if fills screen
          success();
        }
    }
  }
}

function onTap() {
  if(game.input.x < tapZone1){
    for(var i = 0; i < shapes.length; i++){
      if(shapes[i].x < tapZone1){//only move shapes that exist
          shapes[i].y += shapes[i].tap;
      }
    }
  }
  if(game.input.x >= tapZone1 && game.input.x < tapZone2){
    for(var i = 0; i < shapes.length; i++){
      if(shapes[i].x >= tapZone1 && shapes[i].x < tapZone2){//only move shapes that exist
          shapes[i].y += shapes[i].tap;
      }
    }
  }
  if(game.input.x >= tapZone2){
    for(var i = 0; i < shapes.length; i++){
      if(shapes[i].x >= tapZone2){//only move shapes that exist
          shapes[i].y += shapes[i].tap;
      }
    }
  }
}

function moveRect(){
  for(var i = 0; i < shapes.length; i++){
    if(shapes[i] !== null){//only move shapes that exist
        shapes[i].y -= shapes[i].speed;
    }
  }
}
