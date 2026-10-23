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
            bankCardCheck,
            isVersion,
            isCreditCode,
            isOrganizationCode,
            isNewEnergyCarNo,
            isNil,
            isPromise,
            isPlainObject,
            isEmpty,
            getAge,
            getGender,
            getBankCardType
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
        expect(isIdCard("11010519491231002X")).toBe(true);
        expect(isIdCard("110105491231002")).toBe(true);
        expect(isIdCard("415106199801012130")).toBe(false);
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

        // 验证版本号格式必须为X.Y.Z 
        expect(isVersion('1.1.0')).toBe(true);
        expect(isVersion('12.52.522.522')).toBe(false);

        // 统一社会信用代码
        expect(isCreditCode('91350100M000100Y43')).toBe(true);
        expect(isCreditCode('91350100M000100Y44')).toBe(false);

        // 组织机构代码
        expect(isOrganizationCode('12345678-8')).toBe(true);
        expect(isOrganizationCode('12345678-9')).toBe(false);

        // 新能源车牌
        expect(isNewEnergyCarNo('粤BD12345')).toBe(true);
        expect(isNewEnergyCarNo('粤B12345D')).toBe(true);
        expect(isNewEnergyCarNo('粤B12345')).toBe(false);

        // 空值判断
        expect(isNil(null)).toBe(true);
        expect(isNil(0)).toBe(false);
        expect(isEmpty({})).toBe(true);
        expect(isEmpty([])).toBe(true);
        expect(isEmpty("")).toBe(true);
        expect(isEmpty(0)).toBe(false);
        expect(isPlainObject({})).toBe(true);
        expect(isPlainObject(new Date())).toBe(false);
        expect(isPromise(Promise.resolve())).toBe(true);
        expect(isPromise({})).toBe(false);

        // 身份证信息提取
        expect(getAge('11010519491231002X', new Date(2026, 9, 23))).toBe(76);
        expect(getGender('11010519491231002X')).toBe('female');
        expect(getAge('invalid')).toBe(null);

        // 银行卡组织
        expect(getBankCardType('4111111111111111')).toBe('visa');
        expect(getBankCardType('6222021234567890123')).toBe('unionpay');
        expect(getBankCardType('123')).toBe('unknown');
    });
});