enchant();
var game = new Game(640, 320);

game.preload(
    'assets/apple.png',
    'assets/bright-roof.png',
    'assets/bright-roof-2.png',
    'assets/bright-background.png',
    'assets/map-bright.png',
    'assets/map-noir.png',
    'assets/player.gif',
    'assets/noir-background.png',
    'assets/story-scenes/010-redisbad.png',
    'assets/story-scenes/lvl2.png',
    'assets/messages/donde.png',
    'assets/messages/mentira.png',
    'assets/messages/molestos.png',
    'fish.png',
    'assets/guinea-pig.png',
    'assets/powerups/bright/cherry-sprite.png',
    'assets/menu/start.png',
    'assets/menu/help.png',
    'assets/menu/exit.png',
    'assets/health-sprite.png',
    'assets/menu/game-over.png',
    'assets/menu/ganaste.png',
    'bee.png',
    'honeycomb.png',
    'music/plastic3_happy_game.mp3',
    'music/click_en_menu.wav',
    'music/danio_1.wav',
    'music/danio_2.wav',
    'music/die.wav',
    'music/eat.wav',
    'music/mordido_por_zombie.wav',
    'music/nivel_terminado.wav',
    'music/salto.wav',
    'music/why_so_serious.mp3',
    'worm.png',
    'zombie.png'
);

game.fps = 15;

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
    initialize:  function(x, y, size, type, velocityX, velocityY, evil, fotogramas){
        Sprite.call(this, size, size); // Modificar por tamaño real de sprit

        this.size = size;
        this.evil = evil;
        this.image = game.assets[type + '.png']; // Crear la imagen y adicionarlo a los preload
        this.x = x;
        this.y = y;
        this.bckX = x;
        this.bckY = y;
        this.xx = velocityX;//Velocidad en x
        this.yy = velocityY;
        this.frame = [0,0,1,1];
        this.dir = 0; // direction 0: right 1: left
        this.fotogramas = fotogramas;
        if(fotogramas){
            this.derecha = [];
            this.izquierda = [];
            for(var i = 0; i < fotogramas; i++){
                this.derecha.push(i);
                this.izquierda.push(i + fotogramas);
            }
            this.frame = this.derecha;
        }
        this.repetir = function(){};
    },
    onenterframe: function(){

        this.repetir();
        /*Volver al inicio cuando muere*/
        if(this.y >= game.height){
            this.x = this.bckX;
            this.y = this.bckY;
        }

        if(this.dir == RIGHT && map.hitTest(this.x + this.size, this.y + this.size / 2)){
            this.xx = -this.xx;
            this.dir = LEFT;
            if(this.fotogramas)
                this.frame = this.izquierda;
            else
                this.frame= [2,2,3,3];

        }else if(this.dir == LEFT && map.hitTest(this.x, this.y + this.size / 2)){
            this.xx = -this.xx;
            this.dir = RIGHT;
            if(this.fotogramas)
                this.frame = this.derecha;
            else
                this.frame = [0,0,1,1];
        }

        if(!map.hitTest(this.x, this.y + this.size) && !map.hitTest(this.x + this.size, this.y + this.size))
            this.y += this.yy;

        this.x += this.xx;


        if(this.evil && this.intersect(player)){
            if( this.x % 5 == 0 || this.x % 7 == 0)
                player.opacity = 0.5;

            if(game.frame % 6 == 0){
                player.life--;
                obj = game.assets["music/danio_1.wav"];
				obj.volume = 1;
				obj.play();
            }


            // Animación.
            if(player.xx > 0)
                player.frame = 3;

            if(player.xx < 0)
                player.frame = 4;

            player.damaged = true;
        } else {
            if(!player.damaged) {
                player.opacity = 1;
            } else {
                player.damaged = false;
            }
        }
        //Ver la posicion del personaje en tamaños de 32 x 32
        //document.getElementById('pos').innerText = 'X: '+ player.x/32 + ' , Y: ' + player.y/32;
    }
});

/******/
var RIGHT = 0;
var LEFT = 1;

// -----------------------------------------------------------------------------

window.onload = function() {
    game.onload = function() {
	game.startTime = new Date().getTime();
        self = this;

        game.firstTheme = game.assets["music/plastic3_happy_game.mp3"].clone();
        game.firstTheme.volume = 0.3;
        game.firstTheme.play();

        // Load the background
        var bg = new Sprite(640, 320);
        bg.image = game.assets['assets/bright-background.png'];

        var leafs = new Sprite(640, 96);
        leafs.image = game.assets['assets/bright-roof.png'];

        var leafs2 = new Sprite(640, 96);
        leafs2.image = game.assets['assets/bright-roof-2.png'];

        game.bg = bg;
        game.leafs2 = leafs2;
        game.leafs = leafs;
        game.clearBackground = function() {
            this.rootScene.removeChild(this.bg);
            this.rootScene.removeChild(this.leafs2);
            this.rootScene.removeChild(this.leafs);
        };

        game.rootScene.addChild(bg);
        game.rootScene.addChild(leafs2);
        game.rootScene.addChild(leafs);

        player = new Player(30, 0);

        var stage = getFirstLevel(game, player);


        // For moving all map on the enter_frame event
        this.stage = stage;
        var menuScene = Scene();

        game.stage = stage;
        menuScene.addChild(menuMaker("assets/menu/start.png", 100, function() {
            // Primer mensaje
            game.showMessage('assets/messages/donde.png');
        }));
        // menuScene.addChild(menuMaker("assets/menu/help.png", 155,function(){
        //     alert("ayuda");
        // }));

        // menuScene.addChild(menuMaker("assets/menu/exit.png", 210));
        game.pushScene(menuScene);


        var life = Label();
        stage.addChild(map);
        stage.addChild(player);
        game.currentStage = stage;

        game.rootScene.addChild(stage);
        game.rootScene.setInterval(3000, function(){
            //player.life -= 10;
            life.text = player.life;
            life.color = '#000';
            life.font = "8px cursive";
            life.x = 50;
            life.y = 50;
            // stage.addChild(life);
        });

	// Health Bar
        window.healthbar = new HealthBar({
            stage  : stage,
        });

        game.rootScene.addEventListener(Event.ENTER_FRAME, (function(e) {
            // Realiza el scroll del background

            var x = Math.min((game.width - 16) / 2 - player.x, 0);
            var y = Math.min((game.height - 16) / 2 - player.y, 0);
            x = Math.max(game.width, x + this.map.width) - this.map.width;
            y = Math.max(game.height, y + this.map.height) - this.map.height;
            this.stage.x = x;
            this.stage.y = y;
            window.healthbar.setPoints(player.life);
            window.healthbar.displace(x);
        }).bind(this));

        // Animation for leafs(background)
        leafs.tl.fadeOut(70).fadeIn(70).loop();
  };
  game.start();
};
