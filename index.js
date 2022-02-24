// 防抖节流
export { debounce, throttle }
from "./src/throttle_debounce/index.js";

// 深拷贝
export { deepCopy }
from "./src/deepCopy/index.js";

// 浅拷贝
export { shallCopy }
from "./shallCopy/index.js";

// call apply bind
export { call, apply, bind }
from "./src/call-apply-bind/index.js";

// 时间戳转时间格式 YYYY-mm-dd HH:MM：SS
export { dateFormat, beforeDateFormat, getWeek }
from "./dateFormat/index.js";

// 转义字符转为前端展示字符号
export { escapeHtml }
from "./escapeHtml/index.js";

// 匹配字符串中所有的图片src
export { matchingAllImg }
from "./matchingAllImg/index.js";

// 原生实现鼠标滚动动画缓冲
export { scrollAnimation, scrollToTop }
from "./scrollAnimation/index.js";

//  异步加载多个外部js方案
export { loadScript }
from "./loadScript/index.js";

//  获取url参数
export { getUrlParms }
from "./getUrlParms/index.js";

// 冒泡排序法
export { bubbleSort }
from "./sort/bubble_sort/index.js";

// 计数排序法
export { counterSort }
from "./sort/counter_sort/index.js";

// 插入排序法
export { insertSort }
from "./sort/insert_sort/index.js";

// 归并排序
export { mergeSort }
from "./sort/counter_sort/index.js";

// 快速排序
export { sort }
from "./sort/quick_sort/index.js";

// 选择排序
export { selectionSort }
from "./sort/selection_sort/index.js";

// 数组扁平化
export { flat }
from "./flat/index.js";

// 数组去重
export { unique }
from "./unique/index.js";

// 邮箱 手机号 URL 微信号 qq号 车牌号 密码强度校验 是否含中文 邮编号 16进制颜色 身份证号 ipv4 数字 对象 空对象 数组 基本数据类型
export {
    isEmail,
    isPhone,
    isURL,
    isWeiXin,
    isQQ,
    isCarNo,
    password,
    isCn,
    isPostNo,
    isRGB,
    isIdCard,
    isIpv4,
    checkNum,
    isObject,
    isEmptyObject,
    isArray,
    isType,
}
from "./check/index.js";

// 判断手机是Andoird还是IOS
export { getOSType }
from "./getOSType/index.js";

// 判断手机是Andoird还是IOS
export { cliboard }
from "./cliboard/index.js";

// 判断是浏览器内核
export { checkBrowser }
from "./checkBrowser/index.js";

// cookie 设置 获取 移除
export { cookieSet, cookieGet, cookieRemove }
from "./cookie/index.js";

// 获取 html 文本中转化为 html 后的纯文本信息
export { getHtmlText }
from "./getHtmlText/index.js";

//实现base64解码加密
export { base64Decode, base64Encode }
from "./base64/index.js";

//实现utf-8解码加密
export { utf8Decode, utf8Encode }
from "./base64/index.js";

//去除空格
export { trim }
from "./trim/index.js";

// 数字千分位分割
export { thousandth }
from "./thousandth/index.js";

// 将数字转换为大写金额
export { changeToChinese }
from "./changeToChinese/index.js";

// 文件大小格式化
export { formatSize }
from "./formatSize/index.js";

// 加载样式文件
export { loadStyle }
from "./loadStyle/index.js";