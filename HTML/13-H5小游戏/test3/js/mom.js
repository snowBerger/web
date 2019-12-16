var momObj = function() {
    this.x;
    this.y;
    this.angle;
    //this.bigEye = new Image();
    //this.bigBody = new Image();
    //this.bigTail = new Image();

    this.momTailTimer = 0;
    this.momTailCount = 0;

    this.momEyeTimer = 0;
    this.momEyeCount = 0;
    this.momEyeInterval = 1000;

    this.momBodyCount = 0;
}

momObj.prototype.init = function() {
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    this.angle = 0;
    //this.bigEye.src = "./src/bigEye0.png";
    //this.bigBody.src = "./src/bigSwim0.png";
    //this.bigTail.src = "./src/bigTail0.png";
}

momObj.prototype.draw = function() {
    //lerp x, y   使大鱼趋向于鼠标位置
    this.x = lerpDistance(mx, this.x, 0.993);
    this.y = lerpDistance(my, this.y, 0.993);

    //delta angle
    //Math.atan2(y, x)
    var deltaY = my - this.y;
    var deltaX = mx - this.x;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI; //返回值[-PI, PT]

    //lerp angle   使得大鱼的角度趋向于鼠标角度
    this.angle = lerpAngle(beta, this.angle, 0.6);

    //mom tail count   大鱼尾巴摆动
    this.momTailTimer += deltaTime;
    if (this.momTailTimer > 50) {
        this.momTailCount = (this.momTailCount + 1) % 8;
        this.momTailTimer %= 50;
    }

    //mom eye count
    this.momEyeTimer += deltaTime;
    if (this.momEyeTimer > this.momEyeInterval) {
        this.momEyeCount = (this.momEyeCount + 1) % 2;
        this.momEyeTimer %= this.momEyeInterval;
        if (this.momEyeCount == 0) {
            this.momEyeInterval = Math.random() * 1500 + 2000; //[2000, 3500)
        } else {
            this.momEyeInterval = 200;
        }
    }

    ctx1.save(); //只适用于大鱼
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);

    var momTailCount = this.momTailCount;
    ctx1.drawImage(momTail[momTailCount], -momTail[momTailCount].width * 0.5 + 30, -momTail[momTailCount].height * 0.5);
    var momBodyCount = this.momBodyCount;
    if (score.double == 1) {
        ctx1.drawImage(momBodyOrg[momBodyCount], -momBodyOrg[momBodyCount].width * 0.5, -momBodyOrg[momBodyCount].height * 0.5);
    } else {
        ctx1.drawImage(momBodyBlue[momBodyCount], -momBodyBlue[momBodyCount].width * 0.5, -momBodyBlue[momBodyCount].height * 0.5);
    }
    var momEyeCount = this.momEyeCount;
    ctx1.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width * 0.5, -momEye[momEyeCount].height * 0.5);
    ctx1.restore();
}
