/**
 *  0: ios
 *  1: android
 *  2: 其它
 */
exports.getOSType = () => {
    let u = navigator.userAgent,
        app = navigator.appVersion;
    let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isIOS) {
        return "ios";
    }
    if (isAndroid) {
        return "android";
    }
    return "others";
};