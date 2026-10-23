// 转义正则特殊字符
exports.escapeRegExp = (str) =>
    String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// foo-bar / foo_bar / foo bar -> fooBar
exports.camelCase = (str) =>
    String(str)
        .trim()
        .replace(/[-_\s]+(.)?/g, (all, char) => (char ? char.toUpperCase() : ""))
        .replace(/^./, (char) => char.toLowerCase());

// fooBar / foo_bar / foo bar -> foo-bar
exports.kebabCase = (str) =>
    String(str)
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase();

// 截断字符串，总长度不超过 len
exports.truncate = (str, len, suffix = "...") => {
    const text = String(str);
    if (text.length <= len) return text;
    const keep = Math.max(0, len - suffix.length);
    return text.slice(0, keep) + suffix;
};
