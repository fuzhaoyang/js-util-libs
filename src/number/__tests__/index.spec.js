describe("number相关测试", () => {
    it("number函数", () => {
        const { largeNumberAdd, largeNumbersMultiply } = require("../index");
        //大数相乘 参数需传字符串数字
        expect(largeNumbersMultiply("199999990", "9007199254740991")).toBe("1801439760876205652590090")

        //大数相加 参数需传字符串数字
        expect(largeNumberAdd("199999990", "9007199254740991")).toBe("9007199454740981");

    });
});