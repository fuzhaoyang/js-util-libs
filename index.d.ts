export type Path = string | Array<string | number>;

// 异步与函数控制
export function sleep(ms: number): Promise<void>;
export function retry<T>(
    fn: (attempt: number) => T | Promise<T>,
    options?: { retries?: number; delay?: number; backoff?: number }
): Promise<T>;
export function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T>;
export function memoize<T extends (...args: any[]) => any>(
    fn: T,
    resolver?: (...args: any[]) => any
): T;
export function once<T extends (...args: any[]) => any>(fn: T): T;
export function debounce<T extends (...args: any[]) => any>(
    fn: T,
    delay: number,
    options?: { leading?: boolean; trailing?: boolean }
): T & { cancel(): void; flush(): void };
export function throttle<T extends (...args: any[]) => any>(
    fn: T,
    delay: number,
    options?: { leading?: boolean; trailing?: boolean }
): T & { cancel(): void };

// 对象、拷贝与 this
export function deepCopy<T>(target: T): T;
export function shallCopy<T>(target: T): T;
export function call<T, R>(
    this: (this: T, ...args: any[]) => R,
    context: T,
    ...args: any[]
): R;
export function apply<T, R>(
    this: (this: T, ...args: any[]) => R,
    context: T,
    args: any[]
): R;
export function bind<T, R>(
    this: (this: T, ...args: any[]) => R,
    context: T,
    ...args: any[]
): (...rest: any[]) => R;
export function get<T = any>(obj: any, path: Path, defaultValue?: T): T;
export function set<T>(obj: T, path: Path, value: any): T;
export function pick<T extends object, K extends keyof T>(
    obj: T,
    keys: K[]
): Pick<T, K>;
export function omit<T extends object, K extends keyof T>(
    obj: T,
    keys: K[]
): Omit<T, K>;
export function deepMerge<T extends object>(target: any, source: any): T;
export function deepEqual(a: any, b: any): boolean;

// 日期时间
export function dateFormat(
    fmt: string,
    timeStamp: number | string | Date
): string;
export function beforeDateFormat(
    current?: number | string | Date
): string | undefined;
export function getWeek(current?: number | string | Date): string;

// 字符串与 HTML
export function escapeHtml(str: string): string;
export function unescapeHtml(str: string): string;
export function encodeHtml(str: string): string;
export function matchingAllImg(str: string): string[];
export function getHtmlText(source: string): string;
export function trim(str: string, type?: 1 | 2 | 3 | 4): string | undefined;
export function telFormat(tel: string | number): string;
export function firstLetterUpper(str: string): string;
export function fistLetterUpper(str: string): string;
export function escapeRegExp(str: string): string;
export function camelCase(str: string): string;
export function kebabCase(str: string): string;
export function truncate(str: string, len: number, suffix?: string): string;
export function maskPhone(phone: string | number): string;
export function maskIdCard(idCard: string | number): string;
export function maskName(name: string): string;
export function maskEmail(email: string): string;
export function maskBankCard(cardNo: string | number): string;
export function uuid(): string;

// 数组
export function arrayToTree<T extends { id: any; pid: any }>(
    items: T[]
): Array<T & { children: any[] }>;
export function arrScrambling<T>(arr: T[]): T[];
export function unique<T>(arr: T[]): T[];
export function flat<T = any>(arr: any[]): T[];
export function chunk<T>(arr: T[], size: number): T[][];
export function groupBy<T>(
    arr: T[],
    key: keyof T | ((item: T, index: number) => string | number)
): Record<string, T[]>;
export function sortBy<T>(
    arr: T[],
    key: keyof T | ((item: T) => any),
    order?: "asc" | "desc"
): T[];
export function randomNum<T>(arr: T[]): T;

// 排序
export function bubbleSort<T>(arr: T[]): T[] | undefined;
export function counterSort(arr: number[]): number[] | undefined;
export function insertSort<T>(arr: T[]): T[] | undefined;
export function mergeSort<T>(arr: T[]): T[] | undefined;
export function sort<T>(arr: T[]): T[] | undefined;
export function selectionSort<T>(arr: T[]): T[] | undefined;

