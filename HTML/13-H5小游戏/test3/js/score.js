var scoreObj = function() {
    this.fruitNum = 0;
    this.double = 1;
    this.scr = 0;
    this.gameOver = false;
    this.alpha = 0;
}

scoreObj.prototype.draw = function() {
    var w = can1.width;
    var h = can1.height;

    //添加字体阴影
    ctx1.save();
    ctx1.shadowBlur = "10";
    ctx1.shadowColor = "white";
    ctx1.fillStyle = "white";
    //ctx1.fillText("number：" + this.fruitNum, w * 0.5, h - 50);
    //ctx1.fillText("double：" + this.double, w * 0.5, h - 80);
    ctx1.fillText("Score：" + this.scr, w * 0.5, h - 20);

    //显示gameOver
    if (score.gameOver) {
        this.alpha += deltaTime * 0.0005;
        if (this.alpha > 1) {
            this.alpha = 1;
        }
        ctx1.fillStyle = "rgba(255, 255, 255," + this.alpha + ")";
        ctx1.fillText("Game Over", w * 0.5, h * 0.5);
    }
    ctx1.restore();
}

scoreObj.prototype.addScr = function() {
    this.scr += this.fruitNum * 100 * this.double;
    this.fruitNum = 0;
    this.double = 1;
}
