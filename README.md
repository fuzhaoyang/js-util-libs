# js-util-libs（函数库）

## 概述

在开发中，我们经常会将一些常用的代码块、功能块进行封装，为的是更好的复用。那么，被抽离出来独立完成功能，通过 API 或配置项和其他部分交互，便形成了插件（工具函数）。

本仓库是日常前端开发中积累的常用工具函数集合，涵盖校验、排序、日期、数组、数字、编解码、DOM 操作等场景，可按需引入。欢迎大家留言交流和补充 ^\_^

另外，不要重复造轮子，把精力放在业务逻辑上！

> 说明：本库同时支持 CommonJS 与 ESM（通过打包器或 Node.js 对 CJS 的命名导出识别）。部分函数依赖浏览器环境（`document`、`window`、`navigator`），在 Node 环境中调用前请先模拟对应全局对象。

## Install（安装）

```bash
npm install js-util-libs --save
```

## Usage（使用）

CommonJS：

```js
const { deepCopy, dateFormat } = require('js-util-libs');
```

ESM / 打包器：

```js
import { deepCopy, dateFormat } from 'js-util-libs';
```

示例：

```js
const obj = {
  aa: 1,
  b: '52'
};
const text = deepCopy(obj);
```

## API

共 73 个导出，按功能分类如下。

### 函数控制

| 函数 | 说明 |
| --- | --- |
| `debounce(fn, delay)` | 防抖，连续触发时只在停止后执行最后一次 |
| `throttle(fn, delay)` | 节流，间隔 `delay` 毫秒内只执行一次 |

### 对象、拷贝与 this

| 函数 | 说明 |
| --- | --- |
| `deepCopy(target)` | 深拷贝，支持循环引用、`Map`、`Set`、`Date`、`RegExp`、`Symbol` 键 |
| `shallCopy(target)` | 浅拷贝对象自身可枚举属性 |
| `call(context, ...args)` | 手写 `Function.prototype.call` |
| `apply(context, args)` | 手写 `Function.prototype.apply` |
| `bind(context, ...args)` | 手写 `Function.prototype.bind` |

### 日期时间

| 函数 | 说明 |
| --- | --- |
| `dateFormat(fmt, timeStamp)` | 时间戳格式化，如 `YYYY-mm-dd HH:MM:SS` |
| `beforeDateFormat(timeStamp)` | 相对时间，如「刚刚」「3天前」「2年前」 |
| `getWeek(timeStamp)` | 返回星期几；不传参数则取当前时间 |

### 字符串与 HTML

| 函数 | 说明 |
| --- | --- |
| `escapeHtml(str)` | HTML 实体字符转换，如 `&nbsp;` → 空格 |
| `matchingAllImg(str)` | 提取字符串中所有 `<img>` 的 `src` |
| `getHtmlText(source)` | 去掉 HTML 标签，返回纯文本 |
| `trim(str, type)` | 去空格：`1` 全部（默认）、`2` 前后、`3` 前、`4` 后 |
| `telFormat(tel)` | 手机号中间四位变 `*` |
| `firstLetterUpper(str)` | 字符串首字母大写（`fistLetterUpper` 为历史拼写，保留兼容） |

### 数组

| 函数 | 说明 |
| --- | --- |
| `arrayToTree(items)` | 扁平数据（`id` / `pid`）转树 |
| `arrScrambling(arr)` | 数组乱序 |
| `unique(arr)` | 数组去重 |
| `flat(arr)` | 数组扁平化 |
| `randomNum(arr)` | 从数组中随机取一个元素 |

### 排序（原地排序，返回排序后的数组）

| 函数 | 说明 |
| --- | --- |
| `bubbleSort(arr)` | 冒泡排序 |
| `counterSort(arr)` | 计数排序（仅适用于整数） |
| `insertSort(arr)` | 插入排序 |
| `mergeSort(arr)` | 归并排序 |
| `sort(arr)` | 快速排序 |
| `selectionSort(arr)` | 选择排序 |

### 校验

