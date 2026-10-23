// 数组乱序
exports.arrScrambling = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }
  return arr;
}

// 数组去重
exports.unique = require("./unique/index.js").unique;

// 数组扁平化（降维）
exports.flat = require("./flat/index.js").flat;

// 扁平数据结构转 Tree
exports.arrayToTree = require("./arrayToTree/index.js").arrayToTree;
