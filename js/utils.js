// var Point = Class.create({
//     initialize: function(x, y){
//         this.x = x;
//         this.y = y;
//     },
//     x: {
//         get: function(){
//             return this._x;
//         },
//         set: function(value){
//             if(!isFinite(value))
//                 throw TypeError('expected finite number but was ' + value);
//             this._x = value;
//         }
//     },
//     y: {
//         get: function(){
//             return this._y;
//         },
//         set: function(value){
//             if(!isFinite(value))
//                 throw TypeError('expected finite number but was ' + value);
//             this._y = value;
//         }
//     },
//     translate: function(x, y, bang/*=true*/){
//         if(bang != null && !bang)
//             return new Point(this._x + x, this._y + y);
//         this.x += x;
//         this.y += y;
//         return this;
//     },
//     scale: function(x, y, bang/*=true*/){
//         if(bang != null && !bang)
//             return new Point(this._x * x, this._y * y);
//         this.x *= x;
//         this.y *= y;
//         return this;
//     },
//     rotate: function(deg, bang/*=true*/){
//         return this.rotateRad(deg * Math.PI / 180, bang);
//     },
//     rotateR: function(rad, bang/*=true*/){
//         var x = this._x, y = this._y, s = Math.sin(rad), c = Math.cos(rad);
//         if(bang != null && !bang)
//             return new Point(x * c - y * s, x * s + y * c);
//         this.x = x * c - y * s;
//         this.y = x * s + y * c;
//         return this;
//     },
//     matrix: function(m, bang/*=true*/){
//         var x = this._x, y = this._y;
//         if(bang != null && !bang)
//             return new Point(x * m[0] + y * m[1] + m[2],
//                 x * m[3] + y * m[4] + m[5]);
//         this.x = x * m[0] + y * m[1] + m[2];
//         this.y = x * m[3] + y * m[4] + m[5];
//         return this;
//     },
//     distance: function(x, y){
//         var x = this._x - x, y = this._y - y;
//         return Math.sqrt(x * x, y * y);
//     },
//     clone: function(){
//         return new Point(this._x, this._y);
//     }
// });

// Point.fromObject = function(object){
//     Point.call(this, object.x, object.y);
// };
// Point.fromObject.prototype = Point.prototype;

// Point.distance = function(a, b){
//     var x = a.x - b.x, y = a.y - b.y;
//     return Math.sqrt(x * x + y * y);
// };

// Point.middlePoint = function(a, b){
//     return new Point((a.x + b.x) / 2, (a.y + b.y) / 2);
// };


// var Rect = Class.create({
//     initialize: function(x, y, width, height){
//         this.x = x;
//         this.y = y;
//         this.width = width;
//         this.height = height;
//     },
//     x: {
//         get: function(){
//             return this._x;
//         },
//         set: function(value){
//             if(!isFinite(value)){
//                 throw AssertionError(
//                     'expected a finite number but was ' + value);
//             }

//             this._x = value;
//         }
//     },
//     y: {
//         get: function(){
//             return this._y;
//         },
//         set: function(value){
//             if(!isFinite(value)){
//                 throw AssertionError(
//                     'expected a finite number but was ' + value);
//             }

//             this._y = value;
//         }
//     },
//     width: {
//         get: function(){
//             return this._width;
//         },
//         set: function(value){
//             if(!isFinite(value)){
//                 throw AssertionError(
//                     'expected a finite number but was ' + value);
//             }

//             if(value < 0){
//                 this._x -= this._width = -value;
//             }else{
//                 this._width = value;
//             }
//         }
//     },
//     height: {
//         get: function(){
//             return this._height;
//         },
//         set: function(value){
//             if(!isFinite(value)){
//                 throw AssertionError(
//                     'expected a finite number but was ' + value);
//             }

