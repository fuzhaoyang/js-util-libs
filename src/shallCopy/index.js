//手动实现一个浅克隆
exports.shallCopy = (target) => {
    if (typeof target === 'object' && target !== null) {
      const copyTarget = Array.isArray(target) ? [] : {};
      for (let prop in target) {
        if (target.hasOwnProperty(prop)) { // 遍历对象自身可枚举属性（不考虑继承属性和原型对象）
            copyTarget[prop] = target[prop];
        }
      }
      return copyTarget;
    } else {
      return target;
    }
  }