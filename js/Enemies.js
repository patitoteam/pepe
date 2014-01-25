enchant();

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
        if(this.dir == RIGHT && map.hitTest(this.x + 16, this.y + 16)){
            this.xx = -this.xx;
            this.dir = LEFT;
            this.frame= [42,42,43,43];
        }else if(this.dir == LEFT && map.hitTest(this.x, this.y + 16)){
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