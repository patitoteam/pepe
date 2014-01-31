enchant();

var info = document.getElementById('information');
info.innerText = '';

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

        /*****************************Touch, conflicts with keyboard********************************/
        /*
        var touches = [];
        window.addEventListener(enchant.Event.TOUCH_START, function(e){
            var t = e.changedTouches;
            for(var i = 0; i < t.length; i++){
                var x = t[i].pageX;
                var y = t[i].pageY;
                touches[t[i].identifier] = new Point(x, y);
            }
        }, false);

        window.addEventListener(enchant.Event.TOUCH_END, function(e){
            var t = e.changedTouches;
            for(var i = 0; i < t.length; i++){
                touches[t[i].identifier] = null;
            }

        }, false);

        window.addEventListener(enchant.Event.TOUCH_MOVE, function(e){
            e.preventDefault();
            var t = e.changedTouches;
            for(var i = 0; i < t.length; i++){
                touches[t[i].identifier].x = t[i].pageX;
                touches[t[i].identifier].y = t[i].pageY;
            }
        }, false);
        var ancho = game.width ;
        var a = ancho / 4;
        var b = ancho / 2;

        var surfacepress = new Surface(32, 32);
        surfacepress.context.fillStyle = 'rgba(0, 0, 0, 0.15)';
        surfacepress.context.fillRect(0, 0, 32, 32);
        var surfaceunpress = new Surface(32, 32);
        surfaceunpress.context.fillStyle = 'rgba(0, 0, 0, 0.1)';
        surfaceunpress.context.fillRect(0, 0, 32, 32);

        var btnup = new Sprite(32, 50);
        btnup.image = surfaceunpress;
        btnup.width = b;
        btnup.x = b;
        btnup.y = game.height - btnup.height;

        var btnleft = new Sprite(32, 50);
        btnleft.image = surfaceunpress;
        btnleft.width = a;
        btnleft.x = 0;
        btnleft.y = game.height - btnleft.height;

        var btnright = new Sprite(32, 50);
        btnright.image = surfaceunpress;
        btnright.width = a;
        btnright.x = a;
        btnright.y = game.height - btnright.height;
        */
        /*************************************************************/

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

            /*************************Touch, conflicts with keyboard***********************/

            /*
            var left = false, right = false, up = false;
            for(var i = 0; i < touches.length; i++){
                if(touches[i]){
                    if(touches[i].x < a)
                        left = true;
                    else if(touches[i].x < b)
                        right = true;
                    else
                        up = true;
                }
            }

            game.input.up = up;
            game.input.right = right;
            game.input.left = left;

            if(!game.currentStage.btnup) game.currentStage.addChild(btnup);
            if(!game.currentStage.btnright) game.currentStage.addChild(btnright);
            if(!game.currentStage.btnleft) game.currentStage.addChild(btnleft);

            if(up)btnup.image = surfacepress;
            else btnup.image = surfaceunpress;

            if(right)btnright.image = surfacepress;
            else btnright.image = surfaceunpress;

            if(left)btnleft.image = surfacepress;
            else btnleft.image = surfaceunpress;

            btnup.x = -x + b;
            btnleft.x = -x;
            btnright.x = -x + a;
            */
            /************************************************/

        }).bind(this));
    };
    game.start();
};

function Point(x,y){
    this.x=x||0;
    this.y=y||0;
}