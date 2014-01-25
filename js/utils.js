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
var Menu = function(text, x, y){
    var label = Label()
    label.text = text;
    label.x = x;
    label.y = y;
    label.color = '#000';
    label.font = "8px cursive";
    console.log("label created");
    label.addEventListener(enchant.Event.TOUCH_END, function (e) {
        alert("hit"+ text);
        game.removeScene(game.currentScene)
    });
    return label;
}

