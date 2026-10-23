// 延时
exports.sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 异步重试，retries 为首次失败后的重试次数
exports.retry = async (fn, options = {}) => {
    const { retries = 3, delay = 300, backoff = 2 } = options;
    let wait = delay;
    let lastError;
    for (let i = 0; i <= retries; i++) {
        try {
            return await fn(i);
        } catch (error) {
            lastError = error;
            if (i === retries) break;
            if (wait > 0) await exports.sleep(wait);
            wait *= backoff;
        }
    }
    throw lastError;
};

// 超时中断
exports.withTimeout = (promise, ms) => {
    let timer;
    const timeout = new Promise((resolve, reject) => {
        timer = setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms);
    });
    return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
};
