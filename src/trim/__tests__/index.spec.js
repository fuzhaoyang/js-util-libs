 /**
     * @param { string } str 待处理字符串
     * @param  { number } type 去除空格类型 1-所有空格  2-前后空格  3-前空格 4-后空格 默认为1
       */
describe("去除空格", () => {
    it("测试trim方法", () => {
        const { trim } = require("../index");
        const str = " asasa asasa asasa "
        expect(trim(str)).toEqual('asasaasasaasasa');
        expect(trim(str,2)).toEqual('asasa asasa asasa');
        expect(trim(str,3)).toEqual('asasa asasa asasa ');
        expect(trim(str,4)).toEqual(' asasa asasa asasa');
    });
});