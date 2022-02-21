describe("数组扁平化", () => {
    it("测试flat方法", () => {
        const { flat } = require("../index");
        const arr = [
            4,
            [1,2],
            88,
            [
                [2,8],
                8
            ]
        ]
        
        expect(flat(arr)).toEqual([4,1,2,88,2,8,8]);
    });
});