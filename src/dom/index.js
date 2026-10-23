// 绑定事件，返回解绑函数
exports.on = (el, type, handler, options) => {
    el.addEventListener(type, handler, options);
    return () => el.removeEventListener(type, handler, options);
};

exports.off = (el, type, handler, options) => {
    el.removeEventListener(type, handler, options);
};

// 事件委托，返回解绑函数
exports.delegate = (root, selector, type, handler) => {
    const listener = (event) => {
        const target =
            event.target && event.target.closest
                ? event.target.closest(selector)
                : null;
        if (target && root.contains(target)) {
            handler.call(target, event, target);
        }
    };
    root.addEventListener(type, listener);
    return () => root.removeEventListener(type, listener);
};

// 元素是否在视口内
exports.isInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    const width = window.innerWidth || document.documentElement.clientWidth;
    const height = window.innerHeight || document.documentElement.clientHeight;
    return (
        rect.top < height &&
        rect.bottom > 0 &&
        rect.left < width &&
        rect.right > 0
    );
};

// 复制文本，优先使用 Clipboard API
exports.copyText = (text) => {
    if (
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        navigator.clipboard.writeText
    ) {
        return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve, reject) => {
        const el = document.createElement("textarea");
        el.value = text;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        const copied = document.execCommand("copy");
        document.body.removeChild(el);
        copied ? resolve() : reject(new Error("copy failed"));
    });
};
