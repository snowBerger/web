function showNumberAnimation(i, j, number) {
    var numberCell = $('#number-cell-' + i + '-' + j);
    numberCell.css('background-color', getNumberBGColor(number));
    numberCell.css('color', getNumberColor(number));
    if (number.toString().length <= 3) {
        numberCell.css('font-size', gridCellWidth / 4 + 'px');
    } else {
        numberCell.css('font-size', parseInt(gridCellWidth / 4 - 2 * number.toString().length) + 'px');
    }
    numberCell.text(number);
    numberCell.text(getNumberGrade(number));

    numberCell.animate({
        width: gridCellWidth,
        height: gridCellWidth,
        top: getPosTop(i),
        left: getPosLeft(j)
    }, 50)
}

/**
 *position: 左右平移时 tx=fx, position代表ty
 */
function showMoveAnimationHorizontal(fx, fy, ty) {
    var numberCell = $('#number-cell-' + fx + '-' + fy);
    numberCell.animate({
        /*top: getPosTop(fx),*/
        left: getPosLeft(ty)
    }, 200);
}

/**
 *position: 上下平移时 ty=fy, position 代表tx
 */
function showMoveAnimationVertical(fx, fy, tx) {
    var numberCell = $('#number-cell-' + fx + '-' + fy);
    numberCell.animate({
        top: getPosTop(tx)
            /*left: getPosLeft(fy)*/
    }, 200);
}

function updateScore(score) {
    var scr = $('#score');
    scr.text(score);
}
