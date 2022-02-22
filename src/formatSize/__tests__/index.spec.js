// 文件大小格式化
describe("文件大小格式化", () => {
    it("测试formatSize方法", () => {
        const { formatSize } = require("../index");
        expect(formatSize(152225454152)).toEqual('141.77GB');
    });
});