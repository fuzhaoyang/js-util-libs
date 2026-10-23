/**
 * 节流，默认首次立即执行
 * options.leading 是否首次立即执行，options.trailing 是否在间隔末尾补一次
 */
exports.throttle = (fn, delay, options = {}) => {
  const { leading = true, trailing = false } = options;
  let last = 0;
  let timer = null;
  let lastArgs;
  let lastThis;

  const throttled = function (...args) {
    const now = Date.now();
    if (!last && !leading) last = now;
    const remaining = delay - (now - last);
    lastArgs = args;
    lastThis = this;
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      last = now;
      fn.apply(this, args);
    } else if (trailing && !timer) {
      timer = setTimeout(() => {
        last = leading ? Date.now() : 0;
        timer = null;
        fn.apply(lastThis, lastArgs);
      }, remaining);
    }
  };

  throttled.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = null;
    last = 0;
  };

  return throttled;
};

/**
 * 防抖，默认在停止触发后执行最后一次
 * options.leading 是否首次立即执行，options.trailing 是否执行尾次
 */
exports.debounce = (fn, delay, options = {}) => {
  const { leading = false, trailing = true } = options;
  let timer = null;
  let lastArgs;
  let lastThis;
  let calls = 0;

  const debounced = function (...args) {
    calls++;
    lastArgs = args;
    lastThis = this;
    const callNow = leading && timer === null;
    if (timer) clearTimeout(timer);
    if (callNow) fn.apply(this, args);
    timer = setTimeout(() => {
      timer = null;
      const shouldTrailing = trailing && (!leading || calls > 1);
      calls = 0;
      if (shouldTrailing) fn.apply(lastThis, lastArgs);
    }, delay);
  };

  debounced.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = null;
    calls = 0;
  };

  debounced.flush = () => {
    if (!timer) return;
    clearTimeout(timer);
    timer = null;
    calls = 0;
    fn.apply(lastThis, lastArgs);
  };

  return debounced;
};
