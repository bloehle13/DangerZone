/* Made by Brandon Loehle
*  brandon.loehle@quinnipiac.edu
*/
var storage = window.localStorage;

function getHighscore(){
  if(checkHighscore()){
    return 0;
  }
  else{
    return storage.getItem('highscore');
  }
}

function setHighscore(){
  if(level > getHighscore()){
    storage.setItem('highscore', level);
  }
}

function checkHighscore(){
  return storage.getItem('highscore') === null;
}
