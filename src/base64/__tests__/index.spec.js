describe("base64解码加密", () => {
    it("测试base64Decode,base64Encode方法", () => {
        const { base64Decode ,base64Encode } = require("../index");
        expect(base64Decode('5oiR5pivYmFzZTY05Yqg6Kej5a+G5bel5YW3')).toEqual('我是base64加解密工具');
        expect(base64Encode('我是base64加解密工具')).toEqual('5oiR5pivYmFzZTY05Yqg6Kej5a+G5bel5YW3');
    });
});