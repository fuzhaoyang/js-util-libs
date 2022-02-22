// 是否邮箱
exports.isEmail = (s) => {
    const emailReg =
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return emailReg.test(s);
};

// 是否手机号
exports.isPhone = (s) => {
    const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    return phoneReg.test(s);
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
    const passwordReg = /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}/;
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

// 身份证号校验
exports.isIdCard = (s) => {
    const sfzReg =
        /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

    return sfzReg.test(s);
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
 exports.checkNum = value => {
    return typeof value === 'number' && !isNaN(value);
 }

 //判断是否为对象
 const isObject = val =>
   typeof val === "function" || (typeof val === "object" && !!val);
 exports.isObject = isObject;

 //判断是否为{}空对象
 exports.isEmptyObject = val => isObject(val) && JSON.stringify(val) == "{}";

 //判断是否为数组
exports.isArray = val => Array.isArray(val);

// 判断当前数据类型
exports.isType = value => Object.prototype.toString.call(value).slice(8,-1);