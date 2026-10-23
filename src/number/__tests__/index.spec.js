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