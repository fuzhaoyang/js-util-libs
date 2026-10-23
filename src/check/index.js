// 是否邮箱
exports.isEmail = (s) => {
    const emailReg =
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return emailReg.test(s);
};

// 是否手机号，可传号段（如 ["38", "76"]）覆盖默认号段
exports.isPhone = (s, segments) => {
    if (segments === undefined) return /^1[3-9]\d{9}$/.test(s);
    const list = [].concat(segments);
    return new RegExp(`^1(?:${list.join("|")})\\d{8}$`).test(s);
};

// 是否QQ号码
exports.isQQ = (s) => {
    const qqReg = /^[1-9][0-9]{4,10}$/;
    return qqReg.test(s);
};

// 是否URL地址
exports.isURL = (s) => {
    const urlReg =
        /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlReg.test(s);
};

// 是否是微信号
exports.isWeiXin = (s) => {
    const wxReg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
    return wxReg.test(s);
};

// 是否车牌号
exports.isCarNo = (s) => {
    const carNoReg =
        /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
    return carNoReg.test(s);
};

// 密码强度校验 密码中必须包含字母、数字、特称字符，至少8个字符，最多30个字符
exports.password = (s) => {
    const passwordReg = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}$/;
    return passwordReg.test(s);
};

// 是否包含中文的字符串
exports.isCn = (s) => {
    const cnReg = /[\u4E00-\u9FA5]/;
    return cnReg.test(s);
};

// 邮政编号的校验
exports.isPostNo = (s) => {
    const postalNoReg = /^\d{6}$/;
    return postalNoReg.test(s);
};

// 16进制颜色的校验
exports.isRGB = (s) => {
    const color16Reg = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
    return color16Reg.test(s);
};

// 身份证号校验（18 位含校验码，兼容 15 位）
const isValidDate = (year, month, day) => {
    const date = new Date(year, month - 1, day);
    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
};

const ID_WEIGHTS = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
const ID_CHECK_CODES = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];

exports.isIdCard = (s) => {
    if (typeof s !== "string") return false;
    if (/^\d{15}$/.test(s)) {
        return isValidDate(
            1900 + Number(s.slice(6, 8)),
            Number(s.slice(8, 10)),
            Number(s.slice(10, 12))
        );
    }
    if (!/^\d{17}[\dXx]$/.test(s)) return false;
    if (
        !isValidDate(
            Number(s.slice(6, 10)),
            Number(s.slice(10, 12)),
            Number(s.slice(12, 14))
        )
    ) {
        return false;
    }
    const sum = ID_WEIGHTS.reduce((total, weight, index) => {
        return total + weight * Number(s[index]);
    }, 0);
    return ID_CHECK_CODES[sum % 11] === s[17].toUpperCase();
};

// 身份证号校验
exports.isIpv4 = (s) => {
    const ipv4Reg =
        /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipv4Reg.test(s);
};

/**
 *  判断是否是数字
 * @param {Number} data
 */
exports.checkNum = (value) => {
    return typeof value === "number" && !isNaN(value);
};

//判断是否为对象
const isObject = (val) =>
    typeof val === "function" || (typeof val === "object" && !!val);
exports.isObject = isObject;

//判断是否为{}空对象
exports.isEmptyObject = (val) => isObject(val) && JSON.stringify(val) == "{}";

//判断是否为数组
exports.isArray = (val) => Array.isArray(val);

// 判断当前数据类型
exports.isType = (value) => Object.prototype.toString.call(value).slice(8, -1);

// 银行卡号码校验（luhn算法）
exports.bankCardCheck = (num) => {
    let arr = (num + "")
        .split("")
        .reverse()
        .map((x) => parseInt(x));
    let lastDigit = arr.splice(0, 1)[0];
    let sum = arr.reduce(
        (acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9),
        0
    );
    sum += lastDigit;
    return sum % 10 === 0;
};

// 验证版本号格式必须为X.Y.Z 
/**
 *  @param { string } value
 */
 exports.isVersion = value => /^\d+(?:\.\d+){2}$/g.test(value);

 // 验证护照（包含香港、澳门）
 exports.isPassport = value => /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/g.test(value);

// 是否为 null / undefined
exports.isNil = (value) => value == null;

