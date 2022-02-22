describe("utf8解码加密", () => {
    it("测试utf8Encode,utf8Decode方法", () => {
        const { utf8Encode,utf8Decode } = require("../index");
        expect(utf8Decode([
            230, 136, 145, 230,
            152, 175, 117, 116,
            102,  56
          ])).toEqual('我是utf8');
        expect(utf8Encode('我是utf8')).toEqual([
            230, 136, 145, 230,
            152, 175, 117, 116,
            102,  56
          ]);
    });
});