var can1, can2;
var ctx1, ctx2;

var canWidth, canHeight; //canvas尺寸

var lastTime, deltaTime; //设置时间差调整小鱼移动速度

var bgPic = new Image(); //定义背景图片

var ane; //海葵对象

var fruit; //果实对象

var mom; //大鱼对象

var baby; //小鱼对象

var mx, my; //鼠标位置，使得大鱼根据鼠标位置移动

var babyTail = []; //存储小鱼尾巴图片
var babyEye = []; //小鱼眼睛
var babyBody = []; //小鱼身体

var momTail = []; //存储大鱼尾巴图片
var momEye = []; //大鱼眼睛
var momBodyOrg = [],
    momBodyBlue = []; //大鱼身体

var score; //游戏分值

var wave;  //碰撞圆圈特效
var halo;  //大鱼喂小鱼圆圈

var dust;      //漂浮物
var dustPic = [];

document.body.onload = game;

function game() {
    //console.log("start");
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameloop();
}

/**初始化
 **/
function init() {
    //获取canvas context
    can1 = document.getElementById('canvas1'); //前面的画布，fishes, dust, UI, circle, score
    ctx1 = can1.getContext('2d');
    can2 = document.getElementById('canvas2'); //后面的画布，background, ane, fruits
    ctx2 = can2.getContext('2d');

    can1.addEventListener('mousemove', onMouseMove, false); //添加鼠标移动监测事件

    bgPic.src = "./src/background.jpg"; //加载背景图

    canWidth = can1.width; //获取canvas的尺寸
    canHeight = can1.height;

    ane = new aneObj();
    ane.init();

    fruit = new fruitObj();
    fruit.init();

    mom = new momObj();
    mom.init();

    baby = new babyObj();
    baby.init();

    mx = canWidth * 0.5;
    my = canHeight * 0.5;

    //初始化小鱼尾巴资源
    for (var i = 0; i < 8; i++) {
        babyTail[i] = new Image();
        babyTail[i].src = "./src/babyTail" + i + ".png";
    }

    //初始化小鱼眼睛资源
    for (var i = 0; i < 2; i++) {
        babyEye[i] = new Image();
        babyEye[i].src = "./src/babyEye" + i + ".png";
    }

    //初始化小鱼身体资源
    for (var i = 0; i < 20; i++) {
        babyBody[i] = new Image();
        babyBody[i].src = "./src/babyFade" + i + ".png";
    }

    //初始化大鱼尾巴资源
    for (var i = 0; i < 8; i++) {
        momTail[i] = new Image();
        momTail[i].src = "./src/bigTail" + i + ".png";
    }

    //初始化大鱼眼睛资源
    for (var i = 0; i < 2; i++) {
        momEye[i] = new Image();
        momEye[i].src = "./src/bigEye" + i + ".png";
    }

    //初始化大鱼身体资源
    for (var i = 0; i < 8; i++) {
        momBodyOrg[i] = new Image();
        momBodyBlue[i] = new Image();
        momBodyOrg[i].src = "./src/bigSwim" + i + ".png";
        momBodyBlue[i].src = "./src/bigSwimBlue" + i + ".png";
    }
    ctx1.font = "30px Verdana";
    ctx1.textAlign = "center"; //left、 center、 right

    score = new scoreObj();

    wave = new waveObj();  //碰撞圆圈特效
    wave.init();

    halo = new haloObj();  //大鱼喂小鱼圆圈
    halo.init();

    for(var i = 0; i<7; i++){
    	dustPic[i] = new Image();
    	dustPic[i].src = "./src/dust" + i + ".png";
    }
    dust = new dustObj();  //漂浮物
    dust.init();

}

/**循环播放
 **/
function gameloop() {
    requestAnimFrame(gameloop); //setInterval, setTimeout, frame per second
    //console.log('loop');
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    //console.log(deltaTime);

    if (deltaTime > 40) deltaTime = 40;

    drawBackground();

    ane.draw(); //绘制海葵

    fruitMonitor(); //保证屏幕出现的海葵果实数量

    fruit.draw(); //绘制果实

    ctx1.clearRect(0, 0, canWidth, canHeight); //绘制前先清除画布内容

    mom.draw(); //绘制大鱼

    baby.draw(); //绘制小鱼

    momFruitsCollision(); //大鱼吃果实

    momBabyCollision(); //大鱼喂小鱼

    score.draw(); //显示分值

    wave.draw();  //显示碰撞圆圈

    halo.draw();  //大鱼喂小鱼圆圈

    dust.draw();  //绘制漂浮物
}

function onMouseMove(e) {
    if (!score.gameOver) {
        if (e.offSetX || e.layerX) {
            mx = e.offSetX == undefined ? e.layerX : e.offSetX;
            my = e.offSetY == undefined ? e.layerY : e.offSetY;
            //console.log(mx);
            //console.log(my);
        }
    }
}
