// page init
$(document).ready(function() {
    /**
     * 全局变量
     */
    var totalNumber = 300;//抽奖总人数
    var fullList_key = "employee_list"; // local Storage key
    var luckyListObj_key = "lucky_list"; // local Storage key
    var luckyConfig = { // 数据对象
        luckyListObj:{
            defaultLuckyList:[],//默认，不设等级
            levelList_1:[],//一等奖
            levelList_2:[],//二等奖
            levelList_3:[],//三等奖
            levelList_4:[],//四等奖
            levelList_5:[],//五等奖
            levelList_t:[],//特等奖
        },
        level: '',//等级000
        defaultText: '000',//等级000
        isStart: false,//是否开始
        refreshId: null,//定时器
        currentLuckyNum: -1,//当前中奖号
        employeeList: [],//未中奖名单
        canKeyDownStart:true,//是否触发开始件
        minInterval:1000,//最小间隔时间，保证动画能够播放完
        isPlayAudio:true //是否播放音频
    };
    var keyDownShift = false //是否按下Shift键
    /*彩球的背景数组*/
    // var colorArry = ['#11e4bf','#a922bd','#48df7f','#4456fd','#c3a79d','#e21244','#fb521c','#399bb9','#f9c05f','#f7715d','#f1c734','#47d819','#d9efce','#f1eeea','#e87d97','#62a5e8','#85cef8','#32dd42','#c47c02','#b7ecdb','#339426','#d61dcf','#774cf5','#a7b4e0','#e65183','#b816e0','#6e53fd','#118ee8','#da7ab3','#8672f1']
    // var db = localStorage;
    var docCookies = {
      getItem: function (sKey) {
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
      },
      setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
        var sExpires = "";
        if (vEnd) {
          switch (vEnd.constructor) {
            case Number:
              sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
              break;
            case String:
              sExpires = "; expires=" + vEnd;
              break;
            case Date:
              sExpires = "; expires=" + vEnd.toUTCString();
              break;
          }
        }
        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true;
      },
      removeItem: function (sKey, sPath, sDomain) {
        if (!sKey || !this.hasItem(sKey)) { return false; }
        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
        return true;
      },
      hasItem: function (sKey) {
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
      },
      keys: /* optional method: you can safely remove it! */ function () {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
        return aKeys;
      }
    };

    /**/
    /**
     * 刷新和初始化
     * total为初始的抽奖数，必须第一次或者清空local Storge才能有效赋值
     */
    var init = function (total) {
      $("#luckyName").text(luckyConfig.defaultText)
      $(".content").height(window.innerHeight)
      if(!docCookies.getItem(fullList_key)){
        for (var i = 0 ; i< total ; i++) {
          // var employeeObj = {}
          // employeeObj.number = i+1
          // employeeObj.number =  PrefixInteger(i+1,3)

          luckyConfig.employeeList.push(PrefixInteger(i+1,3))
        }
        docCookies.setItem(fullList_key, JSON.stringify(shuffle(shuffle(shuffle(luckyConfig.employeeList)))));
      }
      lotterryLevel()
      switcherMusic()
    }

    /*输入抽奖数量，进行初始化*/
    init(totalNumber)
    /**
     * 判断抽几等奖
     */
    function lotterryLevel() {
        if (docCookies.getItem(luckyListObj_key)) {
            var luckyListObjJson = docCookies.getItem(luckyListObj_key)
            var luckyListObj = JSON.parse(luckyListObjJson)
            luckyConfig.luckyListObj = luckyListObj
            var levle = luckyConfig.level
            switch(levle)
            {
                case 't':
                    $(".winner_list_level").text("特等奖")
                    if(luckyListObj.levelList_t.length > 0){
                        forEachLucky(luckyListObj.levelList_t)
                    }else {
                        $("#winnerList").text('')
                    }
                    break;
                case 1:
                    $(".winner_list_level").text("一等奖")
                    if(luckyListObj.levelList_1.length > 0){
                        forEachLucky(luckyListObj.levelList_1)
                    }else {
                        $("#winnerList").text('')
                    }
                    break;
                case 2:
                    $(".winner_list_level").text("二等奖")
                    if(luckyListObj.levelList_2.length > 0){
                        forEachLucky(luckyListObj.levelList_2)
                    }else {
                        $("#winnerList").text('')
                    }
                    break;
                case 3:
                    $(".winner_list_level").text("三等奖")
                    if(luckyListObj.levelList_3.length > 0){
                        forEachLucky(luckyListObj.levelList_3)
                    }else {
                        $("#winnerList").text('')
                    }
                    break;
                case 4:
                    $(".winner_list_level").text("四等奖")
                    if(luckyListObj.levelList_4.length > 0){
                        forEachLucky(luckyListObj.levelList_4)
                    }else {
                        $("#winnerList").text('')
                    }
                    break;
                case 5:
                    $(".winner_list_level").text("五等奖")
                    if(luckyListObj.levelList_5.length > 0){
                        forEachLucky(luckyListObj.levelList_5)
                    }else {
                        $("#winnerList").text('')
                    }
                    break;
                case 6:
                    break;
                default:
                    $(".winner_list_level").text("")
                    if(luckyListObj && luckyListObj.defaultLuckyList.length > 0){
                        forEachLucky(luckyListObj.defaultLuckyList)
                    }else {
                        $("#winnerList").text('')
                    }
                    break;
                    break
            }
        }else {
            var obj = {
                defaultLuckyList:[],
                levelList_1:[],
                levelList_2:[],
                levelList_3:[],
                levelList_4:[],
                levelList_5:[],
                levelList_t:[],
            }
            docCookies.setItem(luckyListObj_key, JSON.stringify(obj));
        }
    }
    /**
     * 保存抽奖结果到localStorage
     */
    function saveLunckyData(luckyObj) {
        var levle = luckyConfig.level
        switch(levle)
        {
            case 1:
                luckyConfig.luckyListObj.levelList_1.push(luckyObj);
                docCookies.setItem(luckyListObj_key, JSON.stringify( luckyConfig.luckyListObj));
                break;
            case 2:
                luckyConfig.luckyListObj.levelList_2.push(luckyObj);
                docCookies.setItem(luckyListObj_key, JSON.stringify( luckyConfig.luckyListObj));
                break;
            case 3:
                luckyConfig.luckyListObj.levelList_3.push(luckyObj);
                docCookies.setItem(luckyListObj_key, JSON.stringify( luckyConfig.luckyListObj));
                break;
            case 4:
                luckyConfig.luckyListObj.levelList_4.push(luckyObj);
                docCookies.setItem(luckyListObj_key, JSON.stringify( luckyConfig.luckyListObj));
                break;
            case 5:
                luckyConfig.luckyListObj.levelList_5.push(luckyObj);
                docCookies.setItem(luckyListObj_key, JSON.stringify( luckyConfig.luckyListObj));
                break;
            case 't':
                luckyConfig.luckyListObj.levelList_t.push(luckyObj);
                docCookies.setItem(luckyListObj_key, JSON.stringify( luckyConfig.luckyListObj));
                break;
            default:
                luckyConfig.luckyListObj.defaultLuckyList.push(luckyObj);
                docCookies.setItem(luckyListObj_key, JSON.stringify( luckyConfig.luckyListObj));
                break;
        }
    }
    /**
     * 开始抽奖
     */
    function start_refresh() {
        $('#luckyName').removeClass('stop');
        $('.luckyName_box .title').removeClass('stop');
        $('.content .left .main').addClass('stop');
        $('.left .main .bun').addClass('stop');
        luckyConfig.refreshId = setInterval(auto_refresh, 50);
        luckyConfig.isStart=true;
        switcherMusic('start')
        // $('#pagewrap').addClass('has-data');
    }
    /**
     * 随机变化抽奖数字
     */
    function auto_refresh(){
      luckyConfig.employeeList = JSON.parse(docCookies.getItem(fullList_key));
      if(luckyConfig.employeeList && luckyConfig.employeeList.length > 0) {
          var maxNumber = luckyConfig.employeeList.length;
          var currentLuckyNum = getRandomArbitrary(0, maxNumber);
          // $('#luckyName').text(''+ luckyConfig.employeeList[currentLuckyNum].number).css('background',randomolor(colorArry));
          $('#luckyName').text(''+ luckyConfig.employeeList[currentLuckyNum]);
          luckyConfig.currentLuckyNum = currentLuckyNum;
      } else {
          alert("没有抽奖人员信息");
          clear_refresh_status();
      }
    }
    /**
     * 停止抽奖
     */
    function stop_refresh() {
        clear_refresh_status();
        push_lucky_number();
        switcherMusic('stop')
    };
    function push_lucky_number() {
        var currentLuckyName = $('#luckyName').text();
        // var currBackgroundColor = $('#luckyName').css("backgroundColor")
        // var currBackgroundColor = randomolor(colorArry)
        var currBackgroundColor = ""
        $('#luckyName').addClass('stop');
        $('.luckyName_box .title').addClass('stop');
        $('.content .left .main').removeClass('stop')
        $('.content .left .main').css('background','');
        $('.content .left .main').addClass('animation');
        $('.left .main .bun').removeClass('stop');
        var padingTemer = setInterval(function () {
            $('.content .left .main').removeClass('animation')
            clearInterval(padingTemer)
            switcherMusic()
        },1000)
        if(currentLuckyName) {
            var luckyObj = {
                text:$('#luckyName').text(),
                backgroundColorb:currBackgroundColor,
            };
            saveLunckyData(luckyObj)
            var luckyListDivText = $("#winnerList").text();
            if(luckyListDivText) {
                creationSingleDom(currentLuckyName)
                // $("#winnerList").append("<span class='luckyed''>"+currentLuckyName + "</span>");
                scrollBottom()
            } else {
                lotterryLevel()
            }
            luckyConfig.employeeList.splice(luckyConfig.currentLuckyNum, 1);
            luckyConfig.currentLuckyNum = -1;
            docCookies.setItem(fullList_key, JSON.stringify(shuffle(luckyConfig.employeeList)));
        }
    };
    var startOrStop = function (){
        if(luckyConfig.canKeyDownStart){
            luckyConfig.canKeyDownStart = false
            setTimeout(function () {
                luckyConfig.canKeyDownStart = true
            },luckyConfig.minInterval)
            if(luckyConfig.isStart) {
                stop_refresh();
            } else {
                start_refresh();
            }
        }
    }
    /**
     * 切换音频
     */
    function switcherMusic (str){
        // var audio = document.getElementById('audio');
        // if(luckyConfig.isPlayAudio){
        //     switch (str) {
        //         case 'start':
        //             loadAudio('music/start.wav',function () {
        //                 setTimeout(function () {
        //                     audio.play()
        //                 },0)
        //             })
        //             break
        //         case 'stop':
        //             loadAudio('music/stop.wav',function () {
        //                 setTimeout(function () {
        //                     audio.play()
        //                 },0)
        //             })
        //             break
        //         default:
        //             // loadAudio('music/bj.wav',function () {
        //             //     setTimeout(function () {
        //             //         audio.play()
        //             //     },100)

        //             // })
        //             break
        //     }
        // }else {
        //     setTimeout(function () {
        //         audio.pause()
        //     },0)
        // }
    }
    function loadAudio(src, callback) {
        // var audio = $("#audio").get(0);
        var audio = document.getElementById('audio');
        audio.src = src;
        audio.onloadedmetadata = callback;
        // audio.oncanplaythrough = callback;

    }
    /**
     * 遍历幸运数的数组
     */
    function forEachLucky(arry) {
        arry.forEach(function(item, index) {
            creationSingleDom(item.text)
        });
    }
    /**
     * 切割字符串,生成单个字符的span
     */
    function creationSingleDom(currentLuckyName) {
        $("#winnerList").append("<span class='luckyed'></span>");
        for (var i =0; i < currentLuckyName.length ; i++) {
            $("#winnerList>span:last-child").append("<span class='luckyed_"+i+"''>"+currentLuckyName[i] + "</span>");
        }
    }
    /**
     * 刷新界面
     */
    function refresh() {
        window.location.reload()
    }
    /**
     * 清空local Storage 并保存为文件
     */
    function clearLocalStorage() {
        saveResultToFile()
        docCookies.removeItem(fullList_key)
        docCookies.removeItem(luckyListObj_key)
        window.location.reload()
    }
    /**
     * 清空前把结果保存为文件文件
     */
    function saveResultToFile() {
        var luckyListObj = JSON.parse(docCookies.getItem(luckyListObj_key))
        if(luckyListObj.defaultLuckyList.length> 0 || luckyListObj.levelList_1.length> 0 || luckyListObj.levelList_2.length> 0 ||luckyListObj.levelList_3.length> 0
        ||luckyListObj.levelList_4.length> 0  ||luckyListObj.levelList_5.length> 0 ||luckyListObj.levelList_t.length> 0 ){
            var a=document.createElement('a');
            a.setAttribute('href','data:text/html;gb2312,'+ JSON.stringify(luckyListObj));
            a.setAttribute('download',"LotteryResults.json");
            a.setAttribute('target','_blank');
            a.style.display="none";
            window.document.body.appendChild(a);
            a.click();
        }
    }

    /**
     * 点击开始或结束按钮
     */
    $('.left .main .bun').click(function () {
        startOrStop()
    })
    /**
     * 判断键盘事件
     */
    $(document).keydown(function(ev){
        var oEvent = ev || event;
        keyCode = oEvent.keyCode;
        // var keyCode = event.keyCode
        switch(keyCode)
        {
            case 27:/*推出*/
                close()
                break;
            case 16:
                keyDownShift = true
                break;
            case 80:/*Shift+t 切换为特等奖*/
                if (keyDownShift) {
                    luckyConfig.isPlayAudio = !luckyConfig.isPlayAudio
                    switcherMusic()
                }
                break;
            case 84:/*Shift+t 切换为特等奖*/
                if (keyDownShift) {
                    $("#winnerList").text('')
                    luckyConfig.level = 't'
                    $(".winner_list_level").text("特等奖")
                    $("#luckyName").text(luckyConfig.defaultText)
                    $(".right .main .winner_list_title").css("background","url(.//images/title_t.png) no-repeat center")
                    lotterryLevel()
                }
                break;
            case 49:/*Shift+1 切换为一等奖*/
                if (keyDownShift) {
                    $("#winnerList").text('')
                    luckyConfig.level = 1
                    $(".winner_list_level").text("一等奖")
                    $("#luckyName").text(luckyConfig.defaultText)
                    $(".right .main .winner_list_title").css("background","url(.//images/title_1.png) no-repeat center")
                    lotterryLevel()
                }
                break;
            case 50:/*Shift+2 切换为二等奖*/
                if (keyDownShift) {
                    $("#winnerList").text('')
                    luckyConfig.level = 2
                    $(".winner_list_level").text("二等奖")
                    $("#luckyName").text(luckyConfig.defaultText)
                    $(".right .main .winner_list_title").css("background","url(.//images/title_2.png) no-repeat center")

                    lotterryLevel()
                }
                break;
            case 51:/*Shift+3 切换为三等奖*/
                if (keyDownShift) {
                    $("#winnerList").text('')
                    luckyConfig.level = 3
                    $(".winner_list_level").text("三等奖")
                    $("#luckyName").text(luckyConfig.defaultText)
                    $(".right .main .winner_list_title").css("background","url(.//images/title_3.png) no-repeat center")
                    lotterryLevel()
                }
                break;
            case 52:/*Shift+4 切换为四等奖*/
                if (keyDownShift) {
                    $("#winnerList").text('')
                    luckyConfig.level = 4
                    $(".winner_list_level").text("四等奖")
                    $("#luckyName").text(luckyConfig.defaultText)
                    $(".right .main .winner_list_title").css("background","url(.//images/title_4.png) no-repeat center")
                    lotterryLevel()
                }
                break;
            case 53:/*Shift+5 切换为五等奖*/
                if (keyDownShift) {
                    $("#winnerList").text('')
                    luckyConfig.level = 5
                    $(".winner_list_level").text("五等奖")
                    $("#luckyName").text(luckyConfig.defaultText)
                    $(".right .main .winner_list_title").css("background","url(.//images/title_5.png) no-repeat center")
                    lotterryLevel()
                }
                break;
            case 70: /*Shift+f 刷新界面*/
                if (keyDownShift) {
                    refresh()
                }
                break;
            case 67: /*Shift+c 清空数据*/
                if (keyDownShift) {
                    clearLocalStorage()
                }
                break;
            default:
                break
        }
    });
    $(document).keyup(function(ev){
        var oEvent = ev || event;
        keyCode = oEvent.keyCode;
        switch (keyCode) {
            case 13:
                startOrStop()
                break
            case 16:
                keyDownShift = false
                break
            default:
                break

        }
    });
    /**
     * get random number
     */
    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    /**
     * 自定义颜色数组随机颜色
     */
    function randomolor(arry){
        var  index =  Math.round(Math.random()*(arry.length-1))
        return arry[index];
        // return '#'+Math.floor(Math.random()*0xffffff).toString(16);
    }
    /**
     * 数组随机排列
     */
    function shuffle(a) {
        var j, x, i;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
        return a;
    }
    /**
     * 清空定时器
     */
    function clear_refresh_status() {
        clearInterval(luckyConfig.refreshId);
        luckyConfig.isStart=false;
        luckyConfig.refreshId=null;
    }
    /**
     * 退出程序
     */
    function close() {
        var gui = require('nw.gui');
        var win = gui.Window.get();
        win.close(true);
    }
    /**
     * 滚动到底部
     */
    function scrollBottom() {
        var scrollHeight = $('#winnerList').prop("scrollHeight");
        $('#winnerList').animate({scrollTop:scrollHeight}, 400);
    }
    /**
     * 不全数字个数
     */
    function PrefixInteger(num, length) {
        return (Array(length).join('0') + num).slice(-length);
    }
    window.addEventListener( 'resize', onWindowResize, false );
    function onWindowResize(){
        $(".lottrey").height(document.body.clientHeight )
        $(".lottrey").width(document.body.clientWidth)
    }
});
