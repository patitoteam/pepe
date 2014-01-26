enchant();

var Enemy = Class.create(Sprite, {
    initialize:  function(x, y, size, type, velocityX, velocityY, evil){

        //var rata = new Enemy(10, 0, 16, 'cara', 1, 1, true);
        //var rata3 = new Enemy(10, 0, 16, 'cara', 0.5, 1.1, true);

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
            obj = game.assets["music/danio_2.wav"].clone();
            obj.volume = 1;
            obj.play();
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