// 手机号中间四位变成*
exports.telFormat = (tel) => {
    tel = String(tel);
    return tel.substr(0, 3) + "****" + tel.substr(7);
};

// 大数相加
exports.largeNumberAdd = (num1, num2) => {
    if (isNaN(num1) || isNaN(num2)) return "";
    if (num1 === "0" || num2 === "0") return num1 === "0" ? num2 : num1;
    let len = Math.max(num1.length, num2.length);
    num1 = num1.padStart(len, "0");
    num2 = num2.padStart(len, "0");
    let result = [];
    for (let i = len - 1; i >= 0; i--) {
        let sum = Number(num1[i]) + Number(num2[i]) + (result[0] || 0);
        let low = sum % 10;
        let high = Math.floor(sum / 10);
        result[0] = low;
        result.unshift(high);
    }
    return result.join("");
};
console.log(add("10", "9007199254740991")); //09007199254741001

// 大数相乘
exports.largeNumbersMultiply = (num1, num2) => {
    if (isNaN(num1) || isNaN(num2)) return '';
    if (num1 === '0' || num2 === '0') return '0';
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
    return result.join('').replace(/^0+/, '');
}

console.log(multiply('123', '234')) //28782