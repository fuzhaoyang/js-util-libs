/**
 * 判断是浏览器内核
 */
exports.checkBrowser = () => {
    const u = navigator.userAgent;
    const obj = {
        trident: u.indexOf("Trident") > -1, //IE内核
        presto: u.indexOf("Presto") > -1, //opera内核
        webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
        gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
    };
    return Object.keys(obj)[Object.values(obj).indexOf(true)];
};