| 函数 | 说明 |
| --- | --- |
| `isEmail(s)` | 邮箱 |
| `isPhone(s)` | 中国大陆手机号 |
| `isURL(s)` | URL |
| `isWeiXin(s)` | 微信号 |
| `isQQ(s)` | QQ 号 |
| `isCarNo(s)` | 车牌号 |
| `password(s)` | 密码强度（字母 + 数字 + 特殊字符，8~30 位） |
| `isCn(s)` | 是否包含中文 |
| `isPostNo(s)` | 邮编 |
| `isRGB(s)` | 16 进制颜色 |
| `isIdCard(s)` | 身份证号 |
| `isIpv4(s)` | IPv4 地址 |
| `bankCardCheck(num)` | 银行卡号（Luhn 算法） |
| `checkNum(value)` | 是否为数字 |
| `isObject(val)` | 是否为对象或函数 |
| `isEmptyObject(val)` | 是否为空对象 `{}` |
| `isArray(val)` | 是否为数组 |
| `isType(value)` | 返回数据类型名，如 `String`、`Array` |
| `isVersion(value)` | 是否为 `X.Y.Z` 版本号 |
| `isPassport(value)` | 护照号（含香港、澳门） |

### 数字、金额与随机数

| 函数 | 说明 |
| --- | --- |
| `thousandth(num)` | 数字千分位，如 `10,000,000` |
| `changeToChinese(num)` | 阿拉伯数字转中文数字，如 `一萬五仟...` |
| `digitUppercase(n)` | 数字转人民币大写金额，如 `壹仟零伍拾贰万...元整` |
| `formatSize(size)` | 文件大小格式化，支持 `B` / `KB` / `MB` / `GB` |
| `largeNumberAdd(a, b)` | 大数相加，参数必须为字符串数字 |
| `largeNumbersMultiply(a, b)` | 大数相乘，参数必须为字符串数字 |
| `randomString(len)` | 指定长度随机字符串 |
| `randomRange(min, max)` | 指定范围随机整数（含边界） |

### 编解码

| 函数 | 说明 |
| --- | --- |
| `base64Encode(str)` | Base64 编码（UTF-8） |
| `base64Decode(str)` | Base64 解码（UTF-8） |
| `utf8Encode(str)` | 字符串转 UTF-8 字节数组 |
| `utf8Decode(bytes)` | UTF-8 字节数组转字符串 |

### 浏览器与环境

| 函数 | 说明 |
| --- | --- |
| `getOSType()` | 返回 `ios` / `android` / `others` |
| `checkBrowser()` | 返回 `{ type, version }`，支持 IE、Edge、Firefox、Chrome、Opera、Safari |
| `clipboard(str)` | 复制文本到剪贴板（`cliboard` 为历史拼写，保留兼容） |
| `loadScript(urls)` | 动态加载一个或多个外部 JS，返回 `Promise` |
| `loadStyle(url)` | 动态加载外部样式文件 |
| `cookieSet(key, value, expire)` | 设置 cookie，`expire` 单位为天，不传则为会话 cookie |
| `cookieGet(key)` | 获取 cookie |
| `cookieRemove(key)` | 移除 cookie |
| `getUrlParms(key)` | 获取地址栏参数，未找到返回 `false` |
| `scrollAnimation(currentY, targetY)` | 滚动动画缓冲 |
| `scrollToTop()` | 平滑滚动到页面顶部 |
| `scrollToBottom()` | 滚动到页面底部 |

## 开发与测试

```bash
npm install
npm test          # 运行全部测试
npm run watch     # 监听模式
npm run coverage  # 生成覆盖率报告
```

入口冒烟测试位于 `__tests__/index.spec.js`，会检查 `index.js` 的全部导出是否存在，避免出现「测试全绿但入口不可用」的情况。

## 目录结构

```
index.js            # 入口，统一导出
src/<模块名>/        # 各功能模块
  index.js
  __tests__/        # 单测（部分模块为 __test__）
```

## 欢迎大家提 PR 扩充函数库，为开源社区贡献自己一份力

git 仓库地址：https://github.com/fuzhaoyang/js-util-libs

提 PR 步骤：

1. 在 `src` 下创建函数模块目录
2. 函数模块包含 markdown 说明和测试用例（必须）
3. 在根目录 `index.js` 导出函数
4. 在 `package.json` 的 `keywords` 中补充函数关键字
5. 运行 `npm test` 确保测试通过
6. 不要修改 `package.json` 版本号，版本号为线上最新用户使用版本
7. 提交 Pull Request，测试通过后静等作者合代码
8. 代码合并后，作者会及时发布到 npm 上

## Contact me（联系我）

![image](https://user-images.githubusercontent.com/25168173/154791040-09b5e289-5533-4aa2-9e6d-cb11eabfddf3.png)

## 我的博客

https://code-nav.top/blog

![image](https://user-images.githubusercontent.com/25168173/154791015-750d04e4-02d4-4ebb-a559-5e3331003309.png)

## License

MIT
