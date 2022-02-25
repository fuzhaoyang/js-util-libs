describe("数组去重", () => {
    it("测试unique方法", () => {
        const { unique } = require("../index");
        const arr = [1,1,2,44,66,22,44,66]
        expect(unique(arr)).toEqual([1,2,44,66,22]);
    });
});