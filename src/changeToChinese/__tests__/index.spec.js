// 将阿拉伯数字翻译成中文的大写数字
describe("将阿拉伯数字翻译成中文的大写数字", () => {
    it("测试changeToChinese方法", () => {
        const { changeToChinese } = require("../index");
        expect(changeToChinese(1524124545222)).toEqual('一萬五仟二百四十一億二仟四百五十四萬五仟二百二十二');
    });
});