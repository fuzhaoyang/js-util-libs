describe("获取html文本中转化为html后的纯文本信息", () => {
    it("测试getHtmlText方法", () => {
        const { getHtmlText } = require("../index");
        expect(getHtmlText('<div class="container"><img src="/222.jpg"><div><img src="/ccc.jpg"><span class="span-item">456</span></div></div>')).toEqual('456');
    });
});