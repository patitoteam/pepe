enchant();
var Rat = Class.create(Sprite, {
    initialize:  function(x, y){
        Sprite.call(this, 16, 16); // Modificar por tamaño real de sprit
        this.image = game.assets['cara.png']; // Crear la imagen
        this.x = x;
        this.y = y;
        this.xx = 2;//Velocidad en x
        this.frame = 0;
        this.dir = 0; // direction 0: right 1: left
        stage.addChild(this); // Crear variable
    },
    onenterframe: function(){
        if(dir == RIGHT && map.hitTest(this.x + 16, this.y + 16)){
            this.xx = -2;
            this.dir = LEFT;
        }else if(dir == LEFT && map.hitTest(x - 1, y + 16)){
            this.xx = 2;
            this.dir = RIGHT;
        }
        this.x += this.xx;
    }
});

/******/
var RIGHT = 0;
var LEFT = 1;