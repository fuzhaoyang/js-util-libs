describe("数字转为大写金额", () => {
    it("测试digitUppercase方法", () => {
        const { digitUppercase } = require("../index");
        expect(digitUppercase(10529520)).toBe('壹仟零伍拾贰万玖仟伍佰贰拾元整');
    });
});