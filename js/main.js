$(document).ready(function() {
  console.log('let the hacking begin');
  enchant();

  var pepeGame = new PepeGame(640, 480, ['assets/pinguino.png']);

  pepeGame.gameObj.preload('assets/pinguino.png');
  pepeGame.startGame();
});