// 校验
export function isEmail(s: string): boolean;
export function isPhone(s: string, segments?: string | string[]): boolean;
export function isURL(s: string): boolean;
export function isWeiXin(s: string): boolean;
export function isQQ(s: string): boolean;
export function isCarNo(s: string): boolean;
export function password(s: string): boolean;
export function isCn(s: string): boolean;
export function isPostNo(s: string): boolean;
export function isRGB(s: string): boolean;
export function bankCardCheck(num: string | number): boolean;
export function isIdCard(s: string): boolean;
export function isIpv4(s: string): boolean;
export function checkNum(value: unknown): boolean;
export function isObject(value: unknown): boolean;
export function isEmptyObject(value: unknown): boolean;
export function isArray(value: unknown): value is any[];
export function isType(value: unknown): string;
export function isVersion(value: string): boolean;
export function isPassport(value: string): boolean;
export function isNil(value: unknown): value is null | undefined;
export function isPromise(value: unknown): value is Promise<any>;
export function isPlainObject(value: unknown): value is Record<string, any>;
export function isEmpty(value: unknown): boolean;
export function isCreditCode(s: string): boolean;
export function isOrganizationCode(s: string): boolean;
export function isNewEnergyCarNo(s: string): boolean;
export function getAge(idCard: string, now?: Date): number | null;
export function getGender(idCard: string): "male" | "female" | null;
export function getBankCardType(
    cardNo: string | number
): "visa" | "mastercard" | "amex" | "jcb" | "unionpay" | "discover" | "unknown";

// 数字、金额与随机数
export function thousandth(num: number | string): string;
export function changeToChinese(num: number | string): string;
export function digitUppercase(n: number): string;
export function formatSize(size: number): string;
export function largeNumberAdd(a: string, b: string): string | undefined;
export function largeNumbersMultiply(a: string, b: string): string | undefined;
export function randomString(len: number): string;
export function randomRange(min: number, max: number): number;
export function clamp(n: number, min: number, max: number): number;
export function sum(arr: number[]): number;
export function average(arr: number[]): number;
export function round(n: number, precision?: number): number;
export function add(a: number, b: number): number;
export function sub(a: number, b: number): number;
export function mul(a: number, b: number): number;
export function div(a: number, b: number): number;
export function formatCurrency(
    amount: number | string,
    options?: { symbol?: string; decimals?: number; thousands?: boolean }
): string;
export function parseMoney(value: string | number): number;

// 编解码
export function base64Encode(str: string): string;
export function base64Decode(str: string): string;
export function utf8Encode(text: string): number[];
export function utf8Decode(bytes: number[]): string;

// 查询参数
export function parseQuery(url?: string): Record<string, string | string[]>;
export function stringifyQuery(params: Record<string, any>): string;
export function setQuery(url: string, key: string, value: any): string;
export function removeQuery(url: string, key: string): string;

// 浏览器与环境
export function getOSType(): "ios" | "android" | "others";
export function checkBrowser(): { type: string; version: number };
export function clipboard(str: string): void;
export function cliboard(str: string): void;
export function cookieSet(key: string, value: any, expire?: number): void;
export function cookieGet(key: string): string;
export function cookieRemove(key: string): void;
export function loadScript(urls: string[]): Promise<HTMLScriptElement[]>;
export function loadStyle(url: string): void;
export function getUrlParms(key: string): string | false;
export function scrollAnimation(currentY: number, targetY: number): void;
export function scrollToTop(): void;
export function scrollToBottom(): void;

// 本地存储
export function storageSet(key: string, value: any, expire?: number): void;
export function storageGet<T = any>(key: string, defaultValue?: T): T | undefined;
export function storageRemove(key: string): void;

// DOM
export function on(
    el: EventTarget,
    type: string,
    handler: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
): () => void;
export function off(
    el: EventTarget,
    type: string,
    handler: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
): void;
export function delegate(
    root: Element,
    selector: string,
    type: string,
    handler: (event: Event, target: Element) => void
): () => void;
export function isInViewport(el: Element): boolean;
export function copyText(text: string): Promise<void>;

// 文件
export function downloadFile(
    data: Blob | string | ArrayBuffer,
    filename: string,
    mime?: string
): void;
export function readFileAsText(file: Blob): Promise<string>;
export function blobToBase64(blob: Blob): Promise<string>;
export function base64ToBlob(base64: string, mime?: string): Blob;

export as namespace jsUtilLibs;
