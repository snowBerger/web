/**海葵对象
 **/
var aneObj = function() {
    /*this.x = [],
        this.len = [];*/
    // start point, control point, end point(sin)
    this.rootx = [];
    this.headx = [];
    this.heady = [];
    this.alpha = 0;  //海葵摆动角度sin值
    this.amp = [];  //海葵的振幅
}

aneObj.prototype.num = 50;

aneObj.prototype.init = function() {
    for (var i = 0; i < this.num; i++) {
        this.rootx[i] = i * 16 + Math.random() * 20; //海葵之间的间距，random值为[0, 1)
		this.headx[i] = this.rootx[i];
		this.heady[i] = canHeight - 235 + Math.random() * 50;
		this.amp[i] = Math.random() * 50 + 50;

        //this.len[i] = 200 + Math.random() * 50; //海葵高度
    }
    //console.log('a');
}

aneObj.prototype.draw = function() {
	this.alpha += deltaTime * 0.0008;
	var l = Math.sin(this.alpha);  //[-1, 1]
    ctx2.save();
    ctx2.globalAlpha = 0.6;
    ctx2.lineWidth = 20;
    ctx2.lineCap = "round"; //线顶端为圆形
    ctx2.strokeStyle = "#3b154e";
    for (var i = 0; i < this.num; i++) {
        //beginPath, moveTo, lineTo, stroke, strokeStyle, lineWidth, lineCap, globalAlpha
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i], canHeight);
        //ctx2.lineTo(this.x[i], canHeight - this.len[i]);
        this.headx[i] = this.rootx[i] + l * this.amp[i]
        ctx2.quadraticCurveTo(this.rootx[i], canHeight - 100, this.headx[i], this.heady[i]);
        ctx2.stroke();
    }
    ctx2.restore();
}
