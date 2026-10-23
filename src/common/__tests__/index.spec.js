const {
  telFormat,
  maskPhone,
  maskIdCard,
  maskName,
  maskEmail,
  maskBankCard,
  uuid,
} = require("../index");

describe("common 扩展", () => {
  it("telFormat", () => {
    expect(telFormat(17791430699)).toBe("177****0699");
  });

  it("脱敏", () => {
    expect(maskPhone(17791430699)).toBe("177****0699");
    expect(maskIdCard("11010519491231002X")).toBe("110105********002X");
    expect(maskName("张三丰")).toBe("张**");
    expect(maskEmail("test123@qq.com")).toBe("te***@qq.com");
    expect(maskBankCard("6222 0212 3456 7890")).toBe("************7890");
  });

  it("uuid 格式正确且不重复", () => {
    const first = uuid();
    const second = uuid();
    expect(first).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
    );
    expect(first).not.toBe(second);
  });
});