//             if(value < 0){
//                 this._y = this._height = -value;
//             }else{
//                 this._height = value;
//             }
//         }
//     },
//     left: {
//         get: function(){
//             return this._x;
//         },
//         set: function(value){
//             var right = this.right;

//             if(right <= value){
//                 this._width = 0;
//                 this._x = right;
//             }else{
//                 this.width = right - value;
//                 this._x = value;
//             }
//         }
//     },
//     top: {
//         get: function(){
//             return this._y;
//         },
//         set: function(value){
//             var bottom = this.bottom;

//             if(bottom <= value){
//                 this._height = 0;
//                 this._y = bottom;
//             }else{
//                 this.height = bottom - value;
//                 this._y = value;
//             }
//         }
//     },
//     right: {
//         get: function(){
//             return this._x + this._width;
//         },
//         set: function(value){
//             if(value <= this._x){
//                 this._width = 0;
//             }else{
//                 this.width = value - this._x;
//             }
//         }
//     },
//     bottom: {
//         get: function(){
//             return this._y + this._height;
//         },
//         set: function(value){
//             if(value <= this._y){
//                 this._height = 0;
//             }else{
//                 this.height = value - this._y;
//             }
//         }
//     },
//     area: {
//         get: function(){
//             return this._width * this._height;
//         }
//     },
//     centerPoint: {
//         get: function(){
//             return new Point(this._x + this._width / 2,
//                 this._y + this._height / 2);
//         }
//     },
//     points: {
//         get: function(callback){
//             var result = [], right = this.right, bottom = this.bottom;

//             for(var x, y = 0; y < bottom; y++){
//                 for(x = 0; x < right; x++)
//                     result.push(new Point(x, y));
//             }

//             return result;
//         }
//     },
//     splitVertically: function(count){
//         if(count == null){
//             count = 2;
//         }else if(count === 1){
//             return [this];
//         }

//         var x = this._x,
//             y = this._y,
//             width = this._width,
//             height = this._height,
//             h = Math.round(height / count);

//         var top = new Rect(x, y, width, h);
//         var rest = new Rect(x, top.bottom, width, height - h);

//         return [top].concat(rest.splitVertically(count - 1));
//     },
//     splitHorizontally: function(count){
//         if(count == null){
//             count = 2;
//         }else if(count === 1){
//             return [this];
//         }

//         var x = this._x,
//             y = this._y,
//             width = this._width,
//             height = this._height,
//             w = Math.round(width / count);

//         var left = new Rect(x, y, w, height);
//         var rest = new Rect(left.right, y, width - w, height);

//         return [left].concat(rest.splitHorizontally(count - 1));
//     },
//     clone: function(){
//         return new Rect(this._x, this._y, this._width, this._height);
//     }
// });

// Rect.fromObject = function(object){
//     Rect.call(this, object.x, object.y, object.width, object.height);
// };
// Rect.fromObject.prototype = Rect.prototype;

// Rect.intersect = function(b){
//     for(var a, x, y, i = 1, l = arguments.length; i < l; i++){
//         a = b;
//         b = arguments[i];
//         x = Math.max(a.x, b.x);
//         y = Math.max(a.y, b.y);
//         b = new Rect(x, y, Math.max(0, Math.min(a.right, b.right) - x),
//             Math.max(0, Math.min(a.bottom, b.bottom) - y));
//     }

//     return b;
// };


enchant();
var menuMaker = function(resource, h, callback){
    var label = new Sprite(250,50);
    label.image = game.assets[resource];
    label.x = Math.floor(game.width / 2) - Math.floor(label.width/2);
    label.y = h;
    this.callback = callback;
    self = this;

    label.addEventListener(enchant.Event.TOUCH_START, function (e) {
        game.removeScene(game.currentScene);
        callback.call(null);
    });
    return label;
}

