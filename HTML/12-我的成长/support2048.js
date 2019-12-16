documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
gridCellWidth = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;

function getPosTop(i) {
    return cellSpace + i * (gridCellWidth + cellSpace);
}

function getPosLeft(j) {
    return cellSpace + j * (gridCellWidth + cellSpace);
}

function getNumberBGColor(val) {
    switch (val) {
        case 2:
            return "#eee4da"
            break;
        case 4:
            return "#ede0c8"
            break;
        case 8:
            return "#f2b179"
            break;
        case 16:
            return "#f59563"
            break;
        case 32:
            return "#f67c5f"
            break;
        case 64:
            return "#f65e3b"
            break;
        case 128:
            return "#edcf72"
            break;
        case 256:
            return "#edcc61"
            break;
        case 512:
            return "#9c0"
            break;
        case 1024:
            return "#DDEC13"
            break;
        case 2048:
            return "#EA6B23"
            break;
        case 4096:
            return "#E90F06"
            break;
        case 8192:
            return "#094DE9"
            break;
        case 16384:
            return "#B58AEB"
            break;
        case 32768:
            return "#8A10F8"
            break;
        case 65536:
            return "#EB3BE2"
            break;
        default:
            return "black"
            break;
    }
}

function getNumberGrade(val) {
    switch (val) {
        case 2:
            return "幼儿"
            break;
        case 4:
            return "小学"
            break;
        case 8:
            return "初中"
            break;
        case 16:
            return "高中"
            break;
        case 32:
            return "大学"
            break;
        case 64:
            return "硕士"
            break;
        case 128:
            return "博士"
            break;
        case 256:
            return "博士后"
            break;
        case 512:
            return "博导"
            break;
        case 1024:
            return "公知"
            break;
        case 2048:
            return "砖家"
            break;
        case 4096:
            return "肘子"
            break;
        case 8192:
            return "小崔"
            break;
        case 16384:
            return "网红"
            break;
        case 32768:
            return "超级丹"
            break;
        case 65536:
            return "键盘侠"
            break;
        default:
            return "金三胖"
            break;
    }
}

function getNumberColor(val) {
    if (val <= 4) {
        return "#776e65";
    }
    return "white";
}

function nospace() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0)
                return false;
        }
    }
    return true;
}

function canMoveLeft() {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                if ((board[i][j - 1] == 0) || (board[i][j - 1] == board[i][j])) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp() {
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                if ((board[i - 1][j] == 0) || (board[i - 1][j] == board[i][j])) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] != 0) {
                if ((board[i][j + 1] == 0) || (board[i][j + 1] == board[i][j])) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                if ((board[i + 1][j] == 0) || (board[i + 1][j] == board[i][j])) {
                    return true;
                }
            }
        }
    }
    return false;
}

function noMove(board) {
    if (canMoveLeft(board) ||
        canMoveUp(board) ||
        canMoveRight(board) ||
        canMoveDown(board))
        return false;
    return true;
}
