var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;

var RADIUS = 8;

var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

/*const endTime = new Date(2016, 0, 1, 0, 0, 0);*/
var endTime = new Date();
endTime.setTime(endTime.getTime() + 1000 * 10);
var curShowTimeSeconds = 0;

var balls = []; //存放小球
var colors = ["#33b5e5", "#0099cc", "#aa66cc", "#9933cc", "#99cc00", "#669900", "#ffbb33", "#ff8800", "#ff4444", "#cc000c"]; //存放小球颜色

window.onload = function() {
    WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = (document.documentElement.clientHeight == 0) ? document.body.clientHeight : document.documentElement.clientHeight;
    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1;
    MARGIN_TOP = Math.round(WINDOW_HEIGHT * 1 / 5);

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds();

    setInterval(function() {
        //render
        render(ctx); //显示时间
        update(); //生成小球
    }, 50);
}

function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    //倒计时
    var ret = endTime.getTime() - curTime.getTime();
    if (ret < 0 && ret > -1000) {
        ret = -1;
    } else {
        ret = Math.round(ret / 1000);
    }
    //return ret > 0 ? ret : 0;
    return ret;
    //时钟
    /*var ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
    return ret;*/
}

function update() {
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();
    if (nextShowTimeSeconds >= 0) {
        var nextHours = parseInt(nextShowTimeSeconds / 3600);
        var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);
        var nextSeconds = nextShowTimeSeconds % 60;

        var curHours = parseInt(curShowTimeSeconds / 3600);
        var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60);
        var curSeconds = curShowTimeSeconds % 60;

        if (nextSeconds != curSeconds) {
            //add balls
            if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
                addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(curHours / 10));
            }
            if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
                addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHours % 10));
            }

            if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
                addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10));
            }
            if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
                addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10));
            }

            if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
                addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds / 10));
            }
            if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
                addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds % 10));
            }
            curShowTimeSeconds = nextShowTimeSeconds;
        }
    }
    if (nextShowTimeSeconds == 0) {
        addBalls(MARGIN_LEFT, MARGIN_TOP, 0);
        addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, 0);
        addBalls(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10);
        addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, 0);
        addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, 0);
        addBalls(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10);
        addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, 0);
    }
    updateBalls();
}

function updateBalls() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.75;
        }
    }

    var count = 0;
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) {
            balls[count++] = balls[i];
        }
    }

    //console.log(balls.length);
    while (balls.length > Math.min(count, 600)) {
        balls.pop();
    }
}

function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -5,
                    color: colors[Math.floor(Math.random() * colors.length)],
                }
                balls.push(aBall);
            }
        }
    }
}

/**显示数字
 **/
function render(ctx) {
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

    if (curShowTimeSeconds > 0) {
        var hours = parseInt(curShowTimeSeconds / 3600);
        var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
        var seconds = curShowTimeSeconds % 60;

        renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), ctx);
        renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), ctx);
        renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, ctx);
        renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), ctx);
        renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), ctx);
        renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, ctx);
        renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), ctx);
        renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), ctx);
    }

    //绘制小球
    for (var i = 0; i < balls.length; i++) {
        ctx.fillStyle = balls[i].color;

        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI);
        ctx.closePath();

        ctx.fill();
    }
}

function renderDigit(x, y, num, ctx) {
    ctx.fillStyle = "rgb(0, 102, 153)";
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                ctx.beginPath();
                ctx.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
                ctx.closePath();

                ctx.fill();
            }
        }
    }
}
