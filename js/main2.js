enchant();
var game = new Game(640, 320);

game.preload(
    'assets/apple.png',
    'assets/bright-roof.png',
    'assets/bright-roof-2.png',
    'assets/bright-background.png',
    'assets/map-bright.png',
    'assets/player.gif',
    'cara.png',
    'assets/guinea-pig.png',
    'assets/powerups/bright/cherry-sprite.png',
    'assets/menu/start.png',
    'assets/menu/help.png',
    'assets/menu/exit.png',
    'assets/health-sprite.png',
    'bee.png',
    'honeycomb.png'
);

game.fps = 15;

/*************************************************Stage 1****************************************************/
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
  var stage = new Group();
  map = new Map(32, 32);

  game.map = map;
  game.stage = stage;

  map.image = game.assets['assets/map-bright.png'];
  map.loadData(mapaLevel1);

  player.x = 30;
  player.y = 0;

  player.resetPlayer();

  stage.addChild(map);
  stage.addChild(player);

    stage.addChild(new Enemy(32 * 30, 39, 16 , 'cara', 3, 1, true));
        stage.addChild(new Enemy(32 * 18, 39, 16 , 'cara', 3, 1, true));
        stage.addChild(new Enemy(32 * 17, 39, 16 , 'cara', 3, 1, true));
        stage.addChild(new Enemy(32 * 79, 32 * 7, 16 , 'cara', 3, 1, true));

        stage.addChild(new Enemy(32 * 96, 32 * 6, 16 , 'cara', 3, 1, true));
        stage.addChild(new Enemy(32 * 94, 32 * 6, 16 , 'cara', 3, 1, true));
        stage.addChild(new Enemy(32 * 43, 32 * 8, 16 , 'cara', 5, 1, true));
        stage.addChild(new Enemy(32 * 40, 32 * 8, 16 , 'cara', 3, 1, true));


        stage.addChild(new Enemy(32 * 57, 32 * 8, 16 , 'bee', 5, 0, true));
        stage.addChild(new Enemy(32 * 70, 32 * 8, 16 , 'bee', 3, 0, true));
        stage.addChild(new Enemy(32 * 60, 32 * 8, 16 , 'bee', 8, 0, true));
        stage.addChild(new Enemy(32 * 65, 32 * 8, 16 , 'bee', 7, 0, true));
        stage.addChild(new Enemy(32 * 60, 32 * 8, 16 , 'bee', 8, 0, true));
        stage.addChild(new Enemy(32 * 65, 32 * 8, 16 , 'bee', 10, 0, true));
        stage.addChild(new Enemy(32 * 61, 32 * 8, 32 , 'honeycomb', 0, 0, false));
  return stage;
}
/***********************************************************************************************************/

var DIR_LEFT = 0;
var DIR_RIGHT = 1;
var DIR_UP = 2;
var DIR_DOWN = 3;
/******/
var gameOver = false;
var falling = true;
var player;
var level = 1;
var Enemy = Class.create(Sprite, {
    initialize:  function(x, y, size, type, velocityX, velocityY, evil){
        Sprite.call(this, size, size); // Modificar por tamaño real de sprit

        this.size = size;
        this.evil = evil;
        this.image = game.assets[type + '.png']; // Crear la imagen y adicionarlo a los preload
        this.x = x;
        this.y = y;
        this.xx = velocityX;//Velocidad en x
        this.yy = velocityY;
        this.frame = [40,40,41,41];
        this.dir = 0; // direction 0: right 1: left
        //stage.addChild(this);
        
    },
    onenterframe: function(){
        if(this.dir == RIGHT && map.hitTest(this.x + this.size, this.y)){
            this.xx = -this.xx;
            this.dir = LEFT;
            this.frame= [42,42,43,43];
        }else if(this.dir == LEFT && map.hitTest(this.x, this.y)){
            this.xx = -this.xx;
            this.dir = RIGHT;
            this.frame = [40,40,41,41];
        }
        if(!map.hitTest(this.x, this.y + this.size) && !map.hitTest(this.x + this.size, this.y + this.size))
            this.y += this.yy;
        
        this.x += this.xx;


        if(this.evil && this.within(player) && ( this.x % 5 == 0 || this.x % 7 == 0) ){
            player.opacity = 0.5;
            player.damaged = true;
        } else {
            if(!player.damaged) {
                player.opacity = 1;
            } else {
                player.damaged = false;
            }
        }
    }
});

/******/
var RIGHT = 0;
var LEFT = 1;

// -----------------------------------------------------------------------------

window.onload = function() {
    game.onload = function() {
        self = this;
        // Load the background
        var bg = new Sprite(640, 320);
        bg.image = game.assets['assets/bright-background.png'];

        var leafs = new Sprite(640, 96);
        leafs.image = game.assets['assets/bright-roof.png'];

        var leafs2 = new Sprite(640, 96);
        leafs2.image = game.assets['assets/bright-roof-2.png'];

        game.rootScene.addChild(bg);
        game.rootScene.addChild(leafs2);
        game.rootScene.addChild(leafs);

        player = new Player(30, 0);
       
        var stage = getFirstLevel(game, player);


        // For moving all map on the enter_frame event
        this.stage = stage;
        var menuScene = Scene();

        game.stage = stage;
        menuScene.addChild(menuMaker("assets/menu/start.png", 100));
        menuScene.addChild(menuMaker("assets/menu/help.png", 155,function(){
            alert("ayuda");
        }));
        menuScene.addChild(menuMaker("assets/menu/exit.png", 210));
        game.pushScene(menuScene);


        var life = Label();
        stage.addChild(map);
        stage.addChild(player);  
        stage.finalPosition = 3100;
        game.currentStage = stage;

        game.rootScene.addChild(stage);
        game.rootScene.setInterval(500, function(){
            //player.life -= 10;
            life.text = player.life;
            life.color = '#000';
            life.font = "8px cursive";
            life.x = 50;
            life.y = 50;
            stage.addChild(life);
        });

	// Cherries in the first map.
	var V = [40, 500, 600, 1000];
	for(var i=0; i<=V.length; i++) {
            stage.addChild(new Fruit({
		image: game.assets['assets/powerups/bright/cherry-sprite.png'],
		player: player,
		map: self.map,
		width: 16,
		height: 16,
		x: V[i],
		y: 150,
		val: 50,
		stage: stage,
		game: game
            }));
	}
	
	// Health Bar
        var healthbar = new HealthBar({
            x : 50,
            y : 0,
            stage  : stage,
            player  : player
        });

        game.rootScene.addEventListener(Event.ENTER_FRAME, (function(e) {
            // Realiza el scroll del background

            var x = Math.min((game.width - 16) / 2 - player.x, 0);
            var y = Math.min((game.height - 16) / 2 - player.y, 0);
            x = Math.max(game.width, x + this.map.width) - this.map.width;
            y = Math.max(game.height, y + this.map.height) - this.map.height;
            this.stage.x = x;
            this.stage.y = y;
        }).bind(this));

        // Animation for leafs(background)
        leafs.tl.fadeOut(70).fadeIn(70).loop();
  };
  game.start();
};
