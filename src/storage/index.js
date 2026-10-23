// 存值，expire 为有效时长（毫秒），不传则永久有效
exports.storageSet = (key, value, expire) => {
    const data = {
        value,
        expire: expire == null ? null : Date.now() + expire,
    };
    localStorage.setItem(key, JSON.stringify(data));
};

// 取值，过期后自动删除并返回 defaultValue
exports.storageGet = (key, defaultValue) => {
    const raw = localStorage.getItem(key);
    if (raw == null) return defaultValue;
    try {
        const data = JSON.parse(raw);
        if (data && data.expire && Date.now() > data.expire) {
            localStorage.removeItem(key);
            return defaultValue;
        }
        return data && "value" in data ? data.value : data;
    } catch (error) {
        return raw;
    }
};

exports.storageRemove = (key) => localStorage.removeItem(key);
