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

// 按固定长度分组
exports.chunk = (arr, size) => {
  if (!Array.isArray(arr) || size < 1) return [];
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const getKeyGetter = (key) =>
  typeof key === "function" ? key : (item) => item[key];

// 分组
exports.groupBy = (arr, key) => {
  const getKey = getKeyGetter(key);
  return arr.reduce((result, item, index) => {
    const group = getKey(item, index);
    (result[group] = result[group] || []).push(item);
    return result;
  }, {});
};

// 排序，返回新数组
exports.sortBy = (arr, key, order = "asc") => {
  const getKey = getKeyGetter(key);
  const factor = order === "desc" ? -1 : 1;
  return [...arr].sort((a, b) => {
    const left = getKey(a);
    const right = getKey(b);
    if (left === right) return 0;
    return (left > right ? 1 : -1) * factor;
  });
};
