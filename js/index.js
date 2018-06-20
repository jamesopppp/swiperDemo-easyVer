window.onload = function () {
    console.log('onLoaded!');

    function swiper() {
        var sView = document.querySelector('.view');
        var sUl = document.querySelector('.imgBox');
        var sLi = sUl.getElementsByTagName('li');
        var sSelection = sView.querySelector('.selection');
        var pointView = sSelection.querySelector('.point');
        var sParam = sLi[0].offsetWidth;
        for (let i = 0; i < sLi.length; i++) {
            let point = document.createElement('span');
            point.setAttribute("data-tagIndex", i);
            pointView.appendChild(point);
        }
        var pointList = pointView.getElementsByTagName('span');
        pointList[0]
            .classList
            .add('point-select');
        sUl.style.width = sLi[0].offsetWidth * sLi.length + 'px';

        // 基础轮播部分
        function run(direction = 0) {
            direction === 1
                ? sParam = -sLi[0].offsetWidth
                : sParam = sLi[0].offsetWidth;
            sUl.style.left = sUl.offsetLeft - sParam + 'px';

            if (sUl.offsetLeft <= -sLi[0].offsetWidth * sLi.length) {
                sUl.style.left = '0';
            }
            if (sUl.offsetLeft >= sLi[0].offsetWidth) {
                sUl.style.left = -sLi[0].offsetWidth * (sLi.length - 1) + 'px';
            }
            pointMove();
        }

        moveTimer = setInterval(run, 1500);


        // 鼠标移入移出
        sView.onmouseover = function () {
            sSelection
                .classList
                .add('selection-show');
            clearInterval(moveTimer);
        }
        sView.onmouseout = function () {
            sSelection
                .classList
                .remove('selection-show');
            moveTimer = setInterval(run, 1500);
        }


        //左右按钮切换
        var sItem = sSelection.getElementsByTagName('img');
        sItem[0].onclick = function () {
            run(1);
        }
        sItem[1].onclick = function () {
            run();
        }

        // 圆点跟随移动
        function pointMove() {
            var index = -sUl.offsetLeft / sLi[0].offsetWidth;
            for (let i = 0; i < pointList.length; i++) {
                pointList[i]
                    .classList
                    .remove('point-select');
            }
            pointList[index]
                .classList
                .add('point-select');
        }


        // 点击圆点移动   推荐使用事件委托
        pointView
            .addEventListener('click', function (e) {
                let target = e.target || e.srcElement;
                if (target.nodeName == "SPAN") {
                    for (let i = 0; i < pointList.length; i++) {
                        pointList[i]
                            .classList
                            .remove('point-select');
                    }
                    target
                        .classList
                        .add('point-select');
                    sUl.style.left = -sLi[0].offsetWidth * target.getAttribute('data-tagIndex') + 'px';
                }
            })
    }

    swiper();
}