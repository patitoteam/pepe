enchant();
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
    },
    onenterframe: function(){

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
        //info.innerText = 'X: '+ player.x/32 + ' , Y: ' + player.y/32;
    }
});

var RIGHT = 0;
var LEFT = 1;
