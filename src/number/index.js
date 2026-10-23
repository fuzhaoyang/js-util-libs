const { isType } = require("../check/index");

// 大数相加
exports.largeNumberAdd = (a, b) => {
    if (isType(a) !== 'String' || isType(b) !== 'String') {
        console.error('大数相加参数请传字符串数字');
        return;
    }
    if (isNaN(a) || isNaN(b)) return "";
    //取两个数字的最大长度
    let maxLength = Math.max(a.length, b.length);
    //用0去补齐长度
    a = a.padStart(maxLength, 0); //"0009007199254740991"
    b = b.padStart(maxLength, 0); //"1234567899999999999"
    //定义加法过程中需要用到的变量
    let t = 0;
    let f = 0; //"进位"
    let sum = "";
    for (let i = maxLength - 1; i >= 0; i--) {
        t = parseInt(a[i]) + parseInt(b[i]) + f;
        f = Math.floor(t / 10);
        sum = (t % 10) + sum;
    }
    if (f == 1) {
        sum = "1" + sum;
    }
    return sum;
};

// 大数相乘
exports.largeNumbersMultiply = (num1, num2) => {
    if (isType(num1) !== 'String' || isType(num2) !== 'String') {
        console.error('大数相乘参数请传字符串数字');
        return;
    }
    if (isNaN(num1) || isNaN(num2)) return "";
    if (num1 === "0" || num2 === "0") return "0";
    let l1 = num1.length,
        l2 = num2.length;
    let result = [];
    for (let i = l1 - 1; i >= 0; i--) {
        for (let j = l2 - 1; j >= 0; j--) {
            let index1 = i + j;
            let index2 = i + j + 1;

            let product = num1[i] * num2[j] + (result[index2] || 0);
            result[index2] = product % 10;
            result[index1] = Math.floor(product / 10) + (result[index1] || 0);
        }
    }
    return result.join("").replace(/^0+/, "");
};
// 限制数值范围
exports.clamp = (n, min, max) => Math.min(Math.max(n, min), max);

exports.sum = (arr) => arr.reduce((total, value) => total + value, 0);

exports.average = (arr) => (arr.length ? exports.sum(arr) / arr.length : NaN);

const decimalPlaces = (n) => {
    const text = String(n);
    const index = text.indexOf(".");
    return index === -1 ? 0 : text.length - index - 1;
};

// 四舍五入，规避浮点误差
exports.round = (n, precision = 0) => {
    const factor = Math.pow(10, precision);
    const rounded = Math.round(Math.abs(n) * factor * (1 + Number.EPSILON));
    return (Math.sign(n) * rounded) / factor;
};

// 精确加减乘除，规避 0.1 + 0.2 这类浮点误差
exports.add = (a, b) => {
    const factor = Math.pow(10, Math.max(decimalPlaces(a), decimalPlaces(b)));
    return (Math.round(a * factor) + Math.round(b * factor)) / factor;
};

exports.sub = (a, b) => {
    const factor = Math.pow(10, Math.max(decimalPlaces(a), decimalPlaces(b)));
    return (Math.round(a * factor) - Math.round(b * factor)) / factor;
};

exports.mul = (a, b) => {
    const aPlaces = decimalPlaces(a);
    const bPlaces = decimalPlaces(b);
    return (
        (Math.round(a * Math.pow(10, aPlaces)) *
            Math.round(b * Math.pow(10, bPlaces))) /
        Math.pow(10, aPlaces + bPlaces)
    );
};

exports.div = (a, b) => {
    const factor = Math.pow(10, Math.max(decimalPlaces(a), decimalPlaces(b)));
    return Math.round(a * factor) / Math.round(b * factor);
};

// 金额格式化，默认 ¥1,234.56
exports.formatCurrency = (amount, options = {}) => {
    const { symbol = "¥", decimals = 2, thousands = true } = options;
    const value = Number(amount);
    if (Number.isNaN(value)) return "";
    const fixed = value.toFixed(decimals);
    const negative = fixed.startsWith("-");
    const [integer, decimal] = (negative ? fixed.slice(1) : fixed).split(".");
    const digits = thousands
        ? integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        : integer;
    return `${negative ? "-" : ""}${symbol}${digits}${decimals > 0 ? `.${decimal}` : ""}`;
};

// 金额字符串转数字，如 "¥1,234.56" -> 1234.56
exports.parseMoney = (value) => {
    if (typeof value === "number") return value;
    const cleaned = String(value).replace(/[^\d.-]/g, "");
    if (cleaned === "" || Number.isNaN(Number(cleaned))) return NaN;
    return Number(cleaned);
};
