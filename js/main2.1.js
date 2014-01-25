var DIR_LEFT = 0;
var DIR_RIGHT = 1;
var DIR_UP = 2;
var DIR_DOWN = 3;
var mapa1 = [
    [-1,-1,14,14,14,14,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,13,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,13,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,-1,-1,-1,-1,-1,-1,-1,-1,-1,14,-1,-1,-1,-1,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,-1,-1,14,14,14,14,14,14,14,14,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,14,14,14,14,14,14,14,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [14,14,14,14,14,14,14,14,14,14,14,-1,-1,-1,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,-1,-1,-1,-1,-1,-1,13,14,14,14,-1,-1,-1,-1,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,-1,-1,14,14,14,14,14,14,14,14,14,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,14,14,14,14,14,14,14,14,-1,-1,14,14,14,14,14,14,14,14,14],
    [14,14,14,14,14,14,14,14,14,14,14,-1,-1,-1,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,-1,-1,-1,-1,-1,13,14,14,14,14,-1,-1,-1,-1,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,-1,-1,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,-1,-1,-1,14,14,14,14,14,14,14,14,14,14,-1,-1,14,14,14,14,14,14,14,14,14],
    [14,14,14,14,14,14,14,14,14,14,14,-1,-1,-1,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,-1,-1,-1,-1,14,14,14,14,14,14,-1,-1,-1,-1,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,-1,-1,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,-1,-1,14,14,14,14,14,14,14,14,14,14,-1,-1,14,14,14,14,14,14,14,14,14],
    [14,14,14,14,14,14,14,14,14,14,14,-1,-1,-1,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,-1,-1,-1,14,14,14,14,14,14,14,-1,-1,-1,-1,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,-1,-1,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,-1,-1,14,14,14,14,14,14,14,14,14,14,-1,-1,14,14,14,14,14,14,14,14,14]
];

var mapa2 = [
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,13,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,13,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,13,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,13,13,13,13,-1,-1,13,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,13,13,-1,-1,-1,-1,-1,-1,13,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,13,13,-1,-1,-1,-1,-1,-1,13,13,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,13,-1,-1,-1,-1,-1,-1,-1,13,13,13,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,13,13,-1,-1,-1,-1,-1,-1,13,13,13,13,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,13,-1,-1,13,13,13,13,13,13,13,13,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,13,-1,-1,-1,-1,13,13,13,13,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,13,-1,-1,-1,-1,-1,-1,13,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,13,13,-1,-1,-1,-1,-1,13,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,13,13,13,13,13,13,13,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
];
var mapa3 = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1]
];

enchant();
/******/
var RIGHT = 0;
var LEFT = 1;
var map;
var gameOver = false;
var falling = true;


var Rat = Class.create(Sprite, {
    initialize:  function(x, y){
        Sprite.call(this, 16, 16); // Modificar por tamaño real de sprit
        this.image = game.assets['cara.png']; // Crear la imagen y adicionarlo a los preload
        this.x = x;
        this.y = y;
        this.xx = 2;//Velocidad en x
        this.yy = 2;
        this.frame = [40,40,41,41];
        this.dir = 0; // direction 0: right 1: left
        //stage.addChild(this);

    },
    onenterframe: function(){
        if(this.dir == RIGHT && map.hitTest(this.x + 16, this.y)){
            this.xx = -this.xx;
            this.dir = LEFT;
            this.frame= [42,42,43,43];
        }else if(this.dir == LEFT && map.hitTest(this.x, this.y)){
            this.xx = -this.xx;
            this.dir = RIGHT;
            this.frame = [40,40,41,41];
        }
        if(!map.hitTest(this.x, this.y + 16))
            this.y += this.yy;

        this.x += this.xx;
    }
});

/******/
var RIGHT = 0;
var LEFT = 1;


// -----------------------------------------------------------------------------

var game = new Game(640, 320);
game.fps = 16;
game.preload('assets/map1.png', 'assets/player.gif', 'cara.png');

