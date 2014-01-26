enchant();
var Player = Class.create(Sprite, {
    initialize: function(x, y) {
        Sprite.call(this, 32, 32);
        this.image = game.assets['assets/guinea-pig.png'];
        this.x = x;
        this.y = y;
        this.xx= 0;
        this.life = 100;
        this.score = 0;
        this.yy = 0;
        this.opacity = 1;
        this.damage=0;
        this.speed = 7;
        this.jump = false;
        this.jumpcnt=0;
        this.frame = 0;
        this.muki=0;
        this.bulletcnt=0;
        this.missilecnt=0;
        console.log('Se creo player');


    },

    onenterframe: function() {
        if(game.input.up){
            if(this.jump){
                this.jump=false;
                this.jumpcnt=6; // 11
                //game.assets["pi31.wav"].clone().play();
            }
        }

        if(this.jumpcnt){
            this.jumpcnt--;
            if(game.input.up){
                //this.yy= -4.6;
                this.yy= -7;
        		// Animation.
                this.frame = 1;
            }else{
                this.jumpcnt=0;
            }
        }

        player.y += this.yy;

        if (map.hitTest(player.x+8,player.y+32) === false){
            this.jump = false;
            //this.yy += 0.6;
    	    this.yy += 2;
	    if(this.yy < 20)
		this.yy += 2;
	    console.log(this.yy);
        }else{
            this.jump = true;
            this.yy =0;
        }

        if (map.hitTest(player.x+8+8,player.y+32)){
            this.y = Math.floor(this.y / 16) * 16;
        }

        if (map.hitTest(player.x+8+8,player.y)){
            this.y = Math.floor(this.y / 16) * 16+15;
            this.jumpcnt=0;this.yy+=3;
        }

	// Moving to the right.
        if (game.input.right) {
            this.xx = this.speed;
            // Animation.
            if(this.frame != 0 && this.frame != 2) this.frame = 0;
            else if(this.frame == 0) this.frame = 2;
            else if(this.frame == 2) this.frame = 0;
        }


	// Moving to the left.
        if (game.input.left) {
            this.xx = -this.speed;

            // Animation.
            if(this.frame != 5 && this.frame != 7) this.frame = 7;
            else if(this.frame == 5) this.frame = 7;
            else if(this.frame == 7) this.frame = 5;

    	}

        if(game.input.left === false && game.input.right === false){
            if(this.xx>0)this.xx-=this.speed;
            if(this.xx<0)this.xx+=this.speed;
        }

        player.x += this.xx;

	// Interjection with the left.
        if (map.hitTest(player.x,player.y+8 + 8)){
            this.x = Math.floor(this.x / 16) * 16 + 14;
        }

	// Interjection with the right.
        if (map.hitTest(player.x+16+16,player.y+8)){
            this.x = Math.floor(this.x / (16+16)) * (16+16);
        }

	// Interjection with the bottom.
        if (map.hitTest(player.x+8,player.y+32)){
            this.y = Math.floor(this.y / 32) * 32;
        }




    	// Animations.
    	if(game.input.right) {
    	    // Walking to the right.
    	    if(this.frame != 0  && this.frame != 2) this.frame = 0;
    	    else if(this.frame == 0) this.frame = 2;
    	    else if(this.frame == 2) this.frame = 0;
    	} else if(game.input.left) {
    	    // Walking to the left.
    	    if(this.frame != 5 && this.frame != 7) this.frame = 7;
    	    else if(this.frame == 5) this.frame = 7;
    	    else if(this.frame == 7) this.frame = 5;
    	}
    }
});
