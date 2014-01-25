enchant();

var player;

var Enemy = Class.create(Sprite, {
    initialize:  function(x, y, size, type, velocity, evil){
        Sprite.call(this, size, size); // Modificar por tamaño real de sprit

        this.size = size;
        this.evil = evil;
        this.image = game.assets[type + '.png']; // Crear la imagen y adicionarlo a los preload
        this.x = x;
        this.y = y;
        this.xx = velocity;//Velocidad en x
        this.yy = 1;
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


        if(this.evil && this.intersect(player) && this.x % 3 == 0)
            player.opacity = 0.5;
        else
            player.opacity = 1;
    }
});

/******/
var RIGHT = 0;
var LEFT = 1;