$(window).on('load', function() {
    waterfall();
    var dataInt = { 'data': [{ 'src': '0.jpg' }, { 'src': '1.jpg' }, { 'src': '2.jpg' }, { 'src': '3.jpg' }, { 'src': '4.jpg' }, { 'src': '5.jpg' }] };

    loadImage();

    $(window).on('scroll', loadImage);

    function loadImage() {
        if (checkLoadImg) {
            $.each(dataInt.data, function(key, val) {
                var nBox = $('<div>').addClass('box').appendTo($('#main'));
                var nPic = $('<div>').addClass('Pic').appendTo($(nBox));
                var nImg = $('<img>').attr('src', 'images/' + $(val).attr('src')).appendTo($(nPic));
            });
            waterfall();
        }
    }
});

function checkLoadImg() {
    var $lastBox = $('#main .box').last();
    var lastBoxDis = $lastBox.offset().top + Math.floor($lastBox.outerHieght() / 2);
    var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();
    return lastBoxDis < scrollTop + windowHeight;
}

function waterfall() {
    var $Boxs = $('#main .box');
    var boxWidth = $Boxs.eq(0).outerWidth();
    var cols = Math.floor($(window).width() / boxWidth);
    //整个页面内容居中显示
    //$('#main').width(boxWidth * cols).css('margin', '0 auto');
    $('#main').css({
        width: boxWidth * cols + 'px',
        margin: '0 auto'
    });
    var hArr = [];
    $Boxs.each(function(index, value) {
        var h = $Boxs.eq(index).outerHeight();
        if (index < cols) {
            hArr[index] = h;
        } else {
            var minH = Math.min.apply(null, hArr);
            var minHIndex = $.inArray(minH, hArr); //返回minH在hArr中的索引
            $(value).css({ //$(value)将dom对象value转换为jQuery对象
                position: 'absolute',
                top: minH + 'px',
                left: minHIndex * boxWidth + 'px'
            });
            hArr[minHIndex] += h;
        }
    })
}
