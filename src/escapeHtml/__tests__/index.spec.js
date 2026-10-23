describe("转义字符转换", () => {
    it("测试escapeHtml方法", () => {
        const { escapeHtml } = require("../index");
        const str = "&nbsp;&lt;&gt;&amp;&ensp;&emsp;&quot;&middot;&brvbar;&mdash;&ndash;&ge;&le;&laquo;&raquo;&deg;&bull;&macr;&#64;&ldquo;&rdquo;&rsquo;&lsquo;&#039;"
        expect(escapeHtml(str)).toEqual(" <>&      \"·¦—–≥≤«»°•¯@“”‚‘'");
    });
});
describe("HTML 编解码", () => {
    const { encodeHtml, unescapeHtml } = require("../index");

    it("encodeHtml", () => {
        expect(encodeHtml('<a href="x">&\'</a>')).toBe(
            "&lt;a href=&quot;x&quot;&gt;&amp;&#39;&lt;/a&gt;"
        );
    });

    it("unescapeHtml 是 escapeHtml 的别名", () => {
        expect(unescapeHtml("&lt;p&gt;")).toBe("<p>");
    });
});
