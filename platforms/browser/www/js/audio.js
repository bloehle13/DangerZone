/* Made by Brandon Loehle
*  brandon.loehle@quinnipiac.edu
*/
var backgroundMusic;
var successSound;
var failSound;
var gameOverSound;

/*Load in music
*/
function loadMusic(){
  backgroundMusic = game.add.audio('music');
  successSound = game.add.audio('success');
  failSound = game.add.audio('fail');
  gameOverSound = game.add.audio('gameOver');

  //some sound clips are too loud, lower them
  gameOverSound.volume = 0.5;
  backgroundMusic.volume = 0.25;

  backgroundMusic.play();
  backgroundMusic.loop = true;
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
    case 'gameOver':
      gameOverSound.play();
      break;
    default:
      break;
  }
}
