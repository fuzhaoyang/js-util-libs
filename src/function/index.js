// 结果缓存，默认以第一个参数为 key
exports.memoize = (fn, resolver) => {
    const cache = new Map();
    return function (...args) {
        const key = resolver ? resolver.apply(this, args) : args[0];
        if (cache.has(key)) return cache.get(key);
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
};

// 只执行一次，后续调用返回第一次的结果
exports.once = (fn) => {
    let called = false;
    let result;
    return function (...args) {
        if (!called) {
            called = true;
            result = fn.apply(this, args);
        }
        return result;
    };
};
