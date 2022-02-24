describe("常用校验方法", () => {
    it("常用校验方法", () => {
        const {
            isEmail,
            isPhone,
            isURL,
            isWeiXin,
            isQQ,
            isCarNo,
            password,
            isCn,
            isPostNo,
            isRGB,
            isIdCard,
            isIpv4,
            checkNum,
            isEmptyObject,
            bankCardCheck
        } = require("../index");
        // 邮箱测试
        expect(isEmail("932647051@qq.com")).toBe(true);
        expect(isEmail("932647051@ssdd")).toBe(false);

        //手机号测试
        expect(isPhone("17791430698")).toBe(true);
        expect(isPhone("27791430698")).toBe(false);

        //url测试
        expect(isURL("https://haha.sunshine.com/xxx/xxx")).toBe(true);
        expect(isURL("sss://haha.sunshine.com/xxx/xxx")).toBe(false);

        //微信号测试
        expect(isWeiXin("linsanxin885577")).toBe(true);
        expect(isWeiXin("我的vx")).toBe(false);

        //QQ号测试
        expect(isQQ("932647051")).toBe(true);
        expect(isQQ("191580163333")).toBe(false);

        //QQ号测试
        expect(isCarNo("粤A12345")).toBe(true);
        expect(isCarNo("广东A12345")).toBe(false);

        //密码强度的校验 密码中必须包含字母、数字、特称字符，至少8个字符，最多30个字符
        expect(password("sunshine_Lin12345222")).toBe(true);
        expect(password("sunshineLin12345")).toBe(false);

        //包含中文的字符串
        expect(isCn("我是sunshin，林三心")).toBe(true);
        expect(isCn("sunshine_Linkkk")).toBe(false);

        //邮箱的校验
        expect(isPostNo("522000")).toBe(true);
        expect(isPostNo("5220000")).toBe(false);

        //16进制颜色的校验
        expect(isRGB("#fff")).toBe(true);
        expect(isRGB("#1234567")).toBe(false);

        //身份证的校验
        expect(isIdCard("415106199801012130")).toBe(true);
        expect(isIdCard("718381298381212183")).toBe(false);

        //IPv4的校验
        expect(isIpv4("122.12.56.65")).toBe(true);
        expect(isIpv4("122.12.56.655")).toBe(false);

        //判断是否是数字
        expect(checkNum(5)).toBe(true);
        expect(checkNum("66")).toBe(false);

        //判断是否为{}空对象
        expect(isEmptyObject({})).toBe(true);
        expect(isEmptyObject("66")).toBe(false);
        expect(isEmptyObject({ a: 4 })).toBe(false);

        // 银行卡号码校验（luhn算法）
        expect(bankCardCheck(4485275742308327)).toBe(true);
        expect(bankCardCheck(6011329933655299)).toBe(false);
    });
});