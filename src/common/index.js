// 手机号中间四位变成*
exports.telFormat = (tel) => {
    tel = String(tel);
    return tel.substr(0, 3) + "****" + tel.substr(7);
};

// 字符串首字母大写
exports.fistLetterUpper = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
// 手机号脱敏 177****0699
exports.maskPhone = (phone) =>
    String(phone).replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");

// 身份证脱敏，保留前 6 位和后 4 位
exports.maskIdCard = (idCard) => {
    const value = String(idCard);
    if (value.length <= 10) return value;
    return value.slice(0, 6) + "*".repeat(value.length - 10) + value.slice(-4);
};

// 姓名脱敏，保留首字
exports.maskName = (name) => {
    const value = String(name);
    if (!value) return value;
    return value[0] + "*".repeat(value.length - 1);
};

// 邮箱脱敏，保留前 2 位和域名
exports.maskEmail = (email) => {
    const value = String(email);
    const index = value.indexOf("@");
    if (index < 1) return value;
    const local = value.slice(0, index);
    return local.slice(0, Math.min(2, local.length)) + "***" + value.slice(index);
};

// 银行卡脱敏，保留后 4 位
exports.maskBankCard = (cardNo) => {
    const value = String(cardNo).replace(/\s/g, "");
    if (value.length <= 4) return value;
    return "*".repeat(value.length - 4) + value.slice(-4);
};

// UUID v4，优先使用 crypto.randomUUID
exports.uuid = () => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
        const random = (Math.random() * 16) | 0;
        const value = char === "x" ? random : (random & 0x3) | 0x8;
        return value.toString(16);
    });
};
