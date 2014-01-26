var map;
var mapaLevel2 = [
[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
[ 8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 8],
[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
[ 0, 0, 1, 0, 0, 1, 0, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,+1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 8, 8,-1,-1, 8, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
[ 8, 8, 8, 8, 8, 8, 8, 4,-1,-1, 0, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,+1,-1,-1,-1, 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1,-1,-1,-1,-1,-1, 8,-1,-1,-1,-1, 8, 4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
[ 8, 8, 8, 8, 8, 8, 8, 8,-1,-1, 8, 8, 8, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2, 8,-1,-1,-1,+1,-1,-1,-1,-1,-1,-1,-1, 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2, 8,-1,-1, 1,-1,-1,-1,-1,-1,-1,-1, 8,17, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2, 1, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2, 1, 1, 0, 1],
[ 8, 8, 8, 8, 8, 8, 8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2, 8,-1,-1,-1,-1,-1,-1,-1, 2, 8, 8, 8,-1,+1,+1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2, 1, 1, 1, 0, 0, 1, 0, 1, 8, 8, 8, 8, 8, 1, 0,-1,-1,-1,-1, 8, 8, 8,17, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2, 0, 1, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2, 8, 8, 4,-1,18,17,-1,-1,18,17,-1,-1,18,17,-1,-1,18,17,-1,-1,18,17,-1, 2, 1, 8, 8, 8, 8, 8],
[ 8, 8, 8, 8, 8, 8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2, 1, 1, 1, 1, 1, 1, 1, 3,-1,-1,-1, 2, 8, 8, 3,-1,-1,-1,-1, 2, 2, 8, 8, 8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2,18, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,-1, 8,-1,-1, 8, 8, 8, 8, 8, 8, 8, 8, 8, 4,-1,-1,-1,-1,-1,-1, 2, 1, 1, 8, 8, 8,17, 1, 0, 1, 1, 1,-1, 0, 1, 1, 0, 0,-1, 8, 8, 8,-1,-1,-1,-1,-1,-1, 2, 1, 8, 8, 8, 4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 5, 8, 8, 8, 8, 8, 8],
[12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12, 9, 5, 8, 8, 8, 8, 8, 8, 8, 4,13,12,12, 5, 8, 8, 5, 8, 1, 1, 1, 4, 8, 8, 8,10,10,12,12,12,12,12,12,12,12,12,12,12,12,12, 9, 5, 8,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16, 8, 8, 8, 8, 8, 8, 8, 8,-1,-1,-1, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 4,13,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10, 9, 5, 8, 8, 8, 8, 8, 8]
];

var mapaLevel3 = [
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,18, 7, 7, 7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2, 7, 5, 7, 7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 7,-1,-1,-1,-1,-4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [ 1, 7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,18,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2, 7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [ 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2, 7,-1,-1,-1,-1,-1,-1,-1,-1,-1, 4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2, 7, 7,-1,-1,-1,-1, 2, 7, 7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 7, 7,-1,-1,-1,-1,-1,-1, 7, 3,-1,-1,-1, 7, 7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [ 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2, 5, 7,-1,-1,-1,-1,-1,-1,-1,-1, 7, 7, 7, 7, 7,17, 7, 7, 7, 3,-1,-1,-1, 7, 7, 1, 7, 7, 0, 1, 1,-1, 1, 7, 1, 7, 5, 7, 7,18,-1, 2, 3,-1,-1,-1, 2, 7, 7, 5, 7, 7, 7, 5, 7, 7,-1,-1,-1, 7, 7, 7,-1, 7, 2, 6,-1, 7,-1,-1,-1,-1, 7, 7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 7,-1,-1,-1,-1,-1,-1,-1,-1, 7,-1,-1,-1,-1,-1,-1,-1, 7,-1,-1,-1,-1,-1, 7,-1,-1,-1,-1,-1, 7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [ 3, 0, 8, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2, 7, 7, 0,-1,-1,-1,-1,-1,-1,-1, 7, 7, 1, 0, 0, 0, 7, 5, 7, 5, 7,-1,-1,-1, 0, 7, 7, 7,-1,-1,-1,-1,-1,-1,-1,-1, 7, 7, 7, 0,-1,-1,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 7, 7, 7, 7, 7,-1,-1,-1,-1,-1,-1,-1, 7,-1,-1,-1,-1,-1, 7, 7, 7, 7, 4, 7, 7, 7,-1,-1, 7,-1,-1, 7,-1,-1, 4,-1,-1, 7,-1,-1, 7,-1,-1, 7,-1,-1,18,-1,-1, 2, 7, 7, 7, 7, 7, 7],
    [ 0, 4, 7, 7, 1, 7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2, 7, 7, 7, 0,-1,-1,-1,-1,-1,-1, 1, 7, 7, 7, 7,-1,-1, 7,-1,-1, 7, 5,-1,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 7, 1, 7, 5, 7, 2, 7, 2,-1,-1,-1, 7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 7,-1,-1, 7,-1,-1, 7,-1,-1, 7,-1,-1, 0,-1,-1, 0,-1,-1,18,-1,-1, 7,-1, 7, 7, 7, 7, 7, 7, 7, 7],
    [ 5, 7, 1, 7,18, 7, 7, 6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2, 5, 7, 5, 7, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 7, 5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2, 7, 5, 5, 7, 7,-1,-1,-1,-1,-1,-1, 1, 7, 7, 7, 0, 7, 7, 7, 7,-1, 7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 7,-1,-1, 7,-1,-1, 7,-1,-1, 7,-1,-1, 0,-1,-1, 1,-1,-1, 7,-1,-1, 7, 7, 7, 7, 7, 7, 6, 7, 7, 7],
    [ 0, 7, 7, 7, 7, 7,17, 6, 6, 7, 0, 0, 7,18, 7, 7,-1,-1, 2, 7, 7, 7, 7, 7, 7, 5,-1,-1, 7, 7, 7, 7, 5, 7, 7, 7, 7, 5, 7, 7, 7, 7, 5, 7,-1,-1, 7, 7, 7, 5, 7, 7, 7,17, 7, 7, 7, 5, 7, 7, 5, 7, 7,17, 7, 7, 7, 7, 7,-1,-1,-1,-1,-1,-1,-1,-1, 7, 7, 5, 7, 7, 5, 7, 7, 5, 7, 6, 7, 7, 7, 3, 7, 7, 1, 7, 7, 7, 7, 6, 7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 7, 7, 7, 7, 7, 4, 7, 7, 7, 4, 7, 7, 7, 7, 7,18, 7, 7, 5, 7, 7, 6, 7, 7, 6, 7, 7, 7, 6, 7, 7]
];


function getSecondLevel(game, player) {
  var stage = new Group();
  map = new Map(32, 32);

  game.map = map;
  game.stage = stage;
  game.currentLevel = 2;

  map.image = game.assets['assets/map-bright.png'];
  map.loadData(mapaLevel2);

  player.x = 64;
  player.y = 0;

  player.resetPlayer();

  stage.finalPosition = 4700;
  stage.addChild(map);
  stage.addChild(player);


  stage.addChild(new Enemy(32 * 30, 39, 16 , 'worm', 3, 1, true));

  stage.addChild(new Enemy(32 * 13, 32 * 8, 16 , 'fish', 0, 0, false));
  stage.addChild(new Enemy(32 * 14, 32 * 8, 16 , 'fish', 0, 0, false));
  stage.addChild(new Enemy(32 * 15, 32 * 8, 16 , 'fish', 0, 0, false));
  stage.addChild(new Enemy(32 * 12, 32 * 8, 16 , 'fish', 0, 0, false));

 // stage.addChild(new Enemy(32 * 25, 32 * 8, 16 , 'fish', 0, 0, false));
//  stage.addChild(new Enemy(32 * 27, 32 * 8, 16 , 'fish', 0, 0, false));
  stage.addChild(new Enemy(32 * 26, 32 * 8, 32 , 'worm', 3, 1, true));
  stage.addChild(new Enemy(32 * 28, 32 * 8, 32 , 'worm', 4, 1, true));
  stage.addChild(new Enemy(32 * 33, 32 * 8, 32 , 'worm', 3, 1, true));
  stage.addChild(new Enemy(32 * 34, 32 * 8, 32 , 'worm', 4, 1, true));
  stage.addChild(new Enemy(32 * 70, 32 * 6, 32 , 'worm', 4, 1, true));
  stage.addChild(new Enemy(32 * 71, 32 * 6, 32 , 'worm', 4, 1, true));
  stage.addChild(new Enemy(32 * 76, 32 * 7, 32 , 'worm', 4, 1, true));
  stage.addChild(new Enemy(32 * 95, 32 * 7, 32 , 'worm', 4, 1, true));

  stage.addChild(new Enemy(32 * 49, 32 * 6, 32 , 'honeycomb', 0, 0, true));
  stage.addChild(new Enemy(32 * 47, 32 * 6, 16 , 'bee', 5, 0, true));
  stage.addChild(new Enemy(32 * 50, 32 * 6, 16 , 'bee', 5, 0, true));
  stage.addChild(new Enemy(32 * 58, 32 * 6, 32 , 'worm', 1, 1, true));

  stage.addChild(new Enemy(32 * 96, 32 * 7, 32 , 'worm', 1, 1, true));
  stage.addChild(new Enemy(32 * 98, 32 * 7, 32 , 'worm', 1, 1, true));

    // Cherries.
    var cherries = [
	{x: 32, y: 45},
	{x: 64, y: 45},
	{x: 96, y: 45},
	{x: 27*(32), y: 5*(32)},
	{x: 45*(32), y: 6*(32)},
	{x: 54*(32), y: 1*(32)},
	{x: 54*(32), y: 5*(32)},
	{x: 78*(32), y: 6*(32)},
	{x: 128.6*(32), y: 6*(32)},
	{x: 132.6*(32), y: 6*(32)},
	{x: 136.6*(32), y: 6*(32)}
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
	    val: 1,
	    stage: stage,
	    game: game
        }));
    }

  window.healthbar = new HealthBar({
            stage  : stage,
        });

  return stage;
}
function getThirdLevel(game, player) {
  var stage = new Group();
  map = new Map(32, 32);

  if (game.clearBackground) { game.clearBackground(); }

  var bg = new Sprite(3280, 480);
  bg.image = game.assets['assets/story-scenes/010-redisbad.png'];

  var leafs = new Sprite(640, 96);
  leafs.image = game.assets['assets/bright-roof.png'];

  var leafs2 = new Sprite(640, 96);
  leafs2.image = game.assets['assets/bright-roof-2.png'];

  game.rootScene.addChild(bg);

  game.bg = bg;
  game.leafs = leafs;
  game.leafs2 = leafs2;

  game.map = map;
  game.stage = stage;
  game.currentLevel = 3;

  map.image = game.assets['assets/map-noir.png'];
  map.loadData(mapaLevel3);

  player.x = 64;
  player.y = 0;

  player.resetPlayer();

  stage.finalPosition = 4700;
  stage.addChild(map);
  stage.addChild(player);

  leafs.tl.fadeOut(70).fadeIn(70).loop();

  window.healthbar = new HealthBar({
    stage  : stage,
  });

  return stage;
}
