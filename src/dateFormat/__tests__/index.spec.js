describe("时间格式化函数", () => {
    it("测试时间格式化方法", () => {
        const { dateFormat, beforeDateFormat, getWeek } = require("../index");
        const timeStamp = 1645414395327;
        expect(dateFormat("YYYY-mm-dd HH:MM:SS", timeStamp)).toEqual('2022-02-21 11:33:15');
        expect(dateFormat("YYYY-mm-dd HH:MM", timeStamp)).toEqual('2022-02-21 11:33');
        expect(dateFormat("YYYY-mm-dd", timeStamp)).toEqual('2022-02-21');
        expect(getWeek(timeStamp)).toEqual('星期一');
        expect(typeof beforeDateFormat(timeStamp)).toBe('string');
        expect(global.result).toBeUndefined();
    });
});