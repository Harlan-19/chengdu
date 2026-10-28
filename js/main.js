/* 轮播图交互脚本：自动播放、左右切换、圆点跳转、悬停暂停 */
(function () {
  'use strict';

  // 获取轮播相关元素
  var banner = document.querySelector('.banner');
  var slides = banner.querySelectorAll('.slide');
  var dots = banner.querySelectorAll('.dot');
  var prevBtn = banner.querySelector('.prev');
  var nextBtn = banner.querySelector('.next');

  var current = 0;          // 当前显示的幻灯片索引
  var timer = null;         // 自动播放定时器
  var INTERVAL = 4000;      // 自动切换间隔（毫秒）

  // 切换到指定索引（循环）
  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  // 启动自动播放
  function start() {
    stop();
    timer = setInterval(function () {
      goTo(current + 1);
    }, INTERVAL);
  }

  // 停止自动播放
  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  // 左右按钮事件
  prevBtn.addEventListener('click', function () { goTo(current - 1); start(); });
  nextBtn.addEventListener('click', function () { goTo(current + 1); start(); });

  // 圆点点击跳转
  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { goTo(i); start(); });
  });

  // 鼠标悬停时暂停，移开后继续
  banner.addEventListener('mouseenter', stop);
  banner.addEventListener('mouseleave', start);

  // 页面不可见时暂停，节省资源
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { stop(); } else { start(); }
  });

  // 初始化
  start();
})();
