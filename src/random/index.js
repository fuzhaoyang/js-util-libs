
// 获取随机字符串  len为字符串长度
exports.randomString = (len) => {
  let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
  let strLen = chars.length;
  let randomStr = '';
  for (let i = 0; i < len; i++) {
      randomStr += chars.charAt(Math.floor(Math.random() * strLen));
  }
  return randomStr;
};

// 生成指定范围随机数
exports.randomRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// 数组中获取随机数
exports.randomNum = arr => arr[Math.floor(Math.random() * arr.length)];