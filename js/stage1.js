var map;
var mapaLevel1 =[
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,7,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1],
    [8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,1,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,7,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,1,1,1,1,-1,-1,-1,1,1,3],
    [8,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,1,7,1,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,-1,-1,-1,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,1,1,1,3,-1,-1,-1,-1,-1,7,7,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,8,8,3,-1,2,8,8,3,-1,-1,-1,2,1,1,1,1,1,1,1,1,1,1,1,4],
    [8,8,8,1,1,3,-1,-1,-1,-1,2,1,1,8,8,8,8,8,3,-1,-1,2,1,1,3,-1,-1,-1,-1,2,1,1,1,1,1,1,3,-1,-1,-1,-1,-1,-1,-1,2,1,1,1,1,1,1,1,1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,8,8,8,8,8,8,8,8,8,-1,-1,2,8,8,8,8,8,8,8,8,8,8,8,8,4],
    [8,8,8,8,8,8,3,-1,-1,2,1,8,8,8,8,8,8,8,4,-1,-1,5,8,8,4,-1,-1,-1,-1,5,8,8,8,8,8,8,8,8,8,13,10,11,11,2,1,1,1,1,1,1,1,1,1,1,-1,-1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,-1,-1,1,1,1,1,1,1,1,1,1,1,1,-1,-1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];
function getFirstLevel(game, player) {

  console.log('llega aqui');

  var stage = new Group();
  map = new Map(32, 32);

  game.map = map;
  game.stage = stage;

  map.image = game.assets['assets/map-bright.png'];
  map.loadData(mapaLevel1);

  player.x = 30;
  player.y = 0;

  player.resetPlayer();
  player.jumpcnt = 10;
  player.life = 6;

  stage.addChild(map);
  stage.addChild(player);
  stage.finalPosition = 3100;
  game.currentLevel = 1;


  stage.addChild(new Enemy(32 * 30, 39 * 1, 32 , 'worm', 3, 1, true));
  stage.addChild(new Enemy(32 * 18, 39 * 1, 32 , 'worm', 3, 1, true));
  stage.addChild(new Enemy(32 * 17, 39 * 1, 32 , 'worm', 3, 1, true));
  stage.addChild(new Enemy(32 * 79, 32 * 7, 32 , 'worm', 3, 1, true));

  stage.addChild(new Enemy(32 * 96, 32 * 6, 32 , 'worm', 3, 1, true));
  stage.addChild(new Enemy(32 * 94, 32 * 6, 32 , 'worm', 3, 1, true));
  stage.addChild(new Enemy(32 * 43, 32 * 8, 32 , 'worm', 5, 1, true));
  stage.addChild(new Enemy(32 * 40, 32 * 8, 32 , 'worm', 3, 1, true));


  stage.addChild(new Enemy(32 * 57, 32 * 8, 16 , 'bee', 5, 0, true));
  stage.addChild(new Enemy(32 * 70, 32 * 8, 16 , 'bee', 3, 0, true));
  stage.addChild(new Enemy(32 * 60, 32 * 8, 16 , 'bee', 8, 0, true));
  stage.addChild(new Enemy(32 * 65, 32 * 8, 16 , 'bee', 7, 0, true));
  stage.addChild(new Enemy(32 * 60, 32 * 8, 16 , 'bee', 8, 0, true));
  stage.addChild(new Enemy(32 * 65, 32 * 8, 16 , 'bee', 10, 0, true));
  stage.addChild(new Enemy(32 * 61, 32 * 8, 32 , 'honeycomb', 0, 0, true));


    // Cherries.
    var cherries = [
	{x: 32, y: 45},
	{x: 64, y: 45},
	{x: 96, y: 45},
	{x: 27*(32), y: 5*(32)},
	{x: 57*(32), y: 6*(32)},
	{x: 62.2*(32), y: 5*(32)},
	{x: 67*(32), y: 4*(32)}
    ];

    for(var i=0; i< cherries.length; i++) {
        stage.addChild(new Fruit({
	    image: game.assets['assets/powerups/bright/cherry-sprite.png'],
	    player: player,
	    map: self.map,
	    width: 16,
	    height: 16,
	    x: cherries[i].x,
	    y: cherries[i].y,
	    val: 2,
	    stage: stage,
	    game: game
        }));
    }

    stage.addChild(new Enemy(32 * 30, 39 * 1, 32 , 'worm', 3, 1, true));
    stage.addChild(new Enemy(32 * 18, 39 * 1, 32 , 'worm', 3, 1, true));
    stage.addChild(new Enemy(32 * 17, 39 * 1, 32 , 'worm', 3, 1, true));
    stage.addChild(new Enemy(32 * 79, 32 * 7, 32 , 'worm', 3, 1, true));

    stage.addChild(new Enemy(32 * 96, 32 * 6, 32 , 'worm', 3, 1, true));
    stage.addChild(new Enemy(32 * 94, 32 * 6, 32 , 'worm', 3, 1, true));
    stage.addChild(new Enemy(32 * 43, 32 * 8, 32 , 'worm', 5, 1, true));
    stage.addChild(new Enemy(32 * 40, 32 * 8, 32 , 'worm', 3, 1, true));


    stage.addChild(new Enemy(32 * 57, 32 * 8, 16 , 'bee', 5, 0, true));
    stage.addChild(new Enemy(32 * 70, 32 * 8, 16 , 'bee', 3, 0, true));
    stage.addChild(new Enemy(32 * 60, 32 * 8, 16 , 'bee', 8, 0, true));
    stage.addChild(new Enemy(32 * 65, 32 * 8, 16 , 'bee', 7, 0, true));
    stage.addChild(new Enemy(32 * 60, 32 * 8, 16 , 'bee', 8, 0, true));
    stage.addChild(new Enemy(32 * 65, 32 * 8, 16 , 'bee', 10, 0, true));
    stage.addChild(new Enemy(32 * 61, 32 * 8, 32 , 'honeycomb', 0, 0, false));

  return stage;
}