var Timeout = Class.create({
    initialize: function(delay, callback){
        this._delay = delay;
        this._time = Date.now() + delay;
        this._callback = callback;
        this._cleared = false;
        this._paused = true;
        this._pausedTime = Date.now();
        this.resume();
    },
    cleared: {
        get: function(){ return this._cleared; }
    },
    paused: {
        get: function(){ return this._paused; }
    },
    clear: function(){
        if(this.cleared)
            return;

        this.pause();
        this._cleared = true;
    },
    pause: function(){
        if(this.cleared || this.paused)
            return;
        clearTimeout(this._id);
        this._paused = true;
        this._pausedTime = Date.now();
    },
    resume: function(){
        if(this.cleared || !this.paused)
            return;
        this._paused = false;
        this._time += Date.now() - this._pausedTime;
        this._id = setTimeout(function(){
            this._cleared = true;
            this._callback.call(null);
        }.bind(this), this._time - Date.now());
    }
});

var Interval = Class.create(Timeout, {
    initialize: function(delay, callback){
        Timeout.call(this, delay, callback);
    },
    resume: function(){
        if(this.cleared || !this.paused)
            return;
        this._paused = false;
        this._time += Date.now() - this._pausedTime;
        this._id = setTimeout(function func(){
            this._time = Date.now() + this._delay;
            this._id = setTimeout(func.bind(this), this._delay);
            this._callback.call(null);
        }.bind(this), this._time - Date.now());
    }
});


Scene.prototype.setTimeout = function(time, callback){
    var timeout = new Timeout(time, function(){
        callback.call(this);
        this.removeEventListener('exit', pause);
        this.removeEventListener('unstack', clear);
    }.bind(this));

    var pause = function(){ timeout.pause(); };
    var clear = function(){ timeout.clear(); };

    this.addEventListener('exit', pause);
    this.addEventListener('unstack', clear);

    timeout.clear = function(scene, clear){
        return function(){
            scene.removeEventListener('exit', pause);
            scene.removeEventListener('unstack', clear);
            clear.call(this);
        };
    }(this, timeout.clear);

    return timeout;
};

Scene.prototype.setInterval = function(time, callback){
    var interval = new Interval(time, function(){
        callback.call(this);
        this.removeEventListener('exit', pause);
        this.removeEventListener('unstack', clear);
    }.bind(this));

    var pause = function(){ interval.pause(); };
    var clear = function(){ interval.clear(); };

    this.addEventListener('exit', pause);
    this.addEventListener('unstack', clear);

    interval.clear = function(scene, clear){
        return function(){
            scene.removeEventListener('exit', pause);
            scene.removeEventListener('unstack', clear);
            clear.call(this);
        };
    }(this, interval.clear);

    return interval;
};

Game.prototype.endGame = function(text){
    obj = this.assets["music/die.wav"].clone();
    obj.volume = 1;
    obj.play();
    var endScene = Scene();
    var sp = new Sprite(255, 125);
    sp.image = this.assets['assets/menu/game-over.png'];
    // endScene.backgroundColor = 'rgba(255,255,255,0.7)';
    sp.opacity = 0.1;
    sp.frame = 0;
    sp.x = Math.floor(game.width / 2) - Math.floor(sp.width/2);
    sp.y = Math.floor(game.height / 2) - Math.floor(sp.height/2);
    endScene.width = this.width;
    endScene.height = this.height;
    endScene.addChild(sp);

    sp.tl.fadeTo(1, 25);
    this.pushScene(endScene);
};

Game.prototype.winGame = function(asset) {
    var endScene = Scene();
    var sp = new Sprite(255, 125);
    sp.image = this.assets[asset];
    endScene.backgroundColor = 'rgba(255,255,255,0.7)';
    sp.frame = 0;
    sp.x = Math.floor(game.width / 2) - Math.floor(sp.width/2);
    sp.y = Math.floor(game.height / 2) - Math.floor(sp.height/2);
    endScene.width = this.width;
    endScene.height = this.height;
    endScene.addChild(sp);
    this.pushScene(endScene);
};

