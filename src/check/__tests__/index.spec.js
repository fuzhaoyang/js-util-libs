describe("常用校验方法", () => {
    it("常用校验方法", () => {
        const { isEmail, isPhone, isURL, isWeiXin, isQQ, isCarNo, password, isCn, isPostNo, isRGB, isIdCard, isIpv4} = require("../index");
        expect(isEmail('932647051@qq.com')).toBe(true); 
        expect(isEmail('932647051@ssdd')).toBe(false); 
        expect(isPhone('17791430698')).toBe(true); 
    });
});