// 是否为 Promise
exports.isPromise = (value) =>
    value != null && typeof value.then === "function";

// 是否为普通对象（字面量或 Object.create(null)）
exports.isPlainObject = (value) => {
    if (Object.prototype.toString.call(value) !== "[object Object]") return false;
    const proto = Object.getPrototypeOf(value);
    return proto === null || proto === Object.prototype;
};

// 是否为空值：null、undefined、""、[]、{}、空 Map/Set
exports.isEmpty = (value) => {
    if (value == null) return true;
    if (typeof value === "string" || Array.isArray(value)) {
        return value.length === 0;
    }
    if (value instanceof Map || value instanceof Set) {
        return value.size === 0;
    }
    if (typeof value === "object") {
        return Object.keys(value).length === 0;
    }
    return false;
};

const CREDIT_CHARS = "0123456789ABCDEFGHJKLMNPQRTUWXY";
const CREDIT_WEIGHTS = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];

// 统一社会信用代码（18 位含校验码）
exports.isCreditCode = (s) => {
    if (typeof s !== "string" || !/^[0-9A-HJ-NPQRTUWXY]{18}$/.test(s)) {
        return false;
    }
    const sum = CREDIT_WEIGHTS.reduce((total, weight, index) => {
        return total + CREDIT_CHARS.indexOf(s[index]) * weight;
    }, 0);
    return CREDIT_CHARS[(31 - (sum % 31)) % 31] === s[17];
};

const ORG_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ORG_WEIGHTS = [3, 7, 9, 10, 5, 8, 4, 2];

// 组织机构代码（9 位，支持 X-XXXXXX-X 写法）
exports.isOrganizationCode = (s) => {
    if (typeof s !== "string") return false;
    const code = s.replace(/-/g, "");
    if (!/^[0-9A-Z]{9}$/.test(code)) return false;
    const sum = ORG_WEIGHTS.reduce((total, weight, index) => {
        return total + ORG_CHARS.indexOf(code[index]) * weight;
    }, 0);
    const check = 11 - (sum % 11);
    const expected = check === 10 ? "X" : check === 11 ? "0" : String(check);
    return expected === code[8];
};

// 新能源车牌（8 位）
exports.isNewEnergyCarNo = (s) =>
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$/.test(
        s
    );

const parseIdCard = (s) => {
    if (!exports.isIdCard(s)) return null;
    const is15 = s.length === 15;
    return {
        year: is15 ? 1900 + Number(s.slice(6, 8)) : Number(s.slice(6, 10)),
        month: Number(s.slice(is15 ? 8 : 10, is15 ? 10 : 12)),
        day: Number(s.slice(is15 ? 10 : 12, is15 ? 12 : 14)),
        gender: Number(s[is15 ? 14 : 16]) % 2 === 1 ? "male" : "female",
    };
};

// 从身份证号计算年龄，无效返回 null
exports.getAge = (idCard, now = new Date()) => {
    const info = parseIdCard(idCard);
    if (!info) return null;
    const age = now.getFullYear() - info.year;
    const birthdayNotReached =
        now.getMonth() + 1 < info.month ||
        (now.getMonth() + 1 === info.month && now.getDate() < info.day);
    return birthdayNotReached ? age - 1 : age;
};

// 从身份证号取性别，返回 male / female，无效返回 null
exports.getGender = (idCard) => {
    const info = parseIdCard(idCard);
    return info ? info.gender : null;
};

// 根据卡号前缀识别卡组织，无法识别返回 unknown
exports.getBankCardType = (cardNo) => {
    const value = String(cardNo).replace(/[\s-]/g, "");
    if (!/^\d{10,19}$/.test(value)) return "unknown";
    const prefix4 = Number(value.slice(0, 4));
    if (/^4/.test(value)) return "visa";
    if (
        (prefix4 >= 2221 && prefix4 <= 2720) ||
        (prefix4 >= 5100 && prefix4 <= 5599)
    ) {
        return "mastercard";
    }
    if (/^3[47]/.test(value)) return "amex";
    if (/^35/.test(value)) return "jcb";
    if (/^62/.test(value)) return "unionpay";
    if (/^(6011|65)/.test(value)) return "discover";
    return "unknown";
};
