// 数字千分位分割
describe("数字千分位分割", () => {
    it("测试thousandth方法", () => {
        const { thousandth } = require("../index");
        expect(thousandth(10000000)).toEqual('10,000,000');
    });
});