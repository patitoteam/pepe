enchant();

var info = document.getElementById('information');
info.innerHTML = '';

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

var player;
var self;

window.onload = function() {
    game.onload = function() {
        game.startTime = new Date().getTime();
        self = this;

        // Load the background
        /*        game.clearBackground = function() {
         if(this.bg) this.rootScene.removeChild(this.bg);
         if(this.leafs2) this.rootScene.removeChild(this.leafs2);
         if(this.leafs) this.rootScene.removeChild(this.leafs);
         };
         */

        player = new Player(30, 0);

        var stage = getFirstLevel(game, player);


        // For moving all map on the enter_frame event
        this.stage = stage;
        var menuScene = new Scene();

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


        //var life = new Label();
        stage.addChild(map);
        stage.addChild(player);
        game.currentStage = stage;

        game.rootScene.addChild(stage);

        /*game.rootScene.setInterval(3000, function(){
         life.text = player.life;
         life.color = '#000';
         life.font = "8px cursive";
         life.x = 50;
         life.y = 50;
         // stage.addChild(life);
         });
         */

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

    };
    game.start();
};
