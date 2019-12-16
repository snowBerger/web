var canvasWidth = Math.min(800, $(window).width() - 20);
var canvasHeight = canvasWidth;

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var strokeColor = "black";

var isMouseDown = false;

var lastLoc = {
    x: 0,
    y: 0
};

var lastTimeStamp = 0;

var lastLineWidth = -1;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

$("#controller").css("width", canvasWidth + "px");
drawGrid();

/*document.onmousedown = function(e) {
    alert(e.clientX + ", " + e.clientY);
}*/

$("#btn-clear").click(
    function(e) {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        drawGrid();
    }
);

$(".color_btn").click(
    function(e) {
        $(".color_btn").removeClass("color_btn_selected");
        $(this).addClass("color_btn_selected");
        strokeColor = $(this).css("background-color");
    }
);

function beginStroke(pointer) {
    isMouseDown = true;
    lastLoc = windowToCanvas(pointer.x, pointer.y);
    lastTimeStamp = new Date().getTime();
}

function endStroke() {
    isMouseDown = false;
}

function moveStroke(pointer) {
    var curLoc = windowToCanvas(pointer.x, pointer.y);
    var curTimeStamp = new Date().getTime();
    var s = getDistance(lastLoc.x, lastLoc.y, curLoc.x, curLoc.y);
    var t = curTimeStamp - lastTimeStamp;
    var lineWidth = getLineWidth(s, t);
    //draw
    context.beginPath();
    context.moveTo(lastLoc.x, lastLoc.y);
    context.lineTo(curLoc.x, curLoc.y);
    context.strokeStyle = strokeColor;
    context.closePath();
    context.lineWidth = lineWidth;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
    lastLoc = curLoc;
    lastTimeStamp = curTimeStamp;
    lastLineWidth = lineWidth;
}

canvas.onmousedown = function(e) {
    e.preventDefault();
    beginStroke({
        x: e.clientX,
        y: e.clientY
    });
}

canvas.onmouseup = function(e) {
    e.preventDefault();
    endStroke();
    //console.log("mouse up");

}

canvas.onmouseout = function(e) {
    e.preventDefault();
    endStroke();
    //console.log("mouse out");
}

canvas.onmousemove = function(e) {
    e.preventDefault();
    if (isMouseDown) {
        //console.log("mouse move");
        moveStroke({
            x: e.clientX,
            y: e.clientY
        });
    }
}

canvas.addEventListener('touchstart', function(e) {
    e.preventDefault();
    var touch = e.touches[0];
    beginStroke({
        x: touch.pageX,
        y: touch.pageY
    });
});

canvas.addEventListener('touchmove', function(e) {
    e.preventDefault();
    if (isMouseDown) {
        var touch = e.touches[0];
        moveStroke({
            x: touch.pageX,
            y: touch.pageY
        });
    }
});

canvas.addEventListener('touchend', function(e) {
    e.preventDefault();
    endStroke();
});

var maxLineWidth = 30;
var minLineWidth = 1;
var maxV = 10;
var minV = 0.1;

function getLineWidth(s, t) {
    var v = s / t;
    var lineWidth;
    if (v <= minV) {
        lineWidth = maxLineWidth;
    } else if (v >= maxV) {
        lineWidth = minLineWidth;
    } else {
        lineWidth = maxLineWidth - (v - minV) / (maxV - minV) * (maxLineWidth - minLineWidth);
    }
    if (lastLineWidth == -1) {
        return lineWidth;
    }
    return lastLineWidth * 2 / 3 + lineWidth * 1 / 3;
}

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

function windowToCanvas(x, y) {
    var box = canvas.getBoundingClientRect(); //获取canvas元素的外层包围盒
    return {
        x: Math.round(x - box.left),
        y: Math.round(y - box.top)
    };
}

function drawGrid() {
    context.save();
    context.strokeStyle = "rgb(230, 11, 9)";
    //绘制边框
    context.beginPath();
    context.moveTo(3, 3);
    context.lineTo(canvasWidth - 3, 3);
    context.lineTo(canvasWidth - 3, canvasHeight - 3);
    context.lineTo(3, canvasHeight - 3);
    context.closePath();

    context.lineWidth = 6;
    context.stroke();

    //绘制对角线
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(canvasWidth, canvasHeight);

    context.moveTo(canvasWidth, 0);
    context.lineTo(0, canvasHeight);

    context.moveTo(0, canvasHeight / 2);
    context.lineTo(canvasWidth, canvasHeight / 2);

    context.moveTo(canvasWidth / 2, 0);
    context.lineTo(canvasWidth / 2, canvasHeight);

    context.lineWidth = 1;
    context.setLineDash([5, 5]);
    context.stroke();
    context.restore();
}
