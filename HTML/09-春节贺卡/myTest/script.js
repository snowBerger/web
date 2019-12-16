window.onload = function() {
    var music = document.getElementById("music");
    var audio = document.getElementsByTagName("audio")[0];

    //音乐播放完后图标停止动画效果
    audio.addEventListener("ended", function(event) {
        //music.setAttribute("class", "");
        this.style.animationPlayState = "running";
        this.style.webkitAnimationPlayState = "running";
    }, false);

    //点击映月图标，控制音乐的播放和停止
    /*music.onclick = function() {
        if (audio.paused) {
            audio.play();
            //this.setAttribute("class", "play");
            this.style.animationPlayState = "running";
            this.style.webkitAnimationPlayState = "running";
        } else {
            audio.pause();
            //this.setAttribute("class", "");
            this.style.animationPlayState = "paused";
            this.style.webkitAnimationPlayState = "paused";
        }
    };*/
    music.addEventListener("touchstart", function(event) {
        if (audio.paused) {
            audio.play();
            //this.setAttribute("class", "play");
            this.style.animationPlayState = "running";
            this.style.webkitAnimationPlayState = "running";
        } else {
            audio.pause();
            //this.setAttribute("class", "");
            this.style.animationPlayState = "paused";
            this.style.webkitAnimationPlayState = "paused";
        }
    }, false);

    //翻页事件
    page1.addEventListener("touchstart", function(event) {
        page1.style.display = "none";
        page2.style.display = "block";
        page3.style.display = "block";
        page3.style.top = "100%";

        //第二页淡出
        setTimeout(function() {
            page2.setAttribute("class", "page fadeOut");
            page3.setAttribute("class", "page fadeIn");
        }, 5500);
    }, false);
};
