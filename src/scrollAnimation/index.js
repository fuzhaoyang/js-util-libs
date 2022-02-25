// 匹配字符串中所有图片src
exports.scrollAnimation = (currentY, targetY) => {
    // 获取当前位置方法
    // const currentY = document.documentElement.scrollTop || document.body.scrollTop

    // 计算需要移动的距离
    const needScrollTop = targetY - currentY;
    let _currentY = currentY;
    setTimeout(() => {
        // 一次调用滑动帧数，每次调用会不一样
        const dist = Math.ceil(needScrollTop / 10);
        _currentY += dist;
        window.scrollTo(_currentY, currentY);
        // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
        if (needScrollTop > 10 || needScrollTop < -10) {
            scrollAnimation(_currentY, targetY);
        } else {
            window.scrollTo(_currentY, targetY);
        }
    }, 1);
};

// 滑滚动页面到顶部
exports.scrollToTop = () => {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, scrollTop - scrollTop / 8);
    }
};

// 滚动到页面底部  
exports.scrollToBottom = () => {
  window.scrollTo(0, document.documentElement.clientHeight);  
}