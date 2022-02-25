// 防抖节流
export { debounce, throttle }
from "./src/throttle_debounce/index.js";

// 深拷贝
export { deepCopy }
from "./src/deepCopy/index.js";

// 浅拷贝
export { shallCopy }
from "./src/shallCopy/index.js";

// call apply bind
export { call, apply, bind }
from "./src/call-apply-bind/index.js";

// 时间戳转时间格式 YYYY-mm-dd HH:MM：SS
export { dateFormat, beforeDateFormat, getWeek }
from "./src/dateFormat/index.js";

// 转义字符转为前端展示字符号
export { escapeHtml }
from "./src/escapeHtml/index.js";

// 匹配字符串中所有的图片src
export { matchingAllImg }
from "./src/matchingAllImg/index.js";

// 原生实现鼠标滚动动画缓冲  滚动到底部 滚动到底部
export { scrollAnimation, scrollToTop ,scrollToBottom}
from "./src/scrollAnimation/index.js";

//  异步加载多个外部js方案
export { loadScript }
from "./src/loadScript/index.js";

//  获取url参数
export { getUrlParms }
from "./src/getUrlParms/index.js";

// 冒泡排序法
export { bubbleSort }
from "./src/sort/bubble_sort/index.js";

// 计数排序法
export { counterSort }
from "./src/sort/counter_sort/index.js";

// 插入排序法
export { insertSort }
from "./src/sort/insert_sort/index.js";

// 归并排序
export { mergeSort }
from "./src/sort/counter_sort/index.js";

// 快速排序
export { sort }
from "./src/sort/quick_sort/index.js";

// 选择排序
export { selectionSort }
from "./src/sort/selection_sort/index.js";

// 邮箱 手机号 URL 微信号 qq号 车牌号 密码强度校验 是否含中文 邮编号 16进制颜色 身份证号 ipv4 数字 对象 空对象 数组 基本数据类型 银行卡号码校验（luhn算法） 验证版本号格式必须为X.Y.Z 
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
    bankCardCheck,
    isIdCard,
    isIpv4,
    checkNum,
    isObject,
    isEmptyObject,
    isArray,
    isType,
    isVersion,
    isPassport
}
from "./src/check/index.js";

// 判断手机是Andoird还是IOS
export { getOSType }
from "./src/getOSType/index.js";

// 判断手机是Andoird还是IOS
export { cliboard }
from "./src/cliboard/index.js";

// 判断是浏览器内核
export { checkBrowser }
from "./src/checkBrowser/index.js";

// cookie 设置 获取 移除
export { cookieSet, cookieGet, cookieRemove }
from "./src/cookie/index.js";

// 获取 html 文本中转化为 html 后的纯文本信息
export { getHtmlText }
from "./src/getHtmlText/index.js";

//实现base64解码加密
export { base64Decode, base64Encode }
from "./src/base64/index.js";

//实现utf-8解码加密
export { utf8Decode, utf8Encode }
from "./src/base64/index.js";

//去除空格
export { trim }
from "./trim/index.js";

// 数字千分位分割
export { thousandth }
from "./src/thousandth/index.js";

// 将数字转换为大写金额
export { changeToChinese }
from "./src/changeToChinese/index.js";

// 文件大小格式化
export { formatSize }
from "./src/formatSize/index.js";

// 加载样式文件
export { loadStyle }
from "./src/loadStyle/index.js";

// 扁平数据结构转Tree  数组乱序  去重 扁平化
export { arrayToTree , arrScrambling, unique, flat}
from "./src/array/index.js";

// 1、指定范围随机数  2、随机长度字符串 3、数组随机数
export  { randomString, randomRange, randomNum } from "./src/random/index.js"

// 数字转为大写金额
export { digitUppercase } from "./src/digitUppercase/index.js"

// 手机号中间四位变*
export { telFormat } from "./src/common/index.js"