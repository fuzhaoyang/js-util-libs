// 防抖节流
exports.debounce = require("./src/throttle_debounce/index.js").debounce;
exports.throttle = require("./src/throttle_debounce/index.js").throttle;

// 深拷贝
exports.deepCopy = require("./src/deepCopy/index.js").deepCopy;

// 浅拷贝
exports.shallCopy = require("./src/shallCopy/index.js").shallCopy;

// call apply bind
exports.call = require("./src/call-apply-bind/index.js").call;
exports.apply = require("./src/call-apply-bind/index.js").apply;
exports.bind = require("./src/call-apply-bind/index.js").bind;

// 时间戳转时间格式 YYYY-mm-dd HH:MM:SS
exports.dateFormat = require("./src/dateFormat/index.js").dateFormat;
exports.beforeDateFormat = require("./src/dateFormat/index.js").beforeDateFormat;
exports.getWeek = require("./src/dateFormat/index.js").getWeek;

// 转义字符转为前端展示字符号
exports.escapeHtml = require("./src/escapeHtml/index.js").escapeHtml;

// 匹配字符串中所有的图片src
exports.matchingAllImg = require("./src/matchingAllImg/index.js").matchingAllImg;

// 原生实现鼠标滚动动画缓冲 滚动到顶部 滚动到底部
exports.scrollAnimation = require("./src/scrollAnimation/index.js").scrollAnimation;
exports.scrollToTop = require("./src/scrollAnimation/index.js").scrollToTop;
exports.scrollToBottom = require("./src/scrollAnimation/index.js").scrollToBottom;

// 异步加载多个外部js方案
exports.loadScript = require("./src/loadScript/index.js").loadScript;

// 获取url参数
exports.getUrlParms = require("./src/getUrlParms/index.js").getUrlParms;

// 冒泡排序
exports.bubbleSort = require("./src/sort/bubble_sort/index.js");

// 计数排序
exports.counterSort = require("./src/sort/counter_sort/index.js");

// 插入排序
exports.insertSort = require("./src/sort/insert_sort/index.js");

// 归并排序
exports.mergeSort = require("./src/sort/merge_sort/index.js");

// 快速排序
exports.sort = require("./src/sort/quick_sort/index.js");

// 选择排序
exports.selectionSort = require("./src/sort/selection_sort/index.js");

// 邮箱 手机号 URL 微信号 qq号 车牌号 密码强度校验 是否含中文 邮编号 16进制颜色 身份证号 ipv4 数字 对象 空对象 数组 基本数据类型 银行卡号码校验（luhn算法） 版本号 护照
const check = require("./src/check/index.js");
exports.isEmail = check.isEmail;
exports.isPhone = check.isPhone;
exports.isURL = check.isURL;
exports.isWeiXin = check.isWeiXin;
exports.isQQ = check.isQQ;
exports.isCarNo = check.isCarNo;
exports.password = check.password;
exports.isCn = check.isCn;
exports.isPostNo = check.isPostNo;
exports.isRGB = check.isRGB;
exports.bankCardCheck = check.bankCardCheck;
exports.isIdCard = check.isIdCard;
exports.isIpv4 = check.isIpv4;
exports.checkNum = check.checkNum;
exports.isObject = check.isObject;
exports.isEmptyObject = check.isEmptyObject;
exports.isArray = check.isArray;
exports.isType = check.isType;
exports.isVersion = check.isVersion;
exports.isPassport = check.isPassport;

// 判断手机是 Android 还是 IOS
exports.getOSType = require("./src/getOSType/index.js").getOSType;

// 复制文本到剪贴板（cliboard 为历史拼写，保留兼容）
exports.clipboard = require("./src/cliboard/index.js").cliboard;
exports.cliboard = exports.clipboard;

// 判断浏览器内核
exports.checkBrowser = require("./src/checkBrowser/index.js").checkBrowser;

// cookie 设置 获取 移除
exports.cookieSet = require("./src/cookie/index.js").cookieSet;
exports.cookieGet = require("./src/cookie/index.js").cookieGet;
exports.cookieRemove = require("./src/cookie/index.js").cookieRemove;

// 获取 html 文本中转化为 html 后的纯文本信息
exports.getHtmlText = require("./src/getHtmlText/index.js").getHtmlText;

// base64 编解码
exports.base64Decode = require("./src/base64/index.js").base64Decode;
exports.base64Encode = require("./src/base64/index.js").base64Encode;

// utf-8 编解码
exports.utf8Decode = require("./src/utf-8/index.js").utf8Decode;
exports.utf8Encode = require("./src/utf-8/index.js").utf8Encode;

// 去除空格
exports.trim = require("./src/trim/index.js").trim;

// 数字千分位分割
exports.thousandth = require("./src/thousandth/index.js").thousandth;

// 将数字转换为中文大写数字
exports.changeToChinese = require("./src/changeToChinese/index.js").changeToChinese;

// 文件大小格式化
exports.formatSize = require("./src/formatSize/index.js").formatSize;

// 加载样式文件
exports.loadStyle = require("./src/loadStyle/index.js").loadStyle;

// 扁平数据结构转 Tree 数组乱序 去重 扁平化
exports.arrayToTree = require("./src/array/index.js").arrayToTree;
exports.arrScrambling = require("./src/array/index.js").arrScrambling;
exports.unique = require("./src/array/index.js").unique;
exports.flat = require("./src/array/index.js").flat;

// 指定范围随机数 随机长度字符串 数组随机数
exports.randomString = require("./src/random/index.js").randomString;
exports.randomRange = require("./src/random/index.js").randomRange;
exports.randomNum = require("./src/random/index.js").randomNum;

// 数字转为大写金额
exports.digitUppercase = require("./src/digitUppercase/index.js").digitUppercase;

// 手机号中间四位变* 字符串首字母大写（fistLetterUpper 为历史拼写，保留兼容）
exports.telFormat = require("./src/common/index.js").telFormat;
exports.firstLetterUpper = require("./src/common/index.js").fistLetterUpper;
exports.fistLetterUpper = exports.firstLetterUpper;

// 大数相加 大数相乘
exports.largeNumberAdd = require("./src/number/index.js").largeNumberAdd;
exports.largeNumbersMultiply = require("./src/number/index.js").largeNumbersMultiply;
