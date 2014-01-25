enchant();


window.onload = function() {


    var Rectangle = enchant.Class.create({
        initialize: function(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        },
        right: {
            get: function() {
                return this.x + this.width;
            }
        },
        bottom: {
            get: function() {
                return this.y + this.height;
            }
        }
    });


    var game = new Game(320, 320);
    game.fps = 24;
  game.keybind(90, 'a'); //z
  game.keybind(88, 'b'); //x
  /*var state = new Label();
  state.text = "初期化中";
  state.color = "#000000";
  state.x = 200;
  state.y = 265;
  state.visible = true;*/

    game.preload('bar001.gif','bar002.gif','chara001.gif','shot_button.png','end_score.png',
  'shot.gif','enemy004.gif','map1.gif','chara002.gif','enemy_shot002.gif','enemy003.gif',
  'baku001.gif','baku002.gif','enemy_shot003.gif','hantei002.gif','hantei001.gif',
  'enemy005.gif','enemy007.gif','boss001.gif','hou001.gif','hou002.gif','hantei003.gif',
  'baku003.gif','enemy_shot004.gif','enemy_shot005.gif','num.gif','ita.gif','bar_back.gif');
  var enemys = [];        //エネミーの初期設定
  var shots = [];         //弾の初期設定；
    var max_shot = 5; //弾の最大発射数
    var now_shot = 0;
    var shot_lag = 2; //一度打った後次の弾が撃てるようになるまでのフレーム数。
    var shot_frame = 0;
      var shot_h = 0;
    var shot_fra = 0;


    var max_shot_e = 5; //弾の最大発射数
    var now_shot_e = 0;
    var shot_e_lag = 2; //一度打った後次の弾が撃てるようになるまでのフレーム数。
    var shot_e_frame = 0;
      var shot_e_h = 0;
    var shot_e_fra = 0;

    var enemy_d_x
    var enemy_d_y

    var enemy_d_001_shot = 0;
    var enemy_d_002_shot = 0;

    var enemy_d_001_hp = 10;
    var enemy_d_002_hp = 10;

    var enemy_d_001_hit = 0;
    var enemy_d_002_hit = 0;

    var enemy001_d_x
    var enemy001_d_y

    var denzi001_h = 0;
    var denzi002_h = 0;
    var denzi003_h = 0;

    var denzi001_hit_h = 1;
    var denzi002_hit_h = 1;
    var denzi003_hit_h = 1;

    var now_shot_001 = 0;
    var now_shot_002 = 0;
    var now_shot_003 = 0;
    var now_shot_004 = 0;
    var now_shot_005 = 0;

    var hou001_shot = 20;
    var hou002_shot = 20;
    var hou003_shot = 20;
    var hou004_shot = 20;
    var hou005_shot = 30;

    var hou001_hp = 20;
    var hou002_hp = 20;
    var hou003_hp = 20;
    var hou004_hp = 20;
    var hou005_hp = 30;

    var hou001_hit = 0;
    var hou002_hit = 0;
    var hou003_hit = 0;
    var hou004_hit = 0;
    var hou005_hit = 0;

    var baku_hou_x
    var baku_hou_y

    var my_score_h = 0;
    var my_time_h = 0;

    var end_score_h = 0;
    var end_time_h = 0;
    var end_hp_h = 0;
    var end_des_h = 0;
    var end_total_h = 0;

    var end_h = 0;
    var end_count_h = 0;

    game.keybind(32, 'space');      //キーバインドの設定

    game.onload = function() {

    var test_h = 0;
    var test_y = 0;
    var test_f = 0;
    var test_g = 0;

    var guns_h = 0;

    ene = new Array(10);

    var enemy_h = 0;

    var bar001 = new Bar();
    bar001.image = game.assets['bar001.gif'];
    bar001.x = 30;
    bar001.y = 5;
    bar001.value = 150;
    var bar002 = new Bar();
    bar002.image = game.assets['bar002.gif'];
    bar002.x = 30;
    bar002.y = 17;
    bar002.value = 200;

        var blocks = [
[38,40,37,84,85,39,38,37,36,39,40,57,54,56,41,38,57,84,85,36,41,37,54,56,38,36,40,57,41,37,38,36,41,37,36,40,57,41,40,50,51,36,56,36,39,38,57,41,40,41,39,38,57,40,84,85,55,36,39,41,56,54,55,37,40,84,85,36,55,36,39,40,57,41,57,36,39,40,57,37,38,50,51,39,40,37,38,84,85,36,55,56,38,36,55,57,41,37,38,41,50,51,36,40,54,39,40,84,85,57,36,39,41,40,55,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [41,53,96,104,102,99,104,105,102,100,52,53,99,101,98,99,97,99,100,102,103,98,99,101,96,100,102,104,99,97,98,102,99,96,103,105,100,99,97,103,96,104,52,53,99,96,97,100,102,97,96,100,102,97,98,105,99,103,104,105,52,53,99,97,98,52,39,38,36,41,55,41,53,100,101,98,52,53,96,103,97,99,104,102,97,100,101,98,96,103,100,102,104,100,101,96,102,103,103,97,98,102,104,105,99,102,103,104,101,99,96,103,104,101,98,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [57,33,-1,-1,-1,-1,-1,-1,-1,-1,32,81,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,32,65,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,32,65,-1,-1,-1,70,100,52,53,102,71,103,72,-1,-1,-1,32,65,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,48,56,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [39,81,-1,-1,-1,-1,-1,-1,-1,-1,48,65,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,80,81,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,48,65,-1,-1,-1,86,0,82,83,0,87,0,88,-1,-1,-1,64,81,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,32,37,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [40,65,-1,-1,-1,-1,-1,-1,-1,-1,82,83,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,64,49,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,64,81,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,48,33,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,48,39,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [37,49,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,66,67,-1,-1,-1,-1,66,21,18,23,67,-1,-1,-1,-1,-1,48,69,20,25,19,16,17,19,22,24,23,16,21,25,67,-1,-1,-1,32,33,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,64,49,-1,-1,-1,-1,-1,66,67,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,64,40,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [56,65,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,80,65,-1,-1,-1,-1,48,39,40,54,65,-1,-1,-1,-1,-1,82,105,96,103,104,105,99,97,100,96,103,105,99,103,83,-1,-1,-1,80,81,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,32,65,-1,-1,-1,-1,-1,64,65,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,80,55,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [57,33,-1,-1,-1,-1,-1,-1,-1,-1,66,67,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,48,49,-1,-1,-1,-1,82,99,97,98,83,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,48,49,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,48,33,-1,-1,-1,-1,-1,32,33,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,48,57,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [55,49,-1,-1,-1,-1,-1,-1,-1,-1,48,49,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,32,33,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,82,83,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,80,81,-1,-1,-1,-1,-1,80,81,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,66,67,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,64,39,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [35,81,-1,-1,-1,-1,-1,-1,-1,-1,32,33,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,48,33,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,82,83,-1,-1,-1,-1,-1,64,65,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,82,83,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,80,37,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [51,33,-1,-1,-1,-1,-1,-1,66,25,68,65,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,64,65,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,66,19,24,67,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,73,0,66,67,0,74,0,75,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,48,33,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,64,40,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [57,65,-1,-1,-1,-1,-1,-1,64,57,54,65,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,32,81,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,48,34,35,65,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,89,23,68,69,25,90,19,91,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,80,49,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,32,54,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [39,69,16,17,18,19,20,23,68,34,35,69,19,20,25,23,21,18,16,19,17,22,20,16,23,24,68,69,21,22,17,22,24,19,17,20,19,16,20,19,22,24,25,16,20,22,23,68,50,51,69,21,18,20,22,24,25,21,16,17,20,19,23,24,25,68,34,35,40,54,38,41,69,22,25,19,20,24,19,21,20,17,18,68,69,20,22,19,23,24,21,18,16,17,22,24,20,25,16,23,18,22,20,21,18,22,25,17,18,25,19,20,23,22,24,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [35,36,37,38,40,57,84,85,57,50,51,55,56,38,37,40,57,41,36,37,40,57,55,56,38,57,84,85,55,36,37,54,34,35,57,41,36,56,41,36,37,41,36,56,54,57,40,57,54,55,40,36,39,41,84,85,55,41,38,36,41,40,54,56,36,39,50,51,55,36,40,37,38,84,85,54,56,39,57,37,38,54,55,41,40,34,35,55,41,40,55,40,36,37,38,84,85,55,41,37,38,36,57,40,36,54,57,84,85,57,55,41,40,39,37,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
];


        var map = new Map(16, 16);
        map.image = game.assets['map1.gif'];
        map.loadData(blocks);

  var my_score = new Array(10);
  for(i = 0;i<5; i++){
    nx = [i]*10+250;
    ny = 10;

    my_score[i] = new Sprite(10,12);
    my_score[i].image = game.assets['num.gif'];
    my_score[i].x = nx;
    my_score[i].y = ny;
    my_score[i].visible = false;
  }

  var my_time = new Array(10);
  for(i = 0;i<5; i++){
    nx = [i]*10+250;
    ny = 200;

    my_time[i] = new Sprite(10,12);
    my_time[i].image = game.assets['num.gif'];
    my_time[i].x = nx;
    my_time[i].y = ny;
    my_time[i].visible = false;
  }

  var end_score_num = new Array(10);
  for(i = 0;i<5; i++){
    nx = [i]*10+230;
    ny = 68;

    end_score_num[i] = new Sprite(10,12);
    end_score_num[i].image = game.assets['num.gif'];
    end_score_num[i].x = nx;
    end_score_num[i].y = ny;
    end_score_num[i].visible = false;
  }

  var end_time_num = new Array(10);
  for(i = 0;i<5; i++){
    nx = [i]*10+230;
    ny = 109;

    end_time_num[i] = new Sprite(10,12);
    end_time_num[i].image = game.assets['num.gif'];
    end_time_num[i].x = nx;
    end_time_num[i].y = ny;
    end_time_num[i].visible = false;
  }

  var end_hp_num = new Array(10);
  for(i = 0;i<5; i++){
    nx = [i]*10+230;
    ny = 150;

    end_hp_num[i] = new Sprite(10,12);
    end_hp_num[i].image = game.assets['num.gif'];
    end_hp_num[i].x = nx;
    end_hp_num[i].y = ny;
    end_hp_num[i].visible = false;
  }

  var end_des_num = new Array(10);
  for(i = 0;i<5; i++){
    nx = [i]*10+230;
    ny = 199;

    end_des_num[i] = new Sprite(10,12);
    end_des_num[i].image = game.assets['num.gif'];
    end_des_num[i].x = nx;
    end_des_num[i].y = ny;
    end_des_num[i].visible = false;
  }
  var end_total_num = new Array(10);
  for(i = 0;i<5; i++){
    nx = [i]*10+230;
    ny = 257;

    end_total_num[i] = new Sprite(10,12);
    end_total_num[i].image = game.assets['num.gif'];
    end_total_num[i].x = nx;
    end_total_num[i].y = ny;
    end_total_num[i].visible = false;
  }


    var shot_button = new Sprite(79,79);
    shot_button.image = game.assets['shot_button.png'];
    shot_button.x = 225;
    shot_button.y = 235;
    shot_button.frame = 0;
    shot_button._element.style.opacity = 0.8;
    shot_button.visible = true;


    var score_ita = new Sprite(111,18);
    score_ita.image = game.assets['ita.gif'];
    score_ita.x = 193;
    score_ita.y =   7;
    score_ita.frame = 0;
    score_ita.visible = true;

    var time_ita = new Sprite(111,18);
    time_ita.image = game.assets['ita.gif'];
    time_ita.x = 193;
    time_ita.y =   197;
    time_ita.frame = 1;
    time_ita.visible = true;

    var bar_back = new Sprite(180,26);
    bar_back.image = game.assets['bar_back.gif'];
    bar_back.x = 2;
    bar_back.y =   3;
    bar_back.frame = 0;
    bar_back.visible = true;


    var enemy_d_001 = new Sprite(48,48);
    enemy_d_001.image = game.assets['enemy003.gif'];
    enemy_d_001.x = 33 * 16;
    enemy_d_001.y =   2 * 16;
    enemy_d_001.frame = 0;
    enemy_d_001.visible = true;

    var enemy_d_002 = new Sprite(48,48);
    enemy_d_002.image = game.assets['enemy003.gif'];
    enemy_d_002.x = 48 * 16;
    enemy_d_002.y =   7 * 16;
    enemy_d_002.frame = 0;
    enemy_d_002.visible = true;

    var boss = new Sprite(80,160);
    boss.image = game.assets['boss001.gif'];
    boss.x = 108 * 16+5;
    boss.y =   2 * 16;
    boss.frame = 0;
    boss.visible = true;

    var end_score = new Sprite(320,320);
    end_score.image = game.assets['end_score.png'];
    end_score.x = 0;
    end_score.y = 0;
    end_score.frame = 0;
    end_score.visible = false;


    var hou001 = new Sprite(15,19);
    hou001.image = game.assets['hou001.gif'];
    hou001.x = 108 * 16+5;
    hou001.y =   2 * 16+4;
    hou001.frame = 0;
    hou001.visible = true;

    var hou002 = new Sprite(15,19);
    hou002.image = game.assets['hou001.gif'];
    hou002.x = 108 * 16+5;
    hou002.y =   4 * 16+2;
    hou002.frame = 0;
    hou002.visible = true;

    var hou003 = new Sprite(15,19);
    hou003.image = game.assets['hou001.gif'];
    hou003.x = 108 * 16+5;
    hou003.y =   8 * 16+11;
    hou003.frame = 0;
    hou003.visible = true;

    var hou004 = new Sprite(15,19);
    hou004.image = game.assets['hou001.gif'];
    hou004.x = 108 * 16+5;
    hou004.y =   10 * 16+9;
    hou004.frame = 0;
    hou004.visible = true;

    var hou005 = new Sprite(44,40);
    hou005.image = game.assets['hou002.gif'];
    hou005.x = 109 * 16+9+5;
    hou005.y =   5 * 16+12;
    hou005.frame = 0;
    hou005.visible = true;

    var hou005_han = new Sprite(26,26);
    hou005_han.image = game.assets['hantei003.gif'];
    hou005_han.x = 110 * 16+11+5;
    hou005_han.y =   6 * 16+3;
    hou005_han.frame = 0;
    hou005_han.visible = true;

    /*var boss_big_shot = new Sprite(64,24);
    boss_big_shot.image = game.assets['enemy_shot005.gif'];
    boss_big_shot.x = 109 * 16+9+5;
    boss_big_shot.y =   5 * 16+12;
    boss_big_shot.frame = 0;
    boss_big_shot.visible = false;  */

    var denzi001 = new Sprite(16,96);
    denzi001.image = game.assets['enemy_shot003.gif'];
    denzi001.x = 66 * 16;
    denzi001.y =   4 * 16;
    denzi001.frame = 0;
    denzi001.visible = true;

    var denzi002 = new Sprite(16,96);
    denzi002.image = game.assets['enemy_shot003.gif'];
    denzi002.x = 69 * 16;
    denzi002.y =   4 * 16;
    denzi002.frame = 1;
    denzi002.visible = true;

    var denzi003 = new Sprite(16,96);
    denzi003.image = game.assets['enemy_shot003.gif'];
    denzi003.x = 71 * 16;
    denzi003.y =   4 * 16;
    denzi003.frame = 2;
    denzi003.visible = true;

    var denzi_han001 = new Sprite(10,96);
    denzi_han001.image = game.assets['hantei002.gif'];
    denzi_han001.x = 66 * 16+3;
    denzi_han001.y =   4 * 16;
    denzi_han001.frame = 0;
    denzi_han001._element.style.opacity = 0.0;
    denzi_han001.visible = true;

    var denzi_han002 = new Sprite(10,96);
    denzi_han002.image = game.assets['hantei002.gif'];
    denzi_han002.x = 69 * 16+3;
    denzi_han002.y =   4 * 16;
    denzi_han002.frame = 0;
    denzi_han002._element.style.opacity = 0.0;
    denzi_han002.visible = true;

    var denzi_han003 = new Sprite(10,96);
    denzi_han003.image = game.assets['hantei002.gif'];
    denzi_han003.x = 71 * 16+3;
    denzi_han003.y =   4 * 16;
    denzi_han003.frame = 0;
    denzi_han003._element.style.opacity = 0.0;
    denzi_han003.visible = true;

    var denzi_ene001 = new Sprite(16,16);
    denzi_ene001.image = game.assets['enemy005.gif'];
    denzi_ene001.x = 66 * 16;
    denzi_ene001.y =   3 * 16;
    denzi_ene001.frame = 0;
    denzi_ene001.visible = true;

    var denzi_ene002 = new Sprite(16,16);
    denzi_ene002.image = game.assets['enemy005.gif'];
    denzi_ene002.x = 69 * 16;
    denzi_ene002.y =   3 * 16;
    denzi_ene002.frame = 2;
    denzi_ene002.visible = true;

    var denzi_ene003 = new Sprite(16,16);
    denzi_ene003.image = game.assets['enemy005.gif'];
    denzi_ene003.x = 71 * 16;
    denzi_ene003.y =   3 * 16;
    denzi_ene003.frame = 3;
    denzi_ene003.visible = true;

    var denzi_ene004 = new Sprite(16,16);
    denzi_ene004.image = game.assets['enemy007.gif'];
    denzi_ene004.x = 66 * 16;
    denzi_ene004.y =   10 * 16;
    denzi_ene004.frame = 0;
    denzi_ene004.visible = true;

    var denzi_ene005 = new Sprite(16,16);
    denzi_ene005.image = game.assets['enemy007.gif'];
    denzi_ene005.x = 69 * 16;
    denzi_ene005.y =   10 * 16;
    denzi_ene005.frame = 2;
    denzi_ene005.visible = true;

    var denzi_ene006 = new Sprite(16,16);
    denzi_ene006.image = game.assets['enemy007.gif'];
    denzi_ene006.x = 71 * 16;
    denzi_ene006.y =  10 * 16;
    denzi_ene006.frame = 3;
    denzi_ene006.visible = true;

    var stage_boss = new Group();


    var guns = new Sprite(32,32);
    guns.image = game.assets['chara002.gif'];
    guns.visible = false;

    var player_hantei = new Sprite(18,24);
    player_hantei.image = game.assets['hantei001.gif'];
    player_hantei.visible = true;
    player_hantei._element.style.opacity = 0.0;

        var player = new Sprite(32, 32);
        player.x = 64;
        player.y = 32;
        player.vx = 0;
        player.vy = 0;
        player.ax = 0;
        player.ay = 0;
        player.pose = 0;
        player.jumping = true;
        player.jumpBoost = 0;
        player.image = game.assets['chara001.gif'];

    var player_h = 0;
    var player_hit_h = 0;

        player.addEventListener('enterframe', function(e) {
            var friction = 0;
            if (this.vx > 0.3) {//速度が速いとき
                friction = -0.3;//減速させる
            } else if (this.vx > 0) {
                friction = -this.vx;
            }
            if (this.vx < -0.3) {
                friction = 0.3;
            } else if (this.vx < 0) {
                friction = -this.vx;
            }
            //if (this.jumping) {
                if (!game.input.up || --this.jumpBoost < 0 || bar002.value <= 20) {
          this.ay = 0;
          bar002.value += 2;
          if(bar002.value >= 150){
            bar002.value = 150;
          }
                }
        if (!(game.input.up)&&this.jumping == false) {
          bar002.value += 10;
          if(bar002.value >= 150){
            bar002.value = 150;
          }
        }
            //} else {
                if (game.input.up) {
        if(bar002.value >= 20){
          this.jumpBoost = 2;//ジャンプ加速度
          this.ay = -0.4;//ジャンプの高さ？
          bar002.value -= 3;
        }else{
          bar002.value -=3;
        }

                }
           // }
            this.ax = 0;
            if (game.input.left) this.ax -= 0.5;
            if (game.input.right) this.ax += 0.5;
            if (this.ax > 0&&this.jumping == false) this.scaleX = 1;//向き
            if (this.ax < 0&&this.jumping == false) this.scaleX = -1;//向き（反転）
      guns.scaleX = this.scaleX;
      if(this.jumping){
            if (game.frame % 3 == 0) {//歩くアニメ
          if(player_h < 8){
            player_h = 8;
          }
          player_h++;
          if(player_h > 10){
            player_h = 9;
          }
          //this.frame = player_h;
          //this.pose++;
          //this.pose %= 2;
        }
        //this.frame = this.pose + 9;
        this.frame = player_h;
      }else if (this.ax != 0) {
        if (game.frame % 3 == 0) {//歩くアニメ
                    //this.pose++;
                    //this.pose %= 8;
          if(player_h == 0||player_h >= 8){
            player_h = 1;
          }
          player_h++;
        }
        //this.frame = this.pose + 1;
        this.frame = player_h;
      }else{
        this.frame = 0;//止まる
      }
            this.vx += this.ax + friction;// 加速度を速度に+frictionにより減速
            this.vy += this.ay + 0.25 ; // 2 is gravity
            this.vx = Math.min(Math.max(this.vx, -8), 8);//this.vxか-10の大きい方をとる　そしてその値と10の小さい方をとる
            this.vy = Math.min(Math.max(this.vy, -10), 10);
            var dest = new Rectangle(
                this.x + this.vx + 5, this.y + this.vy + 3,
                this.width-10, this.height-3
            );
            this.jumping = true;
            if (dest.x < -stage.x) {//ステージの端に言ったら速度を0？
                dest.x = -stage.x;
                this.vx = 0;
            }
      if (dest.x > -stage.x+250) {//ステージの端に言ったら速度を0？
                dest.x = -stage.x+250;
                this.vx = 0;
            }

            while (true) {
                var boundary, crossing;
                var dx = dest.x - this.x - 5;
                var dy = dest.y - this.y - 3;

                if (dx > 0 && Math.floor(dest.right / 16) != Math.floor((dest.right - dx) / 16)) {
                    boundary = Math.floor(dest.right / 16) * 16;
                    crossing = (dest.right - boundary) / dx * dy + dest.y;
                    if ((map.hitTest(boundary, crossing) && !map.hitTest(boundary-16, crossing)) ||
                        (map.hitTest(boundary, crossing + dest.height) && !map.hitTest(boundary-16, crossing + dest.height))) {
                        this.vx = 0;
                        dest.x = boundary - dest.width - 0.01;

                        continue;
                    }
                } else if (dx < 0 && Math.floor(dest.x / 16) != Math.floor((dest.x - dx) / 16)) {
                    boundary = Math.floor(dest.x / 16) * 16 + 16;
                    crossing = (boundary - dest.x) / dx * dy + dest.y;
                    if ((map.hitTest(boundary-16, crossing) && !map.hitTest(boundary, crossing)) ||
                        (map.hitTest(boundary-16, crossing + dest.height) && !map.hitTest(boundary, crossing + dest.height))) {
                        this.vx = 0;
                        dest.x = boundary + 0.01;
                        continue;
                    }
                }
                if (dy > 0 && Math.floor(dest.bottom / 16) != Math.floor((dest.bottom - dy) / 16)) {
                    boundary = Math.floor(dest.bottom / 16) * 16;
                    crossing = (dest.bottom - boundary) / dy * dx + dest.x;
                    if ((map.hitTest(crossing, boundary) && !map.hitTest(crossing, boundary-16)) ||
                        (map.hitTest(crossing + dest.width, boundary) && !map.hitTest(crossing + dest.width, boundary-16))) {
                        this.jumping = false;
                        this.vy = 0;
                        dest.y = boundary - dest.height - 0.01;
                        continue;
                    }
                } else if (dy < 0 && Math.floor(dest.y / 16) != Math.floor((dest.y - dy) / 16)) {
                    boundary = Math.floor(dest.y / 16) * 16 + 16;
                    crossing = (boundary - dest.y) / dy * dx + dest.x;
                    if ((map.hitTest(crossing, boundary-16) && !map.hitTest(crossing, boundary)) ||
                        (map.hitTest(crossing + dest.width, boundary-16) && !map.hitTest(crossing + dest.width, boundary))) {
                        this.vy = 0;
                        dest.y = boundary + 0.01;
                        continue;
                    }
                }
                break;
            }

            this.x = dest.x-5;
            this.y = dest.y-3;
guns.x = this.x;
guns.y = this.y;
player_hantei.x = this.x+7;
player_hantei.y = this.y+4;



       for (var i = 0; i < 5; i++) {
                    if(player_hantei.intersect(enemys[i])&&ene[i] == 1){
          if(player_hit_h == 0){
            player_hit_h = 1;
            //ダメージの減算はココ
            bar001.value = bar001.value - 20;
          }
        }
                }

      if(guns_h >= 1){
        guns_h++;
      }
      if(guns_h >= 5){
        guns_h = 0;
        guns.visible = false;
      }

    //ダメージを受けた時の点滅　それに伴う無敵時間
      if(player_hit_h >= 1){
        if (game.frame % 4 == 0) {
          player_hit_h++;
          if(player_hit_h >= 1&&player_hit_h < 8){
            this.frame = this.frame +15;
          }else if(player_hit_h >= 8){
            this._element.style.opacity = 0.5;
          }
          if(player_hit_h >= 18){
            this._element.style.opacity = 1.0;
            player_hit_h = 0;
          }
        }
      }
  //enemy_d_001の射程範囲
      enemy_d_001.frame = 0;
      if(enemy_d_001_shot > 0&&enemy_d_001_hp > 0){
        enemy_d_001_shot++;
        if(enemy_d_001_shot <= 20){

        enemy_d_x = enemy_d_001.x
        enemy_d_y = enemy_d_001.y
        enemy_d_001.frame = 1;
        var shot_e = enemy_shot();
        stage.addChild(shot_e);
        }
        if(enemy_d_001_shot >= 50){
          enemy_d_001_shot = 0;
        }
      }else if(this.x >= 300&&this.y <= 60&&enemy_d_001_hp > 0){
        if(this.x <= 550){
          enemy_d_001_shot = 1;
        }
      }
  //enemy_d_002の射程範囲
      enemy_d_002.frame = 0;
      if(enemy_d_002_shot > 0&&enemy_d_002_hp > 0){
        enemy_d_002_shot++;
        if(enemy_d_002_shot <= 20){

        enemy_d_x = enemy_d_002.x
        enemy_d_y = enemy_d_002.y
        enemy_d_002.frame = 1;
        var shot_e = enemy_shot();
        stage.addChild(shot_e);
        }
        if(enemy_d_002_shot >= 50){
          enemy_d_002_shot = 0;
        }
      }else if(this.x >= 500&&this.y >= 90&&enemy_d_002_hp > 0){
        if(this.x <= 780){
          enemy_d_002_shot = 1;
        }
      }

  //hou001の射程範囲
      hou001.frame = 0;
      if(hou001_shot > 0&&hou001_hp > 0){
        hou001_shot++;
        if(hou001_shot <= 20){

        //enemy_d_x = enemy_d_002.x
        //enemy_d_y = enemy_d_002.y
        //enemy_d_002.frame = 1;
        hou001.frame = 2;
        var hou001shot = create_hou001_shot();
        stage.addChild(hou001shot);
        }
        if(hou001_shot >= 80){
          hou001_shot = 0;
        }
      }else if(this.x >= 1400&&hou001_hp > 0){
          hou001_shot = 1;
      }

  //hou002の射程範囲
      hou002.frame = 0;
      if(hou002_shot > 0&&hou002_hp > 0){
        hou002_shot++;
        if(hou002_shot <= 20){

        //enemy_d_x = enemy_d_002.x
        //enemy_d_y = enemy_d_002.y
        //enemy_d_002.frame = 1;
        hou002.frame = 2;
        var hou002shot = create_hou002_shot();
        stage.addChild(hou002shot);
        }
        if(hou002_shot >= 80){
          hou002_shot = 0;
        }
      }else if(this.x >= 1400&&hou002_hp > 0){
          hou002_shot = 1;
      }

  //hou003の射程範囲
      hou003.frame = 0;
      if(hou003_shot > 0&&hou003_hp > 0){
          hou003_shot++;

        if(hou003_shot <= 20){

        //enemy_d_x = enemy_d_003.x
        //enemy_d_y = enemy_d_003.y
        //enemy_d_003.frame = 1;
        //hou003.frame = 2;
          if(game.frame % 5 == 0){
            var hou003shot = create_hou003_shot();
            stage.addChild(hou003shot);
          }
        }
        if(hou003_shot >= 70){
          hou003_shot = 0;
        }
      }else if(this.x >= 1400&&hou003_hp > 0){
          hou003_shot = 1;
      }

  //hou004の射程範囲
      hou004.frame = 0;
      if(hou004_shot > 0&&hou004_hp > 0){
          hou004_shot++;

        if(hou004_shot <= 20){

        //enemy_d_x = enemy_d_004.x
        //enemy_d_y = enemy_d_004.y
        //enemy_d_004.frame = 1;
        //hou004.frame = 2;
          if(game.frame % 5 == 0){
            var hou004shot = create_hou004_shot();
            stage_boss.addChild(hou004shot);
          }
        }
        if(hou004_shot >= 70){
          hou004_shot = 0;
        }
      }else if(this.x >= 1400&&hou004_hp > 0){
          hou004_shot = 1;
      }

  //hou005の射程範囲
      //hou005.frame = 0;
      if(hou005_shot > 0&&hou005_hp > 0){
          hou005_shot++;

        if(hou005_shot == 80){
            var hou005shot = create_hou005_shot();
            stage_boss.addChild(hou005shot);

        }
        if(hou005_shot >= 81){
          hou005_shot = 0;
        }
      }else if(this.x >= 1400&&hou005_hp > 0){
          hou005_shot = 1;
      }

      hou005_han.frame = 0;

            /*if (this.y > 320) {
                var score = Math.round(player.x);
                this.frame = 3;
                this.vy = -20;
                this.addEventListener('enterframe', function() {
                    this.vy += 2;
                    this.y += Math.min(Math.max(this.vy, -10), 10);
                    if (this.y > 320) {
                        game.end(score, score + 'mで死にました');
                    }
                });
                this.removeEventListener('enterframe', arguments.callee);
            }*/
      if(bar001.value <= 0){
        bar001.visible = false;
        game.end(my_score_h, 'SCORE:' + my_score_h );
      }

        });








        var stage = new Group();
    stage.addChild(map);
    stage.addChild(enemy_d_001);
    stage.addChild(enemy_d_002);
    //stage.addChild(boss_big_shot);
    stage.addChild(boss);
    stage.addChild(hou001);
    stage.addChild(hou002);
    stage.addChild(hou003);
    stage.addChild(hou004);
    stage.addChild(hou005);
    stage.addChild(hou005_han);
    stage.addChild(player);
    stage.addChild(guns);
    stage.addChild(player_hantei);
    stage.addChild(denzi001);
    stage.addChild(denzi002);
    stage.addChild(denzi003);

    stage.addChild(denzi_han001);
    stage.addChild(denzi_han002);
    stage.addChild(denzi_han003);
    stage.addChild(denzi_ene001);
    stage.addChild(denzi_ene002);
    stage.addChild(denzi_ene003);
    stage.addChild(denzi_ene004);
    stage.addChild(denzi_ene005);
    stage.addChild(denzi_ene006);
    stage.addEventListener('enterframe', function(e) {
            if (this.x > 80 - player.x/*&&this.x >= -300*/) {
                this.x = 80- player.x;//64後からついてくる
        stage_boss.x = this.x;
            }
      if (this.x < 64 - player.x&&this.x <= 0) {
                this.x = 64- player.x;//64後からついてくる
        stage_boss.x = this.x;
            }
      if(this.x <= -1500){
        this.x = -1500;
        stage_boss.x = this.x;
      }

      //test_x = 64 - player.x;
      //test_y = 64 + player.x;


      //state.text = end_total_h+"<br>"+end_score_h+"<br>"+end_time_h+"<br>"+end_hp_h+"<br>"+end_des_h;
      if(game.frame %20 == 0){
        my_time_h++;
        if(my_time_h >= 999){
          my_time_h = 999;
        }
        my_time_count();
      }
      if(end_h == 1){
        end_count_h++;
      }
      if(end_count_h >= 100){
        game.end(end_total_h, 'SCORE:' + end_total_h );
      }


      //vx 今の速度　　ax　加速度
        });
    var pad = new Pad();
    pad.x = 0;
    pad.y = 224;

    game.rootScene.addChild(stage_boss);
    game.rootScene.addChild(stage);
    game.rootScene.addChild(bar_back);
    game.rootScene.addChild(pad);
    game.rootScene.addChild(bar001);
    game.rootScene.addChild(bar002);
    game.rootScene.addChild(score_ita);
    game.rootScene.addChild(time_ita);
    game.rootScene.addChild(shot_button);





  for(i = 0;i<5; i++){
    game.rootScene.addChild(my_score[i]);
  }

  for(i = 0;i<5; i++){
    game.rootScene.addChild(my_time[i]);
  }

    game.rootScene.addChild(end_score);

  for(i = 0;i<5; i++){
    game.rootScene.addChild(end_score_num[i]);
  }
  for(i = 0;i<5; i++){
    game.rootScene.addChild(end_time_num[i]);
  }
  for(i = 0;i<5; i++){
    game.rootScene.addChild(end_hp_num[i]);
  }
  for(i = 0;i<5; i++){
    game.rootScene.addChild(end_des_num[i]);
  }
  for(i = 0;i<5; i++){
    game.rootScene.addChild(end_total_num[i]);
  }
    //game.rootScene.addChild(state);

       var create_enemy = function(e){
            var enemy = new Sprite(24, 24);
           var enemy_index = enemys.length - 1;    //エネミーのインデックスを作成0～
            enemy.x = 250 + enemy_index * 30;       //エネミーのインデックスを基準に配置箇所を設定(X座標)
            enemy.y = 70 /* + enemy_index * 30*/;       //エネミーのインデックスを基準に配置箇所を設定(Y座標)
        enemy.vx = 0;
        enemy.vy = 0;
        enemy.ax = 0;
        enemy.ay = 0;
        enemy.pose = 0;
    enemy.jumpBoost = 0;
    var enemy_fra = 0;
    var enemy_kou = 0;
            enemy.image = game.assets['enemy004.gif'];

        enemy.addEventListener('enterframe', function(e) {
            var friction_e = 0;
            if (this.vx > 0.3) {//速度が速いとき
                friction_e = -0.3;//減速させる
            } else if (this.vx > 0) {
                friction_e = -this.vx;
            }
            if (this.vx < -0.3) {
                friction_e = 0.3;
            } else if (this.vx < 0) {
                friction_e = -this.vx;
            }

            this.ax = 0;
      //this.ay += 20;
      if(enemy_fra > 60){
        enemy_fra = 0;
        enemy_kou = Math.floor(Math.random()*3)
      }
      if (enemy_kou == 1&&enemy_fra <= 20){
        this.ax -= 0.4;
      }else if(enemy_kou == 2&&enemy_fra <= 20){
        this.ax += 0.4;
      }/*else if(enemy_kou == 3&&enemy_fra <= 20){
        this.jumpBoost = 30;
        this.ay  = -20;
      }*/

      enemy_fra++;

                if (game.frame % 3 == 0) {//歩くアニメ
                    this.frame++;
          if(this.frame >= 3){
            this.frame = 0;
          }
                }
           this.vx += this.ax + friction_e;// 加速度を速度に+friction_eにより減速
            this.vy += this.ay + 8; // 2 is gravity
            this.vx = Math.min(Math.max(this.vx, -10), 10);//this.vxか-10の大きい方をとる　そしてその値と10の小さい方をとる
            this.vy = Math.min(Math.max(this.vy, -10), 10);
            var dest_e = new Rectangle(
                this.x + this.vx + 4, this.y + this.vy + 2,
                this.width -4, this.height-2
            );

            while (true) {
                var boundary_e, crossing_e;
                var dx = dest_e.x - this.x - 4;
                var dy = dest_e.y - this.y - 2;

                if (dx > 0 && Math.floor(dest_e.right / 16) != Math.floor((dest_e.right - dx) / 16)) {
                    boundary_e = Math.floor(dest_e.right / 16) * 16;
                    crossing_e = (dest_e.right - boundary_e) / dx * dy + dest_e.y;
                    if ((map.hitTest(boundary_e, crossing_e) && !map.hitTest(boundary_e-16, crossing_e)) ||
                        (map.hitTest(boundary_e, crossing_e + dest_e.height) && !map.hitTest(boundary_e-16, crossing_e + dest_e.height))) {
                        this.vx = 0;
                        dest_e.x = boundary_e - dest_e.width - 0.01;

                        continue;
                    }
                } else if (dx < 0 && Math.floor(dest_e.x / 16) != Math.floor((dest_e.x - dx) / 16)) {
                    boundary_e = Math.floor(dest_e.x / 16) * 16 + 16;
                    crossing_e = (boundary_e - dest_e.x) / dx * dy + dest_e.y;
                    if ((map.hitTest(boundary_e-16, crossing_e) && !map.hitTest(boundary_e, crossing_e)) ||
                        (map.hitTest(boundary_e-16, crossing_e + dest_e.height) && !map.hitTest(boundary_e, crossing_e + dest_e.height))) {
                        this.vx = 0;
                        dest_e.x = boundary_e + 0.01;
                        continue;
                    }
                }
                if (dy > 0 && Math.floor(dest_e.bottom / 16) != Math.floor((dest_e.bottom - dy) / 16)) {
                    boundary_e = Math.floor(dest_e.bottom / 16) * 16;
                    crossing_e = (dest_e.bottom - boundary_e) / dy * dx + dest_e.x;
                    if ((map.hitTest(crossing_e, boundary_e) && !map.hitTest(crossing_e, boundary_e-16)) ||
                        (map.hitTest(crossing_e + dest_e.width, boundary_e) && !map.hitTest(crossing_e + dest_e.width, boundary_e-16))) {
                        this.jumping = false;
                        this.vy = 0;
                        dest_e.y = boundary_e - dest_e.height - 0.01;
                        continue;
                    }
                } else if (dy < 0 && Math.floor(dest_e.y / 16) != Math.floor((dest_e.y - dy) / 16)) {
                    boundary_e = Math.floor(dest_e.y / 16) * 16 + 16;
                    crossing_e = (boundary_e - dest_e.y) / dy * dx + dest_e.x;
                    if ((map.hitTest(crossing_e, boundary_e-16) && !map.hitTest(crossing_e, boundary_e)) ||
                        (map.hitTest(crossing_e + dest_e.width, boundary_e-16) && !map.hitTest(crossing_e + dest_e.width, boundary_e))) {
                        this.vy = 0;
                        dest_e.y = boundary_e + 0.01;
                        continue;
                    }
                }
                break;
            }

            this.x = dest_e.x-4;
            this.y = dest_e.y-2;

        });

     return enemy;
  }

  //爆発作成
  var create_baku001 = function(e){
    var baku001 = new Sprite(24,24);
    baku001.image = game.assets['baku001.gif'];
    baku001.frame = 0
    baku001.x = enemy001_d_x;
    baku001.y = enemy001_d_y;
    baku001.addEventListener('enterframe', function(e) {
      this.frame++;
      if(this.frame >= 6){
        stage.removeChild(this);
        this.frame = 0;
      }
    });
    return baku001;
  }
  //enemy_d_001爆発
  var baku_enemy_d_001 = function(e){
    var baku002 = new Sprite(48,48);
    baku002.image = game.assets['baku002.gif'];
    baku002.frame = 0
    baku002.x = 33 * 16;
    baku002.y =  2 * 16;
    baku002.addEventListener('enterframe', function(e) {
      this.frame++;
      if(this.frame >= 6){
        stage.removeChild(this);
        this.frame = 0;
      }
    });
    return baku002;
  }

  //enemy_d_002爆発
  var baku_enemy_d_002 = function(e){
    var baku003 = new Sprite(48,48);
    baku003.image = game.assets['baku002.gif'];
    baku003.frame = 0
    baku003.x = 48 * 16;
    baku003.y =  7 * 16;
    baku003.addEventListener('enterframe', function(e) {
      this.frame++;
      if(this.frame >= 6){
        stage.removeChild(this);
        this.frame = 0;
      }
    });
    return baku003;
  }

  //boss爆発
  var baku_boss = function(e){
    var baku004 = new Sprite(48,48);
    baku004.image = game.assets['baku002.gif'];
    baku004.frame = 0
    baku004.x = 110 * 16+5;
    baku004.y =  5 * 16+8;
    baku004.addEventListener('enterframe', function(e) {
      this.frame++;
      if(this.frame >= 6){
        stage.removeChild(this);
        this.frame = 0;
        //クリア処理

        stage.removeChild(player);

        end_score_h = my_score_h;
        end_time_h = my_time_h;
        end_hp_h = bar001.value;

        if(end_time_h <= 50){
          end_time_h = 5000;
        }else if(end_time_h <= 60){
          end_time_h = 3000;
        }else if(end_time_h <= 80){
          end_time_h = 1000;
        }else if(end_time_h <= 100){
          end_time_h = 500;
        }else{
          end_time_h = 0;
        }

        if(end_hp_h == 150){
          end_hp_h = 3000;
        }else{
          end_hp_h = 0;
        }

        if(end_score_h == 7000){
          end_des_h = 3000;
        }

        end_total_h = end_score_h + end_time_h + end_hp_h + end_des_h;
        end_score_count();
        end_time_count();
        end_hp_count();
        end_des_count();
        end_total_count();
        end_score.visible = true;
        game.rootScene.removeChild(stage_boss);
        //game.rootScene.removeChild(stage);

        game.rootScene.removeChild(bar_back);
        game.rootScene.removeChild(bar001);
        //game.rootScene.removeChild(bar002);
        game.rootScene.removeChild(score_ita);
        game.rootScene.removeChild(time_ita);

        end_h = 1;
        //game.end(my_score_h, 'SCORE:' + my_score_h );
      }
    });
    return baku004;
  }

  //hou爆発
  var baku_hou = function(e){
    var baku_h = new Sprite(30,40);
    baku_h.image = game.assets['baku003.gif'];
    baku_h.frame = 0
    baku_h.x = baku_hou_x;
    baku_h.y = baku_hou_y;
    baku_h.addEventListener('enterframe', function(e) {
      this.frame++;
      if(this.frame >= 6){
        stage.removeChild(this);
        this.frame = 0;
      }
    });
    return baku_h;
  }

    my_score_count = function(){
      for(i = 0;i<5; i++){
        my_score[i].visible = false;
        if(my_score_h >= 999999){
          my_score_h = 999999;
        }
        if(my_score_h >= 0&&[i] == 4){
          my_score[i].visible = true;
          my_score[i].frame = my_score_h;
        }
        if(my_score_h >= 10&&[i] == 3){
          my_score[i].visible = true;
          my_score[i].frame = Math.floor(my_score_h% 100 / 10);//百の位以上を切り捨てて、十で割る。
        }
        if(my_score_h >= 100&&[i] == 2){
          my_score[i].visible = true;
          my_score[i].frame = Math.floor(my_score_h% 1000 / 100);
        }
        if(my_score_h >= 1000&&[i] == 1){
          my_score[i].visible = true;
          my_score[i].frame = Math.floor(my_score_h% 10000 / 1000);
        }
        if(my_score_h >= 10000&&[i] == 0){
          my_score[i].visible = true;
          my_score[i].frame = Math.floor(my_score_h/  10000);
        }
      }
    }
    my_time_count = function(){
      for(i = 0;i<5; i++){
        my_time[i].visible = false;
        if(my_time_h >= 999999){
          my_time_h = 999999;
        }
        if(my_time_h >= 0&&[i] == 4){
          my_time[i].visible = true;
          my_time[i].frame = my_time_h;
        }
        if(my_time_h >= 10&&[i] == 3){
          my_time[i].visible = true;
          my_time[i].frame = Math.floor(my_time_h% 100 / 10);//百の位以上を切り捨てて、十で割る。
        }
        if(my_time_h >= 100&&[i] == 2){
          my_time[i].visible = true;
          my_time[i].frame = Math.floor(my_time_h% 1000 / 100);
        }
        if(my_time_h >= 1000&&[i] == 1){
          my_time[i].visible = true;
          my_time[i].frame = Math.floor(my_time_h% 10000 / 1000);
        }
        if(my_time_h >= 10000&&[i] == 0){
          my_time[i].visible = true;
          my_time[i].frame = Math.floor(my_time_h/  10000);
        }
      }
    }
      end_score_count = function(){
      for(i = 0;i<5; i++){
        end_score_num[i].visible = false;
        if(end_score_h >= 999999){
          end_score_h = 999999;
        }
        if(end_score_h >= 0&&[i] == 4){
          end_score_num[i].visible = true;
          end_score_num[i].frame = end_score_h;
        }
        if(end_score_h >= 10&&[i] == 3){
          end_score_num[i].visible = true;
          end_score_num[i].frame = Math.floor(end_score_h% 100 / 10);//百の位以上を切り捨てて、十で割る。
        }
        if(end_score_h >= 100&&[i] == 2){
          end_score_num[i].visible = true;
          end_score_num[i].frame = Math.floor(end_score_h% 1000 / 100);
        }
        if(end_score_h >= 1000&&[i] == 1){
          end_score_num[i].visible = true;
          end_score_num[i].frame = Math.floor(end_score_h% 10000 / 1000);
        }
        if(end_score_h >= 10000&&[i] == 0){
          end_score_num[i].visible = true;
          end_score_num[i].frame = Math.floor(end_score_h/  10000);
        }
      }
    }
      end_time_count = function(){
      for(i = 0;i<5; i++){
        end_time_num[i].visible = false;
        if(end_time_h >= 999999){
          end_time_h = 999999;
        }
        if(end_time_h >= 0&&[i] == 4){
          end_time_num[i].visible = true;
          end_time_num[i].frame = end_time_h;
        }
        if(end_time_h >= 10&&[i] == 3){
          end_time_num[i].visible = true;
          end_time_num[i].frame = Math.floor(end_time_h% 100 / 10);//百の位以上を切り捨てて、十で割る。
        }
        if(end_time_h >= 100&&[i] == 2){
          end_time_num[i].visible = true;
          end_time_num[i].frame = Math.floor(end_time_h% 1000 / 100);
        }
        if(end_time_h >= 1000&&[i] == 1){
          end_time_num[i].visible = true;
          end_time_num[i].frame = Math.floor(end_time_h% 10000 / 1000);
        }
        if(end_time_h >= 10000&&[i] == 0){
          end_time_num[i].visible = true;
          end_time_num[i].frame = Math.floor(end_time_h/  10000);
        }
      }
    }
      end_hp_count = function(){
      for(i = 0;i<5; i++){
        end_hp_num[i].visible = false;
        if(end_hp_h >= 999999){
          end_hp_h = 999999;
        }
        if(end_hp_h >= 0&&[i] == 4){
          end_hp_num[i].visible = true;
          end_hp_num[i].frame = end_hp_h;
        }
        if(end_hp_h >= 10&&[i] == 3){
          end_hp_num[i].visible = true;
          end_hp_num[i].frame = Math.floor(end_hp_h% 100 / 10);//百の位以上を切り捨てて、十で割る。
        }
        if(end_hp_h >= 100&&[i] == 2){
          end_hp_num[i].visible = true;
          end_hp_num[i].frame = Math.floor(end_hp_h% 1000 / 100);
        }
        if(end_hp_h >= 1000&&[i] == 1){
          end_hp_num[i].visible = true;
          end_hp_num[i].frame = Math.floor(end_hp_h% 10000 / 1000);
        }
        if(end_hp_h >= 10000&&[i] == 0){
          end_hp_num[i].visible = true;
          end_hp_num[i].frame = Math.floor(end_hp_h/  10000);
        }
      }
    }
      end_des_count = function(){
      for(i = 0;i<5; i++){
        end_des_num[i].visible = false;
        if(end_des_h >= 999999){
          end_des_h = 999999;
        }
        if(end_des_h >= 0&&[i] == 4){
          end_des_num[i].visible = true;
          end_des_num[i].frame = end_des_h;
        }
        if(end_des_h >= 10&&[i] == 3){
          end_des_num[i].visible = true;
          end_des_num[i].frame = Math.floor(end_des_h% 100 / 10);//百の位以上を切り捨てて、十で割る。
        }
        if(end_des_h >= 100&&[i] == 2){
          end_des_num[i].visible = true;
          end_des_num[i].frame = Math.floor(end_des_h% 1000 / 100);
        }
        if(end_des_h >= 1000&&[i] == 1){
          end_des_num[i].visible = true;
          end_des_num[i].frame = Math.floor(end_des_h% 10000 / 1000);
        }
        if(end_des_h >= 10000&&[i] == 0){
          end_des_num[i].visible = true;
          end_des_num[i].frame = Math.floor(end_des_h/  10000);
        }
      }
    }
      end_total_count = function(){
      for(i = 0;i<5; i++){
        end_total_num[i].visible = false;
        if(end_total_h >= 999999){
          end_total_h = 999999;
        }
        if(end_total_h >= 0&&[i] == 4){
          end_total_num[i].visible = true;
          end_total_num[i].frame = end_total_h;
        }
        if(end_total_h >= 10&&[i] == 3){
          end_total_num[i].visible = true;
          end_total_num[i].frame = Math.floor(end_total_h% 100 / 10);//百の位以上を切り捨てて、十で割る。
        }
        if(end_total_h >= 100&&[i] == 2){
          end_total_num[i].visible = true;
          end_total_num[i].frame = Math.floor(end_total_h% 1000 / 100);
        }
        if(end_total_h >= 1000&&[i] == 1){
          end_total_num[i].visible = true;
          end_total_num[i].frame = Math.floor(end_total_h% 10000 / 1000);
        }
        if(end_total_h >= 10000&&[i] == 0){
          end_total_num[i].visible = true;
          end_total_num[i].frame = Math.floor(end_total_h/  10000);
        }
      }
    }



  enemy_d_001.addEventListener('enterframe', function(e) {
    if(enemy_d_001_hit == 1){
      this.frame = this.frame +2;
      enemy_d_001_hit = 0;
    }
  });
  enemy_d_002.addEventListener('enterframe', function(e) {
    if(enemy_d_002_hit == 1){
      this.frame = this.frame +2;
      enemy_d_002_hit = 0;
    }
  });
  hou001.addEventListener('enterframe', function(e) {
    if(hou001_hit >= 1){
        this.frame = 1;
        hou001_hit = 0;
    }
  });
  hou002.addEventListener('enterframe', function(e) {
    if(hou002_hit >= 1){
        this.frame = 1;
        hou002_hit = 0;
    }
  });
  hou003.addEventListener('enterframe', function(e) {
    if(hou003_hit >= 1){
        this.frame = 1;
        hou003_hit = 0;
    }
  });
  hou004.addEventListener('enterframe', function(e) {
    if(hou004_hit >= 1){
        this.frame = 1;
        hou004_hit = 0;
    }
  });
  hou005_han.addEventListener('enterframe', function(e) {
    if(hou005_hit >= 1){
        this.frame = 1;
        hou005_hit = 0;
    }
  });


  denzi001.addEventListener('enterframe', function(e) {
    if (game.frame % 4 == 0) {
      this.frame++;
      denzi_ene001.frame++;
      denzi_ene004.frame++;
      denzi001_h++;
      if(this.frame >= 4){
        this.frame = 0
      }
      if(denzi001_h >= 15){
        this.visible = true;
        denzi001_hit_h = 1;
        denzi001_h = 0;
      }else if(denzi001_h >= 8){
        this.visible = false;
        denzi001_hit_h = 0;
      }
      if(denzi_ene001.frame >= 4){
        denzi_ene001.frame = 0;
        denzi_ene004.frame = 0;
      }
    }
    if(denzi_han001.intersect(player_hantei)&&denzi001_hit_h == 1){
      if(player_hit_h == 0){
        player_hit_h = 1;
        //ダメージの減算はココ
        bar001.value = bar001.value - 50;
      }
    }
  });
  denzi002.addEventListener('enterframe', function(e) {
    if (game.frame % 4 == 0) {
      this.frame++;
      denzi_ene002.frame++;
      denzi_ene005.frame++;
      denzi002_h++;
      if(this.frame >= 4){
        this.frame = 0
      }
      if(denzi002_h >= 14){
        this.visible = true;
        denzi002_hit_h = 1;
        denzi002_h = 0;
      }else if(denzi002_h >= 7){
        this.visible = false;
        denzi002_hit_h = 0;
      }
      if(denzi_ene002.frame >= 4){
        denzi_ene002.frame = 0;
        denzi_ene005.frame = 0;
      }
    }
    if(denzi_han002.intersect(player_hantei)&&denzi002_hit_h == 1){
      if(player_hit_h == 0){
        player_hit_h = 1;
        //ダメージの減算はココ
        bar001.value = bar001.value - 50;
      }
    }
  });
  denzi003.addEventListener('enterframe', function(e) {
    if (game.frame % 4 == 0) {
      this.frame++;
      denzi_ene003.frame++;
      denzi_ene006.frame++;
      denzi003_h++;
      if(this.frame >= 4){
        this.frame = 0
      }
      if(denzi003_h >= 21){
        this.visible = true;
        denzi003_hit_h = 1;
        denzi003_h = 0;
      }else if(denzi003_h >= 15){
        this.visible = false;
        denzi003_hit_h = 0;
      }
      if(denzi_ene003.frame >= 4){
        denzi_ene003.frame = 0;
        denzi_ene006.frame = 0;
      }
    }
    if(denzi_han003.intersect(player_hantei)&&denzi003_hit_h == 1){
      if(player_hit_h == 0){
        player_hit_h = 1;
        //ダメージの減算はココ
        bar001.value = bar001.value - 50;
      }
    }
  });
        //自分の弾を作成
        var create_shot = function(e){
            var shot = new Sprite(4, 4);
    shot.image = game.assets['shot.gif'];
            shot.frame = 0;
            shot_frame = game.frame;
            now_shot++;
      if(player.scaleX == 1){
        shot.x = player.x + 16;
        shot.speed = 15;
        shot.scaleX = 1;
      }else if(player.scaleX == -1){
        shot.x = player.x +12;
        shot.speed = -15;
        shot.scaleX = -1;
      }
      shot.y = player.y +14;
      shot.visible = false;
            shot.addEventListener('enterframe', function(e) {
        shot_fra++;     /*原因未特定の残像対策*/
        if(shot_fra > 1 ){
            shot.visible = true;
        }

        this.x += shot.speed;
        if(this.x > Math.abs(stage.x) + 320){
          now_shot--;
          stage.removeChild(this);
          }
        if(this.x < Math.abs(stage.x) -16){
          now_shot--;
          stage.removeChild(this);
        }

                  for (var i = 0; i < 5; i++) {
                    if(this.intersect(enemys[i])&&ene[i] == 1){
            enemy001_d_x = enemys[i].x;
            enemy001_d_y = enemys[i].y;
            stage.removeChild(enemys[i]);
            ene[i] = 0;
            var baku_e = create_baku001();
            stage.addChild(baku_e);
            stage.removeChild(this);
            now_shot--;
            my_score_h += 100;
            my_score_count();
                    }
        }
        if(this.intersect(enemy_d_001)&&enemy_d_001_hp > 0){
          stage.removeChild(this);
          now_shot--;
          enemy_d_001_hp--;
          enemy_d_001_hit = 1;
          if(enemy_d_001_hp == 0){
            var baku_e_001 = baku_enemy_d_001();
            stage.addChild(baku_e_001);
            stage.removeChild(enemy_d_001);
            my_score_h += 500;
            my_score_count();
          }
        }
        if(this.intersect(enemy_d_002)&&enemy_d_002_hp > 0){
          stage.removeChild(this);
          now_shot--;
          enemy_d_002_hp--;
          enemy_d_002_hit = 1;
          if(enemy_d_002_hp == 0){
            var baku_e_002 = baku_enemy_d_002();
            stage.addChild(baku_e_002);
            stage.removeChild(enemy_d_002);
            my_score_h += 500;
            my_score_count();
          }
        }

        if(this.intersect(hou001)&&hou001_hp > 0){
          stage.removeChild(this);
          now_shot--;
          hou001_hp--;
          hou001_hit = 1;
          if(hou001_hp == 0){
            baku_hou_x = hou001.x-10;
            baku_hou_y = hou001.y-12;
            var baku_hou001 = baku_hou();
            stage.addChild(baku_hou001);
            stage.removeChild(hou001);
            my_score_h += 800;
            my_score_count();
          }
        }
        if(this.intersect(hou002)&&hou002_hp > 0){
          stage.removeChild(this);
          now_shot--;
          hou002_hp--;
          hou002_hit = 1;
          if(hou002_hp == 0){
            baku_hou_x = hou002.x-10;
            baku_hou_y = hou002.y-12;
            var baku_hou002 = baku_hou();
            stage.addChild(baku_hou002);
            stage.removeChild(hou002);
            my_score_h += 800;
            my_score_count();
          }
        }
        if(this.intersect(hou003)&&hou003_hp > 0){
          stage.removeChild(this);
          now_shot--;
          hou003_hp--;
          hou003_hit = 1;
          if(hou003_hp == 0){
            baku_hou_x = hou003.x-10;
            baku_hou_y = hou003.y-12;
            var baku_hou003 = baku_hou();
            stage.addChild(baku_hou003);
            stage.removeChild(hou003);
            my_score_h += 800;
            my_score_count();
          }
        }
        if(this.intersect(hou004)&&hou004_hp > 0){
          stage.removeChild(this);
          now_shot--;
          hou004_hp--;
          hou004_hit = 1;
          if(hou004_hp == 0){
            baku_hou_x = hou004.x-10;
            baku_hou_y = hou004.y-12;
            var baku_hou004 = baku_hou();
            stage.addChild(baku_hou004);
            stage.removeChild(hou004);
            my_score_h += 800;
            my_score_count();
          }
        }
        if(this.intersect(hou005_han)&&hou005_hp > 0){
          stage.removeChild(this);
          now_shot--;
          hou005_hp--;
          hou005_hit = 1;
          if(hou005_hp == 0){
            var baku_b = baku_boss();
            stage.addChild(baku_b);
            stage.removeChild(hou005);
            stage.removeChild(hou005_han);
            my_score_h += 2300;
            my_score_count();
          }
        }

      if(map.hitTest(this.x,this.y)&&
      map.hitTest(this.x,this.y+4)&&
      map.hitTest(this.x+4,this.y)&&
      map.hitTest(this.x+4,this.y+4)){
        stage.removeChild(this);
        test_h++;
        now_shot--;
      }
            });
            return shot;
        }

         //敵の弾を作成
        var enemy_shot = function(e){
            var shot_e = new Sprite(10, 11);
                  shot_e.image = game.assets['enemy_shot002.gif'];
            shot_e.frame = 0;
            //shot_e_frame = game.frame;
            now_shot_e++;
        shot_e.x = enemy_d_x -2;
        shot_e.y = enemy_d_y +17;
        shot_e.speed = -5;
      shot_e.visible = false;
            shot_e.addEventListener('enterframe', function(e) {
        shot_e_fra++;     /*原因未特定の残像対策*/
        if(shot_e_fra > 1 ){
            shot_e.visible = true;
        }

        this.x += shot_e.speed;

        if(this.x > Math.abs(stage.x) + 320){
          now_shot_e--;
          stage.removeChild(this);
          }
        if(this.x < Math.abs(stage.x) -16){
          now_shot_e--;
          stage.removeChild(this);
        }
        if(this.intersect(player_hantei)){
          if(player_hit_h == 0){
            player_hit_h = 1;
            bar001.value = bar001.value - 60;
          }
        }
                /*for (var i = 0; i < 3; i++) {
                    if(this.intersect(enemys[i])&&ene[i] == 1){
                        stage.removeChild(enemys[i]);
            ene[i] = 0;
            stage.removeChild(this);
            now_shot_e--;
                    }
                }*/
      if(map.hitTest(this.x,this.y)&&
      map.hitTest(this.x,this.y+4)&&
      map.hitTest(this.x+4,this.y)&&
      map.hitTest(this.x+4,this.y+4)){
        stage.removeChild(this);
        test_h++;
        now_shot_e--;
      }
            });
            return shot_e;
        }

         //敵の弾を作成
        var create_hou001_shot = function(e){
            var shot_hou001 = new Sprite(10, 11);
      shot_hou001.image = game.assets['enemy_shot002.gif'];
      shot_hou001.frame = 0;
            //shot_e_frame = game.frame;
            now_shot_002++;
        shot_hou001.x = hou001.x - 9;
        shot_hou001.y = hou001.y + 4;
        shot_hou001.speed = -5;
      //shot_hou001.visible = false;
            shot_hou001.addEventListener('enterframe', function(e) {
        //shot_e_fra++;     /*原因未特定の残像対策*/
        //if(shot_e_fra > 1 ){
        //    shot_hou001.visible = true;
        //}

        this.x += shot_hou001.speed;

        if(this.x > Math.abs(stage.x) + 320){
          now_shot_001--;
          stage.removeChild(this);
          }
        if(this.x < Math.abs(stage.x) -16){
          now_shot_001--;
          stage.removeChild(this);
        }
        if(this.intersect(player_hantei)){
          if(player_hit_h == 0){
            player_hit_h = 1;
            bar001.value = bar001.value - 80;
          }
        }
      if(map.hitTest(this.x,this.y)&&
      map.hitTest(this.x,this.y+4)&&
      map.hitTest(this.x+4,this.y)&&
      map.hitTest(this.x+4,this.y+4)){
        stage.removeChild(this);
        test_h++;
        now_shot_001--;
      }
            });
            return shot_hou001;
        }

    var create_hou002_shot = function(e){
            var shot_hou002 = new Sprite(10, 11);
      shot_hou002.image = game.assets['enemy_shot002.gif'];
      shot_hou002.frame = 0;
            //shot_e_frame = game.frame;
            now_shot_002++;
        shot_hou002.x = hou002.x - 9;
        shot_hou002.y = hou002.y + 4;
        shot_hou002.speed = -5;
      //shot_hou002.visible = false;
            shot_hou002.addEventListener('enterframe', function(e) {
        //shot_e_fra++;     /*原因未特定の残像対策*/
        //if(shot_e_fra > 1 ){
        //    shot_hou002.visible = true;
        //}

        this.x += shot_hou002.speed;

        if(this.x > Math.abs(stage.x) + 320){
          now_shot_002--;
          stage.removeChild(this);
          }
        if(this.x < Math.abs(stage.x) -16){
          now_shot_002--;
          stage.removeChild(this);
        }
        if(this.intersect(player_hantei)){
          if(player_hit_h == 0){
            player_hit_h = 1;
            bar001.value = bar001.value - 80;
          }
        }
      if(map.hitTest(this.x,this.y)&&
      map.hitTest(this.x,this.y+4)&&
      map.hitTest(this.x+4,this.y)&&
      map.hitTest(this.x+4,this.y+4)){
        stage.removeChild(this);
        test_h++;
        now_shot_002--;
      }
            });
            return shot_hou002;
        }

    var create_hou003_shot = function(e){
            var shot_hou003 = new Sprite(10, 11);
      shot_hou003.image = game.assets['enemy_shot004.gif'];
      shot_hou003.frame = 0;
            //shot_e_frame = game.frame;
            now_shot_003++;
        shot_hou003.x = hou003.x - 9;
        shot_hou003.y = hou003.y + 4;
        shot_hou003.speed = -5;
      //shot_hou003.visible = false;
            shot_hou003.addEventListener('enterframe', function(e) {
        //shot_e_fra++;     /*原因未特定の残像対策*/
        //if(shot_e_fra > 1 ){
        //    shot_hou003.visible = true;
        //}

        this.x += shot_hou003.speed;

        if(this.x > Math.abs(stage.x) + 320){
          now_shot_003--;
          stage.removeChild(this);
          }
        if(this.x < Math.abs(stage.x) -16){
          now_shot_003--;
          stage.removeChild(this);
        }
        if(this.intersect(player_hantei)){
          if(player_hit_h == 0){
            player_hit_h = 1;
            bar001.value = bar001.value - 60;
          }
        }
      if(map.hitTest(this.x,this.y)&&
      map.hitTest(this.x,this.y+4)&&
      map.hitTest(this.x+4,this.y)&&
      map.hitTest(this.x+4,this.y+4)){
        stage.removeChild(this);
        test_h++;
        now_shot_003--;
      }
            });
            return shot_hou003;
        }

    var create_hou004_shot = function(e){
            var shot_hou004 = new Sprite(10, 11);
      shot_hou004.image = game.assets['enemy_shot004.gif'];
      shot_hou004.frame = 0;
            //shot_e_frame = game.frame;
            now_shot_004++;
        shot_hou004.x = hou004.x - 9;
        shot_hou004.y = hou004.y + 4;
        shot_hou004.speed = -5;
      //shot_hou004.visible = false;
            shot_hou004.addEventListener('enterframe', function(e) {
        //shot_e_fra++;     /*原因未特定の残像対策*/
        //if(shot_e_fra > 1 ){
        //    shot_hou004.visible = true;
        //}

        this.x += shot_hou004.speed;

        if(this.x > Math.abs(stage_boss.x) + 320){
          now_shot_004--;
          stage_boss.removeChild(this);
          }
        if(this.x < Math.abs(stage_boss.x) -16){
          now_shot_004--;
          stage_boss.removeChild(this);
        }
        if(this.intersect(player_hantei)){
          if(player_hit_h == 0){
            player_hit_h = 1;
            bar001.value = bar001.value - 60;
          }
        }
      if(map.hitTest(this.x,this.y)&&
      map.hitTest(this.x,this.y+4)&&
      map.hitTest(this.x+4,this.y)&&
      map.hitTest(this.x+4,this.y+4)){
        stage_boss.removeChild(this);
        test_h++;
        now_shot_004--;
      }
            });
            return shot_hou004;
        }

    var create_hou005_shot = function(e){
            var shot_hou005 = new Sprite(64,24);
      shot_hou005.image = game.assets['enemy_shot005.gif'];
      shot_hou005.frame = 0;
            //shot_e_frame = game.frame;
            now_shot_005++;
        shot_hou005.x = hou005.x + 10;
        shot_hou005.y = hou005.y + 8;
        shot_hou005.speed = -5;
      //shot_hou005.visible = false;
            shot_hou005.addEventListener('enterframe', function(e) {
        //shot_e_fra++;     /*原因未特定の残像対策*/
        //if(shot_e_fra > 1 ){
        //    shot_hou005.visible = true;
        //}

        this.x += shot_hou005.speed;

        if(this.x > Math.abs(stage_boss.x) + 320){
          now_shot_005--;
          stage_boss.removeChild(this);
          }
        if(this.x < Math.abs(stage_boss.x) -66){
          now_shot_005--;
          stage_boss.removeChild(this);
        }
        if(this.intersect(player_hantei)){
          if(player_hit_h == 0){
            player_hit_h = 1;
            bar001.value = bar001.value - 120;
          }
        }
      if(map.hitTest(this.x,this.y)&&
      map.hitTest(this.x,this.y+4)&&
      map.hitTest(this.x+4,this.y)&&
      map.hitTest(this.x+4,this.y+4)){
        stage_boss.removeChild(this);
        test_h++;
        now_shot_005--;
      }
            });
            return shot_hou005;
        }

         for (var i = 0; i < 5; i++) {
         //エネミー表示準備。３匹作成する。
            var enemy = create_enemy();
      ene[i] = 1;
            enemys.push(enemy);
            stage.addChild(enemy);
        }

        game.addEventListener('spacebuttondown', function() {
            if(shot_frame + shot_lag < game.frame){
                if(max_shot > now_shot){
                    var shot = create_shot();
                    stage.addChild(shot);
          guns.visible = true;
          guns_h = 1;
                }
            }
        });
    shot_button.addEventListener('touchend',function(e){
      if(shot_frame + shot_lag < game.frame){
                if(max_shot > now_shot){
                    var shot = create_shot();
                    stage.addChild(shot);
          guns.visible = true;
          guns_h = 1;
                }
            }
    });

        game.rootScene.backgroundColor = 'rgb(63, 111, 159)';

    my_score_count();
    my_time_count();

    };


    game.start();


};
