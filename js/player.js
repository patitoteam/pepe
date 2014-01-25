enchant();
var Player = Class.create(Sprite, {
    initialize: function(x, y) {
        Sprite.call(this, 32, 16);
        this.image = game.assets['assets/guinea-pig.png'];
        this.x = x;
        this.y = y;
        this.xx= 0;
        this.yy = 0;
        this.opacity = 1;
        this.damage=0;
        this.speed = 3;
        this.jump = false;
        this.jumpcnt=0;
        this.frame = 0;
        this.muki=0;
        this.bulletcnt=0;
        this.missilecnt=0;
        console.log('Se creo player');
        //stage.addChild(this);

    },
    onenterframe: function() {

        if(game.input.up){
            if(this.jump){
                this.jump=false;
                this.jumpcnt=11;
                //game.assets["pi31.wav"].clone().play();
            }
        }

        if(this.jumpcnt){
            this.jumpcnt--;
            if(game.input.up){
                this.yy= -4.6;
            }else{
                this.jumpcnt=0;
            }
        }

        player.y += this.yy;

        if (map.hitTest(player.x+8,player.y+32)==false){
            this.jump = false;
            this.yy += 0.6;
        }else{
            this.jump = true;
            this.yy =0;
        }

        if (map.hitTest(player.x+8,player.y+32)){
            this.y = Math.floor(this.y / 16) * 16;
        }
        if (map.hitTest(player.x+8,player.y)){
            this.y = Math.floor(this.y / 16) * 16+15;
            this.jumpcnt=0;this.yy+=3
        }


        if (game.input.left )this.xx = -this.speed;
        if (game.input.right )this.xx = this.speed;


        if(game.input.left == false && game.input.right == false){
            if(this.xx>0)this.xx-=this.speed;
            if(this.xx<0)this.xx+=this.speed;
        }

        player.x += this.xx;
        

        if (map.hitTest(player.x,player.y+8 + 8)){
            console.log('lugar 1');
            this.x = Math.floor(this.x / 16) * 16 + 14;
        }

        if (map.hitTest(player.x+16+16,player.y+8)){
            console.log('lugar 2');
            this.x = Math.floor(this.x / 16) * 16;
        }

        if (map.hitTest(player.x+8,player.y+32)){
            console.log('lugar 3');
            this.y = Math.floor(this.y / 32) * 32;
            /*
            if(this.xx!=0){
                if(this.xx > 0){
                    this.frame++;
                    if(this.frame<17 || this.frame>20){
                        this.frame=17;
                        game.assets["step07.wav"].clone().play();
                    }

                }

                if(this.xx<0){

                    this.frame++;
                    if(this.frame<23 || this.frame>26){
                        this.frame=23;
                        game.assets["step07.wav"].clone().play();
                    }
                }

            }else{

                if(this.frame >16 && this.frame <22){this.frame=16;game.assets["step07.wav"].play();}
                if(this.frame >22 && this.frame <28){this.frame=22;game.assets["step07.wav"].play();}

            }
*/

        }else{
            if(this.frame<21)this.frame=21;
            if(this.frame>21)this.frame=27;
        }

/*        if(this.bulletcnt)this.bulletcnt--;
        if(this.missilecnt)this.missilecnt--;
        switch (game.buki){
            case 0:
                if(game.input.down){

                    if(this.bulletcnt==0){
                        if(this.frame<22){this.muki=0;}else{this.muki=1;}

                        if(game.tama){
                            bullet = new Bullet(this.x,this.y,this.muki);
                            bullets[game.tamaindex]=bullet;
                            bullet.ky = game.tamaindex;
                            game.tamaindex++;
                            if(game.tamaindex>12)game.tamaindex=0;
                            game.tama--;
                            game.assets["pt1sd.wav"].clone().play();
                        }else{game.assets["boo.wav"].clone().play();}



                        this.bulletcnt=4;
                    }

                }
                break;
            case 1:
                if(game.input.down){

                    if(this.missilecnt==0){
                        if(this.frame<22){this.muki=0;}else{this.muki=1;}

                        if(game.msil){
                            game.missile = new Missile(this.x,this.y,this.muki);
                            game.msil--;
                            game.assets["puu64.wav"].clone().play();
                            this.missilecnt=35;
                        }else{
                            game.assets["boo.wav"].clone().play();
                            this.missilecnt=10;
                        }

                    }

                }
                break;
        }


        if(this.damage){
            this.opacity = this.age%2;
            this.damage--;
            if(!this.damage)this.opacity=1;

        }else{//

            for ( var i in ebullets ) {//弾との当たり判定
                if(this.intersect(ebullets[i])){
                    stage.removeChild(ebullets[i]);
                    delete ebullets[i];
                    game.life-=1;
                    blood = new Blood(this.x-4,this.y-4);
                    game.assets["slmdie.wav"].clone().play();
                    this.damage+=29;
                }
            }
        }//

        if(game.life<1){game.over=60;blood=new Blood(this.x-4,this.y-4);stage.removeChild(this);}
        */
    }
});