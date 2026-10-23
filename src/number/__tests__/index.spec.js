const { largeNumberAdd, largeNumbersMultiply } = require("../index");

describe("number相关测试", () => {
    it("number函数", () => {
        const { largeNumberAdd, largeNumbersMultiply } = require("../index");
        //大数相乘 参数需传字符串数字
        expect(largeNumbersMultiply("199999990", "9007199254740991")).toBe("1801439760876205652590090")

        //大数相加 参数需传字符串数字
        expect(largeNumberAdd("199999990", "9007199254740991")).toBe("9007199454740981");
    });

    it("参数非字符串时不抛异常", () => {
        const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
        expect(largeNumberAdd("1", 5)).toBeUndefined();
        expect(largeNumbersMultiply("1", 5)).toBeUndefined();
        expect(errorSpy).toHaveBeenCalledTimes(2);
        errorSpy.mockRestore();
    });

    it("参数不是数字字符串时返回空字符串", () => {
        expect(largeNumberAdd("1", "a")).toBe("");
        expect(largeNumbersMultiply("1", "a")).toBe("");
    });
});
describe("number 扩展", () => {
    const {
        clamp,
        sum,
        average,
        round,
        add,
        sub,
        mul,
        div,
        formatCurrency,
        parseMoney,
    } = require("../index");

    it("数值聚合与边界", () => {
        expect(clamp(5, 1, 3)).toBe(3);
        expect(sum([1, 2, 3])).toBe(6);
        expect(average([1, 2, 3])).toBe(2);
        expect(Number.isNaN(average([]))).toBe(true);
    });

    it("round 修正浮点误差", () => {
        expect(round(1.005, 2)).toBe(1.01);
        expect(round(-1.005, 2)).toBe(-1.01);
        expect(round(2.5)).toBe(3);
    });

    it("精确四则运算", () => {
        expect(add(0.1, 0.2)).toBe(0.3);
        expect(sub(0.3, 0.1)).toBe(0.2);
        expect(mul(0.1, 0.2)).toBe(0.02);
        expect(div(0.3, 0.1)).toBe(3);
    });

    it("金额格式化与解析", () => {
        expect(formatCurrency(1234567.891)).toBe("¥1,234,567.89");
        expect(formatCurrency(-1234.5)).toBe("-¥1,234.50");
        expect(formatCurrency(1234.5, { symbol: "$", decimals: 0 })).toBe("$1,235");
        expect(parseMoney("¥1,234.56")).toBe(1234.56);
        expect(Number.isNaN(parseMoney("abc"))).toBe(true);
    });
});
