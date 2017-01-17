/* Made by Brandon Loehle
*  brandon.loehle@quinnipiac.edu
*/
var backgroundMusic;
var successSound;
var failSound;

/*Load in music
*/
function loadMusic(){
  backgroundMusic = game.add.audio('music');
  successSound = game.add.audio('success');
  failSound = game.add.audio('fail');

  //some sound clips are too loud, lower them
  failSound.volume = 0.9;
  backgroundMusic.volume = 0.8;

  backgroundMusic.loop = true;
  backgroundMusic.play();
}

/*Decides which sound effect to play
*/
function playSound(sound){
  switch(sound){
    case 'success':
      successSound.play();
      break;
    case 'fail':
      failSound.play();
      break;
    default:
      break;
  }
}
