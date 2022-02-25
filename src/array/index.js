// 数组乱序 
exports.arrScrambling = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }
  return arr;
}

// 数组去重
export { unique } from "./unique/index.js"

// 数组扁平化（降维）
export { flat } from "./flat/index.js"

// 数组扁平化（降维）
export { arrayToTree } from "./arrayToTree/index.js"