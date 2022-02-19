// 可遍历类型 Map Set Object Array
const typeMap = "[object Map]";
const typeSet = "[object Set]";
const typeObject = "[object Object]";
const typeArray = "[object Array]";
// 非原始类型的 不可遍历类型  Date RegExp Function
const typeDate = "[object Date]";
const typeRegExp = "[object RegExp]";
const typeFunction = "[object Function]";

// 非原始类型的 不可遍历类型的 集合（原始类型已经被过滤了不用再考虑了）
const simpleType = [typeDate, typeRegExp, typeFunction];

// 是否是引用类型
const isObject = (target) => {
    if (target === null) {
        return false;
    } else {
        const type = typeof target;
        return type === "object" || type === "function";
    }
};

// 获取标准类型
const getType = (target) => {
    return Object.prototype.toString.call(target);
};

/*
 * 1、处理原始类型 Number String Boolean Symbol Null Undefined
 * 2、处理不可遍历类型 Date RegExp Function
 * 3、处理循环引用情况 WeakMap
 * 4、处理可遍历类型 Set Map Array Object
 * */

function deepCopy(target, map = new WeakMap()) {
    // 处理原始类型直接返回(Number BigInt String Boolean Symbol Undefined Null)
    if (!isObject(target)) {
        return target;
    }

    // 处理不可遍历类型
    const type = getType(target);
    if (simpleType.includes(type)) {
        switch (type) {
            case typeDate:
                // 日期
                return new Date(target);
            case typeRegExp:
                // 正则
                const reg = /\w*$/;
                const result = new RegExp(target.source, reg.exec(target)[0]);
                result.lastIndex = target.lastIndex; // lastIndex 表示每次匹配时的开始位置
                return result;
            case typeFunction:
                // 函数
                return target;
            default:
                return target;
        }
    }

    // 用于返回
    let cloneTarget;

    // 处理循环引用
    if (map.get(target)) {
        // 已经放入过map的直接返回
        return map.get(target);
    }

    // 处理可遍历类型
    switch (type) {
        case typeSet:
            // Set
            cloneTarget = new Set();
            map.set(target, cloneTarget);
            target.forEach((item) => {
                cloneTarget.add(deepCopy(item, map));
            });
            return cloneTarget;
        case typeMap:
            // Map
            cloneTarget = new Map();
            map.set(target, cloneTarget);
            target.forEach((value, key) => {
                cloneTarget.set(key, deepCopy(value, map));
            });
            return cloneTarget;
        case typeArray:
            // 数组
            cloneTarget = [];
            map.set(target, cloneTarget);
            target.forEach((item, index) => {
                cloneTarget[index] = deepCopy(item, map);
            });
            return cloneTarget;
        case typeObject:
            // 对象
            cloneTarget = {};
            map.set(target, cloneTarget);
            [...Object.keys(target), ...Object.getOwnPropertySymbols(target)].forEach(
                (item) => {
                    cloneTarget[item] = deepCopy(target[item], map);
                }
            );
            return cloneTarget;
        default:
            return target;
    }
}

exports.deepCopy = deepCopy;