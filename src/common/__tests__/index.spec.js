describe("公共", () => {
    it("公共函数", () => {
      const { telFormat } = require("../index");
      // 手机号中间四位变成*
      expect(telFormat(17791430699)).toBe('177****0699');
    });
});