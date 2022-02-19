describe("深拷贝的实现", () => {
    it("测试deepCopy方法", () => {
        const { deepCopy } = require("../index");
        const id = Symbol("id");
        let obj = {
            [id]: "symbol", // symbol拷贝
            test: {
                espend: {
                    test: [2, 3, 4, 7],
                },
                RR: [44, 66, "test"],
            },
            map: new Map(), // map拷贝
            set: new Set(), // set拷贝
            unknow: null, // null 测试
            fun() {
                // 函数拷贝
                return function() {
                    return "fun";
                };
            },
        };
        obj.obj = obj; // 循环引用测试
        expect(deepCopy(obj)).toEqual(obj);
    });
});