Game.prototype.showMessage = function(asset) {
    var endScene = Scene();
    var sp = new Sprite(255, 125);
    sp.image = this.assets[asset];
    // endScene.backgroundColor = 'rgba(255,255,255,0.3)';
    sp.opacity = 0.1;
    sp.frame = 0;
    sp.x = Math.floor(game.width / 2) - Math.floor(sp.width/2);
    sp.y = Math.floor(game.height / 2) - Math.floor(sp.height/2);
    endScene.width = this.width;
    endScene.height = this.height;
    endScene.addChild(sp);
    this.pushScene(endScene);
    sp.tl.fadeTo(1, 25).then((function() { this.removeScene(endScene); }).bind(this));
};

var HealthBar = Class.create( Group, {
    initialize: function(args){
        Group.call(this, {});

        this.x= args.x;
        this.y= args.y;
        this.stage = args.stage;
        this.player = args.player;
        this.points = [];
        for (var i = 0; i <= 4; i++) {
            this.points[i] = new  Sprite(16,16);
            this.points[i].image = game.assets['assets/health-sprite.png'];
            this.points[i].x = 18*i +15;
            this.points[i].y = 10;
            this.stage.addChild(this.points[i])
        };
        // this.resetLifePoints(0);
    },
    displace: function(val){
        for (var i = 0; i <= 4; i++) {
            this.points[i].x = (18*i) + (-1*val) + 15;
        };
    },
    resetLifePoints: function(val){
        for (var i = 0; i <= 4; i++) {
            this.points[i].frame = val;
        }
    },
    setPoints: function(playerLife){
        switch(playerLife){
            case 1:
                this.resetLifePoints(2);
                this.points[0].frame = 1;
                break;
            case 2:
                this.resetLifePoints(2);
                this.points[0].frame = 0;
                break;
            case 3:
                this.resetLifePoints(2);
                this.points[0].frame = 0;
                this.points[1].frame = 1;
                break;
            case 4:
                this.resetLifePoints(2);
                this.points[0].frame = 0;
                this.points[1].frame = 0;
                break;
            case 5:
                this.resetLifePoints(2);
                this.points[0].frame = 0;
                this.points[1].frame = 0;
                this.points[2].frame = 1;
                break;
            case 6:
                this.resetLifePoints(2);
                this.points[0].frame = 0;
                this.points[1].frame = 0;
                this.points[2].frame = 0;
                break;
            case 7:
                this.resetLifePoints(2);
                this.points[0].frame = 0;
                this.points[1].frame = 0;
                this.points[2].frame = 0;
                this.points[3].frame = 1;
                break;
            case 8:
                this.resetLifePoints(2);
                this.points[0].frame = 0;
                this.points[1].frame = 0;
                this.points[2].frame = 0;
                this.points[3].frame = 0;
                break;
            case 9:
                this.resetLifePoints(2);
                this.points[0].frame = 0;
                this.points[1].frame = 0;
                this.points[2].frame = 0;
                this.points[3].frame = 0;
                this.points[4].frame = 1;
                break;
            case 10:
                this.resetLifePoints(0);
                break;
        }
    }
});



var Fruit = Class.create( Sprite, {
    initialize: function(args){
        Sprite.call(this, {
        });

        this.x= args.x;
        this.y= args.y;
        this.width= args.width;
        this.val = args.val;
        this.image= args.image;
        this.height= args.height;

        this.player = args.player;
        this.map = args.map;
        this.stage = args.stage;
        this.game = args.game;
        self = this;


        this.addEventListener('enterframe',(function(){
            if( this.intersect(this.player) ){
                game.assets["music/eat.wav"].clone().play();

                if(this.player.life < 10){
                    this.player.life = this.player.life + this.val;

		    if(this.player.life === 11)
			this.player.life--;
                }

                this.stage.removeChild(this);
            }
        }).bind(this));
    }
});


