// 手机号中间四位变成*
exports.telFormat = (tel) => {
    tel = String(tel);
    return tel.substr(0, 3) + "****" + tel.substr(7);
};

// 字符串首字母大写
exports.fistLetterUpper = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};