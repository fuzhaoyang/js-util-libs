import {
    deepCopy,
    chunk,
    groupBy,
    sortBy,
    pick,
    omit,
    get,
    set,
    retry,
    isIdCard,
    getAge,
    formatCurrency,
    add,
    parseQuery,
    storageGet,
    on,
    copyText,
    debounce,
} from "js-util-libs";

const source = { a: 1, nested: { b: "2" } };
const copied: { a: number; nested: { b: string } } = deepCopy(source);
const chunks: number[][] = chunk([1, 2, 3], 2);
const grouped: Record<string, number[]> = groupBy([1, 2, 3], (n) =>
    n % 2 ? "odd" : "even"
);
const sorted: Array<{ n: number }> = sortBy([{ n: 2 }, { n: 1 }], "n");
const picked: { a: number } = pick(source, ["a"]);
const omitted: { nested: { b: string } } = omit(source, ["a"]);
const value: number = get<number>({}, "a.b", 0);
const updated: { a: number } = set({ a: 1 }, "a", 2);
const age: number | null = getAge("11010519491231002X");
const price: string = formatCurrency(1234.5);
const total: number = add(0.1, 0.2);
const query: Record<string, string | string[]> = parseQuery("?a=1");
const cached: number | undefined = storageGet<number>("key", 0);
const isValid: boolean = isIdCard("11010519491231002X");
const unbind: () => void = on(document, "click", () => {});
const copying: Promise<void> = copyText("hello");
const retrying: Promise<string> = retry(async () => "ok");
const debounced = debounce((value: string) => value, 10);

// @ts-expect-error chunk 的第一个参数必须是数组
chunk(1, 2);

void copied;
void chunks;
void grouped;
void sorted;
void picked;
void omitted;
void value;
void updated;
void age;
void price;
void total;
void query;
void cached;
void isValid;
void unbind;
void copying;
void retrying;
void debounced;
