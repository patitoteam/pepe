enchant();
var Player = Class.create(Sprite, {
    initialize: function(x, y) {
        Sprite.call(this, 32, 32);
        this.image = game.assets['assets/guinea-pig.png'];
        this.x = x;
        this.y = y;
        this.xx= 0;
        this.life = 10;
        this.score = 0;
        this.yy = 0;
        this.opacity = 1;
        this.damage=0;
        this.speed = 8;
        this.jump = false;
        this.jumpcnt=0;
        this.frame = 0;
        this.muki=0;
        this.bulletcnt=0;
        this.missilecnt=0;
        this.goingToRight = true;
        this.goingDown = false;
    },
    resetPlayer: function() {
        this.xx= 0;
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
    },

    onenterframe: function() {
        if(game.input.up){

            if(this.jump){
                obj = game.assets["music/salto.wav"].clone();
                obj.volume = 1;
                obj.play();

                this.jump=false;
                this.jumpcnt=129; // 11
                //game.assets["pi31.wav"].clone().play();

		this.goingDown = true;
            }
        }

        if(this.jumpcnt){
            this.jumpcnt--;
            if(game.input.up){
                this.yy= -6;

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

        if (this.x >= game.currentStage.finalPosition) {
            console.log('termino nivel ');
            game.rootScene.removeChild(game.currentStage);
            var stage;
            if (game.currentLevel === 1) {
                stage = getSecondLevel(game, this);
                game.currentStage = stage;
                game.rootScene.addChild(stage);
            } else if (game.currentLevel === 2) {
                stage = getThirdLevel(game, this);
                game.currentStage = stage;
                game.rootScene.addChild(stage);
            } else if (game.currentLevel === 3) {
                alert('Ganaste!!! lastima que mañana es lunes y tienes que ir al trabajo');
            }
        }

	if (!game.secondTheme && game.currentLevel === 3) {
	    game.firstTheme.stop();
	    game.secondTheme = game.assets["music/why_so_serious.mp3"].clone();
            game.secondTheme.volume = 0.9;
            game.secondTheme.play();
	}

        if (game.input.right) {
    	    this.xx = this.speed;
    	    this.goingToRight = true;
    	} else if (game.input.left) {
    	    // Moving to the left.
    	    this.xx = -this.speed;
    	    this.goingToRight = false;
    	} else {
    	    if(this.goingToRight) {
    		  this.frame = 0;
    	    } else {
    		  this.frame = 7;
	    }
	}

        if(game.input.left === false && game.input.right === false){
            if(this.xx>0)this.xx-=this.speed;
            if(this.xx<0)this.xx+=this.speed;
        }

        player.x += this.xx;

        // console.log('x> ' + player.x);
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

	    if(this.goinDown) {
		if(this.goingToRight) {
		    this.frame = 0;
		} else {
		    this.frame = 7;
		}
		this.goingDown = false;
	    }
        }

    	// Animations.
    	if(game.input.right) {
    	    // Walking to the right.
    	    if(this.frame != 0 && this.frame != 1  && this.frame != 2) this.frame = 0;
    	    else if(this.frame == 0) this.frame = 1;
    	    else if(this.frame == 1) this.frame = 2;
    	    else if(this.frame == 2) this.frame = 0;
    	} else if(game.input.left) {
    	    // Walking to the left.
    	    if(this.frame != 5 && this.frame != 6 && this.frame != 7) this.frame = 7;
    	    else if(this.frame == 5) this.frame = 6;
    	    else if(this.frame == 6) this.frame = 7;
    	    else if(this.frame == 7) this.frame = 5;
    	}

	// Meh..
        if(this.life<=0) {
            console.log("finished");
            game.endGame("GAME OVER");
        }

	// Game Over when Pepe falls.
        if(this.y >= game.height) {
            console.log("finished");
            if (game.currentLevel === 3) {
                game.rootScene.removeChild(game.currentStage);
                stage = getThirdLevel(game, this);
                game.currentStage = stage;
                game.rootScene.addChild(stage);
            } else {
                game.endGame("GAME OVER");
            }
        }
    }
});
