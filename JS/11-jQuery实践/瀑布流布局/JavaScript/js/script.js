window.onload = function() {
    waterfall('main', 'box');
    var dataInt = { 'data': [{ 'src': '0.jpg' }, { 'src': '1.jpg' }, { 'src': '2.jpg' }, { 'src': '3.jpg' }, { 'src': '4.jpg' }, { 'src': '5.jpg' }] };

    //初始情况下页面内容不够时填充
    loadImage();

    window.onscroll = loadImage;

    function loadImage() {
        if (checkLoadImg) {
            var parent = document.getElementById('main');
            //将数据块渲染到页面底部
            for (var i = 0, l = dataInt.data.length; i < l; i++) {
                var nBox = document.createElement('div');
                nBox.className = 'box';
                parent.appendChild(nBox);
                var nPic = document.createElement('div');
                nPic.className = 'pic';
                nBox.appendChild(nPic);
                var nImg = document.createElement('img');
                nImg.src = "images/" + dataInt.data[i].src;
                nPic.appendChild(nImg);
            }
            waterfall('main', 'box');
        }
    }
}

function checkLoadImg() {
    var parent = document.getElementById("main");
    var boxs = getByClassName(parent, 'box');
    var lastBox = boxs[boxs.length - 1];
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var windowHeight = document.body.clientHeight || document.documentElement.clientHeight;
    return lastBox.offsetTop + Math.floor(lastBox.offsetHeight / 2) < scrollTop + windowHeight;
}

function getByClassName(obj, cls) {
    var elements;
    var array = [];
    if (obj) {
        elements = obj.getElementsByTagName("*");
    } else {
        elements = docuemnt.getElementsByTagName("*");
    }
    for (var i = 0, l = elements.length; i < l; i++) {
        if (elements[i].className == cls) {
            array.push(elements[i]);
        }
    }
    return array;
}

function getMinHIndex(arr, val) {
    for (var i in arr) {
        if (arr[i] == val)
            return i;
    }
}

function waterfall(parent, box) {
    //取出所有的parent下的class为box的元素
    var objParent = document.getElementById(parent);
    var myArr = getByClassName(objParent, box);
    //计算整个页面显示的列数
    var boxWidth = myArr[0].offsetWidth;
    //console.log(boxWidth);
    var cols = Math.floor(document.documentElement.clientWidth / boxWidth);
    //设置main的宽使页面居中
    objParent.style.cssText = 'width:' + boxWidth * cols + 'px; margin: 0 auto;';
    var hArr = []; //存放每一列高度
    for (var i = 0, l = myArr.length; i < l; i++) {
        if (i < cols) {
            hArr[i] = myArr[i].offsetHeight;
        } else {
            var minH = Math.min.apply(null, hArr);
            var minHIndex = getMinHIndex(hArr, minH);
            myArr[i].style.position = "absolute";
            myArr[i].style.top = minH + 'px';
            //myArr[i].style.left = boxWidth * minHIndex +'px';
            myArr[i].style.left = myArr[minHIndex].offsetLeft + 'px';
            hArr[minHIndex] += myArr[i].offsetHeight;
        }
    }
}
