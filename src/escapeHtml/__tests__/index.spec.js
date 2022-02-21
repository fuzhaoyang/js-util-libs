describe("转义字符转换", () => {
    it("测试escapeHtml方法", () => {
        const { escapeHtml } = require("../index");
        const str = "&nbsp;&lt;&gt;&amp;&ensp;&emsp;&quot;&middot;&brvbar;&mdash;&ndash;&ge;&le;&laquo;&raquo;&deg;&bull;&macr;&#64;&ldquo;&rdquo;&rsquo;&lsquo;&#039;"
        expect(escapeHtml(str)).toEqual(" <>&      \"·¦—–≥≤«»°•¯@“”‚‘'");
    });
});