window.onload = function() {

    game.onload = function() {
        var Rectangle = enchant.Class.create({
            initialize: function(x, y, width, height) {
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
            },
            right: {
                get: function() {
                    return this.x + this.width;
                }
            },
            bottom: {
                get: function() {
                    return this.y + this.height;
                }
            }
        });

        map = new Map(16, 16);
        map.image = game.assets['assets/map1.png'];
        map.loadData(mapa1);
        // map.collisionData = mapa3;



        /* ================ COSA COOL */
        var player = new Sprite(32, 32);
        player.x = 40;
        player.y = 64;
        player.vx = 0;
        player.vy = 0;
        player.ax = 0;
        player.ay = 0;
        player.pose = 0;
        player.jumping = true;
        player.jumpBoost = 0;
        player.image = game.assets['assets/player.gif'];

        var bar002 = { value: 200 };

        var player_h = 0;
        var player_hit_h = 0;
        player.addEventListener('enterframe', function(e) {
            var friction = 0;
            if (this.vx > 0.3) {//速度が速いとき
                friction = -0.3;//減速させる
            } else if (this.vx > 0) {
                friction = -this.vx;
            }
            if (this.vx < -0.3) {
                friction = 0.3;
            } else if (this.vx < 0) {
                friction = -this.vx;
            }
            // para que no se vaya volando
            // if (!game.input.up || --this.jumpBoost < 0 || bar002.value <= 20)
            if (!game.input.up ) {
                this.ay = 0;
                bar002.value += 2;
                if(bar002.value >= 150){
                    bar002.value = 150;
                }
            }
            if (!(game.input.up) && this.jumping === false) {
                bar002.value += 10;
                if(bar002.value >= 150){
                    bar002.value = 150;
                }
            }
            if (game.input.up) {
                if(bar002.value >= 20){
                    this.jumpBoost = 132;
                    this.ay = -0.5;
                    bar002.value -= 3;
                } else{
                    bar002.value -=3;
                }
            }

            this.ax = 0;
            if (game.input.left) this.ax -= 0.5;
            if (game.input.right) this.ax += 0.5;
            if (this.ax > 0&&this.jumping === false) this.scaleX = 1;//向き
            if (this.ax < 0&&this.jumping === false) this.scaleX = -1;//向き（反転）
            // guns.scaleX = this.scaleX; OJO
            if(this.jumping) {
                if (game.frame % 4 === 0) {//歩くアニメ
                    if(player_h < 8) {
                        player_h = 8;
                    }
                    player_h++;
                    if(player_h > 10) {
                        player_h = 9;
                    }
                    //this.frame = player_h;
                    //this.pose++;
                    //this.pose %= 2;
                }
                //this.frame = this.pose + 9;
                this.frame = player_h;
            } else if (this.ax !== 0) {
                if (game.frame % 4 === 0) {//歩くアニメ
                    //this.pose++;
                    //this.pose %= 8;
                    if(player_h === 0 || player_h >= 8) {
                        player_h = 1;
                    }
                    player_h++;
                }
                //this.frame = this.pose + 1;
                this.frame = player_h;
            } else{
                this.frame = 0;//止まる
            }
            // 556
            this.vx += this.ax + friction;
            this.vy += this.ay + 0.25 ;
            this.vx = Math.min(Math.max(this.vx, -8), 8);
            this.vy = Math.min(Math.max(this.vy, -10), 10);
            var dest = new Rectangle(
                this.x + this.vx + 5, this.y + this.vy + 3,
                this.width-10, this.height-3
            );
            this.jumping = true;
            // detenia la escena
            // if (dest.x < -stage.x) {
            //     dest.x = -stage.x;
            //     this.vx = 0;
            // }
            // if (dest.x > -stage.x+250) {
            //     dest.x = -stage.x+250;
            //     this.vx = 0;
            // }

            // 574
            while (true) {
                var boundary, crossing;
                var dx = dest.x - this.x - 5;
                var dy = dest.y - this.y -3;

                if (dx > 0 && Math.floor(dest.right / 16) != Math.floor((dest.right - dx) / 16)) {
                    console.log('1');
                    boundary = Math.floor(dest.right / 16) * 16;
                    crossing = (dest.right - boundary) / dx * dy + dest.y;
                    if ((map.hitTest(boundary, crossing) && !map.hitTest(boundary-16, crossing)) ||
                        (map.hitTest(boundary, crossing + dest.height) && !map.hitTest(boundary-16, crossing + dest.height))) {
                        console.log('1.1');
                        this.vx = 0;
                        dest.x = boundary - dest.width - 0.01;

                        continue;
                    }
                } else if (dx < 0 && Math.floor(dest.x / 16) != Math.floor((dest.x - dx) / 16)) {
                    console.log('2');
                    boundary = Math.floor(dest.x / 16) * 16 + 16;
                    crossing = (boundary - dest.x) / dx * dy + dest.y;
                    if ((map.hitTest(boundary-16, crossing) && !map.hitTest(boundary, crossing)) ||
                        (map.hitTest(boundary-16, crossing + dest.height) && !map.hitTest(boundary, crossing + dest.height))) {
                        console.log('2.1');
                        this.vx = 0;
                        dest.x = boundary + 0.01;
                        continue;
                    }
                }

                if (dy > 0 && Math.floor(dest.bottom / 16) != Math.floor((dest.bottom - dy) / 16)) {
                    console.log('3');
                    boundary = Math.floor(dest.bottom / 16) * 16;
                    crossing = (dest.bottom - boundary) / dy * dx + dest.x;
                    if ((map.hitTest(crossing, boundary) && !map.hitTest(crossing, boundary-16)) ||
                        (map.hitTest(crossing + dest.width, boundary) && !map.hitTest(crossing + dest.width, boundary-16))) {
                        console.log('3.1');
                        this.jumping = false;
                        this.vy = 0;
                        dest.y = boundary - dest.height - 0.01;
                        continue;
                    }
                } else if (dy < 0 && Math.floor(dest.y / 16) != Math.floor((dest.y - dy) / 16)) {
                    console.log('4');
                    boundary = Math.floor(dest.y / 16) * 16 + 16;
                    crossing = (boundary - dest.y) / dy * dx + dest.x;
                    if ((map.hitTest(crossing, boundary-16) && !map.hitTest(crossing, boundary)) ||
                        (map.hitTest(crossing + dest.width, boundary-16) && !map.hitTest(crossing + dest.width, boundary))) {
                        console.log('4.1');
                        this.vy = 0;
                        dest.y = boundary + 0.001;
                        continue;
                    }
                }
                break;
            }
            this.x = dest.x-5;
            this.y = dest.y-3;
        });

        /* ================ COSA COOL */

        var stage = new Group();
        stage.addChild(map);
        stage.addChild(player);
        game.rootScene.addChild(stage);
        game.rootScene.addEventListener(Event.ENTER_FRAME, function(e) {
            // Realiza el scroll del background
            var x = Math.min((game.width - 16) / 2 - player.x, 0);
            var y = Math.min((game.height - 16) / 2 - player.y, 0);
            x = Math.max(game.width, x + map.width) - map.width;
            y = Math.max(game.height, y + map.height) - map.height;
            stage.x = x;
            stage.y = y;
        });
  };
  game.start();
};
