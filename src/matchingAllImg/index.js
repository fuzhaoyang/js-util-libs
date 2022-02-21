// 匹配字符串中所有图片src
exports.matchingAllImg = (str) => {
    const imgReg = /<img.*?(?:>|\/>)/gi; //匹配图片中的img标签
    const srcReg = /src=[\\'\\"]?([^\\'\\"]*)[\\'\\"]?/i; // 匹配图片中的src
    const arr = str.match(imgReg) || []; //筛选出所有的img
    const srcArr = [];
    for (let i = 0; i < arr.length; i++) {
      const src = arr[i].match(srcReg) || [];
      // 获取图片地址
      srcArr.push(src[1]);
    }
    return srcArr.filter((item) => item);
  };