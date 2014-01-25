var Stage = Class.create(Scene, {
    initialize: function(game){
        Scene.call(this);

        this.game = game;
        this.backgroundColor = '#000';

        this.sprites = [];
        this.movingFloors = [];

        this.view = this.createView();
        this.map = this.createMap();
        this.player = this.createPlayer();
        this.pad = this.createPad();
        this.button = this.createButton();
        this.message = this.createMessage();
        this.scoreLabel = this.createScoreLabel();
        this.timeLabel = this.createTimeLabel();
        this._element.style.opacity = 0;
    },
    assets: {
        get: function(){
            return this.game.assets;
        }
    },
    input: {
        get: function(){
            return this.game.input;
        }
    },
    score: {
        get: function(){
            return this.prestage.score;
        },
        set: function(value){
            this.prestage.score = value;
            this.scoreLabel.text = 'SCORE ${score}'.format(this);
        }
    },
    time: {
        get: function(){
            return this._time;
        },
        set: function(value){
            this._time = value;
        }
    },
    cleared: {
        get: function(){
            return !!this._cleared;
        },
        set: function(value){
            this._cleared = value;
            this.prestage.cleared = value;
        }
    },
    start: function(prestage){
        this.prestage = prestage;
        this.score = this.score;

        var opacity = 0;
        this.addEventListener('enterframe', function listener(){
            opacity += 0.05;
            if(opacity >= 1){
                this.removeEventListener('enterframe', listener);
                this._element.style.opacity = 1;
                this.run();
            }else{
                this._element.style.opacity = opacity;
            }
        });
    },
    run: function(){
        var a = false;
        this.addEventListener('abuttondown', function(){
            if(a)
                return;
            a = true;

            this.player.jump();

            this.addEventListener('abuttonup', function(){
                a = false;
            });
        });

        var now = 0;
        this.timeLabel.addEventListener('enterframe', function(){
            now += 1000 / GAME_FPS;
            this.time = this.timeLimit - now / 1000 | 0;
            this.timeLabel.text = 'TIME ${time}'.format(this);

            if(this.time === 0){
                this.end('END');
            }
        }.bind(this));
    },
    end: function(message){
        this.showMessage(message);

        this.clearEventListener('abuttondown');
        this.clearEventListener('abuttonup');
        this.view.clearEventListener('enterframe');
        this.timeLabel.clearEventListener('enterframe');
        for(var i = 0, l = this.sprites.length; i < l; i++){
            this.sprites[i].clearEventListener('enterframe');
        }

        if(!this.cleared){
            this.prestage.life--;
            asyncCall(function(){
                this.player.frame = 3;
            }, this);
        }

        this.setTimeout(3000, function(){
            var opacity = 1;
            this.addEventListener('enterframe', function(){
                opacity -= 0.05;
                if(opacity <= 0){
                    this._element.style.opacity = 0;
                    this.game.popScene();
                }else{
                    this._element.style.opacity = opacity;
                }
            });
        });
    },
    hitAny: function(points){
        for(var i = 0, l = points.length, j, f; i < l; i++){
            if(this.map.hitTest(points[i].x, points[i].y))
                return true;
            for(j = 0; f = this.movingFloors[j]; j++){
                if(f.hitTest(points[i].x - f.x, points[i].y - f.y))
                    return true;
            }
        }
        return false;
    },
    getMapData: function(){
        throw Error('not implemented');
    },
    getMapCollisionData: function(){
        throw Error('not implemented');
    },
    adjustView: function(){
        this.view.x = Math.max(GAME_WIDTH - this.map.width,
            Math.min(0, GAME_WIDTH / 2 - 20 - this.player.x));
        this.view.y = Math.max(GAME_HEIGHT - this.map.height,
            Math.min(0, GAME_HEIGHT / 2 + 32 - this.player.y));
    },
    createView: function(){
        var view = new Group();
        view.x = 0;
        view.y = 0;

        view.addEventListener('enterframe', function(){
            this.adjustView();
        }.bind(this));

        this.addChild(view);

        return view;
    },
    createMap: function(){
        var map = new MapEx({
            tileWidth: 32,
            tileHeight: 32,
            x: 0,
            y: 0,
            image: this.assets['map.png'],
            data: function(data){
                var result = [], table = {
                    ' ': 9,
                    'G': 19,
                    'g': 17,
                    'l': 18,
                    '{': 0,
                    '-': 1,
                    '}': 2,
                    '(': 10,
                    '0': 11,
                    ')': 12,
                    ',': 20,
                    '_': 21,
                    '.': 22,
                    '[': 30,
                    '=': 31,
                    ']': 32,
                    '^': 3,
                    ':': 13,
                    ';': 23,
                    '#': 33,
                };
                for(var i = 0, l = data.length, j, k; i < l; i++){
                    result.push([]);
                    for(j = 0, k = data[i].length; j < k; j++)
                        result[i].push(table[data[i].charAt(j)]);
                }
                return result;
            }(this.getMapData()),
            collisionData: function(data){
                if(data == null)
                    return null;
                var result = [], table = {' ': 0, '#': 1};
                for(var i = 0, l = data.length, j, k; i < l; i++){
                    result.push([]);
                    for(j = 0, k = data[i].length; j < k; j++)
                        result[i].push(table[data[i].charAt(j)]);
                }
                return result;
            }(this.getMapCollisionData()),
            parent: this.view
        });

        return map;
    },
    createPlayer: function(){
        var player = new SpriteEx({
            x: 48,
            y: 257,
            width: 32,
            height: 32,
            image: this.assets['chick.png'],
            parent: this.view
        });

        this.sprites.push(player);

        player.vx = 0;
        player.vy = 0;
        player.scaleX = 1;
        player._style.webkitTransformOrigin = '20px 16px';
        player._style.MozTransformOrigin = '20px 16px';
        player._style.msTransformOrigin = '20px 16px';
        player._style.OTransformOrigin = '20px 16px';

        player.getRect = function(){
            return new Rect(this.x + 10, this.y + 2, 20, 28);
        };

        player.getTopLeft =
            function(){ return new Point(player.x + 10, player.y + 2); };
        player.getTopRight =
            function(){ return new Point(player.x + 30, player.y + 2); };
        player.getBottomLeft =
            function(){ return new Point(player.x + 10, player.y + 30); };
        player.getBottomRight =
            function(){ return new Point(player.x + 30, player.y + 30); };

        this.initPlayerWalk(player);
        this.initPlayerJump(player);

        player.addEventListener('enterframe', function(){
            if(this.map.height < player.y){
                this.end('Game Over');
            }
        }.bind(this));

        return player;
    },
    initPlayerWalk: function(player){
        var MAX_SPEED = 3; // Pixel per frame
        var ACCELERATION = 0.5;

        player.walkFrames = [1, 1, 1, 0, 0, 2, 2, 2, 0, 0];

        player.addEventListener('enterframe', function(){
            if(this.input.left){
                player.vx = Math.max(-MAX_SPEED, player.vx - ACCELERATION);
            }else if(this.input.right){
                player.vx = Math.min(MAX_SPEED, player.vx + ACCELERATION);
            }else if(player.jumpCount === 0){
                if(player.vx > 0){
                    player.vx = Math.max(0, player.vx - ACCELERATION);
                }else if(player.vx < 0){
                    player.vx = Math.min(0, player.vx + ACCELERATION);
                }
            }

            if(player.vx !== 0)
                player.scaleX = player.vx > 0? 1: -1;
            player.wall = 0;
            player.x = player.x + player.vx | 0;
            if(this.hitAny([
                player.getTopLeft(), player.getTopRight(),
                player.getBottomLeft(), player.getBottomRight()
            ])){
                do{
                    player.x += player.vx > 0? -1: 1;
                }while(this.hitAny([
                    player.getTopLeft(), player.getTopRight(),
                    player.getBottomLeft(), player.getBottomRight()
                ]));

                player.wall = player.vx > 0? 1: -1;
                player.vx = 0;
                asyncCall(function(){
                    player.frame = 0;
                    player.walkFrames = [1, 1, 1, 0, 0, 2, 2, 2, 0, 0];
                });
            }else if(player.vx !== 0){
                asyncCall(function(){
                    player.frame = player.walkFrames.shift();
                    player.walkFrames.push(player.frame);
                });
            }else{
                asyncCall(function(){
                    player.frame = 0;
                });
            }
        }.bind(this));
    },
    initPlayerJump: function(player){
        var MAX_SPEED = 6;
        var GRAVITY = 0.4;

        player.jumpCount = 0;

        player.jump = function(){
            if(player.jumpCount === 2)
                return;

            player.vy = -6 - GRAVITY;
            player.jumpCount++;
        }.bind(this);

        player.addEventListener('enterframe', function(){
            player.vy = Math.min(MAX_SPEED, player.vy + GRAVITY);
            if(player.vy === 0)
                return;

            player.y = player.y + player.vy | 0;
            if(this.hitAny([
                player.getTopLeft(), player.getTopRight(),
                player.getBottomLeft(), player.getBottomRight()
            ])){
                do{
                    player.y += player.vy > 0? -1: 1;
                }while(this.hitAny([
                    player.getTopLeft(), player.getTopRight(),
                    player.getBottomLeft(), player.getBottomRight()
                ]));
                if(player.vy > 0)
                    player.jumpCount = 0;
                player.vy = 0;
            }else if(player.vy > GRAVITY * 2 && player.jumpCount === 0){
                player.jumpCount++;
            }
        }.bind(this));
    },
    createApple: function(){
        var apple = new Apple({
            image: this.assets['apple.png'],
            player: this.player,
            map: this.map,
            parent: this.view
        });

        apple.addEventListener('hit',
            this.end.bind(this, 'Hit'));

        apple.addEventListener('fallen', function(){
            this.view.removeChild(apple);
        }.bind(this));

        this.sprites.push(apple);

        return apple;
    },
    createBanana: function(){
        var banana = new Banana({
            image: this.assets['banana.png'],
            player: this.player,
            map: this.map,
            parent: this.view
        });

        banana.addEventListener('hit',
            this.end.bind(this, 'バナナにぶつかった'));

        this.sprites.push(banana);

        return banana;
    },
    createStar: function(){
        var star = new SpriteEx({
            x: -16,
            y: -16,
            width: 16,
            height: 16,
            image: this.assets['star.png'],
            parent: this.view
        });

        this.sprites.push(star);

        star.listenWhile('enterframe', function(){
            if(!Rect.intersect(this.player.getRect(), star.getRect()).area)
                return true;

            this.score += 100;
            this.prestage.stars.push(star.number);
            this.view.removeChild(star);
            this.addChild(star);
            star.x += this.view.x;
            star.y += this.view.y;
            star.opacity = 1;

            star.listenWhile('enterframe', function(){
                star.opacity *= 0.9;
                if(star.opacity < 0.01)
                    star.opacity = 0;

                star.x *= 0.9;
                if(star.x < 8)
                    star.x = 8;

                star.y *= 0.9;
                if(star.y < 8)
                    star.y = 8;

                if(star.opacity === 0 && star.x === 8 && star.y === 8){
                    this.removeChild(star);
                    return false;
                }

                return true;
            }.bind(this));

            return false;
        }.bind(this));

        return star;
    },
    createPad: function(){
        var pad = new Pad();
        pad.x = 0;
        pad.y = 220;
        this.addChild(pad);

        return pad;
    },
    createButton: function(){
        var button = new SpriteEx({
            buttonMode: 'a',
            image: this.assets['zbutton.png'],
            x: 220,
            y: 220,
            width: 100,
            height: 100,
            parent: this
        });

        return button;
    },
    createMessage: function(){
        var message = new TextLabel({
            x: 0,
            width: 320,
            height: 40,
            lineHeight: '40px',
            textAlign: 'center',
            font: 'bold 16px sans-serif',
            color: '#FFF',
            visible: false,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            parent: this
        });

        message._style.textShadow = '0 0 1px #FFF';

        return message;
    },
    showMessage: function(message){
        this.message.text = message;
        this.message.y = 140;
        this.message.visible = true;
    },
    createScoreLabel: function(){
        var scoreLabel = new TextLabel({
            x: 5,
            y: 5,
            width: 155,
            height: 20,
            lineHeight: '20px',
            text: 'SCORE 0',
            color: '#222',
            parent: this
        });

        scoreLabel._style.textShadow = '0 0 1px #FFF';

        return scoreLabel;
    },
    createTimeLabel: function(){
        var timeLabel = new TextLabel({
            x: 160,
            y: 5,
            width: 155,
            height: 20,
            lineHeight: '20px',
            text: 'TIME ${timeLimit}'.format(this),
            textAlign: 'right',
            color: '#222',
            parent: this
        });

        timeLabel._style.textShadow = '0 0 1px #FFF';

        return timeLabel;
    },
    createGoal: function(){
        var goal = new EntityEx({
            parent: this.view
        });

        goal.listenWhile('enterframe', function(){
            if(!Rect.intersect(this.player.getRect(), goal.getRect()).area)
                return true;

            this.cleared = true;
            this.score += 1000 * Math.max(0, 2 - this.prestage.retry);
            this.score += this.time * 10;
            this.end('END');
            return false;
        }.bind(this));

        return goal;
    },
    createMovingFloor: function(data){
        var movingFloor = new MapEx({
            tileWidth: 32,
            tileHeight: 32,
            x: 0,
            y: 0,
            image: this.assets['map.png'],
            data: function(data){
                var result = [], table = {
                    ' ': -1,
                    'G': 19,
                    'g': 17,
                    'l': 18,
                    '{': 0,
                    '-': 1,
                    '}': 2,
                    '(': 10,
                    '0': 11,
                    ')': 12,
                    ',': 20,
                    '_': 21,
                    '.': 22,
                    '[': 30,
                    '=': 31,
                    ']': 32,
                    '^': 3,
                    ':': 13,
                    ';': 23,
                    '#': 33,
                };
                for(var i = 0, l = data.length, j, k; i < l; i++){
                    result.push([]);
                    for(j = 0, k = data[i].length; j < k; j++)
                        result[i].push(table[data[i].charAt(j)]);
                }
                return result;
            }(data),
            parent: this.view
        });

        movingFloor.moveBy = function(dx, dy){
            var pr = this.player.getRect();
            if(pr.bottom + 1 === movingFloor.y &&
                movingFloor.x <= pr.right &&
                pr.x <= movingFloor.x + movingFloor.width){
                this.player.x += dx;
                this.player.y += dy;
            }

            movingFloor.x += dx;
            movingFloor.y += dy;

            var points = [this.player.getTopLeft(), this.player.getTopRight(),
                this.player.getBottomLeft(), this.player.getBottomRight()];
            if(points.some(function(point){
                return movingFloor.hitTest(point.x - movingFloor.x,
                    point.y - movingFloor.y);
            })){
                this.player.x += dx;
                this.player.y += dy;
            }
        }.bind(this);

        this.sprites.push(movingFloor);
        this.movingFloors.push(movingFloor);

        return movingFloor;
    },
    createHint: function(x, y, imageName){
        var hint = new SpriteEx({
            x: x,
            y: y,
            width: 128,
            height: 64,
            image: this.assets[imageName],
            parent: this.view
        });

        return hint;
    }
});

