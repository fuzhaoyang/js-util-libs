const getSearch = (url) => {
    if (url === undefined) {
        return typeof window !== "undefined" ? window.location.search : "";
    }
    const source = String(url).split("#")[0];
    const index = source.indexOf("?");
    return index === -1 ? "" : source.slice(index);
};

// 解析查询参数，同名参数返回数组
exports.parseQuery = (url) => {
    const search = getSearch(url).replace(/^\?/, "");
    const result = {};
    if (!search) return result;
    search.split("&").forEach((pair) => {
        if (!pair) return;
        const index = pair.indexOf("=");
        const key = decodeURIComponent(index === -1 ? pair : pair.slice(0, index));
        const value =
            index === -1
                ? ""
                : decodeURIComponent(pair.slice(index + 1).replace(/\+/g, " "));
        if (Object.prototype.hasOwnProperty.call(result, key)) {
            result[key] = [].concat(result[key], value);
        } else {
            result[key] = value;
        }
    });
    return result;
};

// 对象转查询字符串，数组会展开为同名参数，null/undefined 会被忽略
exports.stringifyQuery = (params) =>
    Object.keys(params || {})
        .reduce((pairs, key) => {
            const value = params[key];
            if (value == null) return pairs;
            [].concat(value).forEach((item) => {
                pairs.push(
                    `${encodeURIComponent(key)}=${encodeURIComponent(item)}`
                );
            });
            return pairs;
        }, [])
        .join("&");

// 设置查询参数，返回新的 URL
exports.setQuery = (url, key, value) => {
    const [path, hash] = String(url).split("#");
    const index = path.indexOf("?");
    const base = index === -1 ? path : path.slice(0, index);
    const params = exports.parseQuery(path);
    params[key] = value;
    const search = exports.stringifyQuery(params);
    return base + (search ? `?${search}` : "") + (hash ? `#${hash}` : "");
};

// 删除查询参数，返回新的 URL
exports.removeQuery = (url, key) => {
    const [path, hash] = String(url).split("#");
    const index = path.indexOf("?");
    const base = index === -1 ? path : path.slice(0, index);
    const params = exports.parseQuery(path);
    delete params[key];
    const search = exports.stringifyQuery(params);
    return base + (search ? `?${search}` : "") + (hash ? `#${hash}` : "");
};
