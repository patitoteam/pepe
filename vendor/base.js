
void function(enchant){
    var Class = enchant.Class,
        EventTarget = enchant.EventTarget,
        Game = enchant.Game,
        Scene = enchant.Scene,
        Surface = enchant.Surface,
        Entity = enchant.Entity,
        Sprite = enchant.Sprite,
        Label = enchant.Label,
        Map = enchant.Map,
        chick307 = enchant.chick307 || (enchant.chick307 = {});


    String.prototype.padLeft = function(length, char){
        if(char == null)
            char = ' ';

        var result = [this];
        var i = Math.max(0, length - this.length);
        while(i--)
            result.unshift(char);

        return result.join('');
    };


    String.prototype.format = function(arg){
        if(arg == null)
            args = {};

        var result = [];
        for(var i = 0, l = this.length, c, d; i < l; i++){
            c = this.charAt(i);
            if(c !== '$'){
                result.push(c);
            }else{
                c = this.charAt(++i);
                if(c === '$'){
                    result.push('$');
                }else if(c === '.'){
                    result.push(arg);
                }else if(c !== '{'){
                    result.push('$', c);
                }else{
                    d = [];
                    while(++i < l && (c = this.charAt(i)) !== '}')
                        d.push(c);
                    result.push(arg[d.join('')]);
                }
            }
        }

        return result.join('');
    };


    if(!Function.prototype.bind){
        Function.prototype.bind = function(thisObject){
            if(!(this instanceof Function))
                throw TypeError();

            var func = this,
                args = Array.prototype.slice.call(arguments, 1),
                nop = function(){};

            var bound = function(){
                var t = this instanceof nop? this: thisObject || window,
                    a = args.concat(Array.prototype.slice.call(arguments));
                return func.apply(t, a);
            };

            nop.prototype = this.prototype;
            bound.prototype = new nop();

            return bound;
        };
    }

    if(!Function.prototype.once){
        Function.prototype.once = function(){
            var func = this, called = false, result;
            return function(){
                if(!called){
                    called = true;
                    result = func.apply(this,
                        Array.prototype.slice.call(arguments));
                }
                return result;
            };
        };
    }


    if(!EventTarget.prototype.addOnceListener){
        EventTarget.prototype.addOnceListener = function(types, listener){
            var func = function(event){
                listener.call(this, event);
                asyncCall(function(){
                    this.removeEventListener(event.type, func);
                });
            }.once();

            this.addEventListener(types, func);

            return func;
        };
    }

    if(!EventTarget.prototype.listenWhile){
        EventTarget.prototype.listenWhile = function(types, listener){
            var end = false;
            var func = function(event){
                if(end)
                    return;

                var result = listener.call(this, event);
                if(!result){
                    end = true;
                    asyncCall(function(){
                        this.removeEventListener(event.type, func);
                    });
                }
            };

            this.addEventListener(types, func);

            return func;
        };
    }

    EventTarget.prototype.addEventListener = function(addEventListener){
        return function(types, listener){
            if(!(types instanceof Array))
                types = [types];

            types.forEach(function(type){
                addEventListener.call(this, type, listener);
            }, this);
        };
    }(EventTarget.prototype.addEventListener);


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

    if(!Game.prototype.end){
        Game.prototype.end = function(score, result){
            this.stop();

            // For 9leap.net
            if(location.hostname === 'r.jsgames.jp'){
                var gameId = location.pathname.match(/^\/games\/(\d+)/)[1];

                location.replace('http://9leap.net/games/' + gameId + '/result' +
                    '?score=' + encodeURIComponent(score) +
                    '&result=' + encodeURIComponent(result));
            }
        };
    }

    if(!Game.prototype.enablePageVisibilitySwitch){
        Game.prototype.enablePageVisibilitySwitch = function(){
            var game = this;

            return [null, 'webkit', 'moz', 'ms'].some(function(vender){
                var hiddenKey = vender == null? 'hidden': vender + 'Hidden';
                if(typeof document[hiddenKey] === 'undefined')
                    return false;

                var eventType = (vender || '') + 'visibilitychange';
                document.addEventListener(eventType, function(){
                    if(document[hiddenKey]){
                        game.pause();
                    }else{
                        game.resume();
                    }
                });

                return true;
            });
        };
    }

    Game.prototype.pushScene = function(pushScene){
        return function(scene){
            var result = pushScene.call(this, scene);
            this.currentScene.dispatchEvent(new Event('stack'));
            return result;
        };
    }(Game.prototype.pushScene);

    Game.prototype.popScene = function(popScene){
        return function(scene){
            this.currentScene.dispatchEvent(new Event('unstack'));
            return popScene.call(this);
        };
    }(Game.prototype.popScene);


    var asyncCall = chick307.asyncCall = function(){
        if(typeof setImmediate === 'function'){
            return function(func, thisObject){
                var args = Array.prototype.slice.call(arguments, 2);

                setImmediate(function(){
                    func.apply(thisObject, args);
                });
            };
        }else if(typeof MessageChannel === 'function'){
            var channel = new MessageChannel(), queue = [];

            channel.port1.onmessage = function(){
                queue.shift()();
            };

            return function(func, thisObject){
                var args = Array.prototype.slice.call(arguments, 2);
                channel.port2.postMessage(0);
                queue.push(function(){
                    func.apply(thisObject, args);
                });
            };
        }else{
            return function(func, thisObject){
                var args = Array.prototype.slice.call(arguments, 2);

                setTimeout(function(){
                    func.apply(thisObject, args);
                }, 0);
            };
        }
    }();


    chick307.AssertionError = function(message){
        var error = Error(message);
        error.name = 'AssertionError';
        return error;
    };


    var Promise = chick307.Promise = Class.create({
        initialize: function(callback){
            this._state = 0;
            this._callbacks = [];

            if(callback != null)
                callback.call(null, this);
        },
        resolved: {
            get: function(){
                return this._state === 1;
            }
        },
        rejected: {
            get: function(){
                return this._state === 2;
            }
        },
        resolve: function(value){
            if(this._state !== 0)
                return;

            this._value = value;
            this._state = 1;

            for(var i = 0, l = this._callbacks.length; i < l; i++)
                asyncCall(this._callbacks[i], null, void 0, value);
            this._callbacks = null;
        },
        reject: function(value){
            if(this._state !== 0)
                return;

            this._value = value;
            this._state = 2;

            for(var i = 0, l = this._callbacks.length; i < l; i++)
                asyncCall(this._callbacks[i], null, value);
            this._callbacks = null;
        },
        then: function(callback){
            switch(this._state){
                case 0:
                    this._callbacks.push(callback);
                    break;
                case 1:
                    asyncCall(callback, null, void 0, this._value);
                    break;
                case 2:
                    asyncCall(callback, null, this._value);
                    break;
            }

            return this;
        },
        bind: function(callback){
            var promise = new Promise();

            this.then(function(error, value){
                if(error !== void 0){
                    promise.reject(error);
                }else{
                    try{
                        callback.call(null, promise, value);
                    }catch(err){
                        promise.reject(err);
                    }
                }
            });

            return promise;
        },
        except: function(callback){
            var promise = new Promise();

            this.then(function(error, value){
                if(error !== void 0){
                    try{
                        callback.call(null, promise, error);
                    }catch(err){
                        promise.reject(err);
                    }
                }else{
                    promise.resolve(value);
                }
            });

            return promise;
        }
    });


    var Transition = chick307.Transition = Class.create({
        initialize: function(args){
            this.from = args.from;
            this.to = args.to;
            this.duration = args.duration;
            this.timing = args.timing || Transition.timing.linear;
        },
        alternate: function(count){
            if(count == null)
                count = 1 / 0;

            var timing = this.timing,
                duration = this.duration,
                from = this.from,
                delta = this.to - this.from;

            return new TransitingValue(function(passedTime){
                var t = passedTime / duration;
                t = (count < t? Math.max(0, count): t) % 2;
                return from + delta * timing(t > 1? 2 - t: t);
            });
        },
        repeat: function(count){
            if(count == null)
                count = 1 / 0;

            var timing = this.timing,
                duration = this.duration,
                from = this.from,
                delta = this.to - this.from;

            return new TransitingValue(function(passedTime){
                var t = passedTime / duration;
                t = (count < t? Math.max(0, count): t) % 1;
                return from + delta * timing(t);
            });
        },
        start: function(){
            var timing = this.timing,
                duration = this.duration,
                from = this.from,
                delta = this.to - this.from;

            return new TransitingValue(function(passedTime){
                var t = Math.min(1, passedTime / duration);
                return from + delta * timing(t);
            });
        }
    });

    Transition.timing = {
        linear: function(x){
            return x;
        },
        easeIn: function(x){
            return x * x;
        },
        easeOut: function(x){
            return Math.sqrt(x);
        }
    };


    var TransitingValue = chick307.TransitingValue = Class.create({
        initialize: function(valueOf){
            this._valueOf = valueOf;
            this._startTime = Date.now();
            this._pausedTime = 0;
        },
        pause: function(){
            if(this._pausedTime)
                return;
            this._pausedTime = Date.now();
        },
        resume: function(){
            if(!this._pausedTime)
                return;
            this._startTime += Date.now() - this._pausedTime;
            this._pausedTime = 0;
        },
        rollback: function(time){
            this._startTime = Math.min(Date.now(), this._startTime + time);
        },
        bind: function(func){
            return new BoundTransitingValue(this, func);
        },
        valueOf: function(){
            var now = this._pausedTime || Date.now();
            return this._valueOf(now - this._startTime);
        }
    });


    var BoundTransitingValue = chick307.BoundTransitingValue = Class.create({
        initialize: function(value, func){
            this._value = value;
            this._func = func;
        },
        pause: function(){
            this._value.pause();
        },
        resume: function(){
            this._value.resume();
        },
        rollback: function(time){
            this._value.rollback(time);
        },
        bind: function(func){
            return new BoundTransitingValue(this, func);
        },
        valueOf: function(){
            return this._func(this._value.valueOf());
        }
    });


    var EntityEx = chick307.EntityEx = Class.create(Entity, {
        initialize: function(args){
            Entity.call(this);

            this.setProperties(args || {}, []);
        },
        setProperties: function(args, properties){
            properties.concat([
                'backgroundColor',
                'buttonMode',
                'touchEnabled',
                'id',
                'className',
                'opacity',
                'visible',
                'width',
                'height',
                'x',
                'y',
            ]).forEach(function(key){
                if(key in args)
                    this[key] = args[key];
            }, this);

            if('parent' in args)
                args.parent.addChild(this);
        },
        getRect: function(){
            return new Rect(this.x, this.y, this.width, this.height);
        }
    });


    var SplashScene = chick307.SplashScene = Class.create(Scene, {
        initialize: function(args){
            Scene.call(this);

            var properties = [
                'backgroundColor',
                'image'
            ];

            properties.forEach(function(key){
                if(key in args)
                    this[key] = args[key];
            }, this);
        },
        image: {
            get: function(){
                return this._image;
            },
            set: function(value){
                if(this._sprite)
                    this.removeChild(this._sprite);
                this._sprite = null;

                this._image = value;

                if(value){
                    this._sprite = new Sprite(value.width, value.height);
                    this._sprite.image = value;
                    this._sprite.x = (this.width - value.width) >> 1;
                    this._sprite.y = (this.height - value.height) >> 1;
                    this.addChild(this._sprite);
                }
            }
        }
    });


    var TextLabel = chick307.TextLabel = Class.create(Label, {
        initialize: function(args){
            Label.call(this, '');

            EntityEx.prototype.setProperties.call(this, args || {}, [
                'color',
                'font',
                'text',
                'textAlign',
                'lineHeight'
            ]);
        },
        lineHeight: {
            get: function(){
                return this._style.lineHeight;
            },
            set: function(value){
                this._style.lineHeight = value;
            }
        }
    });


    var MessageLabel = chick307.MessageLabel = Class.create(TextLabel, {
        initialize: function(args){
            TextLabel.call(this, args);

            this.fadeInTime = args.fadeInTime || args.fadeTime || 300;
            this.fadeOutTime = args.fadeOutTime || args.fadeTime || 300;
            this.text = '';
            this.opacity = 0;

            this._shown = false;
            this._queue = [];
        },
        showMessage: function(message, time){
            var label = this,
                queue = this._queue;

            if(this._shown){
                queue.push({
                    message: message,
                    time: time
                });
            }else{
                this.text = message;
                this._shown = true;
                this._fadeIn(this.fadeInTime).then(function(){
                    label.scene.setTimeout(time, function(){
                        label._fadeOut(label.fadeOutTime).then(function(){
                            label._shown = false;
                            if(queue.length > 0){
                                var q = queue.shift();
                                label.showMessage(q.message, q.time);
                            }
                        });
                    });
                });
            }
        },
        _fadeIn: function(time){
            var promise = new Promise(),
                startTime = Date.now(),
                label = this;

            this.opacity = 0;
            this.addEventListener('enterframe', onframe);
            this.scene.setTimeout(time, function(){
                label.opacity = 1;
                label.removeEventListener('enterframe', onframe);
                promise.resolve();
            });

            return promise;

            function onframe(){
                var t = Date.now() - startTime;
                this.opacity = Math.min(1, t / time);
            }
        },
        _fadeOut: function(time){
            var promise = new Promise(),
                startTime = Date.now(),
                label = this;

            this.opacity = 1;
            this.addEventListener('enterframe', onframe);
            this.scene.setTimeout(time, function(){
                label.opacity = 0;
                label.removeEventListener('enterframe', onframe);
                promise.resolve();
            });

            return promise;

            function onframe(){
                var t = Date.now() - startTime;
                this.opacity = Math.max(0, 1 - t / time);
            }
        }
    });


    var Button = chick307.Button = Class.create(TextLabel, {
        initialize: function(args){
            TextLabel.call(this, args);

            if(!('textAlign' in args))
                this.textAlign = 'center';

            var style = this._style;
            style.border = '2px solid rgba(0, 0, 0, 0.2)';
            style.borderRadius = '5px';
            style.cursor = 'default';
            style.webkitBozSizing = 'border-box';
            style.MozBozSizing = 'border-box';
            style.bozSizing = 'border-box';
        }
    });


    var SpriteEx = chick307.SpriteEx = Class.create(Sprite, {
        initialize: function(args){
            var width = args.width, height = args.height;
            Sprite.call(this, width, height);

            EntityEx.prototype.setProperties.call(this, args, [
                'frame',
                'image',
                'rotation',
                'scaleX',
                'scaleY'
            ]);
        },
        getRect: EntityEx.prototype.getRect
    });


    var Canvas2D = chick307.Canvas2D = Class.create(SpriteEx, {
        initialize: function(args){
            SpriteEx.call(this, args);

            this.image = new Surface(this.width, this.height);
            this.context = this.image.context;
        },
        lineWidth: {
            get: function(){ return this.context.lineWidth; },
            set: function(value){ this.context.lineWidth = value; }
        },
        fillStyle: {
            get: function(){ return this.context.fillStyle; },
            set: function(value){ this.context.fillStyle = value; }
        },
        save: function(){
            this.context.save();
            return this;
        },
        restore: function(){
            this.context.restore();
            return this;
        },
        clear: function(){
            this.image.clear();
            return this;
        },
        scale: function(x, y){
            this.context.scale(x, y);
            return this;
        },
        beginPath: function(){
            this.context.beginPath();
            return this;
        },
        closePath: function(){
            this.context.closePath();
            return this;
        },
        moveTo: function(x, y){
            this.context.moveTo(x, y);
            return this;
        },
        lineTo: function(x, y){
            this.context.lineTo(x, y);
            return this;
        },
        bezierCurveTo: function(a, b, c, d, e, f){
            this.context.bezierCurveTo(a, b, c, d, e, f);
            return this;
        },
        arc: function(x, y, radius, start, end, ac){
            this.context.arc(x, y, radius, start || 0,
                end == null? 2 * Math.PI: end, !!ac);
            return this;
        },
        fill: function(){
            this.context.fill();
            return this;
        },
        stroke: function(){
            this.context.stroke();
            return this;
        },
        draw: function(image, sx, sy, sw, sh, dx, dy, dw, dh){
            this.image.draw(image, sx, sy, sw, sh, dx, dy, dw, dh);
            return this;
        }
    });


    var ImageLabel = chick307.ImageLabel = Class.create(Canvas2D, {
        initialize: function(args){
            Canvas2D.call(this, args);

            var tileWidth = args.tileWidth,
                tileHeight = args.tileHeight,
                sprite = args.sprite,
                charMap = args.charMap,
                text = args.text || '';

            this._text = text;
            this.setSprite(sprite, tileWidth, tileHeight, charMap);
        },
        setSprite: function(sprite, tileWidth, tileHeight, charMap){
            this._sprite = sprite;
            this._tileWidth = tileWidth;
            this._tileHeight = tileHeight;
            this._charMap = charMap;
            this.text = this._text;
        },
        text: {
            get: function(){
                return this._text;
            },
            set: function(value){
                this._text = value;

                var surface = this.image,
                    c = this._charMap,
                    s = this._sprite,
                    w = this._tileWidth,
                    h = this._tileHeight;

                surface.clear();
                for(var i = 0, l = value.length, f; i < l; i++){
                    f = c.indexOf(value.charAt(i));
                    surface.draw(s, f * w, 0, w, h, i * w, 0, w, h);
                }
            }
        }
    });


    var MapEx = chick307.MapEx = Class.create(Map, {
        initialize: function(args){
            var tileWidth = args.tileWidth, tileHeight = args.tileHeight;
            Map.call(this, tileWidth, tileHeight);

            if('data' in args)
                this.loadData(args.data);

            EntityEx.prototype.setProperties.call(this, args, [
                'image',
                'collisionData'
            ]);
        }
    });


    var Point = chick307.Point = Class.create({
        initialize: function(x, y){
            this.x = x;
            this.y = y;
        },
        x: {
            get: function(){
                return this._x;
            },
            set: function(value){
                if(!isFinite(value))
                    throw TypeError('expected finite number but was ' + value);
                this._x = value;
            }
        },
        y: {
            get: function(){
                return this._y;
            },
            set: function(value){
                if(!isFinite(value))
                    throw TypeError('expected finite number but was ' + value);
                this._y = value;
            }
        },
        translate: function(x, y, bang/*=true*/){
            if(bang != null && !bang)
                return new Point(this._x + x, this._y + y);
            this.x += x;
            this.y += y;
            return this;
        },
        scale: function(x, y, bang/*=true*/){
            if(bang != null && !bang)
                return new Point(this._x * x, this._y * y);
            this.x *= x;
            this.y *= y;
            return this;
        },
        rotate: function(deg, bang/*=true*/){
            return this.rotateRad(deg * Math.PI / 180, bang);
        },
        rotateR: function(rad, bang/*=true*/){
            var x = this._x, y = this._y, s = Math.sin(rad), c = Math.cos(rad);
            if(bang != null && !bang)
                return new Point(x * c - y * s, x * s + y * c);
            this.x = x * c - y * s;
            this.y = x * s + y * c;
            return this;
        },
        matrix: function(m, bang/*=true*/){
            var x = this._x, y = this._y;
            if(bang != null && !bang)
                return new Point(x * m[0] + y * m[1] + m[2],
                    x * m[3] + y * m[4] + m[5]);
            this.x = x * m[0] + y * m[1] + m[2];
            this.y = x * m[3] + y * m[4] + m[5];
            return this;
        },
        distance: function(x, y){
            var x = this._x - x, y = this._y - y;
            return Math.sqrt(x * x, y * y);
        },
        clone: function(){
            return new Point(this._x, this._y);
        }
    });

    Point.fromObject = function(object){
        Point.call(this, object.x, object.y);
    };
    Point.fromObject.prototype = Point.prototype;

    Point.distance = function(a, b){
        var x = a.x - b.x, y = a.y - b.y;
        return Math.sqrt(x * x + y * y);
    };

    Point.middlePoint = function(a, b){
        return new Point((a.x + b.x) / 2, (a.y + b.y) / 2);
    };


    var Rect = chick307.Rect = Class.create({
        initialize: function(x, y, width, height){
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        },
        x: {
            get: function(){
                return this._x;
            },
            set: function(value){
                if(!isFinite(value)){
                    throw AssertionError(
                        'expected a finite number but was ' + value);
                }

                this._x = value;
            }
        },
        y: {
            get: function(){
                return this._y;
            },
            set: function(value){
                if(!isFinite(value)){
                    throw AssertionError(
                        'expected a finite number but was ' + value);
                }

                this._y = value;
            }
        },
        width: {
            get: function(){
                return this._width;
            },
            set: function(value){
                if(!isFinite(value)){
                    throw AssertionError(
                        'expected a finite number but was ' + value);
                }

                if(value < 0){
                    this._x -= this._width = -value;
                }else{
                    this._width = value;
                }
            }
        },
        height: {
            get: function(){
                return this._height;
            },
            set: function(value){
                if(!isFinite(value)){
                    throw AssertionError(
                        'expected a finite number but was ' + value);
                }

                if(value < 0){
                    this._y = this._height = -value;
                }else{
                    this._height = value;
                }
            }
        },
        left: {
            get: function(){
                return this._x;
            },
            set: function(value){
                var right = this.right;

                if(right <= value){
                    this._width = 0;
                    this._x = right;
                }else{
                    this.width = right - value;
                    this._x = value;
                }
            }
        },
        top: {
            get: function(){
                return this._y;
            },
            set: function(value){
                var bottom = this.bottom;

                if(bottom <= value){
                    this._height = 0;
                    this._y = bottom;
                }else{
                    this.height = bottom - value;
                    this._y = value;
                }
            }
        },
        right: {
            get: function(){
                return this._x + this._width;
            },
            set: function(value){
                if(value <= this._x){
                    this._width = 0;
                }else{
                    this.width = value - this._x;
                }
            }
        },
        bottom: {
            get: function(){
                return this._y + this._height;
            },
            set: function(value){
                if(value <= this._y){
                    this._height = 0;
                }else{
                    this.height = value - this._y;
                }
            }
        },
        area: {
            get: function(){
                return this._width * this._height;
            }
        },
        centerPoint: {
            get: function(){
                return new Point(this._x + this._width / 2,
                    this._y + this._height / 2);
            }
        },
        points: {
            get: function(callback){
                var result = [], right = this.right, bottom = this.bottom;

                for(var x, y = 0; y < bottom; y++){
                    for(x = 0; x < right; x++)
                        result.push(new Point(x, y));
                }

                return result;
            }
        },
        splitVertically: function(count){
            if(count == null){
                count = 2;
            }else if(count === 1){
                return [this];
            }

            var x = this._x,
                y = this._y,
                width = this._width,
                height = this._height,
                h = Math.round(height / count);

            var top = new Rect(x, y, width, h);
            var rest = new Rect(x, top.bottom, width, height - h);

            return [top].concat(rest.splitVertically(count - 1));
        },
        splitHorizontally: function(count){
            if(count == null){
                count = 2;
            }else if(count === 1){
                return [this];
            }

            var x = this._x,
                y = this._y,
                width = this._width,
                height = this._height,
                w = Math.round(width / count);

            var left = new Rect(x, y, w, height);
            var rest = new Rect(left.right, y, width - w, height);

            return [left].concat(rest.splitHorizontally(count - 1));
        },
        clone: function(){
            return new Rect(this._x, this._y, this._width, this._height);
        }
    });

    Rect.fromObject = function(object){
        Rect.call(this, object.x, object.y, object.width, object.height);
    };
    Rect.fromObject.prototype = Rect.prototype;

    Rect.intersect = function(b){
        for(var a, x, y, i = 1, l = arguments.length; i < l; i++){
            a = b;
            b = arguments[i];
            x = Math.max(a.x, b.x);
            y = Math.max(a.y, b.y);
            b = new Rect(x, y, Math.max(0, Math.min(a.right, b.right) - x),
                Math.max(0, Math.min(a.bottom, b.bottom) - y));
        }

        return b;
    };


    var random = chick307.random = function(){
        return Math.random();
    };

    random.int = function(/*min=0, */max){
        var min = 0;
        if(arguments.length > 1){
            min = max;
            max = arguments[1];
        }

        min = [Math.min(min, max), max = Math.max(min, max) | 0][0] | 0;
        return min + random() * (max - min + 1) | 0;
    };

    random.choice = function(array){
        var length = array.length;
        return array[Math.floor(length * random())];
    };


    var merge = chick307.merge = function(objects){
        var result = {};
        objects.forEach(function(object){
            for(var key in object){
                if(!Object.prototype.hasOwnProperty.call(result, key) &&
                    Object.prototype.hasOwnProperty.call(object, key)){
                    result[key] = object[key];
                }
            }
        });
        return result;
    };
}(enchant);

