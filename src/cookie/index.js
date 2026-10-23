/**
 * cookie 获取
 * @param {String} key  属性
 */
exports.cookieGet = (key) => {
    const cookieStr = unescape(document.cookie);
    const arr = cookieStr.split("; ");
    let cookieValue = "";
    for (var i = 0; i < arr.length; i++) {
        const temp = arr[i].split("=");
        if (temp[0] === key) {
            cookieValue = temp[1];
            break;
        }
    }
    return cookieValue;
};

/**
 * cookie 存贮
 * @param {String} key  属性
 * @param {*} value  值
 * @param Number expire  过期时间,单位天；不传则为会话 cookie
 */
exports.cookieSet = (key, value, expire) => {
    let cookie = `${key}=${value}`;
    if (expire) {
        const d = new Date();
        d.setDate(d.getDate() + expire);
        cookie += `;expires=${d.toGMTString()}`;
    }
    document.cookie = cookie;
};

/**
 * cookie 移除
 * @param {String} key  属性
 */
exports.cookieRemove = (key) => {
    document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};
