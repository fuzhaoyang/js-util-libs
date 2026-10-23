// 滚动动画缓冲
function scrollAnimation(currentY, targetY) {
    // 每次取剩余距离的 1/10 做缓动
    const dist = Math.ceil((targetY - currentY) / 10);
    const nextY = currentY + dist;
    window.scrollTo(0, nextY);
    if (Math.abs(targetY - nextY) > 10) {
        setTimeout(() => scrollAnimation(nextY, targetY), 1);
    } else {
        window.scrollTo(0, targetY);
    }
}

// 滚动页面到顶部
function scrollToTop() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, scrollTop - scrollTop / 8);
    }
}

// 滚动到页面底部
function scrollToBottom() {
    window.scrollTo(0, document.documentElement.scrollHeight);
}

exports.scrollAnimation = scrollAnimation;
exports.scrollToTop = scrollToTop;
exports.scrollToBottom = scrollToBottom;
