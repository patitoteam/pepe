PepeGame = function(w, h, assets) {
  this.currentScene = undefined;
  this.gameObj = undefined;

  this.init(w, h, assets);
};
PepeGame.prototype = {
  init: function(w, h ,assets) {
    this.gameObj = new Game(w, h);
    this.gameObj.fps = 30;
    this.gameObj.preload(assets);
    this.gameObj.rootScene.backgroundColor = 'black';

    this.gameObj.onload = this.gameLoaded.bind(this);
    this.gameObj.addEventListener(enchant.Event.DOWN_BUTTON_DOWN,
      this.downKeyHandler.bind(this));
    this.gameObj.addEventListener(enchant.Event.UP_BUTTON_DOWN,
      this.upKeyHandler.bind(this));
    this.gameObj.addEventListener(enchant.Event.LEFT_BUTTON_DOWN,
      this.leftKeyHandler.bind(this));
    this.gameObj.addEventListener(enchant.Event.RIGHT_BUTTON_DOWN,
      this.rightKeyHandler.bind(this));
  },
  startGame: function() {
    this.gameObj.start();
    this.ace = 1;
  },
  addScene: function(scene) {
    this.currentScene = scene;
    this.gameObj.pushScene(scene);
  },
  addElement: function(element) {
    this.gameObj.rootScene.addChild(element);
  },
  downKeyHandler: function() {
    this.sprite.y += 15;
  },
  upKeyHandler: function() {
    this.sprite.y -= 15;
  },
  leftKeyHandler: function() {
    this.sprite.x -= 15;
  },
  rightKeyHandler: function() {
    this.sprite.x += 15*this.ace;
    this.ace += 0.5;
  },
  gameLoaded: function() {
    console.log('game loaded');
    console.log(this.gameObj.assets);

    var label = new Label('Hi PePe');
    label.color = '#0f0';
    label.font = "32px monospace";
    label.x = 30;
    label.y = 15;

    this.sprite = new Sprite(30, 43);
    this.sprite.image = this.gameObj.assets['assets/pinguino.png'];


    this.addElement(label);
    this.addElement(this.sprite);
  }
};
