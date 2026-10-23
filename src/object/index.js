const toPath = (path) => {
    if (Array.isArray(path)) return path;
    return String(path)
        .replace(/\[(\w+)\]/g, ".$1")
        .split(".")
        .filter((key) => key !== "");
};

const isPlainObject = (value) =>
    Object.prototype.toString.call(value) === "[object Object]";

// 按路径读取，路径支持 a.b[0].c
exports.get = (obj, path, defaultValue) => {
    const result = toPath(path).reduce(
        (target, key) => (target == null ? target : target[key]),
        obj
    );
    return result === undefined ? defaultValue : result;
};

// 按路径写入，直接修改并返回原对象
exports.set = (obj, path, value) => {
    const keys = toPath(path);
    if (!keys.length) return obj;
    let target = obj;
    keys.forEach((key, index) => {
        if (index === keys.length - 1) {
            target[key] = value;
            return;
        }
        if (target[key] == null || typeof target[key] !== "object") {
            target[key] = /^\d+$/.test(keys[index + 1]) ? [] : {};
        }
        target = target[key];
    });
    return obj;
};

exports.pick = (obj, keys) =>
    keys.reduce((result, key) => {
        if (obj != null && key in Object(obj)) result[key] = obj[key];
        return result;
    }, {});

exports.omit = (obj, keys) => {
    const excluded = new Set(keys);
    return Object.keys(obj || {}).reduce((result, key) => {
        if (!excluded.has(key)) result[key] = obj[key];
        return result;
    }, {});
};

// 深合并，数组直接替换，直接修改并返回第一个对象
exports.deepMerge = (target, source) => {
    if (!isPlainObject(target)) target = {};
    Object.keys(source || {}).forEach((key) => {
        const sourceValue = source[key];
        if (isPlainObject(sourceValue)) {
            target[key] = exports.deepMerge(
                isPlainObject(target[key]) ? target[key] : {},
                sourceValue
            );
        } else if (Array.isArray(sourceValue)) {
            target[key] = sourceValue.slice();
        } else {
            target[key] = sourceValue;
        }
    });
    return target;
};

exports.deepEqual = (a, b) => {
    if (a === b) return true;
    if (
        typeof a !== "object" || typeof b !== "object" ||
        a === null || b === null
    ) {
        return false;
    }
    if (Object.prototype.toString.call(a) !== Object.prototype.toString.call(b)) {
        return false;
    }
    if (a instanceof Date) return a.getTime() === b.getTime();
    if (a instanceof RegExp) return a.toString() === b.toString();
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every(
        (key) =>
            Object.prototype.hasOwnProperty.call(b, key) &&
            exports.deepEqual(a[key], b[key])
    );
};
