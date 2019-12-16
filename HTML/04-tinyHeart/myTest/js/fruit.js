var fruitObj = function() {
    this.alive = []; //bool
    this.x = [],
        this.y = []; //记录产生海葵果实的坐标
    this.aneNo = []; //记录对应的每一个海葵
    this.l = []; //记录海葵果实大小
    this.speed = []; //记录果实成长速度，fly up 的速度
    this.fruitType = []; //果实类型 orange, blue
    this.orange = new Image();
    this.blue = new Image();
}

fruitObj.prototype.num = 30;

fruitObj.prototype.init = function() {
    for (var i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.aneNo[i] = 0;
        this.l[i] = 0;
        this.speed[i] = Math.random() * 0.017 + 0.003; //[0.003, 0.02)
        this.fruitType[i] = "";
    }
    this.orange.src = "./src/fruit.png";
    this.blue.src = "./src/blue.png";
}

/**画果实
 **/
fruitObj.prototype.draw = function() {
    for (var i = 0; i < this.num; i++) {
        //draw
        //find an ane, grow, fly up
        if (this.alive[i]) {
            if (this.fruitType[i] == "blue") {
                var pic = this.blue;
            } else {
                var pic = this.orange;
            }
            if (this.l[i] <= 14) {
            	this.x[i] = ane.headx[this.aneNo[i]];
            	this.y[i] = ane.heady[this.aneNo[i]];
                this.l[i] += this.speed[i] * deltaTime; //grow
            } else {
                this.y[i] -= this.speed[i] * 6 * deltaTime; //fly up 
            }
            ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
            if (this.y[i] < 10) {
                this.alive[i] = false;
            }
        }

    }
}

fruitObj.prototype.born = function(i) {
    this.aneNo[i] = Math.floor(Math.random() * ane.num);
    //this.x[i] = ane.headx[aneId];
    //this.y[i] = ane.heady[aneId];
    this.l[i] = 0;
    this.alive[i] = true;
    var ran = Math.random();
    if (ran < 0.2) {
        this.fruitType[i] = "blue"; //orange, blue 
    } else {
        this.fruitType[i] = "orange";
    }
}

/**大鱼吃掉果实
 **/
fruitObj.prototype.dead = function(i) {
    this.alive[i] = false;
}

/**果实数量检测，保证屏幕出现的果实在一定数量内
 **/
function fruitMonitor() {
    var num = 0;
    for (var i = 0; i < fruit.num; i++) {
        if (fruit.alive[i]) num++;
    }
    if (num < 15) {
        //send fruit
        sendFruit();
        return;
    }
}

function sendFruit() {
    for (var i = 0; i < fruit.num; i++) {
        if (!fruit.alive[i]) {
            fruit.born(i);
            return;
        }
    }
}
