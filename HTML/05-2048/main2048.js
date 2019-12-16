//数字盘
var board = new Array();
//分值
var score = 0;
//判断是否已经合并
var isAdd = new Array();

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function() {
    prepareForMobile();
    newgame();
});

function prepareForMobile() {
    if (documentWidth > 500) {
        gridContainerWidth = 500;
        gridCellWidth = 100;
        cellSpace = 20;
    }

    $('#grid-container').css('width', gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('height', gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('padding', cellSpace);
    $('#grid-container').css('border-radius', 0.02 * gridContainerWidth);

    $('.grid-cell').css('width', gridCellWidth);
    $('.grid-cell').css('height', gridCellWidth);
    $('.grid-cell').css('border-radius', 0.02 * gridCellWidth);
}

function newgame() {
    //初始化棋盘格
    init();
    //随机生成两个初始数
    generateOneNumber();
    generateOneNumber();
}

function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top', getPosTop(i));
            gridCell.css('left', getPosLeft(j));
        }
    }

    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        isAdd[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            isAdd[i][j] = false;
        }
    }

    //更新数据
    updateBoardView();

    //初始化分数
    score = 0;
    $('#score').text(score);
}

function updateBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $('#grid-container').append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var aCell = $('#number-cell-' + i + '-' + j);

            if (board[i][j] == 0) {
                aCell.css('width', 0);
                aCell.css('height', 0);
                aCell.css('top', gridCellWidth / 2 + getPosTop(i));
                aCell.css('left', gridCellWidth / 2 + getPosLeft(j));
            } else {
                aCell.css('width', gridCellWidth);
                aCell.css('height', gridCellWidth);
                aCell.css('top', getPosTop(i));
                aCell.css('left', getPosLeft(j));
                aCell.css('background-color', getNumberBGColor(board[i][j]));
                aCell.css('color', getNumberColor(board[i][j]));
                if (board[i][j].toString().length <= 3) {
                    aCell.css('font-size', gridCellWidth / 2 + 'px');
                } else {
                    aCell.css('font-size', parseInt(gridCellWidth / 2 - 2 * board[i][j].toString().length) + 'px');
                }
                aCell.text(board[i][j]);
            }
            isAdd[i][j] = false;
        }
    }
    $('.number-cell').css('line-height', gridCellWidth + 'px');
    /*$('.number-cell').css('font-size', 0.5 * gridCellWidth + 'px');*/
}

function generateOneNumber() {
    if (nospace(board))
        return false;

    //随机位置
    var ranx = parseInt(Math.floor(Math.random() * 4));
    var rany = parseInt(Math.floor(Math.random() * 4));

    var times = 0;
    while (times < 50) {
        if (board[ranx][rany] == 0)
            break;
        ranx = parseInt(Math.floor(Math.random() * 4));
        rany = parseInt(Math.floor(Math.random() * 4));
        times++;
    }
    if (times == 50) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] == 0) {
                    ranx = i;
                    rany = j;
                }
            }
        }
    }

    //随机数字
    var ranNum = Math.random() < 0.5 ? 2 : 4;
    //在随机位置显示随机数字
    board[ranx][rany] = ranNum;
    showNumberAnimation(ranx, rany, ranNum);

    return true;
}

$(document).keydown(function(event) {
    switch (event.keyCode) {
        case 37: //left
            event.preventDefault();
            if (moveLeft()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        case 38: //up
            event.preventDefault();
            if (moveUp()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        case 39: //right
            event.preventDefault();
            if (moveRight()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        case 40: //down
            event.preventDefault();
            if (moveDown()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        default:
            break;
    }
});

document.addEventListener('touchmove', function(event){
    event.preventDefault();
});

document.addEventListener('touchstart', function(event) {
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});

document.addEventListener('touchend', function(event) {
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltax = endx - startx;
    var deltay = endy - starty;

    if (Math.abs(deltax) < 0.3 * documentWidth && Math.abs(deltay) < 0.3 * documentWidth)
        return;

    //x
    if (Math.abs(deltax) > Math.abs(deltay)) {
        //right
        if (deltax > 0) {
            if (moveRight()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
        }
        //left
        else {
            if (moveLeft()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
        }
    }
    //y
    else {
        //down
        if (deltay > 0) {
            if (moveDown()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
        }
        //up
        else {
            if (moveUp()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
        }
    }

});

function isGameOver() {
    if (nospace(board) && noMove(board)) {
        gameOver();
    }
}

function gameOver() {
    alert("Game Over!");
}

function moveLeft() {
    if (!canMoveLeft())
        return false

    //move left
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        //move
                        showMoveAnimationHorizontal(i, j, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !isAdd[i][k]) {
                        //move
                        showMoveAnimationHorizontal(i, j, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore(score);
                        //update isAdd
                        isAdd[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveUp() {
    if (!canMoveUp())
        return false;

    //move Up
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlockVertical(i, j, k, board)) {
                        //move
                        showMoveAnimationVertical(i, j, k);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    if (board[k][j] == board[i][j] && noBlockVertical(i, j, k, board) && !isAdd[k][j]) {
                        //move
                        showMoveAnimationVertical(i, j, k);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore(score);
                        //update isAdd
                        isAdd[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveRight() {
    if (!canMoveRight())
        return false;

    //move right
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        //move
                        showMoveAnimationHorizontal(i, j, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !isAdd[i][k]) {
                        //move
                        showMoveAnimationHorizontal(i, j, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore(score);
                        //update isAdd
                        isAdd[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveDown() {
    if (!canMoveDown())
        return false;

    //move down
    for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlockVertical(k, j, i, board)) {
                        //move
                        showMoveAnimationVertical(i, j, k);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    if (board[k][j] == board[i][j] && noBlockVertical(k, j, i, board) && !isAdd[k][j]) {
                        //move
                        showMoveAnimationVertical(i, j, k);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore(score);
                        //update isAdd
                        isAdd[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

function noBlockHorizontal(sx, maxy, miny, board) {
    for (var l = miny + 1; l < maxy; l++) {
        if (board[sx][l] != 0)
            return false;
    }
    return true;
}

function noBlockVertical(maxx, sy, minx, board) {
    for (var l = minx + 1; l < maxx; l++) {
        if (board[l][sy] != 0) {
            return false;
        }
    }
    return true;
}
