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
 * @param String expire  过期时间,单位天
 */
exports.cookieSet = (key, value, expire) => {
    const d = new Date();
    d.setDate(d.getDate() + expire);
    document.cookie = `${key}=${value};expires=${d.toGMTString()}`;
};

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