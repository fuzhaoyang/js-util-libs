describe("匹配字符串中的src", () => {
    it("测试matchingAllImg方法", () => {
        const { matchingAllImg } = require("../index");
        const str = `<img src="baidu.com"/><img src="tengxun.com"/>`
        expect(matchingAllImg(str)).toEqual([ 'baidu.com', 'tengxun.com' ]);
    });
});