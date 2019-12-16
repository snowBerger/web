//判断大鱼和果实的距离
function momFruitsCollision() {
    if (!score.gameOver) {
        for (var i = 0; i < fruit.num; i++) {
            if (fruit.alive[i]) {
                //计算距离
                var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
                if (l < 900) {
                    //eat fruit
                    fruit.dead(i);
                    score.fruitNum++;
                    mom.momBodyCount++;
                    if (mom.momBodyCount > 7) {
                        mom.momBodyCount = 7;
                    }
                    if (fruit.fruitType[i] == "blue") {
                        score.double = 2;
                    }
                    wave.born(fruit.x[i], fruit.y[i]);
                }
            }
        }
    }
}

//mom baby collision     大鱼喂小鱼
function momBabyCollision() {
    if (score.fruitNum > 0 && !score.gameOver) {
        var l = calLength2(mom.x, mom.y, baby.x, baby.y);
        if (l < 900) {
            //baby recover
            baby.babyBodyCount = 0;
            //大鱼喂小鱼后身体颜色变白
            mom.momBodyCount = 0;
            //score update
            score.addScr();
            //draw halo
            halo.born(baby.x, baby.y);
        }
    }
}
