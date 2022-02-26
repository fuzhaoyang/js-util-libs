const { isType } = require("../check/index");

// 大数相加
exports.largeNumberAdd = (a, b) => {
    if (isType(a) !== 'String' || isType(a) !== 'String') {
        console.error('大数相乘参数请传字符串数字');
        return;
    }
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
        console.error('大数相加参数请传字符串数字');
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